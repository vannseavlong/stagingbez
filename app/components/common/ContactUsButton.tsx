"use client";

import { useTranslate } from "@/app/hooks/useTranslate";
import { trackEvent } from "@/lib/analytics";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/app/contexts/LanguageContext";

interface ContactUsButtonProps {
  className?: string;
  onClick?: () => void;
  text?: string;
  hoverText?: string;
}

export default function ContactUsButton({
  className = "",
  onClick,
  text,
  hoverText,
}: ContactUsButtonProps) {
  const { t } = useTranslate();

  // Use translation if text not provided
  const displayText = text || t("navbar.contactButton.text", "Contact Us");
  const displayHoverText =
    hoverText || t("navbar.contactButton.text", "Contact Us");

  // Two-layer text for hover swap
  const inner = (
    <span className="relative inline-flex items-center justify-center overflow-hidden">
      <span className="inline-block transition-transform duration-500 translate-y-0 group-hover:-translate-y-[100%]">
        {displayText}
      </span>
      <span className="absolute left-0 top-[100%] inline-block transition-transform duration-500 group-hover:translate-y-[-100%]">
        {displayHoverText}
      </span>
    </span>
  );

  const pathname = usePathname() || "/";
  const router = useRouter();
  const { currentLanguageCode = "en" } = useLanguage();

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`group px-8 py-3 border-[1px] border-[#E8E8E8] text-gray-800 text-[16px] font-medium hover:bg-gray-50 transition-colors ${className}`}
      >
        {inner}
      </button>
    );
  }

  const handleGoToContact = async (e?: React.MouseEvent) => {
    e?.preventDefault();

    try {
      trackEvent("contact_click", { source: "nav", path: pathname });
    } catch {}

    const lang = currentLanguageCode || "en";
    // Navigate to the dedicated contact page for the current language
    const targetPath = `/${lang}/contact`;
    try {
      await router.push(targetPath);
      try {
        trackEvent("contact_navigate", { target: targetPath });
      } catch {}
    } catch (err) {
      try {
        trackEvent("contact_navigate_fail", {
          target: targetPath,
          error: String(err),
        });
      } catch {}
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoToContact}
      className={`group inline-flex items-center justify-center leading-[28px] px-8 py-3 border-[1px] border-[#E8E8E8] text-gray-800 text-[16px] font-bold hover:bg-gray-50 transition-colors ${className}`}
    >
      {inner}
    </button>
  );
}
