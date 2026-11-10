import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, Car } from "lucide-react";

interface MobileStickyBarProps {
  dict: {
    mobileBar: {
      call: string;
      whatsapp: string;
      book: string;
    };
  };
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ dict }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t-2 border-brand-saf2 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-3 gap-2">
        <a
          href="tel:+919325232301"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold border border-gray-300 transition-all active:scale-95 text-center"
        >
          <Phone className="w-4 h-4 text-brand-saf" />
          <span>{dict.mobileBar.call}</span>
        </a>

        <a
          href="https://wa.me/919325232301?text=Hello%20Swaraj%20Tours%20%26%20Travels%2C%20I%20need%20a%20cab%20from%20Nanded."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 transition-all active:scale-95 text-center"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>{dict.mobileBar.whatsapp}</span>
        </a>

        <Link
          href="/book"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-brand-saf hover:bg-brand-red text-white text-xs font-bold shadow-sm transition-all active:scale-95 text-center"
        >
          <Car className="w-4 h-4 text-brand-yellow" />
          <span>{dict.mobileBar.book}</span>
        </Link>
      </div>
    </div>
  );
};
