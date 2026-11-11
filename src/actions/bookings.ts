"use server";

import { bookingFormSchema, BookingFormValues } from "@/lib/validations/booking.schema";
import { createClient } from "@supabase/supabase-js";
import { addLocalBooking } from "@/lib/data/bookings";

export async function submitBookingEnquiry(values: BookingFormValues) {
  try {
    // 1. Validate on Server
    const validatedData = bookingFormSchema.parse(values);

    // 2. Generate Booking Reference (e.g. SWJ-20261110-8472)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `SWJ-${dateStr}-${randomSuffix}`;

    // 3. Always save to local data store so admin dashboard immediately reflects the enquiry
    const localItem = {
      id: `b-${Date.now()}`,
      bookingNumber,
      customerName: validatedData.fullName,
      mobile: validatedData.mobile,
      pickup: validatedData.pickupLocation,
      destination: validatedData.destination,
      travelDate: validatedData.travelDate,
      pickupTime: validatedData.pickupTime || undefined,
      returnDate: validatedData.returnDate || undefined,
      passengers: validatedData.passengers,
      vehiclePreference: validatedData.vehiclePreference || "Sedan",
      serviceType: validatedData.serviceType || "Outstation Trips",
      quotedAmount: 0,
      status: "enquiry_received" as const,
      notes: validatedData.additionalRequirements || "",
    };
    addLocalBooking(localItem);

    // 4. Connect to Supabase if configured with active credentials
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (
      !supabaseUrl ||
      !supabaseAnonKey ||
      supabaseUrl.includes("placeholder") ||
      supabaseUrl.includes("your-project") ||
      supabaseAnonKey.includes("your-anon")
    ) {
      // In development / prototype mode without configured Supabase credentials
      return {
        success: true,
        bookingNumber,
        bookingId: localItem.id,
        message: "Booking enquiry created and saved to admin dashboard.",
      };
    }

    try {
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
        console.error("Supabase booking insert error (saved locally):", error);
      } else if (data) {
        return {
          success: true,
          bookingNumber,
          bookingId: data.id,
        };
      }
    } catch (dbErr) {
      console.error("Supabase connection exception (saved locally):", dbErr);
    }

    return {
      success: true,
      bookingNumber,
      bookingId: localItem.id,
    };
  } catch (err: any) {
    console.error("Server Action Exception:", err);
    return {
      success: false,
      error: err?.message || "An unexpected error occurred. Please try again.",
    };
  }
}
