"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Car,
  Users2,
  Map,
  Compass,
  Star,
  DollarSign,
  Shield,
  ArrowLeft,
  LogOut,
  Sparkles,
} from "lucide-react";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const adminNav = [
    { href: "/admin", label: "डॅशबोर्ड (Dashboard)", icon: LayoutDashboard },
    { href: "/admin/vehicles", label: "गाड्यांची नोंद (Fleet)", icon: Car },
    { href: "/admin/bookings", label: "बुकिंग व्यवस्थापन (Bookings)", icon: CalendarCheck },
  ];

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
            {/* Admin Header */}
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center gap-2 text-brand-yellow font-extrabold text-base">
                <Shield className="w-5 h-5 text-brand-saf2" />
                <span>स्वराज ॲडमिन पॅनेल</span>
              </div>
              <div className="text-xs text-gray-300 mt-1">
                Swaraj Tours & Travels · Nanded
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
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <span>कार्यालयीन व्यवस्थापन प्रणाली (Control Center)</span>
            </div>
            <div className="flex items-center gap-4">
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
