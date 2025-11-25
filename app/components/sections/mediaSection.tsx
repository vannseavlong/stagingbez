
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import MediaCard from "../common/mediaCard";
// // import { Button } from "../ui/button";
// import { useLanguage } from "@/app/contexts/LanguageContext";
// import { mediaItems as mediaItemsFallback } from "../../../data/mediaItem";
// import { useTranslate } from "@/app/hooks/useTranslate";

// export default function Media() {
//   const [expanded, setExpanded] = useState(false);
//   const { currentLanguageCode } = useLanguage();
//   const { getSection } = useTranslate();


//   const mediaSection = getSection("media") as {
//     header?: { subtitle?: string; title?: string };
//     articles?: Array<{
//       id?: number;
//       image?: string;
//       date?: string;
//       title?: string;
//       description?: string;
//     }>;
//   };

//   const items = Array.isArray(mediaSection.articles)
//     ? mediaSection.articles
//     : mediaItemsFallback;

//   const itemsToShow = expanded ? items : items.slice(0, 4);

//   return (
//     <section className="bg-white relative min-h-full md:py-20 lg:py-4 py-15">
//       {/* Section Heading */}
//       <div className="text-left mb-5 lg:mb-0 md:mb-0 gap-1">
//         <div className="flex items-center mb-4 md:mb-4 lg:mb-4">
//           <h5 className="text-base font-bold tracking-[2px] text-beasy-gradient opacity-80 mr-4">
//             {mediaSection.header?.subtitle || "Media"}
//           </h5>
//         </div>
//         <h2 className="text-[24px] md:text-[32px] font-bold text-black tracking-[4px]">
//           {mediaSection.header?.title || "Read Our Latest Articles"}
//         </h2>
//       </div>



//       <div
//         className="
//           flex md:flex
//            lg:grid-cols-4 
//           gap-6 lg:gap-8 md:gap-8 
//           overflow-x-auto 
//          hide-scrollbar
//         "
//       >
//         {itemsToShow.map((item, index) => (
//           <Link
//             key={item?.id ?? index}
//             href={`/${currentLanguageCode}/media-detail/${item?.id ?? index}`}
//             className="hover:opacity-90 transition flex-shrink-0 w-[80%] sm:w-[60%] md:w-auto"
//             data-aos="fade-up"
//             data-aos-delay={index * 150}
//           >
//             <MediaCard
//               image={item.image || ""}
//               date={item.date || ""}
//               title={item.title || ""}
//               description={item.description || ""}
//             />
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }





// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import MediaCard from "../common/mediaCard";
// // import { Button } from "../ui/button";
// import { useLanguage } from "@/app/contexts/LanguageContext";
// import { mediaItems as mediaItemsFallback } from "../../../data/mediaItem";
// import { useTranslate } from "@/app/hooks/useTranslate";

// export default function Media() {
//   const [expanded, setExpanded] = useState(false);
//   const { currentLanguageCode } = useLanguage();
//   const { getSection } = useTranslate();


//   const mediaSection = getSection("media") as {
//     header?: { subtitle?: string; title?: string };
//     articles?: Array<{
//       id?: number;
//       image?: string;
//       date?: string;
//       title?: string;
//       description?: string;
//     }>;
//   };

//   const items = Array.isArray(mediaSection.articles)
//     ? mediaSection.articles
//     : mediaItemsFallback;

//   const itemsToShow = expanded ? items : items.slice(0, 4);

//   return (
//     <section className="bg-white relative min-h-full md:py-20 lg:py-4 py-15">
//       {/* Section Heading */}

//       <div
//         className="max-w-7xl mx-auto text-center mb-6 md:mb-16 lg:mb-30"
//         data-aos="fade-down"
//       >
//         <h2 className=" text-center text-[24px] lg:text-[16px] not-italic font-semibold leading-normal tracking-[4px] md:text-[32px] lg-text-[32px]  text-beasy-gradient  mb-6  md:mb-10 lg:mb-5">
//           {mediaSection.header?.subtitle || "Media"}
//         </h2>
//         <p className="text-black mt-6  text-[24px] font-bold max-w-2xl mx-auto">
//           {mediaSection.header?.title || "Read Our Latest Articles"}
//         </p>

//         <p className="text-black mt-6 text-base max-w-2xl mx-auto">
//           {mediaSection.header?.title || "Stay in the loop with our latest articles and stories. Explore insights, tips, and updates that keep you inspired and informed."}
//         </p>

//       </div>



//       {/* <div
//         className="
//           flex md:flex
//            lg:grid-cols-4 
//           gap-6 lg:gap-8 md:gap-8 
//           overflow-x-auto 
//          hide-scrollbar
//         "
//       >
//         {itemsToShow.map((item, index) => (
//           <Link
//             key={item?.id ?? index}
//             href={`/${currentLanguageCode}/media-detail/${item?.id ?? index}`}
//             className="hover:opacity-90 transition flex-shrink-0 w-[80%] sm:w-[60%] md:w-auto"
//             data-aos="fade-up"
//             data-aos-delay={index * 150}
//           >
//             <MediaCard
//               image={item.image || ""}
//               date={item.date || ""}
//               title={item.title || ""}
//               description={item.description || ""}
//             />
//           </Link>
//         ))}
//       </div> */}



//       <div className="flex flex-col gap-16">
//         {Array.isArray(articles) &&
//           articles.slice(0, visibleCount).map((article, index) => (
//             <Link
//               key={index}
//               to={`/media/article/${index}`}
//               className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8 md:pt-0 cursor-pointer hover:opacity-90 transition"
             
//             >
//               {/* Text */}
//               <div className="flex flex-col gap-4 md:gap-1 order-2 md:order-1">
//                 <span className="text-white/80 font-light text-base">{article.date}</span>
//                 <p className="text-white font-inter md:text-[24px] lg:text-[24px] not-italic font-semibold leading-normal tracking-[2px] text-xl md:text-xl lg:text-2xl  mb-5">{article.title}</p>
//                 <p className=" text-white  font-inter text-base not-italic font-medium leading-normal  lg:text-[16px] opacity-80 line-clamp-3">{article.description}</p>
//               </div>
//               {/* Image */}
//               {article.image && (
//                 <div className="order-1 md:order-2 flex items-center justify-start md:justify-end">
//                   <img
//                     src={article.image}
//                     alt={article.title}
//                     className="w-full md:w-[322px] h-[215px] lg:w-[350px] lg:h-[250px] object-cover"
//                   />
//                 </div>
//               )}
//             </Link>
//           ))}
//       </div>



//     </section>
//   );
// }




//this

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useLanguage } from "@/app/contexts/LanguageContext";
// import { useTranslate } from "@/app/hooks/useTranslate";
// import { mediaItems as mediaItemsFallback } from "../../../data/mediaItem";

// interface MediaArticle {
//   body?: string;
//   id?: number;
//   image?: string;
//   date?: string;
//   title?: string;
//   description?: string;
  
// }

// export default function Media() {
//   const { currentLanguageCode } = useLanguage();
//   const { getSection } = useTranslate();
//   const [visibleCount, setVisibleCount] = useState(4);

//   const mediaSection = getSection("media") as {
//     header?: { subtitle?: string; title?: string; description?: string; body?: string };
//     articles?: MediaArticle[];
//   };

//   const items: MediaArticle[] = Array.isArray(mediaSection?.articles)
//     ? mediaSection.articles
//     : mediaItemsFallback;

//   const canLoadMore = visibleCount < items.length;
//   const itemsToShow = items.slice(0, visibleCount);

//   return (
//     <section className="bg-white relative md:py-20 py-12">
//       {/* Heading */}
//       <div className="max-w-4xl mx-auto text-center px-6 mb-13 md:mb-20 lg:mb-20" data-aos="fade-down">
//         <h5 className="text-base md:text-base font-bold tracking-[2px] text-beasy-gradient opacity-80 mb-4">
//           {mediaSection?.header?.subtitle }
//         </h5>
//         <h2 className="text-[24px] md:text-[32px]lg:text-[32px] font-bold text-black mb-6">
//           {mediaSection?.header?.title }
//         </h2>
//         <p className="mt-4 text-base md:text-[18px] lg:text-[18px] text-black/70">
//           {mediaSection?.header?.description }
//         </p>
//       </div>

//       {/* Article list */}
//       <div className="flex flex-col gap-8 md:gap-16 lg:gap-16 max-w-7xl mx-auto ">
//         {itemsToShow.map((article, index) => {
//           const href = `/${currentLanguageCode}/media-detail/${article.id ?? index}`;
//           return (
//             <Link
//               key={article.id ?? index}
//               href={href}
//               className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 lg:gap-10 cursor-pointer"
//               data-aos="fade-up"
//               data-aos-delay={index * 120}
//             >
//               {/* Image */}
//               {article.image && (
//                 <div className="order-1 md:order-2 lg:items-end lg:justify-end md:items-center md:justify-center flex">
//                   <div className="relative w-full max-w-[444px] lg:items-end lg:justify-end">
//                     <img
//                       src={article.image}
//                       alt={article.title || "Media image"}
//                       className=" w-[444px] h-[250px] lg:h-[250px] md:h-[180px] lg:items-end lg:justify-end md:items-center md:justify-center object-cover transition-transform duration-300 group-hover:scale-[1.03]"
//                       loading="lazy"
//                       decoding="async"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Text */}
//               <div className="flex flex-col order-2 md:order-1 justify-center mt-5 md:mt-0">
//                 {article.date && (
//                   <span className="text-base md:text-base lg:text-base font-medium text-black/50 mb-4">
//                     {article.date}
//                   </span>
//                 )}
//                 <h3 className="text-[20px] lg:text-[24px] md:text-[20px] font-semibold mb-6 tracking-[1px] md:tracking-[2px] text-black group-hover:text-beasy-gradient transition-colors">
//                   {article.title || "Untitled"}
//                 </h3>
//                 <p className="text-sm lg:text-base md:text-base text-black/70 mb-6 line-clamp-3">
//                   {article.body || "No description available."}
//                 </p>
//                 <span className="text-beasy-gradient text-sm font-medium mt-2 inline-flex items-center gap-1">
//                   Read more
                  
//                 </span>
//               </div>
//             </Link>
//           );
//         })}
//       </div>

      
//     </section>
//   );
// }



"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { useTranslate } from "@/app/hooks/useTranslate";
import { mediaItems as mediaItemsFallback } from "../../../data/mediaItem";

export default function Media() {
  const { currentLanguageCode } = useLanguage();
  const { getSection } = useTranslate();

  const mediaSection = getSection("media") as any;
  const itemsSource: any[] = Array.isArray(mediaSection?.articles)
    ? mediaSection.articles
    : mediaItemsFallback;

  const itemsToShow = itemsSource.slice(0, 4);

  return (
    <section className="bg-white relative md:py-20 py-12">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-12 md:mb-16" data-aos="fade-down">
        <h5 className="text-base md:text-lg font-bold tracking-[3px] text-beasy-gradient opacity-80 mb-4">
          {mediaSection?.header?.subtitle || "Media"}
        </h5>
        <h2 className="text-[24px] md:text-[32px] font-bold text-black">
          {mediaSection?.header?.title }
        </h2>
        <p className="mt-4 text-sm md:text-base text-black/90">
          {mediaSection?.header?.description || ""}
        </p>
      </div>

      {/* testing */}

      {/* Article list */}
      <div className="flex flex-col gap-12 max-w-6xl mx-auto px-6">
        {itemsToShow.map((article, index) => {
          const href = `/${currentLanguageCode}/media-detail/${article.id ?? index}`;
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
                  <span className="text-sm md:text-sm font-medium text-black/50">
                    {article.date}
                  </span>
                )}
                <h3 className="text-lg lg:text-[20px] font-semibold tracking-[1px] md:tracking-[2px] text-black group-hover:text-beasy-gradient transition-colors">
                  {article.title || "Untitled"}
                </h3>
                <p className="text-sm lg:text-base text-black/70 line-clamp-3">
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