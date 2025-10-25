"use client";

import { useTranslate } from "@/app/hooks/useTranslate";
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
    <span className="relative inline-block overflow-hidden">
      <span className="block transition-transform duration-500 translate-y-0 group-hover:-translate-y-[110%]">
        {displayText}
      </span>
      <span className="absolute left-0 top-[110%] block transition-transform duration-500 group-hover:translate-y-[-110%]">
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

    const lang = currentLanguageCode || "en";
    const targetPath = `/${lang}`;

    // If already on the language root page, just scroll
    if (pathname === targetPath || pathname === `${targetPath}/`) {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    // Otherwise navigate to the language home then scroll after mount
    try {
      await router.push(targetPath);
      // small delay to allow client to render the section
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } catch {
      // fallback: open anchor on same page
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoToContact}
      className={`group inline-block px-8 py-3 border-[1px] border-[#E8E8E8] text-gray-800 text-[16px] font-medium hover:bg-gray-50 transition-colors ${className}`}
    >
      {inner}
    </button>
  );
}
