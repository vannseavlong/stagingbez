"use client";
import React, { useEffect, useState } from "react";
import DownloadAppButton from "@/app/components/common/DownloadAppButton";
import Image from "next/image";

type Slide = {
  landscape: string;
  portrait?: string;
  alt?: string;
};

type Props = {
  slides: Slide[];
  title?: string;
  description?: string;
  showDownloadButton?: boolean;
  intervalMs?: number;
  className?: string;
};

export default function Banner({
  slides,
  title,
  description,
  showDownloadButton = true,
  intervalMs = 5000,
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides, intervalMs]);

  return (
    <section
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* Image stack: portrait for small, landscape for lg+ */}
      <div className="absolute inset-0">
        {slides.map((s, i) => {
          const isActive = i === index;
          return (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              {/* portrait (mobile/tablet) */}
              {s.portrait && (
                <Image
                  src={s.portrait}
                  alt={s.alt || title || "banner"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 100vw"
                  style={{ objectFit: "cover" }}
                  className="block lg:hidden"
                />
              )}

              {/* landscape (desktop) */}
              <Image
                src={s.landscape}
                alt={s.alt || title || "banner"}
                fill
                sizes="(max-width: 1024px) 100vw, 100vw"
                style={{ objectFit: "cover" }}
                className="hidden lg:block"
              />
            </div>
          );
        })}
      </div>

      {/* Overlay content */}
      <div className="relative z-30 flex items-center justify-center h-full">
        <div className="text-center px-6 sm:px-8 lg:px-0 max-w-4xl">
          {title && (
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-md mb-4">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-sm md:text-lg text-white/90 mb-6">
              {description}
            </p>
          )}

          {showDownloadButton && (
            <div className="flex items-center justify-center">
              <DownloadAppButton />
            </div>
          )}
        </div>
      </div>

      {/* full-image uniform dim overlay so the title is readable on all slides */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-20" />
    </section>
  );
}
