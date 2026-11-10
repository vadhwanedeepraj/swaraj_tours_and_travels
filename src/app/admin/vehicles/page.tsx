"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Car,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Edit,
  Trash2,
  DollarSign,
  Tag,
  Search,
  Users,
  Wind,
  Briefcase,
  X,
  Check,
  Sparkles,
  RefreshCw,
  Power,
  Fuel,
  Image as ImageIcon,
  ShieldCheck,
  Building2,
  Layers,
  ArrowRight,
  ExternalLink,
  Info,
} from "lucide-react";
import { Vehicle } from "@/types";

const IMAGE_PRESETS = [
  { label: "Sedan Car 1 (Aura/Dzire)", url: "/vehicles/car-1.jpeg" },
  { label: "Ertiga SUV Car 2", url: "/vehicles/car-2.jpeg" },
  { label: "Luxury Innova Car 3", url: "/vehicles/car-3.jpeg" },
  { label: "Swaraj Banner & Fleet", url: "/branding/banner.jpeg" },
];

const DEFAULT_IMAGE = "/vehicles/car-1.jpeg";

export default function VehiclesManagementPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOwnership, setSelectedOwnership] = useState<"All" | "owned" | "partner">("All");
  const [selectedAvailability, setSelectedAvailability] = useState<"All" | "available" | "on_request">("All");

  // Notification Toast
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    name: "",
    marathiName: "",
    regNumber: "MH-26-BE-1001",
    category: "Sedan",
    seats: "४+१ प्रवासी (4+1 Seats)",
    ac: true,
    luggage: "२ मोठी बॅग्ज",
    image: DEFAULT_IMAGE,
    additionalImages: [DEFAULT_IMAGE],
    ownership: "owned",
    ratePerKm: 12,
    minKmPerDay: 300,
    driverAllowancePerDay: 300,
    isAvailable: true,
    status: "available",
    descriptionEn: "Comfortable and sanitized AC vehicle for smooth travels.",
    descriptionMr: "स्वच्छ, निर्जंतुक व आरामदायी वातानुकूलित कार.",
  });

  // Image input helper in form
  const [newImageUrl, setNewImageUrl] = useState("");

  // Fetch vehicles from API
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/vehicles", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.vehicles)) {
        setVehicles(data.vehicles);
      }
    } catch (err) {
      console.error("Failed to load vehicles:", err);
      showFeedback("error", "गाड्यांची यादी लोड करण्यात त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4500);
  };

  // 1-Click Availability Toggle
  const handleToggleAvailability = async (car: Vehicle) => {
    const newStatus = !car.isAvailable;
    try {
      // Optimistic update
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === car.id
            ? {
                ...v,
                isAvailable: newStatus,
                status: newStatus ? "available" : "on_request",
              }
            : v
        )
      );

      const res = await fetch("/api/admin/vehicles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: car.id, isAvailable: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        showFeedback(
          "success",
          `${car.name} आता ${newStatus ? "उपलब्ध (Available 🟢)" : "मागणीनुसार (On Request 🟡)"} आहे.`
        );
      } else {
        fetchVehicles(); // rollback on error
        showFeedback("error", "स्थिती बदलता आली नाही.");
      }
    } catch (err) {
      fetchVehicles();
      showFeedback("error", "सर्व्हर त्रुटी आली.");
    }
  };

  // 1-Click Ownership Toggle (Owned <-> Partner)
  const handleToggleOwnership = async (car: Vehicle) => {
    const newOwnership = car.ownership === "owned" ? "partner" : "owned";
    try {
      setVehicles((prev) =>
        prev.map((v) => (v.id === car.id ? { ...v, ownership: newOwnership } : v))
      );

      const res = await fetch("/api/admin/vehicles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: car.id, ownership: newOwnership }),
      });

      const data = await res.json();
      if (data.success) {
        showFeedback(
          "success",
          `${car.name} मालकी प्रकार: ${newOwnership === "owned" ? "स्वतःची फ्लीट (Owned)" : "भागीदाराची गाडी (Partner)"}`
        );
      } else {
        fetchVehicles();
      }
    } catch {
      fetchVehicles();
    }
  };

  // Open Edit Modal
  const openEditModal = (car: Vehicle) => {
    setEditingVehicle(car);
    const images = Array.isArray(car.additionalImages) && car.additionalImages.length > 0
      ? car.additionalImages
      : [car.image || DEFAULT_IMAGE];

    setFormData({
      ...car,
      image: car.image || DEFAULT_IMAGE,
      additionalImages: images,
    });
    setNewImageUrl("");
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingVehicle(null);
    setFormData({
      name: "",
      marathiName: "",
      regNumber: `MH-26-BE-${Math.floor(1000 + Math.random() * 9000)}`,
      category: "Sedan",
      seats: "४+१ प्रवासी (4+1 Seats)",
      ac: true,
      luggage: "२ मोठी बॅग्ज",
      image: DEFAULT_IMAGE,
      additionalImages: [DEFAULT_IMAGE],
      ownership: "owned",
      ratePerKm: 12,
      minKmPerDay: 300,
      driverAllowancePerDay: 300,
      isAvailable: true,
      status: "available",
      descriptionEn: "Spotlessly clean, air-conditioned vehicle with courteous driver.",
      descriptionMr: "स्वच्छ, सॅनिटाईझ केलेली एसी गाडी आणि अनुभवी चालक.",
    });
    setNewImageUrl("");
    setIsAddModalOpen(true);
  };

  // Image helpers
  const handleAddImage = (url: string) => {
    if (!url.trim()) return;
    const currentList = formData.additionalImages || [];
    if (!currentList.includes(url.trim())) {
      const updated = [...currentList, url.trim()];
      setFormData({
        ...formData,
        additionalImages: updated,
        image: formData.image || url.trim(),
      });
    }
    setNewImageUrl("");
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const currentList = formData.additionalImages || [];
    const updated = currentList.filter((_, idx) => idx !== indexToRemove);
    const newPrimary = updated.length > 0 ? updated[0] : DEFAULT_IMAGE;
    setFormData({
      ...formData,
      additionalImages: updated.length > 0 ? updated : [DEFAULT_IMAGE],
      image: newPrimary,
    });
  };

  const handleSetPrimaryImage = (url: string) => {
    setFormData({
      ...formData,
      image: url,
    });
  };

  // Save Add/Edit
  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showFeedback("error", "गाडीचे नाव आवश्यक आहे (Vehicle name required).");
      return;
    }
    if (!formData.ratePerKm || formData.ratePerKm <= 0) {
      showFeedback("error", "कृपया वैध प्रति किमी दर प्रविष्ट करा.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        image: formData.image || DEFAULT_IMAGE,
        additionalImages: formData.additionalImages?.length ? formData.additionalImages : [DEFAULT_IMAGE],
      };

      if (editingVehicle) {
        // Update (PUT)
        const res = await fetch("/api/admin/vehicles", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, id: editingVehicle.id }),
        });
        const data = await res.json();
        if (data.success) {
          showFeedback("success", `${formData.name} चे तपशील व दर यशस्वीरित्या जतन झाले!`);
          setEditingVehicle(null);
          await fetchVehicles();
        } else {
          showFeedback("error", data.error || "माहिती अद्ययावत करण्यात अडचण आली.");
        }
      } else {
        // Create (POST)
        const res = await fetch("/api/admin/vehicles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showFeedback("success", `नवीन गाडी ${formData.name} यशस्वीरित्या जोडली गेली!`);
          setIsAddModalOpen(false);
          await fetchVehicles();
        } else {
          showFeedback("error", data.error || "गाडी जोडता आली नाही.");
        }
      }
    } catch (err) {
      showFeedback("error", "सर्व्हरशी संपर्क होऊ शकला नाही.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Safe Delete (Soft Delete)
  const confirmDelete = async () => {
    if (!vehicleToDelete) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/vehicles?id=${vehicleToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(
          "success",
          `${vehicleToDelete.name} गाडी फ्लीटमधून हटवली (जुन्या बुकिंग नोंदी सुरक्षित आहेत).`
        );
        setVehicleToDelete(null);
        await fetchVehicles();
      } else {
        showFeedback("error", data.error || "गाडी हटवता आली नाही.");
      }
    } catch (err) {
      showFeedback("error", "गाडी हटवताना सर्व्हर त्रुटी आली.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtering
  const filteredVehicles = vehicles.filter((car) => {
    const matchesCategory =
      selectedCategory === "All" || car.category === selectedCategory;
    const matchesOwnership =
      selectedOwnership === "All" || car.ownership === selectedOwnership;
    const matchesAvailability =
      selectedAvailability === "All" ||
      (selectedAvailability === "available" && Boolean(car.isAvailable)) ||
      (selectedAvailability === "on_request" && !car.isAvailable);

    const matchesQuery =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.marathiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (car.regNumber && car.regNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesOwnership && matchesAvailability && matchesQuery;
  });

  // KPI calculations
  const totalFleetCount = vehicles.length;
  const ownedCount = vehicles.filter((v) => v.ownership === "owned").length;
  const partnerCount = vehicles.filter((v) => v.ownership === "partner").length;
  const availableCount = vehicles.filter((v) => Boolean(v.isAvailable)).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-bold shadow-xl animate-in slide-in-from-top-2 border ${
            feedback.type === "success"
              ? "bg-emerald-600 text-white border-emerald-500"
              : "bg-red-600 text-white border-red-500"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-white" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0 text-white" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors ml-4"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0e1d3a] to-[#142B59] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/15">
                👑 स्वराज फ्लीट व दर नियंत्रण केंद्र
              </span>
              <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                थेट वेबसाईटशी जोडलेले (Live Synced)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-mr tracking-tight">
              वाहन व दर व्यवस्थापन (Fleet & Pricing Control)
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
              नवीन गाड्या जोडा, भाड्याचे दर आणि फोटो अद्ययावत करा. केलेले बदल तात्काळ मुख्य वेबसाईटवर ग्राहकांना दिसतात.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={fetchVehicles}
              className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all hover:scale-105 active:scale-95"
              title="रीफ्रेश करा (Refresh List)"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-brand-saf hover:bg-brand-red text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>नवीन गाडी जोडा (Add Vehicle)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block uppercase">एकूण गाड्या (Fleet)</span>
            <span className="text-xl font-black text-gray-900">{totalFleetCount}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block uppercase">स्वराज मालकी (Owned)</span>
            <span className="text-xl font-black text-gray-900">{ownedCount}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block uppercase">भागीदार फ्लीट (Partner)</span>
            <span className="text-xl font-black text-gray-900">{partnerCount}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block uppercase">उपलब्ध गाड्या (Available)</span>
            <span className="text-xl font-black text-emerald-600">{availableCount}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="गाडीचे नाव किंवा MH नंबर शोधा..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-semibold"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-300 bg-white text-xs font-bold text-gray-700 outline-none focus:border-brand-saf"
            >
              <option value="All">सर्व वर्ग (All Categories)</option>
              <option value="Sedan">Sedan (सेडान)</option>
              <option value="SUV/MUV">SUV/MUV (अर्टिगा/स्कॉर्पिओ)</option>
              <option value="Luxury Coach">Luxury Coach (इनोव्हा / लक्झरी)</option>
              <option value="Tempo Traveller">Tempo Traveller (टेम्पो)</option>
            </select>

            {/* Ownership Select */}
            <select
              value={selectedOwnership}
              onChange={(e) => setSelectedOwnership(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl border border-gray-300 bg-white text-xs font-bold text-gray-700 outline-none focus:border-brand-saf"
            >
              <option value="All">सर्व मालकी (All Ownership)</option>
              <option value="owned">स्वराज मालकी (Owned)</option>
              <option value="partner">भागीदार (Partner)</option>
            </select>

            {/* Availability Select */}
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl border border-gray-300 bg-white text-xs font-bold text-gray-700 outline-none focus:border-brand-saf"
            >
              <option value="All">सर्व स्थिती (All Availability)</option>
              <option value="available">🟢 उपलब्ध (Available)</option>
              <option value="on_request">🟡 मागणीनुसार (On Request)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && vehicles.length === 0 && (
        <div className="py-20 text-center bg-white rounded-3xl border border-gray-200">
          <div className="w-9 h-9 border-4 border-brand-saf border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <span className="text-xs font-bold text-gray-500">फ्लीट डेटा लोड होत आहे...</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredVehicles.length === 0 && (
        <div className="py-16 text-center bg-white rounded-3xl border border-gray-200 p-6">
          <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-mr font-bold text-lg text-gray-800">कोणतीही गाडी आढळली नाही</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            निवडलेल्या निकषांनुसार कोणतीही गाडी नाही. कृपया फिल्टर बदला किंवा नवीन गाडी जोडा.
          </p>
          <button
            onClick={openAddModal}
            className="mt-4 inline-flex items-center gap-2 bg-brand-saf text-white text-xs font-bold px-4 py-2.5 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            <span>नवीन गाडी जोडा</span>
          </button>
        </div>
      )}

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((car) => {
          const isAvailable = Boolean(car.isAvailable);
          const isOwned = car.ownership === "owned";
          const gallery = Array.isArray(car.additionalImages) && car.additionalImages.length > 0
            ? car.additionalImages
            : [car.image || DEFAULT_IMAGE];

          return (
            <div
              key={car.id || car.slug}
              className={`bg-white rounded-3xl border ${
                isAvailable
                  ? "border-emerald-300 ring-2 ring-emerald-500/20 shadow-sm"
                  : "border-gray-200 opacity-95"
              } overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group`}
            >
              <div>
                {/* Vehicle Image Banner with Overlay Badges */}
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <Image
                    src={car.image || DEFAULT_IMAGE}
                    alt={car.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* MH Registration Number Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[11px] font-mono font-black text-gray-900 px-2.5 py-0.5 rounded-lg shadow border border-gray-200">
                    {car.regNumber || "MH-26-REG"}
                  </div>

                  {/* 1-Click Toggleable Ownership Badge */}
                  <button
                    onClick={() => handleToggleOwnership(car)}
                    title="क्लिक करून मालकी बदला (Owned / Partner)"
                    className={`absolute top-3 right-3 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow transition-all hover:scale-105 ${
                      isOwned
                        ? "bg-brand-saf text-white hover:bg-brand-red"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    {isOwned ? "👑 स्वराज स्वतःची" : "🤝 भागीदार फ्लीट"}
                  </button>

                  {/* Image Count Pill */}
                  {gallery.length > 1 && (
                    <div className="absolute bottom-2.5 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      <span>{gallery.length} फोटो</span>
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-5 space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-brand-saf uppercase tracking-wider bg-brand-tint/60 px-2.5 py-0.5 rounded-md">
                      {car.category}
                    </span>

                    {/* 1-Click Interactive Availability Badge */}
                    <button
                      onClick={() => handleToggleAvailability(car)}
                      title="क्लिक करून उपलब्धता बदला (Toggle Live Availability)"
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full shadow-sm transition-all hover:scale-105 active:scale-95 ${
                        isAvailable
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                          : "bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isAvailable ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                        }`}
                      />
                      <span>
                        {isAvailable ? "उपलब्ध (Available)" : "मागणीनुसार (On Request)"}
                      </span>
                    </button>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-900 font-mr">{car.name}</h3>
                    <p className="text-xs text-gray-500 font-mr">{car.marathiName}</p>
                  </div>

                  {/* Pricing and Key Metrics Box */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-brand-tint/30 p-3 rounded-2xl border border-brand-border">
                    <div>
                      <span className="text-gray-500 block text-[11px] font-medium">प्रति किमी दर:</span>
                      <span className="text-brand-saf font-black text-base">
                        ₹{car.ratePerKm} <span className="text-xs font-bold text-gray-500">/ km</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[11px] font-medium">ड्रायव्हर भत्ता:</span>
                      <span className="font-bold text-gray-800 text-sm">
                        ₹{car.driverAllowancePerDay} <span className="text-[10px] text-gray-500">/ दिवस</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[11px] font-medium">आसन क्षमता:</span>
                      <span className="font-bold text-gray-800">{car.seats}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[11px] font-medium">किमान अंतर/दिवस:</span>
                      <span className="font-bold text-gray-800">{car.minKmPerDay} km</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between gap-2">
                <button
                  onClick={() => openEditModal(car)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold py-2.5 px-3 rounded-xl border border-gray-200 transition-colors shadow-sm"
                >
                  <Edit className="w-3.5 h-3.5 text-brand-saf" />
                  <span>माहिती व फोटो बदला (Edit)</span>
                </button>

                <button
                  onClick={() => setVehicleToDelete(car)}
                  className="p-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-200"
                  title="गाडी सुरक्षितपणे हटवा (Safe Delete)"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* ADD / EDIT VEHICLE MODAL                                       */}
      {/* ============================================================== */}
      {(editingVehicle || isAddModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto border-4 border-brand-saf/30">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-brand-saf/10 text-brand-saf flex items-center justify-center">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-mr font-black text-xl text-gray-900">
                    {editingVehicle ? "गाडीची माहिती, दर व फोटो बदला" : "नवीन गाडी जोडा (Add New Vehicle)"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    बदल जतन केल्यानंतर लगेच मुख्य वेबसाईटवर ग्राहकांना दिसतील.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingVehicle(null);
                  setIsAddModalOpen(false);
                }}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveVehicle} className="space-y-5">
              {/* Row 1: Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    गाडीचे नाव (Vehicle Name in English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="उदा. Hyundai AURA / Maruti Ertiga"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    मराठी नाव (Marathi Display Name)
                  </label>
                  <input
                    type="text"
                    value={formData.marathiName || ""}
                    onChange={(e) => setFormData({ ...formData, marathiName: e.target.value })}
                    placeholder="उदा. ह्युंदाई ऑरा / मारुती अर्टिगा"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold"
                  />
                </div>
              </div>

              {/* Row 2: Category, Reg No, Seats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    वर्गवारी (Category) *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as any })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold bg-white"
                  >
                    <option value="Sedan">Sedan (सेडान)</option>
                    <option value="SUV/MUV">SUV/MUV (अर्टिगा / स्कॉर्पिओ)</option>
                    <option value="Luxury Coach">Luxury Coach (इनोव्हा / लक्झरी)</option>
                    <option value="Tempo Traveller">Tempo Traveller (टेम्पो ट्रॅव्हलर)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    नोंदणी क्रमांक (Registration No)
                  </label>
                  <input
                    type="text"
                    value={formData.regNumber || ""}
                    onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                    placeholder="MH-26-BE-1001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    आसन क्षमता (Seating Capacity)
                  </label>
                  <input
                    type="text"
                    value={formData.seats || ""}
                    onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                    placeholder="४+१ प्रवासी (4+1 Seats)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold"
                  />
                </div>
              </div>

              {/* Row 3: Pricing Structure */}
              <div className="bg-brand-tint/40 p-4 rounded-2xl border border-brand-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-saf uppercase tracking-wider block">
                    💰 दर व भाडे आकारणी (Pricing Structure)
                  </span>
                  <span className="text-[11px] text-gray-500 font-semibold">
                    ग्राहकांना थेट वेबसाईटवर दिसणारे दर
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      प्रति किमी दर (₹ Rate / KM) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-bold text-gray-500">₹</span>
                      <input
                        type="number"
                        min="5"
                        max="200"
                        required
                        value={formData.ratePerKm || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, ratePerKm: Number(e.target.value) })
                        }
                        className="w-full pl-7 pr-3 py-2 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-extrabold text-brand-saf"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      ड्रायव्हर भत्ता (₹ Driver Bhatta/Day)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-bold text-gray-500">₹</span>
                      <input
                        type="number"
                        min="0"
                        max="3000"
                        value={formData.driverAllowancePerDay || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            driverAllowancePerDay: Number(e.target.value),
                          })
                        }
                        className="w-full pl-7 pr-3 py-2 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      किमान अंतर/दिवस (Min KM/Day)
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="1000"
                      value={formData.minKmPerDay || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, minKmPerDay: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Images & Gallery Manager */}
              <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/70 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-brand-saf" />
                    <span>वाहनाचे फोटो व्यवस्थापन (Vehicle Images & Gallery)</span>
                  </span>
                  <span className="text-[11px] text-gray-500">
                    फोटो नसताना डिफॉल्ट फोटो आपोआप वापरला जाईल
                  </span>
                </div>

                {/* Pre-loaded Image Presets */}
                <div>
                  <span className="text-[11px] font-semibold text-gray-600 block mb-1.5">
                    तयार फोटो निवडा (Quick Presets):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {IMAGE_PRESETS.map((preset) => (
                      <button
                        type="button"
                        key={preset.url}
                        onClick={() => handleAddImage(preset.url)}
                        className="text-[11px] font-bold bg-white hover:bg-brand-tint hover:border-brand-saf border border-gray-200 px-2.5 py-1 rounded-lg text-gray-700 transition-colors shadow-sm flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3 text-brand-saf" />
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Image URL Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="कस्टम इमेज लिंक टाका (उदा. /vehicles/car-1.jpeg किंवा URL)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-brand-saf outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddImage(newImageUrl)}
                    className="px-4 py-2 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                  >
                    फोटो जोडा (Add)
                  </button>
                </div>

                {/* Visual Thumbnails of Selected Images */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-gray-700 block">
                    निवडलेले फोटो (Selected Images):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(formData.additionalImages || [DEFAULT_IMAGE]).map((imgUrl, idx) => {
                      const isPrimary = formData.image === imgUrl;
                      return (
                        <div
                          key={idx}
                          className={`relative rounded-xl overflow-hidden border-2 aspect-video bg-gray-200 group ${
                            isPrimary ? "border-brand-saf ring-2 ring-brand-saf/30" : "border-gray-200"
                          }`}
                        >
                          <Image
                            src={imgUrl}
                            alt="Vehicle preview"
                            fill
                            className="object-cover"
                          />
                          {isPrimary && (
                            <span className="absolute top-1 left-1 bg-brand-saf text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                              मुख्य फोटो
                            </span>
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                            {!isPrimary && (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryImage(imgUrl)}
                                className="p-1 bg-white text-gray-800 rounded text-[10px] font-bold hover:bg-brand-tint"
                                title="मुख्य फोटो बनवा"
                              >
                                मुख्य करा
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                              title="फोटो काढा"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Row 5: Ownership & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    मालकीचा प्रकार (Ownership Type)
                  </label>
                  <select
                    value={formData.ownership || "owned"}
                    onChange={(e) =>
                      setFormData({ ...formData, ownership: e.target.value as any })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold bg-white"
                  >
                    <option value="owned">👑 स्वराज स्वतःची गाडी (Owned Fleet)</option>
                    <option value="partner">🤝 भागीदाराची गाडी (Partner Fleet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    उपलब्धता स्थिती (Availability Status)
                  </label>
                  <select
                    value={formData.isAvailable ? "true" : "false"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isAvailable: e.target.value === "true",
                        status: e.target.value === "true" ? "available" : "on_request",
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold bg-white"
                  >
                    <option value="true">🟢 तात्काळ उपलब्ध (Available immediately)</option>
                    <option value="false">🟡 मागणीनुसार / आरक्षित (On Request / Busy)</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setEditingVehicle(null);
                    setIsAddModalOpen(false);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  रद्द करा (Cancel)
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-brand-saf hover:bg-brand-red text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>डेटाबेसमध्ये जतन करा (Save Changes)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SAFE DELETE CONFIRMATION MODAL                                */}
      {/* ============================================================== */}
      {vehicleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border-4 border-red-100">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-inner">
              <Trash2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-mr font-black text-xl text-gray-900">
                गाडी फ्लीटमधून हटवायची खात्री आहे?
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                <strong>{vehicleToDelete.name}</strong> ({vehicleToDelete.regNumber || "MH-26"}) ही गाडी सक्रिय फ्लीटमधून काढली जाईल.
              </p>
            </div>

            {/* Safety Guarantee Callout */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-left text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4" />
                <span>जुन्या बुकिंग नोंदी सुरक्षित राहतील:</span>
              </div>
              <p className="text-[11px] text-emerald-700 leading-normal">
                या गाडीशी संबंधित मागील सर्व ग्राहक बुकिंग्स, पावत्या आणि डेटाबेस इतिहास सुरक्षित राहतील.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setVehicleToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                रद्द करा (Cancel)
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>होय, हटवा (Confirm Delete)</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
