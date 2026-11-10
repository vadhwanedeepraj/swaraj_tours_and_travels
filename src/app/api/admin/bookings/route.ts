import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const sampleBookings = [
  {
    id: "1",
    bookingNumber: "SWJ-20261110-8472",
    customerName: "सचिन देशमुख (Sachin Deshmukh)",
    mobile: "9822012345",
    pickup: "नांदेड रेल्वे स्थानक",
    destination: "शिर्डी (Shirdi Sai Mandir)",
    travelDate: "2026-11-12",
    passengers: "5–7",
    vehiclePreference: "SUV (Maruti Ertiga)",
    serviceType: "Outstation Trips",
    quotedAmount: 9500,
    status: "enquiry_received",
    notes: "कुटुंबासह प्रवास, सकाळी ६ वाजता पिकअप हवा आहे.",
  },
  {
    id: "2",
    bookingNumber: "SWJ-20261109-6192",
    customerName: "डॉ. राहुल पाटील (Dr. Rahul Patil)",
    mobile: "9423198765",
    pickup: "शिवाजी नगर, नांदेड",
    destination: "हैदराबाद आंतरराष्ट्रीय विमानतळ (RGIA)",
    travelDate: "2026-11-14",
    passengers: "1–4",
    vehiclePreference: "Sedan (Swift Dzire)",
    serviceType: "Airport Transfer",
    quotedAmount: 6000,
    status: "quotation_sent",
    notes: "विमान दुपारी ४ वाजता आहे.",
  },
  {
    id: "3",
    bookingNumber: "SWJ-20261108-4120",
    customerName: "अमित जोशी (Amit Joshi)",
    mobile: "9970112233",
    pickup: "तरोडा नाका, नांदेड",
    destination: "तुळजापूर भवानी मंदिर (Round Trip)",
    travelDate: "2026-11-15",
    passengers: "6",
    vehiclePreference: "SUV (Maruti Ertiga)",
    serviceType: "Pilgrimage / Tourism",
    quotedAmount: 7200,
    status: "confirmed",
    notes: "अ‍ॅडव्हान्स ₹२,००० जमा झाला.",
  },
  {
    id: "4",
    bookingNumber: "SWJ-20261105-1104",
    customerName: "राजेश कुलकर्णी (Rajesh Kulkarni)",
    mobile: "9850123456",
    pickup: "नांदेड",
    destination: "पुणे (Pune)",
    travelDate: "2026-11-06",
    passengers: "4",
    vehiclePreference: "Sedan (Etios)",
    serviceType: "One-Way Drop",
    quotedAmount: 8000,
    status: "completed",
  },
];

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder")) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const bookings = data.map((b: any) => ({
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
        return NextResponse.json({ success: true, bookings });
      }
    } catch (e) {
      console.error("Failed to query Supabase bookings:", e);
    }
  }

  return NextResponse.json({ success: true, bookings: sampleBookings });
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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder")) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase
        .from("bookings")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) {
        console.error("Error updating booking status in Supabase:", error);
      }
    }

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
