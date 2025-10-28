"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const { currentLanguageCode } = useLanguage();

  const withLang = (path: string) => {
    // append language code as last segment
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0) return `/${currentLanguageCode}`;
    const last = segments[segments.length - 1];
    if (["en", "km", "zh"].includes(last)) {
      segments[segments.length - 1] = currentLanguageCode;
    } else {
      segments.push(currentLanguageCode);
    }
    return `/${segments.join("/")}`;
  };

  return (
    <header className="w-full bg-white/70 backdrop-blur sticky top-0 z-50 border-b">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          Beasy
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <a href="#hero" className="hover:underline">
            Home
          </a>
          <a href="#install" className="hover:underline">
            Install
          </a>
          <a href="#faq" className="hover:underline">
            FAQ
          </a>
          <a
            href={withLang("/faq")}
            className="hover:underline"
            onClick={(e) => {
              // Prevent real navigation to avoid 404s for language-suffixed routes
              e.preventDefault();
            }}
          >
            FAQ Page
          </a>
        </nav>

        <button
          className="md:hidden px-2 py-1 border rounded"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 border-t">
          <div className="flex flex-col max-w-6xl mx-auto px-6 py-3 gap-2">
            <a href="#hero" onClick={() => setOpen(false)}>
              Home
            </a>
            <a href="#install" onClick={() => setOpen(false)}>
              Install
            </a>
            <a href="#faq" onClick={() => setOpen(false)}>
              FAQ
            </a>
            <a
              href={withLang("/faq")}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              FAQ Page
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
