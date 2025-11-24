
"use client";

import { useState } from "react";
import Link from "next/link";
import MediaCard from "../common/mediaCard";
// import { Button } from "../ui/button";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { mediaItems as mediaItemsFallback } from "../../../data/mediaItem";
import { useTranslate } from "@/app/hooks/useTranslate";

export default function HomeMedia() {
  const [expanded, setExpanded] = useState(false);
  const { currentLanguageCode } = useLanguage();
  const { getSection } = useTranslate();


  const mediaSection = getSection("media") as {
    header?: { subtitle?: string; title?: string };
    articles?: Array<{
      id?: number;
      image?: string;
      date?: string;
      title?: string;
      body?: string;
    }>;
  };

  const items = Array.isArray(mediaSection.articles)
    ? mediaSection.articles
    : mediaItemsFallback;

  const itemsToShow = expanded ? items : items.slice(0, 4);

  return (
    <section className="bg-white relative min-h-full md:py-20 lg:py-4 py-15">
      {/* Section Heading */}
      <div className="text-left mb-5 lg:mb-0 md:mb-0 gap-1">
        <div className="flex items-center mb-4 md:mb-4 lg:mb-4">
          <h5 className="text-base font-bold tracking-[2px] text-beasy-gradient opacity-80 mr-4">
            {mediaSection.header?.subtitle || "Media"}
          </h5>
        </div>
        <h2 className="text-[24px] md:text-[32px] font-bold text-black tracking-[4px]">
          {mediaSection.header?.title || "Read Our Latest Articles"}
        </h2>
      </div>



      <div
        className="
          flex md:flex
           lg:grid-cols-4 
          gap-6 lg:gap-8 md:gap-8 
          overflow-x-auto 
         hide-scrollbar
        "
      >
        {itemsToShow.map((item, index) => (
          <Link
            key={item?.id ?? index}
            href={`/${currentLanguageCode}/media-detail/${item?.id ?? index}`}
            className="hover:opacity-90 transition flex-shrink-0 w-[80%] sm:w-[60%] md:w-auto"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <MediaCard
              image={item.image || ""}
              date={item.date || ""}
              title={item.title || ""}
             body={item.body || ""}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
