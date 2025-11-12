"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Card {
  id: string | number;
  title?: string;
  body?: string;
  image?: string;
}

interface CardSliderProps {
  cards: Card[];
}

export default function CardSlider({ cards }: CardSliderProps) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0); // 1 forward, -1 back
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isActive = useRef(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let sectionTop = 0;
    const vh = () =>
      window.innerHeight || document.documentElement.clientHeight;
    const updateSectionTop = () => {
      const rect = node.getBoundingClientRect();
      sectionTop = window.scrollY + rect.top;
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // snap to section so the sticky area is active
            node.scrollIntoView({ behavior: "auto", block: "start" });
            updateSectionTop();
            isActive.current = true;
          } else {
            isActive.current = false;
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(node);

    let ticking = false;
    const onScroll = () => {
      if (!isActive.current) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = window.scrollY - sectionTop;
        const raw = Math.round(offset / vh());
        const clamped = Math.max(0, Math.min(cards.length - 1, raw));
        setDir((prev) => (clamped > index ? 1 : clamped < index ? -1 : prev));
        setIndex(clamped);
        ticking = false;
      });
    };

    updateSectionTop();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateSectionTop);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateSectionTop);
    };
  }, [cards.length, index]);

  if (!cards || cards.length === 0) return null;

  const enterX = (d: number) => (d > 0 ? 300 : -300);
  const exitX = (d: number) => (d > 0 ? -300 : 300);

  return (
    <div
      ref={containerRef}
      style={{ height: `${cards.length * 100}vh` }}
      className="relative w-full overflow-hidden"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="w-full max-w-3xl px-6">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={cards[index].id}
              custom={dir}
              initial={{ x: enterX(dir), opacity: 0, scale: 0.98 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: exitX(dir), opacity: 0, scale: 0.98 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 28 },
                opacity: { duration: 0.2 },
              }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {cards[index].image && (
                <div className="md:w-1/2 h-64 md:h-auto">
                  <img
                    src={cards[index].image}
                    alt={cards[index].title ?? String(cards[index].id)}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-8 md:w-1/2">
                <h3 className="text-2xl font-bold mb-3">
                  {cards[index].title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {cards[index].body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Optional: small pagination */}
          <div className="mt-6 flex justify-center gap-2">
            {cards.map((c, i) => (
              <button
                key={c.id}
                onClick={() => {
                  // scroll to the slide
                  const node = containerRef.current;
                  if (!node) return;
                  const vh =
                    window.innerHeight || document.documentElement.clientHeight;
                  const rect = node.getBoundingClientRect();
                  const sectionTop = window.scrollY + rect.top;
                  window.scrollTo({
                    top: sectionTop + i * vh,
                    behavior: "smooth",
                  });
                }}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-black" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
