import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ParallaxProviderClient from "./components/ParallaxProviderClient";
import ImageProtection from "./components/ImageProtection";
// import { SiteNav, SiteFooter } from "./components/layout";
// import { LanguageProvider } from "./contexts/LanguageContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional but useful
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bEasy Cambodia: Cleaning & Pest",
  description:
    "Cleaning and pest control services in Phnom Penh and across Cambodia.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/images/Browser_logo.png?v=2",
    },
    { rel: "icon", type: "image/webp", url: "/images/Browser_logo.webp?v=2" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/images/Browser_logo.png?v=2",
    },
  ],
  openGraph: {
    title: "bEasy Cambodia — Cleaning & Pest Services",
    description:
      "Reliable cleaning and pest control services in Phnom Penh. Book online or contact us.",
    url: "https://beasy.info",
    siteName: "bEasy Cambodia",
    images: [
      {
        url: "https://beasy.info/images/Browser_logo.png?v=2",
        alt: "bEasy Cambodia logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "bEasy Cambodia — Cleaning & Pest Services",
    description:
      "Reliable cleaning and pest control services in Phnom Penh. Book online or contact us.",
    images: ["https://beasy.info/images/Browser_logo.png?v=2"],
  },
  alternates: {
    canonical: "https://beasy.info",
    languages: {
      "en-US": "/en",
      km: "/km",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "bEasy Cambodia",
    description:
      "Cleaning and pest control services in Phnom Penh and across Cambodia.",
    url: "https://beasy.info",
    telephone: "+85512345678",
    address: {
      "@type": "PostalAddress",
      streetAddress: "#C17, Sangkat Srah Chak, Khan Daun Penh",
      addressLocality: "Phnom Penh",
      addressCountry: "KH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "11.5564",
      longitude: "104.9282",
    },
    openingHours: "Mo-Su 08:00-20:00",
    image: ["https://beasy.info/images/Browser_logo.png?v=2"],
    logo: "https://beasy.info/images/Browser_logo.png?v=2",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased font-inter`}
        suppressHydrationWarning
      >
        <ImageProtection />
        <ParallaxProviderClient>{children}</ParallaxProviderClient>
      </body>
    </html>
  );
}
