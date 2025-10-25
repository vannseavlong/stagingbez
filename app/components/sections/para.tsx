"use client";

import { FC } from "react";
import Image from "next/image";

// ✅ Feature section data and component
const features = [
  {
    // icon: <Clock className="w-[44px] h-[44px] text-blue-600" />,

    icon: (
      <Image
        src="/Quick_Booking.png"
        alt="Quick Booking Icon"
        width={44}
        height={44}
        className="w-[44px] h-[44px]"
      />
    ),
    title: "Quick Booking",
    description:
      "Book your cleaning in just a few taps – simple, fast, and hassle-free.",
  },
  {
    // icon: <RefreshCcw className="w-[44px] h-[44px] text-blue-600" />,
    icon: (
      <Image
        src="/Flexible_Schedule.png"
        alt="Flexible Schedule Icon"
        width={44}
        height={44}
        className="w-[44px] h-[44px]"
      />
    ),
    title: "Flexible Service",
    description:
      "Plan change? No problem. Easily reschedule or adjust your booking anytime.",
  },
  {
    // icon: <Shield className="w-[44px] h-[44px] text-blue-600" />,
    icon: (
      <Image
        src="/Sefty.png"
        alt="Sefty Icon"
        width={44}
        height={44}
        className="w-[44px] h-[44px]"
      />
    ),
    title: "Safety First",
    description:
      "Your home’s security matters. Every cleaner is fully vetted and trained for your peace of mind.",
  },
  {
    // icon: <Users className="w-[44px] h-[44px] text-blue-600" />,
    icon: (
      <Image
        src="/Professional_Cleaner.png"
        alt="Professional Cleaner Icon"
        width={44}
        height={44}
        className="w-[44px] h-[44px]"
      />
    ),
    title: "Professional Team",
    description:
      "Our cleaners are properly trained and committed to providing high-quality service.",
  },
];

const FeatureSectionWithDividers: FC = () => {
  return (
    <section className="bg-white pb-5">
      <div className="max-w-8xl mx-auto">
        <div className="hidden md:hidden lg:flex divide-x divide-gray-200 border-t border-b border-r border-l">
          {features.map((item, i) => (
            <div key={i} className="flex-1 p-8 text-center">
              <div className="flex lg:justify-center mb-4">{item.icon}</div>
              <h3 className="text-[20px] font-bold text-[#1A1A1A] mb-2">
                {item.title}
              </h3>
              <p className="text-[#3D3D3D] text-base lg:justify-center lg:justify-items-center lg:text-center leading-relaxed w-[300px] h-[72px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:hidden md:hidden grid grid-cols-1  gap-6  mt-6">
          {features.map((item, i) => (
            <div key={i} className="p-6 text-center ">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm justify-center leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* tablet */}
        <div className="hidden lg:hidden md:grid md:grid-cols-2   md:gap-0 ">
          {features.map((item, i) => (
            <div key={i} className="p-6 text-center  border  ">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
  return (
    <section className="bg-white md:py-20 lg:py-5 px-6 text-white">
      {/* Header */}
      <div className="mb-5 mt-10">
        <div className="flex items-center text-black mb-5 lg:mb-0 md:mb-5">
          <h5 className="text-base font-bold leading-[24px] tracking-[2px] text-beasy-gradient mr-4 whitespace-nowrap opacity-80 font-sans">
            WHY CHOOSE US
          </h5>
        </div>
      </div>

      {/* Heading + Description */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 md:gap-10 text-left">
        <h1 className="w-full lg:w-[500px] text-black text-[24px] md:text-[32px] lg:text-[32px] font-bold tracking-widest leading-snug font-sans">
          Don’t Worry, bEasy Has You Covered
        </h1>
        <div className="flex justify-start w-full mb-10 md:justify-start lg:justify-end lg:w-[60%] lg:py-5">
          <p className="text-[#3D3D3D] font-normal text-base  leading-[150%] lg:max-w-[600px] md:max-w-[600px] text-justify font-sans">
            Our on-demand cleaners are professionally trained,
            background-checked, and committed to delivering spotless results
            every time.
          </p>
        </div>
      </div>

      {/* Image */}
      {/* <div className="flex justify-start items-center -mx-6">
        <div className="w-full h-auto max-w-full">
          <Image
            className="w-full h-full object-cover"
            src="/img.png"
            alt="Cleaning service"
            width={180}
            height={38}
            priority
          />
        </div>
      </div> */}

      {/* Parallax Image Section */}

      <div className="relative w-screen h-[400px] md:h-[600px] overflow-hidden -mx-6">
        {/* Background layer (relative to this section only) */}
        <div className="absolute inset-0">
          {/* Mobile */}
          <div className="block md:hidden bg-[url('/Why_Choose_us_Draft_ mobile.png')] bg-center bg-contain   h-full w-full"></div>

          {/* Tablet */}
          <div className="hidden md:block lg:hidden bg-[url('/Why_Choose_us_tablet.png')] bg-center bg-contain bg-fixed h-full w-full"></div>

          {/* Desktop */}
          <div className="hidden lg:block bg-[url('/Why.png')] bg-no-repeat  bg-center bg-contain bg-fixed h-full w-full"></div>
        </div>
      </div>

      <div className="-mx-6">
        <FeatureSectionWithDividers />
      </div>
    </section>
  );
};

export default Para;
