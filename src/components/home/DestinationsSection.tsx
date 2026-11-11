import React from "react";
import Link from "next/link";
import { Navigation, ArrowRight } from "lucide-react";
import { Destination, Locale } from "@/types";

interface DestinationsSectionProps {
  locale?: Locale;
  dict: {
    destinations: {
      title: string;
      subtitle: string;
      viewPackages: string;
    };
  };
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  locale = "mr",
  dict,
}) => {
  const isMr = locale === "mr";

  const destinations: Destination[] = [
    {
      id: "shirdi",
      nameEn: "Shirdi Sai Baba Darshan",
      nameMr: "शिर्डी साईबाबा दर्शन",
      categoryEn: "Pilgrimage",
      categoryMr: "तीर्थक्षेत्र",
      distanceKm: 340,
      highlightEn: "Sai Samadhi Darshan, smooth journey, and night-halt options.",
      highlightMr: "साई समाधी दर्शन, आरामदायी प्रवास आणि मुक्कामाची सोय.",
    },
    {
      id: "tuljapur",
      nameEn: "Tuljapur Bhavani Mata",
      nameMr: "तुळजापूर भवानी माता",
      categoryEn: "Shaktipeeth",
      categoryMr: "शक्तिपीठ",
      distanceKm: 260,
      highlightEn: "Bhavani Mata Kuldaivat Darshan, same-day or 2-day special trips.",
      highlightMr: "आई तुळजाभवानी दर्शन, सेम-डे किंवा २ दिवसांची विशेष ट्रिप.",
    },
    {
      id: "sambhajinagar",
      nameEn: "Chhatrapati Sambhajinagar",
      nameMr: "छत्रपती संभाजीनगर",
      categoryEn: "Heritage Tour",
      categoryMr: "ऐतिहासिक पर्यटन",
      distanceKm: 235,
      highlightEn: "Ajanta & Ellora caves, Bibi Ka Maqbara, Daulatabad Fort tour.",
      highlightMr: "वेरूळ, अजिंठा लेणी, दौलताबाद किल्ला व शहर दर्शन.",
    },
    {
      id: "hyderabad",
      nameEn: "Hyderabad City & Airport",
      nameMr: "हैदराबाद शहर व विमानतळ",
      categoryEn: "Outstation City",
      categoryMr: "आंतरराज्य प्रवास",
      distanceKm: 280,
      highlightEn: "Ramoji Film City, Charminar, Airport transfers & family trips.",
      highlightMr: "रामोजी फिल्म सिटी, चारमिनार, विमानतळ ड्रॉप व कौटुंबिक सहल.",
    },
    {
      id: "mahur",
      nameEn: "Mahurgad Renuka Mata",
      nameMr: "माहूर रेणुका माता",
      categoryEn: "Shaktipeeth",
      categoryMr: "शक्तिपीठ",
      distanceKm: 125,
      highlightEn: "Convenient single-day pilgrimage in just 2.5 hours from Nanded.",
      highlightMr: "नांदेडपासून अवघ्या अडीच तासांत सुलभ दर्शन सहल.",
    },
    {
      id: "parli",
      nameEn: "Parli Vaijnath & Aundha",
      nameMr: "परळी वैजनाथ व औंढा नागनाथ",
      categoryEn: "Jyotirlinga Tour",
      categoryMr: "ज्योतिर्लिंग दर्शन",
      distanceKm: 110,
      highlightEn: "Sacred 2-Jyotirlinga holy darshan circuit in one day.",
      highlightMr: "२ पवित्र ज्योतिर्लिंग दर्शन सर्किट एकाच दिवसात.",
    },
  ];

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-3.5 py-1.5 rounded-full">
            {isMr ? "नांदेडहून लोकप्रिय मार्ग" : "Popular Routes from Nanded"}
          </span>
          <h2 className="mt-3 font-mr font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            {dict.destinations.title}
          </h2>
          <div className="w-16 h-1 bg-brand-saf2 mx-auto my-3 rounded-full" />
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            {dict.destinations.subtitle}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl p-6 border-l-8 border-l-brand-gold border-t border-r border-b border-brand-border/80 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-brand-muted mb-2">
                  <span className="bg-brand-tint px-2.5 py-1 rounded-md text-brand-saf font-bold">
                    {isMr ? dest.categoryMr : dest.categoryEn}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <Navigation className="w-3.5 h-3.5" /> ~{dest.distanceKm} {isMr ? "किमी" : "km"}
                  </span>
                </div>
                <h3 className="font-mr font-bold text-xl text-gray-900 group-hover:text-brand-saf transition-colors">
                  {isMr ? dest.nameMr : dest.nameEn}
                </h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed font-medium">
                  {isMr ? dest.highlightMr : dest.highlightEn}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800">
                  {isMr ? `${dest.nameMr} प्रवास` : `${dest.nameEn} Tour`}
                </span>
                <a
                  href={`https://wa.me/919325232301?text=${encodeURIComponent(
                    `Hello Swaraj Tours & Travels, I want a quotation for Nanded to ${dest.nameEn} trip.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-saf hover:text-brand-red"
                >
                  <span>{isMr ? "चौकशी करा" : "Enquire"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Tour Packages CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-brand-saf hover:bg-brand-red text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95"
          >
            <span>
              {isMr
                ? "सर्व टूर पॅकेजेस व प्रवास आराखडा पहा"
                : "View All Tour Packages & Itineraries"}
            </span>
            <ArrowRight className="w-5 h-5 text-brand-yellow" />
          </Link>
        </div>
      </div>
    </section>
  );
};
