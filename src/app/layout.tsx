import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Swaraj Tours & Travels (स्वराज टुर्स अँड ट्रॅव्हल्स) | Car Rental & Outstation Cabs in Nanded",
  description:
    "Leading car rental, taxi service, and tour package provider in Nanded, Maharashtra. Local trips, outstation, Shirdi, Tuljapur, Sambhajinagar, wedding cars and airport transfers. Call 9325232301.",
  keywords: [
    "Swaraj Tours and Travels",
    "Swaraj Travels Nanded",
    "Car Rental in Nanded",
    "Taxi Service Nanded",
    "Nanded to Shirdi Cab",
    "Nanded to Hyderabad Cab",
    "Nanded to Pune Taxi",
    "Wedding Cars Nanded",
    "स्वराज टुर्स अँड ट्रॅव्हल्स नांदेड",
    "नांदेड कार भाडे",
  ],
  authors: [{ name: "Swaraj Tours & Travels" }],
  creator: "Swaraj Tours & Travels",
  publisher: "Swaraj Tours & Travels",
  metadataBase: new URL("https://swarajtravels.in"),
  openGraph: {
    title: "Swaraj Tours & Travels – प्रवास सुखकर... आमची जबाबदारी...!",
    description:
      "Reliable car rental and tour packages from Nanded. 24/7 service, sanitized cars, experienced drivers. Call 9325232301.",
    url: "https://swarajtravels.in",
    siteName: "Swaraj Tours & Travels",
    locale: "mr_IN",
    type: "website",
    images: [
      {
        url: "/branding/banner.jpeg",
        width: 1200,
        height: 630,
        alt: "Swaraj Tours and Travels Nanded Banner",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/branding/logo.png",
    shortcut: "/branding/logo.png",
    apple: "/branding/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Swaraj Tours & Travels",
    "alternateName": "स्वराज टुर्स अँड ट्रॅव्हल्स",
    "logo": "https://swarajtravels.in/branding/logo.png",
    "telephone": "+919325232301",
    "url": "https://swarajtravels.in",
    "image": "https://swarajtravels.in/branding/banner.jpeg",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nanded",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.1383",
      "longitude": "77.3210"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <html lang="mr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-brand-saf selection:text-white">
        {children}
      </body>
    </html>
  );
}

