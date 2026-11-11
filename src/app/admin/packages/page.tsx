"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Compass,
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
  Check,
  RefreshCw,
  Calendar,
  Clock,
  Sparkles,
  MapPin,
  Car,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { TourPackage } from "@/types";

const DEFAULT_PACKAGE_IMAGE = "/vehicles/car-1.jpeg";

const PACKAGE_IMAGE_PRESETS = [
  { label: "Swift Dzire", url: "/vehicles/swift-dzire.png" },
  { label: "Maruti Ertiga", url: "/vehicles/maruti-ertiga.avif" },
  { label: "Sedan Car 1", url: "/vehicles/car-1.jpeg" },
  { label: "Innova Car 3", url: "/vehicles/car-3.jpeg" },
  { label: "Swaraj Banner", url: "/branding/banner.jpeg" },
];

export default function PackagesManagementPage() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [packageToDelete, setPackageToDelete] = useState<TourPackage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<TourPackage>>({
    titleEn: "",
    titleMr: "",
    slug: "",
    durationEn: "1 Day (Same-Day Return)",
    durationMr: "१ दिवस",
    durationDays: 1,
    category: "Pilgrimage",
    categoryMr: "तीर्थक्षेत्र दर्शन",
    distanceKm: 250,
    startingPrice: 5000,
    heroImage: DEFAULT_PACKAGE_IMAGE,
    overviewEn: "",
    overviewMr: "",
    pickupDrop: "Nanded Doorstep Pickup & Return Drop",
  });

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/packages", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.packages)) {
        setPackages(data.packages);
      }
    } catch (err) {
      console.error("Failed to load packages:", err);
      showFeedback("error", "टूर पॅकेजेस लोड करता आले नाहीत.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) {
      showFeedback("error", "कृपया २.५ MB पेक्षा लहान आकाराचा फोटो निवडा.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setFormData((prev) => ({ ...prev, heroImage: dataUrl }));
        showFeedback("success", "पॅकेजचा फोटो यशस्वीरित्या जोडला!");
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const openAddModal = () => {
    setEditingPackage(null);
    setFormData({
      titleEn: "",
      titleMr: "",
      slug: "",
      durationEn: "1 Day (Same-Day Return)",
      durationMr: "१ दिवस",
      durationDays: 1,
      category: "Pilgrimage",
      categoryMr: "तीर्थक्षेत्र दर्शन",
      distanceKm: 250,
      startingPrice: 5500,
      heroImage: DEFAULT_PACKAGE_IMAGE,
      overviewEn: "Enjoy a memorable tour from Nanded with doorstep pickup, sanitized AC car, and transparent fares.",
      overviewMr: "नांदेडहून सुरक्षित, वेळेवर आणि घरपोच सेवेसह आनंददायी टूर पॅकेज.",
      pickupDrop: "Nanded Doorstep Pickup & Return Drop",
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (pkg: TourPackage) => {
    setEditingPackage(pkg);
    setFormData({ ...pkg });
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleEn?.trim() || !formData.startingPrice) {
      showFeedback("error", "कृपया पॅकेजचे नाव आणि सुरुवातीचा दर प्रविष्ट करा.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingPackage) {
        const res = await fetch("/api/admin/packages", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, slug: editingPackage.slug }),
        });
        const data = await res.json();
        if (data.success) {
          showFeedback("success", `${formData.titleMr || formData.titleEn} यशस्वीरित्या अद्ययावत झाले!`);
          setEditingPackage(null);
          await fetchPackages();
        } else {
          showFeedback("error", data.error || "अपडेट करता आले नाही.");
        }
      } else {
        const res = await fetch("/api/admin/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          showFeedback("success", `नवीन टूर पॅकेज यशस्वीरित्या जोडले गेले!`);
          setIsAddModalOpen(false);
          await fetchPackages();
        } else {
          showFeedback("error", data.error || "पॅकेज जोडता आले नाही.");
        }
      }
    } catch {
      showFeedback("error", "सर्व्हर त्रुटी आली.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!packageToDelete) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/packages?slug=${packageToDelete.slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(
          "success",
          `${packageToDelete.titleMr || packageToDelete.titleEn} पॅकेज हटवले (जुन्या बुकिंग नोंदी सुरक्षित आहेत).`
        );
        setPackageToDelete(null);
        await fetchPackages();
      } else {
        showFeedback("error", data.error || "पॅकेज हटवता आले नाही.");
      }
    } catch {
      showFeedback("error", "पॅकेज हटवताना त्रुटी आली.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory =
      selectedCategory === "All" || pkg.category === selectedCategory;
    const matchesQuery =
      pkg.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.titleMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.slug.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-bold shadow-xl border ${
            feedback.type === "success"
              ? "bg-emerald-600 text-white border-emerald-500"
              : "bg-red-600 text-white border-red-500"
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
          <button onClick={() => setFeedback(null)} className="p-1 hover:bg-white/20 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0e1d3a] to-[#142B59] rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/15">
              🚩 टूर पॅकेजेस व्यवस्थापन
            </span>
            <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              थेट वेबसाईटशी जोडलेले
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-mr tracking-tight">
            टूर पॅकेजेस व यात्रा व्यवस्थापन (Tour Packages Control)
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
            नांदेडहून शिर्डी, तुळजापूर, ज्योतिर्लिंग, माहूरगड आणि इतर सहलींचे पॅकेजेस, दर व दिवस येथून नियंत्रित करा.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={fetchPackages}
            className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all hover:scale-105 active:scale-95"
            title="रीफ्रेश करा"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-brand-saf hover:bg-brand-red text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>नवीन पॅकेज जोडा (Add Package)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="पॅकेजचे नाव शोधा (शिर्डी, तुळजापूर...)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-semibold"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {["All", "Pilgrimage", "Shaktipeeth", "Heritage", "City Tour"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-brand-saf text-white shadow-sm"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {cat === "All" ? "सर्व पॅकेजेस" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Packages Grid */}
      {loading && packages.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-gray-200">
          <div className="w-9 h-9 border-4 border-brand-saf border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <span className="text-xs font-bold text-gray-500">टूर पॅकेजेस लोड होत आहेत...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.slug}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <Image
                    src={pkg.heroImage || DEFAULT_PACKAGE_IMAGE}
                    alt={pkg.titleEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-brand-saf text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow">
                    {pkg.categoryMr || pkg.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[11px] font-bold text-gray-900 px-2.5 py-0.5 rounded-md shadow">
                    {pkg.durationMr || pkg.durationEn}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 font-mr">{pkg.titleMr}</h3>
                    <p className="text-xs text-gray-500">{pkg.titleEn}</p>
                  </div>

                  <div className="p-3 bg-brand-tint/30 rounded-2xl border border-brand-border flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[11px] text-gray-500 block">सुरुवातीचा दर:</span>
                      <span className="text-brand-saf font-black text-lg">
                        ₹{pkg.startingPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-gray-500 block">अंतर (KM):</span>
                      <span className="font-bold text-gray-800">{pkg.distanceKm} km</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2">
                    {pkg.overviewMr || pkg.overviewEn}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between gap-2">
                <button
                  onClick={() => openEditModal(pkg)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold py-2.5 px-3 rounded-xl border border-gray-200 transition-colors shadow-sm"
                >
                  <Edit className="w-3.5 h-3.5 text-brand-saf" />
                  <span>पॅकेज बदला (Edit)</span>
                </button>

                <button
                  onClick={() => setPackageToDelete(pkg)}
                  className="p-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-200"
                  title="पॅकेज हटवा"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {(editingPackage || isAddModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border-4 border-brand-saf/30">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-saf/10 text-brand-saf flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mr font-black text-xl text-gray-900">
                    {editingPackage ? "पॅकेज माहिती व दर बदला" : "नवीन टूर पॅकेज जोडा (Add Tour Package)"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    बदल जतन केल्यानंतर तात्काळ मुख्य वेबसाईटवर ग्राहकांना दिसतील.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingPackage(null);
                  setIsAddModalOpen(false);
                }}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    पॅकेज नाव (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn || ""}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    placeholder="उदा. Shirdi Sai Baba Tour"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    पॅकेज नाव (मराठी) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleMr || ""}
                    onChange={(e) => setFormData({ ...formData, titleMr: e.target.value })}
                    placeholder="उदा. शिर्डी साईबाबा दर्शन यात्रा"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    वर्गवारी (Category)
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as any })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold bg-white"
                  >
                    <option value="Pilgrimage">तीर्थक्षेत्र (Pilgrimage)</option>
                    <option value="Shaktipeeth">शक्तिपीठ (Shaktipeeth)</option>
                    <option value="Heritage">ऐतिहासिक (Heritage)</option>
                    <option value="City Tour">शहर / आंतरराज्य (City Tour)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    कालावधी (दिवस)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={formData.durationDays || 1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationDays: Number(e.target.value),
                        durationMr: `${e.target.value} दिवस`,
                        durationEn: `${e.target.value} Days`,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    सुरुवातीचा दर (₹ Starting Price) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    value={formData.startingPrice || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, startingPrice: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-extrabold text-brand-saf"
                  />
                </div>
              </div>

              {/* Package Image Manager */}
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-800">
                    पॅकेजचा मुख्य फोटो (Package Hero Image)
                  </label>
                  <span className="text-[10px] text-gray-500">तयार फोटो किंवा डिव्हाइसमधून निवडा</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {PACKAGE_IMAGE_PRESETS.map((p) => (
                    <button
                      type="button"
                      key={p.url}
                      onClick={() => setFormData({ ...formData, heroImage: p.url })}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all ${
                        formData.heroImage === p.url
                          ? "bg-brand-saf text-white border-brand-saf"
                          : "bg-white text-gray-700 border-gray-200 hover:border-brand-saf"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <label className="flex items-center justify-center gap-1.5 px-3 py-2 bg-brand-saf/10 hover:bg-brand-saf/20 text-brand-saf font-bold text-xs rounded-xl border border-brand-saf/30 cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>डिव्हाइसमधून फोटो निवडा</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    value={formData.heroImage || ""}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    placeholder="/vehicles/car-1.jpeg किंवा URL"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  सविस्तर माहिती (मराठी Overview)
                </label>
                <textarea
                  rows={3}
                  value={formData.overviewMr || ""}
                  onChange={(e) => setFormData({ ...formData, overviewMr: e.target.value })}
                  placeholder="नांदेडहून सुरू होणाऱ्या यात्रेचे थोडक्यात वर्णन..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-brand-saf outline-none text-xs"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setEditingPackage(null);
                    setIsAddModalOpen(false);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
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
                      <span>जतन करा (Save Changes)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {packageToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border-4 border-red-100">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-inner">
              <Trash2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-mr font-black text-xl text-gray-900">
                टूर पॅकेज हटवायचे आहे?
              </h3>
              <p className="text-xs text-gray-600 mt-2">
                <strong>{packageToDelete.titleMr || packageToDelete.titleEn}</strong> हे पॅकेज मुख्य वेबसाईटवरून तात्काळ काढले जाईल.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-left text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4" />
                <span>जुन्या बुकिंग नोंदी सुरक्षित राहतील:</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                या पॅकेजअंतर्गत झालेल्या मागील सर्व ग्राहकांच्या बुकिंग नोंदी डेटाबेसमध्ये सुरक्षित राहतील.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setPackageToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
              >
                रद्द करा (Cancel)
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow"
              >
                {isSubmitting ? "हटवत आहे..." : "होय, हटवा (Confirm Delete)"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

