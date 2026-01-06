"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ScrollItem {
  title: string;
  description: string;
  imageUrl: string;
}

interface MobileScrollProps {
  items: ScrollItem[];
}

export function MobileScroll({ items }: MobileScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${items.length * 120}vh` }}
    >
      {/* Sticky container that holds both text and image */}
      <div className="sticky top-[14vh] h-[80vh] flex flex-col items-center justify-center px-4 py-0">
        {/* Text area - sticky, replacing content */}
        <div className="w-full max-w-3xl mb-6">
          <div className="relative min-h-[140px] flex items-center justify-center">
            {items.map((item, index) => {
              const startProgress = index / items.length;
              const endProgress = (index + 1) / items.length;

              return (
                <TextItem
                  key={index}
                  item={item}
                  scrollYProgress={scrollYProgress}
                  startProgress={startProgress}
                  endProgress={endProgress}
                />
              );
            })}
          </div>
        </div>

        {/* Image area - sticky, replacing content */}
        <div className="w-full max-w-xl flex-1 max-h-[45vh]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            {items.map((item, index) => {
              const startProgress = index / items.length;
              const endProgress = (index + 1) / items.length;

              return (
                <ImageItem
                  key={index}
                  item={item}
                  scrollYProgress={scrollYProgress}
                  startProgress={startProgress}
                  endProgress={endProgress}
                  isPriority={index === 0}
                />
              );
            })}

            {/* Progress indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {items.map((_, index) => {
                const startProgress = index / items.length;
                const endProgress = (index + 1) / items.length;

                return (
                  <ProgressIndicator
                    key={index}
                    scrollYProgress={scrollYProgress}
                    startProgress={startProgress}
                    endProgress={endProgress}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Separate components for each animated item
function TextItem({
  item,
  scrollYProgress,
  startProgress,
  endProgress,
}: {
  item: ScrollItem;
  scrollYProgress: any;
  startProgress: number;
  endProgress: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [startProgress - 0.05, startProgress, endProgress - 0.05, endProgress],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [startProgress - 0.05, startProgress, endProgress - 0.05, endProgress],
    [20, 0, 0, -20]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center"
    >
      <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-4">
        {item.title}
      </h3>
      <p className="text-sm md:text-base font-medium text-[#1a1a1a]">
        {item.description}
      </p>
    </motion.div>
  );
}

function ImageItem({
  item,
  scrollYProgress,
  startProgress,
  endProgress,
  isPriority,
}: {
  item: ScrollItem;
  scrollYProgress: any;
  startProgress: number;
  endProgress: number;
  isPriority: boolean;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [startProgress - 0.05, startProgress, endProgress - 0.05, endProgress],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-full h-full">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-contain"
          priority={isPriority}
        />
      </div>
    </motion.div>
  );
}

function ProgressIndicator({
  scrollYProgress,
  startProgress,
  endProgress,
}: {
  scrollYProgress: any;
  startProgress: number;
  endProgress: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [startProgress, startProgress + 0.05, endProgress - 0.05, endProgress],
    [0.5, 1, 1, 0.5]
  );

  const width = useTransform(
    scrollYProgress,
    [startProgress, startProgress + 0.05, endProgress - 0.05, endProgress],
    [6, 24, 24, 6]
  );

  return (
    <motion.div
      style={{ opacity, width }}
      className="h-1.5 bg-white rounded-full transition-all"
    />
  );
}
