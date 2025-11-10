import React from "react";
import Image from "next/image";

type TaskInfoProps = {
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  items?: string[];
};

export default function TaskInfo({
  title = "What’s Included in Your Cleaning Task",
  imageSrc = "/images/services/AC_cleaning.webp",
  imageAlt = "Cleaning procedure",
  items = [
    "Vacuum all sofa surfaces",
    "Spray specialized cleaning solution on all sofa surfaces",
    "Use scrubber to remove stains and grime",
    "Vacuum remaining residue",
    "Rinse and vacuum again",
    "Vacuum dry",
    "Tidy work area",
  ],
}: TaskInfoProps) {
  return (
    <section className="w-full font-sans">
      {/* Blue header background */}
      <div className="relative w-full">
        <div className="bg-gradient-to-r from-[#0b3ea8] to-[#1a5ff8]">
          <div className="max-w-[1440px] h-[450px] mx-auto px-6 sm:px-8 lg:px-16">
            <div className="pt-12 md:pt-16 lg:pt-24 pb-6 md:pb-8 lg:pb-10 relative">
              {/* left skinny accent */}
              {/* <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-cyan-400 rounded-tr-md rounded-br-md hidden md:block" /> */}

              <h2 className="text-[24px] md:text-8 font-bold text-white max-w-2xl">
                {title}
              </h2>
            </div>
          </div>
        </div>

        {/* White card overlapping the blue area: position so roughly half of the card
      overlaps the gradient on all breakpoints (uses tailwind arbitrary values). */}
        <div className="-mt-[220px] md:-mt-[240px] lg:-mt-[260px]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
            <div className="bg-white shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                  {/* Left - image (with heading above image) */}
                  <div className="w-full lg:w-1/2">
                    <div className="mb-4 block">
                      {/* heading above image on all sizes, underline sized to text */}
                      <h3 className="text-sm font-semibold text-[#0f4ac9] mb-2 inline-block pb-1 border-b-4 border-[#0f4ac9]">
                        Information of procedure
                      </h3>
                    </div>

                    {/* Use a 3:4 aspect ratio (portrait) so image height scales with width */}
                    {/* Slightly reduce image size with responsive max-widths; center on small screens */}
                    <div className="border border-gray-100 p-1 bg-gray-50 relative w-full aspect-[4/3] max-w-[360px] lg:max-w-[420px] mx-auto lg:mx-0">
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        sizes="(min-width: 450px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Right - content */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-start pt-8 lg:pt-12">
                    <ul className="space-y-4 mt-2">
                      {items.map((it, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <span
                            className="mt-1 flex-shrink-0 text-[#0f4ac9]"
                            aria-hidden
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2L13.59 8.26L20 9.27L15 13.14L16.18 19.5L12 16.77L7.82 19.5L9 13.14L4 9.27L10.41 8.26L12 2Z"
                                fill="#0f4ac9"
                              />
                            </svg>
                          </span>
                          <p className="text-[#374151] text-sm md:text-base leading-relaxed">
                            {it}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
