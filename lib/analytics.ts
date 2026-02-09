"use client";

import { initFirebaseApp } from "@/lib/firebase";

let analyticsInstance: any | null = null;
let analyticsLoading = false;
let analyticsInitAttempted = false;
let pendingEvents: Array<{ name: string; params: Record<string, any> }> = [];

// Throttle initialization retries when coming back online
let initRetryTimeout: NodeJS.Timeout | null = null;

function ensureAnalytics() {
  if (typeof window === "undefined") return;
  if (analyticsInstance || analyticsLoading) return;

  // Skip if offline
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    // Set up a listener to retry when online
    if (!analyticsInitAttempted) {
      analyticsInitAttempted = true;
      window.addEventListener("online", () => {
        if (initRetryTimeout) clearTimeout(initRetryTimeout);
        initRetryTimeout = setTimeout(() => {
          analyticsLoading = false;
          ensureAnalytics();
        }, 1000);
      });
    }
    return;
  }

  const app = initFirebaseApp();
  if (!app) return;

  const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;
  if (!measurementId) return;

  analyticsLoading = true;
  analyticsInitAttempted = true;

  import("firebase/analytics")
    .then(async ({ getAnalytics, logEvent: importedLogEvent }) => {
      try {
        analyticsInstance = getAnalytics(app);
      } catch (err) {
        // Suppress Firebase Installations errors (app-offline, etc.)
        if (process.env.NODE_ENV !== "production") {
          console.debug("Analytics initialization failed:", err);
        }
        analyticsInstance = null;
      }

      if (analyticsInstance && pendingEvents.length) {
        // flush buffered events with proper error handling
        const eventsToFlush = [...pendingEvents];
        pendingEvents = [];
        
        for (const e of eventsToFlush) {
          try {
            await importedLogEvent(analyticsInstance, e.name, e.params);
          } catch (err: any) {
            // Silently fail on event logging errors, especially installations errors
            if (process.env.NODE_ENV !== "production" && !err?.code?.includes("installations")) {
              console.debug("Failed to log buffered event:", err?.code || err);
            }
          }
        }
      }
    })
    .catch((err) => {
      if (process.env.NODE_ENV !== "production") {
        console.debug("Analytics module import failed:", err);
      }
      analyticsInstance = null;
    })
    .finally(() => {
      analyticsLoading = false;
    });
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
  ensureAnalytics();
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

  // If analytics isn't ready yet, buffer the event. Otherwise dispatch it
  // using a dynamic import to avoid importing `firebase/analytics` at module
  // load time (which can trigger Installations calls on the server).
  if (!analyticsInstance) {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[analytics-buffer]", name, fullParams);
    }
    pendingEvents.push({ name, params: fullParams });
    return;
  }

  // Wrap in setTimeout and use async/await to properly catch all errors
  setTimeout(async () => {
    try {
      const { logEvent: importedLogEvent } = await import("firebase/analytics");
      await importedLogEvent(analyticsInstance, name, fullParams);
    } catch (err: any) {
      // Suppress all analytics errors including async Installations errors
      // Common errors: installations/app-offline, permission-denied, etc.
      if (process.env.NODE_ENV !== "production" && !err?.code?.includes("installations")) {
        console.debug("Analytics event failed:", err?.code || err);
      }
    }
  }, 0);
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
