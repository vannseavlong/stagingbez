"use client";

import { useTranslate } from "@/app/hooks/useTranslate";
// import { useLanguage } from "@/app/contexts/LanguageContext";

interface DownloadAppButtonProps {
  className?: string;
  onClick?: () => void;
  text?: string;
  hoverText?: string;
}

export default function DownloadAppButton({
  className = "",
  onClick,
  text,
  hoverText,
}: DownloadAppButtonProps) {
  const { t } = useTranslate();

  // Use translation if text not provided
  const displayText = text || t("navbar.downloadButton.text", "Download App");
  const displayHoverText =
    hoverText || t("navbar.downloadButton.text", "Download App");

  // Two-layer text for hover swap
  const inner = (
    <span className="relative inline-block overflow-hidden">
      <span className="block transition-transform duration-500 translate-y-0 group-hover:-translate-y-[110%]">
        {displayText}
      </span>
      <span className="absolute left-0 top-[110%] block transition-transform duration-500 group-hover:translate-y-[-110%]">
        {displayHoverText}
      </span>
    </span>
  );

  // const { currentLanguageCode } = useLanguage();

  // Smart download handler
  const handleDownload = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const userAgent =
      typeof window !== "undefined" ? window.navigator.userAgent : "";
    const isAndroid = /Android/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
    const isMac = /Macintosh|Mac OS X/i.test(userAgent);
    const appStore = "https://apps.apple.com/sg/app/beasy/id6745190697";
    const playStore =
      "https://play.google.com/store/apps/details?id=suntel.beasy.app&hl=en";

    // On Android: Play Store
    if (isAndroid) {
      window.location.href = playStore;
      return;
    }
    // On iOS: App Store
    if (isIOS) {
      window.location.href = appStore;
      return;
    }
    // On Mac: App Store (open in new tab)
    if (isMac) {
      window.open(appStore, "_blank");
      return;
    }
    // On Windows/Linux/other desktop: open both in new tabs (or just Play Store)
    window.open(playStore, "_blank");
    setTimeout(() => window.open(appStore, "_blank"), 300);
  };

  return (
    <button
      type="button"
      onClick={onClick || handleDownload}
      className={`group px-5 py-3 bg-[image:var(--beasy-gradient)] text-white text-[16px] font-medium ${className}`}
    >
      {inner}
    </button>
  );
}
