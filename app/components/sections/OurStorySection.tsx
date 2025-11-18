////this one
// import LabelText from "../common/labelText"

// export default function OurStory() {
//     return (
//         <section className="text-white font-sans overflow-x-hidden">
//             <div className="bg-white">
//                 <div className="lg:pt-40 md:pt-20 pt-10 lg:max-w-[1440px] lg:mx-auto px-0 md:px-0 lg:px-16">

//                     <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8 md:gap-6 text-left mb-16">

//                         <div className="w-full lg:w-auto">
//                             <div className="flex items-center text-black mb-3 lg:mb-0 md:mb-3">
//                                 <h5 className="text-[16px] font-bold leading-[32px] tracking-[1.5px] text-beasy-gradient mr-3 whitespace-nowrap opacity-80 font-sans">
//                                     Our Story
//                                 </h5>
//                             </div>
//                             <div className="space-y-6">
//                                 <h2 className="font-inter lg:text-[32px] text-[20px] md:text-[32px] mb-6 md:mb-6 lg:mb-6 font-inter tracking-wides text-black font-internot-italic font-semibold leading-normal tracking-[4px]">
//                                     It All Started with a Simple Idea
//                                 </h2>
//                                 <p className="text-black font-inter font-normal leading-[150%] text-[16px] md:text-[18px] lg:text-[18px] opacity-80 max-w-full md:max-w-[704px] lg:max-w-[592px]">
//                                     bEasy began with a simple goal－to make professional cleaning accessible, reliable, and hassle－free for everyone. What started as a small service has grown into a trusted name dedicated to keeping your spaces fresh and comfortable.
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="flex justify-start w-full mb-6 md:justify-start lg:justify-end lg:w-[60%] lg:py-3">
//                             <img src="/images/services/ac.png" alt="Our Story" className="w-full max-w-[656px] h-auto md:max-w-[704px] object-cover" />
//                         </div>
//                     </div>

//                     <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8 md:gap-6 text-left">

//                         <div className="flex justify-start w-full mb-6 md:justify-start lg:justify-start lg:w-[60%] lg:py-3 order-2 lg:order-1">
//                             <img src="/images/services/ac.png" alt="Our Story" className="w-full max-w-[656px] h-auto md:max-w-[704px] object-cover" />
//                         </div>

//                         <div className="w-full lg:w-auto order-1 lg:order-2">
//                             <div className="space-y-10">
//                                 <LabelText title="Our Vision" description="We aim to be Cambodia's leading cleaning service, helping people live easier, fresher, and more comfortable lives by providing professional cleaning that fits seamlessly into their everyday routines." />
//                                 <LabelText title="Our Mission" description="At bEasy, we make cleaning effortless and worry－free. Our professional team brings care straight to your space, so you can enjoy a clean, comfortable environment that fits your lifestyle." />
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </section>
//     );
// };

import LabelText from "../common/labelText";
import { useTranslate } from "@/app/hooks/useTranslate";

export default function OurStory() {
  const { getSection } = useTranslate();
  const about = getSection("about-us") as any;
  const items: Array<any> = Array.isArray(about?.items) ? about.items : [];

  const ourStory = items.find((i) => i.key === "our-story") || {};
  const ourMission = items.find((i) => i.key === "our-mission") || {};
  const ourVision = items.find((i) => i.key === "our-vision") || {};

  return (
    <section className="text-white overflow-x-hidden">
      <div className="bg-white">
        <div className="lg:pt-40 md:pt-20 pt-10 lg:max-w-[1440px] lg:mx-auto  ">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 text-left mb-12 md:mb-16">
            <div className="w-full lg:w-[45%]">
              <div className="flex items-center text-black mb-3 lg:mb-4">
                <h5 className="text-[14px] md:text-[16px] font-bold leading-[32px] tracking-[1.5px] text-beasy-gradient whitespace-nowrap opacity-80">
                  {ourStory.title || "Our Story"}
                </h5>
              </div>
              <div className="space-y-4 md:space-y-6">
                <p className="text-[24px]  md:text-[32px] lg:text-[32px] text-black font-semibold ">
                  {ourStory.secondTitle || "It All Started with a Simple Idea"}
                </p>
                <p className="text-black font-normal leading-[150%] text-[14px] sm:text-[16px] md:text-[18px] opacity-80">
                  {ourStory.description ||
                    "We understand that keeping your home or workplace spotless can be time-consuming and tiring. That’s why we created a one-stop cleaning service designed to take the hassle out of your hands."}
                </p>
              </div>
            </div>

            <div className="w-full lg:w-[50%]">
              <div className="relative w-full aspect-[4/3]">
                <img
                  src="/images/about/about1.webp"
                  alt={ourStory.title || "Our Story"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 text-left">
            <div className="w-full lg:w-[50%] order-2 lg:order-1">
              <div className="relative w-full aspect-[4/3]">
                <img
                  src="/images/about/about2.webp"
                  alt={ourStory.title || "Our Story"}
                  className="absolute inset-0 w-full h-full object-cover "
                />
              </div>
            </div>

            <div className="w-full lg:w-[45%] order-1 lg:order-2">
              <div className="space-y-8 md:space-y-10">
                <LabelText
                  title={ourMission.title || "Our Mission"}
                  description={
                    ourMission.description ||
                    "Is to enhance life for every customer with reliable, affordable, and high-quality cleaning."
                  }
                />
                <LabelText
                  title={ourVision.title || "Our Vision"}
                  description={
                    ourVision.description ||
                    "To become Cambodia’s most trusted and comprehensive cleaning service provider."
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
