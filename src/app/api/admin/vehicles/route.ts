import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Vehicle } from "@/types";
import defaultVehiclesData from "@/lib/data/vehicles.json";

const jsonFilePath = path.join(process.cwd(), "src", "lib", "data", "vehicles.json");

function readVehicles(): Vehicle[] {
  try {
    if (fs.existsSync(jsonFilePath)) {
      const content = fs.readFileSync(jsonFilePath, "utf-8");
      return JSON.parse(content) as Vehicle[];
    }
  } catch (err) {
    console.error("Error reading vehicles.json on server:", err);
  }
  return defaultVehiclesData as Vehicle[];
}

function writeVehicles(vehicles: Vehicle[]): boolean {
  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(vehicles, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing vehicles.json on server:", err);
    return false;
  }
}

export async function GET() {
  try {
    const vehicles = readVehicles();
    return NextResponse.json({ success: true, vehicles });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.category) {
      return NextResponse.json(
        { success: false, error: "Name and Category are required" },
        { status: 400 }
      );
    }

    const currentVehicles = readVehicles();
    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newVehicle: Vehicle = {
      id: body.id || `v-${Date.now()}`,
      slug: slug,
      name: body.name,
      marathiName: body.marathiName || body.name,
      regNumber: body.regNumber || "MH-26-TEMP",
      category: body.category,
      seats: body.seats || "४+१ प्रवासी (4+1 Seats)",
      ac: body.ac !== undefined ? body.ac : true,
      luggage: body.luggage || "२ मोठी बॅग्ज",
      image: body.image || "/vehicles/car-1.jpeg",
      additionalImages: body.additionalImages || ["/vehicles/car-1.jpeg"],
      descriptionEn: body.descriptionEn || "Comfortable vehicle for local and outstation trips.",
      descriptionMr: body.descriptionMr || "स्थानिक व आउटस्टेशन प्रवासासाठी आरामदायी गाडी.",
      ownership: body.ownership || "owned",
      ratePerKm: Number(body.ratePerKm) || 12,
      minKmPerDay: Number(body.minKmPerDay) || 300,
      driverAllowancePerDay: Number(body.driverAllowancePerDay) || 300,
      isAvailable: body.isAvailable !== undefined ? Boolean(body.isAvailable) : true,
      status: body.isAvailable ? "available" : "on_request",
      featuresEn: body.featuresEn || ["AC", "Audio System", "Clean Interiors"],
      featuresMr: body.featuresMr || ["एसी", "म्युझिक सिस्टीम", "स्वच्छ केबिन"],
      bestForEn: body.bestForEn || "Family trips and tours.",
      bestForMr: body.bestForMr || "कौटुंबिक सहली आणि प्रवास.",
      popularRoutes: body.popularRoutes || ["Nanded Local", "Nanded to Shirdi"],
    };

    currentVehicles.push(newVehicle);
    writeVehicles(currentVehicles);

    return NextResponse.json({
      success: true,
      message: "Vehicle added successfully",
      vehicle: newVehicle,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to add vehicle" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.id && !body.slug) {
      return NextResponse.json(
        { success: false, error: "Vehicle ID or Slug is required for update" },
        { status: 400 }
      );
    }

    const currentVehicles = readVehicles();
    const index = currentVehicles.findIndex(
      (v) => v.id === body.id || v.slug === body.slug
    );

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    const existing = currentVehicles[index];
    const updatedVehicle: Vehicle = {
      ...existing,
      ...body,
      ratePerKm: body.ratePerKm !== undefined ? Number(body.ratePerKm) : existing.ratePerKm,
      minKmPerDay: body.minKmPerDay !== undefined ? Number(body.minKmPerDay) : existing.minKmPerDay,
      driverAllowancePerDay:
        body.driverAllowancePerDay !== undefined
          ? Number(body.driverAllowancePerDay)
          : existing.driverAllowancePerDay,
      isAvailable:
        body.isAvailable !== undefined ? Boolean(body.isAvailable) : existing.isAvailable,
      status:
        body.isAvailable !== undefined
          ? body.isAvailable
            ? "available"
            : "on_request"
          : existing.status,
    };

    currentVehicles[index] = updatedVehicle;
    writeVehicles(currentVehicles);

    return NextResponse.json({
      success: true,
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update vehicle" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, isAvailable } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    const currentVehicles = readVehicles();
    const vehicle = currentVehicles.find((v) => v.id === id || v.slug === id);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    vehicle.isAvailable = Boolean(isAvailable);
    vehicle.status = vehicle.isAvailable ? "available" : "on_request";

    writeVehicles(currentVehicles);

    return NextResponse.json({
      success: true,
      message: `Vehicle status changed to ${vehicle.isAvailable ? "Available" : "On Request"}`,
      vehicle,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to toggle status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    const currentVehicles = readVehicles();
    const filtered = currentVehicles.filter((v) => v.id !== id && v.slug !== id);

    if (filtered.length === currentVehicles.length) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    writeVehicles(filtered);

    return NextResponse.json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
