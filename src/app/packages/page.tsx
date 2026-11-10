"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Navigation,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  MapPin,
  Car,
  ShieldCheck,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { TOUR_PACKAGES } from "@/lib/data/packages";

export default function PackagesPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterTabs = [
    { key: "All", en: "All Packages", mr: "सर्व पॅकेजेस" },
    { key: "Pilgrimage", en: "Pilgrimage & Temples", mr: "तीर्थक्षेत्र दर्शन" },
    { key: "Shaktipeeth", en: "Shaktipeeth", mr: "शक्तिपीठ" },
    { key: "Heritage", en: "Heritage & History", mr: "ऐतिहासिक पर्यटन" },
    { key: "City Tour", en: "Outstation City", mr: "आंतरराज्य शहर" },
    { key: "1-Day", en: "1-Day Trips", mr: "१-दिवसीय सहल" },
  ];

  return (
    <PageShell>
      {({ locale }) => {
        const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
          if (selectedFilter === "All") return true;
          if (selectedFilter === "1-Day") return pkg.durationDays === 1;
          return pkg.category === selectedFilter;
        });

        return (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header Banner */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-4 py-1.5 rounded-full inline-block">
                {locale === "mr"
                  ? "नांदेडहून खास टूर पॅकेजेस"
                  : "Handcrafted Packages from Nanded"}
              </span>
              <h1 className="mt-3 font-mr font-extrabold text-3xl sm:text-5xl text-gray-900 tracking-tight">
                {locale === "mr"
                  ? "देवदर्शन, निसर्ग व ऐतिहासिक यात्रा"
                  : "Spiritual, Heritage & Family Tours"}
              </h1>
              <div className="w-20 h-1.5 bg-brand-saf2 mx-auto my-4 rounded-full" />
              <p className="text-base sm:text-lg text-gray-600 font-medium">
                {locale === "mr"
                  ? "शिर्डी, तुळजापूर, माहूरगड, संभाजीनगर, हैदराबाद व ज्योतिर्लिंग: तुमच्या कुटुंबासाठी घरापासून घरपोच सुरक्षित प्रवासाचे नियोजन."
                  : "Curated outstation itineraries with doorstep pickup in Nanded, comfortable AC vehicles, transparent billing, and polite drivers."}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
              {filterTabs.map((tab) => {
                const isActive = selectedFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedFilter(tab.key)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? "bg-brand-saf text-white shadow-md scale-105"
                        : "bg-white text-gray-700 border border-brand-border hover:border-brand-saf hover:text-brand-saf"
                    }`}
                  >
                    {locale === "mr" ? tab.mr : tab.en}
                  </button>
                );
              })}
            </div>

            {/* Tour Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <article
                  key={pkg.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-brand-border/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
                >
                  {/* Package Thumbnail */}
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <Image
                      src={pkg.heroImage}
                      alt={pkg.titleEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-brand-navy/85 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                      {locale === "mr" ? pkg.categoryMr : pkg.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-brand-saf text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                      {locale === "mr" ? pkg.durationMr : pkg.durationEn}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm text-brand-yellow text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-brand-saf2" />
                      <span>~{pkg.distanceKm} km from Nanded</span>
                    </div>
                  </div>

                  {/* Package Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h2 className="font-mr font-extrabold text-xl text-gray-900 group-hover:text-brand-saf transition-colors leading-snug">
                        {locale === "mr" ? pkg.titleMr : pkg.titleEn}
                      </h2>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                        {locale === "mr" ? pkg.overviewMr : pkg.overviewEn}
                      </p>
                    </div>

                    {/* Highlights List */}
                    <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs text-gray-700">
                      {(locale === "mr" ? pkg.highlightsMr : pkg.highlightsEn)
                        .slice(0, 3)
                        .map((h, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-saf shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{h}</span>
                          </div>
                        ))}
                    </div>

                    {/* Pricing & CTA */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-xs text-gray-500">
                          {locale === "mr" ? "सुरुवातीचे भाडे (Sedan):" : "Starting from:"}
                        </span>
                        <div className="text-right">
                          <span className="text-lg font-extrabold text-brand-saf">
                            ₹{pkg.startingPrice.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-gray-400 block font-normal">
                            ({locale === "mr" ? "सर्व समावेशक पॅकेज" : "Est. Package"})
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/packages/${pkg.slug}`}
                          className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2.5 rounded-xl transition-colors text-center"
                        >
                          <span>{locale === "mr" ? "आराखडा पहा" : "Itinerary"}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-saf" />
                        </Link>

                        <Link
                          href={`/book?package=${pkg.slug}`}
                          className="flex items-center justify-center gap-1 bg-brand-saf hover:bg-brand-red text-white text-xs font-bold py-2.5 rounded-xl shadow transition-all text-center"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>{locale === "mr" ? "बुक करा" : "Book Now"}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Custom Package CTA Banner */}
            <div className="mt-16 bg-gradient-to-r from-brand-saf to-brand-saf2 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl text-center md:text-left">
                <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
                  Custom Pilgrimage & Holiday Packages
                </span>
                <h3 className="text-2xl sm:text-3xl font-mr font-extrabold mt-3">
                  {locale === "mr"
                    ? "तुमची स्वतःची सहल तुमच्या वेळेनुसार आखायची आहे?"
                    : "Need a Custom Tour Planned According to Your Schedule?"}
                </h3>
                <p className="text-xs sm:text-sm text-amber-100 mt-2 leading-relaxed">
                  {locale === "mr"
                    ? "अष्टविनायक, शेगाव, तिरुपती, गोवा किंवा कोकण यात्रा: आम्ही तुमच्या बजेट व वाहनाच्या आवडीनुसार खास कोटेशन देतो."
                    : "Tell us your preferred stops, family group size, and dates. We will curate a tailor-made quotation within 15 minutes."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-saf hover:bg-brand-tint font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 text-sm"
                >
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span>
                    {locale === "mr"
                      ? "कस्टम पॅकेज विनंती पाठवा"
                      : "Request Custom Package"}
                  </span>
                </Link>

                <a
                  href="https://wa.me/919325232301?text=Hello%20Swaraj%20Travels%2C%20I%20want%20a%20customized%20tour%20package%20from%20Nanded."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3.5 rounded-xl shadow transition-transform active:scale-95 text-sm"
                >
                  <span>WhatsApp: 9325232301</span>
                </a>
              </div>
            </div>
          </div>
        );
      }}
    </PageShell>
  );
}

