"use client";

import React, { useState, useCallback } from "react";
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
  const [isVisible, setIsVisible] = useState(true);

  // Set the gradient style for the button
  const buttonStyle: React.CSSProperties = {
    background: "linear-gradient(300deg, #1B4CFA 0%, #102C90 100%)",
  };

  const handleClick = useCallback(async () => {
    try {
      // Minimal tracking (placeholder for real analytics)
      if (process.env.NODE_ENV !== "production") {
        console.debug(
          "Telegram link clicked",
          telegramLink,
          "source",
          "floating_widget"
        );
      }
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
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[1000] flex items-center space-x-3">
      {/* Telegram Message Box (Hidden on small screens) */}
      <div className="block">
        <div className="relative bg-white text-[#102C90] p-3 rounded-xl shadow-lg text-sm max-w-[200px] sm:max-w-[260px] z-10">
          {sectionAData?.telegramButton?.message ||
            t("sectionA.telegramButton.message", "Got a question? Tap here!")}

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
