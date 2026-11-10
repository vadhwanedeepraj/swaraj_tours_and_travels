"use client";

import React, { useState, useEffect } from "react";
import { Locale } from "@/types";
import enDict from "@/locales/en.json";
import mrDict from "@/locales/mr.json";
import { TopAnnounceBar } from "./TopAnnounceBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileStickyBar } from "./MobileStickyBar";

interface PageShellProps {
  children: (props: {
    locale: Locale;
    dict: typeof mrDict;
    toggleLocale: () => void;
  }) => React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>("mr");

  useEffect(() => {
    // Check if user previously selected language in localStorage
    try {
      const savedLocale = localStorage.getItem("swaraj_locale") as Locale;
      if (savedLocale === "mr" || savedLocale === "en") {
        setLocale(savedLocale);
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const toggleLocale = () => {
    setLocale((prev) => {
      const next = prev === "mr" ? "en" : "mr";
      try {
        localStorage.setItem("swaraj_locale", next);
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const dict = locale === "mr" ? mrDict : enDict;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopAnnounceBar bannerText={dict.topBanner} />
      <Header
        currentLocale={locale}
        onToggleLocale={toggleLocale}
        dict={dict}
      />
      <main className="flex-grow">{children({ locale, dict, toggleLocale })}</main>
      <Footer dict={dict} />
      <MobileStickyBar dict={dict} />
    </div>
  );
};

