"use client";

import { useTranslate } from "@/app/hooks/useTranslate";
import CoreValue from "@/app/components/common/core-value";

// ✅ Main section (AboutUs)

type Props = {
  serviceId?: string | number;
  suppressBackground?: boolean;
};

export default function AboutUsSection({
  serviceId,
  suppressBackground,
}: Props) {
  const { getSection } = useTranslate();

  const defaultAbout = getSection("about") as {
    header?: {
      subtitle?: string;
      title?: string;
      description?: string;
      Imagebg?: string | { mobile?: string; tablet?: string; desktop?: string };
    };
    items?: Array<{ key: string; title?: string; description?: string }>;
  };

  // If a serviceId is provided, try to load the service-specific about entry
  // from the translations (registered under `serviceDetailAbout` in useTranslate).
  let aboutSection: any = defaultAbout;
  if (typeof serviceId !== "undefined" && serviceId !== null) {
    const serviceAboutMap = getSection("serviceDetailAbout") as Record<
      string,
      any
    > | null;
    const entry = serviceAboutMap?.[String(serviceId)] ?? null;
    if (entry) aboutSection = entry;
  }

  // Default backgrounds for About Us (can be overridden by translation data)
  const defaultBackgrounds = {
    mobile: "/images/about/Why_Us_mini.jpg",
    tablet: "/images/Why_Choose_us_tablet.png",
    desktop: "/images/about/Why_Us.webp",
  };

  // Allow override via aboutSection.header.Imagebg (object or string)
  let backgrounds = { ...defaultBackgrounds };
  if (aboutSection.header?.Imagebg) {
    if (typeof aboutSection.header.Imagebg === "string") {
      backgrounds = {
        mobile: aboutSection.header.Imagebg,
        tablet: aboutSection.header.Imagebg,
        desktop: aboutSection.header.Imagebg,
      };
    } else if (typeof aboutSection.header.Imagebg === "object") {
      backgrounds = {
        ...backgrounds,
        ...aboutSection.header.Imagebg,
      };
    }
  }

  const imageMap: Record<string, string> = {
    quickBooking: "/images/about/Quick_Booking.webp",

    flexibleSchedule: "/images/about/Flexible_Schedule.webp",

    safetyFirst: "/images/about/Sefty.webp",

    professionalTeam: "/images/about/Professional_Cleaner.webp",
  };

  const DEFAULT_ICON = "/images/about/Quick_Booking.webp";

  const itemIcons: string[] | null = Array.isArray(aboutSection["item-icons"])
    ? aboutSection["item-icons"]
    : null;

  const useServiceIcons =
    typeof serviceId !== "undefined" &&
    serviceId !== null &&
    !!itemIcons &&
    itemIcons.length > 0;

  const features = (
    Array.isArray(aboutSection.items) ? aboutSection.items : []
  ).map((it: any, idx: number) => ({
    icon: useServiceIcons
      ? itemIcons![idx] ?? DEFAULT_ICON
      : imageMap[it?.key] ?? DEFAULT_ICON,
    title: it.title || "",
    description: it.description || "",
  }));

  return (
    <section className="text-white font-sans overflow-x-hidden relative">
      {/* Responsive background image inside AboutUsSection (optional) */}
      {!suppressBackground && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full lg:max-w-[1440px] h-full -z-10 px-16 pointer-events-none select-none">
          {/* Mobile */}
          <div
            className="block md:hidden bg-no-repeat bg-contain bg-center bg-fixed h-full w-full"
            style={{ backgroundImage: `url('${backgrounds.mobile}')` }}
          ></div>
          {/* Tablet */}
          <div
            className="hidden md:block lg:hidden bg-no-repeat bg-contain bg-center bg-fixed h-full w-full"
            style={{ backgroundImage: `url('${backgrounds.tablet}')` }}
          ></div>
          {/* Desktop */}
          <div
            className="hidden lg:block bg-no-repeat bg-center bg-contain bg-fixed h-full w-full"
            style={{ backgroundImage: `url('${backgrounds.desktop}')` }}
          ></div>
        </div>
      )}
      <div className="bg-white">
        <div className="lg:max-w-[1440px] lg:mx-auto px-6 sm:px-8 lg:px-16 pb-16">
          <div className="mb-4 pt-30 lg:pt-40">
            <div className="flex items-center text-black mb-3 lg:mb-0 md:mb-3">
              <h5 className="text-[16px] font-bold leading-[32px] tracking-[1.5px] text-beasy-gradient mr-3 whitespace-nowrap opacity-80 font-sans">
                {aboutSection.header?.subtitle}
              </h5>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 md:gap-6 text-left">
            <h1 className="w-full lg:w-[420px] text-black text-[24px] md:text-[32px] lg:text-[32px] font-bold tracking-wide leading-snug font-sans">
              {aboutSection.header?.title}
            </h1>
            <div className="flex justify-start w-full mb-6 lg:mb-0 md:justify-start lg:justify-end lg:w-[60%] lg:py-0">
              <p className="text-[#3D3D3D] font-medium text-[16px] md:text-[18px] lg:text-[18px] leading-[150%] lg:max-w-[560px] md:max-w-[520px] text-left font-sans">
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
}
