"use client";

import React, { useState } from "react";
import { Send, Calendar, Users, MapPin, Navigation, Car } from "lucide-react";
import { formatWhatsAppUrl } from "@/lib/utils";

interface QuickQuoteFormProps {
  dict: {
    quote: {
      title: string;
      subtitle: string;
      pickup: string;
      pickupPlaceholder: string;
      destination: string;
      destPlaceholder: string;
      date: string;
      passengers: string;
      service: string;
      vehicle: string;
      btnSend: string;
      btnSave: string;
      note: string;
    };
  };
}

export const QuickQuoteForm: React.FC<QuickQuoteFormProps> = ({ dict }) => {
  const [formData, setFormData] = useState({
    from: "Nanded",
    to: "",
    date: "",
    passengers: "1–4",
    service: "Outstation Trips",
    vehiclePref: "Sedan (Hyundai AURA)",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `*🚩 Swaraj Tours & Travels - Booking Enquiry*
---------------------------------------
📍 *Pickup:* ${formData.from}
🏁 *Destination:* ${formData.to}
📅 *Date:* ${formData.date || "Immediate"}
👥 *Passengers:* ${formData.passengers}
🚗 *Service:* ${formData.service}
🚘 *Vehicle:* ${formData.vehiclePref}
---------------------------------------
_Please provide the best quotation for this trip._`;

    const url = formatWhatsAppUrl("919325232301", message);
    window.open(url, "_blank", "noopener,noreferrer");

    setSuccessNotice(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessNotice(false);
    }, 4000);
  };

  return (
    <div id="book" className="bg-brand-saf py-8 px-4 sm:px-6 lg:px-8 text-white shadow-xl relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-white/20 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-mr text-white">
              {dict.quote.title}
            </h2>
            <p className="text-sm text-amber-100 font-medium">
              {dict.quote.subtitle}
            </p>
          </div>
          <div className="text-xs text-amber-200">
            कॉल किंवा WhatsApp द्वारे झटपट कोटेशन उपलब्ध: <span className="font-bold text-white">9325232301</span>
          </div>
        </div>

        <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Pickup Location */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-xs font-bold text-amber-100">
                <MapPin className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{dict.quote.pickup}</span>
              </label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
                placeholder={dict.quote.pickupPlaceholder}
                className="w-full h-11 px-3.5 rounded-lg text-gray-900 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow border-0 shadow-inner"
              />
            </div>

            {/* Destination */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-xs font-bold text-amber-100">
                <Navigation className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{dict.quote.destination}</span>
              </label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                required
                placeholder={dict.quote.destPlaceholder}
                className="w-full h-11 px-3.5 rounded-lg text-gray-900 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow border-0 shadow-inner"
              />
            </div>

            {/* Travel Date */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-xs font-bold text-amber-100">
                <Calendar className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{dict.quote.date}</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full h-11 px-3.5 rounded-lg text-gray-900 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow border-0 shadow-inner"
              />
            </div>

            {/* Passenger Count */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-xs font-bold text-amber-100">
                <Users className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{dict.quote.passengers}</span>
              </label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="w-full h-11 px-3 rounded-lg text-gray-900 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow border-0 shadow-inner"
              >
                <option value="1–4">१ ते ४ (Sedan)</option>
                <option value="5–7">५ ते ७ (SUV/MUV)</option>
                <option value="8–12">८ ते १२ (Tempo Traveller)</option>
                <option value="13+">१३ पेक्षा जास्त (Mini Bus)</option>
              </select>
            </div>

            {/* Vehicle / Service Type */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-xs font-bold text-amber-100">
                <Car className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{dict.quote.vehicle}</span>
              </label>
              <select
                name="vehiclePref"
                value={formData.vehiclePref}
                onChange={handleChange}
                className="w-full h-11 px-3 rounded-lg text-gray-900 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow border-0 shadow-inner"
              >
                <option value="Sedan (Hyundai AURA)">Sedan (Hyundai AURA) — 🟢 उपलब्ध (Available)</option>
                <option value="SUV (Ertiga / XL6)">SUV (Ertiga / XL6) — 🟡 मागणीनुसार (On Request)</option>
                <option value="Premium (Innova Crysta)">Premium (Innova Crysta) — 🟡 मागणीनुसार (On Request)</option>
                <option value="Tempo Traveller (13/17/26 Seats)">Tempo Traveller — 🟡 मागणीनुसार (On Request)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
            <p className="text-xs text-amber-100 max-w-2xl leading-normal">
              {dict.quote.note}
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1a0c05] hover:bg-black text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 border border-brand-yellow/30 shrink-0"
            >
              <Send className="w-4 h-4 text-brand-yellow" />
              <span>{dict.quote.btnSend}</span>
            </button>
          </div>
        </form>

        {successNotice && (
          <div className="mt-4 p-3 bg-white/10 rounded-lg text-xs text-amber-200 border border-white/20 text-center animate-in fade-in">
            WhatsApp चॅट उघडले आहे. कृपया प्रवासाची माहिती पाठवा, आमचे प्रतिनिधी तात्काळ संपर्क करतील.
          </div>
        )}
      </div>
    </div>
  );
};

