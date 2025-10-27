"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslate } from "../../hooks/useTranslate";

type Item = {
  id: string;
  title: string;
  description: string;
};

const langSuffix = (lang: string) => {
  // map app language code to image suffix conventions in public/images/blog
  if (!lang) return "EN";
  const code = lang.toLowerCase();
  if (code.startsWith("en")) return "EN";
  if (code.startsWith("km")) return "KM";
  if (code.startsWith("zh") || code.startsWith("cn") || code.startsWith("ch"))
    return "CN";
  return "EN";
};

export default function HowItWorkBlog() {
  const { getSection, currentLanguage } = useTranslate();
  // translation shape: { header: {subtitle,title,description}, items: Item[] }
  const data = (getSection("blogSection") as any) || {};
  const header = data.header || {};
  const items: Item[] = data.items || [];

  // fallback: if translations are missing, try to load a default set (safe-guard)
  const fallbackIds = [
    "guestMode",
    "allServices",
    "paymentOptions",
    "reschedule",
    "dateTime",
    "rating",
  ];
  const effectiveItems = items.length
    ? items
    : fallbackIds.map((id) => ({ id, title: id, description: "" }));

  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-idx"));
          if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
            setActive(idx);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0.45, 0.5, 0.75],
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [effectiveItems.length]);

  // get current locale suffix from translate hook internals if available
  const locale =
    (currentLanguage as string) ||
    (typeof navigator !== "undefined" ? navigator.language : "en");

  const suffix = langSuffix(locale);

  return (
    <section ref={rootRef as any} className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center lg:text-left mb-8">
          {header.subtitle && (
            <p className="text-sm font-semibold text-primary-600 mb-2">
              {header.subtitle}
            </p>
          )}
          {header.title && (
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
              {header.title}
            </h2>
          )}
          {header.description && (
            <p className="text-base text-muted-600 max-w-2xl">
              {header.description}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: text items (on mobile this will stack under image) */}
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              {effectiveItems.map((it, idx) => (
                <div
                  key={it.id}
                  data-idx={idx}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className={`transition-transform duration-500 ease-out p-4 rounded-md ${
                    idx === active
                      ? "bg-gray-50 scale-100"
                      : "bg-transparent scale-95"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{it.title}</h3>
                      <p className="mt-2 text-sm text-muted-600">
                        {it.description}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          idx === active
                            ? "bg-primary-600 text-white border-primary-600"
                            : "bg-white text-primary-600 border-gray-200"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mockup images */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg relative">
              {effectiveItems.map((it, idx) => {
                // build path: /images/blog/<id>/<id>-<SUFFIX>.webp
                const src = `/images/blog/${it.id}/${it.id}-${suffix}.webp`;
                return (
                  <div
                    key={it.id}
                    aria-hidden={idx !== active}
                    className={`absolute inset-0 transition-opacity duration-600 ease-out transform ${
                      idx === active
                        ? "opacity-100 translate-y-0 z-10"
                        : "opacity-0 -translate-y-2 z-0 pointer-events-none"
                    }`}
                    style={{ transitionDuration: "400ms" }}
                  >
                    <div className="relative w-full h-[420px] md:h-[520px] lg:h-[480px] rounded-xl overflow-hidden shadow-md bg-gray-50">
                      <Image
                        src={src}
                        alt={it.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 1024px) 100vw, 480px"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
