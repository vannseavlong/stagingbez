import React from "react";
import ContactSection from "@/app/components/sections/ContactSection";
import InstallSection from "@/app/components/sections/InstallAppSection";

export default function ContactPage() {
  return (
    <div className="font-sans min-h-screen">
      <main>
        {/* Keep page content constrained to the same centered container used on the home page */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 mt-16">
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
