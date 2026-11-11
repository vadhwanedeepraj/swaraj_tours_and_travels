"use client";

import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

interface NandedMapProps {
  locale: "mr" | "en";
}

export const NandedMap: React.FC<NandedMapProps> = ({ locale }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;

      try {
        const L = await import("leaflet");

        if (!isMounted || !mapContainerRef.current) return;

        // Nanded coordinates
        const lat = 19.1383;
        const lng = 77.321;

        if (!mapInstanceRef.current) {
          const map = L.map(mapContainerRef.current, {
            center: [lat, lng],
            zoom: 14,
            scrollWheelZoom: false,
          });

          mapInstanceRef.current = map;

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(map);

          const customIcon = L.divIcon({
            className: "custom-leaflet-marker",
            html: `
              <div style="
                background-color: #D9480F;
                width: 38px;
                height: 38px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid #ffffff;
                box-shadow: 0 4px 12px rgba(0,0,0,0.35);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <span style="
                  transform: rotate(45deg);
                  color: #ffffff;
                  font-weight: 800;
                  font-size: 16px;
                  line-height: 1;
                ">🚩</span>
              </div>
            `,
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38],
          });

          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
          markerRef.current = marker;
          setMapLoaded(true);
        }

        const isMr = locale === "mr";
        const popupContent = `
          <div style="font-family: inherit; font-size: 13px; line-height: 1.4; padding: 4px;">
            <div style="color: #D9480F; font-weight: 800; font-size: 14px; margin-bottom: 2px;">
              ${isMr ? "स्वराज टुर्स अँड ट्रॅव्हल्स" : "Swaraj Tours & Travels"}
            </div>
            <div style="color: #142B59; font-weight: 700; font-size: 12px; margin-bottom: 6px;">
              ${isMr ? "नांदेड, महाराष्ट्र" : "Nanded, Maharashtra"}
            </div>
            <div style="color: #4b5563; font-size: 11px; margin-bottom: 6px;">
              📍 ${
                isMr
                  ? "रेल्वे स्टेशन जवळ, वर्कशॉप कॉर्नर, नांदेड - ४३१६०५"
                  : "Near Railway Station, Workshop Corner, Nanded - 431605"
              }
            </div>
            <a href="tel:+919325232301" style="
              display: inline-block;
              background: #D9480F;
              color: #ffffff;
              padding: 4px 10px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: bold;
              font-size: 11px;
            ">📞 9325232301</a>
          </div>
        `;

        if (markerRef.current) {
          markerRef.current.bindPopup(popupContent).openPopup();
        }
      } catch (err) {
        console.error("Leaflet map initialization error:", err);
      }
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, [locale]);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-brand-border/80 shadow-xl bg-gray-100">
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-[400px] sm:h-[460px] z-10"
        aria-label="Map showing Swaraj Tours & Travels location in Nanded"
      />

      {/* Floating Directions Action Bar */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <a
          href="https://www.google.com/maps/search/?api=1&query=19.1383,77.3210"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-800 text-xs font-bold px-3 py-2 rounded-xl shadow-lg border border-gray-200 transition-all hover:scale-105"
        >
          <Navigation className="w-3.5 h-3.5 text-brand-saf" />
          <span>{locale === "mr" ? "Google Maps दिशा" : "Get Directions"}</span>
          <ExternalLink className="w-3 h-3 text-gray-400" />
        </a>

        <a
          href="https://www.openstreetmap.org/?mlat=19.1383&mlon=77.3210#map=15/19.1383/77.3210"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-800 text-xs font-bold px-3 py-2 rounded-xl shadow-lg border border-gray-200 transition-all hover:scale-105"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>OpenStreetMap</span>
          <ExternalLink className="w-3 h-3 text-gray-400" />
        </a>
      </div>

      {/* Bottom Info Ribbon */}
      <div className="bg-brand-navy text-white px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2 z-20 relative">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-yellow shrink-0" />
          <span className="font-medium">
            {locale === "mr"
              ? "पत्ता: रेल्वे स्टेशन व वर्कशॉप कॉर्नर परिसर, नांदेड, महाराष्ट्र ४३१६०५"
              : "Address: Near Railway Station & Workshop Corner, Nanded, MH 431605"}
          </span>
        </div>
        <div className="text-gray-300 font-mono text-[11px]">
          19.1383° N, 77.3210° E
        </div>
      </div>
    </div>
  );
};
