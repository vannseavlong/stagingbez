"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ScrollItem {
  title: string;
  description: string;
  imageUrl: string;
}

interface DeskScrollProps {
  items: ScrollItem[];
}

export function DeskScroll({ items }: DeskScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${items.length * 100}vh` }}
    >
      {/* Sticky grid container holding BOTH columns */}
      <div className="sticky top-20 grid h-[80vh] items-center gap-2 lg:grid-cols-2 lg:gap-4 px-4">
        {/* Left Side - Text Steps */}
        <div className="relative h-full py-0">
          {items.map((item, index) => {
            const start = index / items.length;
            const end = (index + 1) / items.length;
            const middle = (start + end) / 2;

            return (
              <TextItem
                key={index}
                item={item}
                scrollYProgress={scrollYProgress}
                start={start}
                middle={middle}
                end={end}
              />
            );
          })}
        </div>

        {/* Right Side - Images */}
        <div className="relative h-full items-center flex">
          <div className="relative h-[420px] w-full">
            {items.map((item, index) => {
              const start = index / items.length;
              const end = (index + 1) / items.length;

              return (
                <ImageItem
                  key={index}
                  item={item}
                  scrollYProgress={scrollYProgress}
                  start={start}
                  end={end}
                  isPriority={index === 0}
                />
              );
            })}

            {/* Progress indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {items.map((_, index) => {
                const start = index / items.length;
                const end = (index + 1) / items.length;

                return (
                  <ProgressIndicator
                    key={index}
                    scrollYProgress={scrollYProgress}
                    start={start}
                    end={end}
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

// Text component with absolute positioning
function TextItem({
  item,
  scrollYProgress,
  start,
  middle,
  end,
}: {
  item: ScrollItem;
  scrollYProgress: any;
  start: number;
  middle: number;
  end: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.05, start + 0.05, middle, end - 0.05, end + 0.05],
    [0, 1, 1, 1, 0]
  );

  const y = useTransform(scrollYProgress, [start, middle, end], [30, 0, -30]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center pointer-events-none"
    >
      <div className="w-full">
        <h2 className="text-[20px] md:text-[24px] font-bold mb-6 text-[#1a1a1a]">
          {item.title}
        </h2>
        <p className="text-[16px] md:text-[18px] font-medium text-[#1a1a1a] max-w-xl">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

function ImageItem({
  item,
  scrollYProgress,
  start,
  end,
  isPriority,
}: {
  item: ScrollItem;
  scrollYProgress: any;
  start: number;
  end: number;
  isPriority: boolean;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.05, start, end, end + 0.05],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [start - 0.05, start, end, end + 0.05],
    [0.9, 1, 1, 0.9]
  );

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <div className="h-full w-full overflow-hidden">
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
  start,
  end,
}: {
  scrollYProgress: any;
  start: number;
  end: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0.5, 1, 1, 0.5]
  );

  const width = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [6, 32, 32, 6]
  );

  return (
    <motion.div
      style={{ opacity, width }}
      className="h-1.5 bg-white rounded-full transition-all"
    />
  );
}
