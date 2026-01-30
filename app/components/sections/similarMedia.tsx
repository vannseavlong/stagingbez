"use client";

import Link from "next/link";
import MediaCard from "../common/mediaCard";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { useTranslate } from "@/app/hooks/useTranslate";
import { sortByLatest } from "@/lib/utils";

interface SimilarMediaProps {
  excludeId?: number;
  limit?: number;
}

export default function SimilarMedia({
  excludeId,
  limit = 4,
}: SimilarMediaProps) {
  const { currentLanguageCode } = useLanguage();
  const { getSection } = useTranslate();

  const mediaSection = getSection("media") as any;
  const itemsSource: any[] = Array.isArray(mediaSection?.articles)
    ? mediaSection.articles
    : [];

  const filtered = itemsSource.filter((item) => {
    const idNum = Number(item?.id);
    const exNum = Number(excludeId);
    return !Number.isFinite(exNum) || idNum !== exNum;
  });

  // Show all items except the excluded id, sorted newest-first
  const itemsToShow = sortByLatest(filtered as any) as typeof filtered;

  if (!itemsToShow.length) return null;

  return (
    <section className="bg-white md:py-5 py-5">
      <div className="mb-5" data-aos="fade-down">
        <h2 className="lg:text-[24px] text-xl font-bold text-black font-inter ">
          You Might Also Like
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {itemsToShow.map((item, index) => (
          <Link
            key={item?.id ?? index}
            href={`/${currentLanguageCode}/media-detail/${item?.id ?? index}`}
            className="hover:opacity-90 transition block"
            data-aos="fade-up"
            data-aos-delay={index * 120}
          >
            <MediaCard
              image={item.image}
              date={item.date}
              title={item.title}
              body={item.body}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
