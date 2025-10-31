import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ScrollytellingSlide {
  title: string;
  description: string;
  imageUrl: string;
}

const defaultSlides: ScrollytellingSlide[] = [
  {
    title: "Urban Innovation",
    description:
      "Modern cities blend cutting-edge architecture with sustainable design, creating spaces where technology and humanity coexist in harmony.",
    imageUrl:
      "https://images.unsplash.com/photo-1617381519460-d87050ddeb92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MTgwOTk1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Digital Future",
    description:
      "Technology continues to reshape our world, bringing innovation that connects people and transforms how we live, work, and create.",
    imageUrl:
      "https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjE4MDkzNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Natural Wonders",
    description:
      "Wildlife thrives in ecosystems around the globe, reminding us of the beauty and diversity that exists in the natural world we must protect.",
    imageUrl:
      "https://images.unsplash.com/photo-1622399726160-f7748e75272c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjB3aWxkbGlmZXxlbnwxfHx8fDE3NjE4NTc5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Cosmic Exploration",
    description:
      "The universe stretches beyond our imagination, filled with stars, galaxies, and mysteries waiting to be discovered by future generations.",
    imageUrl:
      "https://images.unsplash.com/photo-1520034475321-cbe63696469a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHN0YXJzfGVufDF8fHx8MTc2MTgyMDcwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function MobileScrollytelling({
  slides: slidesProp,
  header,
}: {
  slides?: ScrollytellingSlide[];
  header?: {
    subtitle?: string;
    title?: string;
    description?: string;
  };
}) {
  const slides =
    slidesProp && slidesProp.length > 0 ? slidesProp : defaultSlides;
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sentinels = sentinelRefs.current.slice();
    const observers = sentinels.map((sentinel, index) => {
      if (!sentinel) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          // trigger when sentinel crosses the viewport center area
          threshold: 0,
          rootMargin: "-45% 0px -45% 0px",
        }
      );

      observer.observe(sentinel);
      return observer;
    });

    return () => {
      observers.forEach((observer, i) => {
        if (observer && sentinels[i]) {
          try {
            observer.unobserve(sentinels[i]!);
          } catch {
            /* ignore */
          }
        }
      });
    };
  }, [slides.length]);

  return (
    <div className="relative">
      {/* Sticky main display: header + text above image. Moved down to avoid overlap with navbar */}
      <div className="sticky top-20 flex flex-col z-10">
        {/* Header (part of sticky area) */}
        <div className="px-4 pt-3 text-center">
          <div
            className="font-bold text-[16px] md:text-[16px] leading-[32px] mb-2 font-sans"
            style={{
              background: "linear-gradient(90deg,#1B4CFA,#102C90)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {header?.subtitle || "HOW IT WORKS"}
          </div>

          <h2 className="text-[20px] md:text-[28px] font-bold text-[#1a1a1a] mb-2 font-sans">
            {header?.title || "Effortless Clean, Every Time"}
          </h2>

          <p className="text-[14px] md:text-[16px] font-medium text-[#1a1a1a] max-w-xl mx-auto mb-3 font-sans">
            {header?.description ||
              "Book using our app in just a few taps, and enjoy a spotless home without lifting a finger."}
          </p>
        </div>

        {/* Text area (compact) */}
        <div className="px-4 py-2 flex items-center justify-center mt-16 md:mt-[154px]">
          <div className="w-full max-w-3xl text-left">
            {/* Render only the active slide's text to ensure text always matches the active image index */}
            <div className="px-0 md:px-[100px] md:max-w-[400px] transition-all duration-300 ease-in-out opacity-100 translate-y-0">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                {slides[activeIndex]?.title}
              </h3>
              <p className="text-sm text-slate-700 mb-10 md:mb-16">
                {slides[activeIndex]?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Image area with fixed height to reduce empty space */}
        <div className="relative w-full h-[50vh]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-200 ease-in-out ${
                activeIndex === index
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={activeIndex !== index}
            >
              <div className="relative w-full h-full">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sentinels used for scroll detection — each sentinel is positioned near viewport center */}
      <div>
        {slides.map((_, index) => (
          <div key={index} className="h-screen">
            <div
              ref={(el) => {
                sentinelRefs.current[index] = el;
              }}
              className="w-full h-px mt-[50vh]"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </div>
  );
}
