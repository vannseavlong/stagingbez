"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaTelegram } from "react-icons/fa";

import { useLanguage } from "@/app/contexts/LanguageContext";
import { useTranslate } from "@/app/hooks/useTranslate";

export default function FooterSection() {
  const { currentLanguageCode } = useLanguage();
  const { getSection, ti } = useTranslate();

  const footer = getSection("footer") as {
    header?: { description?: string };
    links?: {
      company?: Array<{ key: string; title: string; href?: string }>;
      services?: Array<{ key: string; title: string }>;
    };
    social?: string;
    companyTitle?: string;
    servicesTitle?: string;
  };
  const header = footer?.header || {};
  const links = footer?.links || {};
  const socialLabel = footer?.social || "Find us on";
  const handleSocialClick = (platform: string) => {
    console.log(`${platform} icon clicked`);
  };

  return (
    <footer
      className="text-black border-t font-[Inter] py-20 pb-10 lg:py-20 lg:mt-20 px-10 lg:px-10 md:px-8 relative overflow-hidden bg-white"
      aria-label="Footer section"
    >
      <div className="grid grid-cols-1 gap-10 lg:gap-30 md:grid-cols-1 lg:grid-cols-2">
        {/* Column 1: Logo & Company Info */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Image
              className="w-30 h-12 object-contain"
              src="/images/new-logo.png"
              alt="Beasy logo"
              width={96}
              height={96}
              priority
            />
          </div>

          <p className="text-[16px] text-[#1A1A1A] opacity-80 font-medium leading-relaxed max-w-md">
            {header.description}
          </p>

          <h3 className="text-sm font-medium text-bllack mt-4 ">
            {socialLabel}
          </h3>
          <div className="flex flex-row md:flex-row justify-start items-center gap-6">
            <div className="flex space-x-6 ">
              <a
                href="https://t.me/bEasy_Cs"
                aria-label="Telegram"
                className="flex justify-center items-center w-12 h-12 rounded-full border bg-white text-black hover:bg-gray-300 transition-all duration-200"
                onClick={() => handleSocialClick("Telegram")}
              >
                <FaTelegram size={16} />
              </a>
              <a
                href="https://www.facebook.com/bEasy.apps"
                aria-label="Facebook"
                className="flex justify-center items-center w-12 h-12 rounded-full border bg-white text-black hover:bg-gray-300 transition-all duration-200"
                onClick={() => handleSocialClick("Facebook")}
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="https://www.tiktok.com/@beasy_kh?_t=ZS-90hWgLOiOZu&_r=1"
                aria-label="TikTok"
                className="flex justify-center items-center w-12 h-12 rounded-full bg-white border text-black hover:bg-gray-300 transition-all duration-200"
                onClick={() => handleSocialClick("TikTok")}
              >
                <FaTiktok size={16} />
              </a>
              <a
                href="https://www.instagram.com/beasy.cambodia?igsh=MTB4Nm82bjN1enl2YQ=="
                aria-label="Instagram"
                className="flex justify-center items-center w-12 h-12 rounded-full bg-white border text-black hover:bg-gray-300 transition-all duration-200"
                onClick={() => handleSocialClick("Instagram")}
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Contact Info */}
        <div className="flex justify-center lg:justify-end gap-10 md:justify-start lg:px-15">
          <div className="flex flex-cols-2 gap-10">
            <div className="flex flex-wrap gap-20">
              {/* Company */}
              <div>
                <h4 className="text-lg text-black font-bold  tracking-wide mb-4">
                  {footer.companyTitle || "Company"}
                </h4>
                <ul className="text-base font-medium text-black space-y-4">
                  <li>
                    <Link
                      href={`/${currentLanguageCode}/term-of-condition`}
                      className="hover:underline text-sm transition-colors"
                    >
                      {links.company && links.company[0]?.title
                        ? links.company[0].title
                        : "Terms & Conditions"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${currentLanguageCode}/privacy-policy`}
                      className="hover:underline text-sm transition-colors"
                    >
                      {links.company && links.company[1]?.title
                        ? links.company[1].title
                        : "Privacy Policy"}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div className="gap-10 space-y-4">
                <h4 className="text-lg text-black font-bold  tracking-wide mb-4">
                  {footer.servicesTitle || "Services"}
                </h4>
                <ul className="text-base font-medium text-black space-y-4 hover:text-beasy-gradient">
                  {(links.services || []).map(
                    (s: { key: string; title: string }) => (
                      <li key={s.key}>
                        <Link
                          href="#service"
                          className="hover:underline text-sm  transition-colors"
                        >
                          {s.title}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" border-t mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-[#1A1A1A] font-medium space-y-4 sm:space-y-0">
        <p>{ti("footer.bottomText", { year: new Date().getFullYear() })}</p>

        <div className="flex flex-wrap justify-center sm:justify-end gap-4 ">
          <Link
            href={`/${currentLanguageCode}/term-of-condition`}
            className=" hover:underline text-sm transition-colors "
            aria-label="Terms of Service"
          >
            {links.company && links.company[0]?.title
              ? links.company[0].title
              : "Terms of Service"}
          </Link>
          <span className=" text-black">•</span>
          <Link
            href={`/${currentLanguageCode}/privacy-policy`}
            className=" hover:underline text-sm  transition-colors "
            aria-label="Privacy Policy"
          >
            {links.company && links.company[1]?.title
              ? links.company[1].title
              : "Privacy Policy"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
