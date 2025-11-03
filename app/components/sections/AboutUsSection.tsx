"use client";

import { useTranslate } from "@/app/hooks/useTranslate";
import CoreValue from "@/app/components/common/core-value";

// ✅ Main section (Para)

const Para = () => {
  const { getSection } = useTranslate();

  const aboutSection = getSection("about") as {
    header?: { subtitle?: string; title?: string; description?: string };

    items?: Array<{ key: string; title?: string; description?: string }>;
  };

  const imageMap: Record<string, string> = {
    quickBooking: "/images/about/Quick_Booking.webp",

    flexibleSchedule: "/images/about/Flexible_Schedule.webp",

    safetyFirst: "/images/about/Sefty.webp",

    professionalTeam: "/images/about/Professional_Cleaner.webp",
  };

  const features = (
    Array.isArray(aboutSection.items) ? aboutSection.items : []
  ).map((it) => ({
    icon: imageMap[it.key] || "/images/about/Quick_Booking.webp",

    title: it.title || "",

    description: it.description || "",
  }));

  return (
    <section className="text-white font-sans overflow-x-hidden">
      <div className="bg-white">
        <div className="md:py-20 lg:py-5 lg:max-w-[1440px] lg:mx-auto px-6 sm:px-8 lg:px-16">
          <div className="mb-4 pt-8">
            <div className="flex items-center text-black mb-3 lg:mb-0 md:mb-3">
              <h5 className="text-[16px] font-bold leading-[32px] tracking-[1.5px] text-beasy-gradient mr-3 whitespace-nowrap opacity-80 font-sans">
                {aboutSection.header?.subtitle}
              </h5>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 md:gap-6 text-left mb-16">
            <h1 className="w-full lg:w-[420px] text-black text-[24px] md:text-[32px] lg:text-[32px] font-bold tracking-wide leading-snug font-sans">
              {aboutSection.header?.title}
            </h1>
            <div className="flex justify-start w-full mb-6 md:justify-start lg:justify-end lg:w-[60%] lg:py-3">
              <p className="text-[#3D3D3D] font-medium text-[16px] text-md-[18px] text-lg-[18px] md:text-base leading-[150%] lg:max-w-[560px] md:max-w-[520px] text-left font-sans">
                {aboutSection.header?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-transparent w-full h-[250px] md:h-[400px] overflow-hidden flex justify-center"></div>

      <div className="bg-white">
        <div className="lg:max-w-[1440px] lg:mx-auto px-6 sm:px-8 lg:px-16">
          <div className="mx-0">
            <CoreValue items={features} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Para;
