"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { ContactUsButton, DownloadAppButton, LanguageDropdown } from "..";
// import { handleSmartDownload } from "@/lib/smartDownload";
import { useState } from "react";
// Phase 2: Uncomment to restore navigation links
// import { NAV_ITEMS } from "../navigation";

export default function SiteNav() {
  const { currentLanguageCode } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="logo">
            <Link href={`/${currentLanguageCode}`}>
              <Image
                src="/images/new-logo.png"
                alt="bEasy Logo"
                width={120}
                height={40}
                priority
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Phase 2: Navigation links will go here */}
          {/* <nav className="hidden md:flex gap-6 items-center">
            {NAV_ITEMS.map((it) => ...)}
          </nav> */}

          {/* Desktop right-side: hidden on mobile */}
          <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
            <li>
              <LanguageDropdown />
            </li>
            <li>
              <ContactUsButton />
            </li>
            <li>
              <DownloadAppButton />
            </li>
          </ul>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              {/* Simple hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-over menu (always mounted for smooth animation) */}
      {/* Mobile slide-over menu (always mounted for smooth animation) */}
      <div
        className={`md:hidden fixed inset-0 z-50 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ display: open ? undefined : "none" }}
        aria-hidden={!open}
      >
        {/* overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-lg p-4 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal={open}
        >
          <div className="flex flex-col gap-4">
            <div>
              <LanguageDropdown compact />
            </div>
            <div>
              <ContactUsButton
                className="w-full px-6 py-3 text-sm justify-center"
                onClick={() => {
                  setOpen(false);
                  // Scroll to contact section after menu closes
                  setTimeout(() => {
                    const el = document.getElementById("contact");
                    if (el)
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 200);
                }}
              />
            </div>
            <div>
              <DownloadAppButton className="w-full px-6 py-3 text-sm justify-center" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
