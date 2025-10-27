"use client";

import HeroSection from "../components/sections/HeroSection";
import InstallSection from "../components/sections/InstallAppSection";
import FAQSection from "../components/sections/FAQSection";
import ServiceSection from "../components/sections/ServiceSection";
import AboutUsSection from "../components/sections/AboutUsSection";
import TestimonialSection from "../components/sections/TestimonialSection";
import ContactSection from "../components/sections/ContactSection";
// import CompareSection from "../components/sections/CompareSection";
// import HowItWorkBlog from "../components/sections/HowItWorkBlog";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main>
        {/* Full-width hero stays unchanged so it can span the viewport */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* The rest of the page is constrained to a centered container */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 mt-16">
          <section id="service">
            <ServiceSection />
          </section>

          <section id="why-us">
            <AboutUsSection />
          </section>

          {/* <section id="compare">
            <CompareSection />
          </section>

          <section id="blog">
            <HowItWorkBlog />
          </section> */}

          <section id="testimonials">
            <TestimonialSection />
          </section>

          <section id="faq">
            <FAQSection />
          </section>

          <section id="contact">
            <ContactSection />
          </section>

          <section id="install">
            <InstallSection />
          </section>
        </div>
      </main>
    </div>
  );
}
