import React from "react";
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
} from "lucide-react";

export default function AdminDashboardPage() {
  // Demo KPI metrics (Ready to link to Supabase aggregated counts)
  const metrics = [
    {
      label: "एकूण बुकींग / चौकशी (Total Inquiries)",
      value: "२४",
      icon: CalendarCheck,
      change: "+८ आज",
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      label: "प्रलंबित कोटेशन (Pending Quotations)",
      value: "६",
      icon: Clock,
      change: "तात्काळ संपर्क आवश्यक",
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      label: "सक्रिय गाड्या (Active Fleet)",
      value: "१२",
      icon: Car,
      change: "७ स्वतःच्या + ५ भागीदार",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      label: "अंदाजे महिना व्यवसाय (Est. Volume)",
      value: "₹१,४५,०००",
      icon: TrendingUp,
      change: "स्थिर वाढ",
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
  ];

  const recentBookings = [
    {
      id: "SWJ-20261110-8472",
      customer: "सचिन देशमुख (Sachin Deshmukh)",
      phone: "9822012345",
      route: "नांदेड ➔ शिर्डी (Shirdi)",
      date: "१२ नोव्हेंबर २०२६",
      pax: "५ ते ७ प्रवासी",
      vehicle: "SUV (Ertiga)",
      status: "enquiry_received",
      amount: "₹९,५००",
    },
    {
      id: "SWJ-20261109-6192",
      customer: "डॉ. राहुल पाटील (Dr. Rahul Patil)",
      phone: "9423198765",
      route: "नांदेड ➔ हैदराबाद विमानतळ (RGIA)",
      date: "१४ नोव्हेंबर २०२६",
      pax: "१ ते ४ प्रवासी",
      vehicle: "Sedan (Dzire)",
      status: "quotation_sent",
      amount: "₹६,०००",
    },
    {
      id: "SWJ-20261108-4120",
      customer: "अमित जोशी (Amit Joshi)",
      phone: "9970112233",
      route: "नांदेड ➔ तुळजापूर (Tuljapur)",
      date: "१५ नोव्हेंबर २०२६",
      pax: "६ प्रवासी",
      vehicle: "Ertiga",
      status: "confirmed",
      amount: "₹७,२००",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 font-mr">
          कार्यालयीन डॅशबोर्ड (Swaraj Operations)
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          नांदेड मुख्यालयातील दैनिक बुकिंग्स, कोटेशन्स आणि वाहनांची स्थिती.
        </p>
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
                <div className="text-2xl font-black text-gray-900">{m.value}</div>
                <div className="text-[11px] font-semibold text-gray-500 mt-1">
                  {m.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings Queue */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 font-mr">
              नुकत्याच आलेल्या प्रवासाच्या चौकशा (Recent Inquiries)
            </h2>
            <p className="text-xs text-gray-500">
              ग्राहक कोटेशन पाठवण्यासाठी किंवा बुकिंग निश्चित करण्यासाठी खालील बटण वापरा.
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-brand-saf hover:underline"
          >
            सर्व बुकिंग्स पहा →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">बुकिंग नंबर</th>
                <th className="py-3 px-4">ग्राहक</th>
                <th className="py-3 px-4">प्रवास मार्ग</th>
                <th className="py-3 px-4">तारीख व प्रवासी</th>
                <th className="py-3 px-4">गाडी</th>
                <th className="py-3 px-4">स्थिती (Status)</th>
                <th className="py-3 px-4 text-right">कृती (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                    {b.id}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-800">
                    <div>{b.customer}</div>
                    <div className="text-gray-400 font-mono text-[11px]">{b.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-900">
                    {b.route}
                  </td>
                  <td className="py-3.5 px-4">
                    <div>{b.date}</div>
                    <div className="text-gray-400 text-[11px]">{b.pax}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-800">
                    {b.vehicle}
                  </td>
                  <td className="py-3.5 px-4">
                    {b.status === "enquiry_received" && (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold text-[10px]">
                        <AlertCircle className="w-3 h-3" /> नवीन चौकशी
                      </span>
                    )}
                    {b.status === "quotation_sent" && (
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-bold text-[10px]">
                        <Clock className="w-3 h-3" /> कोटेशन पाठवले
                      </span>
                    )}
                    {b.status === "confirmed" && (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold text-[10px]">
                        <CheckCircle className="w-3 h-3" /> निश्चित (Confirmed)
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`https://wa.me/91${b.phone}?text=Hello%20${encodeURIComponent(b.customer)}%2C%20regarding%20your%20Swaraj%20Tours%20booking%20enquiry%20${b.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        title="WhatsApp Chat"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`tel:${b.phone}`}
                        className="p-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                        title="Direct Call"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

