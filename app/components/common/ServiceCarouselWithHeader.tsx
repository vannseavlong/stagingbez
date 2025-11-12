"use client";
import React, { ReactNode, useRef } from "react";
import ServiceCarousel, { ServiceCarouselHandle } from "./ServiceCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

export default function ServiceCarouselWithHeader({
  title,
  subtitle,
  children,
}: Props) {
  const ref = useRef<ServiceCarouselHandle | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          {subtitle && (
            <p className="text-sm font-semibold text-[#0f4ac9]">{subtitle}</p>
          )}
          {title && <h3 className="text-2xl font-bold mt-2">{title}</h3>}
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => ref.current?.prev()}
            aria-label="previous"
            className="border rounded-full border-gray-400 p-1.5 md:p-2 hover:bg-gray-300 transition"
          >
            <ChevronLeft className="text-black" />
          </button>
          <button
            onClick={() => ref.current?.next()}
            aria-label="next"
            className="border rounded-full border-gray-400 p-1.5 md:p-2 hover:bg-gray-300 transition"
          >
            <ChevronRight className="text-black" />
          </button>
        </div>
      </div>

      <ServiceCarousel ref={ref}>{children}</ServiceCarousel>
    </div>
  );
}
