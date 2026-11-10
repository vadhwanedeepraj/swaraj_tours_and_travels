"use client";

import React, { useState } from "react";
import { Locale } from "@/types";
import enDict from "@/locales/en.json";
import mrDict from "@/locales/mr.json";

import { TopAnnounceBar } from "@/components/layout/TopAnnounceBar";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickQuoteForm } from "@/components/home/QuickQuoteForm";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FleetSection } from "@/components/home/FleetSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("mr");

  const dict = locale === "mr" ? mrDict : enDict;

  const toggleLocale = () => {
    setLocale((prev) => (prev === "mr" ? "en" : "mr"));
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white">
      {/* 1. Top Bar */}
      <TopAnnounceBar bannerText={dict.topBanner} />

      {/* 2. Navigation Header */}
      <Header
        currentLocale={locale}
        onToggleLocale={toggleLocale}
        dict={dict}
      />

      <main className="flex-grow">
        {/* 3. Hero Section with Shivaji Maharaj Frame & Bhagwa Flag */}
        <HeroSection dict={dict} />

        {/* 4. Quick Quotation Calculator Form */}
        <QuickQuoteForm dict={dict} />

        {/* 5. 10 Core Services Grid */}
        <ServicesSection dict={dict} />

        {/* 6. Vehicle Fleet Showcase with Real Photos */}
        <FleetSection dict={dict} />

        {/* 7. Popular Journeys from Nanded */}
        <DestinationsSection dict={dict} />

        {/* 8. 4-Step Transparent Booking Workflow */}
        <HowItWorksSection dict={dict} />

        {/* 9. Final Call to Action */}
        <CtaBanner dict={dict} />
      </main>

      {/* 10. Footer */}
      <Footer dict={dict} />

      {/* 11. Mobile Sticky Bottom Action Bar */}
      <MobileStickyBar dict={dict} />
    </div>
  );
}

