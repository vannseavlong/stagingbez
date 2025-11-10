"use client";

import AboutUsHero from "@/app/components/sections/AboutUsHero";
import AboutUsSection from "@/app/components/sections/AboutUsSection";
import CompareSection from "@/app/components/sections/CompareSection";
import FAQSection from "@/app/components/sections/FAQSection";
import HowItWorkBlog from "@/app/components/sections/HowItWorkBlog";
import InstallSection from "@/app/components/sections/InstallAppSection";
import Media from "@/app/components/sections/mediaSection";

import TestimonialSection from "@/app/components/sections/TestimonialSection"

export default function MediaPage() {
  return (
    <div className="relative font-sans min-h-screen">
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
           backgroundMobile="/images/hero/About_Us_Hero_Tablet.webp"
            backgroundTablet="/images/hero/About_Us_Hero_Tablet.webp"
            backgroundDesktop="/images/hero/About_Us_Hero.webp"

            title="Media"
          />
        </section>

        <ContainWrapper>
          <section id="media">
            <Media />
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
      <div className="lg:max-w-[1440px] lg:mx-auto px-6 sm:px-8 lg:px-16">
        {children}
      </div>
    </div>
  );
};
