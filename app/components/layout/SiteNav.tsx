// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useLanguage } from "@/app/contexts/LanguageContext";
// import { ContactUsButton, DownloadAppButton, LanguageDropdown } from "..";
// import { useState } from "react";
// import { useRouter, usePathname } from "next/navigation";

// export default function SiteNav() {
//   const { currentLanguageCode } = useLanguage();
//   const [open, setOpen] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();

//   // Helper to check if link is active
//   const isActive = (path: string) => pathname.includes(path);

//   return (
//     <nav className="w-full bg-white sticky top-0 z-50 shadow-sm">
//       <div className="max-w-full lg:max-w-[1440px] lg:mx-auto px-4 sm:px-6 lg:px-16 py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-8 lg:gap-12">
//             <div className="logo">
//               <Link href={`/${currentLanguageCode}`}>
//                 <Image
//                   src="/images/new-logo.png"
//                   alt="bEasy Logo"
//                   width={100}
//                   height={33}
//                   priority
//                   className="h-8 lg:h-10 w-auto"
//                 />
//               </Link>
//             </div>

//             {/* Desktop links - only show on large screens */}
//             <nav className="hidden lg:flex items-center gap-6">
//               <Link
//                 href={`/${currentLanguageCode}/about-us`}
//                 className={`text-base transition-colors ${isActive('/about-us')
//                     ? 'text-beasy-gradient font-medium'
//                     : 'text-black font-medium hover:text-beasy-gradient'
//                   }`}
//               >
//                 About us
//               </Link>

//               <Link
//                 href={`/${currentLanguageCode}/our-service`}
//                 className={`text-base transition-colors ${isActive('/our-service')
//                     ? 'text-beasy-gradient font-medium'
//                     : 'text-black font-medium hover:text-beasy-gradient'
//                   }`}
//               >
//                 Our Service
//               </Link>

//               <Link
//                 href={`/${currentLanguageCode}/media-page`}
//                 className={`text-base transition-colors ${isActive('/media-page')
//                     ? 'text-beasy-gradient font-medium'
//                     : 'text-black font-medium hover:text-beasy-gradient'
//                   }`}
//               >
//                 Media
//               </Link>
//             </nav>
//           </div>

//           {/* Desktop right-side actions - only show on large screens */}
//           <ul className="hidden lg:flex items-center gap-6 list-none m-0 p-0">
//             <li>
//               <LanguageDropdown />
//             </li>
//             <li>
//               <ContactUsButton className="text-sm px-4 py-2" />
//             </li>
//             <li>
//               <DownloadAppButton className="text-sm px-4 py-2" />
//             </li>
//           </ul>

//           {/* Hamburger menu - show on mobile and tablet */}
//           <div className="lg:hidden">
//             <button
//               aria-label="Open menu"
//               aria-expanded={open}
//               onClick={() => setOpen((s) => !s)}
//               className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-beasy-gradient"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 {open ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile & Tablet slide-over menu */}
//       <div
//         className={`lg:hidden fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"
//           }`}
//         style={{ display: open ? undefined : "none" }}
//         aria-hidden={!open}
//       >
//         {/* Overlay */}
//         <div
//           className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open
//               ? "opacity-100 pointer-events-auto"
//               : "opacity-0 pointer-events-none"
//             }`}
//           onClick={() => setOpen(false)}
//         />

//         {/* Slide-over panel */}
//         <div
//           className={`absolute right-0 top-0 h-full w-72 sm:w-80 bg-white shadow-xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
//             }`}
//           role="dialog"
//           aria-modal={open}
//         >
//           <div className="flex flex-col h-full p-6">
//             {/* Close button */}
//             <button
//               onClick={() => setOpen(false)}
//               className="self-end p-2 mb-4 rounded-md hover:bg-gray-100"
//               aria-label="Close menu"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             {/* Actions */}
//             <div className="flex flex-col gap-3">
//               <LanguageDropdown compact />

//               {/* Navigation Links */}
//               <nav className="flex flex-col gap-1 mb-2">
//                 <Link
//                   href={`/${currentLanguageCode}/about-us`}
//                   onClick={() => setOpen(false)}
//                   className={`px-4 py-3 rounded-md text-base transition-colors ${isActive('/about-us')
//                       ? 'bg-blue-50 text-beasy-gradient font-medium'
//                       : 'text-[#1A1A1A] hover:bg-gray-100'
//                     }`}
//                 >
//                   About us
//                 </Link>
//                 <Link
//                   href={`/${currentLanguageCode}/our-service`}
//                   onClick={() => setOpen(false)}
//                   className={`px-4 py-3 rounded-md text-base transition-colors ${isActive('/our-service')
//                       ? 'bg-blue-50 text-beasy-gradient font-medium'
//                       : 'text-[#1A1A1A] hover:bg-gray-100'
//                     }`}
//                 >
//                   Our Service
//                 </Link>
//                 <Link
//                   href={`/${currentLanguageCode}/media-page`}
//                   onClick={() => setOpen(false)}
//                   className={`px-4 py-3 rounded-md text-base transition-colors ${isActive('/media-page')
//                       ? 'bg-blue-50 text-beasy-gradient font-medium'
//                       : 'text-[#1A1A1A] hover:bg-gray-100'
//                     }`}
//                 >
//                   Media
//                 </Link>
//               </nav>

//               <ContactUsButton
//                 className="w-full px-6 py-3 text-sm justify-center"
//                 onClick={() => {
//                   setOpen(false);
//                   setTimeout(() => {
//                     router.push(`/${currentLanguageCode}/contact`);
//                   }, 120);
//                 }}
//               />
//               <DownloadAppButton className="w-full px-6 py-3 text-sm justify-center" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { ContactUsButton, DownloadAppButton, LanguageDropdown } from "..";
import { useTranslate } from "@/app/hooks/useTranslate";
import DropdownMenu, {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import HamburgerXButton from "@/app/components/common/hamburger-X-button";

export default function SiteNav() {
  const { currentLanguageCode, changeLanguage, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Mobile collapse for services
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  // Mobile collapse for language selector
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false);

  // Helper to check if link is active
  const isActive = (path: string) => pathname.includes(path);

  // const homeHref = `/${currentLanguageCode}`;
  // const isHomeActive = pathname === homeHref;

  const { t, getSection } = useTranslate();

  const navbar = getSection("navbar") as any;
  const serviceItems: Array<{ id: number; name: string }> =
    (navbar?.items?.OurServices as any) || [];

  const searchParams = useSearchParams();
  const embed = searchParams.get('embed');
  console.log('embed: ', embed);
  const isEmbed = embed === 'true';
  if (isEmbed) return null

  return (
    <nav className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-full lg:max-w-[1440px] lg:mx-auto px-8 py-6 lg:px-16 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8 lg:gap-12">
            <div className="logo">
              <Link href={`/${currentLanguageCode}`}>
                <Image
                  src="/images/new-logo.png"
                  alt="bEasy Logo"
                  width={100}
                  height={33}
                  priority
                  className="h-8 lg:h-10 w-auto"
                />
              </Link>
            </div>

            {/* Desktop links - only show on large screens */}
            <nav className="hidden lg:flex items-center gap-6">
              {/*
              <Link
                href={`/${currentLanguageCode}`}
                className={`text-base leading-[2] transition-colors ${
                  isHomeActive
                    ? "text-beasy-gradient font-medium"
                    : "text-black font-medium hover:text-beasy-gradient"
                }`}
              >
                {t("navbar.items.home", "Home")}
              </Link>
              */}
              {/* About us link */}
              <Link
                href={`/${currentLanguageCode}/about-us`}
                className={`text-base leading-[2] transition-colors ${isActive("/about-us")
                  ? "text-beasy-gradient font-medium"
                  : "text-black font-medium hover:text-beasy-gradient"
                  }`}
              >
                {t("navbar.items.aboutUs", "About us")}
              </Link>

              {/* Shadcn-style dropdown for Our Service */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  chevronGradient={
                    // Consider service-detail pages (any id) as part of Services
                    isActive("/our-service") ||
                    pathname.includes("/service-detail")
                  }
                  className={`text-base leading-[2] transition-colors ${
                    // Consider service-detail pages (any id) as part of Services
                    isActive("/our-service") ||
                      pathname.includes("/service-detail")
                      ? "text-beasy-gradient font-medium"
                      : "text-[#1A1A1A] font-medium hover:text-beasy-gradient"
                    }`}
                >
                  <span>{t("navbar.navigation.services", "Services")}</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-48">
                  {serviceItems.map((s) => {
                    const itemHref = `/${currentLanguageCode}/service-detail/${s.id}`;
                    const itemActive =
                      pathname === itemHref || pathname.startsWith(itemHref);
                    return (
                      <DropdownMenuItem
                        key={s.id}
                        href={itemHref}
                        className={
                          itemActive
                            ? "bg-blue-50 text-beasy-gradient font-medium"
                            : ""
                        }
                      >
                        {s.name}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href={`/${currentLanguageCode}/media-page`}
                className={`text-base leading-[2] transition-colors ${isActive("/media-page")
                  ? "text-beasy-gradient font-medium"
                  : "text-black font-medium hover:text-beasy-gradient"
                  }`}
              >
                {t("navbar.items.media", "Media")}
              </Link>
            </nav>
          </div>

          {/* Desktop right-side actions - only show on large screens */}
          <ul className="hidden lg:flex items-center gap-6 list-none m-0 p-0">
            <li>
              <LanguageDropdown />
            </li>
            <li>
              <ContactUsButton className="text-[16px] px-4 py-2" />
            </li>
            <li>
              <DownloadAppButton className="text-[16px] px-4 py-2" />
            </li>
          </ul>

          {/* Hamburger menu - show on mobile and tablet */}
          <div className="lg:hidden">
            <HamburgerXButton
              open={open}
              onClick={() => setOpen((s) => !s)}
              className="rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-beasy-gradient"
              ariaLabel="Open menu"
            />
          </div>
        </div>
      </div>

      {/* Mobile & Tablet slide-down menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"
          }`}
        aria-hidden={!open}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-450 ease-out ${open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
            }`}
          onClick={() => setOpen(false)}
        />

        {/* Slide-down panel (full-width) */}
        <div
          className={`absolute left-0 top-0 w-full transform-gpu transform transition-transform duration-500 ease-out origin-top ${open ? "translate-y-0" : "-translate-y-full"
            }`}
          role="dialog"
          aria-modal={open}
        >
          {/* Full-width panel that slides down from the top */}
          <div className="w-full bg-white border-b border-[#E8E8E8] shadow-sm overflow-hidden">
            <div
              className={`transition-[max-height,opacity] duration-500 ease-out overflow-hidden ${open
                ? "max-h-[calc(100vh-96px)] opacity-100"
                : "max-h-0 opacity-0"
                }`}
              style={{ willChange: "max-height, opacity" }}
            >
              <div className="flex flex-col px-8 py-6">
                {/* Row 1: Logo + Close */}
                <div className="flex items-center justify-between mb-6">
                  <div className="logo">
                    <Link
                      href={`/${currentLanguageCode}`}
                      onClick={() => setOpen(false)}
                    >
                      <Image
                        src="/images/new-logo.png"
                        alt="bEasy Logo"
                        width={100}
                        height={33}
                        className="h-8 w-auto"
                      />
                    </Link>
                  </div>
                  <HamburgerXButton
                    open={open}
                    onClick={() => setOpen(false)}
                    className="rounded-md hover:bg-gray-100"
                    ariaLabel="Close menu"
                  />
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-6 mb-6">
                  {/*
                  <Link
                    href={`/${currentLanguageCode}`}
                    onClick={() => setOpen(false)}
                    className={`text-base leading-[2] font-medium transition-colors ${
                      isHomeActive ? "text-beasy-gradient" : "text-[#1A1A1A]"
                    }`}
                  >
                    {t("navbar.items.home", "Home")}
                  </Link>
                  */}
                  <Link
                    href={`/${currentLanguageCode}/about-us`}
                    onClick={() => setOpen(false)}
                    className={`text-base leading-[2] font-medium transition-colors ${isActive("/about-us")
                      ? "text-beasy-gradient"
                      : "text-[#1A1A1A]"
                      }`}
                  >
                    {t("navbar.items.aboutUs", "About us")}
                  </Link>

                  {/* Our Services collapsible */}
                  <div className="px-0">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((s: boolean) => !s)}
                      className="w-full flex items-center justify-between px-0 py-0 text-base font-medium text-[#1A1A1A]"
                      aria-expanded={mobileServicesOpen}
                      aria-controls="mobile-services-list"
                    >
                      <span
                        className={`${isActive("/our-service") ||
                          pathname.includes("/service-detail")
                          ? "text-beasy-gradient"
                          : ""
                          }`}
                      >
                        {t("navbar.navigation.services", "Services")}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3.5 w-3.5 transition-transform duration-300 ease-out ${mobileServicesOpen ? "rotate-180" : "rotate-0"
                          }`}
                        viewBox="0 0 14 10"
                        fill="none"
                      >
                        <path
                          d="M1 1.5L7 7.5L13 1.5"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {mobileServicesOpen ? (
                      <div
                        id="mobile-services-list"
                        className="mt-3 flex flex-col gap-3"
                      >
                        {serviceItems.map((s) => (
                          <Link
                            key={s.id}
                            href={`/${currentLanguageCode}/service-detail/${s.id}`}
                            onClick={() => {
                              setOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className="py-0 rounded-md text-[16px] font-medium"
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <Link
                    href={`/${currentLanguageCode}/media-page`}
                    onClick={() => setOpen(false)}
                    className={`text-base font-medium transition-colors ${isActive("/media-page")
                      ? "text-beasy-gradient"
                      : "text-[#1A1A1A]"
                      }`}
                  >
                    {t("navbar.items.media", "Media")}
                  </Link>

                  {/* Mobile language selector — behave like services (expand) */}
                  <div className="px-0">
                    <button
                      type="button"
                      onClick={() => setMobileLanguageOpen((s) => !s)}
                      className="w-full flex items-center justify-between px-0 py-0 text-base font-medium text-[#1A1A1A]"
                      aria-expanded={mobileLanguageOpen}
                      aria-controls="mobile-language-list"
                    >
                      <div className="flex items-center gap-3">
                        {/* current language flag + label */}
                        {languages && (
                          <Image
                            src={
                              (languages.find(
                                (l) => l.code === currentLanguageCode
                              )?.flag as string) || ""
                            }
                            alt={currentLanguageCode}
                            width={24}
                            height={16}
                            className="h-4 w-6 object-contain"
                          />
                        )}
                        <span>
                          {languages.find((l) => l.code === currentLanguageCode)
                            ?.displayName || currentLanguageCode.toUpperCase()}
                        </span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3.5 w-3.5 transition-transform duration-300 ease-out ${mobileLanguageOpen ? "rotate-180" : "rotate-0"
                          }`}
                        viewBox="0 0 14 10"
                        fill="none"
                      >
                        <path
                          d="M1 1.5L7 7.5L13 1.5"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {mobileLanguageOpen ? (
                      <div
                        id="mobile-language-list"
                        className="mt-3 flex flex-col gap-3"
                      >
                        {languages.map((lng) => (
                          <button
                            key={lng.code}
                            onClick={() => {
                              changeLanguage(lng.code);
                              setMobileLanguageOpen(false);
                              setOpen(false);
                            }}
                            className="py-0 rounded-md text-[16px] font-medium flex items-center gap-3"
                          >
                            <Image
                              src={lng.flag}
                              alt={lng.displayName}
                              width={16}
                              height={16}
                              className="h-4 w-4 object-contain"
                            />
                            <span>{lng.displayName}</span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </nav>

                <div className="flex flex-col gap-4">
                  <ContactUsButton
                    className="w-full px-[32px] py-3 text-[16px] justify-center"
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => {
                        router.push(`/${currentLanguageCode}/contact`);
                      }, 120);
                    }}
                  />

                  <DownloadAppButton className="w-full px-[32px] py-3 text-[16px] justify-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
