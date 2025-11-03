"use client";

import React from "react";
import ImageComparer from "@/app/components/common/image-compare";
import { useTranslate } from "@/app/hooks/useTranslate";

export default function CompareSection() {
  // Translations
  const { getSection } = useTranslate();
  const compare = getSection("compare") as any;
  const header = (compare && compare.header) || {};

  // Default images (public folder). Replace with real before/after images as needed.
  const beforeImg = "/images/compare/_Before_.webp";
  const afterImg = "/images/compare/_After_.webp";

  return (
    <section className="w-full bg-white py-12 md:py-16 pt-[50px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* Left: header (on desktop left; on mobile/tablet shown on top) */}
          <div className="order-1 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
            <div className="mb-4">
              <span
                className="text-[16px] md:text-[16px] font-bold uppercase tracking-wide font-sans"
                style={{
                  background: "linear-gradient(90deg,#1B4CFA,#102C90)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {header.subtitle || "BEFORE & AFTER"}
              </span>
            </div>

            <h3 className="text-[24px] md:text-[32px] lg:text-[32px] font-bold text-[#111827] leading-[32px] mb-6 font-sans">
              {header.title || "Transformations You’ll Love"}
            </h3>

            <p className="text-[16px] md:text-[18px] text-[#374151] max-w-xl font-medium">
              {header.description ||
                "See the difference our on-demand cleaning service makes. From cluttered living rooms to sparkling spaces, our professional cleaners deliver results that speak for themselves."}
            </p>
          </div>

          {/* Right: compare image (on desktop right; on mobile/tablet placed under header) */}
          <div className="order-2 lg:order-2 flex justify-center">
            <div className="w-full max-w-[640px]">
              <ImageComparer beforeImg={beforeImg} afterImg={afterImg} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
