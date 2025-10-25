"use client";

import { useRef } from "react";
import ServiceCard from "../../components/common/service-card";
import { useTranslate } from "@/app/hooks/useTranslate";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Service = () => {
  // unused state removed
  const scrollRef = useRef<HTMLDivElement>(null);
  const { getSection } = useTranslate();

  // Load structured service section from translations (header + items)
  const serviceSection = getSection("service") as {
    header?: { subtitle?: string; title?: string; description?: string };
    items?: Array<{ key: string; title?: string; description?: string }>;
  };

  // Map of images keyed by the item keys defined in translations
  const imageMap: Record<string, string> = {
    generalCleaning: "/images/services/general.webp",
    deepCleaning: "/images/services/deep.webp",
    officeCleaning: "/images/services/office.webp",
    upholstery: "/images/services/uphol.webp",
    pestControl: "/images/services/pest.webp",
    laundry: "/images/services/laundry.webp",
    washingMachine: "/images/services/washing.webp",
    postRenovation: "/images/services/Post_Reno.webp",
    acCleaning: "/images/services/Ac_cleaning.webp",
  };

  const mediaItems: Array<{
    image: string;
    title: string;
    description: string;
  }> = (Array.isArray(serviceSection.items) ? serviceSection.items : []).map(
    (it) => ({
      image: imageMap[it.key] || "/images/services/general.webp",
      title: it.title || "",
      description: it.description || "",
    })
  );

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -270, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 270, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white md:py-20 lg:py-5 lg:px-10 md:px-10 px-5 text-white">
      {/* Header */}
      <div className="mb-5 mt-10">
        <div className="flex items-center text-beasy-gradient mb-5 lg:mb-0 md:mb-5">
          <h5 className="text-base font-bold leading-[24px] tracking-[2px] text-beasy-gradient mr-4 whitespace-nowrap opacity-80 font-sans">
            {serviceSection.header?.subtitle}
          </h5>
        </div>
      </div>

      {/* Heading + Navigation */}
      <div className="flex flex-col lg:flex-row md:flex-row justify-between items-start gap-8 lg:gap-12 md:gap-10 text-left">
        <h1 className="w-full lg:w-[500px] md:w-[400px] text-black text-[24px] md:text-[32px] lg:text-[32px] font-bold tracking-widest leading-snug font-sans">
          {serviceSection.header?.title}
        </h1>

        {/* Scroll buttons */}
        <div className="flex gap-3 md:gap-5 items-center justify-center md:justify-end mt-5">
          <button
            onClick={scrollLeft}
            className="border rounded-full border-gray-400 p-2 hover:bg-gray-100 transition"
          >
            <ChevronLeft className="text-black" />
          </button>
          <button
            onClick={scrollRight}
            className="border rounded-full border-gray-400 p-2 hover:bg-gray-100 transition"
          >
            <ChevronRight className="text-black" />
          </button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div
        className="w-full overflow-x-auto mt-10 scrollbar-hidden scroll-smooth"
        ref={scrollRef}
      >
        <div className="flex space-x-5 md:space-x-5 lg:space-x-8 snap-x snap-mandatory pb-4">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              id={`service`}
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
    </section>
  );
};

export default Service;
// remove laundry
