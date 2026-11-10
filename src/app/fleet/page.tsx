"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Wind,
  Briefcase,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Info,
  ShieldCheck,
  Star,
  Fuel,
  Sparkles,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { VEHICLES } from "@/lib/data/vehicles";
import { Vehicle } from "@/types";

export default function FleetPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>(VEHICLES);

  React.useEffect(() => {
    fetch("/api/admin/vehicles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.vehicles) && data.vehicles.length > 0) {
          setVehiclesList(data.vehicles);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    { key: "All", en: "All Vehicles", mr: "सर्व गाड्या" },
    { key: "Sedan", en: "Sedan (4+1)", mr: "सेडान (४+१)" },
    { key: "SUV/MUV", en: "SUV / MUV (6+1)", mr: "एसयूव्ही / अर्टिगा" },
    { key: "Luxury Coach", en: "Luxury Coach / VIP", mr: "लक्झरी व व्हीआयपी" },
    { key: "Tempo Traveller", en: "Tempo Traveller", mr: "टेम्पो ट्रॅव्हलर" },
  ];

  return (
    <PageShell>
      {({ locale }) => {
        const filteredVehicles =
          selectedCategory === "All"
            ? vehiclesList
            : vehiclesList.filter((v) => v.category === selectedCategory);

        return (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header Banner */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-4 py-1.5 rounded-full inline-block">
                {locale === "mr"
                  ? "स्वराज फ्लीट कॅटलॉग"
                  : "Verified Clean Vehicles"}
              </span>
              <h1 className="mt-3 font-mr font-extrabold text-3xl sm:text-5xl text-gray-900 tracking-tight">
                {locale === "mr"
                  ? "आमच्या सुसज्ज गाड्या आणि पारदर्शक दर"
                  : "Our Vehicle Fleet & Transparent Rates"}
              </h1>
              <div className="w-20 h-1.5 bg-brand-saf2 mx-auto my-4 rounded-full" />
              <p className="text-base sm:text-lg text-gray-600 font-medium">
                {locale === "mr"
                  ? "प्रत्येक सहलीसाठी योग्य गाडी: लहान कुटुंबापासून ते मोठ्या तीर्थयात्रा मंडळांपर्यंत. स्वच्छ इंटिरिअर, पॉवरफुल एसी आणि संयमी चालक."
                  : "Choose the perfect ride for family trips, corporate commutes, temple darshan, or grand weddings. Sanitized, AC, and GPS enabled."}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? "bg-brand-saf text-white shadow-md scale-105"
                        : "bg-white text-gray-700 border border-brand-border hover:border-brand-saf hover:text-brand-saf"
                    }`}
                  >
                    {locale === "mr" ? cat.mr : cat.en}
                  </button>
                );
              })}
            </div>

            {/* Fleet Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((car) => (
                <article
                  key={car.id}
                  className="bg-white rounded-3xl overflow-hidden border border-brand-border/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
                >
                  {/* Vehicle Image */}
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 bg-brand-saf text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      {car.ownership === "owned"
                        ? locale === "mr"
                          ? "स्वराज स्वतःची गाडी"
                          : "Swaraj Owned Fleet"
                        : locale === "mr"
                        ? "सत्यापित भागीदार"
                        : "Verified Partner Fleet"}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-brand-yellow text-xs font-bold px-3 py-1 rounded-lg">
                      ₹{car.ratePerKm} / km{" "}
                      <span className="text-white text-[10px] font-normal">
                        ({locale === "mr" ? "किमान ३०० किमी/दिवस" : "Min 300km/day"})
                      </span>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-brand-saf uppercase tracking-wider">
                          {car.category}
                        </span>
                        {car.isAvailable ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />{" "}
                            {locale === "mr" ? "उपलब्ध (Available)" : "Available"}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                            {locale === "mr" ? "मागणीनुसार (On Request)" : "On Request"}
                          </span>
                        )}
                      </div>
                      <h3 className="font-mr font-extrabold text-xl text-gray-900 group-hover:text-brand-saf transition-colors">
                        {locale === "mr" ? car.marathiName : car.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                        {locale === "mr" ? car.descriptionMr : car.descriptionEn}
                      </p>
                    </div>

                    {/* Specs Badges */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 text-xs text-gray-700 font-medium">
                      <div className="flex flex-col items-center justify-center bg-gray-50 p-2 rounded-xl text-center">
                        <Users className="w-4 h-4 text-brand-saf mb-1" />
                        <span className="text-[11px] font-bold line-clamp-1">
                          {car.seats.split("(")[0]}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-gray-50 p-2 rounded-xl text-center">
                        <Wind className="w-4 h-4 text-brand-saf mb-1" />
                        <span className="text-[11px] font-bold">
                          {locale === "mr" ? "पूर्ण एसी" : "Chilled AC"}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-gray-50 p-2 rounded-xl text-center">
                        <Briefcase className="w-4 h-4 text-brand-saf mb-1" />
                        <span className="text-[11px] font-bold line-clamp-1">
                          {locale === "mr" ? "सामान जागा" : "Luggage"}
                        </span>
                      </div>
                    </div>

                    {/* Features Snippet */}
                    <div className="space-y-1 text-xs text-gray-600">
                      {(locale === "mr" ? car.featuresMr : car.featuresEn)
                        .slice(0, 2)
                        .map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 grid grid-cols-2 gap-2">
                      <Link
                        href={`/fleet/${car.slug}`}
                        className="flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-3 rounded-xl transition-colors text-center"
                      >
                        <span>{locale === "mr" ? "तपशील पहा" : "View Details"}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-brand-saf" />
                      </Link>

                      <Link
                        href={`/book?vehicle=${car.slug}`}
                        className="flex items-center justify-center gap-1 bg-brand-saf hover:bg-brand-red text-white text-xs font-bold py-3 rounded-xl shadow hover:shadow-md transition-all text-center"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{locale === "mr" ? "आत्ताच बुक करा" : "Book Ride"}</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Transparent Pricing Breakdown Card */}
            <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-lg">
              <div className="max-w-3xl">
                <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-3 py-1 rounded-full">
                  {locale === "mr" ? "१००% पारदर्शक कारभार" : "Zero Hidden Surprises"}
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold font-mr text-gray-900">
                  {locale === "mr"
                    ? "किराया व भाडे आकारणीची रचना (Pricing Policy)"
                    : "Standard Outstation & Local Fare Structure"}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {locale === "mr"
                    ? "नांदेड आणि महाराष्ट्रात प्रवास करताना कोणत्याही छुपे शुल्काची चिंता नसावी, म्हणून आमचे दर अगोदरच स्पष्ट असतात."
                    : "Clear rate metrics for kilometer billing, driver night allowances, and toll norms."}
                </p>
              </div>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b-2 border-brand-saf/20 text-brand-navy font-bold uppercase text-xs">
                      <th className="py-3 px-4">
                        {locale === "mr" ? "गाडीचा प्रकार" : "Vehicle Model"}
                      </th>
                      <th className="py-3 px-4">
                        {locale === "mr" ? "आसने (Seats)" : "Seating"}
                      </th>
                      <th className="py-3 px-4">
                        {locale === "mr" ? "प्रति किमी दर" : "Per KM Rate"}
                      </th>
                      <th className="py-3 px-4">
                        {locale === "mr" ? "किमान अंतर" : "Min KM / Day"}
                      </th>
                      <th className="py-3 px-4">
                        {locale === "mr" ? "ड्रायव्हर भत्ता" : "Driver Allowance"}
                      </th>
                      <th className="py-3 px-4 text-right">
                        {locale === "mr" ? "बुकिंग" : "Action"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                    {vehiclesList.map((v) => (
                      <tr key={v.id} className="hover:bg-brand-tint/20 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-gray-900">
                          {locale === "mr" ? v.marathiName : v.name}
                        </td>
                        <td className="py-3.5 px-4">{v.seats}</td>
                        <td className="py-3.5 px-4 text-brand-saf font-bold">
                          ₹{v.ratePerKm} / km
                        </td>
                        <td className="py-3.5 px-4">{v.minKmPerDay} km</td>
                        <td className="py-3.5 px-4">₹{v.driverAllowancePerDay} / दिवस</td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/book?vehicle=${v.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-brand-saf hover:text-brand-red bg-brand-saf/10 hover:bg-brand-saf/20 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <span>{locale === "mr" ? "निवडा" : "Select"}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pricing Notes */}
              <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
                <div className="flex items-start gap-2.5 bg-gray-50 p-3.5 rounded-xl">
                  <Info className="w-4 h-4 text-brand-saf shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">
                      {locale === "mr" ? "टोल व पार्किंग" : "Tolls & Parking"}
                    </span>
                    <span>
                      {locale === "mr"
                        ? "फास्टॅग टोल टॅक्स आणि पार्किंग पावतीनुसार प्रत्यक्ष बिलात जोडली जाते."
                        : "FASTag tolls, airport parking, and border permits are charged at actuals."}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-gray-50 p-3.5 rounded-xl">
                  <Fuel className="w-4 h-4 text-brand-saf shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">
                      {locale === "mr" ? "इंधन व गॅस" : "Fuel Included"}
                    </span>
                    <span>
                      {locale === "mr"
                        ? "प्रति किलोमीटर दरामध्ये पेट्रोल/डिझेलचा संपूर्ण खर्च समाविष्ट आहे."
                        : "Per km rate is all-inclusive of standard fuel and regular vehicle wear."}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-gray-50 p-3.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-brand-saf shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">
                      {locale === "mr" ? "सुरक्षित प्रवास हमी" : "Safety Standard"}
                    </span>
                    <span>
                      {locale === "mr"
                        ? "२४ तास जीपीएस मॉनिटरिंग, प्रथमोपचार व अनुभवी स्थानिक चालक."
                        : "GPS monitored vehicles, courteous vetted drivers, and sanitized cabins."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </PageShell>
  );
}

