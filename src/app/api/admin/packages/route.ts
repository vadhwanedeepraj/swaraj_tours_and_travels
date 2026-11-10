import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { TourPackage } from "@/types";
import defaultPackagesData from "@/lib/data/packages.json";
import { createClient } from "@supabase/supabase-js";

const jsonFilePath = path.join(process.cwd(), "src", "lib", "data", "packages.json");

// In-memory cache for serverless environments
let memoryPackagesCache: TourPackage[] | null = null;

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder") && !supabaseUrl.includes("your-project")) {
    return createClient(supabaseUrl, supabaseKey);
  }
  return null;
}

function readLocalPackages(): TourPackage[] {
  if (memoryPackagesCache) {
    return [...memoryPackagesCache];
  }
  try {
    if (fs.existsSync(jsonFilePath)) {
      const content = fs.readFileSync(jsonFilePath, "utf-8");
      const parsed = JSON.parse(content) as TourPackage[];
      memoryPackagesCache = parsed;
      return parsed;
    }
  } catch (err) {
    console.error("Error reading packages.json on server:", err);
  }
  memoryPackagesCache = defaultPackagesData as TourPackage[];
  return defaultPackagesData as TourPackage[];
}

function writeLocalPackages(packages: TourPackage[]): boolean {
  memoryPackagesCache = packages;
  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(packages, null, 2), "utf-8");
    return true;
  } catch (err) {
    return false;
  }
}

// Convert Supabase DB row to TourPackage domain model
function dbRowToPackage(row: any): TourPackage {
  return {
    slug: row.slug || row.title_en.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    titleEn: row.title_en,
    titleMr: row.title_mr || row.title_en,
    durationEn: `${row.duration_days} Days / ${row.duration_nights || row.duration_days - 1} Night`,
    durationMr: `${row.duration_days} दिवस`,
    durationDays: row.duration_days || 1,
    category: row.category || "Pilgrimage",
    categoryMr: row.category_mr || "तीर्थक्षेत्र दर्शन",
    distanceKm: row.distance_km || 250,
    startingPrice: Number(row.starting_price) || 5000,
    heroImage: row.hero_image || "/vehicles/car-1.jpeg",
    overviewEn: row.description_en || "Curated tour package from Nanded with doorstep pickup.",
    overviewMr: row.description_mr || "नांदेडहून सुरक्षित व नियोजनबद्ध टूर पॅकेज.",
    highlightsEn: row.highlights_en || [
      "Comfortable doorstep pickup in Nanded",
      "Experienced vetted driver",
      "Tolls & fuel included",
    ],
    highlightsMr: row.highlights_mr || [
      "नांदेडमध्ये घरपोच पिकअप सुविधा",
      "अनुभवी चालक आणि आरामदायी प्रवास",
      "टोल आणि इंधन समाविष्ट",
    ],
    itinerary: row.itinerary || [
      {
        day: 1,
        titleEn: "Day 1: Departure & Sightseeing",
        titleMr: "दिवस १: प्रस्थान व दर्शन",
        activitiesEn: ["Morning pickup from Nanded.", "Arrival at destination and darshan."],
        activitiesMr: ["सकाळी नांदेडहून प्रस्थान.", "गंतव्यस्थानी आगमन व दर्शन."],
      },
    ],
    inclusionsEn: [
      "AC Vehicle as chosen",
      "Dedicated Chauffeur",
      "Fuel, FASTag & Tolls",
      "Driver Allowance",
    ],
    inclusionsMr: [
      "वातानुकूलित (AC) गाडी",
      "अनुभवी चालक",
      "इंधन व टोल टॅक्स",
      "चालकाचा भत्ता",
    ],
    exclusionsEn: ["Hotel accommodation", "VIP Darshan tickets", "Personal food & drinks"],
    exclusionsMr: ["हॉटेल मुक्काम खर्च", "व्हीआयपी दर्शन तिकीट", "वैयक्तिक जेवण व खर्च"],
    recommendedVehicles: [
      {
        vehicleName: "Swift Dzire / Sedan",
        vehicleType: "4 Seater Sedan",
        estimatedFare: Number(row.starting_price) || 5000,
      },
      {
        vehicleName: "Maruti Ertiga",
        vehicleType: "6 Seater SUV",
        estimatedFare: (Number(row.starting_price) || 5000) + 2000,
      },
      {
        vehicleName: "Innova Crysta",
        vehicleType: "7 Seater VIP",
        estimatedFare: (Number(row.starting_price) || 5000) + 4000,
      },
    ],
    pickupDrop: "Nanded Doorstep Pickup & Return Drop",
  };
}

// 1. GET: Fetch active tour packages
export async function GET() {
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data: dbPackages, error } = await supabase
          .from("packages")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && dbPackages && dbPackages.length > 0) {
          const packages = dbPackages.map(dbRowToPackage);
          return NextResponse.json({ success: true, packages, source: "supabase" });
        }
      } catch (e) {
        console.error("Supabase packages query error, falling back to local:", e);
      }
    }

    const local = readLocalPackages();
    return NextResponse.json({ success: true, packages: local, source: "local" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

// 2. POST: Add new tour package
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.titleEn || !body.startingPrice) {
      return NextResponse.json(
        { success: false, error: "Package Title and Starting Price are required" },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.titleEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newPackage: TourPackage = {
      slug,
      titleEn: body.titleEn.trim(),
      titleMr: (body.titleMr || body.titleEn).trim(),
      durationEn: body.durationEn || `${body.durationDays || 1} Days`,
      durationMr: body.durationMr || `${body.durationDays || 1} दिवस`,
      durationDays: Number(body.durationDays) || 1,
      category: body.category || "Pilgrimage",
      categoryMr: body.categoryMr || "तीर्थक्षेत्र दर्शन",
      distanceKm: Number(body.distanceKm) || 250,
      startingPrice: Number(body.startingPrice) || 5000,
      heroImage: body.heroImage || "/vehicles/car-1.jpeg",
      overviewEn: body.overviewEn || "Handcrafted tour package from Nanded.",
      overviewMr: body.overviewMr || "नांदेडहून खास टूर पॅकेज.",
      highlightsEn: body.highlightsEn || [
        "Doorstep pickup in Nanded",
        "Clean AC car",
        "Tolls & fuel included",
      ],
      highlightsMr: body.highlightsMr || [
        "नांदेडमध्ये घरपोच पिकअप",
        "स्वच्छ एसी गाडी",
        "टोल आणि इंधन समाविष्ट",
      ],
      itinerary: body.itinerary || [
        {
          day: 1,
          titleEn: "Day 1: Departure & Sightseeing",
          titleMr: "दिवस १: प्रस्थान व दर्शन",
          activitiesEn: ["Morning departure from Nanded", "Arrival and darshan"],
          activitiesMr: ["सकाळी नांदेडहून प्रस्थान", "आगमन व दर्शन"],
        },
      ],
      inclusionsEn: [
        "Private AC Cab",
        "Experienced Chauffeur",
        "Fuel & Tolls",
        "Driver Allowance",
      ],
      inclusionsMr: [
        "स्वतंत्र एसी गाडी",
        "अनुभवी चालक",
        "इंधन व टोल शुल्क",
        "चालकाचा भत्ता",
      ],
      exclusionsEn: ["Hotel accommodation", "VIP darshan pass", "Food and personal expenses"],
      exclusionsMr: ["हॉटेल मुक्काम", "दर्शन पासेस", "जेवण व वैयक्तिक खर्च"],
      recommendedVehicles: body.recommendedVehicles || [
        {
          vehicleName: "Swift Dzire / Sedan",
          vehicleType: "4 Seater Sedan",
          estimatedFare: Number(body.startingPrice),
        },
        {
          vehicleName: "Maruti Ertiga",
          vehicleType: "6 Seater SUV",
          estimatedFare: Number(body.startingPrice) + 2000,
        },
        {
          vehicleName: "Innova Crysta",
          vehicleType: "7 Seater VIP",
          estimatedFare: Number(body.startingPrice) + 4000,
        },
      ],
      pickupDrop: "Nanded Doorstep Pickup & Return Drop",
    };

    // 1. Try Supabase insert
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from("packages").insert([
          {
            slug: newPackage.slug,
            title_en: newPackage.titleEn,
            title_mr: newPackage.titleMr,
            duration_days: newPackage.durationDays,
            starting_price: newPackage.startingPrice,
            description_en: newPackage.overviewEn,
            description_mr: newPackage.overviewMr,
            is_featured: true,
          },
        ]);
      } catch (dbErr) {
        console.error("Supabase package insert error:", dbErr);
      }
    }

    // 2. Update local dataset
    const current = readLocalPackages();
    current.unshift(newPackage);
    writeLocalPackages(current);

    return NextResponse.json({
      success: true,
      message: `टूर पॅकेज ${newPackage.titleMr} यशस्वीरित्या जोडले गेले!`,
      package: newPackage,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to add package" },
      { status: 500 }
    );
  }
}

// 3. PUT: Edit tour package
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.slug) {
      return NextResponse.json(
        { success: false, error: "Package slug is required" },
        { status: 400 }
      );
    }

    const current = readLocalPackages();
    const index = current.findIndex((p) => p.slug === body.slug);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Package not found" },
        { status: 404 }
      );
    }

    const existing = current[index];
    const updated: TourPackage = {
      ...existing,
      ...body,
      startingPrice: body.startingPrice ? Number(body.startingPrice) : existing.startingPrice,
      durationDays: body.durationDays ? Number(body.durationDays) : existing.durationDays,
    };

    // Update Supabase
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase
          .from("packages")
          .update({
            title_en: updated.titleEn,
            title_mr: updated.titleMr,
            duration_days: updated.durationDays,
            starting_price: updated.startingPrice,
            description_en: updated.overviewEn,
            description_mr: updated.overviewMr,
            updated_at: new Date().toISOString(),
          })
          .eq("slug", body.slug);
      } catch (dbErr) {
        console.error("Supabase package update error:", dbErr);
      }
    }

    current[index] = updated;
    writeLocalPackages(current);

    return NextResponse.json({
      success: true,
      message: `पॅकेज माहिती यशस्वीरित्या अद्ययावत झाली!`,
      package: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update package" },
      { status: 500 }
    );
  }
}

// 4. DELETE: Safe Delete
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Package slug is required" },
        { status: 400 }
      );
    }

    // Supabase soft-delete or remove
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from("packages").delete().eq("slug", slug);
      } catch (dbErr) {
        console.error("Supabase package delete error:", dbErr);
      }
    }

    const current = readLocalPackages();
    const filtered = current.filter((p) => p.slug !== slug);

    if (filtered.length === current.length) {
      return NextResponse.json(
        { success: false, error: "Package not found" },
        { status: 404 }
      );
    }

    writeLocalPackages(filtered);

    return NextResponse.json({
      success: true,
      message: "पॅकेज यशस्वीरित्या हटवले गेले (Historical bookings remain safe).",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete package" },
      { status: 500 }
    );
  }
}

