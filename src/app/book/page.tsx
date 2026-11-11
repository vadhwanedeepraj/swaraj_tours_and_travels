"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  Users,
  Phone,
  User,
  FileText,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  X,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { submitBookingEnquiry } from "@/actions/bookings";
import { VEHICLES } from "@/lib/data/vehicles";
import { TOUR_PACKAGES } from "@/lib/data/packages";
import { formatVehicleName, formatVehicleSeats } from "@/lib/i18nHelpers";

function BookingFormContent({ locale }: { locale: "mr" | "en" }) {
  const isMr = locale === "mr";
  const searchParams = useSearchParams();

  // Form states
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [pickupTime, setPickupTime] = useState("06:00 AM");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1–4");
  const [vehiclePreference, setVehiclePreference] = useState("Hyundai AURA");
  const [serviceType, setServiceType] = useState("Outstation Trips");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [availableCars, setAvailableCars] = useState<typeof VEHICLES>(VEHICLES);

  useEffect(() => {
    fetch("/api/admin/vehicles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.vehicles) && data.vehicles.length > 0) {
          setAvailableCars(data.vehicles);
        }
      })
      .catch(() => {});
  }, []);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<{
    success: boolean;
    bookingNumber: string;
    message?: string;
  } | null>(null);

  // Quick chips for Pickup and Destination in Nanded
  const popularPickups = [
    { en: "Nanded Railway Station", mr: "नांदेड रेल्वे स्थानक" },
    { en: "Taroda Naka, Nanded", mr: "तरोडा नाका" },
    { en: "Anand Nagar, Nanded", mr: "आनंदनगर" },
    { en: "Shivaji Nagar, Nanded", mr: "शिवाजीनगर" },
    { en: "Workshop Corner, Nanded", mr: "वर्कशॉप कॉर्नर" },
    { en: "Nanded Airport (NDC)", mr: "नांदेड विमानतळ" },
  ];

  const popularDestinations = [
    { en: "Shirdi Sai Temple", mr: "शिर्डी साईबाबा" },
    { en: "Tuljapur Bhavani", mr: "तुळजापूर भवानी माता" },
    { en: "Chhatrapati Sambhajinagar", mr: "छत्रपती संभाजीनगर" },
    { en: "Hyderabad Airport / City", mr: "हैदराबाद शहर/विमानतळ" },
    { en: "Mahurgad Shaktipeeth", mr: "माहूर रेणुका देवी" },
    { en: "Parli Vaijnath / Aundha", mr: "परळी व औंढा ज्योतिर्लिंग" },
    { en: "Pune / Mumbai", mr: "पुणे / मुंबई" },
  ];

  // Pre-fill parameters if arriving from Fleet or Packages page
  useEffect(() => {
    const vehicleParam = searchParams?.get("vehicle");
    if (vehicleParam) {
      const found = VEHICLES.find(
        (v) => v.slug === vehicleParam || v.id === vehicleParam
      );
      if (found) {
        setVehiclePreference(found.name);
      }
    }

    const packageParam = searchParams?.get("package");
    if (packageParam) {
      const foundPkg = TOUR_PACKAGES.find((p) => p.slug === packageParam);
      if (foundPkg) {
        setDestination(foundPkg.titleEn.split("(")[0].trim());
        setServiceType("Customized Tour Package");
      }
    }

    const destParam = searchParams?.get("destination");
    if (destParam) {
      setDestination(destParam);
    }
  }, [searchParams]);

  // Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName =
        isMr
          ? "कृपया पूर्ण नाव प्रविष्ट करा (किमान २ अक्षरे)."
          : "Please enter your full name (minimum 2 letters).";
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile.trim())) {
      errors.mobile =
        isMr
          ? "कृपया वैध १०-अंकी भारतीय मोबाईल नंबर प्रविष्ट करा."
          : "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!pickupLocation.trim()) {
      errors.pickupLocation =
        isMr
          ? "पिकअप ठिकाण आवश्यक आहे."
          : "Pickup location is required.";
    }

    if (!destination.trim()) {
      errors.destination =
        isMr
          ? "जाण्याचे ठिकाण आवश्यक आहे."
          : "Destination is required.";
    }

    if (!travelDate.trim()) {
      errors.travelDate =
        isMr
          ? "प्रवासाची तारीख आवश्यक आहे."
          : "Travel date is required.";
    }

    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // WhatsApp Message Generator
  const generateWhatsAppUrl = (refNumber?: string) => {
    const text = `*🚩 New Booking Request - Swaraj Tours & Travels*
---------------------------------------
🔖 *Booking Ref:* ${refNumber || "Pending Confirmation"}
👤 *Name:* ${fullName || "Customer"}
📱 *Mobile:* ${mobile || "Not specified"}
📍 *Pickup:* ${pickupLocation || "Nanded"}
🏁 *Destination:* ${destination || "Not specified"}
📅 *Travel Date:* ${travelDate || "To be decided"}
⏰ *Pickup Time:* ${pickupTime}
🔄 *Return Date:* ${returnDate || "One-way only"}
👥 *Passengers:* ${passengers}
🚗 *Vehicle:* ${vehiclePreference}
🏷️ *Service:* ${serviceType}
📝 *Notes:* ${additionalRequirements || "None"}
---------------------------------------
Please provide quotation and driver confirmation.`;

    return `https://wa.me/919325232301?text=${encodeURIComponent(text)}`;
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitBookingEnquiry({
        fullName: fullName.trim(),
        mobile: mobile.trim(),
        pickupLocation: pickupLocation.trim(),
        destination: destination.trim(),
        travelDate,
        pickupTime: pickupTime || undefined,
        returnDate: returnDate || undefined,
        passengers,
        vehiclePreference,
        serviceType,
        additionalRequirements: additionalRequirements || undefined,
      });

      if (result.success && result.bookingNumber) {
        setBookingResult({
          success: true,
          bookingNumber: result.bookingNumber,
          message: result.message,
        });

        // Automatically launch WhatsApp addressed to Swaraj Owner
        const waUrl = generateWhatsAppUrl(result.bookingNumber);
        try {
          window.open(waUrl, "_blank", "noopener,noreferrer");
        } catch {
          // If pop-up is prevented, the user can still click the WhatsApp button in the confirmation modal
        }
      } else {
        setServerError(
          result.error ||
            (isMr
              ? "नोंदणी करताना त्रुटी आली. कृपया WhatsApp किंवा फोनद्वारे संपर्क साधा."
              : "Submission failed. Please connect via WhatsApp or Phone call.")
        );
      }
    } catch (err: any) {
      setServerError(
        err?.message ||
          (isMr
            ? "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा."
            : "An unexpected error occurred. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-4 py-1.5 rounded-full inline-block">
          {isMr ? "सुविधाजनक ऑनलाइन बुकिंग" : "Effortless Online Booking"}
        </span>
        <h1 className="mt-3 font-mr font-extrabold text-3xl sm:text-5xl text-gray-900 tracking-tight">
          {isMr
            ? "तुमचा प्रवास आत्ताच आरक्षित करा"
            : "Book Your Journey Today"}
        </h1>
        <div className="w-20 h-1.5 bg-brand-saf2 mx-auto my-4 rounded-full" />
        <p className="text-base sm:text-lg text-gray-600 font-medium">
          {isMr
            ? "नांदेडहून स्थानिक, आउटस्टेशन, किंवा टूर पॅकेजेससाठी अचूक कोटेशन मिळवा. कोणत्याही छुप्या शुल्काशिवाय प्रामाणिक सेवा."
            : "Instant transparent quotation for local transfers, outstation cab booking, and tour packages from Nanded with verified chauffeurs."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Booking Form */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-brand-border/80 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-saf via-brand-yellow to-brand-saf2" />

          {serverError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
              <div>
                <p className="font-bold">{isMr ? "त्रुटी आली" : "Submission Error"}</p>
                <p>{serverError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Contact Details */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 font-mr pb-2 border-b border-gray-100">
                <User className="w-5 h-5 text-brand-saf" />
                <span>
                  {isMr
                    ? "१. संपर्क व प्रवाशांची माहिती"
                    : "1. Passenger & Contact Details"}
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isMr ? "तुमचे पूर्ण नाव *" : "Full Name *"}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={
                        isMr ? "उदा. राहुल देशमुख" : "e.g. Rahul Deshmukh"
                      }
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl border ${
                        clientErrors.fullName
                          ? "border-red-500 bg-red-50/50"
                          : "border-gray-300 focus:border-brand-saf"
                      } outline-none text-sm font-medium transition-all`}
                    />
                  </div>
                  {clientErrors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{clientErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isMr ? "मोबाईल नंबर (WhatsApp) *" : "Mobile Number (WhatsApp) *"}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      placeholder={
                        isMr ? "उदा. 9325232301" : "e.g. 9325232301"
                      }
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl border ${
                        clientErrors.mobile
                          ? "border-red-500 bg-red-50/50"
                          : "border-gray-300 focus:border-brand-saf"
                      } outline-none text-sm font-medium transition-all`}
                    />
                  </div>
                  {clientErrors.mobile && (
                    <p className="text-xs text-red-600 mt-1">{clientErrors.mobile}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Journey Locations */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 font-mr pb-2 border-b border-gray-100">
                <MapPin className="w-5 h-5 text-brand-saf" />
                <span>
                  {isMr
                    ? "२. प्रवासाचे ठिकाण"
                    : "2. Travel Route & Locations"}
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pickup Location */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isMr ? "पिकअप ठिकाण *" : "Pickup Location *"}
                  </label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder={
                      isMr
                        ? "उदा. नांदेड रेल्वे स्टेशन, तरोडा नाका"
                        : "e.g. Nanded Railway Station"
                    }
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      clientErrors.pickupLocation
                        ? "border-red-500 bg-red-50/50"
                        : "border-gray-300 focus:border-brand-saf"
                    } outline-none text-sm font-medium transition-all`}
                  />
                  {clientErrors.pickupLocation && (
                    <p className="text-xs text-red-600 mt-1">
                      {clientErrors.pickupLocation}
                    </p>
                  )}
                  {/* Quick Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {popularPickups.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setPickupLocation(isMr ? p.mr : p.en)
                        }
                        className="text-[11px] bg-brand-tint/70 hover:bg-brand-tint text-brand-saf px-2 py-0.5 rounded-md font-medium transition-colors"
                      >
                        + {isMr ? p.mr : p.en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isMr
                      ? "जाण्याचे ठिकाण *"
                      : "Drop / Destination *"}
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder={
                      isMr
                        ? "उदा. शिर्डी, तुळजापूर, पुणे, हैदराबाद"
                        : "e.g. Shirdi, Tuljapur, Hyderabad"
                    }
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      clientErrors.destination
                        ? "border-red-500 bg-red-50/50"
                        : "border-gray-300 focus:border-brand-saf"
                    } outline-none text-sm font-medium transition-all`}
                  />
                  {clientErrors.destination && (
                    <p className="text-xs text-red-600 mt-1">
                      {clientErrors.destination}
                    </p>
                  )}
                  {/* Quick Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {popularDestinations.map((d, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setDestination(isMr ? d.mr : d.en)
                        }
                        className="text-[11px] bg-brand-tint/70 hover:bg-brand-tint text-brand-saf px-2 py-0.5 rounded-md font-medium transition-colors"
                      >
                        + {isMr ? d.mr : d.en}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Dates & Timings */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 font-mr pb-2 border-b border-gray-100">
                <Calendar className="w-5 h-5 text-brand-saf" />
                <span>
                  {isMr
                    ? "३. प्रवासाची तारीख व वेळ"
                    : "3. Travel Schedule"}
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isMr ? "प्रवासाची तारीख *" : "Travel Date *"}
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      clientErrors.travelDate
                        ? "border-red-500 bg-red-50/50"
                        : "border-gray-300 focus:border-brand-saf"
                    } outline-none text-sm font-medium transition-all`}
                  />
                  {clientErrors.travelDate && (
                    <p className="text-xs text-red-600 mt-1">{clientErrors.travelDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isMr ? "पिकअप वेळ" : "Pickup Time"}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      placeholder="06:00 AM"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isMr ? "परतीची तारीख (ऐच्छिक)" : "Return Date (Optional)"}
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-sm font-medium transition-all"
                  />
                  <span className="text-[10px] text-gray-500">
                    {isMr ? "राउंड ट्रिप असल्यास निवडा" : "Leave blank for one-way"}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 4: Vehicle & Service Preferences */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 font-mr pb-2 border-b border-gray-100">
                <Car className="w-5 h-5 text-brand-saf" />
                <span>
                  {isMr
                    ? "४. गाडी व सेवेचा प्रकार"
                    : "4. Vehicle & Service Selection"}
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isMr ? "प्रवासी संख्या" : "Passengers"}
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-sm font-medium bg-white transition-all"
                    >
                      <option value="1–4">
                        {isMr ? "१ ते ४ प्रवासी" : "1 to 4 Passengers"}
                      </option>
                      <option value="5–7">
                        {isMr ? "५ ते ७ प्रवासी" : "5 to 7 Passengers"}
                      </option>
                      <option value="8–12">
                        {isMr ? "८ ते १२ प्रवासी" : "8 to 12 Passengers"}
                      </option>
                      <option value="13–17">
                        {isMr ? "१३ ते १७ प्रवासी" : "13 to 17 Passengers"}
                      </option>
                      <option value="18–32">
                        {isMr ? "१८ ते ३२ प्रवासी" : "18 to 32 Passengers"}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isMr ? "गाडीची पसंती" : "Vehicle Preference"}
                  </label>
                  <select
                    value={vehiclePreference}
                    onChange={(e) => setVehiclePreference(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-sm font-medium bg-white transition-all"
                  >
                    {availableCars.map((v) => {
                      const vName = formatVehicleName(v, locale);
                      const vSeats = formatVehicleSeats(v.seats, locale);
                      const availTag = v.isAvailable
                        ? isMr
                          ? "🟢 उपलब्ध"
                          : "🟢 Available"
                        : isMr
                        ? "🟡 मागणीनुसार उपलब्ध"
                        : "🟡 On Request";

                      return (
                        <option key={v.id} value={v.name}>
                          {vName} ({vSeats}) — {availTag}
                        </option>
                      );
                    })}
                    <option value="Any Available Best Option">
                      {isMr ? "कोणतीही उपलब्ध उत्तम गाडी" : "Best Available Vehicle"}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isMr ? "सेवेचा प्रकार" : "Type of Service"}
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-sm font-medium bg-white transition-all"
                  >
                    <option value="Outstation Trips">
                      {isMr ? "आउटस्टेशन प्रवास" : "Outstation Trips"}
                    </option>
                    <option value="One-Way Drop">
                      {isMr ? "वन-वे प्रवास" : "One-Way Drop"}
                    </option>
                    <option value="Round Trip">
                      {isMr ? "राउंड ट्रिप" : "Round Trip"}
                    </option>
                    <option value="Local Car Rental">
                      {isMr ? "स्थानिक कार भाडे" : "Local Car Rental"}
                    </option>
                    <option value="Airport Transfer">
                      {isMr ? "विमानतळ / रेल्वे ट्रान्सफर" : "Airport / Railway Transfer"}
                    </option>
                    <option value="Wedding Transportation">
                      {isMr ? "लग्नकार्यासाठी गाड्या" : "Wedding Transportation"}
                    </option>
                    <option value="Customized Tour Package">
                      {isMr ? "सानुकूल टूर पॅकेज" : "Customized Tour Package"}
                    </option>
                  </select>
                </div>
              </div>

              {/* Additional Requirements */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {isMr
                    ? "काही विशेष आवश्यकता? (उदा. छतावर करिअर, वाटेतील थांबे, लहान बाळ)"
                    : "Additional Requirements (Roof carrier, baby seat, multiple stops, etc.)"}
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={2}
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    placeholder={
                      isMr
                        ? "उदा. शिर्डीसोबत शनी शिंगणापूरला जायचे आहे, ज्येष्ठ नागरिक सोबत आहेत."
                        : "e.g. Need halt at Shani Shingnapur, traveling with senior citizens."
                    }
                    className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-sm font-medium transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-saf hover:bg-brand-red text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>
                      {isMr ? "नोंदणी होत आहे..." : "Submitting..."}
                    </span>
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-brand-yellow" />
                    <span>
                      {isMr
                        ? "ऑनलाइन बुकिंग विनंती पाठवा"
                        : "Submit Booking Enquiry"}
                    </span>
                  </>
                )}
              </button>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow transition-all transform active:scale-95"
              >
                <MessageSquare className="w-5 h-5" />
                <span>
                  {isMr
                    ? "WhatsApp वर त्वरित कोटेशन"
                    : "Instant WhatsApp Quote"}
                </span>
              </a>
            </div>

            <p className="text-center text-xs text-gray-500 pt-2">
              🔒{" "}
              {isMr
                ? "तुमचा मोबाईल नंबर सुरक्षित राहील. आम्ही तात्काळ कॉल किंवा मेसेज करून अंतिम दर कळवू."
                : "Your mobile number is 100% confidential. We never spam. Immediate response guaranteed."}
            </p>
          </form>
        </div>

        {/* Right Column: Trust Badges & Help Hotline */}
        <div className="lg:col-span-4 space-y-6">
          {/* Direct Call Assistance Box */}
          <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-saf/20 rounded-full blur-2xl" />
            <div className="relative z-10">
              <span className="text-xs font-bold text-brand-yellow tracking-wider uppercase block">
                {isMr ? "२४/७ हेल्पलाईन नांदेड" : "24/7 Helpline Nanded"}
              </span>
              <h3 className="text-xl font-bold font-mr mt-1">
                {isMr
                  ? "तात्काळ गाडी हवी आहे का?"
                  : "Need an Urgent Ride?"}
              </h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                {isMr
                  ? "फॉर्म न भरता थेट आमच्याशी संपर्क साधा. नांदेड रेल्वे स्टेशन किंवा विमानतळासाठी ५ मिनिटांत कन्फर्मेशन."
                  : "Skip the form and speak directly with our tour dispatcher. Instant booking for airport and railway station drops."}
              </p>

              <div className="mt-5 space-y-3">
                <a
                  href="tel:+919325232301"
                  className="flex items-center justify-center gap-3 bg-brand-saf hover:bg-brand-red text-white font-bold py-3 px-4 rounded-xl shadow transition-transform transform active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 text-brand-yellow" />
                  <span>
                    {isMr ? "कॉल करा: +९१ ९३२५२३२३०१" : "Call: +91 9325232301"}
                  </span>
                </a>

                <a
                  href="https://wa.me/919325232301?text=Hello%20Swaraj%20Travels%2C%20I%20need%20a%20cab%20urgently."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp: {isMr ? "९३२५२३२३०१" : "9325232301"}</span>
                </a>
              </div>
            </div>
          </div>

          {/* 5 Swaraj Guarantees */}
          <div className="bg-brand-tint/40 rounded-3xl p-6 border border-brand-border">
            <h4 className="font-mr font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-saf" />
              <span>
                {isMr
                  ? "स्वराज ट्रॅव्हल्सची ५ वैशिष्ट्ये"
                  : "The Swaraj Travel Promise"}
              </span>
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {isMr
                    ? "१००% पारदर्शक दर – कोणतेही छुपे शुल्क नाही."
                    : "Transparent Pricing – Zero hidden charges or surprise tolls."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {isMr
                    ? "वेळेवर हजर – प्रवाशांना कधीही वाट पाहावी लागत नाही."
                    : "Zero Waiting – Cab arrives at pickup location 10 mins early."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {isMr
                    ? "स्थानिक अनुभवी चालक – सुरक्षित व सौम्य ड्रायव्हिंग."
                    : "Polite Local Chauffeurs – Police verified, safe highway driving."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {isMr
                    ? "सॅनिटाईज व वातानुकूलित (AC) सुस्थितीतील गाड्या."
                    : "Spotlessly Clean & Chilled AC vehicles on every booking."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {isMr
                    ? "२४ तास ग्राहक मदत केंद्र व थेट समन्वय."
                    : "24/7 Helpline coordination throughout your highway travel."}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {bookingResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border-4 border-brand-saf/30">
            <button
              onClick={() => setBookingResult(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-tint px-3 py-1 rounded-full inline-block">
                {isMr ? "बुकिंग नोंदणी यशस्वी" : "Enquiry Received"}
              </span>

              <h3 className="text-2xl font-mr font-extrabold text-gray-900">
                {isMr
                  ? "धन्यवाद! तुमची विनंती नोंदवली गेली आहे."
                  : "Thank You! Your Enquiry is Confirmed."}
              </h3>

              <div className="bg-brand-tint/50 border border-brand-border p-4 rounded-2xl text-left text-xs space-y-1.5 font-medium text-gray-700">
                <div className="flex justify-between border-b border-brand-border pb-1">
                  <span className="text-gray-500 font-normal">
                    {isMr ? "नोंदणी क्रमांक:" : "Booking Reference:"}
                  </span>
                  <span className="font-bold text-brand-saf text-sm">
                    {bookingResult.bookingNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{isMr ? "प्रवासी नाव:" : "Name:"}</span>
                  <span className="font-bold">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{isMr ? "रूट:" : "Route:"}</span>
                  <span className="font-bold text-right truncate max-w-[200px]">
                    {pickupLocation} ➔ {destination}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{isMr ? "तारीख:" : "Date:"}</span>
                  <span className="font-bold">{travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{isMr ? "गाडी:" : "Vehicle:"}</span>
                  <span className="font-bold">{vehiclePreference}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {isMr
                  ? "आमची टीम पुढील १५ मिनिटांत तुमच्याशी संपर्क साधेल किंवा खालील बटण दाबून WhatsApp वर थेट कन्फर्मेशन मिळवा."
                  : "Our team will reach out within 15 minutes. You can also click below to confirm immediately on WhatsApp."}
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/919325232301?text=${encodeURIComponent(
                    `Hello Swaraj Tours & Travels, I just submitted booking enquiry ${bookingResult.bookingNumber} for ${fullName} (${pickupLocation} to ${destination} on ${travelDate}). Please confirm quote and driver details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>
                    {isMr
                      ? "WhatsApp वर तात्काळ कन्फर्म करा"
                      : "Confirm Directly on WhatsApp"}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => setBookingResult(null)}
                  className="w-full py-2.5 text-xs text-gray-600 hover:text-gray-900 font-bold"
                >
                  {isMr ? "बंद करा" : "Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <PageShell>
      {({ locale }) => (
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-brand-saf border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <BookingFormContent locale={locale} />
        </Suspense>
      )}
    </PageShell>
  );
}
