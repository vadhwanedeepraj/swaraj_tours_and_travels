import { Vehicle } from "@/types";
import defaultVehiclesData from "./vehicles.json";

export const VEHICLES: Vehicle[] = defaultVehiclesData as Vehicle[];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.slug === slug || v.id === slug);
}
