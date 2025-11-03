// 'use client';

// import { useParams } from "react-router-dom";
// import { Clock } from "lucide-react";
// import { useTranslate } from "@/app/hooks/useTranslate";

// export default function MediaDetail() {
//   const { id } = useParams<{ id: string }>();
//   const { t } = useTranslate();

//   // ✅ Get articles safely
//   const articles = (t("articles", { returnObjects: true }) as Array<any>) || [];

//   // ✅ Find article by ID instead of array index
//   const article = articles.find((a) => String(a.id) === id);

//   if (!article) {
//     return (
//       <p className="text-center text-gray-500 py-20">
//         Article not found.
//       </p>
//     );
//   }

//   // ✅ Prepare images
//   const albumImages: string[] = article.images || (article.image ? [article.image] : []);

//   return (
//     <div className="bg-white text-black py-20 px-6 relative">
//       <div className="lg:px-10">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10">
//           <h1 className="text-3xl md:text-4xl font-bold font-inter tracking-wide mb-4 lg:mb-0">
//             {article.title}
//           </h1>
//           <div className="flex items-center gap-2 text-gray-500">
//             <Clock size={14} />
//             <span className="text-sm">{article.date}</span>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mb-12" data-aos="fade-up">
//           <p className="text-gray-800 opacity-90 font-inter text-base leading-relaxed">
//             {article.description}
//           </p>
//         </div>

//         {/* Gallery Section */}
//         {albumImages.length > 0 && (
//           <div className="space-y-6">
//             {/* Section Header */}
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-semibold mb-1">Gallery</h2>
//                 <p className="text-gray-400 text-sm">{albumImages.length} images</p>
//               </div>
//             </div>

//             {/* Image Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
//               {albumImages.map((img, index) => (
//                 <div
//                   key={index}
//                   className="group relative overflow-hidden bg-gray-900 aspect-[4/3] cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
//                   data-aos="fade-up"
//                   data-aos-delay={index * 100}
//                 >
//                   <img
//                     src={img}
//                     alt={`${article.title} - image ${index + 1}`}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                     loading="lazy"
//                   />

//                   {/* Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

//                   {/* Badge */}
//                   <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-black text-xs px-2 py-1 rounded-full font-medium">
//                     {index + 1}
//                   </div>

//                   {/* Bottom Info */}
//                   <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
//                     <span className="text-black text-sm font-medium">
//                       Image {index + 1}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useTranslate } from "@/app/hooks/useTranslate";

import { mediaItems as mediaItemsFallback } from "../../../../data/mediaItem";
import { Clock } from "lucide-react";
import SimilarMedia from "@/app/components/sections/similarMedia";

export default function MediaDetail() {
  const params = useParams();
  const { getSection } = useTranslate();

  const idParam = params?.id;
  const idNum = idParam ? Number(idParam) : NaN;

  // Try translations first
  const mediaSection = getSection("media") as any;
  const translatedArticles: any[] = Array.isArray(mediaSection?.articles)
    ? mediaSection.articles
    : [];

  // Find article by numeric id, falling back to index if necessary
  let article = translatedArticles.find((a) => Number(a?.id) === idNum);

  // Fallback to data/mediaItem if no translated article found
  if (!article) {
    article =
      (mediaItemsFallback.find((a) => Number(a?.id) === idNum) as any) ||
      // last resort: treat id as zero-based index into fallback array
      (Number.isFinite(idNum) ? (mediaItemsFallback[idNum] as any) : undefined);
  }

  if (!article) {
    return (
      <div className="text-center py-20 text-gray-600">Article not found.</div>
    );
  }

  const albumImages: string[] = Array.isArray(article?.images)
    ? article.images
    : article?.images
    ? [article.images]
    : [];

  // const albumImages = Array.isArray(article.image)
  // ? article.image
  // : article.image
  // ? [article.image]
  // : [];

  return (
    <section className="bg-white relative text-black py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col md:flex-col md:mb-10 justify-between items-start lg:items-center lg:py-3 lg:flex-row mb-10 lg:mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-black text-[24px] sm:text-[28px] md:text-[32px] leading-normal tracking-[2px] sm:tracking-[3px] md:tracking-[4px] mb-6 md:mb-8 sm:mb-0 lg:mb-0">
            {article.title}
          </h1>
          <div className="flex items-center gap-1 sm:gap-2 text-gray-500">
            <Clock size={12} />
            <span className="text-xs sm:text-sm">{article.date}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-12 " data-aos="fade-up">
          <p className="text-black opacity-80 text-base not-italic font-normal  w-full">
            {article.description}
          </p>
        </div>

        {/* Image Album */}
        {albumImages.length > 0 && (
          <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-black mb-2">
                  Gallery
                </h2>
                <p className="text-gray-400 text-sm">
                  {albumImages.length} images
                </p>
              </div>
            </div>

            {/* Enhanced Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
              {albumImages.map((img, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-gray-900 aspect-[4/3] cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Image */}
                  <Image
                    src={img}
                    alt={`Article image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute  inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                  {/* Hover Content */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                  {/* Image Number Badge */}
                  <div className="absolute top-3 left-3 bg-white backdrop-blur-sm text-black text-xs px-2 py-1 rounded-full font-medium">
                    {index + 1}
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">
                        Image {index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className=" mt-10 lg:mt-20 mb-0">
          <SimilarMedia />
        </div>
      </div>
    </section>
  );
}
