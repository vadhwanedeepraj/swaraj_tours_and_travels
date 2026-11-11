import { Locale } from "@/types";

/**
 * Cleanly format vehicle seating capacity according to the selected language.
 * E.g., "४+१ प्रवासी (4+1 Seats)" -> "४+१ प्रवासी" in mr, "4+1 Seats" in en.
 */
export function formatVehicleSeats(seatsStr: string | undefined, locale: Locale): string {
  if (!seatsStr) return locale === "mr" ? "आसने उपलब्ध" : "Seats Available";

  if (seatsStr.includes("(") && seatsStr.includes(")")) {
    const parts = seatsStr.split("(");
    const mrPart = parts[0].trim();
    const enPart = parts[1].replace(")", "").trim();

    if (locale === "mr") {
      return mrPart || seatsStr;
    } else {
      return enPart || mrPart || seatsStr;
    }
  }

  return seatsStr;
}

/**
 * Cleanly format luggage capacity according to the selected language.
 * E.g., "२ मोठी बॅग्ज + २ हँडबॅग्ज (2 Large Bags)" -> "२ मोठी बॅग्ज + २ हँडबॅग्ज" in mr, "2 Large Bags" in en.
 */
export function formatVehicleLuggage(luggageStr: string | undefined, locale: Locale): string {
  if (!luggageStr) return locale === "mr" ? "सामान जागा" : "Luggage Space";

  if (luggageStr.includes("(") && luggageStr.includes(")")) {
    const parts = luggageStr.split("(");
    const mrPart = parts[0].trim();
    const enPart = parts[1].replace(")", "").trim();

    if (locale === "mr") {
      return mrPart || luggageStr;
    } else {
      return enPart || mrPart || luggageStr;
    }
  }

  return luggageStr;
}

/**
 * Returns translated vehicle category name.
 */
export function formatVehicleCategory(category: string | undefined, locale: Locale): string {
  if (!category) return "";
  if (locale === "en") return category;

  const categoryMapMr: Record<string, string> = {
    "All": "सर्व गाड्या",
    "Sedan": "सेडान",
    "SUV/MUV": "एसयूव्ही / एमयूव्ही",
    "Luxury Coach": "लक्झरी कोच",
    "Tempo Traveller": "टेम्पो ट्रॅव्हलर",
  };

  return categoryMapMr[category] || category;
}

/**
 * Return clean vehicle name for the given locale.
 * Removes redundant parenthetical English names in Marathi mode.
 * e.g. "ह्युंदाई ऑरा (Hyundai AURA)" -> "ह्युंदाई ऑरा" in Marathi, "Hyundai AURA" in English.
 */
export function formatVehicleName(
  vehicle: { name: string; marathiName?: string },
  locale: Locale
): string {
  if (locale === "en") {
    return vehicle.name;
  }

  if (vehicle.marathiName) {
    // Strip trailing English parentheses e.g. "(Hyundai AURA)", "(Swift Dzire)"
    const cleaned = vehicle.marathiName.replace(/\s*\([A-Za-z0-9\s/+-]+\)/g, "").trim();
    return cleaned || vehicle.marathiName;
  }

  return vehicle.name;
}

/**
 * Translate package recommended vehicle types.
 * e.g., "4 Seater Sedan" -> "४ सीटर सेडान" in Marathi.
 */
export function formatRecommendedVehicleType(typeStr: string | undefined, locale: Locale): string {
  if (!typeStr) return "";
  if (locale === "en") return typeStr;

  const typeMapMr: Record<string, string> = {
    "4 Seater Sedan": "४ सीटर सेडान",
    "6 Seater SUV": "६ सीटर एसयूव्ही",
    "7 Seater VIP": "७ सीटर व्हीआयपी",
    "17 Seater Coach": "१७ सीटर कोच",
    "17 Seater Tempo": "१७ सीटर टेम्पो",
    "32 Seater Bus": "३२ सीटर बस",
  };

  return typeMapMr[typeStr] || typeStr;
}

/**
 * Translate gallery categories.
 */
export function formatGalleryCategory(cat: string | undefined, locale: Locale): string {
  if (!cat) return "";
  if (locale === "en") {
    const enMap: Record<string, string> = {
      all: "All Photos",
      fleet: "Fleet & Vehicles",
      pilgrimage: "Pilgrimage & Temples",
      heritage: "Heritage Tours",
      customers: "Customer Moments",
    };
    return enMap[cat] || cat;
  }

  const mrMap: Record<string, string> = {
    all: "सर्व फोटो",
    fleet: "गाड्या व वाहने",
    pilgrimage: "तीर्थक्षेत्र व मंदिरे",
    heritage: "ऐतिहासिक पर्यटन",
    customers: "प्रवाशांचे खास क्षण",
  };

  return mrMap[cat] || cat;
}

