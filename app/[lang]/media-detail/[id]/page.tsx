"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useTranslate } from "@/app/hooks/useTranslate";
import SimilarMedia from "@/app/components/sections/similarMedia";
import InstallSection from "@/app/components/sections/InstallAppSection";
import { ReactNode } from "react";
import { sortByLatest } from "@/lib/utils";

interface MediaArticle {
  id?: number;
  image?: string;
  images?: string[] | string;
  date?: string;
  title?: string;
  description?: string;
  body?: string;
  sections?: Array<{
    heading?: string;
    content?: string;
    bullet?: string[];
    quote?: string;
  }>;
  highlight?: string;
}

export default function MediaDetail() {
  const params = useParams();
  const { getSection } = useTranslate();

  const idParam = params?.id;
  const idNum = idParam ? Number(idParam) : NaN;

  const mediaSection = getSection("media") as any;
  const translatedArticles: MediaArticle[] = Array.isArray(
    mediaSection?.articles
  )
    ? (sortByLatest(mediaSection.articles as any) as MediaArticle[])
    : [];

  const article: MediaArticle | any =
    translatedArticles.find((a) => Number(a?.id) === idNum);

  if (!article) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-600">Article not found.</p>
      </div>
    );
  }

  // Build paragraphs: prefer body, fall back to description
  const rawBody: string = String(article.body || article.description || "");
  const paragraphs = rawBody
    .split(/\n+/)
    .map((p: string) => p.trim())
    .filter(Boolean) as string[];

  return (
    <section className="bg-white text-black py-12 lg:py-20 md:py-16 pt-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-30 lg:px-75">
        {/* Hero Image */}
        {article.image && (
          <div className="mb-10 md:mb-12 items-center justify-center flex">
            <div className="relative lg:w-[900px] lg:h-[340px] w-[400px] h-[234px] md:w-[528px] md:h-[240px] spect-[16/9] overflow-hidden bg-gray-100">
              <Image
                src={article.image}
                alt={article.title || "Media Image"}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Title + Date */}
        <header
          className="mb-8 md:mb-10 flex flex-col gap-4"
          data-aos="fade-up"
        >
          <h1 className="text-[24px] md:text-[32px] font-bold leading-tight tracking-[2px] md:tracking-[3px]">
            {article.title || "Untitled"}
          </h1>
          {article.date && (
            <div className="flex items-center gap-2 text-gray-500 text-[16px] md:text-[16px]">
              <span>{article.date}</span>
            </div>
          )}
        </header>

        {/* Body paragraphs */}
        <div className="space-y-6 md:space-y-7 mb-12 ">
          {paragraphs.map((p: string, i: number) => (
            <p
              key={i}
              className="text-[16px] md:text-[18px] leading-relaxed font-normal"
              data-aos="fade-up"
              data-aos-delay={i * 60}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Highlight sentence */}
        {article.highlight && (
          <p
            className="font-semibold text-[16px] md:text-[18px] mb-6 md:mb-8"
            data-aos="fade-up"
          >
            {article.highlight}
          </p>
        )}

        {/* Structured sections */}
        {Array.isArray(article.sections) && article.sections.length > 0 && (
          <div className="space-y-10 md:space-y-12 mb-16">
            {article.sections.map((sec: any, idx: number) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
                className="space-y-4"
              >
                {sec.heading && (
                  <h2 className="text-[20px] md:text-[24px] font-semibold">
                    {idx + 1}. {sec.heading}
                  </h2>
                )}
                {sec.content && (
                  <p className="text-[16px] md:text-[18px] leading-relaxed text-black/80">
                    {sec.content}
                  </p>
                )}

                {sec.bullet && (
                  <ul className="list-disc list-inside text-[16px] md:text-[18px] leading-relaxed text-black/80">
                    {sec.bullet.map((item: any, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {sec.quote && (
                  <blockquote className="italic text-[16px] md:text-[18px] leading-relaxed text-black/80">
                    {sec.quote}
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Similar Articles */}
        <div className="mb-16 md:mb-24" data-aos="fade-up">
          <SimilarMedia excludeId={Number(article.id)} />
        </div>
      </div>

      <ContainWrapper>
        <section id="install">
          <InstallSection />
        </section>
      </ContainWrapper>
    </section>
  );
}

const ContainWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white">
      <div className="lg:max-w-[1440px] lg:mx-auto px-6 sm:px-8 lg:px-16">
        {children}
      </div>
    </div>
  );
};
