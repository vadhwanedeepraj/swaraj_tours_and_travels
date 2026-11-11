import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageSquare, MapPin, ShieldCheck, Lock } from "lucide-react";
import { Locale } from "@/types";

interface FooterProps {
  locale?: Locale;
  dict: {
    brand: { name: string; tagline: string };
    footer: {
      aboutText: string;
      contactHeader: string;
      call: string;
      whatsapp: string;
      exploreHeader: string;
      rights: string;
    };
  };
}

export const Footer: React.FC<FooterProps> = ({ locale = "mr", dict }) => {
  const isMr = locale === "mr";

  return (
    <footer id="contact" className="bg-[#1a0c05] text-[#e8cdb6] pt-14 pb-24 md:pb-14 border-t-4 border-brand-saf">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info with Official Logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative h-14 w-24 sm:w-26 rounded-2xl overflow-hidden bg-white p-1.5 border-2 border-brand-saf shadow-xl ring-2 ring-brand-gold/30 shrink-0">
                <Image
                  src="/branding/logo.png"
                  alt="Swaraj Tours & Travels"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h3 className="font-mr font-extrabold text-2xl text-white tracking-wide">
                  {dict.brand.name}
                </h3>
                <span className="text-xs font-semibold text-brand-saf2 block">
                  A Swaraj Group Enterprise · Nanded
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              {dict.footer.aboutText}
            </p>
            <div className="pt-2">
              <span className="font-mr font-bold text-brand-saf2 text-base block">
                {dict.brand.tagline}
              </span>
              <div className="mt-3 inline-flex items-center gap-2 text-brand-yellow font-mr font-bold text-sm bg-brand-yellow/10 px-3 py-1.5 rounded-md border border-brand-yellow/20">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {isMr ? "॥ जय भवानी ॥ जय शिवाजी ॥" : "॥ Jai Bhavani ॥ Jai Shivaji ॥"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-base tracking-wider uppercase">
              {dict.footer.exploreHeader}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/fleet" className="hover:text-brand-saf2 transition-colors">
                  {isMr ? "आमच्या गाड्या" : "Our Fleet"}
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-brand-saf2 transition-colors">
                  {isMr ? "टूर पॅकेजेस" : "Tour Packages"}
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-brand-saf2 transition-colors">
                  {isMr ? "ऑनलाईन बुकिंग" : "Book Online"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-saf2 transition-colors">
                  {isMr ? "आमच्याबद्दल" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-saf2 transition-colors">
                  {isMr ? "प्रवास गॅलरी" : "Travel Gallery"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-saf2 transition-colors">
                  {isMr ? "संपर्क व पत्ता" : "Contact Us"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-base tracking-wider uppercase">
              {dict.footer.contactHeader}
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-saf2 shrink-0 mt-0.5" />
                <span>
                  {isMr
                    ? "नांदेड रेल्वे स्टेशन जवळ, वर्कशॉप कॉर्नर, नांदेड, महाराष्ट्र ४३१६०५"
                    : "Near Nanded Railway Station, Workshop Corner, Nanded, Maharashtra 431605"}
                </span>
              </div>
              <a
                href="tel:+919325232301"
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-brand-saf/30 flex items-center justify-center group-hover:bg-brand-saf transition-colors">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">
                    {isMr ? "थेट बुकिंग कॉल" : "Direct Booking Call"}
                  </div>
                  <div className="text-white font-bold text-base">+91 9325232301</div>
                </div>
              </a>
              <a
                href="https://wa.me/919325232301?text=Hello%20Swaraj%20Tours%20%26%20Travels"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-green-600/30 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <MessageSquare className="w-4 h-4 text-green-400 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">
                    {isMr ? "WhatsApp त्वरित चॅट" : "WhatsApp Instant Chat"}
                  </div>
                  <div className="text-green-400 font-bold text-base">9325232301</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <div>
            © {new Date().getFullYear()} {isMr ? "स्वराज टुर्स अँड ट्रॅव्हल्स" : "Swaraj Tours & Travels"}. {dict.footer.rights}
          </div>
          <div className="flex items-center gap-3 text-brand-saf2/90 font-medium">
            <span>
              {isMr
                ? "नांदेड, मराठवाडा आणि महाराष्ट्र पर्यटन सेवा"
                : "Nanded, Marathwada & Maharashtra Tourism Services"}
            </span>
            <span className="text-gray-600">|</span>
            <Link
              href="/admin"
              className="text-gray-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1 text-[11px]"
              title={isMr ? "मालक व व्यवस्थापक प्रवेश" : "Owner & Admin Portal"}
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>{isMr ? "ॲडमिन लॉगिन" : "Admin Portal"}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
