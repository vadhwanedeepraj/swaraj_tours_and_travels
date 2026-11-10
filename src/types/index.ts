export type Locale = "en" | "mr";

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  marathiName: string;
  regNumber?: string;
  category: "Sedan" | "SUV/MUV" | "Tempo Traveller" | "Luxury Coach";
  seats: string;
  ac: boolean;
  luggage: string;
  image: string;
  additionalImages?: string[];
  descriptionEn: string;
  descriptionMr: string;
  ownership: "owned" | "partner";
  ratePerKm: number;
  minKmPerDay: number;
  driverAllowancePerDay: number;
  featuresEn: string[];
  featuresMr: string[];
  bestForEn: string;
  bestForMr: string;
  popularRoutes?: string[];
  isAvailable?: boolean;
  status?: "available" | "on_trip" | "maintenance" | "on_request";
}

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleMr: string;
  descriptionEn: string;
  descriptionMr: string;
  icon: string;
}

export interface Destination {
  id: string;
  nameEn: string;
  nameMr: string;
  categoryEn: string;
  categoryMr: string;
  distanceKm: number;
  highlightEn: string;
  highlightMr: string;
}

export interface ItineraryDay {
  day: number;
  titleEn: string;
  titleMr: string;
  timeSlot?: string;
  activitiesEn: string[];
  activitiesMr: string[];
}

export interface TourPackage {
  slug: string;
  titleEn: string;
  titleMr: string;
  durationEn: string;
  durationMr: string;
  durationDays: number;
  category: "Pilgrimage" | "Heritage" | "City Tour" | "Shaktipeeth";
  categoryMr: string;
  distanceKm: number;
  startingPrice: number;
  heroImage: string;
  overviewEn: string;
  overviewMr: string;
  highlightsEn: string[];
  highlightsMr: string[];
  itinerary: ItineraryDay[];
  inclusionsEn: string[];
  inclusionsMr: string[];
  exclusionsEn: string[];
  exclusionsMr: string[];
  recommendedVehicles: {
    vehicleName: string;
    vehicleType: string;
    estimatedFare: number;
  }[];
  pickupDrop: string;
}

export interface BookingFormData {
  fullName: string;
  mobile: string;
  pickupLocation: string;
  destination: string;
  travelDate: string;
  pickupTime?: string;
  returnDate?: string;
  passengers: string;
  vehiclePreference?: string;
  serviceType: string;
  additionalRequirements?: string;
}

export interface FaqItem {
  questionEn: string;
  questionMr: string;
  answerEn: string;
  answerMr: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  nameEn: string;
  nameMr: string;
  cityEn: string;
  cityMr: string;
  tripEn: string;
  tripMr: string;
  commentEn: string;
  commentMr: string;
  rating: number;
  date: string;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleMr: string;
  locationEn: string;
  locationMr: string;
  category: "fleet" | "pilgrimage" | "heritage" | "customers";
  imageUrl: string;
  descriptionEn?: string;
  descriptionMr?: string;
}
