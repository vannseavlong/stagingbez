"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";

// Type for translation keys with dot notation support
type TranslationKey = string;
type TranslationValue =
  | string
  | number
  | boolean
  | TranslationObject
  | TranslationArray
  | undefined
  | null;
type TranslationObject = { [key: string]: TranslationValue };
type TranslationArray = TranslationValue[];

// Translation data cache to avoid re-importing
const translationCache: Record<string, TranslationObject> = {};

// Import all translation files statically for better type safety and Next.js compatibility
import navbarEn from "@/app/translations/English/navbar.json";
import navbarKm from "@/app/translations/Khmer/navbar.json";
import navbarZh from "@/app/translations/Chinese/navbar.json";
import sectionAEn from "@/app/translations/English/sectionA.json";
import sectionAKm from "@/app/translations/Khmer/sectionA.json";
import sectionAZh from "@/app/translations/Chinese/sectionA.json";
import faqEn from "@/app/translations/English/faqSection.json";
import faqKm from "@/app/translations/Khmer/faqSection.json";
import faqZh from "@/app/translations/Chinese/faqSection.json";
import testimonialEn from "@/app/translations/English/testimonial.json";
import testimonialKm from "@/app/translations/Khmer/testimonial.json";
import testimonialZh from "@/app/translations/Chinese/testimonial.json";
import serviceEn from "@/app/translations/English/serviceSection.json";
import serviceKm from "@/app/translations/Khmer/serviceSection.json";
import serviceZh from "@/app/translations/Chinese/serviceSection.json";
import aboutEn from "@/app/translations/English/aboutSection.json";
import aboutKm from "@/app/translations/Khmer/aboutSection.json";
import aboutZh from "@/app/translations/Chinese/aboutSection.json";
import contactEn from "@/app/translations/English/contactSection.json";
import contactKm from "@/app/translations/Khmer/contactSection.json";
import contactZh from "@/app/translations/Chinese/contactSection.json";
import installEn from "@/app/translations/English/installSection.json";
import installKm from "@/app/translations/Khmer/installSection.json";
import installZh from "@/app/translations/Chinese/installSection.json";
import footerEn from "@/app/translations/English/footerSection.json";
import footerKm from "@/app/translations/Khmer/footerSection.json";
import footerZh from "@/app/translations/Chinese/footerSection.json";
import compareEn from "@/app/translations/English/compareSection.json";
import compareKm from "@/app/translations/Khmer/compareSection.json";
import compareZh from "@/app/translations/Chinese/compareSection.json";
import blogEn from "@/app/translations/English/blogSection.json";
import blogKm from "@/app/translations/Khmer/blogSection.json";
import blogZh from "@/app/translations/Chinese/blogSection.json";
import mediaEn from "@/app/translations/English/media.json";
import mediaKm from "@/app/translations/Khmer/media.json";
import mediaZh from "@/app/translations/Chinese/media.json";
import telegramEn from "@/app/translations/English/telegram.json";
import telegramKm from "@/app/translations/Khmer/telegram.json";
import telegramZh from "@/app/translations/Chinese/telegram.json";
import serviceDetailEn from "@/app/translations/English/serviceDetail.json";
import serviceDetailKm from "@/app/translations/Khmer/serviceDetail.json";
import serviceDetailZh from "@/app/translations/Chinese/serviceDetail.json";
import aboutUsEn from "@/app/translations/English/aboutUs.json";
import aboutUsKm from "@/app/translations/Khmer/aboutUs.json";
import aboutUsZh from "@/app/translations/Chinese/aboutUs.json";

const translations: Record<string, Record<string, TranslationObject>> = {
  English: {
    navbar: navbarEn,
    sectionA: sectionAEn,
    faqSection: faqEn,
    blogSection: blogEn || {},
    media: mediaEn || {},
    telegram: telegramEn || {},
    // testimonial.json has shape { id: 'Testimonials', testimonial: { ... } }
    // we want the inner object so keys like 'testimonial.subtitle' map to the inner properties
    testimonial: testimonialEn?.testimonial || {},
    service: serviceEn || {},
    about: aboutEn || {},
    // dedicated about-us page translations
    "about-us": (aboutUsEn as unknown as TranslationObject) || {},
    compare: compareEn || {},
    contact: (contactEn as unknown as TranslationObject) || {},
    install: (installEn as unknown as TranslationObject) || {},
    footer: (footerEn as unknown as TranslationObject) || {},
    serviceDetail: serviceDetailEn || {},
  },
  Khmer: {
    navbar: navbarKm,
    sectionA: sectionAKm,
    faqSection: faqKm,
    blogSection: blogKm || {},
    media: mediaKm || {},
    telegram: telegramKm || {},
    testimonial: testimonialKm?.testimonial || {},
    service: serviceKm || {},
    about: aboutKm || {},
    // dedicated about-us page translations
    "about-us": (aboutUsKm as unknown as TranslationObject) || {},
    compare: compareKm || {},
    contact: (contactKm as unknown as TranslationObject) || {},
    install: (installKm as unknown as TranslationObject) || {},
    footer: (footerKm as unknown as TranslationObject) || {},
    serviceDetail: serviceDetailKm || {},
  },
  Chinese: {
    navbar: navbarZh,
    sectionA: sectionAZh,
    faqSection: faqZh,
    blogSection: blogZh || {},
    media: mediaZh || {},
    telegram: telegramZh || {},
    testimonial: testimonialZh?.testimonial || {},
    service: serviceZh || {},
    about: aboutZh || {},
    // dedicated about-us page translations
    "about-us": (aboutUsZh as unknown as TranslationObject) || {},
    compare: compareZh || {},
    contact: (contactZh as unknown as TranslationObject) || {},
    install: (installZh as unknown as TranslationObject) || {},
    footer: (footerZh as unknown as TranslationObject) || {},
    serviceDetail: serviceDetailZh || {},
  },
};

/**
 * Custom hook for accessing translations by section and key
 *
 * Usage:
 * const { t, getSection } = useTranslate();
 *
 * // Get entire section
 * const navbarData = getSection('navbar');
 *
 * // Get specific key with dot notation
 * const downloadText = t('navbar.downloadButton.text');
 */
export function useTranslate() {
  const { currentLanguageCode } = useLanguage();

  // Map language codes to folder names
  const languageMap: Record<string, string> = {
    en: "English",
    km: "Khmer",
    zh: "Chinese",
  };

  const languageFolder = languageMap[currentLanguageCode] || "English";

  /**
   * Load a translation section (e.g., 'navbar', 'hero', 'faq')
   */
  const getSection = (sectionName: string): TranslationObject => {
    const cacheKey = `${languageFolder}/${sectionName}`;

    // Return from cache if available
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    // Get from static imports
    const sectionData = translations[languageFolder]?.[sectionName];

    if (sectionData) {
      translationCache[cacheKey] = sectionData;
      return sectionData;
    }

    console.warn(
      `Translation file not found: ${languageFolder}/${sectionName}.json`
    );
    return {};
  };

  /**
   * Get a specific translation value using dot notation
   * Example: t('navbar.downloadButton.text')
   */
  const t = (key: TranslationKey, fallback: string = ""): string => {
    const [section, ...pathParts] = key.split(".");

    if (!section) return fallback;

    const sectionData = getSection(section);

    // Navigate through nested keys
    let value: TranslationValue = sectionData;
    for (const part of pathParts) {
      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        part in value
      ) {
        value = (value as TranslationObject)[part];
      } else {
        return fallback || key; // Return fallback or the key itself
      }
    }

    return typeof value === "string" ? value : fallback || key;
  };

  /**
   * Get translation with interpolation support
   * Example: ti('navbar.welcome', { name: 'John' }) -> "Welcome, John!"
   */
  const ti = (
    key: TranslationKey,
    variables: Record<string, string | number> = {},
    fallback: string = ""
  ): string => {
    let text = t(key, fallback);

    // Replace variables like {{name}} with actual values
    Object.entries(variables).forEach(([varKey, varValue]) => {
      text = text.replace(new RegExp(`{{${varKey}}}`, "g"), String(varValue));
    });

    return text;
  };

  return {
    t,
    ti,
    getSection,
    currentLanguage: currentLanguageCode,
    languageFolder,
  };
}
