import React from "react";
import { MessageSquare, Car, FileText, CheckCircle2 } from "lucide-react";
import { Locale } from "@/types";

interface HowItWorksSectionProps {
  locale?: Locale;
  dict: {
    howItWorks: {
      title: string;
      subtitle: string;
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      step4Title: string;
      step4Desc: string;
    };
  };
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ locale = "mr", dict }) => {
  const isMr = locale === "mr";

  const steps = [
    {
      step: isMr ? "१" : "1",
      title: dict.howItWorks.step1Title,
      desc: dict.howItWorks.step1Desc,
      icon: MessageSquare,
    },
    {
      step: isMr ? "२" : "2",
      title: dict.howItWorks.step2Title,
      desc: dict.howItWorks.step2Desc,
      icon: Car,
    },
    {
      step: isMr ? "३" : "3",
      title: dict.howItWorks.step3Title,
      desc: dict.howItWorks.step3Desc,
      icon: FileText,
    },
    {
      step: isMr ? "४" : "4",
      title: dict.howItWorks.step4Title,
      desc: dict.howItWorks.step4Desc,
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="about" className="py-20 bg-brand-tint/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-3.5 py-1.5 rounded-full">
            {isMr ? "पारदर्शक बुकिंग प्रक्रिया" : "Transparent Booking Process"}
          </span>
          <h2 className="mt-3 font-mr font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            {dict.howItWorks.title}
          </h2>
          <div className="w-16 h-1 bg-brand-saf2 mx-auto my-3 rounded-full" />
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            {dict.howItWorks.subtitle}
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-brand-border/80 shadow-sm relative group hover:border-brand-saf transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-saf text-white font-black text-lg flex items-center justify-center shadow-md">
                      {item.step}
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-brand-tint flex items-center justify-center text-brand-saf">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-mr font-bold text-lg text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-100 text-[11px] font-semibold text-brand-muted">
                  {isMr ? `पायरी ${item.step} पूर्ण` : `Step ${item.step} Completed`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
