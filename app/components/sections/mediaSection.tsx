// 'use client'
// import { useState, useEffect } from "react";
// // import { Link } from "next";

// import MediaCard from "../common/mediaCard";
// import { Button } from "../ui/button";
// import Link from "next/link";
// // import AOS from "aos";
// // import "aos/dist/aos.css";

// export default function Media() {
// //   const { t ,i18n} = useTranslation("translation", { keyPrefix: "media" });
//   const [expanded, setExpanded] = useState(false);

//   const mediaItems = t( { returnObjects: true }) as Array<{
//     image: string;
//     date: string;
//     title: string;
//     description: string;
//   }>;

//   const handleToggle = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <section
//       id="media-section"
//       className= {`bg-whiterelative min-h-screen py-25 px-6  text-black  `}
//     >
//       {/* Section Heading */}
//       <div className="text-left mb-12 lg:mb-16 md:mb-16 gap-1" data-aos="fade-down">
//         <div className="flex items-center text-black mb-16 md:mb-20 lg:mb-20">
//           <h5 className="font-[Inter] text-base font-medium leading-[24px] tracking-[2px] text-black opacity-80 mr-4">
//             {("ourArticle")}
//           </h5>
//           <div className="flex-1 h-[1px] bg-white opacity-20"></div>
//         </div>
//         <h2 className="text-3xl md:text-4xl font-bold text-black font-[Inter] text-[32px] leading-normal tracking-[4px]">
//           {("media")}
//         </h2>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
//         {(expanded ? mediaItems : mediaItems.slice(0, 4)).map((item, index) => (
//           <Link
//             key={index}
//             // to={`/media/article/${index}`}
//             href={`/privacy-policy`}
//             className="hover:opacity-90 transition"
//             data-aos="fade-up"
//             data-aos-delay={index * 150} // stagger
//           >
//             <MediaCard
//               image={item.image}
//               date={item.date}
//               title={item.title}
//               description={item.description}
//             />
//           </Link>
//         ))}
//       </div>

//       {/* Toggle Button */}
//       <div className="mt-16 mb-16 flex justify-center" data-aos="fade-up" data-aos-delay="300">
//         <Button
//           variant="outline"
//           className="px-8 py-3 text-black rounded-[30px] lg:h-[44px]  hover:bg-custom-gradient transition-all duration-300 font-medium"
//           onClick={handleToggle}
//         >
//           {expanded ? ("showLess") :("viewMore")}
//         </Button>
//       </div>
//     </section>
//   );
// }

// 'use client';

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import MediaCard from "../common/mediaCard";
// import { Button } from "../ui/button";
// import { useLanguage } from "@/app/contexts/LanguageContext";
// // import AOS from "aos";
// // import "aos/dist/aos.css";
// // import { useTranslation } from "react-i18next";

// export default function Media() {
//   // const { t } = useTranslation("translation", { keyPrefix: "media" });
//   const [expanded, setExpanded] = useState(false);
//   const { currentLanguageCode } = useLanguage();
//   // Example placeholder data (remove when using translations)
//   const mediaItems = [
//   // --- Original 5 Items ---
//   {
//     image: "/images/services/deep.webp",
//     date: "Jan 2025",
//     title: "Initial Product Roadmap",
//     description: "An overview of the strategic goals and milestones planned for the first half of the year."
//   },
//   {
//     image: "/images/services/laundry.webp",
//     date: "Feb 2025",
//     title: "Team Expansion Announcement",
//     description: "We're excited to introduce the new members joining our engineering and design teams this quarter."
//   },
//   {
//     image: "/images/services/general.webp",
//     date: "Mar 2025",
//     title: "User Experience Workshop",
//     description: "Recap of the successful three-day workshop focused on improving our mobile application's navigation."
//   },
//   {
//     image: "/images/services/pest.webp",
//     date: "Apr 2025",
//     title: "Security Update & Patches",
//     description: "Details on the latest security enhancements implemented to protect user data and ensure system integrity."
//   },
//   {
//     image: "/images/services/uphol.webp",
//     date: "May 2025",
//     title: "Community Feedback Highlights",
//     description: "A summary of the most impactful suggestions and feedback received from our active user community."
//   },

//   {
//     image: "/images/services/washing.webp",
//     date: "Jun 2025",
//     title: "Summer Development Sprint",
//     description: "Highlights from our recent two-week sprint, including new API endpoints and faster page load times."
//   },
//   {
//     image: "/images/services/office.webp",
//     date: "Jul 2025",
//     title: "Celebrating Five Years in Business 🎉",
//     description: "A look back at our journey, key accomplishments, and a special thank-you to all our supporters."
//   },
//   {
//     image: "/images/services/office.webp",
//     date: "Aug 2025",
//     title: "Data Science Breakthrough",
//     description: "Introducing our new machine learning model that improves recommendation accuracy by 25%."
//   },
//   {
//     image: "/images/services/office.webp",
//     date: "Sep 2025",
//     title: "Remote Work Policy Update",
//     description: "Information regarding the new flexible hybrid model for all employees, effective immediately."
//   },
//   {
//     image: "/images/services/office.webp",
//     date: "Oct 2025",
//     title: "Preparing for the Holiday Rush",
//     description: "Technical preparations and infrastructure scaling completed to handle the expected surge in traffic and transactions."
//   },
// ];

//   // useEffect(() => {
//   //   AOS.init({ duration: 1000 });
//   // }, []);

//   const handleToggle = () => setExpanded(!expanded);

//   return (
//     <section
//       id="media-section"
//       className="bg-white relative min-h-screen md:py-20 lg:py-20 py-15 "
//     >

//       {/* Section Heading */}
//       <div className="text-left mb-12 lg:mb-10 md:mb-16 gap-1" data-aos="fade-down">
//         <div className="flex items-center  mb-16 md:mb-20 lg:mb-10">
//           <h5 className="font-[Inter] text-base font-medium leading-[24px] tracking-[2px] text-beasy-gradient opacity-80 mr-4">
//             {/* {t("ourArticle")} */}
//            Media
//           </h5>
//           <div className="flex-1 h-[1px] bg-white opacity-20"></div>
//         </div>
//         <h2 className="text-3xl md:text-4xl font-bold text-black font-[Inter] text-[32px] leading-normal tracking-[4px]">
//           {/* {t("media")} */}
//          Read Our Latest Articles
//         </h2>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
//         {(expanded ? mediaItems : mediaItems.slice(0, 4)).map((item, index) => (
//           <Link
//             key={index}

//               href={`/${currentLanguageCode}/media-detail`}
//             className="hover:opacity-90 transition"
//             data-aos="fade-up"
//             data-aos-delay={index * 150}
//           >
//             <MediaCard
//               image={item.image}
//               date={item.date}
//               title={item.title}
//               description={item.description}
//             />
//           </Link>
//         ))}
//       </div>

//       {/* Toggle Button */}
//       <div className="mt-16 mb-16 flex justify-center" data-aos="fade-up" data-aos-delay="300">
//         <Button
//           variant="outline"
//           className="px-8 py-3 text-black rounded-[30px] lg:h-[44px] hover:bg-blue-900 transition-all duration-300 font-medium"
//           onClick={handleToggle}
//         >
//           {expanded ? "Show Less" : "View More"}
//         </Button>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import MediaCard from "../common/mediaCard";
// import { Button } from "../ui/button";
// import { useLanguage } from "@/app/contexts/LanguageContext";

// export default function Media() {
//   const [expanded, setExpanded] = useState(false);
//   const { currentLanguageCode } = useLanguage();

//   const mediaItems = [
//     {
//       image: "/images/services/deep.webp",
//       date: "Jan 2025",
//       title: "Initial Product Roadmap",
//       description:
//         "An overview of the strategic goals and milestones planned for the first half of the year.",
//     },
//     {
//       image: "/images/services/laundry.webp",
//       date: "Feb 2025",
//       title: "Team Expansion Announcement",
//       description:
//         "We're excited to introduce the new members joining our engineering and design teams this quarter.",
//     },
//     {
//       image: "/images/services/general.webp",
//       date: "Mar 2025",
//       title: "User Experience Workshop",
//       description:
//         "Recap of the successful three-day workshop focused on improving our mobile application's navigation.",
//     },
//     {
//       image: "/images/services/pest.webp",
//       date: "Apr 2025",
//       title: "Security Update & Patches",
//       description:
//         "Details on the latest security enhancements implemented to protect user data and ensure system integrity.",
//     },
//     {
//       image: "/images/services/uphol.webp",
//       date: "May 2025",
//       title: "Community Feedback Highlights",
//       description:
//         "A summary of the most impactful suggestions and feedback received from our active user community.",
//     },
//     {
//       image: "/images/services/washing.webp",
//       date: "Jun 2025",
//       title: "Summer Development Sprint",
//       description:
//         "Highlights from our recent two-week sprint, including new API endpoints and faster page load times.",
//     },
//     {
//       image: "/images/services/office.webp",
//       date: "Jul 2025",
//       title: "Celebrating Five Years in Business 🎉",
//       description:
//         "A look back at our journey, key accomplishments, and a special thank-you to all our supporters.",
//     },
//     {
//       image: "/images/services/office.webp",
//       date: "Aug 2025",
//       title: "Data Science Breakthrough",
//       description:
//         "Introducing our new machine learning model that improves recommendation accuracy by 25%.",
//     },
//   ];

//   const handleToggle = () => setExpanded(!expanded);

//   return (
//     <section className="bg-white relative min-h-screen md:py-20 lg:py-20 py-15">
//       {/* Section Heading */}
//       <div className="text-left mb-12 lg:mb-10 md:mb-16 gap-1">
//         <div className="flex items-center mb-16 md:mb-20 lg:mb-10">
//           <h5 className="font-[Inter] text-base font-medium tracking-[2px] text-beasy-gradient opacity-80 mr-4">
//             Media
//           </h5>
//           <div className="flex-1 h-[1px] bg-gray-300 opacity-20"></div>
//         </div>
//         <h2 className="text-3xl md:text-4xl font-bold text-black font-[Inter] tracking-[4px]">
//           Read Our Latest Articles
//         </h2>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
//         {(expanded ? mediaItems : mediaItems.slice(0, 4)).map((item, index) => (

//           <Link
//             key={index}
//             href={`/${currentLanguageCode}/media-detail/${index}`}
//             className="hover:opacity-90 transition"
//             data-aos="fade-up"
//             data-aos-delay={index * 150}
//           >
//             <MediaCard
//               image={item.image}
//               date={item.date}
//               title={item.title}
//               description={item.description}
//             />
//           </Link>
//         ))}
//       </div>

//       {/* Toggle Button */}
//       <div className="mt-16 mb-16 flex justify-center">
//         <Button
//           variant="outline"
//           className="px-8 py-3 text-black rounded-[30px] hover:bg-blue-900 hover:text-white transition-all duration-300 font-medium"
//           onClick={handleToggle}
//         >
//           {expanded ? "Show Less" : "View More"}
//         </Button>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import MediaCard from "../common/mediaCard";
import { Button } from "../ui/button";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { mediaItems } from "../../../data/mediaItem";

export default function Media() {
  const [expanded, setExpanded] = useState(false);
  const { currentLanguageCode } = useLanguage();

  const handleToggle = () => setExpanded(!expanded);
  return (
    <section className="bg-white relative min-h-screen md:py-20 lg:py-4 py-15">
      {/* Section Heading */}
      <div className="text-left mb-12 lg:mb-16 md:mb-16 gap-1">
        <div className="flex items-center mb-4 md:mb-4 lg:mb-4">
          <h5 className="font-[Inter] text-base font-bold tracking-[2px] text-beasy-gradient opacity-80 mr-4">
            Media
          </h5>
        </div>
        <h2 className="text-[24px] md:text-[32px] font-bold text-black font-[Inter] tracking-[4px]">
          Read Our Latest Articles
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 md:gap-10">
        {(expanded ? mediaItems : mediaItems.slice(0, 4)).map((item, index) => (
          <Link
            key={index}
            href={`/${currentLanguageCode}/media-detail/${index}`}
            className="hover:opacity-90 transition"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <MediaCard
              image={item.image}
              date={item.date}
              title={item.title}
              description={item.description}
            />
          </Link>
        ))}
      </div>

      {/* Toggle Button */}
      <div className="mt-16 mb-16 flex justify-center">
        <Button
          variant="outline"
          className="px-8 py-3 text-[#1A1A1A] rounded-[30px] lg:h-[44px] hover:bg-blue-900 hover:text-white transition-all duration-300 font-medium"
          onClick={handleToggle}
        >
          {expanded ? "Show Less" : "View More"}
        </Button>
      </div>
    </section>
  );
}
