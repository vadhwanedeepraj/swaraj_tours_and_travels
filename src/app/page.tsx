"use client";

import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickQuoteForm } from "@/components/home/QuickQuoteForm";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FleetSection } from "@/components/home/FleetSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <PageShell>
      {({ locale, dict }) => (
        <div id="top">
          {/* 1. Hero Section with Shivaji Maharaj Frame & Bhagwa Flag */}
          <HeroSection locale={locale} dict={dict} />

          {/* 2. Quick Quotation Calculator Form */}
          <QuickQuoteForm locale={locale} dict={dict} />

          {/* 3. 10 Core Services Grid */}
          <ServicesSection locale={locale} dict={dict} />

          {/* 4. Vehicle Fleet Showcase with Real Photos */}
          <FleetSection locale={locale} dict={dict} />

          {/* 5. Popular Journeys from Nanded */}
          <DestinationsSection locale={locale} dict={dict} />

          {/* 6. 4-Step Transparent Booking Workflow */}
          <HowItWorksSection locale={locale} dict={dict} />

          {/* 7. Final Call to Action */}
          <CtaBanner locale={locale} dict={dict} />
        </div>
      )}
    </PageShell>
  );
}
