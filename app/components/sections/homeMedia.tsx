"use client";

import React from "react";
import Link from "next/link";
import MediaCard from "../common/mediaCard";
// import { Button } from "../ui/button";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { useTranslate } from "@/app/hooks/useTranslate";
import { sortByLatest } from "@/lib/utils";

export default function HomeMedia() {
  const { currentLanguageCode } = useLanguage();
  const { getSection, t } = useTranslate();


  const mediaSection = getSection("media") as {
    header?: { subtitle?: string; title?: string,media?:string,ReadLatest?:string };
    articles?: Array<{
      id?: number;
      image?: string;
      date?: string;
      title?: string;
      body?: string;
      
    }>;
  };

  const items = Array.isArray(mediaSection.articles) ? mediaSection.articles : [];
  const itemsToShow = sortByLatest(items as any) as typeof items;

  return (
    <section className="bg-white relative min-h-full md:py-20 lg:py-4 py-15">
      {/* Section Heading */}
      <div className="text-left mb-5 lg:mb-0 md:mb-0 gap-1">
        <div className="flex items-center mb-4 md:mb-4 lg:mb-4">
          <span
            className="text-[16px] md:text-[16px] font-bold uppercase leading-8 tracking-wide font-sans mr-4 inline-block"
            style={{
              background: "linear-gradient(90deg,#1B4CFA,#102C90)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {t("media.header.media", mediaSection.header?.media || "Media")}
          </span>
        </div>
        <h2 className="text-[24px] md:text-[32px] font-bold text-black ">
          {mediaSection.header?.ReadLatest || "Read Our Latest Articles"}
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