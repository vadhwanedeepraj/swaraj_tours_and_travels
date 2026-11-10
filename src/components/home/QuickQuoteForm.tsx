"use client";

import React, { useState } from "react";
import { Send, Calendar, Users, MapPin, Navigation, Car, Phone, User, CheckCircle2 } from "lucide-react";
import { formatWhatsAppUrl } from "@/lib/utils";
import { submitBookingEnquiry } from "@/actions/bookings";

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
    name: "",
    mobile: "",
    from: "Nanded",
    to: "",
    date: "",
    passengers: "1–4",
    service: "Outstation Trips",
    vehiclePref: "Sedan (Hyundai AURA)",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Automatically save enquiry to database
    try {
      await submitBookingEnquiry({
        fullName: formData.name.trim() || "वेबसाईट प्रवासी (Quick Lead)",
        mobile: formData.mobile.trim() || "9325232301",
        pickupLocation: formData.from,
        destination: formData.to,
        travelDate: formData.date || new Date().toISOString().slice(0, 10),
        passengers: formData.passengers,
        vehiclePreference: formData.vehiclePref,
        serviceType: formData.service,
        additionalRequirements: "Homepage Quick Quote Submission",
      });
    } catch (dbErr) {
      console.error("Quick quote DB save error:", dbErr);
    }

    // 2. Open WhatsApp directly addressed to Owner
    const message = `*🚩 Swaraj Tours & Travels - Booking Enquiry*
---------------------------------------
👤 *Name:* ${formData.name || "Customer"}
📱 *Mobile:* ${formData.mobile || "Direct WhatsApp"}
📍 *Pickup:* ${formData.from}
🏁 *Destination:* ${formData.to}
📅 *Date:* ${formData.date || "Immediate"}
👥 *Passengers:* ${formData.passengers}
🚗 *Service:* ${formData.service}
🚘 *Vehicle:* ${formData.vehiclePref}
---------------------------------------
_Please provide the best quotation and driver availability for this trip._`;

    const url = formatWhatsAppUrl("919325232301", message);
    window.open(url, "_blank", "noopener,noreferrer");

    setSuccessNotice("तुमची चौकशी नोंदवली गेली आहे व WhatsApp उघडले आहे!");
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessNotice(null);
    }, 5000);
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
            कॉल किंवा WhatsApp द्वारे झटपट कोटेशन उपलब्ध: <span className="font-bold text-white font-mono">+91 9325232301</span>
          </div>
        </div>

        <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
            {/* Customer Name */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-xs font-bold text-amber-100">
                <User className="w-3.5 h-3.5 text-brand-yellow" />
                <span>तुमचे नाव</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="उदा. राहुल पाटील"
                className="w-full h-11 px-3.5 rounded-lg text-gray-900 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow border-0 shadow-inner"
              />
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-xs font-bold text-amber-100">
                <Phone className="w-3.5 h-3.5 text-brand-yellow" />
                <span>मोबाईल नंबर *</span>
              </label>
              <input
                type="tel"
                name="mobile"
                required
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                placeholder="9325232301"
                className="w-full h-11 px-3.5 rounded-lg text-gray-900 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow border-0 shadow-inner font-mono"
              />
            </div>

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

            {/* Vehicle Preference */}
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
                <option value="Sedan (Hyundai AURA)">Sedan (Hyundai AURA) — 🟢 उपलब्ध</option>
                <option value="SUV (Maruti Ertiga)">SUV (Maruti Ertiga) — 🟢 उपलब्ध</option>
                <option value="Luxury (Innova Crysta)">Luxury (Innova Crysta) — 🟡 मागणीनुसार</option>
                <option value="Tempo Traveller (17 Seats)">Tempo Traveller (17 Seats)</option>
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1a0c05] hover:bg-black text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 border border-brand-yellow/30 shrink-0 disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 text-brand-yellow" />
                  <span>{dict.quote.btnSend}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {successNotice && (
          <div className="mt-4 p-3 bg-emerald-900/60 rounded-xl text-xs text-emerald-200 border border-emerald-400/40 text-center flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successNotice}</span>
          </div>
        )}
      </div>
    </div>
  );
};
