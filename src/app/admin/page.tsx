"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  Car,
  TrendingUp,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Eye,
  Plus,
  RefreshCw,
  Compass,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, vehiclesRes, packagesRes] = await Promise.all([
        fetch("/api/admin/bookings", { cache: "no-store" }).then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/vehicles", { cache: "no-store" }).then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/packages", { cache: "no-store" }).then((r) => r.json()).catch(() => ({})),
      ]);

      if (bookingsRes.success && Array.isArray(bookingsRes.bookings)) {
        setBookings(bookingsRes.bookings);
      }
      if (vehiclesRes.success && Array.isArray(vehiclesRes.vehicles)) {
        setVehicles(vehiclesRes.vehicles);
      }
      if (packagesRes.success && Array.isArray(packagesRes.packages)) {
        setPackages(packagesRes.packages);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalInquiries = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "enquiry_received").length;
  const activeFleetCount = vehicles.length;
  const totalPackagesCount = packages.length;

  const metrics = [
    {
      label: "एकूण चौकशी (Total Inquiries)",
      value: totalInquiries.toString(),
      icon: CalendarCheck,
      change: `${pendingCount} नवीन चौकशा प्रलंबित`,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      label: "प्रलंबित कोटेशन (Pending)",
      value: pendingCount.toString(),
      icon: Clock,
      change: "तात्काळ संपर्क आवश्यक",
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      label: "सक्रिय गाड्या (Active Fleet)",
      value: activeFleetCount.toString(),
      icon: Car,
      change: "थेट उपलब्ध फ्लीट",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      label: "टूर पॅकेजेस (Active Packages)",
      value: totalPackagesCount.toString(),
      icon: Compass,
      change: "तीर्थक्षेत्र व ऐतिहासिक यात्रा",
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
  ];

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-tint px-3 py-1 rounded-full font-mr">
              👑 मुख्य नियंत्रण केंद्र
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              थेट डेटाबेस जोडणी (Live Synced)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 font-mr">
            कार्यालयीन डॅशबोर्ड (Swaraj Operations)
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            नांदेड मुख्यालयातील दैनिक बुकिंग्स, कोटेशन्स आणि वाहनांची स्थिती.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="p-3 bg-white hover:bg-gray-100 border border-gray-200 rounded-2xl text-gray-700 shadow-sm transition-all"
            title="रीफ्रेश करा"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-brand-saf" : ""}`} />
          </button>

          <Link
            href="/admin/vehicles"
            className="inline-flex items-center gap-2 bg-brand-saf hover:bg-brand-red text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>गाडी जोडा</span>
          </Link>

          <Link
            href="/admin/packages"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>पॅकेज जोडा</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className={`p-5 rounded-2xl border ${m.color} bg-white shadow-sm flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-600">{m.label}</span>
                <div className="p-2 rounded-xl bg-gray-50">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-gray-900">{m.value}</div>
                <div className="text-[11px] font-semibold text-gray-500 mt-1">
                  {m.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings Queue */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 font-mr flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-brand-saf" />
              <span>नुकत्याच आलेल्या प्रवासाच्या चौकशा (Recent Inquiries)</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              ग्राहकांना तात्काळ WhatsApp वर कोटेशन पाठवण्यासाठी उजवीकडील बटण वापरा.
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-brand-saf hover:underline inline-flex items-center gap-1"
          >
            <span>सर्व बुकिंग्स पहा</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">बुकिंग नंबर</th>
                <th className="py-3 px-4">ग्राहक व संपर्क</th>
                <th className="py-3 px-4">प्रवास मार्ग</th>
                <th className="py-3 px-4">तारीख व प्रवासी</th>
                <th className="py-3 px-4">गाडी पसंती</th>
                <th className="py-3 px-4">स्थिती (Status)</th>
                <th className="py-3 px-4 text-right">त्वरित संपर्क (Contact)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    कोणतीही चौकशी प्रलंबित नाही.
                  </td>
                </tr>
              ) : (
                recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                      {b.bookingNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900 font-mr">{b.customerName}</div>
                      <div className="text-gray-400 font-mono text-[11px]">{b.mobile}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      {b.pickup} ➔ {b.destination}
                    </td>
                    <td className="py-3.5 px-4">
                      <div>{b.travelDate}</div>
                      <div className="text-gray-400 text-[11px]">{b.passengers} प्रवासी</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">
                      {b.vehiclePreference}
                    </td>
                    <td className="py-3.5 px-4">
                      {b.status === "enquiry_received" && (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-bold text-[10px]">
                          <AlertCircle className="w-3 h-3" /> नवीन चौकशी
                        </span>
                      )}
                      {b.status === "quotation_sent" && (
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full font-bold text-[10px]">
                          <Clock className="w-3 h-3" /> कोटेशन पाठवले
                        </span>
                      )}
                      {b.status === "confirmed" && (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-bold text-[10px]">
                          <CheckCircle className="w-3 h-3" /> निश्चित (Confirmed)
                        </span>
                      )}
                      {b.status === "completed" && (
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 border border-gray-300 px-2.5 py-1 rounded-full font-bold text-[10px]">
                          पूर्ण प्रवास
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/91${b.mobile}?text=*🚩 स्वराज टुर्स अँड ट्रॅव्हल्स - कोटेशन*%0Aनमस्कार ${encodeURIComponent(b.customerName)},%0Aआपल्या ${encodeURIComponent(b.pickup)} ते ${encodeURIComponent(b.destination)} प्रवासाच्या चौकशीसाठी संपर्क साधत आहोत.%0Aगाडी: ${encodeURIComponent(b.vehiclePreference)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] transition-colors"
                          title="WhatsApp चॅट सुरू करा"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href={`tel:${b.mobile}`}
                          className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                          title="कॉल करा"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
