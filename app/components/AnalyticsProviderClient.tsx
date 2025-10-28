"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";
import { useLanguage } from "@/app/contexts/LanguageContext";

function parseUtmFromSearch(search: URLSearchParams) {
  const utm_source = search.get("utm_source");
  const utm_medium = search.get("utm_medium");
  const utm_campaign = search.get("utm_campaign");
  if (utm_source || utm_medium || utm_campaign) {
    return { utm_source, utm_medium, utm_campaign };
  }
  return null;
}

export default function AnalyticsProviderClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentLanguageCode } = useLanguage();

  // store UTM parameters the first time we see them
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = parseUtmFromSearch(params);
      if (utm) {
        localStorage.setItem("__beasy_utm", JSON.stringify(utm));
      }

      // store a simple is_direct/referrer snapshot
      const ref = document.referrer || "";
      localStorage.setItem("__beasy_referrer", ref);
      localStorage.setItem("__beasy_is_direct", JSON.stringify(!ref));
    } catch {
      // ignore
    }
  }, []);

  const searchKey = searchParams ? searchParams.toString() : "";

  // send a page_view on pathname/language change
  useEffect(() => {
    if (!pathname) return;
    try {
      trackPageView(pathname, currentLanguageCode);
    } catch {
      // ignore
    }
  }, [pathname, currentLanguageCode, searchKey]);

  return null;
}
