"use client";

import InstallSection from "@/app/components/sections/InstallAppSection";
import Media from "@/app/components/sections/mediaSection";

export default function MediaPage() {
  return (
    <div className="relative font-sans min-h-screen">
      <main>
        <ContainWrapper>
          <section id="media">
            <Media />
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
