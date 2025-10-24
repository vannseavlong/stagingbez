"use client";

import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { useTranslate } from "@/app/hooks/useTranslate";

type Section = {
  header?: { subtitle?: string; title?: string; description?: string };
  items?: Array<{ key: string; title?: string; description?: string }>;
};

export default function ContactSection() {
  const { getSection } = useTranslate();
  const contact = getSection("contact") as Section;

  const header = contact?.header || {};
  const items = contact?.items || [];

  const find = (key: string): { title?: string; description?: string } =>
    (items.find((i) => i.key === key) as unknown as {
      title?: string;
      description?: string;
    }) || {};

  return (
    <section className="bg-white md:py-20 lg:py-20 lg:px-10 md:px-10 px-5 py-15 text-white">
      {/* Header */}
      <div className="mb-5 mt-10">
        <div className="flex items-center text-black mb-5 lg:mb-5 md:mb-5">
          <h5 className="font-inter text-base font-bold leading-[24px] tracking-[2px] text-beasy-gradient mr-4 whitespace-nowrap opacity-80">
            {header.subtitle}
          </h5>
        </div>
      </div>

      {/* Heading + Description */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 md:gap-10 text-left">
        <h1 className="w-full lg:w-[500px] text-black text-[24px] md:text-[32px] lg:text-[32px] font-bold font-inter tracking-widest leading-snug">
          {header.title}
        </h1>
        <div className="flex justify-start w-full mb-13 md:justify-items-start lg:justify-end lg:w-[60%] lg:py-0">
          <p className="text-[#3D3D3D] font-inter text-lg font-normal leading-[150%] lg:max-w-[600px] md:max-w-[600px] text-justify">
            {header.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:gap-16 gap-8 lg:justify-between">
        {/* Map / Image */}
        <div className="flex  md:justify-center lg:justify-items-start lg:items-end order-1 md:order-1 lg:order-2">
          <div
            className="flex justify-end lg:items-start lg:py-8 lg:mt-3"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <a
              href="https://maps.app.goo.gl/gpXUP1TSj3rKPPn29"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full w-full"
            >
              {/* ✅ Desktop Image */}
              <div className="hidden lg:block w-full h-auto max-w-[600px] lg:-mt-8">
                <Image
                  className="w-full h-full object-cover "
                  src="/images/location6.png"
                  alt="Location map (desktop)"
                  width={600}
                  height={400}
                  priority
                />
              </div>

              {/* ✅ Tablet Image (Full Width) */}
              <div className="hidden md:block lg:hidden w-screen -mx-6 h-auto">
                <Image
                  className="w-full h-full object-cover"
                  src="/images/location6.png"
                  alt="Location map (tablet)"
                  width={1200}
                  height={500}
                  priority
                />
              </div>

              {/* ✅ Mobile Image (Full Width) */}
              <div className="block md:hidden w-screen -mx-6 h-auto">
                <Image
                  className="w-full h-full object-cover"
                  src="/images/location6.png"
                  alt="Location map (mobile)"
                  width={800}
                  height={400}
                  priority
                />
              </div>
            </a>
          </div>
        </div>

        {/* Contact Details */}

        <div className="flex-1 order-2 lg:order-1 lg:max-w-[50%] lg:mt-10 ">
          <div className="flex flex-col space-y-12 md:space-y-8 md-10">
            {/* Location */}
            <div>
              <div className="flex flex-row gap-2">
                <MapPin className="mb-1 text-[#3D3D3D]" />
                <h4 className="text-base text-[#3D3D3D] font-medium mb-4 tracking-wider">
                  {find("location").title}
                </h4>
              </div>
              <p className="lg:text-lg text-[18px] text-[#1A1A1A] font-medium lg:w-[500px] ">
                {find("location").description}
              </p>
            </div>

            {/* Email */}
            <div>
              <div className="flex flex-row gap-2">
                <Mail className="mb-1 text-[#3D3D3D]" />
                <h4 className="text-base  text-[#3D3D3D] font-medium mb-4 tracking-wider">
                  {find("email").title}
                </h4>
              </div>
              <p className="text-lg  text-[#1A1A1A] font-medium">
                {find("email").description}
              </p>
            </div>

            {/* Phone */}
            <div>
              <div className="flex flex-row gap-2">
                <Phone className="mb-1 text-[#3D3D3D]" />
                <h4 className="text-base text-[#3D3D3D] font-medium mb-4 tracking-wider">
                  {find("phone").title}
                </h4>
              </div>
              <p className="text-lg text-[#1A1A1A] font-medium mb-5 ">
                {find("phone").description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
