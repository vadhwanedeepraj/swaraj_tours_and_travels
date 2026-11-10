"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Users,
  Wind,
  Briefcase,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Star,
  Fuel,
  Calculator,
  MessageSquare,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { VEHICLES, getVehicleBySlug } from "@/lib/data/vehicles";
import { Vehicle } from "@/types";

export default function VehicleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(() => getVehicleBySlug(params.slug));
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>(VEHICLES);

  useEffect(() => {
    fetch("/api/admin/vehicles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.vehicles) && data.vehicles.length > 0) {
          setAllVehicles(data.vehicles);
          const match = data.vehicles.find((v: Vehicle) => v.slug === params.slug || v.id === params.slug);
          if (match) setVehicle(match);
        }
      })
      .catch(() => {});
  }, [params.slug]);

  if (!vehicle) {
    notFound();
  }

  // Fare Estimator State
  const [estimatedKm, setEstimatedKm] = useState<number>(350);
  const [days, setDays] = useState<number>(1);

  // Embedded quotation form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupCity, setPickupCity] = useState("Nanded");
  const [dropCity, setDropCity] = useState("");
  const [tripDate, setTripDate] = useState("");

  // Fare calculations
  const chargeableKm = Math.max(estimatedKm, vehicle.minKmPerDay * days);
  const baseFare = chargeableKm * vehicle.ratePerKm;
  const driverBhatta = vehicle.driverAllowancePerDay * days;
  const estimatedTotal = baseFare + driverBhatta;

  const otherVehicles = allVehicles.filter((v) => v.id !== vehicle.id).slice(0, 3);

  return (
    <PageShell>
      {({ locale }) => (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-500">
            <Link href="/" className="hover:text-brand-saf">
              {locale === "mr" ? "मुख्यपृष्ठ" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/fleet" className="hover:text-brand-saf">
              {locale === "mr" ? "आमच्या गाड्या" : "Fleet"}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">
              {locale === "mr" ? vehicle.marathiName : vehicle.name}
            </span>
          </nav>

          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Images & Specs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Image Banner */}
              <div className="relative aspect-[16/10] bg-gray-100 rounded-3xl overflow-hidden border border-brand-border/80 shadow-lg">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute top-4 right-4 bg-brand-saf text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg">
                  {vehicle.ownership === "owned"
                    ? locale === "mr"
                      ? "स्वराज स्वतःची फ्लीट"
                      : "Swaraj Owned Vehicle"
                    : locale === "mr"
                    ? "सत्यापित भागीदार"
                    : "Verified Partner Fleet"}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-xs flex items-center gap-2">
                  <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                  <span className="font-bold">4.9 / 5.0 Rating</span>
                  <span className="text-gray-300">| 100+ Journeys</span>
                </div>
              </div>

              {/* Title & Core Meta */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-3 py-1 rounded-full">
                    {vehicle.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {locale === "mr" ? "सज्ज व उपलब्ध" : "Sanitized & Ready"}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-mr text-gray-900 tracking-tight">
                  {locale === "mr" ? vehicle.marathiName : vehicle.name}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
                  {locale === "mr" ? vehicle.descriptionMr : vehicle.descriptionEn}
                </p>
              </div>

              {/* Key Specs Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-brand-border text-center shadow-sm">
                  <Users className="w-5 h-5 text-brand-saf mx-auto mb-1.5" />
                  <span className="text-xs text-gray-500 block">
                    {locale === "mr" ? "बैठक क्षमता" : "Seating"}
                  </span>
                  <span className="font-bold text-sm text-gray-900">
                    {vehicle.seats}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-brand-border text-center shadow-sm">
                  <Wind className="w-5 h-5 text-brand-saf mx-auto mb-1.5" />
                  <span className="text-xs text-gray-500 block">
                    {locale === "mr" ? "वातानुकूलन" : "AC System"}
                  </span>
                  <span className="font-bold text-sm text-gray-900">
                    {locale === "mr" ? "पूर्ण एसी" : "Dual / Chilled AC"}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-brand-border text-center shadow-sm">
                  <Briefcase className="w-5 h-5 text-brand-saf mx-auto mb-1.5" />
                  <span className="text-xs text-gray-500 block">
                    {locale === "mr" ? "सामान जागा" : "Luggage"}
                  </span>
                  <span className="font-bold text-xs text-gray-900 line-clamp-1">
                    {vehicle.luggage}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-brand-border text-center shadow-sm">
                  <Fuel className="w-5 h-5 text-brand-saf mx-auto mb-1.5" />
                  <span className="text-xs text-gray-500 block">
                    {locale === "mr" ? "प्रति किमी दर" : "Base Rate"}
                  </span>
                  <span className="font-bold text-sm text-brand-saf">
                    ₹{vehicle.ratePerKm} / km
                  </span>
                </div>
              </div>

              {/* Features & Amenities List */}
              <div className="bg-brand-tint/30 rounded-3xl p-6 border border-brand-border">
                <h3 className="text-lg font-bold font-mr text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-saf" />
                  <span>
                    {locale === "mr"
                      ? "गाडीची वैशिष्ट्ये व सोयी-सुविधा"
                      : "Included Vehicle Amenities & Comfort"}
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700">
                  {(locale === "mr" ? vehicle.featuresMr : vehicle.featuresEn).map(
                    (feat, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-brand-border/60 text-xs text-gray-600">
                  <strong className="text-gray-900">
                    {locale === "mr" ? "कोणासाठी सर्वोत्तम: " : "Best Suited For: "}
                  </strong>
                  <span>{locale === "mr" ? vehicle.bestForMr : vehicle.bestForEn}</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Fare Calculator & Embedded Booking */}
            <div className="lg:col-span-5 space-y-6">
              {/* Interactive Fare Estimator */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-brand-saf" />
                    <h3 className="font-mr font-bold text-lg text-gray-900">
                      {locale === "mr"
                        ? "भाड्याचा अंदाज कॅल्क्युलेटर"
                        : "Instant Fare Estimator"}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-brand-saf bg-brand-saf/10 px-2.5 py-1 rounded-md">
                    ₹{vehicle.ratePerKm}/km
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  {/* Kilometers Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>{locale === "mr" ? "अपेक्षित अंतर (KM)" : "Estimated Travel Distance"}</span>
                      <span className="text-brand-saf text-sm font-extrabold">{estimatedKm} km</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="1500"
                      step="25"
                      value={estimatedKm}
                      onChange={(e) => setEstimatedKm(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-saf"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>100 km</span>
                      <span>500 km</span>
                      <span>1000 km</span>
                      <span>1500 km</span>
                    </div>
                  </div>

                  {/* Days Selector */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {locale === "mr" ? "प्रवासाचे दिवस" : "Number of Days"}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDays(d)}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                            days === d
                              ? "bg-brand-saf text-white border-brand-saf shadow-sm"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {d} {locale === "mr" ? "दिवस" : "Day"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="bg-brand-tint/60 rounded-2xl p-4 text-xs space-y-2 border border-brand-border">
                    <div className="flex justify-between text-gray-700">
                      <span>
                        {locale === "mr" ? "किमी भाडे (" : "Distance Fare ("}
                        {chargeableKm} km × ₹{vehicle.ratePerKm})
                      </span>
                      <span className="font-bold">₹{baseFare.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>
                        {locale === "mr" ? "चालक भत्ता (" : "Driver Allowance ("}
                        {days} {locale === "mr" ? "दिवस" : "Day"} × ₹
                        {vehicle.driverAllowancePerDay})
                      </span>
                      <span className="font-bold">₹{driverBhatta.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="pt-2 border-t border-brand-border flex justify-between items-baseline">
                      <span className="font-bold text-gray-900 text-sm">
                        {locale === "mr" ? "अंदाजे एकूण भाडे:" : "Estimated Total:"}
                      </span>
                      <span className="text-xl font-extrabold text-brand-saf">
                        ₹{estimatedTotal.toLocaleString("en-IN")}*
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 pt-1">
                      *
                      {locale === "mr"
                        ? "टोल टॅक्स आणि पार्किंग पावतीनुसार प्रत्यक्ष बिलात जोडली जाईल."
                        : "Toll charges and parking at actuals. Final quote confirmed directly."}
                    </p>
                  </div>
                </div>

                {/* Direct Booking CTA */}
                <div className="mt-5 space-y-2">
                  <Link
                    href={`/book?vehicle=${vehicle.slug}&destination=${encodeURIComponent(
                      dropCity
                    )}`}
                    className="w-full flex items-center justify-center gap-2 bg-brand-saf hover:bg-brand-red text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 text-center text-sm"
                  >
                    <Calendar className="w-4 h-4 text-brand-yellow" />
                    <span>
                      {locale === "mr"
                        ? "या गाडीसाठी तारीख निवडा व बुक करा"
                        : "Book This Car Online"}
                    </span>
                  </Link>

                  <a
                    href={`https://wa.me/919325232301?text=${encodeURIComponent(
                      `Hello Swaraj Tours & Travels, I want to book ${vehicle.name} for approximately ${estimatedKm} km (${days} days). Estimated quote: ₹${estimatedTotal}. Please confirm availability.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all active:scale-95 text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>
                      {locale === "mr"
                        ? "WhatsApp वर त्वरित कोटेशन घ्या"
                        : "Instant WhatsApp Quotation"}
                    </span>
                  </a>
                </div>
              </div>

              {/* 24/7 Nanded Helpline */}
              <div className="bg-brand-dark text-white rounded-3xl p-6 text-center border-t-4 border-brand-saf">
                <span className="text-xs text-brand-saf2 font-bold uppercase tracking-wider block">
                  Quick Dispatch from Nanded
                </span>
                <p className="font-mr font-bold text-lg mt-1">
                  {locale === "mr"
                    ? "तात्काळ माहितीसाठी कॉल करा"
                    : "Have Questions? Call Us Now"}
                </p>
                <div className="mt-3">
                  <a
                    href="tel:+919325232301"
                    className="inline-flex items-center gap-2 bg-brand-saf hover:bg-brand-red text-white font-bold px-5 py-2.5 rounded-full shadow text-sm transition-transform active:scale-95"
                  >
                    <PhoneCall className="w-4 h-4 text-brand-yellow" />
                    <span>+91 9325232301</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Other Vehicles */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="font-mr font-extrabold text-2xl text-gray-900 mb-6">
              {locale === "mr"
                ? "आमच्या इतर उपलब्ध गाड्या"
                : "Explore Alternative Vehicles"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherVehicles.map((other) => (
                <div
                  key={other.id}
                  className="bg-white rounded-2xl overflow-hidden border border-brand-border p-4 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <Image
                      src={other.image}
                      alt={other.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-brand-saf uppercase">
                      {other.category}
                    </span>
                    <h4 className="font-mr font-bold text-base text-gray-900 mt-0.5">
                      {locale === "mr" ? other.marathiName : other.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{other.seats}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-saf">
                      ₹{other.ratePerKm}/km
                    </span>
                    <Link
                      href={`/fleet/${other.slug}`}
                      className="text-xs font-bold text-gray-700 hover:text-brand-saf flex items-center gap-1"
                    >
                      <span>{locale === "mr" ? "पहा" : "View"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

