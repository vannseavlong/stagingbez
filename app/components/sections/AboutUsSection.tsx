"use client";

import { FC } from "react";
import Image from "next/image";
import { useTranslate } from "@/app/hooks/useTranslate";

// Build feature items from translations and map icons by key
const FeatureSectionWithDividers: FC = () => {
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
    icon: (
      <Image
        src={imageMap[it.key] || "/images/about/Quick_Booking.webp"}
        alt={it.title || ""}
        width={44}
        height={44}
        className="w-[44px] h-[44px]"
      />
    ),
    title: it.title || "",
    description: it.description || "",
  }));

  return (
    <section className="bg-white pb-4">
      <div className="max-w-8xl mx-auto">
        <div className="hidden md:hidden lg:flex divide-x divide-gray-200 border-t border-b border-r border-l">
          {features.map((item, i) => (
            <div key={i} className="flex-1 p-6 text-center">
              <div className="flex lg:justify-center mb-3">{item.icon}</div>
              <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-3 font-sans">
                {item.title}
              </h3>
              <p className="text-[#3D3D3D] text-sm lg:justify-center lg:justify-items-center lg:text-center leading-relaxed w-[260px] h-[64px] font-sans">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:hidden md:hidden grid grid-cols-1 gap-4 mt-4">
          {features.map((item, i) => (
            <div key={i} className="p-4 text-center">
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 w-[220px] mx-auto text-sm text-center leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* tablet */}
        <div className="hidden lg:hidden md:grid md:grid-cols-2 md:gap-0">
          {features.map((item, i) => (
            <div key={i} className="p-4 text-center border">
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 justify-center text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ✅ Main section (Para)
const Para = () => {
  const { getSection } = useTranslate();
  const aboutSection = getSection("about") as {
    header?: { subtitle?: string; title?: string; description?: string };
    items?: Array<{ key: string; title?: string; description?: string }>;
  };

  return (
    <section className="bg-white md:py-20 lg:py-5 text-white font-sans overflow-x-hidden">
      {/* Header */}
      <div className="mb-4 mt-8">
        <div className="flex items-center text-black mb-3 lg:mb-0 md:mb-3">
          <h5 className="text-[16px] font-semibold leading-[32px] tracking-[1.5px] text-beasy-gradient mr-3 whitespace-nowrap opacity-80 font-sans">
            {aboutSection.header?.subtitle}
          </h5>
        </div>
      </div>

      {/* Heading + Description */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 md:gap-6 text-left">
        <h1 className="w-full lg:w-[420px] text-black text-[24px] md:text-[32px] lg:text-[32px] font-bold tracking-wide leading-snug font-sans">
          {aboutSection.header?.title}
        </h1>
        <div className="flex justify-start w-full mb-6 md:justify-start lg:justify-end lg:w-[60%] lg:py-3">
          <p className="text-[#3D3D3D] font-normal text-[16px] text-md-[18px] text-lg-[18px] md:text-base leading-[150%] lg:max-w-[560px] md:max-w-[520px] text-justify font-sans">
            {aboutSection.header?.description}
          </p>
        </div>
      </div>

      {/* Parallax Image Section */}

      <div className="relative w-full h-[250px] md:h-[420px] overflow-hidden">
        {/* Background layer (relative to this section only) */}
        <div className="absolute inset-0">
          {/* Mobile */}
          <div className="block md:hidden bg-[url('/images/Why_Choose_us_Draft_mobile.png')] bg-no-repeat bg-contain bg-center   h-full w-full"></div>

          {/* Tablet */}
          <div className="hidden md:block lg:hidden bg-[url('/images/Why_Choose_us_tablet.png')] bg-no-repeat bg-contain bg-center bg-fixed h-full w-full"></div>

          {/* Desktop */}
          <div className="hidden lg:block bg-[url('/images/about/Why.webp')] bg-no-repeat  bg-center bg-contain bg-fixed h-full w-full"></div>
        </div>
      </div>

      <div className="mx-0">
        <FeatureSectionWithDividers />
      </div>
    </section>
  );
};

export default Para;
