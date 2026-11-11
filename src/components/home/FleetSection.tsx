import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Wind, Briefcase, CheckCircle2, PhoneCall } from "lucide-react";
import { Vehicle, Locale } from "@/types";
import { VEHICLES } from "@/lib/data/vehicles";
import {
  formatVehicleName,
  formatVehicleCategory,
  formatVehicleSeats,
  formatVehicleLuggage,
} from "@/lib/i18nHelpers";

interface FleetSectionProps {
  locale?: Locale;
  dict: {
    fleet: {
      title: string;
      subtitle: string;
      seats: string;
      ac: string;
      luggage: string;
      requestBtn: string;
    };
  };
}

export const FleetSection: React.FC<FleetSectionProps> = ({ locale = "mr", dict }) => {
  const isMr = locale === "mr";
  const [fleetData, setFleetData] = React.useState<Vehicle[]>(VEHICLES.slice(0, 3));

  React.useEffect(() => {
    fetch("/api/admin/vehicles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.vehicles) && data.vehicles.length > 0) {
          setFleetData(data.vehicles.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="fleet" className="py-20 bg-brand-tint/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-3.5 py-1.5 rounded-full">
            {isMr ? "स्वराज फ्लीट कॅटलॉग" : "Our Vehicle Fleet"}
          </span>
          <h2 className="mt-3 font-mr font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            {dict.fleet.title}
          </h2>
          <div className="w-16 h-1 bg-brand-saf2 mx-auto my-3 rounded-full" />
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            {dict.fleet.subtitle}
          </p>
        </div>

        {/* Fleet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fleetData.map((car) => {
            const displayName = formatVehicleName(car, locale);
            const categoryDisplay = formatVehicleCategory(car.category, locale);
            const seatsDisplay = formatVehicleSeats(car.seats, locale);
            const luggageDisplay = formatVehicleLuggage(car.luggage, locale);

            return (
              <article
                key={car.id}
                className="bg-white rounded-2xl overflow-hidden border border-brand-border/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Vehicle Image */}
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <Image
                    src={car.image}
                    alt={displayName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-brand-saf text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                    {car.ownership === "owned"
                      ? isMr
                        ? "स्वराज स्वतःची गाडी"
                        : "Swaraj Owned Fleet"
                      : isMr
                      ? "सत्यापित भागीदार"
                      : "Verified Partner"}
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-brand-saf uppercase">
                        {categoryDisplay}
                      </span>
                      {car.isAvailable ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />{" "}
                          {isMr ? "उपलब्ध" : "Available"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          {isMr ? "मागणीनुसार उपलब्ध" : "On Request"}
                        </span>
                      )}
                    </div>
                    <h3 className="font-mr font-bold text-lg text-gray-900 group-hover:text-brand-saf transition-colors">
                      {displayName}
                    </h3>
                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                      {isMr ? car.descriptionMr : car.descriptionEn}
                    </p>
                  </div>

                  {/* Specs Chips */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-xs text-gray-700 font-medium">
                    <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg">
                      <Users className="w-3.5 h-3.5 text-brand-saf shrink-0" />
                      <span className="truncate">{seatsDisplay}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg">
                      <Wind className="w-3.5 h-3.5 text-brand-saf shrink-0" />
                      <span>{isMr ? "पूर्ण एसी" : "Chilled AC"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg">
                      <Briefcase className="w-3.5 h-3.5 text-brand-saf shrink-0" />
                      <span className="truncate">{luggageDisplay}</span>
                    </div>
                  </div>

                  {/* Booking Button */}
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/919325232301?text=${encodeURIComponent(
                        `Hello Swaraj Tours & Travels, I am interested in booking ${car.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-brand-saf hover:bg-brand-red text-white text-sm font-bold py-3 rounded-xl transition-all shadow hover:shadow-md"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{dict.fleet.requestBtn}</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View Full Fleet CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 bg-brand-navy hover:bg-black text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95"
          >
            <span>
              {isMr
                ? "आमच्या सर्व गाड्या व पारदर्शक दर पहा"
                : "View All Vehicles & Transparent Rates"}
            </span>
            <PhoneCall className="w-4 h-4 text-brand-yellow" />
          </Link>
        </div>
      </div>
    </section>
  );
};
