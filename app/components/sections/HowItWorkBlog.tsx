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
      <div className="max-w-[1440px] mt-16">
        {/* Header moved into the scrollytelling components (desktop & mobile) */}

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
                  <ScrollytellingSection items={slides} header={header} />
                </div>

                {/* Mobile/Tablet: simplified sticky scrollytelling */}
                <div className="lg:hidden">
                  <MobileScrollytelling slides={slides} header={header} />
                </div>
              </>
            );
          })()}
        </section>
      </div>
    </div>
  );
}
