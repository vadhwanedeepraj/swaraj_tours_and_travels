"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  Navigation,
  CheckCircle2,
  XCircle,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
  Car,
  MessageSquare,
  Sparkles,
  Info,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { TOUR_PACKAGES, getPackageBySlug } from "@/lib/data/packages";
import { TourPackage } from "@/types";

export default function PackageDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [pkg, setPkg] = useState<TourPackage | undefined>(() => getPackageBySlug(params.slug));
  const [allPackages, setAllPackages] = useState<TourPackage[]>(TOUR_PACKAGES);

  useEffect(() => {
    fetch("/api/admin/packages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.packages) && data.packages.length > 0) {
          setAllPackages(data.packages);
          const found = data.packages.find((p: TourPackage) => p.slug === params.slug);
          if (found) setPkg(found);
        }
      })
      .catch(() => {});
  }, [params.slug]);

  if (!pkg) {
    notFound();
  }

  const [selectedVehicle, setSelectedVehicle] = useState(
    pkg.recommendedVehicles?.[0]?.vehicleName || "Swift Dzire"
  );

  const activeVehicleQuote =
    pkg.recommendedVehicles?.find((v) => v.vehicleName === selectedVehicle) ||
    pkg.recommendedVehicles?.[0];

  const otherPackages = allPackages.filter((p) => p.slug !== pkg.slug).slice(
    0,
    3
  );

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
            <Link href="/packages" className="hover:text-brand-saf">
              {locale === "mr" ? "टूर पॅकेजेस" : "Packages"}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold truncate max-w-[200px] sm:max-w-md">
              {locale === "mr" ? pkg.titleMr : pkg.titleEn}
            </span>
          </nav>

          {/* Hero Banner with Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Main Image Header */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-gray-100 rounded-3xl overflow-hidden border border-brand-border/80 shadow-lg">
                <Image
                  src={pkg.heroImage}
                  alt={pkg.titleEn}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
                <div className="absolute top-4 left-4 bg-brand-navy/90 backdrop-blur-sm text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow">
                  {locale === "mr" ? pkg.categoryMr : pkg.category}
                </div>
                <div className="absolute top-4 right-4 bg-brand-saf text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow">
                  {locale === "mr" ? pkg.durationMr : pkg.durationEn}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-sm text-brand-yellow text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-brand-saf2" />
                  <span>~{pkg.distanceKm} km Roundtrip from Nanded</span>
                </div>
              </div>

              {/* Title & Overview */}
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-mr text-gray-900 tracking-tight leading-snug">
                  {locale === "mr" ? pkg.titleMr : pkg.titleEn}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
                  {locale === "mr" ? pkg.overviewMr : pkg.overviewEn}
                </p>

                {/* Pickup badge */}
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-brand-saf bg-brand-tint/80 px-3.5 py-2 rounded-xl inline-flex">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>
                    {locale === "mr" ? "पिकअप व ड्रॉप ठिकाण: " : "Pickup & Drop: "}
                    {pkg.pickupDrop}
                  </span>
                </div>
              </div>

              {/* Day-by-Day Detailed Itinerary */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <h2 className="text-xl sm:text-2xl font-extrabold font-mr text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-brand-saf" />
                    <span>
                      {locale === "mr"
                        ? "दिवसनिहाय संपूर्ण प्रवास नियोजन (Itinerary)"
                        : "Day-by-Day Detailed Itinerary"}
                    </span>
                  </h2>
                </div>

                <div className="space-y-6">
                  {pkg.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border/80 shadow-md relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-brand-saf text-white font-bold text-sm flex items-center justify-center shrink-0 shadow">
                            {day.day}
                          </span>
                          <h3 className="font-mr font-bold text-base sm:text-lg text-gray-900">
                            {locale === "mr" ? day.titleMr : day.titleEn}
                          </h3>
                        </div>
                        {day.timeSlot && (
                          <span className="text-xs font-bold text-brand-saf bg-brand-tint px-3 py-1 rounded-full flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{day.timeSlot}</span>
                          </span>
                        )}
                      </div>

                      <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                        {(locale === "mr" ? day.activitiesMr : day.activitiesEn).map(
                          (act, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-saf shrink-0 mt-2" />
                              <span className="leading-relaxed">{act}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-200">
                  <h3 className="font-mr font-bold text-base text-emerald-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>
                      {locale === "mr"
                        ? "पॅकेजमध्ये काय समाविष्ट आहे?"
                        : "What is Included"}
                    </span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                    {(locale === "mr" ? pkg.inclusionsMr : pkg.inclusionsEn).map(
                      (inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-red-50/40 rounded-3xl p-6 border border-red-200">
                  <h3 className="font-mr font-bold text-base text-red-900 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span>
                      {locale === "mr"
                        ? "पॅकेजमध्ये काय समाविष्ट नाही?"
                        : "What is Excluded"}
                    </span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-red-950">
                    {(locale === "mr" ? pkg.exclusionsMr : pkg.exclusionsEn).map(
                      (exc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span>{exc}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Booking & Vehicle Choices Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Vehicle Options Comparison Card */}
              <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-xl">
                <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-3 py-1 rounded-full">
                  {locale === "mr" ? "गाडी व भाडे पर्याय" : "Choose Vehicle"}
                </span>
                <h3 className="font-mr font-bold text-lg text-gray-900 mt-2">
                  {locale === "mr"
                    ? "उपलब्ध गाड्या व अंदाजे खर्च"
                    : "Vehicle Options & Rates"}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {locale === "mr"
                    ? "तुमच्या कुटुंबाच्या संख्येनुसार योग्य गाडी निवडा:"
                    : "Select based on your group size:"}
                </p>

                {/* Vehicle Choice Buttons */}
                <div className="mt-4 space-y-2.5">
                  {pkg.recommendedVehicles.map((opt) => {
                    const isSelected = selectedVehicle === opt.vehicleName;
                    return (
                      <button
                        key={opt.vehicleName}
                        type="button"
                        onClick={() => setSelectedVehicle(opt.vehicleName)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-brand-tint/60 border-brand-saf shadow-sm"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-gray-900">
                            {opt.vehicleName}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {opt.vehicleType}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-brand-saf text-sm">
                            ₹{opt.estimatedFare.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-gray-400 block font-normal">
                            All-Inc.
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Summary Quote Box */}
                {activeVehicleQuote && (
                  <div className="mt-5 p-4 rounded-2xl bg-brand-tint/40 border border-brand-border text-xs space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>{locale === "mr" ? "निवडलेली गाडी:" : "Selected:"}</span>
                      <span className="font-bold">{activeVehicleQuote.vehicleName}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>{locale === "mr" ? "कालावधी:" : "Duration:"}</span>
                      <span className="font-bold">
                        {locale === "mr" ? pkg.durationMr : pkg.durationEn}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-brand-border flex justify-between items-baseline">
                      <span className="font-bold text-gray-900 text-sm">
                        {locale === "mr" ? "अंदाजे पॅकेज दर:" : "Estimated Cost:"}
                      </span>
                      <span className="text-xl font-extrabold text-brand-saf">
                        ₹{activeVehicleQuote.estimatedFare.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                )}

                {/* Booking Action Buttons */}
                <div className="mt-5 space-y-2">
                  <Link
                    href={`/book?package=${pkg.slug}&vehicle=${encodeURIComponent(
                      selectedVehicle
                    )}`}
                    className="w-full flex items-center justify-center gap-2 bg-brand-saf hover:bg-brand-red text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all active:scale-95 text-center text-sm"
                  >
                    <Calendar className="w-4 h-4 text-brand-yellow" />
                    <span>
                      {locale === "mr"
                        ? "हे पॅकेज ऑनलाइन बुक करा"
                        : "Book This Tour Package"}
                    </span>
                  </Link>

                  <a
                    href={`https://wa.me/919325232301?text=${encodeURIComponent(
                      `Hello Swaraj Tours & Travels, I am interested in booking the tour package: "${pkg.titleEn}" with ${selectedVehicle}. Estimated quote: ₹${activeVehicleQuote?.estimatedFare}. Please share booking details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all active:scale-95 text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>
                      {locale === "mr"
                        ? "WhatsApp वर त्वरित चौकशी"
                        : "Enquire via WhatsApp"}
                    </span>
                  </a>
                </div>
              </div>

              {/* Nanded Travel Support */}
              <div className="bg-brand-navy text-white rounded-3xl p-6 border-t-4 border-brand-saf text-center shadow-lg">
                <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider block">
                  Swaraj Nanded Office
                </span>
                <p className="font-mr font-bold text-lg mt-1">
                  {locale === "mr"
                    ? "टूर माहितीसाठी २४ तास संपर्क"
                    : "Direct Travel Helpline"}
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  {locale === "mr"
                    ? "कस्टमायझेशन किंवा अतिरिक्त थांब्यांसाठी थेट बोला."
                    : "For custom halts or multi-day tours, talk to our coordinator."}
                </p>
                <div className="mt-4">
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

          {/* Related Alternative Packages */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="font-mr font-extrabold text-2xl text-gray-900 mb-6">
              {locale === "mr"
                ? "इतर लोकप्रिय टूर पॅकेजेस"
                : "Other Popular Packages from Nanded"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherPackages.map((other) => (
                <div
                  key={other.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-brand-border p-4 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <Image
                      src={other.heroImage}
                      alt={other.titleEn}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-brand-saf uppercase">
                      {locale === "mr" ? other.categoryMr : other.category}
                    </span>
                    <h4 className="font-mr font-bold text-base text-gray-900 mt-0.5 line-clamp-1">
                      {locale === "mr" ? other.titleMr : other.titleEn}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {locale === "mr" ? other.durationMr : other.durationEn}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-saf">
                      ₹{other.startingPrice.toLocaleString("en-IN")}+
                    </span>
                    <Link
                      href={`/packages/${other.slug}`}
                      className="text-xs font-bold text-gray-700 hover:text-brand-saf flex items-center gap-1"
                    >
                      <span>{locale === "mr" ? "तपशील" : "View"}</span>
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

