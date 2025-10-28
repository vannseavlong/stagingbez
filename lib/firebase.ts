// Lightweight Firebase app initializer that reads config from environment variables.
// Keeps initialization on the client only to avoid server-side Firebase analytics calls.
import { initializeApp, getApps, getApp } from "firebase/app";

function getConfigFromEnv() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
  };
}

export function initFirebaseApp() {
  // Only initialize on the client
  if (typeof window === "undefined") return null;

  const config = getConfigFromEnv();

  // Basic validation: ensure an apiKey is present
  if (!config.apiKey) {
    // Avoid throwing — simply return null and analytics will be a no-op.
    // This makes it easy to run locally without env vars.
    return null;
  }

  if (!getApps().length) {
    try {
      initializeApp(config);
    } catch {
      // ignore initialization errors in edge cases
    }
  }

  try {
    return getApp();
  } catch {
    return null;
  }
}

export function getFirebaseConfigFromEnv() {
  return getConfigFromEnv();
}
