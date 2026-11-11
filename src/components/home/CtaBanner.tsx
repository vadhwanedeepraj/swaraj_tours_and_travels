import React from "react";
import Link from "next/link";
import { PhoneCall, MessageSquare } from "lucide-react";
import { Locale } from "@/types";

interface CtaBannerProps {
  locale?: Locale;
  dict: {
    cta: {
      title: string;
      subtitle: string;
      btn: string;
    };
  };
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ locale = "mr", dict }) => {
  const isMr = locale === "mr";

  return (
    <div className="bg-gradient-to-r from-brand-saf via-brand-saf2 to-brand-red text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        <h2 className="font-mr font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
          {dict.cta.title}
        </h2>
        <p className="text-base sm:text-lg text-amber-100 max-w-2xl mx-auto font-medium">
          {dict.cta.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-saf hover:bg-amber-50 text-base font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform active:scale-95"
          >
            <PhoneCall className="w-5 h-5 text-brand-saf" />
            <span>{dict.cta.btn}</span>
          </Link>

          <a
            href="https://wa.me/919325232301?text=Hello%20Swaraj%20Tours%20%26%20Travels%2C%20I%20am%20planning%20a%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1a0c05] hover:bg-black text-white text-base font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform active:scale-95 border border-white/20"
          >
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>WhatsApp: {isMr ? "९३२५२३२३०१" : "9325232301"}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
