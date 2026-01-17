import type { Metadata } from "next";
import React, { Suspense } from "react";
import TelegramChatButton from "@/app/components/TelegramChatButton";
import AnalyticsProviderClient from "@/app/components/AnalyticsProviderClient";
import { LanguageProvider } from "../contexts/LanguageContext";
import { SiteFooter, SiteNav } from "../components/layout";

export const metadata: Metadata = {
  title: "bEasy Cambodia: Cleaning & Pest",
  description: "Best cleaning services in Cambodia!",
  icons: {
    icon: [
      { url: "/images/Browser_logo.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/images/Browser_logo.png",
    shortcut: "/images/Browser_logo.png",
  },
  metadataBase: new URL("https://beasy.info/"),
  openGraph: {
    type: "website",
    siteName: "Beasy",
    locale: "km_KH",
    url: "https://beasy.info/",
    title: "bEasy Cambodia: Cleaning & Pest",
    description: "Best cleaning services in Cambodia!",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "km" }, { lang: "zh" }];
}

interface LangLayoutProps {
  children: React.ReactNode;
  // `params` can be a plain object or a Promise resolving to the object
  // depending on how Next infers types for dynamic layouts. Accept both to
  // satisfy the compiler's union mismatch.
  params: { lang: string } | Promise<{ lang: string }>;
}

// The layout may receive `params` typed as a Promise; await it to satisfy
// Next.js's requirement to resolve dynamic params before accessing properties.
export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  // Awaiting works for both a plain object and a Promise of the object.
  const resolvedParams = await params;
  const lang = (resolvedParams as any)?.lang ?? "en";
  const fontWrapperClass = lang === "km" ? "font-kantumruy" : "font-inter";

  return (
    <LanguageProvider>
      <div className={fontWrapperClass}>
        <Suspense fallback={null}>
          <SiteNav />
        </Suspense>
        <>
          <Suspense fallback={null}>{children}</Suspense>
          {/* Analytics provider records UTM/referrer and emits page_view events */}
          <Suspense fallback={null}>
            <AnalyticsProviderClient />
          </Suspense>
          {/* Telegram chat widget (client-only) */}
          <TelegramChatButton />
        </>
        <Suspense fallback={null}>
          <SiteFooter />
        </Suspense>
      </div>
    </LanguageProvider>
  );
}

// add
