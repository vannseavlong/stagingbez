import React from "react";
import { notFound } from "next/navigation";
import AboutUsSection from "@/app/components/sections/AboutUsSection";
import Banner from "@/app/components/common/banner";
import TaskInfo from "@/app/components/common/TaskInfo";
import ServiceCarouselWithHeader from "@/app/components/common/ServiceCarouselWithHeader";
import ServiceItem from "@/app/components/common/ServiceItem";
import serviceDetailEn from "@/app/translations/English/serviceDetail.json";
import serviceDetailKm from "@/app/translations/Khmer/serviceDetail.json";
import serviceDetailZh from "@/app/translations/Chinese/serviceDetail.json";
import serviceDetailAboutEn from "@/app/translations/English/serviceDetailAbout.json";
// import HowItWorkBlog from "@/app/components/sections/HowItWorkBlog";
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

  // Select the translation data for the route's language
  const serviceDetail = languageMap[languageCode] || serviceDetailEn;
  const currentId = Number(params?.id ?? NaN);

  // Load the service-detail-specific 'about' translations for the route
  const serviceDetailAboutMap: Record<string, any> = {
    en: serviceDetailAboutEn,
    // Fallback to English if other-language serviceDetailAbout files are not present
    km: serviceDetailAboutEn,
    zh: serviceDetailAboutEn,
  };

  const serviceDetailAbout =
    serviceDetailAboutMap[languageCode] || serviceDetailAboutEn;
  const aboutEntry = serviceDetailAbout?.[String(currentId)] ?? null;

  // Determine the detail object for the requested id.
  // The translations may take one of three shapes:
  // 1) an array of objects: [{ id: 1, ... }, ...]
  // 2) a single object: { id: 4, ... }
  // 3) a keyed object mapping id -> object: { "1": { id: 1, ... }, "2": { ... } }
  // We support all three and return a 404 when there's no match.
  let detail: any = null;
  if (Array.isArray(serviceDetail)) {
    detail = serviceDetail.find((s: any) => Number(s.id) === currentId) ?? null;
  } else if (serviceDetail && typeof serviceDetail === "object") {
    // Prefer keyed lookup when present: serviceDetail["3"]
    const key = String(currentId);
    if (Object.prototype.hasOwnProperty.call(serviceDetail, key)) {
      detail = serviceDetail[key];
    } else if (
      typeof (serviceDetail as any).id !== "undefined" &&
      Number((serviceDetail as any).id) === currentId
    ) {
      // Backwards-compatible single-object shape
      detail = serviceDetail;
    } else {
      detail = null;
    }
  }

  if (!detail) {
    // No matching service detail for this id — show Next.js 404 page
    notFound();
  }

  return (
    <div className="font-sans min-h-screen">
      <main>
        {/* Background container with max-width */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full lg:max-w-[1440px] h-full -z-10 px-6 md:px-8 lg:px-16">
          {/* Use service-specific Imagebg fields when available; fall back to decorative defaults */}
          {(() => {
            const header = aboutEntry?.header ?? {};
            const mobileBg =
              header.ImagebgMobile ??
              header.Imagebg ??
              "/images/about/Why_Us_mini.jpg";
            const tabletBg =
              header.ImagebgTablet ??
              header.Imagebg ??
              "/images/Why_Choose_us_tablet.png";
            const desktopBg =
              header.ImagebgDesktop ??
              header.Imagebg ??
              "/images/about/Why_Us.webp";

            return (
              <>
                {/* Mobile */}
                <div
                  className="block md:hidden bg-no-repeat bg-contain bg-center bg-fixed h-full w-full"
                  style={{ backgroundImage: `url('${mobileBg}')` }}
                />

                {/* Tablet */}
                <div
                  className="hidden md:block lg:hidden bg-no-repeat bg-contain bg-center bg-fixed h-full w-full"
                  style={{ backgroundImage: `url('${tabletBg}')` }}
                />

                {/* Desktop */}
                <div
                  className="hidden lg:block bg-no-repeat bg-center bg-contain bg-fixed h-full w-full"
                  style={{ backgroundImage: `url('${desktopBg}')` }}
                />
              </>
            );
          })()}
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
        <AboutUsSection serviceId={currentId} />

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
                taskList={detail?.taskList}
              />
            </div>
          </div>

          {/* Services carousel */}
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 mt-30 lg:mt-40">
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
                      className="min-w-[310px] w-[310px] flex-shrink-0"
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
          {/* <div className="lg:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 mt-8">
            <HowItWorkBlog />
          </div> */}

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
