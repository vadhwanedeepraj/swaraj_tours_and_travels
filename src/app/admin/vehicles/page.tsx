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
} from "lucide-react";
import { Vehicle } from "@/types";

export default function VehiclesManagementPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Notification state
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  // Form state for Add/Edit
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    name: "",
    marathiName: "",
    regNumber: "MH-26-BE-1001",
    category: "Sedan",
    seats: "४+१ प्रवासी (4+1 Seats)",
    ac: true,
    luggage: "२ मोठी बॅग्ज",
    image: "/vehicles/car-1.jpeg",
    ownership: "owned",
    ratePerKm: 11,
    minKmPerDay: 300,
    driverAllowancePerDay: 300,
    isAvailable: true,
  });

  // Fetch vehicles from API
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/vehicles");
      const data = await res.json();
      if (data.success && Array.isArray(data.vehicles)) {
        setVehicles(data.vehicles);
      }
    } catch (err) {
      console.error("Failed to load vehicles:", err);
      showFeedback("error", "गाड्यांची यादी लोड करण्यात त्रुटी आली.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
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
          `${car.name} आता ${newStatus ? "उपलब्ध (Available)" : "मागणीनुसार (On Request)"} करण्यात आली आहे.`
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

  // Open Edit Modal
  const openEditModal = (car: Vehicle) => {
    setEditingVehicle(car);
    setFormData({ ...car });
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
      image: "/vehicles/car-1.jpeg",
      ownership: "owned",
      ratePerKm: 12,
      minKmPerDay: 300,
      driverAllowancePerDay: 300,
      isAvailable: true,
    });
    setIsAddModalOpen(true);
  };

  // Save Add/Edit
  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showFeedback("error", "गाडीचे नाव आवश्यक आहे.");
      return;
    }

    try {
      if (editingVehicle) {
        // Update
        const res = await fetch("/api/admin/vehicles", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, id: editingVehicle.id }),
        });
        const data = await res.json();
        if (data.success) {
          showFeedback("success", `${formData.name} ची माहिती व दर यशस्वीरित्या अद्ययावत झाले!`);
          setEditingVehicle(null);
          fetchVehicles();
        } else {
          showFeedback("error", data.error || "अपडेट अयशस्वी झाले.");
        }
      } else {
        // Create new
        const res = await fetch("/api/admin/vehicles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          showFeedback("success", `नवीन गाडी ${formData.name} यशस्वीरित्या जोडली गेली!`);
          setIsAddModalOpen(false);
          fetchVehicles();
        } else {
          showFeedback("error", data.error || "गाडी जोडता आली नाही.");
        }
      }
    } catch (err) {
      showFeedback("error", "सर्व्हरशी संपर्क होऊ शकला नाही.");
    }
  };

  // Delete
  const confirmDelete = async () => {
    if (!vehicleToDelete) return;
    try {
      const res = await fetch(`/api/admin/vehicles?id=${vehicleToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showFeedback("success", `${vehicleToDelete.name} गाडी हटवण्यात आली.`);
        setVehicleToDelete(null);
        fetchVehicles();
      } else {
        showFeedback("error", data.error || "गाडी हटवता आली नाही.");
      }
    } catch (err) {
      showFeedback("error", "गाडी हटवताना त्रुटी आली.");
    }
  };

  // Filtering
  const filteredVehicles = vehicles.filter((car) => {
    const matchesCategory =
      selectedCategory === "All" || car.category === selectedCategory;
    const matchesQuery =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.marathiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (car.regNumber && car.regNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Top Notification Toast */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-bold shadow-lg animate-in slide-in-from-top-2 ${
            feedback.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="p-1 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-tint px-3 py-1 rounded-full font-mr">
              👑 स्वराज फ्लीट कंट्रोल
            </span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              थेट वेबसाइटशी जोडलेले (Live Synced)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 font-mr tracking-tight">
            वाहन व दर व्यवस्थापन (Fleet & Pricing Control)
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
            येथे बदल केलेले दर आणि वाहनांची उपलब्धता मुख्य वेबसाइटवर तात्काळ ग्राहकांना दिसतात.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchVehicles}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl text-gray-700 transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-brand-saf hover:bg-brand-red text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>नवीन गाडी जोडा (Add Vehicle)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="गाडीचे नाव किंवा MH नंबर शोधा..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-medium"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {["All", "Sedan", "SUV/MUV", "Luxury Coach", "Tempo Traveller"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-brand-saf text-white shadow-sm"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {cat === "All" ? "सर्व" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && vehicles.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-4 border-brand-saf border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <span className="text-xs font-bold text-gray-500">गाड्यांची माहिती लोड होत आहे...</span>
        </div>
      )}

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((car) => {
          const isAvailable = Boolean(car.isAvailable);
          return (
            <div
              key={car.id}
              className={`bg-white rounded-3xl border ${
                isAvailable
                  ? "border-emerald-300 ring-2 ring-emerald-500/20"
                  : "border-gray-200 opacity-95"
              } overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group`}
            >
              <div>
                {/* Vehicle Image Banner */}
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <Image
                    src={car.image || "/vehicles/car-1.jpeg"}
                    alt={car.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[11px] font-mono font-bold text-gray-900 px-2.5 py-0.5 rounded-md shadow">
                    {car.regNumber || "MH-26-REG"}
                  </div>
                  <div className="absolute top-3 right-3 bg-brand-saf text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                    {car.ownership === "owned" ? "स्वतःची फ्लीट" : "भागीदार"}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-brand-saf uppercase tracking-wider">
                      {car.category}
                    </span>

                    {/* 1-Click Interactive Availability Badge */}
                    <button
                      onClick={() => handleToggleAvailability(car)}
                      title="क्लिक करून स्थिती बदला"
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full shadow-sm transition-all hover:scale-105 active:scale-95 ${
                        isAvailable
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100"
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
                      <span className="text-gray-500 block text-[11px]">प्रति किमी दर:</span>
                      <span className="text-brand-saf font-extrabold text-sm">
                        ₹{car.ratePerKm} / km
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[11px]">ड्रायव्हर भत्ता:</span>
                      <span className="font-bold text-gray-800 text-sm">
                        ₹{car.driverAllowancePerDay} / दिवस
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[11px]">आसने (Seats):</span>
                      <span className="font-bold text-gray-800">{car.seats}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[11px]">किमान अंतर/दिवस:</span>
                      <span className="font-bold text-gray-800">{car.minKmPerDay} km</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2">
                <button
                  onClick={() => openEditModal(car)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold py-2.5 px-3 rounded-xl border border-gray-200 transition-colors shadow-sm"
                >
                  <Edit className="w-3.5 h-3.5 text-brand-saf" />
                  <span>माहिती व दर बदला (Edit)</span>
                </button>

                <button
                  onClick={() => setVehicleToDelete(car)}
                  className="p-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-200"
                  title="गाडी हटवा"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit / Add Modal */}
      {(editingVehicle || isAddModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border-4 border-brand-saf/20">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-brand-saf/10 text-brand-saf flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mr font-extrabold text-xl text-gray-900">
                    {editingVehicle ? "गाडीची माहिती व दर बदला" : "नवीन गाडी जोडा (Add New Vehicle)"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    बदल जतन केल्यानंतर लगेच मुख्य वेबसाइटवर अद्ययावत होतील.
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
            <form onSubmit={handleSaveVehicle} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    गाडीचे नाव (Vehicle Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="उदा. Hyundai AURA / Maruti Dzire"
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
                    placeholder="उदा. ह्युंदाई ऑरा (Hyundai AURA)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold"
                  />
                </div>
              </div>

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
                    <option value="SUV/MUV">SUV/MUV (अर्टिगा)</option>
                    <option value="Luxury Coach">Luxury Coach (इनोव्हा / व्हीआयपी)</option>
                    <option value="Tempo Traveller">Tempo Traveller (टेम्पो)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    गाडीचा नंबर (Registration No)
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
                    आसने (Seating Capacity)
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

              {/* Pricing Row */}
              <div className="bg-brand-tint/40 p-4 rounded-2xl border border-brand-border space-y-3">
                <span className="text-xs font-bold text-brand-saf block">
                  दर व भाडे आकारणी (Pricing Structure)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      प्रति किमी दर (₹ Rate / KM) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-bold text-gray-500">₹</span>
                      <input
                        type="number"
                        min="8"
                        max="100"
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
                        min="100"
                        max="2000"
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
                      min="100"
                      max="600"
                      value={formData.minKmPerDay || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, minKmPerDay: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Status & Availability Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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
                    <option value="true">🟢 उपलब्ध (Available immediately)</option>
                    <option value="false">🟡 मागणीनुसार / आरक्षित (On Request / Booked)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    मालकीचा प्रकार (Ownership)
                  </label>
                  <select
                    value={formData.ownership || "owned"}
                    onChange={(e) =>
                      setFormData({ ...formData, ownership: e.target.value as any })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold bg-white"
                  >
                    <option value="owned">स्वराज स्वतःची गाडी (Owned)</option>
                    <option value="partner">भागीदाराची गाडी (Partner Fleet)</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setEditingVehicle(null);
                    setIsAddModalOpen(false);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  रद्द करा (Cancel)
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-brand-saf hover:bg-brand-red text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>जतन करा (Save Changes)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {vehicleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border-4 border-red-100">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-mr font-bold text-lg text-gray-900">
                गाडी हटवायची खात्री आहे?
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                <strong>{vehicleToDelete.name}</strong> ही गाडी फ्लीटमधून कायमची हटवली जाईल.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setVehicleToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
              >
                रद्द करा (Cancel)
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow"
              >
                होय, हटवा (Delete)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
