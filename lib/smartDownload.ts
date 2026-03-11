/**
 * Smart download handler that detects the user's platform
 * and redirects to the appropriate app store
 */
export function handleSmartDownload() {
  const userAgent = navigator.userAgent || navigator.vendor;
  1;
  // Detect iOS
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    window.location.href = "https://apps.apple.com/app/beasy"; // Replace with your App Store link
    return;
  }

  // Detect Android
  if (/android/i.test(userAgent)) {
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.beasy"; // Replace with your Play Store link
    return;
  }

  // Default fallback (desktop or unknown)
  window.location.href = "/download";
}
