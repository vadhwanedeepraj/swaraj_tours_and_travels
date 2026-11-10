import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, MapPin, ShieldCheck } from "lucide-react";

interface FooterProps {
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

export const Footer: React.FC<FooterProps> = ({ dict }) => {
  return (
    <footer id="contact" className="bg-[#1a0c05] text-[#e8cdb6] pt-14 pb-24 md:pb-14 border-t-4 border-brand-saf">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-mr font-extrabold text-2xl text-white tracking-wide">
              {dict.brand.name}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              {dict.footer.aboutText}
            </p>
            <div className="pt-2">
              <span className="font-mr font-bold text-brand-saf2 text-base block">
                {dict.brand.tagline}
              </span>
              <div className="mt-3 inline-flex items-center gap-2 text-brand-yellow font-mr font-bold text-sm bg-brand-yellow/10 px-3 py-1.5 rounded-md border border-brand-yellow/20">
                <ShieldCheck className="w-4 h-4" />
                <span>॥ जय भवानी ॥ जय शिवाजी ॥</span>
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
                  आमच्या गाड्या (Our Fleet)
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-brand-saf2 transition-colors">
                  टूर पॅकेजेस (Tour Packages)
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-brand-saf2 transition-colors">
                  ऑनलाईन बुकिंग (Book Online)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-saf2 transition-colors">
                  आमच्याबद्दल (About Us)
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-saf2 transition-colors">
                  प्रवास गॅलरी (Travel Gallery)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-saf2 transition-colors">
                  संपर्क व पत्ता (Contact Us)
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
                <span>नांदेड रेल्वे स्टेशन जवळ, वर्कशॉप कॉर्नर, नांदेड, महाराष्ट्र ४३१६०५</span>
              </div>
              <a
                href="tel:+919325232301"
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-brand-saf/30 flex items-center justify-center group-hover:bg-brand-saf transition-colors">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Direct Booking Call</div>
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
                  <div className="text-xs text-gray-400">WhatsApp Instant Chat</div>
                  <div className="text-green-400 font-bold text-base">9325232301</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <div>
            © {new Date().getFullYear()} Swaraj Tours & Travels. {dict.footer.rights}
          </div>
          <div className="flex items-center gap-3 text-brand-saf2/90 font-medium">
            <span>नांदेड, मराठवाडा आणि महाराष्ट्र पर्यटन सेवा</span>
            <span className="text-gray-600">|</span>
            <Link
              href="/admin"
              className="text-gray-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1 text-[11px]"
              title="मालक व व्यवस्थापक प्रवेश (Owner Admin Gate)"
            >
              <span>🔒</span>
              <span>ॲडमिन (Admin)</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
