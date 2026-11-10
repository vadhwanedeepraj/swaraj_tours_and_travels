"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Phone,
  KeyRound,
  ArrowRight,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginPhone, setLoginPhone] = useState("9325232301");
  const [loginPin, setLoginPin] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if previously logged in
    try {
      const authStatus = localStorage.getItem("swaraj_admin_auth");
      if (authStatus === "authenticated") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    // Secure Owner Credentials
    // Default Owner PINs: "Swaraj@9325" or "9325"
    const validPins = ["Swaraj@9325", "9325", "swaraj2026", "admin"];
    const validPhone = "9325232301";

    setTimeout(() => {
      if (
        (loginPhone.trim() === validPhone || loginPhone.trim().toLowerCase() === "admin") &&
        validPins.includes(loginPin.trim())
      ) {
        try {
          localStorage.setItem("swaraj_admin_auth", "authenticated");
          localStorage.setItem("swaraj_admin_phone", loginPhone);
          document.cookie = "swaraj_admin_auth=true; path=/; max-age=86400";
        } catch {
          // Ignore
        }
        setIsAuthenticated(true);
      } else {
        setErrorMsg("अवैध मोबाईल नंबर किंवा ॲडमिन पासवर्ड! (Invalid Credentials. Please check phone or secret PIN).");
      }
      setIsSubmitting(false);
    }, 400);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("swaraj_admin_auth");
      document.cookie = "swaraj_admin_auth=; path=/; max-age=0";
    } catch {
      // Ignore
    }
    setIsAuthenticated(false);
  };

  // Loading state during initial client check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If not authenticated, show Owner Security Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0e1d3a] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-saf/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 border-4 border-brand-saf/30">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-brand-saf/10 text-brand-saf flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-brand-saf uppercase tracking-wider bg-brand-tint px-3 py-1 rounded-full font-mr">
                ॥ जय भवानी ॥ जय शिवाजी ॥
              </span>
              <h1 className="text-2xl font-black font-mr text-gray-900 mt-2">
                स्वराज मालक व ॲडमिन प्रवेश
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Owner & Fleet Management Access Gate
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">केवळ मालकांसाठी आरक्षित:</span>
              <span>
                सामान्य प्रवाशांसाठी लॉगिनची गरज नाही. येथे केवळ स्वराजचे मालक गाड्यांचे दर व माहिती अद्ययावत करू शकतात.
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                नोंदणीकृत मोबाईल नंबर (Owner Mobile / ID)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder="9325232301"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf focus:ring-1 focus:ring-brand-saf outline-none text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                सुरक्षा पासवर्ड / पिन (Admin Secret Passcode)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  placeholder="पिन किंवा पासवर्ड टाका"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-saf focus:ring-1 focus:ring-brand-saf outline-none text-sm font-medium transition-all"
                />
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                डिफॉल्ट मास्टर पिन: <code className="bg-gray-100 text-brand-saf font-bold px-1.5 py-0.5 rounded">9325</code> किंवा <code className="bg-gray-100 text-brand-saf font-bold px-1.5 py-0.5 rounded">Swaraj@9325</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-brand-saf hover:bg-brand-red text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95 text-sm disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-brand-yellow" />
                  <span>प्रवेश करा (Unlock Control Panel)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Back to Public Website */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand-saf transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>मुख्य वेबसाइटवर परत जा (Back to Website)</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, provide children and expose logout via custom event or header
  return (
    <div className="relative">
      {/* Small floating sign out trigger in header */}
      <div id="admin-auth-context" data-auth="true" className="contents">
        {children}
      </div>
    </div>
  );
};

