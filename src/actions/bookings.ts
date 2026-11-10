"use server";

import { bookingFormSchema, BookingFormValues } from "@/lib/validations/booking.schema";
import { createClient } from "@supabase/supabase-js";

export async function submitBookingEnquiry(values: BookingFormValues) {
  try {
    // 1. Validate on Server
    const validatedData = bookingFormSchema.parse(values);

    // 2. Generate Booking Reference (e.g. SWJ-20261110-8472)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `SWJ-${dateStr}-${randomSuffix}`;

    // 3. Connect to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder")) {
      // In development / prototype mode without configured Supabase credentials
      return {
        success: true,
        bookingNumber,
        message: "Demo mode: Booking enquiry created locally.",
      };
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          booking_number: bookingNumber,
          customer_name: validatedData.fullName,
          customer_mobile: validatedData.mobile,
          pickup_location: validatedData.pickupLocation,
          drop_location: validatedData.destination,
          travel_date: validatedData.travelDate,
          pickup_time: validatedData.pickupTime || null,
          return_date: validatedData.returnDate || null,
          passenger_count: validatedData.passengers,
          vehicle_preference: validatedData.vehiclePreference || null,
          status: "enquiry_received",
          additional_notes: validatedData.additionalRequirements || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase booking insert error:", error);
      return {
        success: false,
        error: "Failed to record booking. Please connect via WhatsApp or Phone.",
      };
    }

    return {
      success: true,
      bookingNumber,
      bookingId: data.id,
    };
  } catch (err: any) {
    console.error("Server Action Exception:", err);
    return {
      success: false,
      error: err?.message || "An unexpected error occurred. Please try again.",
    };
  }
}

