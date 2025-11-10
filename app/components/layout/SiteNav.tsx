// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useLanguage } from "@/app/contexts/LanguageContext";
// import { ContactUsButton, DownloadAppButton, LanguageDropdown } from "..";
// // import { handleSmartDownload } from "@/lib/smartDownload";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// // Phase 2: Uncomment to restore navigation links
//  import { NAV_ITEMS } from "../navigation";

// export default function SiteNav() {
//   const { currentLanguageCode } = useLanguage();
//   const [open, setOpen] = useState(false);
//   const router = useRouter();
//   return (
//     <nav className="w-full bg-white sticky top-0 z-50">
//       <div className="max-w-full lg:max-w-[1440px] lg:mx-auto px-6 sm:px-8 lg:px-16 py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           {/* <div className="logo">
//             <Link href={`/${currentLanguageCode}`}>
//               <Image
//                 src="/images/new-logo.png"
//                 alt="bEasy Logo"
//                 width={120}
//                 height={40}
//                 priority
//                 className="h-10 w-auto"
//               />
//             </Link>


//           </div>

//           <div>  
//             <Link href={`/${currentLanguageCode}/about-us`}>
//               <span className="text-black">About us</span>
//             </Link>

//              <Link href={`/${currentLanguageCode}/our-service`} className="ml-6">
//               <span className="text-black">Our Service</span>
//             </Link>

//             <Link href={`/${currentLanguageCode}/media`} className="ml-6">
//               <span className="text-black">Media</span>
//             </Link>
//           </div> */}



//            <div className="flex items-center gap-12 ">
//             <div className="logo">
//               <Link href={`/${currentLanguageCode}`}>
//                 <Image
//                   src="/images/new-logo.png"
//                   alt="bEasy Logo"
//                   width={120}
//                   height={40}
//                   priority
//                   className="h-10 w-auto"
//                 />
//               </Link>
//             </div>

//             {/* Desktop links next to the logo */}
//             <nav className="hidden md:flex items-center gap-6">
//               <Link href={`/${currentLanguageCode}/about-us`} className="text-black">
//                 About us
//               </Link>
//               <Link href={`/${currentLanguageCode}/our-service`} className="text-black">
//                 Our Service
//               </Link>
//               <Link href={`/${currentLanguageCode}/media-page`} className="text-black">
//                 Media
//               </Link>
//             </nav>
//           </div>


//           {/* Phase 2: Navigation links will go here */}
//           {/* <nav className="hidden md:flex gap-6 items-center">
//             {NAV_ITEMS.map((it) => ...)}
//           </nav> */}

//           {/* Desktop right-side: hidden on mobile */}
//           <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
//             <li>
//               <LanguageDropdown />
//             </li>
//             <li>
//               <ContactUsButton />
//             </li>
//             <li>
//               <DownloadAppButton />
//             </li>
//           </ul>

//           {/* Mobile hamburger */}
//           <div className="md:hidden">
//             <button
//               aria-label="Open menu"
//               aria-expanded={open}
//               onClick={() => setOpen((s) => !s)}
//               className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
//             >
//               {/* Simple hamburger icon */}
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

//       {/* Mobile slide-over menu (always mounted for smooth animation) */}
//       {/* Mobile slide-over menu (always mounted for smooth animation) */}
//       <div
//         className={`md:hidden fixed inset-0 z-50 ${
//           open ? "pointer-events-auto" : "pointer-events-none"
//         }`}
//         style={{ display: open ? undefined : "none" }}
//         aria-hidden={!open}
//       >
//         {/* overlay */}
//         <div
//           className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
//             open
//               ? "opacity-100 pointer-events-auto"
//               : "opacity-0 pointer-events-none"
//           }`}
//           onClick={() => setOpen(false)}
//         />

//         {/* panel */}
//         <div
//           className={`absolute right-0 top-0 h-full w-72 bg-white shadow-lg p-4 transform transition-transform duration-300 ${
//             open ? "translate-x-0" : "translate-x-full"
//           }`}
//           role="dialog"
//           aria-modal={open}
//         >
//           <div className="flex flex-col gap-4">
//             <div>
//               <LanguageDropdown compact />
//             </div>
//             <div>
//               <ContactUsButton
//                 className="w-full px-6 py-3 text-sm justify-center"
//                 onClick={() => {
//                   setOpen(false);
//                   // Navigate to the contact page for the current language
//                   setTimeout(() => {
//                     router.push(`/${currentLanguageCode}/contact`);
//                   }, 120);
//                 }}
//               />
//             </div>
//             <div>
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
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SiteNav() {
  const { currentLanguageCode } = useLanguage();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Helper to check if link is active
  const isActive = (path: string) => pathname.includes(path);

  return (
    <nav className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-full lg:max-w-[1440px] lg:mx-auto px-4 sm:px-6 lg:px-16 py-3">
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
              <Link
                href={`/${currentLanguageCode}/about-us`}
                className={`text-base transition-colors ${isActive('/about-us')
                    ? 'text-beasy-gradient font-semibold'
                    : 'text-black font-medium hover:text-beasy-gradient'
                  }`}
              >
                About us
              </Link>

              <Link
                href={`/${currentLanguageCode}/our-service`}
                className={`text-base transition-colors ${isActive('/our-service')
                    ? 'text-beasy-gradient font-semibold'
                    : 'text-black font-medium hover:text-beasy-gradient'
                  }`}
              >
                Our Service
              </Link>

              <Link
                href={`/${currentLanguageCode}/media-page`}
                className={`text-base transition-colors ${isActive('/media-page')
                    ? 'text-beasy-gradient font-semibold'
                    : 'text-black font-medium hover:text-beasy-gradient'
                  }`}
              >
                Media
              </Link>
            </nav>
          </div>

          {/* Desktop right-side actions - only show on large screens */}
          <ul className="hidden lg:flex items-center gap-6 list-none m-0 p-0">
            <li>
              <LanguageDropdown />
            </li>
            <li>
              <ContactUsButton className="text-sm px-4 py-2" />
            </li>
            <li>
              <DownloadAppButton className="text-sm px-4 py-2" />
            </li>
          </ul>

          {/* Hamburger menu - show on mobile and tablet */}
          <div className="lg:hidden">
            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-beasy-gradient"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet slide-over menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"
          }`}
        style={{ display: open ? undefined : "none" }}
        aria-hidden={!open}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
            }`}
          onClick={() => setOpen(false)}
        />

        {/* Slide-over panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 sm:w-80 bg-white shadow-xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
            }`}
          role="dialog"
          aria-modal={open}
        >
          <div className="flex flex-col h-full p-6">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="self-end p-2 mb-4 rounded-md hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <LanguageDropdown compact />

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1 mb-2">
                <Link
                  href={`/${currentLanguageCode}/about-us`}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-md text-base transition-colors ${isActive('/about-us')
                      ? 'bg-blue-50 text-beasy-gradient font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  About us
                </Link>
                <Link
                  href={`/${currentLanguageCode}/our-service`}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-md text-base transition-colors ${isActive('/our-service')
                      ? 'bg-blue-50 text-beasy-gradient font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  Our Service
                </Link>
                <Link
                  href={`/${currentLanguageCode}/media-page`}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-md text-base transition-colors ${isActive('/media-page')
                      ? 'bg-blue-50 text-beasy-gradient font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  Media
                </Link>
              </nav>

              <ContactUsButton
                className="w-full px-6 py-3 text-sm justify-center"
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => {
                    router.push(`/${currentLanguageCode}/contact`);
                  }, 120);
                }}
              />
              <DownloadAppButton className="w-full px-6 py-3 text-sm justify-center" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}