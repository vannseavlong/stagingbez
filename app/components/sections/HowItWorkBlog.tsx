"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useTranslate } from "@/app/hooks/useTranslate";
import Image from "next/image";

export default function HowItWorkBlog() {
  const [activeIndex, setActiveIndex] = useState(0);
  // main sticky state (used instead of JS-fixed to avoid overlap)
  const [isSticky, setIsSticky] = useState(false);
  const scrollyRef = useRef<HTMLDivElement | null>(null);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef<number>(0);
  const wheelLockRef = useRef<boolean>(false);
  // whether the top sentinel has been scrolled past (used with activeIndex to decide stickiness)
  const [topPassed, setTopPassed] = useState(false);

  const { getSection, languageFolder } = useTranslate();
  const section = (getSection("blogSection") as any) || {};
  const header = section.header || {};
  const items = useMemo(
    () => (section.items as Array<any>) || [],
    [section.items]
  );

  // Use IntersectionObserver on a top sentinel to toggle `isSticky` only when the
  // user has scrolled to the section (avoids being sticky on page refresh).
  useEffect(() => {
    const sentinel = topSentinelRef.current;
    if (!sentinel) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        // rootMargin pushes the trigger down by 200px so sticky only starts after
        // the section has scrolled near the top (mirrors previous offset)
        setTopPassed(!e.isIntersecting);
      },
      { root: null, rootMargin: "-200px 0px 0px 0px", threshold: 0 }
    );

    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  // Decide actual stickiness: only sticky when we've scrolled past the sentinel
  // AND we haven't reached the last slide yet. Once the last item is active,
  // the section should stop being sticky so the parent can continue scrolling.
  useEffect(() => {
    const lastIndex = items.length > 0 ? items.length - 1 : 0;
    setIsSticky(topPassed && activeIndex < lastIndex);
  }, [topPassed, activeIndex, items.length]);

  const currentStep =
    items.length > 0
      ? items[activeIndex] || items[0]
      : { title: "", description: "" };

  // Keep a ref of activeIndex to use inside wheel handler without stale closures
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Mousewheel control: when the pointer is over the scrolly section, use wheel to
  // advance slides. We only intercept wheel events when there are more slides to
  // navigate in the scroll direction; otherwise let the page scroll normally.
  useEffect(() => {
    const el = scrollyRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (wheelLockRef.current) return;
      if (!items || items.length === 0) return;

      const lastIndex = items.length - 1;
      const delta = e.deltaY;
      // ignore very small deltas (touchpad noise)
      if (Math.abs(delta) < 8) return;

      // Scrolling down -> advance slides until last slide, then allow page scroll
      if (delta > 0) {
        if (activeIndexRef.current < lastIndex) {
          e.preventDefault();
          wheelLockRef.current = true;
          setActiveIndex((i) => Math.min(i + 1, lastIndex));
          setTimeout(() => (wheelLockRef.current = false), 600);
        } else {
          // at last slide: do not intercept — allow parent to scroll
        }
      } else {
        // Scrolling up -> go to previous slide if possible
        if (activeIndexRef.current > 0) {
          e.preventDefault();
          wheelLockRef.current = true;
          setActiveIndex((i) => Math.max(i - 1, 0));
          setTimeout(() => (wheelLockRef.current = false), 600);
        } else {
          // at first slide: allow parent to scroll
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as EventListener);
  }, [items]);

  return (
    <div className="bg-white" ref={scrollyRef}>
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

      {/* top sentinel: invisible element used to toggle sticky state */}
      <div ref={topSentinelRef} />

      {/* Main Section */}
      <div
        className={`max-w-[1440px] mx-auto py-12 ${
          isSticky ? "sticky top-[200px] z-10" : ""
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[600px]">
          {/* Text section */}
          <div className="flex items-center">
            <div key={activeIndex} className="animate-fade-in max-w-md">
              <h2 className="text-[24px] md:text-[32px] font-bold text-[#1a1a1a] leading-tight mb-3 font-sans">
                {currentStep.title}
              </h2>
              <p className="text-[16px] md:text-[18px] font-medium text-[#1a1a1a] leading-relaxed">
                {currentStep.description}
              </p>
            </div>
          </div>

          {/* Image carousel */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <Carousel
                axis="vertical"
                infiniteLoop={false}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                showArrows={false}
                emulateTouch
                swipeable
                autoPlay={false}
                selectedItem={activeIndex}
                onChange={(index) => setActiveIndex(index)}
                dynamicHeight={false}
                interval={4000}
              >
                {items.map((item) => {
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

                  return (
                    <div
                      key={id}
                      className="relative h-[600px] flex items-center justify-center p-6 md:p-8 lg:p-10"
                    >
                      <Image
                        src={imageSrc}
                        alt={item.name || item.title || id}
                        fill
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                        sizes="(max-width: 1024px) 100vw, 35vw"
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      {/* No dynamic spacer needed: `position: sticky` keeps element in flow and avoids overlap */}
    </div>
  );
}
