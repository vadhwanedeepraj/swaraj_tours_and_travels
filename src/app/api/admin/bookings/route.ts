import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  readLocalBookings,
  updateLocalBookingStatus,
  BookingItem,
} from "@/lib/data/bookings";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    supabaseUrl &&
    supabaseKey &&
    !supabaseUrl.includes("placeholder") &&
    !supabaseUrl.includes("your-project") &&
    !supabaseKey.includes("your-anon")
  ) {
    return createClient(supabaseUrl, supabaseKey);
  }
  return null;
}

export async function GET() {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const bookings: BookingItem[] = data.map((b: any) => ({
          id: b.id,
          bookingNumber: b.booking_number,
          customerName: b.customer_name,
          mobile: b.customer_mobile,
          pickup: b.pickup_location,
          destination: b.drop_location,
          travelDate: b.travel_date,
          passengers: b.passenger_count || "1–4",
          vehiclePreference: b.vehicle_preference || "Sedan",
          serviceType: "Outstation Trips",
          quotedAmount: Number(b.quoted_amount) || 0,
          status: b.status || "enquiry_received",
          notes: b.additional_notes || "",
        }));
        return NextResponse.json({ success: true, bookings, source: "supabase" });
      }
    } catch (e) {
      console.error("Failed to query Supabase bookings, falling back to local:", e);
    }
  }

  const local = readLocalBookings();
  return NextResponse.json({ success: true, bookings: local, source: "local" });
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Booking ID and status are required" },
        { status: 400 }
      );
    }

    // 1. Update Supabase if available
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error } = await supabase
          .from("bookings")
          .update({ status, updated_at: new Date().toISOString() })
          .eq("id", id);

        if (error) {
          console.error("Error updating booking status in Supabase:", error);
        }
      } catch (dbErr) {
        console.error("Supabase PATCH exception:", dbErr);
      }
    }

    // 2. Always update local dataset
    updateLocalBookingStatus(id, status);

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e?.message || "Failed to update status" },
      { status: 500 }
    );
  }
}
