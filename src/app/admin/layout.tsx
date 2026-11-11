"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Car,
  Compass,
  Bell,
  Shield,
  ArrowLeft,
  LogOut,
  Sparkles,
  MessageSquare,
  Phone,
  X,
  CheckCircle2,
} from "lucide-react";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const adminNav = [
    { href: "/admin", label: "डॅशबोर्ड (Dashboard)", icon: LayoutDashboard },
    { href: "/admin/vehicles", label: "गाड्यांची नोंद (Fleet)", icon: Car },
    { href: "/admin/packages", label: "टूर पॅकेजेस (Tour Packages)", icon: Compass },
    { href: "/admin/bookings", label: "बुकिंग व्यवस्थापन (Bookings)", icon: CalendarCheck },
  ];

  // Fetch pending booking enquiries for Notification Center
  const fetchRecentEnquiries = async () => {
    try {
      const res = await fetch("/api/admin/bookings", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.bookings)) {
        const pending = data.bookings.filter(
          (b: any) => b.status === "enquiry_received"
        );
        setNotifications(pending);
      }
    } catch (e) {
      // Ignore
    }
  };

  useEffect(() => {
    fetchRecentEnquiries();
    const interval = setInterval(fetchRecentEnquiries, 25000); // 25s auto-refresh
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = () => {
    try {
      localStorage.removeItem("swaraj_admin_auth");
      document.cookie = "swaraj_admin_auth=; path=/; max-age=0";
      window.location.reload();
    } catch {
      // Ignore
    }
  };

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#142B59] text-white flex flex-col justify-between shrink-0 shadow-lg">
          <div>
            {/* Admin Header with Official Logo */}
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-11 rounded-xl overflow-hidden bg-white p-0.5 shadow-md border border-white/20 shrink-0">
                  <Image
                    src="/branding/logo.png"
                    alt="Swaraj Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-brand-yellow font-extrabold text-sm leading-tight">
                    स्वराज ग्रुप ॲडमिन
                  </div>
                  <div className="text-[11px] text-gray-300">
                    Swaraj Tours & Travels
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-amber-200/90 font-mono mt-2">
                Founders: Shivraj & Deepraj Vadhwane
              </div>
              <div className="mt-2 text-[10px] bg-brand-saf/30 text-amber-200 px-2 py-0.5 rounded font-mono font-bold inline-block">
                👑 मालक अधिकृत (Owner Mode)
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-3 space-y-1">
              {adminNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-brand-saf text-white shadow font-bold"
                        : "text-gray-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-brand-yellow" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 text-brand-saf2" />
              <span>मुख्य वेबसाइटवर जा (Back)</span>
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 text-xs font-bold text-red-300 hover:text-red-100 hover:bg-red-950/40 p-2 rounded-lg transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>बाहेर पडा (Sign Out)</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-x-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between relative z-30">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <span>कार्यालयीन व्यवस्थापन प्रणाली (Control Center)</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                  title="नवीन बुकिंग सूचना (Notifications)"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-pulse">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown Drawer */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 animate-in fade-in slide-in-from-top-2 z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-brand-saf" />
                        <span className="font-bold text-xs text-gray-900 font-mr">
                          नवीन बुकिंग विनंत्या ({notifications.length})
                        </span>
                      </div>
                      <button
                        onClick={() => setIsNotifOpen(false)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-2 divide-y divide-gray-100 max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="py-6 text-center text-xs text-gray-400">
                          कोणतीही नवीन चौकशी प्रलंबित नाही.
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div key={n.id} className="py-3 space-y-1.5">
                            <div className="flex justify-between items-baseline">
                              <span className="font-bold text-xs text-gray-900 font-mr">
                                {n.customerName}
                              </span>
                              <span className="text-[10px] font-mono text-gray-400">
                                {n.travelDate}
                              </span>
                            </div>
                            <div className="text-xs text-brand-saf font-semibold">
                              {n.pickup} ➔ {n.destination}
                            </div>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[11px] text-gray-500 font-mono">
                                {n.mobile}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <a
                                  href={`https://wa.me/91${n.mobile}?text=*🚩 स्वराज टुर्स अँड ट्रॅव्हल्स*%0Aनमस्कार ${encodeURIComponent(n.customerName)}, आपल्या ${encodeURIComponent(n.destination)} प्रवासाच्या चौकशीसाठी संपर्क साधत आहोत.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-[11px] font-bold"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>
                                <a
                                  href={`tel:${n.mobile}`}
                                  className="p-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                                >
                                  <Phone className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-100 text-center">
                      <Link
                        href="/admin/bookings"
                        onClick={() => setIsNotifOpen(false)}
                        className="text-xs font-bold text-brand-saf hover:underline"
                      >
                        सर्व बुकिंग व्यवस्थापन पहा →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ऑनलाइन २४/७</span>
              </div>

              <button
                onClick={handleSignOut}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 transition-colors"
                title="Lock admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>बाहेर पडा (Sign Out)</span>
              </button>
            </div>
          </header>

          <main className="p-6 md:p-8 flex-1">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
