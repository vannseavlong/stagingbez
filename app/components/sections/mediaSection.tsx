"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { useTranslate } from "@/app/hooks/useTranslate";
import { sortByLatest } from "@/lib/utils";

export default function Media() {
  const { currentLanguageCode } = useLanguage();
  // const { getSection } = useTranslate();

  const { getSection, t } = useTranslate();
  const mediaSection = getSection("media") as any;
  const subtitle = t(
    "media.header.subtitle",
    mediaSection?.header?.subtitle || "Media"
  );
  const itemsSource: any[] = Array.isArray(mediaSection?.articles)
    ? mediaSection.articles
    : [];

  // Sort articles newest-first using `sortDate`
  const itemsToShow = sortByLatest(itemsSource as any) as typeof itemsSource;

  return (
    <section className="bg-white relative md:py-20 py-12">
      {/* Heading */}
      <div
        className="max-w-4xl mx-auto text-center px-6 mb-12 md:mb-16"
        data-aos="fade-down"
      >
        <span
          className="text-[16px] md:text-[16px] font-bold uppercase leading-8 tracking-wide font-sans mb-4 inline-block"
          style={{
            background: "linear-gradient(90deg,#1B4CFA,#102C90)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {subtitle}
        </span>
        <h2 className="text-[24px] md:text-[32px] font-bold text-black">
          {mediaSection?.header?.title}
        </h2>
        <p className="mt-4 text-[16px] md:text-[18px] text-black/90">
          {mediaSection?.header?.description || ""}
        </p>
      </div>

      {/* testing */}

      {/* Article list */}
      <div className="flex flex-col gap-12 max-w-6xl mx-auto px-6">
        {itemsToShow.map((article, index) => {
          const href = `/${currentLanguageCode}/media-detail/${
            article.id ?? index
          }`;
          return (
            <Link
              key={article.id ?? index}
              href={href}
              className="group grid grid-cols-1 md:grid-cols-2 gap-6 items-start md:gap-10"
              data-aos="fade-up"
              data-aos-delay={index * 120}
            >
              {/* Image */}
              {article.image && (
                <div className="order-1 md:order-2 flex justify-start md:justify-end">
                  <div className="relative w-full md:w-auto max-w-[444px]">
                    <Image
                      src={article.image}
                      alt={article.title || "Media image"}
                      width={444}
                      height={250}
                      className="w-full md:w-[444px] h-[250px] object-cover  transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* Text */}
              <div className="flex flex-col order-2 md:order-1 justify-center space-y-3">
                {article.date && (
                  <span className="text-[16px] md:text-[16px] font-medium text-black/50">
                    {article.date}
                  </span>
                )}
                <h3 className="text-[20px] md:text-[24px] font-semibold text-black group-hover:text-beasy-gradient transition-colors">
                  {article.title || "Untitled"}
                </h3>
                <p className="text-[16px] md:text-[18px] text-black/70 line-clamp-3">
                  {article.body || "No description available."}
                </p>
                <span className="text-beasy-gradient text-sm font-medium inline-flex items-center gap-1">
                  Read more
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
