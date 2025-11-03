"use client";

import { useMemo } from "react";
import { useTranslate } from "@/app/hooks/useTranslate";
import { ScrollytellingSection } from "@/app/components/common/ScrollytellingSection";
import { MobileScrollytelling } from "@/app/components/common/MobileScrollytelling";

export default function HowItWorkBlog() {
  const { getSection, languageFolder } = useTranslate();
  const section = (getSection("blogSection") as any) || {};
  const header = section.header || {};
  const items = useMemo(
    () => (section.items as Array<any>) || [],
    [section.items]
  );

  return (
    <div className="bg-white">
      {/* Centered container to match other sections */}
      <div className="max-w-[1440px] pt-16">
        {/* Header */}
        <header className="pt-0 pb-8 transition-all duration-300 text-center overflow-x-hidden">
          <div>
            <div
              className="font-bold text-[16px] md:text-[16px] leading-[32px] mb-4 font-sans"
              style={{
                background: "linear-gradient(90deg,#1B4CFA,#102C90)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {header.subtitle || "HOW IT WORKS"}
            </div>

            <h1 className="text-[24px] md:text-[32px] font-bold text-[#1a1a1a] mb-6 font-sans">
              {header.title || "Effortless Clean, Every Time"}
            </h1>

            <p className="text-[16px] md:text-[18px] font-medium text-[#1a1a1a] max-w-2xl mx-auto mb-10 font-sans">
              {header.description ||
                "Book using our app in just a few taps, and enjoy a spotless home without lifting a finger."}
            </p>
          </div>
        </header>

        {/* Scrollytelling body (desktop and mobile variants) */}
        <section className="py-6">
          {/* Prepare slides data once */}
          {(() => {
            const slides = items.map((item: any) => {
              const id = item.id;
              const sufMap: Record<string, string> = {
                English: "EN",
                Khmer: "KM",
                Chinese: "CN",
              };
              const suf = sufMap[languageFolder] || "EN";
              const imageUrl =
                item.image ||
                (item.imageName
                  ? `/images/blog/${id}/${item.imageName}-${suf}.webp`
                  : `/images/blog/${id}/${id}-${suf}.webp`);

              return {
                title: item.title,
                description: item.description,
                imageUrl,
              };
            });

            return (
              <>
                {/* Desktop: existing scrollytelling layout */}
                <div className="hidden lg:block">
                  <ScrollytellingSection items={slides} />
                </div>

                {/* Mobile/Tablet: simplified sticky scrollytelling */}
                <div className="lg:hidden">
                  <MobileScrollytelling slides={slides} />
                </div>
              </>
            );
          })()}
        </section>
      </div>
    </div>
  );
}
