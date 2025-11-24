// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import MediaCard from "../common/mediaCard";
// import { Button } from "../ui/button";
// import { useLanguage } from "@/app/contexts/LanguageContext";
// import { mediaItems } from "../../../data/mediaItem";

// export default function SimilarMedia() {
//   const [expanded, setExpanded] = useState(false);
//   const { currentLanguageCode } = useLanguage();

//   const handleToggle = () => setExpanded(!expanded);
//   return (
//     <section className="bg-white relative min-h-full md:py-20 lg:py-4 py-15">
//       {/* Section Heading */}
//       {/* <div className="text-left mb-12 lg:mb-16 md:mb-16 gap-1">
//         {/* <div className="flex items-center mb-4 md:mb-4 ">
//           <h5 className="font-[Inter] text-[24px] font-bold tracking-[2px] text-beasy-gradient opacity-80 mr-4">
//           You might also like
//           </h5>
//         </div> */}
//         {/* <h2 className="text-[24px] md:text-[32px] font-bold text-black font-[Inter] tracking-[4px]">
//           Read Our Latest Articles
//         </h2> */}
//       {/* </div>  */}

//        <div className="text-left mb-10 gap-1" data-aos="fade-down">

//         <h2 className="lg:text-[24px] text-xl md:text-xl font-bold text-beasy-gradient font-inter  leading-normal tracking-[4px]">
//           You might also like
//         </h2>
//       </div>

// <div
//        className="
//           flex md:flex
//            lg:grid-cols-4
//           gap-6 lg:gap-8 md:gap-8
//           overflow-x-auto
//           scrollbar-hide
//         "
//       >
//       {/* Cards Grid */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-8 md:gap-10"> */}
//         {(expanded ? mediaItems : mediaItems.slice(0, 4)).map((item, index) => (
//           <Link
//             key={index}
//             href={`/${currentLanguageCode}/media-detail/${index}`}
//             className="hover:opacity-90 transition"
//             data-aos="fade-up"
//             data-aos-delay={index * 150}
//           >
//             <MediaCard
//               image={item.image}
//               date={item.date}
//               title={item.title}
//               description={item.description}
//             />
//           </Link>
//         ))}
//       </div>

//       {/* Toggle Button */}
//       {/* <div className="mt-16 mb-16 flex justify-center">
//         <Button
//           variant="outline"
//           className="px-8 py-3 text-[#1A1A1A] rounded-[30px] lg:h-[44px] hover:bg-blue-900 hover:text-white transition-all duration-300 font-medium"
//           onClick={handleToggle}
//         >
//           {expanded ? "Show Less" : "View More"}
//         </Button>
//       </div> */}
//     </section>
//   );
// }

//this
// "use client";

// import Link from "next/link";
// import MediaCard from "../common/mediaCard";
// import { useLanguage } from "@/app/contexts/LanguageContext";
// import { useTranslate } from "@/app/hooks/useTranslate";
// import { mediaItems as mediaItemsFallback } from "../../../data/mediaItem";

// interface SimilarMediaProps {
//   excludeId?: number;
//   limit?: number;
// }

// export default function SimilarMedia({ excludeId, limit = 4 }: SimilarMediaProps) {
//   const { currentLanguageCode } = useLanguage();
//   const { getSection } = useTranslate();

//   const mediaSection = getSection("media") as any;
//   const itemsSource: any[] = Array.isArray(mediaSection?.articles)
//     ? mediaSection.articles
//     : mediaItemsFallback;

//   // Filter out current article
//   const filtered = itemsSource.filter((item) => {
//     const idNum = Number(item?.id);
//     const exNum = Number(excludeId);
//     return !Number.isFinite(exNum) || idNum !== exNum;
//   });

//   const itemsToShow = filtered.slice(0, limit);

//   if (!itemsToShow.length) return null;

//   return (
//     <section className="bg-white md:py-0 lg:py-5 ">
//       <div className="mb-5" data-aos="fade-down">
//         <h2 className="lg:text-[24px] text-xl font-bold text-beasy-gradient font-inter tracking-[4px]">
//           You might also like
//         </h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
//         {itemsToShow.map((item, index) => (
//           <Link
//             key={item?.id ?? index}
//             href={`/${currentLanguageCode}/media-detail/${item?.id ?? index}`}
//             className="hover:opacity-90 transition block"
//             data-aos="fade-up"
//             data-aos-delay={index * 120}
//           >
//             <MediaCard
//               image={item.image}
//               date={item.date}
//               title={item.title}
//               body={item.body}
//             />
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }



"use client";

import Link from "next/link";
import MediaCard from "../common/mediaCard";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { useTranslate } from "@/app/hooks/useTranslate";
import { mediaItems as mediaItemsFallback } from "../../../data/mediaItem";

interface SimilarMediaProps {
  excludeId?: number;
  limit?: number;
}

export default function SimilarMedia({ excludeId, limit = 4 }: SimilarMediaProps) {
  const { currentLanguageCode } = useLanguage();
  const { getSection } = useTranslate();

  const mediaSection = getSection("media") as any;
  const itemsSource: any[] = Array.isArray(mediaSection?.articles)
    ? mediaSection.articles
    : mediaItemsFallback;

  const filtered = itemsSource.filter((item) => {
    const idNum = Number(item?.id);
    const exNum = Number(excludeId);
    return !Number.isFinite(exNum) || idNum !== exNum;
  });

  const itemsToShow = filtered.slice(0, limit);

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