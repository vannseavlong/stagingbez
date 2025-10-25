"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaTelegram } from "react-icons/fa";
import { Button } from "../ui/button";

export default function Footer() {
  const handleSocialClick = (platform: string) => {
    console.log(`${platform} icon clicked`);
  };

  return (
    <footer
      className="text-black border-t py-20 pb-10 lg:py-20 lg:mt-20 px-6 md:px-8 relative overflow-hidden bg-white font-sans"
      aria-label="Footer section"
    >
      <div className="grid grid-cols-1 gap-10 lg:gap-30 md:grid-cols-1 lg:grid-cols-2">
        {/* Column 1: Logo & Company Info */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Image
              className="w-30 h-12 object-contain"
              src="/Logo1.png"
              alt="Location map"
              width={96}
              height={96}
              priority
            />
            {/* <h1 className="text-xl text-black font-bold text-custom-gradient bg-clip-text ">
              SUNTEL TECHNOLOGY
            </h1> */}
          </div>

          <p className="text-[16px] text-[#1A1A1A] opacity-80 font-medium leading-relaxed max-w-md">
            #FO-2312-13-14, Floor 23th, Flatiron Building, Street 102, Phnom
            Penh City Center, Phum 1, Sangkat Srah Chak, Khan Daun Penh, Phnom
            Penh, Cambodia.
          </p>

          <div className="flex flex-row md:flex-row justify-start items-center gap-6">
            {/* App Store Button with link */}
            <a
              href="https://apps.apple.com/sg/app/beasy/id6745190697"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Button
                variant="outline"
                className="flex items-center h-[50px] bg-white text-black rounded-[10px] border border-gray-500 hover:bg-custom-gradient transition-colors"
              >
                {/* <img src={Apple} alt="App Store" className="h-[40px] w-auto" /> */}

                <Image
                  className="w-auto h-10 object-contain"
                  src="/apple.svg"
                  alt="Location map"
                  width={10}
                  height={10}
                  priority
                />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-black font-light">
                    Download on the
                  </span>
                  <span className="text-lg font-semibold">App Store</span>
                </div>
              </Button>
            </a>

            {/* Google Play Button with link */}
            <a
              href="https://play.google.com/store/apps/details?id=suntel.beasy.app&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Button
                variant="outline"
                className="flex items-center h-[50px] bg-white text-black rounded-[10px] border border-gray-500 hover:bg-custom-gradient transition-colors"
              >
                {/* <img src={Google} alt="Google Play" className="h-[40px] w-auto" /> */}

                <Image
                  className="w-auto h-10 object-contain"
                  src="/googlePlay.webp"
                  alt="Location map"
                  width={10}
                  height={10}
                  priority
                />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-black font-light">
                    Get it on
                  </span>
                  <span className="text-lg font-semibold"> Google Play</span>
                </div>
              </Button>
            </a>
          </div>
        </div>

        {/* Column 2: Contact Info */}
        <div className="flex justify-center lg:justify-center md:justify-start">
          <div className="flex flex-cols-2 gap-10">
            <div className="flex flex-wrap gap-20">
              {/* Company */}
              <div>
                <h4 className="text-lg text-black font-bold  tracking-wide mb-2">
                  Company
                </h4>
                <ul className="text-base font-medium text-black space-y-4">
                  <li>
                    {" "}
                    <Link
                      href="/term-of-condition"
                      className="hover:underline underline-offset-2 decoration-2 transition-all duration-200"
                    >
                      {" "}
                      Terms & Conditions{" "}
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      href="/privacy-policy"
                      className="hover:underline underline-offset-2 decoration-2 transition-all duration-200"
                    >
                      {" "}
                      Privacy Policy{" "}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div className="gap-10 space-y-4">
                <h4 className="text-lg text-black font-bold  tracking-wide mb-2">
                  Services
                </h4>
                <ul className="text-base font-medium text-black space-y-4 hover:text-beasy-gradient">
                  <li>
                    {" "}
                    <Link
                      href="#service"
                      className="hover:underline underline-offset-2 decoration-2 transition-all duration-200"
                    >
                      {" "}
                      General Cleaning
                    </Link>
                  </li>

                  <li>
                    {" "}
                    <Link
                      href="#service"
                      className="hover:underline underline-offset-2 decoration-2 transition-all duration-200"
                    >
                      {" "}
                      Deep Cleaning{" "}
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      href="#service"
                      className="hover:underline underline-offset-2 decoration-2 transition-all duration-200"
                    >
                      Office Cleaning
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      href="#service"
                      className="hover:underline underline-offset-2 decoration-2 transition-all duration-200"
                    >
                      Upholstery
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      href="#service"
                      className="hover:underline underline-offset-2 decoration-2 transition-all duration-200"
                    >
                      Pest Control
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      href="#service"
                      className="hover:underline underline-offset-2 decoration-2 transition-all duration-200"
                    >
                      {" "}
                      AC Cleaning
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      href="#service"
                      className="hover:underline underline-offset-2 decoration-2 transition-all duration-200"
                    >
                      {" "}
                      Post Renovation
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      href="#service"
                      className="hover:underline underline-offset-2 decoration-2 transition-all duration-200"
                    >
                      Laundry
                    </Link>
                  </li>

                  <li>
                    {" "}
                    <Link
                      href="#service"
                      className="hover:underline underline-offset-2 decoration-2 transition-all duration-200"
                    >
                      Washing Machine
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" border-t mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-[#1A1A1A] font-medium space-y-4 sm:space-y-0">
        <p>
          © {new Date().getFullYear()} Suntel Technology. All rights reserved.
        </p>
        {/* <div className="flex flex-wrap justify-center sm:justify-end gap-4">
          <Link href="/terms" className="hover:underline text-sm">
            Terms of Service
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:underline text-sm">
            Privacy Policy
          </Link>
        </div> */}

        <div className="flex space-x-4 ">
          <a
            href="https://t.me/bEasy_kh"
            aria-label="Telegram"
            className="flex justify-center items-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-300 transition-all duration-200"
            onClick={() => handleSocialClick("Telegram")}
          >
            <FaTelegram size={16} />
          </a>
          <a
            href="https://www.facebook.com/bEasy.apps"
            aria-label="Facebook"
            className="flex justify-center items-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-300 transition-all duration-200"
            onClick={() => handleSocialClick("Facebook")}
          >
            <FaFacebookF size={16} />
          </a>

          <a
            href="https://www.tiktok.com/@beasy_kh?_t=ZS-90hWgLOiOZu&_r=1"
            aria-label="TikTok"
            className="flex justify-center items-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-300 transition-all duration-200"
            onClick={() => handleSocialClick("TikTok")}
          >
            <FaTiktok size={16} />
          </a>
          <a
            href="https://www.instagram.com/beasy.cambodia?igsh=MTB4Nm82bjN1enl2YQ=="
            aria-label="Instagram"
            className="flex justify-center items-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-300 transition-all duration-200"
            onClick={() => handleSocialClick("Instagram")}
          >
            <FaInstagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
