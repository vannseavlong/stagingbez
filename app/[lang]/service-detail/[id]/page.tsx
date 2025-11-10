import React from "react";
import AboutUsSection from "@/app/components/sections/AboutUsSection";
import Banner from "@/app/components/common/banner";
import TaskInfo from "@/app/components/common/TaskInfo";
import ServiceCarouselWithHeader from "@/app/components/common/ServiceCarouselWithHeader";
import ServiceItem from "@/app/components/common/ServiceItem";
import serviceDetailEn from "@/app/translations/English/serviceDetail.json";
import serviceDetailKm from "@/app/translations/Khmer/serviceDetail.json";
import serviceDetailZh from "@/app/translations/Chinese/serviceDetail.json";
import HowItWorkBlog from "@/app/components/sections/HowItWorkBlog";
import FAQSection from "@/app/components/sections/FAQSection";
import InstallSection from "@/app/components/sections/InstallAppSection";

// Accept the route params prop to satisfy Next.js App Router type checks for
// dynamic routes (this route lives in `[id]`). Using a permissive `any` keeps
// this change low-risk; you can tighten the shape later (e.g. `{ id: string }`).
export default function ServiceDetailPage({ params }: { params: any }) {
  // mark params as used to avoid unused variable lint errors; it's intentionally permissive
  void params;
  // The page is a server component. Load translations directly on the server
  // by importing the JSON translation files for each language and selecting
  // the right one based on the route `lang` param.
  const languageCode = String(params?.lang || "en");
  const languageMap: Record<string, any> = {
    en: serviceDetailEn,
    km: serviceDetailKm,
    zh: serviceDetailZh,
  };

  const serviceDetail = languageMap[languageCode] || serviceDetailEn;
  const currentId = Number(params?.id ?? NaN);
  const detail =
    serviceDetail && serviceDetail.id === currentId
      ? serviceDetail
      : serviceDetail;

  return (
    <div className="font-sans min-h-screen">
      <main>
        {/* Background container with max-width */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full lg:max-w-[1440px] h-full -z-10 px-16">
          {/* Mobile */}
          <div className="block md:hidden bg-[url('/images/about/Why_Us_mini.jpg')] bg-no-repeat bg-contain bg-center bg-fixed h-full w-full"></div>
          {/* Tablet */}
          <div className="hidden md:block lg:hidden bg-[url('/images/Why_Choose_us_tablet.png')] bg-no-repeat bg-contain bg-center bg-fixed h-full w-full"></div>
          {/* Desktop */}
          <div className="hidden lg:block bg-[url('/images/about/Why_Us.webp')] bg-no-repeat bg-center bg-contain bg-fixed h-full w-full"></div>
        </div>
        {/* Banner (full-viewport sliding hero) - populated from translations */}
        <Banner
          slides={[
            {
              landscape:
                detail?.banner?.landscape ||
                "/images/hero/PC_Web_Luxury_Eng.webp",
              portrait:
                detail?.banner?.portrait ||
                "/images/hero/Mobile_Luxury_EN.webp",
              alt: detail?.banner?.title || "Service",
            },
          ]}
          title={detail?.banner?.title || "Upholstery Cleaning Service"}
          description={
            detail?.banner?.description ||
            "Renew your furniture with bEasy's upholstery cleaning - we remove stains, dust, and allergens for a fresher home."
          }
          showDownloadButton={Boolean(detail?.banner?.downloadButton)}
        />

        {/* About section (top of page) */}
        <AboutUsSection />

        {/* Single full-width white band for the rest of the page sections so
            the decorative fixed background doesn't show through between them. */}
        <div className="w-full bg-white">
          <div className="pt-12 lg:pt-24 overflow-visible">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
              <TaskInfo
                title={detail?.taskInfo?.title}
                imageSrc={
                  // Prefer a service item image if present, otherwise fall back to banner
                  detail?.taskInfo?.imageSrc || detail?.banner?.landscape
                }
                items={detail?.taskList?.items}
              />
            </div>
          </div>

          {/* Services carousel */}
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
            <div className="pt-8">
              <ServiceCarouselWithHeader
                subtitle={detail?.serviceType?.subtitle || "SERVICE PRICES"}
                title={detail?.serviceType?.title || "Find Your Perfect Plan"}
              >
                {/* Render service items from translations */}
                {detail?.serviceType?.items?.map((it: any, idx: number) => {
                  const rawPrice = String(it?.price ?? "");
                  const cleanPrice = rawPrice.replace(/[^0-9.]/g, "");

                  return (
                    <div
                      key={it?.key ?? idx}
                      className="min-w-[360px] w-[360px] flex-shrink-0 mr-4"
                    >
                      <ServiceItem
                        title={it?.description || it?.key || "Service"}
                        imageSrc={it?.imageSrc}
                        // ServiceItem prints a leading $ in UI, so pass numeric-only
                        price={cleanPrice || "0"}
                      />
                    </div>
                  );
                })}
              </ServiceCarouselWithHeader>
            </div>
          </div>

          {/* How it works */}
          <div className="lg:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 mt-8">
            <HowItWorkBlog />
          </div>

          {/* FAQ */}
          <div className="lg:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 mt-8">
            <FAQSection />
          </div>

          {/* Install app section */}
          <div className="lg:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 mt-8">
            <InstallSection />
          </div>
        </div>
      </main>
    </div>
  );
}
