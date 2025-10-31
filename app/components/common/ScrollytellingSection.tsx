"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ScrollytellingItem {
  title: string;
  description: string;
  imageUrl: string;
}

const scrollytellingData: ScrollytellingItem[] = [
  {
    title: "Mountains",
    description:
      "Towering peaks pierce the clouds, their snow-capped summits gleaming in the sunlight. These ancient giants stand as silent witnesses to the passage of time, offering breathtaking vistas and challenging adventures to those who dare to explore their heights.",
    imageUrl:
      "https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjE4NjkyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Ocean",
    description:
      "The rhythmic dance of waves against the shore creates a timeless symphony. Deep blue waters stretch endlessly to the horizon, home to countless mysteries and teeming with life beneath the surface. The ocean's power and beauty inspire wonder and respect.",
    imageUrl:
      "https://images.unsplash.com/photo-1514747975201-4715db583da9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzfGVufDF8fHx8MTc2MTg0MTExMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Forest",
    description:
      "Sunlight filters through a canopy of emerald leaves, creating a cathedral of natural beauty. The forest floor is a tapestry of moss, ferns, and fallen leaves. Here, life flourishes in countless forms, each playing its part in the delicate balance of nature's ecosystem.",
    imageUrl:
      "https://images.unsplash.com/photo-1759066914561-c1bde5bc924c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmV8ZW58MXx8fHwxNzYxNzk1NjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Desert",
    description:
      "Golden sands stretch endlessly beneath a vast sky painted in hues of orange and purple. The desert is a place of extremes, where scorching days give way to cool nights. In this seemingly barren landscape, life adapts and thrives in remarkable ways.",
    imageUrl:
      "https://images.unsplash.com/photo-1614935981447-893ce3858657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBzdW5zZXR8ZW58MXx8fHwxNzYxODQ5NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function ScrollytellingSection({
  items,
}: {
  items?: ScrollytellingItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const data = items && items.length > 0 ? items : scrollytellingData;

  useEffect(() => {
    const sections = sectionRefs.current.slice();
    const observers = sections.map((section, index) => {
      if (!section) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "-20% 0px -20% 0px",
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

  return (
    <div className="relative min-h-screen from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left side - Scrolling text content */}
          <div className="space-y-[100vh]">
            {data.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="min-h-screen flex items-center"
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
            <div className="sticky top-35 h-[80vh] flex items-center justify-center">
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
