"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Mail,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { CONTACT_FAQS } from "@/lib/data/gallery";

// Dynamically import Leaflet Map to avoid SSR issues
const DynamicNandedMap = dynamic(
  () =>
    import("@/components/contact/NandedMap").then((mod) => mod.NandedMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] sm:h-[460px] bg-gray-100 rounded-3xl flex items-center justify-center border border-brand-border">
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <div className="w-8 h-8 border-4 border-brand-saf border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-medium">Loading Nanded Map...</span>
        </div>
      </div>
    ),
  }
);

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formSent, setFormSent] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;

    // Open WhatsApp with inquiry
    const text = `*New Contact Enquiry - Swaraj Travels Web*
👤 *Name:* ${contactName}
📱 *Phone:* ${contactPhone}
🏷️ *Topic:* ${contactSubject || "General Travel Inquiry"}
💬 *Message:* ${contactMessage || "I want to know more about cab bookings."}`;

    window.open(
      `https://wa.me/919325232301?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setFormSent(true);
  };

  return (
    <PageShell>
      {({ locale }) => (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-4 py-1.5 rounded-full inline-block">
              {locale === "mr" ? "आमच्याशी संपर्क साधा" : "Connect With Us"}
            </span>
            <h1 className="mt-3 font-mr font-extrabold text-3xl sm:text-5xl text-gray-900 tracking-tight">
              {locale === "mr"
                ? "नांदेड कार्यालय व २४/७ ग्राहक मदत केंद्र"
                : "Nanded Office & 24/7 Helpline"}
            </h1>
            <div className="w-20 h-1.5 bg-brand-saf2 mx-auto my-4 rounded-full" />
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              {locale === "mr"
                ? "स्थानिक कार भाडे, विमानतळ पिकअप, आउटस्टेशन किंवा टूर पॅकेजच्या चौकशीसाठी आम्ही सदैव आपल्या सेवेत सज्ज आहोत."
                : "Call, WhatsApp, or visit our office near Nanded Railway Station. Instant quote response within 10 minutes."}
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border shadow-md hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-brand-saf/10 text-brand-saf flex items-center justify-center mb-4 group-hover:bg-brand-saf group-hover:text-white transition-colors">
                <PhoneCall className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Direct Booking Call
              </span>
              <h3 className="font-mr font-bold text-xl text-gray-900 mt-1">
                +91 9325232301
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {locale === "mr"
                  ? "२४ तास उपलब्ध. तात्काळ गाडीसाठी कधीही कॉल करा."
                  : "Available 24/7 for urgent cab booking & inquiries."}
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <a
                  href="tel:+919325232301"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-saf hover:text-brand-red"
                >
                  <span>{locale === "mr" ? "आत्ताच कॉल करा" : "Call Now"}</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border shadow-md hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                WhatsApp Chat & Quotations
              </span>
              <h3 className="font-mr font-bold text-xl text-gray-900 mt-1">
                9325232301
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {locale === "mr"
                  ? "फोटो, ड्रायव्हर डिटेल्स आणि कोटेशन WhatsApp वर मिळवा."
                  : "Get quick fare quotes, car photos, and driver details."}
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <a
                  href="https://wa.me/919325232301?text=Hello%20Swaraj%20Tours%20%26%20Travels"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  <span>{locale === "mr" ? "WhatsApp वर चॅट करा" : "Chat on WhatsApp"}</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Office Timings Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border shadow-md hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mb-4 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Operating Schedule
              </span>
              <h3 className="font-mr font-bold text-xl text-gray-900 mt-1">
                {locale === "mr" ? "२४/७ अखंड सेवा" : "24 Hours Service"}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {locale === "mr"
                  ? "कार्यालय: सकाळी ०८:०० ते रात्री १०:०० (सर्व दिवस)"
                  : "Office: 08:00 AM – 10:00 PM | Helpline: 24/7 Round the Clock"}
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-semibold text-brand-saf">
                <span>{locale === "mr" ? "सर्व दिवस खुली" : "Open 365 Days a Year"}</span>
              </div>
            </div>
          </div>

          {/* Interactive OpenStreetMap Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-3 py-1 rounded-full">
                  Nanded City Location
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-mr text-gray-900 mt-2">
                  {locale === "mr"
                    ? "आमचे कार्यालय नकाशावर शोधा"
                    : "Find Our Office on Map"}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 max-w-md">
                {locale === "mr"
                  ? "नांदेड रेल्वे स्टेशन आणि मुख्य बसस्थानकापासून अवघ्या ५ मिनिटांच्या अंतरावर आमचे कार्यालय स्थित आहे."
                  : "Conveniently located in Nanded close to the Railway Station and Central Bus Stand."}
              </p>
            </div>

            <DynamicNandedMap locale={locale} />
          </div>

          {/* Quick Contact Form & Address Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-lg">
              <h3 className="text-xl font-bold font-mr text-gray-900 mb-2">
                {locale === "mr"
                  ? "आम्हाला थेट संदेश पाठवा"
                  : "Send Us a Direct Message"}
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                {locale === "mr"
                  ? "खालील माहिती भरा, आम्ही तुमच्या WhatsApp वर त्वरित उत्तर पाठवू."
                  : "Fill in your inquiry details and our team will reply immediately."}
              </p>

              {formSent ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900">
                    {locale === "mr" ? "संदेश पाठवला गेला आहे!" : "Message Delivered!"}
                  </h4>
                  <p className="text-xs text-emerald-700">
                    {locale === "mr"
                      ? "आमची टीम तुमच्याशी लवकरच संपर्क करेल. धन्यवाद!"
                      : "Our team will reach out to you shortly. Thank you!"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleMessageSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        {locale === "mr" ? "तुमचे नाव *" : "Your Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder={locale === "mr" ? "उदा. सचिन पवार" : "e.g. Sachin Pawar"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        {locale === "mr" ? "मोबाईल नंबर *" : "Mobile Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="9325232301"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {locale === "mr" ? "विषय / सेवेचा प्रकार" : "Subject / Service"}
                    </label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder={
                        locale === "mr"
                          ? "उदा. शिर्डी २ दिवस कोटेशन / लग्नकार्यासाठी ३ गाड्या"
                          : "e.g. Shirdi Darshan Enquiry / Wedding 3 Cars"
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {locale === "mr" ? "तुमचा संदेश / प्रवासाचा तपशील" : "Your Message"}
                    </label>
                    <textarea
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={
                        locale === "mr"
                          ? "प्रवासाची तारीख, प्रवासी संख्या आणि इतर आवश्यकता येथे लिहा..."
                          : "Mention travel dates, passenger count, or special halts..."
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-sm font-medium resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-brand-saf hover:bg-brand-red text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 text-sm"
                  >
                    <Send className="w-4 h-4 text-brand-yellow" />
                    <span>
                      {locale === "mr"
                        ? "संदेश पाठवा (WhatsApp द्वारे)"
                        : "Send Message via WhatsApp"}
                    </span>
                  </button>
                </form>
              )}
            </div>

            {/* Address & Business Info */}
            <div className="lg:col-span-5 bg-brand-tint/40 rounded-3xl p-6 sm:p-8 border border-brand-border space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-saf uppercase tracking-wider">
                  Head Office
                </span>
                <h3 className="font-mr font-extrabold text-2xl text-gray-900 mt-1">
                  स्वराज टुर्स अँड ट्रॅव्हल्स
                </h3>
                <p className="text-xs text-brand-muted font-bold tracking-wider">
                  SWARAJ TOURS & TRAVELS · NANDED
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-saf shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900">
                      {locale === "mr" ? "पत्ता (Address):" : "Office Address:"}
                    </strong>
                    <span>
                      नांदेड रेल्वे स्थानक परिसर, वर्कशॉप कॉर्नर, नांदेड, महाराष्ट्र ४३१६०५ (भारत).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-saf shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900">
                      {locale === "mr" ? "फोन व बुकिंग नंबर:" : "Phone & WhatsApp:"}
                    </strong>
                    <a
                      href="tel:+919325232301"
                      className="text-brand-saf font-bold hover:underline"
                    >
                      +91 9325232301
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-saf shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900">
                      {locale === "mr" ? "वेळापत्रक (Working Hours):" : "Working Hours:"}
                    </strong>
                    <span>२४ तास टॅक्सी सेवा / ऑफिस सकाळी ८ ते रात्री १०</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border/60">
                <span className="text-xs font-bold text-gray-800 block mb-2">
                  {locale === "mr" ? "प्रमुख पिकअप पॉईंट्स:" : "Key Pickup Points in Nanded:"}
                </span>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-brand-navy">
                  <span className="bg-white px-2.5 py-1 rounded-md border border-brand-border">
                    Railway Station
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-brand-border">
                    Taroda Naka
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-brand-border">
                    Anand Nagar
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-brand-border">
                    Airport (NDC)
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-brand-border">
                    Gurudwara Gate
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-lg">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-3.5 py-1.5 rounded-full inline-block">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-mr text-gray-900 mt-2">
                {locale === "mr"
                  ? "नेहमी विचारले जाणारे प्रश्न (FAQ)"
                  : "Common Travel & Booking Queries"}
              </h2>
              <div className="w-16 h-1 bg-brand-saf2 mx-auto my-3 rounded-full" />
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {CONTACT_FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-brand-border rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-white hover:bg-brand-tint/30 transition-colors"
                    >
                      <span className="font-mr font-bold text-sm sm:text-base text-gray-900">
                        {locale === "mr" ? faq.questionMr : faq.questionEn}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-brand-saf shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed bg-brand-tint/20 border-t border-brand-border/40">
                        {locale === "mr" ? faq.answerMr : faq.answerEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

