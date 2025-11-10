"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
interface ScrollytellingItem {
  title: string;
  description: string;
  imageUrl: string;
}

export function ScrollytellingSection({
  items,
}: {
  items: ScrollytellingItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isAutoScrollRef = useRef<boolean>(false);
  const data: ScrollytellingItem[] = items;
  useEffect(() => {
    const sections = sectionRefs.current.slice();
    const observers = sections.map((section, index) => {
      if (!section) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // avoid triggering auto-scroll when we already initiated it
              if (!isAutoScrollRef.current) {
                isAutoScrollRef.current = true;
                try {
                  // smooth center this section
                  (sections[index] as HTMLDivElement).scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                } catch {}
                // release after animation time
                setTimeout(() => (isAutoScrollRef.current = false), 700);
              }
              setActiveIndex(index);
            }
          });
        },
        {
          // Trigger earlier so the step changes with less scroll
          threshold: 0.4,
          // give a bit more top margin so items become active slightly sooner
          rootMargin: "-30% 0px -30% 0px",
        }
      );
      observer.observe(section);
      return observer;
    });
    return () => {
      observers.forEach((observer, index) => {
        if (observer && sections[index]) {
          try {
            observer.unobserve(sections[index]!);
          } catch {
            // ignore
          }
        }
      });
    };
  }, []);
  // When the scrollytelling container first enters the viewport,
  // make sure the initial text step is centered (so text appears in middle)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onEnter = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const first = sectionRefs.current[0];
          if (first && typeof first.scrollIntoView === "function") {
            if (!isAutoScrollRef.current) {
              isAutoScrollRef.current = true;
              try {
                first.scrollIntoView({ behavior: "smooth", block: "center" });
              } catch {}
              setTimeout(() => (isAutoScrollRef.current = false), 700);
            }
            setActiveIndex(0);
          }
        }
      });
    };

    // If the container is already visible on mount, center the first step immediately.
    // Wait for refs to be populated (retry a few times) because refs may not be ready
    // on the first paint.
    const tryCenterFirst = (attempt = 0) => {
      const first = sectionRefs.current[0];
      if (first && typeof first.scrollIntoView === "function") {
        try {
          first.scrollIntoView({ behavior: "auto", block: "center" });
        } catch {}
        setActiveIndex(0);
        return;
      }
      if (attempt < 5) {
        setTimeout(() => tryCenterFirst(attempt + 1), 100);
      }
    };

    try {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        tryCenterFirst();
      }
    } catch {}

    const io = new IntersectionObserver(onEnter, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="relative min-h-screen from-slate-50 to-slate-100">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left side - Scrolling text content */}
          {/* Reduced vertical spacing and shorter panels so each step is reached sooner */}
          {/* Add top padding so first item starts lower, preventing sticky overlap */}
          <div
            ref={containerRef}
            className="space-y-12 lg:space-y-16 lg:pt-0 pb-32 lg:pb-40 min-[1200px]:pb-44 min-[1440px]:pb-48"
          >
            {data.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="min-h-[60vh] lg:min-h-[80vh] min-[1200px]:min-h-[75vh] flex items-center"
              >
                <div
                  className={`transition-all duration-700 ${
                    activeIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-30 translate-y-8"
                  }`}
                >
                  <h2 className="text-[20px] md:text-[24px] font-bold mb-6">
                    {item.title}
                  </h2>
                  <p className="text-[16px] md:text-[18px] font-medium max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Right side - Sticky image container */}
          <div className="hidden lg:block">
            {/* Vertically center using top-1/2 + -translate-y-1/2 so it's always middle-y */}
            <div className="sticky py-[50px] top-1/2 -translate-y-1/2 h-[80vh] min-[1200px]:h-[68vh] flex items-center justify-center">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${
                      activeIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="absolute inset-0" />
                  </div>
                ))}
                {/* Image indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {data.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        activeIndex === index
                          ? "w-8 bg-white"
                          : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Mobile view - images inline */}
          <div className="lg:hidden space-y-8">
            {data.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
