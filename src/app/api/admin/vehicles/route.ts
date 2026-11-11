import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Vehicle } from "@/types";
import defaultVehiclesData from "@/lib/data/vehicles.json";
import { createClient } from "@supabase/supabase-js";

const jsonFilePath = path.join(process.cwd(), "src", "lib", "data", "vehicles.json");

// In-memory cache for serverless environments where local filesystem might be read-only
let memoryVehiclesCache: Vehicle[] | null = null;

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder") && !supabaseUrl.includes("your-project")) {
    return createClient(supabaseUrl, supabaseKey);
  }
  return null;
}

function readLocalVehicles(): Vehicle[] {
  if (memoryVehiclesCache) {
    return [...memoryVehiclesCache];
  }
  try {
    if (fs.existsSync(jsonFilePath)) {
      const content = fs.readFileSync(jsonFilePath, "utf-8");
      const parsed = JSON.parse(content) as Vehicle[];
      memoryVehiclesCache = parsed;
      return parsed;
    }
  } catch (err) {
    console.error("Error reading vehicles.json on server:", err);
  }
  memoryVehiclesCache = defaultVehiclesData as Vehicle[];
  return defaultVehiclesData as Vehicle[];
}

function writeLocalVehicles(vehicles: Vehicle[]): boolean {
  memoryVehiclesCache = vehicles;
  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(vehicles, null, 2), "utf-8");
    return true;
  } catch (err) {
    // In serverless hosting (e.g. Vercel), local filesystem is read-only.
    // In-memory cache handles runtime requests gracefully.
    return false;
  }
}

// Convert Supabase DB row to Vehicle domain model
function dbRowToVehicle(row: any, images: string[] = []): Vehicle {
  const allImages = images.length > 0 ? images : [row.primary_image || "/vehicles/car-1.jpeg"];
  return {
    id: row.id,
    slug: row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: row.name,
    marathiName: row.marathi_name || row.name,
    regNumber: row.registration_number || "MH-26-REG",
    category: row.category || "Sedan",
    seats: `${row.seating_capacity || 4}+1 प्रवासी (${row.seating_capacity || 4}+1 Seats)`,
    ac: row.ac_available !== false,
    luggage: row.luggage_capacity || "२ मोठी बॅग्ज",
    image: row.primary_image || "/vehicles/car-1.jpeg",
    additionalImages: allImages,
    descriptionEn: row.description_en || "Well-maintained, clean and comfortable vehicle.",
    descriptionMr: row.description_mr || "स्वच्छ, निर्जंतुक व आरामदायी वातानुकूलित गाडी.",
    ownership: row.ownership_type || "owned",
    ratePerKm: Number(row.base_price_per_km) || 12,
    minKmPerDay: Number(row.min_km_per_day) || 300,
    driverAllowancePerDay: Number(row.driver_allowance) || 300,
    isAvailable: row.is_active && row.status !== "on_request" && row.status !== "maintenance",
    status: row.status || (row.is_active ? "available" : "on_request"),
    featuresEn: ["Chilled AC", "Clean Cabin", "Experienced Driver", "Fastag Enabled"],
    featuresMr: ["पॉवरफुल कुलिंग एसी", "स्वच्छ आसन व्यवस्था", "अनुभवी चालक", "फास्टॅग सुविधा"],
    bestForEn: "Local and outstation journeys.",
    bestForMr: "स्थानिक व लांब पल्ल्याचा सुरक्षित प्रवास.",
    popularRoutes: ["Nanded Local", "Nanded to Shirdi", "Nanded to Hyderabad"],
  };
}

// ==========================================
// 1. GET: Fetch all active vehicles
// ==========================================
export async function GET() {
  try {
    const supabase = getSupabaseClient();

    if (supabase) {
      try {
        const { data: dbVehicles, error } = await supabase
          .from("vehicles")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (!error && dbVehicles && dbVehicles.length > 0) {
          // Fetch associated images from vehicle_images table
          const vehicleIds = dbVehicles.map((v) => v.id);
          const { data: dbImages } = await supabase
            .from("vehicle_images")
            .select("vehicle_id, image_url, is_primary")
            .in("vehicle_id", vehicleIds)
            .order("display_order", { ascending: true });

          const imageMap: Record<string, string[]> = {};
          if (dbImages) {
            dbImages.forEach((img) => {
              if (!imageMap[img.vehicle_id]) imageMap[img.vehicle_id] = [];
              imageMap[img.vehicle_id].push(img.image_url);
            });
          }

          const vehicles = dbVehicles.map((v) => dbRowToVehicle(v, imageMap[v.id] || []));
          return NextResponse.json({ success: true, vehicles, source: "supabase" });
        }
      } catch (dbErr) {
        console.error("Supabase vehicles query error, falling back to local dataset:", dbErr);
      }
    }

    // Fallback to local dataset (return all fleet vehicles for admin view)
    const local = readLocalVehicles();
    return NextResponse.json({ success: true, vehicles: local, source: "local" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

// ==========================================
// 2. POST: Add a new vehicle
// ==========================================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.category) {
      return NextResponse.json(
        { success: false, error: "Vehicle name and Category are required" },
        { status: 400 }
      );
    }

    const primaryImage = body.image?.trim() || "/vehicles/car-1.jpeg";
    const additionalImages: string[] = Array.isArray(body.additionalImages) && body.additionalImages.length > 0
      ? body.additionalImages
      : [primaryImage];

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newVehicle: Vehicle = {
      id: body.id || `v-${Date.now()}`,
      slug: slug,
      name: body.name.trim(),
      marathiName: (body.marathiName || body.name).trim(),
      regNumber: (body.regNumber || `MH-26-BE-${Math.floor(1000 + Math.random() * 9000)}`).trim(),
      category: body.category,
      seats: body.seats || "४+१ प्रवासी (4+1 Seats)",
      ac: body.ac !== undefined ? Boolean(body.ac) : true,
      luggage: body.luggage || "२ मोठी बॅग्ज",
      image: primaryImage,
      additionalImages: additionalImages,
      descriptionEn: body.descriptionEn || "Comfortable vehicle for local and outstation trips.",
      descriptionMr: body.descriptionMr || "स्थानिक व आउटस्टेशन प्रवासासाठी उत्तम वातानुकूलित गाडी.",
      ownership: body.ownership === "partner" ? "partner" : "owned",
      ratePerKm: Number(body.ratePerKm) || 12,
      minKmPerDay: Number(body.minKmPerDay) || 300,
      driverAllowancePerDay: Number(body.driverAllowancePerDay) || 300,
      isAvailable: body.isAvailable !== undefined ? Boolean(body.isAvailable) : true,
      status: body.isAvailable !== false ? "available" : "on_request",
      featuresEn: body.featuresEn || ["AC", "Audio System", "Clean Interiors"],
      featuresMr: body.featuresMr || ["एसी", "म्युझिक सिस्टीम", "स्वच्छ केबिन"],
      bestForEn: body.bestForEn || "Family trips and tours.",
      bestForMr: body.bestForMr || "कौटुंबिक सहली आणि प्रवास.",
      popularRoutes: body.popularRoutes || ["Nanded Local", "Nanded to Shirdi", "Nanded to Hyderabad"],
    };

    // 1. Try persisting to Supabase
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data: inserted, error: insertError } = await supabase
          .from("vehicles")
          .insert([
            {
              name: newVehicle.name,
              marathi_name: newVehicle.marathiName,
              slug: newVehicle.slug,
              registration_number: newVehicle.regNumber,
              category: newVehicle.category,
              seating_capacity: parseInt(newVehicle.seats) || 4,
              ac_available: newVehicle.ac,
              luggage_capacity: newVehicle.luggage,
              ownership_type: newVehicle.ownership,
              base_price_per_km: newVehicle.ratePerKm,
              driver_allowance: newVehicle.driverAllowancePerDay,
              min_km_per_day: newVehicle.minKmPerDay,
              primary_image: newVehicle.image,
              description_en: newVehicle.descriptionEn,
              description_mr: newVehicle.descriptionMr,
              status: newVehicle.status,
              is_active: true,
            },
          ])
          .select()
          .single();

        if (!insertError && inserted) {
          newVehicle.id = inserted.id;

          // Insert images into vehicle_images
          if (additionalImages.length > 0) {
            const imageRows = additionalImages.map((imgUrl, idx) => ({
              vehicle_id: inserted.id,
              image_url: imgUrl,
              is_primary: idx === 0,
              display_order: idx,
            }));
            await supabase.from("vehicle_images").insert(imageRows);
          }
        } else {
          console.error("Supabase insert vehicle error:", insertError);
        }
      } catch (dbErr) {
        console.error("Supabase insert exception:", dbErr);
      }
    }

    // 2. Always update local / in-memory cache
    const current = readLocalVehicles();
    current.unshift(newVehicle);
    writeLocalVehicles(current);

    return NextResponse.json({
      success: true,
      message: `${newVehicle.name} यशस्वीरित्या जोडली गेली! (Vehicle added successfully)`,
      vehicle: newVehicle,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to add vehicle" },
      { status: 500 }
    );
  }
}

// ==========================================
// 3. PUT: Full edit of a vehicle
// ==========================================
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.id && !body.slug && !body.regNumber) {
      return NextResponse.json(
        { success: false, error: "Vehicle identifier (ID or Slug or RegNumber) required" },
        { status: 400 }
      );
    }

    const primaryImage = body.image?.trim() || "/vehicles/car-1.jpeg";
    const additionalImages: string[] = Array.isArray(body.additionalImages) && body.additionalImages.length > 0
      ? body.additionalImages
      : [primaryImage];

    // 1. Try updating Supabase
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const updatePayload: any = {
          updated_at: new Date().toISOString(),
        };
        if (body.name) updatePayload.name = body.name.trim();
        if (body.marathiName) updatePayload.marathi_name = body.marathiName.trim();
        if (body.regNumber) updatePayload.registration_number = body.regNumber.trim();
        if (body.category) updatePayload.category = body.category;
        if (body.seats) updatePayload.seating_capacity = parseInt(body.seats) || 4;
        if (body.ac !== undefined) updatePayload.ac_available = Boolean(body.ac);
        if (body.luggage) updatePayload.luggage_capacity = body.luggage;
        if (body.ownership) updatePayload.ownership_type = body.ownership;
        if (body.ratePerKm !== undefined) updatePayload.base_price_per_km = Number(body.ratePerKm);
        if (body.driverAllowancePerDay !== undefined) updatePayload.driver_allowance = Number(body.driverAllowancePerDay);
        if (body.minKmPerDay !== undefined) updatePayload.min_km_per_day = Number(body.minKmPerDay);
        if (body.image) updatePayload.primary_image = primaryImage;
        if (body.descriptionEn) updatePayload.description_en = body.descriptionEn;
        if (body.descriptionMr) updatePayload.description_mr = body.descriptionMr;
        if (body.isAvailable !== undefined) {
          updatePayload.status = body.isAvailable ? "available" : "on_request";
        }

        // Match by UUID if valid UUID, otherwise match by registration_number or slug
        let query = supabase.from("vehicles").update(updatePayload);
        if (body.id && body.id.length > 20) {
          query = query.eq("id", body.id);
        } else if (body.regNumber) {
          query = query.eq("registration_number", body.regNumber);
        } else {
          query = query.eq("slug", body.slug);
        }

        const { error: updateError } = await query;
        if (updateError) {
          console.error("Supabase update error:", updateError);
        } else if (body.id) {
          // Refresh images
          await supabase.from("vehicle_images").delete().eq("vehicle_id", body.id);
          const imageRows = additionalImages.map((imgUrl, idx) => ({
            vehicle_id: body.id,
            image_url: imgUrl,
            is_primary: idx === 0,
            display_order: idx,
          }));
          await supabase.from("vehicle_images").insert(imageRows);
        }
      } catch (dbErr) {
        console.error("Supabase update exception:", dbErr);
      }
    }

    // 2. Update local / in-memory cache
    const current = readLocalVehicles();
    const index = current.findIndex(
      (v) => v.id === body.id || v.slug === body.slug || (body.regNumber && v.regNumber === body.regNumber)
    );

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    const existing = current[index];
    const updated: Vehicle = {
      ...existing,
      ...body,
      image: primaryImage,
      additionalImages: additionalImages,
      ratePerKm: body.ratePerKm !== undefined ? Number(body.ratePerKm) : existing.ratePerKm,
      driverAllowancePerDay:
        body.driverAllowancePerDay !== undefined ? Number(body.driverAllowancePerDay) : existing.driverAllowancePerDay,
      minKmPerDay: body.minKmPerDay !== undefined ? Number(body.minKmPerDay) : existing.minKmPerDay,
      isAvailable: body.isAvailable !== undefined ? Boolean(body.isAvailable) : existing.isAvailable,
      status:
        body.isAvailable !== undefined ? (body.isAvailable ? "available" : "on_request") : existing.status,
    };

    current[index] = updated;
    writeLocalVehicles(current);

    return NextResponse.json({
      success: true,
      message: `${updated.name} ची माहिती व दर अद्ययावत झाले! (Updated successfully)`,
      vehicle: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update vehicle" },
      { status: 500 }
    );
  }
}

// ==========================================
// 4. PATCH: 1-Click Availability / Ownership / Price
// ==========================================
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, isAvailable, ratePerKm, ownership, status } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Vehicle identifier is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const patchData: any = { updated_at: new Date().toISOString() };
        if (isAvailable !== undefined) {
          patchData.status = isAvailable ? "available" : "on_request";
        }
        if (status !== undefined) patchData.status = status;
        if (ratePerKm !== undefined) patchData.base_price_per_km = Number(ratePerKm);
        if (ownership !== undefined) patchData.ownership_type = ownership;

        let query = supabase.from("vehicles").update(patchData);
        if (id.length > 20) {
          query = query.eq("id", id);
        } else {
          query = query.or(`slug.eq.${id},registration_number.eq.${id}`);
        }
        await query;
      } catch (dbErr) {
        console.error("Supabase PATCH error:", dbErr);
      }
    }

    // Local / in-memory update
    const current = readLocalVehicles();
    const vehicle = current.find((v) => v.id === id || v.slug === id || v.regNumber === id);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    if (isAvailable !== undefined) {
      vehicle.isAvailable = Boolean(isAvailable);
      vehicle.status = vehicle.isAvailable ? "available" : "on_request";
    }
    if (status !== undefined) vehicle.status = status;
    if (ratePerKm !== undefined) vehicle.ratePerKm = Number(ratePerKm);
    if (ownership !== undefined) vehicle.ownership = ownership;

    writeLocalVehicles(current);

    return NextResponse.json({
      success: true,
      message: `स्थिती अद्ययावत केली: ${vehicle.name}`,
      vehicle,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update" },
      { status: 500 }
    );
  }
}

// ==========================================
// 5. DELETE: Safe Soft-Delete
// ==========================================
// Sets is_active = false in the database so the vehicle is removed from all
// public fleet listings while historical booking and audit records remain safe.
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Vehicle identifier is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        // Safe soft delete: set is_active = false so historical bookings are not harmed
        let query = supabase.from("vehicles").update({
          is_active: false,
          status: "maintenance",
          updated_at: new Date().toISOString(),
        });

        if (id.length > 20) {
          query = query.eq("id", id);
        } else {
          query = query.or(`slug.eq.${id},registration_number.eq.${id}`);
        }
        await query;
      } catch (dbErr) {
        console.error("Supabase DELETE error:", dbErr);
      }
    }

    // Remove from local active vehicles
    const current = readLocalVehicles();
    const filtered = current.filter((v) => v.id !== id && v.slug !== id && v.regNumber !== id);

    if (filtered.length === current.length) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    writeLocalVehicles(filtered);

    return NextResponse.json({
      success: true,
      message: "गाडी फ्लीटमधून सुरक्षितपणे हटवली आहे (Historical booking records remain safe).",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
