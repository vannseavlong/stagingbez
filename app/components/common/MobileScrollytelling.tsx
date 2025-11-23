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
}: {
  slides?: ScrollytellingSlide[];
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
          // Trigger earlier so mobile slides change with less scroll
          threshold: 0.15,
          // shift the top margin so the sentinel is considered intersecting sooner
          rootMargin: "-15% 0px -35% 0px",
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
      {/* Sticky main display: text above image. Moved down to avoid overlap with navbar */}
      <div className="sticky top-20 flex flex-col z-10">
        {/* Text area (compact) */}
        <div className="px-4 py-3 flex items-center justify-center">
          <div className="w-full max-w-3xl text-center">
            {/* Render only the active slide's text to ensure text always matches the active image index */}
            <div className="transition-all duration-300 ease-in-out opacity-100 translate-y-0">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {slides[activeIndex]?.title}
              </h3>
              <p className="text-sm text-slate-700 mb-8">
                {slides[activeIndex]?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Image area - balanced size with shorter scroll steps */}
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
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sentinels used for scroll detection — very short steps for quick transitions */}
      <div>
        {slides.map((_, index) => (
          // Very short sentinel blocks for minimal scroll distance between slides
          <div key={index} className="h-[30vh]">
            <div
              ref={(el) => {
                sentinelRefs.current[index] = el;
              }}
              // position sentinel high to activate very early
              className="w-full h-px mt-[15vh]"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </div>
  );
}
