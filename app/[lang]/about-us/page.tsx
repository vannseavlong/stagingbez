// "use client";

// import AboutUsHero from "@/app/components/sections/AboutUsHero";
// import AboutUsSection from "@/app/components/sections/AboutUsSection";
// import CompareSection from "@/app/components/sections/CompareSection";
// import FAQSection from "@/app/components/sections/FAQSection";
// import HowItWorkBlog from "@/app/components/sections/HowItWorkBlog";
// import InstallSection from "@/app/components/sections/InstallAppSection";
// import OurStory from "@/app/components/sections/OurStorySection";
// import TestimonialSection from "@/app/components/sections/TestimonialSection"

// export default function AboutUs() {
//     return (
//         <div className="relative font-sans min-h-screen">
//             {/* Background container with max-width */}
//             <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full lg:max-w-[1440px] h-full -z-10 px-16">
//                 {/* Mobile */}
//                 <div className="block md:hidden bg-[url('/images/about/Why_Us_mini.jpg')] bg-no-repeat bg-contain bg-center bg-fixed h-full w-full"></div>
//                 {/* Tablet */}
//                 <div className="hidden md:block lg:hidden bg-[url('/images/Why_Choose_us_tablet.png')] bg-no-repeat bg-contain bg-center bg-fixed h-full w-full"></div>
//                 {/* Desktop */}
//                 <div className="hidden lg:block bg-[url('/images/about/Why_Us.webp')] bg-no-repeat bg-center bg-contain bg-fixed h-full w-full"></div>
//             </div>
//             <main>
//                 {/* Full-width hero stays unchanged so it can span the viewport */}
//                 <section id="hero">
//                     <AboutUsHero

//                         backgroundMobile="/images/hero/Mobile_Luxury_EN.webp"
//                         backgroundTablet="/images/hero/Mobile_Luxury_EN.webp"
//                         backgroundDesktop="/images/hero/PC_Web_Luxury_Eng.webp"

//                         title="About Us"
//                         description="At bEasy, we believe a clean space leads to a clearer, healthier life. Our journey began with a simple goal — to make everyday living easier and more comfortable for people across Cambodia." />
//                 </section>

//                 <ContainWrapper>
//                     <section id="our-story">
//                         <OurStory />
//                     </section>
//                 </ContainWrapper>

//                 <section id="why-us">
//                     <AboutUsSection />
//                 </section>

//                 <ContainWrapper>
//                     <section id="compare">
//                         <CompareSection />
//                     </section>
//                 </ContainWrapper>
//                 <ContainWrapper>
//                     <section id="blog">
//                         <HowItWorkBlog />
//                     </section>
//                 </ContainWrapper>
//                 <ContainWrapper>
//                     <section id="testimonials">
//                         <TestimonialSection />
//                     </section>
//                 </ContainWrapper>
//                 <ContainWrapper>
//                     <section id="faq">
//                         <FAQSection />
//                     </section>
//                 </ContainWrapper>

//                 {/* Contact moved to dedicated page */}

//                 {/* <section id="media-section">
//             <Media />
//           </section> */}
//                 {/* Parallax Image Section with max-width constraint */}
//                 <ContainWrapper>
//                     <section id="install">
//                         <InstallSection />
//                     </section>
//                 </ContainWrapper>
//             </main>
//         </div>
//     );
// }

// const ContainWrapper = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <div className="bg-white">
//             <div className="lg:max-w-[1440px] lg:mx-auto px-6 sm:px-8 lg:px-16">
//                 {children}
//             </div>
//         </div>
//     );
// };

"use client";

import AboutUsHero from "@/app/components/sections/AboutUsHero";
import AboutUsSection from "@/app/components/sections/AboutUsSection";
import CompareSection from "@/app/components/sections/CompareSection";
import FAQSection from "@/app/components/sections/FAQSection";
import HowItWorkBlog from "@/app/components/sections/HowItWorkBlog";
import InstallSection from "@/app/components/sections/InstallAppSection";
import OurStory from "@/app/components/sections/OurStorySection";
import TestimonialSection from "@/app/components/sections/TestimonialSection";
import { useTranslate } from "@/app/hooks/useTranslate";

export default function AboutUs() {
  const { getSection } = useTranslate();
  const aboutSection = getSection("about-us") as any;
  const header = aboutSection?.header || {};
  return (
    <div className="relative min-h-screen">
      {/* Background container with max-width */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full lg:max-w-[1440px] h-full -z-10 px-16">
        {/* Mobile */}
        <div className="block md:hidden bg-[url('/images/about/Why_Us_mini.jpg')] bg-no-repeat bg-contain bg-center bg-fixed h-full w-full"></div>
        {/* Tablet */}
        <div className="hidden md:block lg:hidden bg-[url('/images/Why_Choose_us_tablet.png')] bg-no-repeat bg-contain bg-center bg-fixed h-full w-full"></div>
        {/* Desktop */}
        <div className="hidden lg:block bg-[url('/images/about/Why_Us.webp')] bg-no-repeat bg-center bg-contain bg-fixed h-full w-full"></div>
      </div>
      <main>
        {/* Full-width hero stays unchanged so it can span the viewport */}
        <section id="hero">
          <AboutUsHero
            backgroundMobile="/images/about/aboutHero.webp"
            backgroundTablet="/images/about/aboutHero.webp"
            backgroundDesktop="/images/about/aboutHero.webp"
            title={header?.title || "About Us"}
            description={
              header?.description ||
              "At bEasy, we believe a clean space leads to a clearer, healthier life. Our journey began with a simple goal — to make everyday living easier and more comfortable for people across Cambodia."
            }
          />
        </section>

        <ContainWrapper>
          <section id="our-story">
            <OurStory />
          </section>
        </ContainWrapper>

        <section id="why-us">
          <AboutUsSection />
        </section>

        <ContainWrapper>
          <section id="compare">
            <CompareSection />
          </section>
        </ContainWrapper>
        <ContainWrapper>
          <section id="blog">
            <HowItWorkBlog />
          </section>
        </ContainWrapper>
        <ContainWrapper>
          <section id="testimonials">
            <TestimonialSection />
          </section>
        </ContainWrapper>
        <ContainWrapper>
          <section id="faq">
            <FAQSection />
          </section>
        </ContainWrapper>

        {/* Contact moved to dedicated page */}

        {/* <section id="media-section">
            <Media />
          </section> */}
        {/* Parallax Image Section with max-width constraint */}
        <ContainWrapper>
          <section id="install">
            <InstallSection />
          </section>
        </ContainWrapper>
      </main>
    </div>
  );
}

const ContainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white">
      <div className="lg:max-w-[1440px] lg:mx-auto px-6 sm:px-8 lg:px-16 pt-30 lg:pt-40">
        {children}
      </div>
    </div>
  );
};
