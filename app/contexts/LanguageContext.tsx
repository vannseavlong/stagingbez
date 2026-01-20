"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export interface Language {
  code: string;
  name: string;
  displayName: string;
  flag: string;
}

interface LanguageContextType {
  currentLanguageCode: string;
  changeLanguage: (code: string) => void;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const AVAILABLE_LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    displayName: "EN",
    flag: "/icons/flags/EnFlag.webp",
  },
  {
    code: "km",
    name: "Khmer",
    displayName: "ខ្មែរ",
    flag: "/icons/flags/KmFlag.webp",
  },
  {
    code: "zh",
    name: "Chinese",
    displayName: "中文",
    flag: "/icons/flags/CnFlag.webp",
  },
];

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentLanguageCode, setCurrentLanguageCode] = useState(
    initialLanguage || "en",
  );

  // Detect language from URL pathname
  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const langSegment = segments[0];
    if (["en", "km", "zh"].includes(langSegment)) {
      setCurrentLanguageCode(langSegment);
    }
  }, [pathname]);

  const changeLanguage = (code: string) => {
    setCurrentLanguageCode(code);

    // Replace the language segment in the URL
    const segments = pathname.split("/").filter(Boolean);
    const currentLang = segments[0];

    if (["en", "km", "zh"].includes(currentLang)) {
      // Replace first segment with new language
      segments[0] = code;
    } else {
      // Add language as first segment
      segments.unshift(code);
    }

    const newPath = `/${segments.join("/")}`;
    router.push(newPath);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguageCode,
        changeLanguage,
        languages: AVAILABLE_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
