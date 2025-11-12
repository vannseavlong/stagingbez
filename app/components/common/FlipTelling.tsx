"use client";

import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Story {
  id: number | string;
  title: string;
  description: string;
  image: string;
}

interface FlipTellingProps {
  stories: Story[];
}

export type FlipTellingHandle = {
  flipTo: (n: number) => void;
};

export const FlipTelling = forwardRef<FlipTellingHandle, FlipTellingProps>(
  ({ stories }: FlipTellingProps, ref) => {
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState(0); // 1 next, -1 prev
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isActive = useRef(false);

    useEffect(() => {
      const node = containerRef.current;
      if (!node) return;

      // section will occupy N * 100vh; compute its top on the document
      let sectionTop = 0;
      const vh = () =>
        window.innerHeight || document.documentElement.clientHeight;
      const updateSectionTop = () => {
        const rect = node.getBoundingClientRect();
        sectionTop = window.scrollY + rect.top;
      };

      // when user reaches the section, snap it to the top of viewport so the sticky inner area centers
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
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
        // while not active, let the page scroll normally
        if (!isActive.current) return;
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const offset = window.scrollY - sectionTop;
          // clamp between 0 and (stories.length - 1) * vh
          const raw = offset / vh();
          // round to nearest integer index
          const target = Math.round(raw);
          const clamped = Math.max(0, Math.min(stories.length - 1, target));
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
    }, [stories.length, index]);

    // expose imperative API to parent: flipTo(n)
    useImperativeHandle(ref, () => ({
      flipTo: (n: number) => {
        const node = containerRef.current;
        if (!node) return;
        const vh = () =>
          window.innerHeight || document.documentElement.clientHeight;
        const rect = node.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const clamped = Math.max(
          0,
          Math.min(stories.length - 1, Math.round(n))
        );
        // scroll to the target slide position inside the tall section
        window.scrollTo({
          top: sectionTop + clamped * vh(),
          behavior: "smooth",
        });
        // set index immediately so UI responds while scrolling
        setDir((prev) => (clamped > index ? 1 : clamped < index ? -1 : prev));
        setIndex(clamped);
      },
    }));

    if (!stories || stories.length === 0) return null;

    const slideVariants = {
      enter: (d: number) => ({ y: d > 0 ? 120 : -120, opacity: 0 }),
      center: { y: 0, opacity: 1 },
      exit: (d: number) => ({ y: d > 0 ? -120 : 120, opacity: 0 }),
    };

    const imageVariants = {
      enter: { opacity: 0, scale: 1.06 },
      center: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
    };
    return (
      <div
        ref={containerRef}
        style={{ height: `${stories.length * 100}vh` }}
        className="relative w-full overflow-hidden"
      >
        <div className="sticky top-0 h-screen flex items-center">
          {/* Left: centered description */}
          <div className="w-1/2 flex items-center justify-center px-12 bg-white">
            <div className="max-w-xl w-full">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={stories[index].id}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 28 },
                    opacity: { duration: 0.25 },
                  }}
                  className="text-center"
                >
                  <h2 className="text-2xl font-bold mb-4">
                    {stories[index].title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {stories[index].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: sticky mock with animated image */}
          <div className="w-1/2 relative bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="relative w-[340px] h-[680px] bg-black rounded-[40px] p-3 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-black rounded-b-3xl z-20" />
              <div className="relative w-full h-full bg-white rounded-[30px] overflow-hidden">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.img
                    key={stories[index].id}
                    src={stories[index].image}
                    alt={stories[index].title}
                    custom={dir}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      opacity: { duration: 0.45 },
                      scale: { duration: 0.55 },
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// Set displayName for better debugging and to satisfy lint rules
FlipTelling.displayName = "FlipTelling";

export default FlipTelling;
