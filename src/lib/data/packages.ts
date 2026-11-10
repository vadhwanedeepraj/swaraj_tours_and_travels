import { TourPackage } from "@/types";
import defaultPackagesData from "./packages.json";

export const TOUR_PACKAGES: TourPackage[] = defaultPackagesData as TourPackage[];

export function getPackageBySlug(slug: string): TourPackage | undefined {
  return TOUR_PACKAGES.find((p) => p.slug === slug);
}
