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
//                   <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
//                     {index + 1}
//                   </div>

//                   {/* Bottom Info */}
//                   <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
//                     <span className="text-white text-sm font-medium">
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

import { mediaItems } from "../../../../data/mediaItem"; 

export default function MediaDetail() {
  const params = useParams();

  const articleIndex = params?.id ? Number(params.id) : -1; 
  
  const article = mediaItems[articleIndex];

  if (!article) {
    return (
      <div className="text-center py-20 text-gray-600">Article not found.</div>
    );
  }

  return (
    <section className="bg-white text-black py-20 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-500 mb-6">{article.date}</p>
        <Image
          src={article.image}
          alt={article.title}
          width={800}
          height={400}
          className="rounded-lg object-cover mb-8"
        />
        <p className="text-gray-700 text-lg leading-relaxed">
          {article.description}
        </p>
      </div>
    </section>
  );
}


