import React from "react";
import Image from "next/image";
import { MessageSquare, ArrowRight, Shield, Award, MapPin } from "lucide-react";

interface HeroSectionProps {
  dict: {
    hero: {
      titlePart1: string;
      titlePart2: string;
      lead: string;
      bookBtn: string;
      whatsappBtn: string;
      portraitAlt: string;
    };
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ dict }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-tint/30 to-brand-tint/70 pt-8 sm:pt-14 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-saf/10 border border-brand-saf/20 text-brand-saf font-semibold text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-brand-red" />
              <span>नांदेड, मराठवाडा व संपूर्ण महाराष्ट्र ट्रॅव्हल पार्टनर</span>
            </div>

            <h1 className="font-mr font-extrabold text-3xl sm:text-5xl lg:text-6xl text-brand-dark leading-[1.18] tracking-tight">
              <span className="block text-gray-900">{dict.hero.titlePart1}</span>
              <span className="block text-brand-saf mt-1 drop-shadow-sm">
                {dict.hero.titlePart2}
              </span>
            </h1>

            <p className="text-gray-700 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {dict.hero.lead}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-saf hover:bg-brand-red text-white text-base font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all transform active:scale-95"
              >
                <span>{dict.hero.bookBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919325232301?text=Hello%20Swaraj%20Tours%20%26%20Travels%2C%20I%20need%20a%20cab%20from%20Nanded."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{dict.hero.whatsappBtn}</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-border/60 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-xl sm:text-2xl font-black text-brand-saf">२४/७</span>
                <span className="text-xs text-gray-600 font-medium">उपलब्ध सेवा</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left border-x border-gray-200 px-2">
                <span className="text-xl sm:text-2xl font-black text-brand-saf">१००%</span>
                <span className="text-xs text-gray-600 font-medium">स्वच्छ व एसी गाड्या</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-xl sm:text-2xl font-black text-brand-saf">अनुभवी</span>
                <span className="text-xs text-gray-600 font-medium">स्थानिक चालक</span>
              </div>
            </div>
          </div>

          {/* Right Cultural Stage with Chhatrapati Shivaji Maharaj Frame & Bhagwa Flag */}
          <div className="lg:col-span-5 flex justify-center items-end relative pt-6 lg:pt-0">
            <div className="relative flex items-end justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-sm">
              {/* Arched Royal Portrait Frame with Chhatrapati Shivaji Maharaj Photo */}
              <div className="w-56 sm:w-72 aspect-[3/4] rounded-t-[140px] rounded-b-2xl border-4 border-brand-gold ring-4 ring-brand-saf ring-offset-4 bg-gradient-to-b from-[#FFF5EB] via-[#FFE4CC] to-[#FFD2A8] shadow-2xl flex flex-col items-center justify-end text-center overflow-hidden relative group">
                <Image
                  src="/branding/shivaji-maharaj.png"
                  alt="छत्रपती शिवाजी महाराज (Chhatrapati Shivaji Maharaj)"
                  fill
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 224px, 288px"
                />

                {/* Bottom gradient overlay with shloka & royal text */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 sm:p-5 pt-12 text-white z-10">
                  <h3 className="font-mr font-extrabold text-base sm:text-lg text-brand-yellow drop-shadow-md">
                    छत्रपती शिवाजी महाराज
                  </h3>
                  <p className="font-mr text-[11px] sm:text-xs text-amber-100 font-medium leading-tight mt-1">
                    ॥ निश्चयाचा महामेरू। बहुत जनांसी आधारू। श्रीमंत योगी ॥
                  </p>
                  <div className="mt-2.5 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-brand-saf text-white text-[10px] font-bold tracking-wider shadow">
                    <span>स्वराज प्रेरणा</span>
                  </div>
                </div>
              </div>

              {/* Animated Bhagwa Jari-Patka Flag SVG */}
              <div className="w-20 sm:w-28 shrink-0 origin-[15%_50%] animate-sway drop-shadow-md">
                <svg
                  viewBox="0 0 220 280"
                  aria-label="Bhagwa flag"
                  role="img"
                  className="w-full h-auto"
                >
                  {/* Flagpole */}
                  <rect x="14" y="8" width="8" height="268" rx="4" fill="#6b3a12" />
                  {/* Finial / Kalash */}
                  <circle cx="18" cy="8" r="8" fill="#C98A0B" stroke="#9A6B08" strokeWidth="1" />
                  {/* Saffron Double-Pennant Bhagwa Dhwaj */}
                  <path
                    d="M22 28 L212 88 L156 118 L212 148 L22 208 Z"
                    fill="#FF7A1A"
                    stroke="#D9480F"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  {/* Flag Inner Shadow/Accent */}
                  <path
                    d="M22 36 L180 88 L140 118 L180 148 L22 198 Z"
                    fill="#FF8F3D"
                    opacity="0.8"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fort Battlements Motif (किल्ले / तटबंदी) */}
      <div
        className="h-8 mt-10 bg-repeat-x w-full"
        style={{
          background:
            "linear-gradient(#D9480F, #D9480F) bottom / 100% 12px no-repeat, repeating-linear-gradient(90deg, #D9480F 0px, #D9480F 24px, transparent 24px, transparent 40px)",
        }}
        aria-hidden="true"
      />
    </section>
  );
};

