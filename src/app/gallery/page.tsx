"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Quote,
  PhoneCall,
  Camera,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { GALLERY_ITEMS, TESTIMONIALS } from "@/lib/data/gallery";
import { formatGalleryCategory } from "@/lib/i18nHelpers";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { key: "all", en: "All Photos", mr: "सर्व फोटो" },
    { key: "fleet", en: "Vehicles & Fleets", mr: "गाड्या व वाहने" },
    { key: "pilgrimage", en: "Pilgrimage & Temples", mr: "तीर्थक्षेत्र व मंदिरे" },
    { key: "heritage", en: "Heritage Tours", mr: "ऐतिहासिक पर्यटन" },
    { key: "customers", en: "Customer Moments", mr: "प्रवाशांचे खास क्षण" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <PageShell>
      {({ locale }) => {
        const isMr = locale === "mr";

        return (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-4 py-1.5 rounded-full inline-block">
                {isMr ? "सुखकर प्रवासाची छायाचित्रे" : "Moments from the Highway"}
              </span>
              <h1 className="mt-3 font-mr font-extrabold text-3xl sm:text-5xl text-gray-900 tracking-tight">
                {isMr
                  ? "प्रवास गॅलरी आणि ग्राहकांचे मनोगत"
                  : "Travel Gallery & Customer Stories"}
              </h1>
              <div className="w-20 h-1.5 bg-brand-saf2 mx-auto my-4 rounded-full" />
              <p className="text-base sm:text-lg text-gray-600 font-medium">
                {isMr
                  ? "नांदेडपासून शिर्डी, तुळजापूर, हैदराबाद आणि माहूरगड: आमच्या प्रवाशांनी अनुभवलेले अविस्मरणीय क्षण आणि विश्वसनीय सेवेची झलक."
                  : "Snapshots of our sanitized vehicle fleet, scenic journeys, sacred temple visits, and real reviews from travelers across Maharashtra."}
              </p>
            </div>

            {/* Filter Categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? "bg-brand-saf text-white shadow-md scale-105"
                        : "bg-white text-gray-700 border border-brand-border hover:border-brand-saf hover:text-brand-saf"
                    }`}
                  >
                    {isMr ? cat.mr : cat.en}
                  </button>
                );
              })}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-brand-border/80 shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
                >
                  {/* Photo */}
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={isMr ? item.titleMr : item.titleEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-brand-yellow" />
                      <span>{isMr ? item.locationMr : item.locationEn}</span>
                    </div>
                  </div>

                  {/* Caption Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-mr font-bold text-lg text-gray-900 group-hover:text-brand-saf transition-colors">
                        {isMr ? item.titleMr : item.titleEn}
                      </h3>
                      {(item.descriptionMr || item.descriptionEn) && (
                        <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                          {isMr ? item.descriptionMr : item.descriptionEn}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <span className="capitalize text-[11px] font-bold text-brand-saf bg-brand-tint px-2.5 py-0.5 rounded-full">
                        {formatGalleryCategory(item.category, locale)}
                      </span>
                      <span className="text-[11px]">
                        {isMr ? "स्वराज ट्रॅव्हल्स क्षणचित्रे" : "Swaraj Travels Moments"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonials Showcase Section */}
            <div className="pt-8">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-4 py-1.5 rounded-full inline-block">
                  {isMr ? "सत्यापित ग्राहक प्रतिक्रिया" : "Verified Customer Reviews"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-mr text-gray-900 mt-3">
                  {isMr
                    ? "आमच्या प्रवाशांचे मनोगत व अनुभव"
                    : "What Our Passengers Say"}
                </h2>
                <div className="w-16 h-1 bg-brand-saf2 mx-auto my-3 rounded-full" />
                <p className="text-xs sm:text-sm text-gray-600">
                  {isMr
                    ? "नांदेड आणि महाराष्ट्रातील कुटुंबियांचा विश्वास आणि निष्ठा."
                    : "Honest feedback from individuals and families traveling with us."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative"
                  >
                    <Quote className="w-10 h-10 text-brand-saf/15 absolute top-6 right-6" />

                    <div className="space-y-3">
                      {/* Stars */}
                      <div className="flex items-center gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-brand-yellow fill-brand-yellow"
                          />
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic font-medium">
                        "{isMr ? t.commentMr : t.commentEn}"
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <h4 className="font-mr font-bold text-sm sm:text-base text-gray-900">
                          {isMr ? t.nameMr : t.nameEn}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {isMr ? t.cityMr : t.cityEn}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-bold text-brand-saf block">
                          {isMr ? t.tripMr : t.tripEn}
                        </span>
                        <span className="text-[10px] text-gray-400">{t.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Your Trip Experience Banner */}
            <div className="bg-gradient-to-r from-brand-saf via-brand-saf2 to-brand-gold text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl text-center md:text-left">
                <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
                  {isMr ? "आपले क्षण शेअर करा" : "Share With Us"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-mr font-extrabold mt-3">
                  {isMr
                    ? "तुमच्या सहलीचे सुंदर फोटो आम्हाला पाठवा"
                    : "Traveled With Us? Share Your Trip Photos"}
                </h3>
                <p className="text-xs sm:text-sm text-amber-100 mt-2 leading-relaxed">
                  {isMr
                    ? "स्वराज सोबतच्या प्रवासातील फोटो आणि अभिप्राय आमच्या WhatsApp वर शेअर करा. आम्ही ते आमच्या अधिकृत गॅलरीमध्ये समाविष्ट करू."
                    : "Send your trip photos and review to our official WhatsApp. We proudly feature our travelers' joyous journey moments."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="https://wa.me/919325232301?text=Hello%20Swaraj%20Travels%2C%20I%20want%20to%20share%20my%20trip%20photos%20and%20feedback."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-saf hover:bg-brand-tint font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 text-sm"
                >
                  <Camera className="w-4 h-4 text-brand-saf" />
                  <span>
                    {isMr ? "WhatsApp वर फोटो पाठवा" : "Share on WhatsApp"}
                  </span>
                </a>

                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 bg-brand-navy hover:bg-black text-white font-bold px-6 py-3.5 rounded-xl shadow transition-transform active:scale-95 text-sm"
                >
                  <PhoneCall className="w-4 h-4 text-brand-yellow" />
                  <span>
                    {isMr ? "नवीन गाडी बुक करा" : "Book New Ride"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        );
      }}
    </PageShell>
  );
}
