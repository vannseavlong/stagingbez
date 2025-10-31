"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { useTranslate } from "@/app/hooks/useTranslate";
import Image from "next/image";

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
      {/* Header */}
      <header className="pt-16 pb-8 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto text-center overflow-x-hidden">
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

      {/* Slides container: vertical scroll-snap for swipeable slides */}
      <section className="max-w-[1440px] mx-auto py-6 px-4">
        <Slides items={items} languageFolder={languageFolder} />
      </section>
    </div>
  );
}

function Slides({
  items,
  languageFolder,
}: {
  items: any[];
  languageFolder: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Observe which slide is mostly visible to update activeIndex
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const slides = Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const idx = Number(entry.target.getAttribute("data-index") || 0);
            setActiveIndex(idx);
          }
        });
      },
      { root: el, threshold: [0.5] }
    );

    slides.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [items]);

  // Hide native scrollbars and ensure touch/scroll chaining works so the
  // user can continue scrolling past the last slide on mobile.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Hide scrollbars (Firefox / IE)
    try {
      (el.style as any).scrollbarWidth = "none"; // Firefox
      (el.style as any).msOverflowStyle = "none"; // IE/Edge
    } catch {}

    // Allow parent scroll when reaching boundaries (scroll chaining)
    el.style.overscrollBehavior = "auto";
    el.style.touchAction = "pan-y";
    el.style.setProperty("-webkit-overflow-scrolling", "touch");

    // Inject a WebKit rule to hide the scrollbar visually
    const style = document.createElement("style");
    style.setAttribute("data-hide-scrollbar", "true");
    style.innerHTML = `#howit-slides::-webkit-scrollbar{display:none;height:0;}
      #howit-slides{ -webkit-overflow-scrolling: touch; }`;
    document.head.appendChild(style);

    // assign id so rule applies only here
    el.id = "howit-slides";

    return () => {
      document.head.removeChild(style);
      // cleanup id
      if (el.id === "howit-slides") el.id = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-x-hidden overflow-y-auto snap-y snap-mandatory touch-auto"
      style={{
        height: "calc(100vh - 200px)",
        overflowX: "hidden",
      }}
    >
      {items.map((item: any, idx: number) => {
        const id = item.id;
        const sufMap: Record<string, string> = {
          English: "EN",
          Khmer: "KM",
          Chinese: "CN",
        };
        const suf = sufMap[languageFolder] || "EN";
        const imageSrc =
          item.image ||
          (item.imageName
            ? `/images/blog/${id}/${item.imageName}-${suf}.webp`
            : `/images/blog/${id}/${id}-${suf}.webp`);
        const isActive = idx === activeIndex;
        const slideStyle: React.CSSProperties = {
          transition:
            "transform 640ms cubic-bezier(.19,.84,.29,1), opacity 420ms ease, box-shadow 560ms ease",
          // smoother, subtler tilt and movement for a less aggressive flip
          transform: isActive
            ? "perspective(1200px) translate3d(0,0,0) rotateX(0deg) scale(1)"
            : "perspective(1200px) translate3d(0,4px,0) rotateX(2deg) scale(0.998)",
          transformOrigin: "center top",
          backfaceVisibility: "hidden",
          opacity: isActive ? 1 : 0.96,
          boxShadow: isActive
            ? "0 20px 40px rgba(16,28,48,0.06)"
            : "0 6px 14px rgba(16,28,48,0.03)",
          willChange: "transform, opacity, box-shadow",
          overflowX: "hidden",
        };

        return (
          <article
            key={id}
            data-slide
            data-index={idx}
            className="snap-start h-[calc(100vh-200px)] flex flex-col lg:flex-row items-center gap-8 p-6 bg-white"
            style={slideStyle}
          >
            <div className="w-full lg:w-1/2 flex items-start">
              <div className="max-w-xl">
                <h2 className="text-[24px] md:text-[32px] font-bold text-[#1a1a1a] leading-tight mb-3 font-sans">
                  {item.title}
                </h2>
                <p className="text-[16px] md:text-[18px] font-medium text-[#1a1a1a] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md h-[420px] md:h-[520px]">
                <Image
                  src={imageSrc}
                  alt={item.name || item.title || id}
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  sizes="(max-width: 1024px) 100vw, 35vw"
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
