import Image from "next/image";
import React from "react";
import { useTranslate } from "@/app/hooks/useTranslate";

type SeenOnLink = {
  href: string;
  img: string;
  alt: string;
};

type Section = {
  header?: { title?: string };
  links?: SeenOnLink[];
};

const SeenOnSection: React.FC = () => {
  const { getSection } = useTranslate();
  const seenOn = getSection("seenOn") as Section;

  const header = seenOn?.header || { title: "As Seen On" };
  const seenOnLinks = seenOn?.links || [
    {
      href: "https://www.postkhmer.com/gallery/2025-10-25-1016-257424?fbclid=IwY2xjawNpLOVleHRuA2FlbQIxMQBicmlkETFBV0xHUkNVWTRSZmU1ZjBoAR6lfM-4nqHOm5dKnHkH3OngmTHfF3Y4PsRhVn98wyfjsA3xR9TmJ81A7vmXCA_aem_aCtRLUJAi7w_i1o5uK6c5w",
      img: "/images/Seen/PP-post.webp",
      alt: "Post Khmer",
    },
    {
      href: "https://plus.freshnewsasia.com/freshnewsplus/406065-2025-10-25-11-13-04",
      img: "/images/Seen/FreshNews.webp",
      alt: "Fresh News",
    },
  ];

  return (
    <section className="w-full bg-white m-0 p-0">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 pt-8 lg:pt-16">
        <div className="flex flex-row items-center w-full max-[600px]:flex-col max-[600px]:items-center">
          <div
            className="text-[#b0b0b0] text-2xl font-semibold mb-0 mr-12 text-left whitespace-nowrap
            max-[900px]:mr-8
            md:text-center md:mb-0 md:mr-8
            max-[900px]:text-center max-[900px]:w-full
            max-[600px]:text-center max-[600px]:text-[1.5rem] max-[600px]:mb-4 max-[600px]:mr-0"
            style={{ width: "fit-content" }}
          >
            {header.title}
          </div>
          <div className="flex flex-row gap-12 items-center max-[900px]:gap-8 max-[600px]:gap-4 max-[600px]:flex-row max-[600px]:justify-center">
            {seenOnLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  width={220}
                  height={60}
                  className="h-auto w-auto max-w-[220px] max-h-[60px]"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeenOnSection;
