"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { trackEvent } from "@/lib/analytics";

interface LanguageDropdownProps {
  compact?: boolean;
}

export default function LanguageDropdown({
  compact = false,
}: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguageCode, changeLanguage, languages } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(
    (lang) => lang.code === currentLanguageCode
  );

  const handleLanguageChange = (langCode: string) => {
    try {
      trackEvent("language_change", {
        from: currentLanguageCode,
        to: langCode,
      });
    } catch {
      // ignore
    }
    changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center gap-2 transition-colors ${
          compact ? "py-1 px-2" : "py-2"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <Image
          src={currentLang?.flag || "/icons/flags/EnFlag.webp"}
          alt={`${currentLang?.name} flag`}
          width={compact ? 18 : 24}
          height={compact ? 14 : 18}
        />
        <span className={`font-medium ${compact ? "text-xs" : "text-sm"}`}>
          {currentLang?.displayName}
        </span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L7 7.5L13 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg py-1 min-w-[160px] z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`w-full flex items-center gap-3 px-4 py-2 transition-colors ${
                currentLanguageCode === language.code
                  ? "bg-blue-50 text-blue-600"
                  : ""
              }`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <Image
                src={language.flag}
                alt={`${language.name} flag`}
                width={24}
                height={18}
              />
              <span className="font-medium text-sm">
                {language.displayName}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
