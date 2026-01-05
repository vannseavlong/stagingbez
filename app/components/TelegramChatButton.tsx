"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { useTranslate } from "@/app/hooks/useTranslate";

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* simple paper-plane shape */}
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20 -4-9 -9-4 20-7z" />
  </svg>
);

interface TelegramChatButtonProps {
  telegramLink?: string;
}

export default function TelegramChatButton({
  telegramLink = "https://t.me/bEasy_Cs",
}: TelegramChatButtonProps) {
  const { getSection, t } = useTranslate();
  const _sectionAData = getSection("sectionA");
  const sectionAData =
    typeof _sectionAData === "object" && _sectionAData !== null
      ? (_sectionAData as { telegramButton?: { message?: string } })
      : {};

  // Fallback message (prefer sectionA override if present)
  const fallbackTelegramMessage =
    sectionAData?.telegramButton?.message || "Got a question? Tap here!";

  const [isVisible, setIsVisible] = useState(false); // Start hidden
  const [shouldShow, setShouldShow] = useState(false); // Controls when to show
  const [isInContactSection, setIsInContactSection] = useState(false);
  const [isEmbedMode, setIsEmbedMode] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check for embed=true query parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsEmbedMode(params.get("embed") === "true");
    }
  }, []);

  // Detect scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 20) {
        setShouldShow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial 5-second delay to show button (if not already triggered by scroll)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Detect if user is in ContactSection
  useEffect(() => {
    const checkContactSection = () => {
      const contactSection = document.querySelector('[data-section="contact"]');
      if (!contactSection) return;

      const rect = contactSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      setIsInContactSection(isInView);
    };

    checkContactSection();
    window.addEventListener("scroll", checkContactSection);
    window.addEventListener("resize", checkContactSection);

    return () => {
      window.removeEventListener("scroll", checkContactSection);
      window.removeEventListener("resize", checkContactSection);
    };
  }, []);

  // Show/hide logic based on shouldShow and ContactSection
  useEffect(() => {
    if (!shouldShow) return;

    if (isInContactSection) {
      // In ContactSection: show forever, clear any hide timer
      setIsVisible(true);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    } else {
      // Not in ContactSection: show and start 10-second timer
      setIsVisible(true);

      // Clear any existing timer
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }

      // Start new 10-second hide timer
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        try {
          trackEvent("telegram_auto_hide", { source: "floating_widget" });
        } catch {}
      }, 10000); // 10 seconds
    }

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [shouldShow, isInContactSection]);

  // Set the gradient style for the button
  const buttonStyle: React.CSSProperties = {
    background: "linear-gradient(300deg, #1B4CFA 0%, #102C90 100%)",
  };

  const handleClick = useCallback(async () => {
    try {
      trackEvent("telegram_click", {
        source: "floating_widget",
        href: telegramLink,
      });
    } catch {
      // ignore
    }
    if (typeof window !== "undefined") {
      window.open(telegramLink, "_blank");
    }
  }, [telegramLink]);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    try {
      trackEvent("telegram_close", { source: "floating_widget" });
    } catch {
      // ignore
    }
  }, []);

  if (!isVisible || isEmbedMode) return null;

  return (
    <div className="fixed bottom-5 right-5 z-1000 flex items-center space-x-3 animate-in slide-in-from-right-5 duration-500">
      {/* Telegram Message Box (Hidden on small screens) */}
      <div className="block">
        <div className="relative bg-white text-[#102C90] p-3 rounded-xl shadow-lg text-sm max-w-50 sm:max-w-65 z-10">
          {t("telegram.message", fallbackTelegramMessage)}

          {/* ARROW SIMULATION (Equivalent to ::after) */}
          <div
            className="absolute right-0 top-1/2 w-4 h-4 bg-white shadow-md transform -translate-y-1/2 translate-x-1/2 rotate-45 rounded-sm"
            style={{ zIndex: 0 }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Button Wrapper */}
      <div className="relative inline-block z-20">
        {/* Close Button */}
        <button
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border border-gray-300 text-gray-600 text-sm cursor-pointer flex items-center justify-center opacity-70 transition duration-200 hover:opacity-100 hover:bg-gray-50 hover:scale-110 shadow-md z-20 p-0"
          onClick={handleClose}
          aria-label="Close telegram widget"
        >
          ×
        </button>

        {/* Telegram Chat Button */}
        <button
          className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-transform duration-200 ease-in-out hover:-translate-y-0.5 cursor-pointer"
          onClick={handleClick}
          style={buttonStyle}
          aria-label="Chat on Telegram"
        >
          <TelegramIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
