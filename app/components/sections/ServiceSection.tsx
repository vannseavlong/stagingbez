// "use client";

// import { useRef } from "react";
// import ServiceCard from "../../components/common/service-card";
// import { useTranslate } from "@/app/hooks/useTranslate";
// import { ChevronRight, ChevronLeft } from "lucide-react";

// const Service = () => {
//   // unused state removed
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const { getSection } = useTranslate();

//   // Load structured service section from translations (header + items)
//   const serviceSection = getSection("service") as {
//     header?: { subtitle?: string; title?: string; description?: string };
//     items?: Array<{ key: string; title?: string; description?: string }>;
//   };

//   // Map of images keyed by the item keys defined in translations
//   const imageMap: Record<string, string> = {
//     generalCleaning: "/images/services/general.webp",
//     deepCleaning: "/images/services/deep.webp",
//     officeCleaning: "/images/services/office.webp",
//     upholstery: "/images/services/uphol.webp",
//     pestControl: "/images/services/pest.webp",
//     laundry: "/images/services/laundry.webp",
//     washingMachine: "/images/services/washing.webp",
//     postRenovation: "/images/services/Post_Reno.webp",
//     acCleaning: "/images/services/ac.webp",
//   };

//   const mediaItems: Array<{
//     image: string;
//     title: string;
//     description: string;
//   }> = (Array.isArray(serviceSection.items) ? serviceSection.items : []).map(
//     (it) => ({
//       image: imageMap[it.key] || "/images/services/general.webp",
//       title: it.title || "",
//       description: it.description || "",
//     })
//   );

//   // Scroll functions
//   const scrollLeft = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: -270, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: 270, behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="bg-white md:py-20 lg:py-5 lg:px-10 md:px-10 px-5 text-white">
//       {/* Header */}
//       <div className="mb-5 mt-10">
//         <div className="flex items-center text-beasy-gradient mb-5 lg:mb-0 md:mb-5">
//           <h5 className="font-[Inter] text-base font-bold leading-[24px] tracking-[2px] text-beasy-gradient mr-4 whitespace-nowrap opacity-80">
//             {serviceSection.header?.subtitle}
//           </h5>
//         </div>
//       </div>

//       {/* Heading + Navigation */}
//       <div className="flex flex-col lg:flex-row md:flex-row justify-between items-start gap-8 lg:gap-12 md:gap-10 text-left">
//         <h1 className="w-full lg:w-[500px] md:w-[400px] text-black text-[24px] md:text-[32px] lg:text-[32px] font-bold font-[Inter] tracking-widest leading-snug">
//           {serviceSection.header?.title}
//         </h1>

//         {/* Scroll buttons */}
//         <div className="flex gap-3 md:gap-5 items-center justify-center md:justify-end mt-5">
//           <button
//             onClick={scrollLeft}
//             className="border rounded-full border-gray-400 p-2 hover:bg-gray-100 transition"
//           >
//             <ChevronLeft className="text-black" />
//           </button>
//           <button
//             onClick={scrollRight}
//             className="border rounded-full border-gray-400 p-2 hover:bg-gray-100 transition"
//           >
//             <ChevronRight className="text-black" />
//           </button>
//         </div>
//       </div>

//       {/* Scrollable Cards */}
//       <div
//         className="w-full overflow-x-auto mt-10 scrollbar-hidden scroll-smooth"
//         ref={scrollRef}
//       >
//         <div className="flex space-x-5 md:space-x-5 lg:space-x-8 snap-x snap-mandatory pb-4">
//           {mediaItems.map((item, index) => (
//             <div
//               key={index}
//               id={`service`}
//               className="flex-shrink-0 w-[250px] snap-start"
//             >
//               <ServiceCard
//                 image={item.image}
//                 title={item.title}
//                 description={item.description}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Service;
// // remove laundry

"use client";

import { useRef, useState } from "react";
import ServiceCard from "../../components/common/service-card";
import { useTranslate } from "@/app/hooks/useTranslate";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Service = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { getSection } = useTranslate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const serviceSection = getSection("service") as {
    header?: { subtitle?: string; title?: string; description?: string };
    items?: Array<{ key: string; title?: string; description?: string }>;
  };

  const imageMap: Record<string, string> = {
    generalCleaning: "/images/services/general.webp",
    deepCleaning: "/images/services/deep.webp",
    officeCleaning: "/images/services/office.webp",
    upholstery: "/images/services/uphol.webp",
    pestControl: "/images/services/pest.webp",
    washingMachine: "/images/services/washing.webp",
    postRenovation: "/images/services/Post_Reno.webp",
    acCleaning: "/images/services/AC_cleaning.webp",
  };

  const mediaItems = (
    Array.isArray(serviceSection.items) ? serviceSection.items : []
  )
    .filter((it) => it.key !== "laundry")
    .map((it) => ({
      key: it.key,
      image: imageMap[it.key] || "/images/services/general.webp",
      title: it.title || "",
      description: it.description || "",
    }));

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 270; // width + margin
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < mediaItems.length - 1) scrollToIndex(currentIndex + 1);
  };

  return (
    <section className="bg-white md:py-20 lg:py-5 lg:px-10 md:px-10 px-5 text-white relative overflow-hidden">
      {/* Header */}
      <div className="mb-5 mt-10">
        <div className="flex items-center text-beasy-gradient mb-5 lg:mb-0 md:mb-5">
          <h5 className="text-base font-bold leading-[24px] tracking-[2px] text-beasy-gradient mr-4 whitespace-nowrap opacity-80 font-sans">
            {serviceSection.header?.subtitle}
          </h5>
        </div>
      </div>

      {/* Heading + Navigation (Desktop/Tablet) */}
      <div className="flex flex-col lg:flex-row md:flex-row justify-between items-start gap-8 lg:gap-12 md:gap-10 text-left">
        <h1 className="w-full lg:w-[500px] md:w-[400px] text-black text-[24px] md:text-[32px] lg:text-[32px] font-bold tracking-widest leading-snug font-sans">
          {serviceSection.header?.title}
        </h1>

        <div className="hidden md:flex gap-3 items-center justify-center mt-5">
          <button
            onClick={handlePrev}
            className="border rounded-full border-gray-400 p-2 hover:bg-gray-300 transition"
          >
            <ChevronLeft className="text-black" />
          </button>
          <button
            onClick={handleNext}
            className="border rounded-full border-gray-400 p-2 hover:bg-gray-300 transition"
          >
            <ChevronRight className="text-black" />
          </button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div className="relative mt-10">
        {/* Buttons are positioned absolute within this container */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-gray-200 hover:bg-gray-300 text-black rounded-full p-3 shadow transition disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={scrollRef}
          className="w-full overflow-x-auto scrollbar-hidden scroll-smooth"
        >
          <div className="flex space-x-5 md:space-x-5 lg:space-x-8 snap-x snap-mandatory pb-4">
            {mediaItems.map((item) => (
              <div
                key={item.key}
                className="flex-shrink-0 w-[250px] snap-start"
              >
                <ServiceCard
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === mediaItems.length - 1}
          className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-gray-200 hover:bg-gray-300 text-black rounded-full p-3 shadow transition disabled:opacity-30"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default Service;
