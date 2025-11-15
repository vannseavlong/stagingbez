

// "use client";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import { useTranslate } from "@/app/hooks/useTranslate";

// import { mediaItems as mediaItemsFallback } from "../../../../data/mediaItem";
// import { Clock } from "lucide-react";
// import SimilarMedia from "@/app/components/sections/similarMedia";
// import InstallSection from "@/app/components/sections/InstallAppSection";

// export default function MediaDetail() {
//   const params = useParams();
//   const { getSection } = useTranslate();

//   const idParam = params?.id;
//   const idNum = idParam ? Number(idParam) : NaN;

//   // Try translations first
//   const mediaSection = getSection("media") as any;
//   const translatedArticles: any[] = Array.isArray(mediaSection?.articles)
//     ? mediaSection.articles
//     : [];

//   // Find article by numeric id, falling back to index if necessary
//   let article = translatedArticles.find((a) => Number(a?.id) === idNum);

//   // Fallback to data/mediaItem if no translated article found
//   if (!article) {
//     article =
//       (mediaItemsFallback.find((a) => Number(a?.id) === idNum) as any) ||
//       // last resort: treat id as zero-based index into fallback array
//       (Number.isFinite(idNum) ? (mediaItemsFallback[idNum] as any) : undefined);
//   }

//   if (!article) {
//     return (
//       <div className="text-center py-20 text-gray-600">Article not found.</div>
//     );
//   }

//   const albumImages: string[] = Array.isArray(article?.images)
//     ? article.images
//     : article?.images
//     ? [article.images]
//     : [];



//   return (
//     <section className="bg-white relative text-black py-16">
//       <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
//         <div className="flex flex-col md:flex-col md:mb-10 justify-between items-start lg:items-center lg:py-3 lg:flex-row mb-10 lg:mb-6 sm:mb-12">
//           <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-black text-[24px] sm:text-[28px] md:text-[32px] leading-normal tracking-[2px] sm:tracking-[3px] md:tracking-[4px] mb-6 md:mb-8 sm:mb-0 lg:mb-0">
//             {article.title}
//           </h1>
//           <div className="flex items-center gap-1 sm:gap-2 text-gray-500">
//             <Clock size={12} />
//             <span className="text-xs sm:text-sm">{article.date}</span>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="mb-12 " data-aos="fade-up">
//           <p className="text-black opacity-80 text-base not-italic font-normal  w-full">
//             {article.description}
//           </p>
//         </div>

//         {/* Image Album */}
//         {albumImages.length > 0 && (
//           <div className="space-y-6">
//             {/* Section Header */}
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-semibold text-black mb-2">
//                   Gallery
//                 </h2>
//                 <p className="text-gray-400 text-sm">
//                   {albumImages.length} images
//                 </p>
//               </div>
//             </div>

//             {/* Enhanced Image Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
//               {albumImages.map((img, index) => (
//                 <div
//                   key={index}
//                   className="group relative overflow-hidden bg-gray-900 aspect-[4/3] cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
//                   data-aos="fade-up"
//                   data-aos-delay={index * 100}
//                 >
//                   {/* Image */}
//                   <Image
//                     src={img}
//                     alt={`Article image ${index + 1}`}
//                     fill
//                     className="object-cover transition-transform duration-500 group-hover:scale-110"
//                   />

//                   {/* Gradient Overlay */}
//                   <div className="absolute  inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

//                   {/* Hover Content */}
//                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

//                   {/* Image Number Badge */}
//                   <div className="absolute top-3 left-3 bg-white backdrop-blur-sm text-black text-xs px-2 py-1 rounded-full font-medium">
//                     {index + 1}
//                   </div>

//                   {/* Bottom Info Bar */}
//                   <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
//                     <div className="flex items-center justify-between">
//                       <span className="text-white text-sm font-medium">
//                         Image {index + 1}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className=" mt-10 lg:mt-20 mb-0">
//           <SimilarMedia />
//         </div>
//          <section id="install">
//                     <InstallSection />
//                   </section>
//       </div>
//     </section>
//   );
// }






"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useTranslate } from "@/app/hooks/useTranslate";
import { mediaItems as mediaItemsFallback } from "../../../../data/mediaItem";
import SimilarMedia from "@/app/components/sections/similarMedia";
import InstallSection from "@/app/components/sections/InstallAppSection";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

// interface MediaArticle {
//   id?: number;
//   image?: string;
//   images?: string[] | string;
//   date?: string;
//   title?: string;
//   description?: string;
//   body?: string;              
//   sections?: Array<{          
//     heading?: string;
//     content?: string;
//   }>;
//   highlight?: string;         
// }

// export default function MediaDetail() {
//   const params = useParams();
//   const { getSection } = useTranslate();

//   const idParam = params?.id;
//   const idNum = idParam ? Number(idParam) : NaN;

//   const mediaSection = getSection("media") as any;
//   const translatedArticles: MediaArticle[] = Array.isArray(mediaSection?.articles)
//     ? mediaSection.articles
//     : [];

//   let article =
//     translatedArticles.find((a) => Number(a?.id) === idNum) ||
//     mediaItemsFallback.find((a: any) => Number(a?.id) === idNum) ||
//     (Number.isFinite(idNum) ? (mediaItemsFallback[idNum] as any) : undefined);

//   if (!article) {
//     return (
//       <div className="text-center py-24">
//         <p className="text-gray-600">Article not found.</p>
//       </div>
//     );
//   }

  
//   // Build paragraphs: prefer body, fall back to description
//   const rawBody = article.body || article.description || "";
//   const paragraphs = rawBody
//     .split(/\n+/)
//     .map((p) => p.trim())
//     .filter(Boolean);

//   return (
//     <section className="bg-white text-black py-12 md:py-16">
//       <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-75">
//         {/* Hero Image */}
//         {article.image && (
//           <div className="mb-10 md:mb-12 items-center justify-center flex" >
//             <div className="relative w-[800px] h-[340px] items-center justify-center aspect-[16/9] overflow-hidden bg-gray-100">
//               <Image
//                 src={article.image}
//                 alt={article.title || "Media Image"}
//                 fill
//                 priority
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         )}

//         {/* Title + Date */}
//         <header className="mb-8 md:mb-10 flex flex-col gap-4" data-aos="fade-up">
//           <h1 className="text-xl lg:text-[24px] md:text-[24px] font-bold leading-tight tracking-[2px] md:tracking-[3px]">
//             {article.title || "Untitled"}
//           </h1>
//           {article.date && (
//             <div className="flex items-center gap-2 text-gray-500 text-sm">
             
//               <span>{article.date}</span>
//             </div>
//           )}
//         </header>

        

//         {/* Body paragraphs */}
//         <div className="space-y-6 md:space-y-7 mb-12 md:mb-16">
//           {paragraphs.map((p, i) => (
//             <p
//               key={i}
//               className={`text-sm sm:text-base md:text-lg leading-relaxed ${
//                 i === 0 ? "font-normal" : "font-normal"
//               }`}
//               data-aos="fade-up"
//               data-aos-delay={i * 60}
//             >
//               {p}
//             </p>
//           ))}
//         </div>

//         {/* Highlight sentence */}
//         {article.highlight && (
//           <p
//             className="font-semibold text-base md:text-lg mb-6 md:mb-8"
//             data-aos="fade-up"
//           >
//             {article.highlight}
//           </p>
//         )}

//         {/* Structured sections (optional) */}
//         {Array.isArray(article.sections) && article.sections.length > 0 && (
//           <div className="space-y-10 md:space-y-12 mb-16">
//             {article.sections.map((sec, idx) => (
//               <div
//                 key={idx}
//                 data-aos="fade-up"
//                 data-aos-delay={idx * 80}
//                 className="space-y-4"
//               >
//                 {sec.heading && (
//                   <h2 className="text-xl md:text-2xl font-semibold tracking-[1px] md:tracking-[2px]">
//                     {idx + 1}. {sec.heading}
//                   </h2>
//                 )}
//                 {sec.content && (
//                   <p className="text-sm sm:text-base md:text-lg leading-relaxed text-black/80">
//                     {sec.content}
//                   </p>
//                 )}

//                 {sec.bullet && (
//                   <ul className="list-disc list-inside text-sm sm:text-base md:text-lg leading-relaxed text-black/80">
//                     {sec.bullet.map((item, i) => (
//                       <li key={i}>{item}</li>
//                     ))}
//                   </ul>
//                 )}

//                 {sec.quote && (
//                   <blockquote className="italic text-sm sm:text-base md:text-lg leading-relaxed text-black/80">
//                     {sec.quote}
//                   </blockquote>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

        
       

//         {/* Similar Articles */}
//         <div className="mb-16 md:mb-24" data-aos="fade-up">
//           <SimilarMedia excludeId={Number(article.id)} />
//         </div>

//         {/* Install Section */}
        
//       </div>

//       <section id="install" data-aos="fade-up" className="lg:mx-auto px-6 lg:px-20">
//           <InstallSection />
//         </section>
//     </section>
//   );
// }





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
  }>;
  highlight?: string;         
}

export default function MediaDetail() {
  const params = useParams();
  const { getSection } = useTranslate();

  const idParam = params?.id;
  const idNum = idParam ? Number(idParam) : NaN;

  const mediaSection = getSection("media") as any;
  const translatedArticles: MediaArticle[] = Array.isArray(mediaSection?.articles)
    ? mediaSection.articles
    : [];

  let article =
    translatedArticles.find((a) => Number(a?.id) === idNum) ||
    mediaItemsFallback.find((a: any) => Number(a?.id) === idNum) ||
    (Number.isFinite(idNum) ? (mediaItemsFallback[idNum] as any) : undefined);

  if (!article) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-600">Article not found.</p>
      </div>
    );
  }

  
  // Build paragraphs: prefer body, fall back to description
  const rawBody = article.body || article.description || "";
  const paragraphs = rawBody
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="bg-white text-black py-12 lg:py-20 md:py-16 pt-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-30 lg:px-75">
        {/* Hero Image */}
        {article.image && (
          <div className="mb-10 md:mb-12 items-center justify-center flex" >
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
        <header className="mb-8 md:mb-10 flex flex-col gap-4" data-aos="fade-up">
          <h1 className="text-[24px] lg:text-[24px] md:text-[24px] font-bold leading-tight ">
            {article.title || "Untitled"}
          </h1>
          {article.date && (
            <div className="flex items-center gap-2 text-gray-500 text-base">
             
              <span>{article.date}</span>
            </div>
          )}
        </header>

        

        {/* Body paragraphs */}
        <div className="space-y-6 md:space-y-7 mb-12 md:mb-16">
          {paragraphs.map((p, i: number) => (
            <p
              key={i}
              className={`text-base  md:text-lg leading-relaxed ${
                i === 0 ? "font-normal" : "font-normal"
              }`}
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
            className="font-semibold text-base md:text-lg mb-6 md:mb-8"
            data-aos="fade-up"
          >
            {article.highlight}
          </p>
        )}

        {/* Structured sections (optional) */}
        {Array.isArray(article.sections) && article.sections.length > 0 && (
          <div className="space-y-10 md:space-y-12 mb-16">
            {article.sections.map((sec, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
                className="space-y-4"
              >
                {sec.heading && (
                  <h2 className="lg:text-[18px] text-[18px] font-semibold ">
                    {idx + 1}. {sec.heading}
                  </h2>
                )}
                {sec.content && (
                  <p className="text-base md:text-lg leading-relaxed text-black/80">
                    {sec.content}
                  </p>
                )}

                {sec.bullet && (
                  <ul className="list-disc list-inside text-base  md:text-lg leading-relaxed text-black/80">
                    {sec.bullet.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {sec.quote && (
                  <blockquote className="italic text-base md:text-lg leading-relaxed text-black/80">
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

const ContainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white">
      <div className="lg:max-w-[1440px] lg:mx-auto px-6 sm:px-8 lg:px-16">
        {children}
      </div>
    </div>
  );
};
