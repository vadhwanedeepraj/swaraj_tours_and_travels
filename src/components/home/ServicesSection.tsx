import React from "react";
import {
  Compass,
  MapPin,
  Repeat,
  Plane,
  HeartHandshake,
  Users,
  Palmtree,
  Camera,
  Briefcase,
  Sparkles,
} from "lucide-react";

interface ServicesSectionProps {
  dict: {
    services: {
      title: string;
      subtitle: string;
      items: {
        local: string;
        outstation: string;
        roundTrip: string;
        airport: string;
        wedding: string;
        family: string;
        picnic: string;
        tourism: string;
        corporate: string;
        custom: string;
      };
    };
  };
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ dict }) => {
  const servicesList = [
    {
      title: dict.services.items.local,
      desc: "नांदेड शहरांतर्गत खरेदी, मिटिंग किंवा स्थानिक फिरण्यासाठी तासानुसार व प्रति किलोमीटर कार.",
      icon: MapPin,
    },
    {
      title: dict.services.items.outstation,
      desc: "पुणे, मुंबई, छत्रपती संभाजीनगर, हैदराबाद, नागपूर इत्यादी शहरांसाठी सुरक्षित प्रवास.",
      icon: Compass,
    },
    {
      title: dict.services.items.roundTrip,
      desc: "किफायतशीर वन-वे ड्रॉप किंवा संपूर्ण राउंड-ट्रिप सुविधा योग्य दरामध्ये उपलब्ध.",
      icon: Repeat,
    },
    {
      title: dict.services.items.airport,
      desc: "नांदेड, हैदराबाद, छत्रपती संभाजीनगर विमानतळ व रेल्वे स्टेशन वेळेवर पिकअप व ड्रॉप.",
      icon: Plane,
    },
    {
      title: dict.services.items.wedding,
      desc: "लग्न सोहळे व वरातीसाठी सजवलेल्या लक्झरी गाड्या आणि पाहुण्यांच्या वाहतुकीसाठी ताफा.",
      icon: HeartHandshake,
    },
    {
      title: dict.services.items.family,
      desc: "कुटुंबासह आरामदायी आणि सुरक्षित सुट्टी घालवण्यासाठी स्पेशल एसी गाड्या.",
      icon: Users,
    },
    {
      title: dict.services.items.picnic,
      desc: "सहकुटुंब किंवा मित्रांसोबत धबधबे, धरणे व निसर्गरम्य पर्यटन स्थळांसाठी टूर पॅकेजेस.",
      icon: Palmtree,
    },
    {
      title: dict.services.items.tourism,
      desc: "माहूरगड, परळी वैजनाथ, औंढा नागनाथ, शिर्डी व इतर तीर्थक्षेत्र दर्शनासाठी विशेष नियोजन.",
      icon: Camera,
    },
    {
      title: dict.services.items.corporate,
      desc: "कंपन्या, व्यावसायिक भेटी आणि व्हीआयपी पाहुण्यांसाठी दर्जेदार एक्झिक्युटिव्ह टॅक्सी सेवा.",
      icon: Briefcase,
    },
    {
      title: dict.services.items.custom,
      desc: "तुमच्या आवडीनुसार आणि वेळेनुसार बनवलेली संपूर्णपणे सानुकूलित सहल योजना.",
      icon: Sparkles,
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-brand-saf uppercase tracking-wider bg-brand-saf/10 px-3.5 py-1.5 rounded-full">
            Our Core Offerings
          </span>
          <h2 className="mt-3 font-mr font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
            {dict.services.title}
          </h2>
          <div className="w-16 h-1 bg-brand-saf2 mx-auto my-3 rounded-full" />
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            {dict.services.subtitle}
          </p>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-brand-tint/30 hover:bg-white rounded-2xl p-5 border border-brand-border/70 hover:border-brand-saf hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-saf to-brand-saf2 opacity-80 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-brand-border/60 flex items-center justify-center text-brand-saf group-hover:bg-brand-saf group-hover:text-white transition-colors mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-mr font-bold text-base text-gray-900 mb-2 group-hover:text-brand-saf transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-saf">
                  <span>कोटेशन मिळवा</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

