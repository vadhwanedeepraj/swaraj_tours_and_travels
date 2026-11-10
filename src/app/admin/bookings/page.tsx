"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  AlertTriangle,
  Car,
  User,
  ArrowRight,
} from "lucide-react";

interface BookingRecord {
  id: string;
  bookingNumber: string;
  customerName: string;
  mobile: string;
  pickup: string;
  destination: string;
  travelDate: string;
  passengers: string;
  vehiclePreference: string;
  serviceType: string;
  quotedAmount: number;
  status: "enquiry_received" | "quotation_sent" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

export default function BookingsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: "1",
      bookingNumber: "SWJ-20261110-8472",
      customerName: "सचिन देशमुख (Sachin Deshmukh)",
      mobile: "9822012345",
      pickup: "नांदेड रेल्वे स्थानक",
      destination: "शिर्डी (Shirdi Sai Mandir)",
      travelDate: "2026-11-12",
      passengers: "5–7",
      vehiclePreference: "SUV (Maruti Ertiga)",
      serviceType: "Outstation Trips",
      quotedAmount: 9500,
      status: "enquiry_received",
      notes: "कुटुंबासह प्रवास, सकाळी ६ वाजता पिकअप हवा आहे.",
    },
    {
      id: "2",
      bookingNumber: "SWJ-20261109-6192",
      customerName: "डॉ. राहुल पाटील (Dr. Rahul Patil)",
      mobile: "9423198765",
      pickup: "शिवाजी नगर, नांदेड",
      destination: "हैदराबाद आंतरराष्ट्रीय विमानतळ (RGIA)",
      travelDate: "2026-11-14",
      passengers: "1–4",
      vehiclePreference: "Sedan (Swift Dzire)",
      serviceType: "Airport Transfer",
      quotedAmount: 6000,
      status: "quotation_sent",
      notes: "विमान दुपारी ४ वाजता आहे.",
    },
    {
      id: "3",
      bookingNumber: "SWJ-20261108-4120",
      customerName: "अमित जोशी (Amit Joshi)",
      mobile: "9970112233",
      pickup: "तरोडा नाका, नांदेड",
      destination: "तुळजापूर भवानी मंदिर (Round Trip)",
      travelDate: "2026-11-15",
      passengers: "6",
      vehiclePreference: "SUV (Maruti Ertiga)",
      serviceType: "Pilgrimage / Tourism",
      quotedAmount: 7200,
      status: "confirmed",
      notes: "अ‍ॅडव्हान्स ₹२,००० जमा झाला.",
    },
    {
      id: "4",
      bookingNumber: "SWJ-20261105-1104",
      customerName: "राजेश कुलकर्णी (Rajesh Kulkarni)",
      mobile: "9850123456",
      pickup: "नांदेड",
      destination: "पुणे (Pune)",
      travelDate: "2026-11-06",
      passengers: "4",
      vehiclePreference: "Sedan (Etios)",
      serviceType: "One-Way Drop",
      quotedAmount: 8000,
      status: "completed",
    },
  ]);

  const updateBookingStatus = (id: string, newStatus: BookingRecord["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.mobile.includes(searchTerm);
    const matchesStatus =
      selectedStatus === "all" ? true : b.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 font-mr">
            बुकिंग व्यवस्थापन (Bookings & Enquiries)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            ग्राहकांच्या प्रवासाच्या मागण्या तपासा, कोटेशन पाठवा आणि गाड्या नियुक्त करा.
          </p>
        </div>
        <div className="text-xs font-bold bg-white px-4 py-2 rounded-xl border border-gray-200 text-gray-700 shadow-sm">
          एकूण नोंदी: <span className="text-brand-saf">{filteredBookings.length}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="नाव, मोबाईल, शहर किंवा बुकिंग आयडी शोधा..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-saf"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-saf"
          >
            <option value="all">सर्व स्थिती (All Status)</option>
            <option value="enquiry_received">नवीन चौकशी (Enquiry Received)</option>
            <option value="quotation_sent">कोटेशन पाठवले (Quotation Sent)</option>
            <option value="confirmed">निश्चित (Confirmed)</option>
            <option value="completed">पूर्ण प्रवास (Completed)</option>
            <option value="cancelled">रद्द (Cancelled)</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">बुकिंग नंबर व ग्राहक</th>
                <th className="py-3 px-4">पिकअप व गंतव्य ठिकाण</th>
                <th className="py-3 px-4">तारीख व प्रवासी</th>
                <th className="py-3 px-4">गाडी पसंती</th>
                <th className="py-3 px-4">अंदाजे रक्कम</th>
                <th className="py-3 px-4">स्थिती (Status)</th>
                <th className="py-3 px-4 text-right">व्यवस्थापन (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    कोणतीही बुकिंग आढळली नाही.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Booking Number & Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-gray-900">{b.bookingNumber}</div>
                      <div className="font-semibold text-gray-800 text-xs mt-0.5">{b.customerName}</div>
                      <div className="text-[11px] text-gray-400 font-mono">{b.mobile}</div>
                    </td>

                    {/* Route */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900">{b.destination}</div>
                      <div className="text-[11px] text-gray-500">पिकअप: {b.pickup}</div>
                      {b.notes && (
                        <div className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded mt-1 max-w-xs truncate">
                          टीप: {b.notes}
                        </div>
                      )}
                    </td>

                    {/* Date & Pax */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-800">{b.travelDate}</div>
                      <div className="text-[11px] text-gray-400">{b.passengers} प्रवासी</div>
                    </td>

                    {/* Vehicle */}
                    <td className="py-3.5 px-4 font-medium text-gray-800">
                      <div>{b.vehiclePreference}</div>
                      <div className="text-[11px] text-brand-saf">{b.serviceType}</div>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      ₹{b.quotedAmount.toLocaleString("en-IN")}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={b.status}
                        onChange={(e) =>
                          updateBookingStatus(b.id, e.target.value as BookingRecord["status"])
                        }
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border focus:outline-none ${
                          b.status === "enquiry_received"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : b.status === "quotation_sent"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : b.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : b.status === "completed"
                            ? "bg-gray-100 text-gray-700 border-gray-300"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                      >
                        <option value="enquiry_received">नवीन चौकशी</option>
                        <option value="quotation_sent">कोटेशन पाठवले</option>
                        <option value="confirmed">निश्चित (Confirmed)</option>
                        <option value="completed">पूर्ण झाले (Completed)</option>
                        <option value="cancelled">रद्द (Cancelled)</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/91${b.mobile}?text=*🚩 स्वराज टुर्स अँड ट्रॅव्हल्स - कोटेशन माहिती*%0Aनमस्कार ${encodeURIComponent(b.customerName)},%0Aआपल्या ${encodeURIComponent(b.destination)} प्रवासासाठी अंदाज: ₹${b.quotedAmount}.%0Aगाडी: ${encodeURIComponent(b.vehiclePreference)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          title="WhatsApp वर दर पाठवा"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:${b.mobile}`}
                          className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
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

