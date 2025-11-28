"use client";

import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/app/contexts/LanguageContext";

interface ServiceCardProps {
  id: number | string;
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
}
export default function ServiceCard({
  id,
  image,
  title,
  description,
  onClick,
}: ServiceCardProps) {
  const { currentLanguageCode } = useLanguage();
  return (
    <div
      className="flex flex-col text-left w-[250px]  flex-shrink-0"
      onClick={() => {
        try {
          trackEvent("service_card_click", { title });
        } catch {}
        if (onClick) onClick();
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Image */}
      <div className="w-[250px] h-[250px] overflow-hidden  mb-6">
        <Image
          src={image}
          alt={title}
          width={250}
          height={250}
          className="w-[250px] h-[250px] object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Title */}
      <h3 className="text-black text-[18px] md:text-lg font-bold tracking-wide mb-4 font-sans">
        {title}
      </h3>

      {/* Description */}
      <p className="text-black text-[16px] md:text-[16px] leading-[28px] opacity-80 ">
        {description}
      </p>

      {/* View More link */}
      <div className="mt-4">
        <Link
          href={`/${currentLanguageCode}/service-detail/${id}`}
          onClick={(e) => {
            // prevent parent click handlers (analytics/onClick) from also firing
            e.stopPropagation();
          }}
          className="view-more text-sm"
        >
          View More
        </Link>
      </div>
    </div>
  );
}
