"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, Globe } from "lucide-react";
import { Locale } from "@/types";

interface HeaderProps {
  currentLocale: Locale;
  onToggleLocale: () => void;
  dict: {
    brand: { name: string; sub: string };
    nav: {
      home: string;
      about: string;
      fleet: string;
      services: string;
      packages: string;
      gallery: string;
      contact: string;
      bookRide: string;
    };
  };
}

export const Header: React.FC<HeaderProps> = ({
  currentLocale,
  onToggleLocale,
  dict,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: dict.nav.home },
    { href: "/fleet", label: dict.nav.fleet },
    { href: "/packages", label: dict.nav.packages },
    { href: "/about", label: dict.nav.about },
    { href: "/gallery", label: dict.nav.gallery },
    { href: "/contact", label: dict.nav.contact },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-brand-saf2 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with Chhatrapati Shivaji Maharaj Emblem */}
          <Link href="/" className="flex items-center gap-2.5 group py-1">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-brand-gold shadow-md shrink-0 ring-2 ring-brand-saf/30">
              <Image
                src="/branding/shivaji-maharaj.png"
                alt="Chhatrapati Shivaji Maharaj"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mr font-extrabold text-xl sm:text-2xl text-brand-saf tracking-tight group-hover:text-brand-red transition-colors leading-tight">
                {dict.brand.name}
              </span>
              <span className="text-[11px] font-semibold text-brand-muted tracking-wider uppercase">
                {dict.brand.sub}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-gray-700">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors relative py-1 ${
                    isActive
                      ? "text-brand-saf font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-saf"
                      : "hover:text-brand-saf after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-saf hover:after:w-full after:transition-all"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Language Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onToggleLocale}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border hover:border-brand-saf text-xs font-semibold text-gray-800 bg-brand-tint/60 hover:bg-brand-tint transition-all"
              title="Toggle English / मराठी"
            >
              <Globe className="w-3.5 h-3.5 text-brand-saf" />
              <span>{currentLocale === "mr" ? "English" : "मराठी"}</span>
            </button>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-brand-saf hover:bg-brand-red text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{dict.nav.bookRide}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onToggleLocale}
              className="px-2.5 py-1 rounded-md border border-brand-border text-xs font-bold text-gray-800 bg-brand-tint"
            >
              {currentLocale === "mr" ? "EN" : "मराठी"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-800 hover:text-brand-saf hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-brand-border px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-2.5 rounded-lg text-base font-semibold text-gray-800 hover:bg-brand-tint hover:text-brand-saf transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Link
              href="/book"
              onClick={handleNavClick}
              className="w-full flex items-center justify-center gap-2 bg-brand-saf text-white text-base font-bold py-3 rounded-xl shadow"
            >
              <PhoneCall className="w-5 h-5" />
              <span>{dict.nav.bookRide}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
