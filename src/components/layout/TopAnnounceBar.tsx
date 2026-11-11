import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { Locale } from "@/types";

interface TopAnnounceBarProps {
  bannerText: string;
  locale?: Locale;
}

export const TopAnnounceBar: React.FC<TopAnnounceBarProps> = ({
  bannerText,
  locale = "mr",
}) => {
  return (
    <div className="bg-brand-red text-white py-1.5 px-4 text-xs sm:text-sm font-semibold tracking-wide border-b border-red-700/40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <div className="relative w-5 h-5 rounded-full overflow-hidden border border-brand-yellow/80 shadow-sm shrink-0">
            <Image
              src="/branding/shivaji-maharaj.png"
              alt="Shivaji Maharaj"
              fill
              className="object-cover object-top"
            />
          </div>
          <span className="font-mr">{bannerText}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
          <span>
            {locale === "mr"
              ? "नांदेड शहर व जिल्हा विशेष सेवा"
              : "Special Cab Service for Nanded & Maharashtra"}
          </span>
          <a
            href="tel:+919325232301"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-full transition-colors text-white"
          >
            <Phone className="w-3.5 h-3.5 text-brand-yellow" />
            <span>
              {locale === "mr"
                ? "२४/७ हेल्पलाईन: ९३२५२३२३०१"
                : "24/7 Helpline: 9325232301"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
