import { z } from "zod";

export const bookingFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, { message: "Enter a valid 10-digit Indian mobile number." }),
  pickupLocation: z
    .string()
    .min(2, { message: "Pickup location is required." }),
  destination: z
    .string()
    .min(2, { message: "Destination is required." }),
  travelDate: z
    .string()
    .min(1, { message: "Travel date is required." }),
  pickupTime: z.string().optional(),
  returnDate: z.string().optional(),
  passengers: z.string().default("1–4"),
  vehiclePreference: z.string().optional(),
  serviceType: z.string().default("Outstation Trips"),
  additionalRequirements: z.string().max(500).optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

