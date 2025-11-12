import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface Story {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface FlipStoryTellerProps {
  stories: Story[];
}

export function FlipStoryTeller({ stories }: FlipStoryTellerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for previous
  const [isInView, setIsInView] = useState(false);
  const isScrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasSnapped = useRef(false);
  const isLeaving = useRef(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => Math.min(i + 1, stories.length - 1));
  }, [stories.length]);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  // Intersection Observer to detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Consider in view if more than 50% is visible
          setIsInView(entry.intersectionRatio > 0.5);
        });
      },
      {
        threshold: [0, 0.5, 1],
      }
    );

    const node = containerRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  // Mouse wheel handler with smart boundary detection
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only intercept if component is in view
      if (!isInView) return;

      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // At first story and scrolling up - allow page scroll
      if (currentIndex === 0 && scrollingUp) {
        return;
      }

      // At last story and scrolling down - allow page scroll
      if (currentIndex === stories.length - 1 && scrollingDown) {
        return;
      }

      // Otherwise, prevent default and flip
      e.preventDefault();
      isScrolling.current = true;

      if (scrollingDown) {
        handleNext();
      } else if (scrollingUp) {
        handlePrevious();
      }

      // Throttle for 800ms to prevent rapid flipping
      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex, stories.length, isInView, handleNext, handlePrevious]);

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const imageVariants = {
    enter: {
      opacity: 0,
      scale: 1.1,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex"
    >
      {/* Left Side - Text Content (Always Centered Vertically) */}
      <div className="w-1/2 flex items-center justify-center px-16 bg-white">
        <div className="max-w-xl w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={stories[currentIndex].id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
            >
              <h1 className="mb-6">{stories[currentIndex].title}</h1>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {stories[currentIndex].description}
              </p>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                {/* Progress Indicators */}
                <div className="flex gap-2">
                  {stories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? "w-8 bg-black"
                          : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  disabled={currentIndex === stories.length - 1}
                  className="rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Hint Text */}
              <p className="text-gray-400 text-sm mt-6">
                Scroll with mouse wheel to flip through stories
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side - Sticky Image */}
      <div className="w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        {/* Phone Mockup */}
        <div className="relative">
          {/* Phone Frame */}
          <div className="relative w-[340px] h-[680px] bg-black rounded-[50px] p-3 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20"></div>

            {/* Screen */}
            <div className="relative w-full h-full bg-white rounded-[38px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stories[currentIndex].id}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.7, ease: "easeInOut" },
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={stories[currentIndex].image}
                    alt={stories[currentIndex].title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Power Button */}
          <div className="absolute right-0 top-32 w-1 h-16 bg-gray-800 rounded-l-sm"></div>

          {/* Volume Buttons */}
          <div className="absolute left-0 top-28 w-1 h-12 bg-gray-800 rounded-r-sm"></div>
          <div className="absolute left-0 top-44 w-1 h-12 bg-gray-800 rounded-r-sm"></div>
        </div>
      </div>

      {/* Keyboard Navigation */}
      <div
        className="absolute inset-0 pointer-events-none"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            handleNext();
          } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            handlePrevious();
          }
        }}
        style={{ outline: "none" }}
      />
    </div>
  );
}
