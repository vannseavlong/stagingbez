"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslate } from "@/app/hooks/useTranslate";

type InstallSectionType = {
  header?: { title?: string; description?: string };
  items?: Array<{ key: string; title?: string; subtitle?: string }>;
};

export default function InstallSection() {
  const { getSection, currentLanguage } = useTranslate();
  const install = getSection("install") as InstallSectionType;

  const header = install?.header || {};
  const items = install?.items || [];

  const find = (key: string): { title?: string; subtitle?: string } =>
    (items.find((i) => i.key === key) as unknown as {
      title?: string;
      subtitle?: string;
    }) || {};

  return (
    <section className="bg-white border-t border-gray-200 py-16">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Title / Description / Buttons */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h2 className="text-[24px] lg:text-[32px] font-bold mb-6">
              {header.title}
            </h2>
            <p className="text-[16px] md:text-[18px] font-medium text-[#3D3D3D] mb-10 max-w-2xl mx-auto lg:mx-0">
              {header.description}
            </p>

            <div className="flex justify-center lg:justify-start gap-4">
              <a
                href="https://apps.apple.com/sg/app/beasy/id6745190697"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button
                  variant="outline"
                  className="flex items-center h-[50px] bg-white text-black rounded-[10px] border border-gray-500 hover:bg-custom-gradient transition-colors"
                >
                  <Image
                    className="w-auto h-10 object-contain"
                    src="/icons/download/apple.svg"
                    alt={find("appStore").title || "App Store"}
                    width={40}
                    height={40}
                    priority
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-black font-light">
                      {find("appStore").subtitle || "Download on the"}
                    </span>
                    <span className="text-lg font-semibold">
                      {find("appStore").title || "App Store"}
                    </span>
                  </div>
                </Button>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=suntel.beasy.app&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button
                  variant="outline"
                  className="flex items-center h-[50px] bg-white text-black rounded-[10px] border border-gray-500 hover:bg-custom-gradient transition-colors"
                >
                  <Image
                    className="w-auto h-10 object-contain"
                    src="/icons/download/googlePlay.webp"
                    alt={find("googlePlay").title || "Google Play"}
                    width={40}
                    height={40}
                    priority
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-black font-light">
                      {find("googlePlay").subtitle || "Get it on"}
                    </span>
                    <span className="text-lg font-semibold">
                      {find("googlePlay").title || "Google Play"}
                    </span>
                  </div>
                </Button>
              </a>
            </div>

            {/* Mobile mockup: show under content on small screens */}
            <div className="block lg:hidden mt-8">
              <div className="w-[220px] sm:w-[260px] mx-auto">
                <Image
                  src={
                    currentLanguage === "km"
                      ? "/images/mock-screen_KH.webp"
                      : currentLanguage === "zh"
                      ? "/images/mock-screen_CN.webp"
                      : "/images/mock-screen_EN.webp"
                  }
                  alt={`phone mockup ${currentLanguage}`}
                  width={300}
                  height={600}
                  className="w-full h-auto object-contain mx-auto"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right: Mockup images */}
          {/* Desktop mockup: hidden on small screens, aligned right on lg+ */}
          <div className="order-1 lg:order-2 hidden lg:flex justify-center lg:justify-end">
            <div className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px]">
              <Image
                src={
                  currentLanguage === "km"
                    ? "/images/mock-screen_KH.webp"
                    : currentLanguage === "zh"
                    ? "/images/mock-screen_CN.webp"
                    : "/images/mock-screen_EN.webp"
                }
                alt={`phone mockup ${currentLanguage}`}
                width={420}
                height={840}
                className="w-full h-auto object-contain lg:ml-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
