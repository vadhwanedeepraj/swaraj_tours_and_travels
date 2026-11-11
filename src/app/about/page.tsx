"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  CheckCircle2,
  PhoneCall,
  Clock,
  Car,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";

export default function AboutPage() {
  const pillars = [
    {
      icon: ShieldCheck,
      titleEn: "Safety & Sanitization First",
      titleMr: "सुरक्षा व सॅनिटायझेशन प्रथम",
      descEn:
        "Every vehicle undergoes periodic mechanical checkups, tire quality audits, and deep vacuum sanitization before every highway journey.",
      descMr:
        "प्रत्येक लांबच्या प्रवासापूर्वी संपूर्ण गाडीची तपासणी, ब्रेक-टायर ऑडीट आणि स्वच्छता केली जाते. महिला व वृद्धांसाठी १००% सुरक्षित प्रवास.",
    },
    {
      icon: Users,
      titleEn: "Verified & Polite Chauffeurs",
      titleMr: "चारित्र्य-सत्यापित व नम्र चालक",
      descEn:
        "Our drivers are background-verified, non-smoking, polite, and deeply knowledgeable about Maharashtra highways and temple circuits.",
      descMr:
        "आमचे सर्व चालक पोलीस-व्हेरिफाईड, निर्व्यसनी आणि नम्र आहेत. महाराष्ट्रातील रस्ते, घाट आणि मंदिरे यांचा त्यांना दीर्घ अनुभव आहे.",
    },
    {
      icon: Award,
      titleEn: "100% Transparent Billing",
      titleMr: "१००% पारदर्शक बिलिंग",
      descEn:
        "Zero hidden costs. Per kilometer rates, driver bhatta, and toll guidelines are communicated clearly before trip confirmation.",
      descMr:
        "कोणतेही छुपे शुल्क नाही. प्रति किलोमीटर दर आणि ड्रायव्हर भत्ता बुकिंगच्या वेळीच स्पष्टपणे सांगितले जातात.",
    },
    {
      icon: Clock,
      titleEn: "Punctuality & Zero Waiting",
      titleMr: "वेळेची अचूकता",
      descEn:
        "We respect your sacred travel time. Vehicles arrive 10 to 15 minutes before the scheduled pickup time at your doorstep.",
      descMr:
        "आम्ही तुमच्या वेळेचे मोल जाणतो. ठरलेल्या वेळेच्या १० ते १५ मिनिटे आधी गाडी तुमच्या घरासमोर किंवा रेल्वे स्टेशनवर हजर असते.",
    },
    {
      icon: Compass,
      titleEn: "24/7 Highway Coordination",
      titleMr: "२४/७ अखंड सहकार्य व मदत",
      descEn:
        "Our Nanded control desk stays in active contact with the driver and passengers throughout your journey for peace of mind.",
      descMr:
        "नांदेडमधील आमचे कंट्रोल युनिट प्रवासादरम्यान चालकाशी सतत संपर्कात राहते. आपत्कालीन परिस्थितीत तात्काळ मदत उपलब्ध केली जाते.",
    },
  ];

  const stats = [
    { number: "10,000+", labelEn: "Successful Trips", labelMr: "यशस्वी सहली" },
    { number: "15+", labelEn: "Fleet Vehicles", labelMr: "सुसज्ज वाहने" },
    { number: "4.9 ★", labelEn: "Customer Rating", labelMr: "ग्राहकांचे रेटिंग" },
    { number: "24/7", labelEn: "Helpline Support", labelMr: "हेल्पलाईन मदत" },
  ];

  return (
    <PageShell>
      {({ locale }) => {
        const isMr = locale === "mr";

        return (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-4 py-1.5 rounded-full inline-block">
                  {isMr ? "॥ जय भवानी ॥ जय शिवाजी ॥" : "॥ Jai Bhavani ॥ Jai Shivaji ॥"}
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-mr text-gray-900 tracking-tight leading-tight">
                  {isMr ? (
                    <>
                      स्वराज टुर्स अँड ट्रॅव्हल्स, नांदेड
                      <span className="block text-brand-saf mt-2">
                        प्रवास सुखकर... आमची जबाबदारी...!
                      </span>
                    </>
                  ) : (
                    <>
                      Swaraj Tours & Travels, Nanded
                      <span className="block text-brand-saf mt-2">
                        Comfortable Journey... Our Responsibility...!
                      </span>
                    </>
                  )}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {isMr
                    ? "छत्रपती शिवाजी महाराजांच्या आदर्श मूल्यांमधून प्रेरणा घेऊन स्थापन झालेले 'स्वराज टुर्स अँड ट्रॅव्हल्स' आज नांदेड व मराठवाड्यातील प्रवाशांच्या विश्वासाचे प्रतीक बनले आहे. प्रामाणिक सेवा, सुरक्षित प्रवास आणि वाजवी दर हेच आमचे वैशिष्ट्य आहे."
                    : "Inspired by the ethos of Chhatrapati Shivaji Maharaj, Swaraj Tours & Travels stands as a benchmark of reliability, courtesy, and integrity in Nanded, Maharashtra. We deliver safe, punctual, and memorable road journeys across the state."}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 bg-brand-saf hover:bg-brand-red text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform active:scale-95 text-sm"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>
                      {isMr ? "आत्ताच गाडी बुक करा" : "Book Your Ride"}
                    </span>
                  </Link>

                  <Link
                    href="/fleet"
                    className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full transition-colors text-sm"
                  >
                    <Car className="w-4 h-4 text-brand-saf" />
                    <span>
                      {isMr ? "आमच्या गाड्या पहा" : "View Fleet"}
                    </span>
                  </Link>
                </div>
              </div>

              {/* Hero Image / Emblem Card with Chhatrapati Shivaji Maharaj Portrait */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border-4 border-brand-saf shadow-2xl bg-gradient-to-br from-brand-saf via-brand-saf2 to-brand-gold p-1">
                  <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-brand-navy">
                    <Image
                      src="/branding/shivaji-maharaj.png"
                      alt={isMr ? "छत्रपती शिवाजी महाराज" : "Chhatrapati Shivaji Maharaj"}
                      fill
                      priority
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <span className="text-xs font-bold text-brand-yellow font-mr">
                          {isMr ? "॥ जय भवानी ॥ जय शिवाजी ॥" : "॥ Jai Bhavani ॥ Jai Shivaji ॥"}
                        </span>
                        <h3 className="font-mr font-extrabold text-xl text-white mt-1">
                          {isMr ? "छत्रपती शिवाजी महाराज" : "Chhatrapati Shivaji Maharaj"}
                        </h3>
                        <p className="text-xs text-amber-200 mt-0.5 font-medium">
                          {isMr
                            ? "आमची अखंड प्रेरणा व आदर्श"
                            : "Our Guiding Inspiration & Values"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Numbers & Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 text-center border border-brand-border shadow-md hover:shadow-xl transition-all"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-brand-saf tracking-tight">
                    {s.number}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-700 mt-2 font-mr">
                    {isMr ? s.labelMr : s.labelEn}
                  </div>
                </div>
              ))}
            </div>

            {/* Mission & Vision Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 border-l-8 border-l-brand-saf border-t border-r border-b border-brand-border shadow-md">
                <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-3 py-1 rounded-full">
                  {isMr ? "आमचे ध्येय" : "Our Mission"}
                </span>
                <h2 className="text-2xl font-extrabold font-mr text-gray-900 mt-3">
                  {isMr ? "आमचे ध्येय" : "Our Mission"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                  {isMr
                    ? "नांदेड आणि मराठवाड्यातील प्रत्येक प्रवाशासाठी अत्यंत सुरक्षित, आरामदायी आणि किफायतशीर प्रवास सेवा उपलब्ध करून देणे. प्रवाशांच्या कुटुंबातील ज्येष्ठ नागरिक आणि महिलांना निर्धास्त आणि सन्मानपूर्वक प्रवास अनुभव देणे हेच आमचे मुख्य उद्दिष्ट आहे."
                    : "To deliver unmatched safety, comfort, and transparency in road travel for every citizen of Nanded and Marathwada, ensuring our guests reach their sacred and personal destinations with complete peace of mind."}
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border-l-8 border-l-brand-gold border-t border-r border-b border-brand-border shadow-md">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider bg-brand-yellow/10 px-3 py-1 rounded-full">
                  {isMr ? "आमची दृष्टी" : "Our Vision"}
                </span>
                <h2 className="text-2xl font-extrabold font-mr text-gray-900 mt-3">
                  {isMr ? "आमची दृष्टी" : "Our Vision"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                  {isMr
                    ? "मराठवाड्यातील अग्रगण्य, विश्वासू आणि तंत्रज्ञानस्नेही टूर ऑपरेटर म्हणून नावारूपास येणे. दर्जेदार गाड्या, प्रामाणिक चालक आणि आधुनिक डिजिटल बुकिंग प्रणालीच्या माध्यमातून प्रवासाचा दर्जा उंचावणे."
                    : "To be recognized as Maharashtra's most trusted and culturally rooted travel partner, uniting heritage values with modern fleet reliability and hassle-free instant digital booking."}
                </p>
              </div>
            </div>

            {/* 5 Core Pillars */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-4 py-1.5 rounded-full inline-block">
                  {isMr ? "आमची मूल्ये" : "Our Core Values"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-mr text-gray-900 mt-3">
                  {isMr
                    ? "स्वराजचे ५ विश्वासाचे आधारस्तंभ"
                    : "The 5 Pillars of Swaraj Travels"}
                </h2>
                <div className="w-16 h-1 bg-brand-saf2 mx-auto my-3 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillars.map((pillar, idx) => {
                  const IconComponent = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-brand-tint flex items-center justify-center text-brand-saf mb-4 group-hover:bg-brand-saf group-hover:text-white transition-colors">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h3 className="font-mr font-bold text-lg text-gray-900 group-hover:text-brand-saf transition-colors">
                          {isMr ? pillar.titleMr : pillar.titleEn}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                          {isMr ? pillar.descMr : pillar.descEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chauffeur Code of Conduct Banner */}
            <div className="bg-brand-tint/60 rounded-3xl p-6 sm:p-10 border border-brand-border shadow-inner">
              <div className="max-w-3xl">
                <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-brand-border">
                  {isMr ? "चालकांची आचारसंहिता" : "Chauffeur Standards"}
                </span>
                <h3 className="text-2xl font-extrabold font-mr text-gray-900 mt-3">
                  {isMr
                    ? "आमचे चालक – नम्र, अनुभवी आणि दक्ष"
                    : "Vetted Drivers Trained in Etiquette & Safe Driving"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  {isMr
                    ? "स्वराज टुर्सचे चालक केवळ वाहक नसून प्रवासातील मार्गदर्शक व मदतनीस असतात. गाडीत धुम्रपान किंवा मद्यपानास सक्त मनाई, महिला प्रवाशांचा आदर आणि वेगमर्यादा पाळण्याचे कडक नियम आहेत."
                    : "Our drivers adhere to strict zero-tolerance policies on duty, defensive highway steering, senior passenger luggage assistance, and clean cabin hygiene."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs text-gray-800 font-semibold">
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-brand-border">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {isMr ? "पोलीस पडताळणी पूर्ण" : "Police Verified Records"}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-brand-border">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {isMr ? "१०+ वर्षे महामार्ग अनुभव" : "10+ Years Highway Experience"}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-brand-border">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {isMr ? "मार्ग व मंदिरांचे अचूक ज्ञान" : "Route & Temple Guides"}
                  </span>
                </div>
              </div>
            </div>

            {/* Leadership Spotlight: Founder Shivraj Vadhwane & Built by Deepraj Vadhwane */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-lg space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="relative h-16 sm:h-20 w-28 sm:w-36 mx-auto">
                  <Image
                    src="/branding/logo.png"
                    alt="Swaraj Tours & Travels Official Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-4 py-1.5 rounded-full inline-block">
                  {isMr ? "स्वराज ग्रुप नेतृत्व · Swaraj Group Leadership" : "Swaraj Group Leadership"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-mr text-gray-900 mt-2">
                  {isMr ? "संस्थापक व मार्गदर्शक नेतृत्व" : "Founder & Visionary Leadership"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {isMr
                    ? "नांदेडच्या मातीतून उभा राहिलेला एक अग्रगण्य व विश्वासू ट्रॅव्हल मोबिलिटी ब्रँड"
                    : "A leading, customer-first travel mobility brand originating from Nanded, Maharashtra"}
                </p>
                <div className="w-16 h-1 bg-brand-saf2 mx-auto my-3 rounded-full" />
              </div>

              {/* Highlighted Founder Card: Shivraj Vadhwane */}
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-tint/70 via-white to-brand-tint/30 rounded-3xl p-7 sm:p-10 border-2 border-brand-saf/30 shadow-md hover:shadow-xl transition-all">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* Founder Emblem Avatar */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-brand-saf via-brand-saf2 to-brand-red text-white font-black text-3xl sm:text-4xl flex items-center justify-center shadow-xl ring-4 ring-brand-gold/40 shrink-0">
                    SV
                  </div>

                  <div className="space-y-4 text-center sm:text-left flex-1">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-saf uppercase tracking-wider font-mr bg-white px-3 py-1 rounded-full border border-brand-saf/30 shadow-sm">
                        <span>👑</span>
                        <span>{isMr ? "संस्थापक व प्रमुख संचालक (Founder & Director)" : "Founder & Managing Director"}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-gray-900 font-mr mt-2">
                        {isMr ? "शिवराज वाधवणे" : "Shivraj Vadhwane"}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-0.5">
                        {isMr ? "स्वराज ग्रुप व स्वराज टुर्स अँड ट्रॅव्हल्स, नांदेड" : "Swaraj Group & Swaraj Tours & Travels, Nanded"}
                      </p>
                    </div>

                    <div className="relative bg-white p-5 rounded-2xl border border-brand-border text-xs sm:text-sm text-gray-700 leading-relaxed italic shadow-inner">
                      "{isMr
                        ? "नांदेड व मराठवाड्यातील प्रत्येक कुटुंबाला, भाविकांना व प्रवाशांना १००% सुरक्षित, विश्वासार्ह, सन्माननीय आणि पारदर्शक प्रवास सेवा देणे हेच आमचे प्रथम कर्तव्य आहे. छत्रपती शिवरायांच्या आदर्श नीतिमूल्यांनी प्रेरित होऊन प्रामाणिक सेवा व वेळेची अचूकता राखणे हा आमचा दृढ निश्चय आहे."
                        : "Our primary mission is ensuring every pilgrim, family, and traveler journeys with dignity, punctuality, and uncompromised safety across Maharashtra and beyond, rooted in trust and transparent service."}"
                    </div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                      <span className="text-[11px] font-bold bg-white text-gray-800 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                        👑 {isMr ? "व्हिजन व फ्लीट ऑपरेशन्स" : "Fleet Operations & Vision"}
                      </span>
                      <span className="text-[11px] font-bold bg-white text-gray-800 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                        🛡️ {isMr ? "१००% प्रवासी सुरक्षा" : "Passenger Safety Protocol"}
                      </span>
                      <span className="text-[11px] font-bold bg-white text-gray-800 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                        🤝 {isMr ? "मराठवाड्याचा विश्वास" : "Regional Trust"}
                      </span>
                      <span className="text-[11px] font-bold bg-white text-gray-800 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                        ⏰ {isMr ? "२४/७ अखंड सेवा" : "24/7 Availability"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dedicated Engineering & Platform Build Credit: Deepraj Vadhwane */}
              <div className="max-w-4xl mx-auto pt-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-gray-900 via-[#142B59] to-[#0E1D3A] text-white rounded-2xl p-4 sm:p-6 shadow-md border border-white/10">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-12 h-12 rounded-xl bg-brand-saf text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
                      DV
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest block font-mono">
                        {isMr ? "⚡ डिजिटल प्लॅटफॉर्म निर्मिती · Platform Architecture" : "Platform Architecture & Engineering"}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                        {isMr
                          ? "दीपराज वाधवणे द्वारे विकसित (Built by Deepraj Vadhwane)"
                          : "Engineered & Built by Deepraj Vadhwane"}
                      </h4>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {isMr
                          ? "आधुनिक तंत्रज्ञान, डिजिटल बुकिंग व २४x७ ग्राहक अनुभव प्लॅटफॉर्म"
                          : "Full-Stack Travel Mobility System & Digital Customer Experience"}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-semibold bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-amber-200 whitespace-nowrap">
                    🚀 {isMr ? "आधुनिक ट्रॅव्हल स्टार्टअप" : "Modern Mobility Startup"}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-brand-dark to-brand-navy text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider">
                  {isMr ? "स्वराजसोबत प्रवास" : "Travel with Swaraj"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-mr">
                  {isMr
                    ? "तुमचा पुढचा प्रवास आमच्यासोबत नियोजित करा"
                    : "Plan Your Next Journey With Swaraj"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300">
                  {isMr
                    ? "नांदेड किंवा महाराष्ट्रात कुठेही जाण्यासाठी आजच संपर्क करा आणि सुखकर प्रवासाचा अनुभव घ्या."
                    : "Call our 24/7 helpline or book online for immediate quotes with zero hidden charges."}
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/book"
                    className="bg-brand-saf hover:bg-brand-red text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform active:scale-95 text-sm"
                  >
                    {isMr ? "ऑनलाइन बुकिंग फॉर्म" : "Book Online Now"}
                  </Link>
                  <a
                    href="tel:+919325232301"
                    className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full border border-white/20 transition-colors text-sm flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4 text-brand-yellow" />
                    <span>{isMr ? "९३२५२३२३०१" : "9325232301"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </PageShell>
  );
}
