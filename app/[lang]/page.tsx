"use client";

import HeroSection from "../components/sections/HeroSection";
// import SeenOnSection from "../components/sections/SeenOnSection";
import InstallSection from "../components/sections/InstallAppSection";
import FAQSection from "../components/sections/FAQSection";
import ServiceSection from "../components/sections/ServiceSection";
import AboutUsSection from "../components/sections/AboutUsSection";
import TestimonialSection from "../components/sections/TestimonialSection";
import CompareSection from "../components/sections/CompareSection";
import HowItWorkBlog from "../components/sections/HowItWorkBlog";
import HomeMedia from "../components/sections/homeMedia";
// import Media from "../components/sections/mediaSection";

export default function Home() {
  return (
    <div className="relative font-sans min-h-screen">
      {/* ...background image now handled in AboutUsSection... */}
      <main>
        {/* Full-width hero stays unchanged so it can span the viewport */}
        <section id="hero">
          <HeroSection />
        </section>
        {/* <section id="seen-on">
          <SeenOnSection />
        </section> */}
        {/* The rest of the page is constrained to a centered container */}
        <ContainWrapper>
          <section id="service">
            <ServiceSection />
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

        <ContainWrapper>
          <section id="media-section">
            <HomeMedia />
          </section>
        </ContainWrapper>

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
