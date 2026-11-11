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
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedLocale = localStorage.getItem("swaraj_locale") as Locale;
        if (savedLocale === "mr" || savedLocale === "en") {
          return savedLocale;
        }
      } catch {
        // Ignore
      }
    }
    return "mr";
  });

  useEffect(() => {
    const handleLocaleChange = () => {
      try {
        const savedLocale = localStorage.getItem("swaraj_locale") as Locale;
        if (savedLocale === "mr" || savedLocale === "en") {
          setLocale(savedLocale);
        }
      } catch {
        // Ignore
      }
    };

    window.addEventListener("swaraj_locale_change", handleLocaleChange);
    window.addEventListener("storage", handleLocaleChange);
    return () => {
      window.removeEventListener("swaraj_locale_change", handleLocaleChange);
      window.removeEventListener("storage", handleLocaleChange);
    };
  }, []);

  const toggleLocale = () => {
    setLocale((prev) => {
      const next: Locale = prev === "mr" ? "en" : "mr";
      try {
        localStorage.setItem("swaraj_locale", next);
        window.dispatchEvent(new CustomEvent("swaraj_locale_change", { detail: next }));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const dict = locale === "mr" ? mrDict : enDict;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopAnnounceBar bannerText={dict.topBanner} locale={locale} />
      <Header
        currentLocale={locale}
        onToggleLocale={toggleLocale}
        dict={dict}
      />
      <main className="flex-grow">{children({ locale, dict, toggleLocale })}</main>
      <Footer dict={dict} locale={locale} />
      <MobileStickyBar dict={dict} />
    </div>
  );
};
