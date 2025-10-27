"use client";

import { initFirebaseApp } from "@/lib/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";

let analyticsInstance: ReturnType<typeof getAnalytics> | null = null;

function ensureAnalytics() {
  if (typeof window === "undefined") return null;
  if (analyticsInstance) return analyticsInstance;

  const app = initFirebaseApp();
  if (!app) return null;

  try {
    analyticsInstance = getAnalytics(app);
  } catch {
    analyticsInstance = null;
  }

  return analyticsInstance;
}

function getStoredUtm() {
  try {
    const raw = localStorage.getItem("__beasy_utm");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Generic event wrapper. Ensures event name is prefixed with `web-v2:` and
 * attaches common params (utm, referrer, is_direct) when available.
 */
export function trackEvent(
  eventName: string,
  params: Record<string, any> = {}
) {
  const analytics = ensureAnalytics();
  const name = eventName.startsWith("web-v2:")
    ? eventName
    : `web-v2:${eventName}`;

  const utm = getStoredUtm();
  const common = {
    utm_source: utm?.utm_source || null,
    utm_medium: utm?.utm_medium || null,
    utm_campaign: utm?.utm_campaign || null,
    referrer: (typeof document !== "undefined" && document.referrer) || null,
    is_direct: (typeof document !== "undefined" && !document.referrer) || false,
  };

  const fullParams = {
    ...common,
    ...params,
  };

  if (!analytics) {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[analytics]", name, fullParams);
    }
    return;
  }

  try {
    logEvent(analytics, name, fullParams);
  } catch (err) {
    // swallow errors to avoid breaking UI
    if (process.env.NODE_ENV !== "production")
      console.warn("logEvent failed", err);
  }
}

export function trackPageView(path: string, language?: string) {
  trackEvent("page_view", { path, language });
}

const analyticsApi = {
  trackEvent,
  trackPageView,
};

export default analyticsApi;
export function trackFAQInteraction(
  id: string,
  action: string,
  question?: string,
  category?: string
) {
  // Minimal dev-only logging so arguments are used and to make it easier to wire real analytics later.
  if (process.env.NODE_ENV !== "production") {
    console.debug("trackFAQInteraction", { id, action, question, category });
  }
}
