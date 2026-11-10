"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  HeartHandshake,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ArrowRight,
  Clock,
  Car,
  MapPin,
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
      titleMr: "वेळेची अचूकता (Punctuality)",
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
      {({ locale }) => (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-4 py-1.5 rounded-full inline-block">
                {locale === "mr"
                  ? "॥ जय भवानी ॥ जय शिवाजी ॥"
                  : "॥ Jai Bhavani ॥ Jai Shivaji ॥"}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-mr text-gray-900 tracking-tight leading-tight">
                {locale === "mr" ? (
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
                {locale === "mr"
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
                    {locale === "mr" ? "आत्ताच गाडी बुक करा" : "Book Your Ride"}
                  </span>
                </Link>

                <Link
                  href="/fleet"
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full transition-colors text-sm"
                >
                  <Car className="w-4 h-4 text-brand-saf" />
                  <span>
                    {locale === "mr" ? "आमच्या गाड्या पहा" : "View Fleet"}
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
                    alt="छत्रपती शिवाजी महाराज (Chhatrapati Shivaji Maharaj)"
                    fill
                    priority
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <span className="text-xs font-bold text-brand-yellow font-mr">
                        ॥ जय भवानी ॥ जय शिवाजी ॥
                      </span>
                      <h3 className="font-mr font-extrabold text-xl text-white mt-1">
                        छत्रपती शिवाजी महाराज
                      </h3>
                      <p className="text-xs text-amber-200 mt-0.5 font-medium">
                        आमची अखंड प्रेरणा · Inspired by Swarajya Values
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
                  {locale === "mr" ? s.labelMr : s.labelEn}
                </div>
              </div>
            ))}
          </div>

          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border-l-8 border-l-brand-saf border-t border-r border-b border-brand-border shadow-md">
              <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-3 py-1 rounded-full">
                Our Mission
              </span>
              <h2 className="text-2xl font-extrabold font-mr text-gray-900 mt-3">
                {locale === "mr" ? "आमचे ध्येय (Mission)" : "Our Mission"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                {locale === "mr"
                  ? "नांदेड आणि मराठवाड्यातील प्रत्येक प्रवाशासाठी अत्यंत सुरक्षित, आरामदायी आणि किफायतशीर प्रवास सेवा उपलब्ध करून देणे. प्रवाशांच्या कुटुंबातील ज्येष्ठ नागरिक आणि महिलांना निर्धास्त आणि सन्मानपूर्वक प्रवास अनुभव देणे हेच आमचे मुख्य उद्दिष्ट आहे."
                  : "To deliver unmatched safety, comfort, and transparency in road travel for every citizen of Nanded and Marathwada, ensuring our guests reach their sacred and personal destinations with complete peace of mind."}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border-l-8 border-l-brand-gold border-t border-r border-b border-brand-border shadow-md">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider bg-brand-yellow/10 px-3 py-1 rounded-full">
                Our Vision
              </span>
              <h2 className="text-2xl font-extrabold font-mr text-gray-900 mt-3">
                {locale === "mr" ? "आमची दृष्टी (Vision)" : "Our Vision"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                {locale === "mr"
                  ? "मराठवाड्यातील अग्रगण्य, विश्वासू आणि तंत्रज्ञानस्नेही टूर ऑपरेटर म्हणून नावारूपास येणे. दर्जेदार गाड्या, प्रामाणिक चालक आणि आधुनिक डिजिटल बुकिंग प्रणालीच्या माध्यमातून प्रवासाचा दर्जा उंचावणे."
                  : "To be recognized as Maharashtra's most trusted and culturally rooted travel partner, uniting heritage values with modern fleet reliability and hassle-free instant digital booking."}
              </p>
            </div>
          </div>

          {/* 5 Core Pillars */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-4 py-1.5 rounded-full inline-block">
                Our Core Values
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-mr text-gray-900 mt-3">
                {locale === "mr"
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
                        {locale === "mr" ? pillar.titleMr : pillar.titleEn}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                        {locale === "mr" ? pillar.descMr : pillar.descEn}
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
                {locale === "mr" ? "चालकांची आचारसंहिता" : "Chauffeur Standards"}
              </span>
              <h3 className="text-2xl font-extrabold font-mr text-gray-900 mt-3">
                {locale === "mr"
                  ? "आमचे चालक – नम्र, अनुभवी आणि दक्ष"
                  : "Vetted Drivers Trained in Etiquette & Safe Driving"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                {locale === "mr"
                  ? "स्वराज टुर्सचे चालक केवळ वाहक नसून प्रवासातील मार्गदर्शक व मदतनीस असतात. गाडीत धुम्रपान किंवा मद्यपानास सक्त मनाई, महिला प्रवाशांचा आदर आणि वेगमर्यादा पाळण्याचे कडक नियम आहेत."
                  : "Our drivers adhere to strict zero-tolerance policies on duty, defensive highway steering, senior passenger luggage assistance, and clean cabin hygiene."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs text-gray-800 font-semibold">
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-brand-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{locale === "mr" ? "पोलीस पडताळणी पूर्ण" : "Police Verified Records"}</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-brand-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{locale === "mr" ? "१०+ वर्षे महामार्ग अनुभव" : "10+ Years Highway Experience"}</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-brand-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{locale === "mr" ? "मार्ग व मंदिरांचे अचूक ज्ञान" : "Route & Temple Guides"}</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-brand-dark to-brand-navy text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider">
                Travel with Swaraj
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-mr">
                {locale === "mr"
                  ? "तुमचा पुढचा प्रवास आमच्यासोबत नियोजित करा"
                  : "Plan Your Next Journey With Swaraj"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                {locale === "mr"
                  ? "नांदेड किंवा महाराष्ट्रात कुठेही जाण्यासाठी आजच संपर्क करा आणि सुखकर प्रवासाचा अनुभव घ्या."
                  : "Call our 24/7 helpline or book online for immediate quotes with zero hidden charges."}
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Link
                  href="/book"
                  className="bg-brand-saf hover:bg-brand-red text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform active:scale-95 text-sm"
                >
                  {locale === "mr" ? "ऑनलाइन बुकिंग फॉर्म" : "Book Online Now"}
                </Link>
                <a
                  href="tel:+919325232301"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full border border-white/20 transition-colors text-sm flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-brand-yellow" />
                  <span>9325232301</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

