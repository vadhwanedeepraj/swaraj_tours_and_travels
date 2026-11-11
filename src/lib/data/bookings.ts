import fs from "fs";
import path from "path";
import defaultBookingsData from "./bookings.json";

export interface BookingItem {
  id: string;
  bookingNumber: string;
  customerName: string;
  mobile: string;
  pickup: string;
  destination: string;
  travelDate: string;
  passengers: string;
  vehiclePreference: string;
  serviceType: string;
  quotedAmount: number;
  status: "enquiry_received" | "quotation_sent" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  pickupTime?: string;
  returnDate?: string;
}

const bookingsFilePath = path.join(process.cwd(), "src", "lib", "data", "bookings.json");
let memoryBookingsCache: BookingItem[] | null = null;

export function readLocalBookings(): BookingItem[] {
  if (memoryBookingsCache) {
    return [...memoryBookingsCache];
  }
  try {
    if (fs.existsSync(bookingsFilePath)) {
      const content = fs.readFileSync(bookingsFilePath, "utf-8");
      const parsed = JSON.parse(content) as BookingItem[];
      memoryBookingsCache = parsed;
      return parsed;
    }
  } catch (err) {
    console.error("Error reading bookings.json:", err);
  }
  memoryBookingsCache = defaultBookingsData as BookingItem[];
  return defaultBookingsData as BookingItem[];
}

export function writeLocalBookings(bookings: BookingItem[]): boolean {
  memoryBookingsCache = bookings;
  try {
    fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing bookings.json:", err);
    return false;
  }
}

export function addLocalBooking(item: BookingItem): BookingItem {
  const current = readLocalBookings();
  current.unshift(item);
  writeLocalBookings(current);
  return item;
}

export function updateLocalBookingStatus(id: string, status: BookingItem["status"]): boolean {
  const current = readLocalBookings();
  const index = current.findIndex((b) => b.id === id || b.bookingNumber === id);
  if (index !== -1) {
    current[index].status = status;
    writeLocalBookings(current);
    return true;
  }
  return false;
}

