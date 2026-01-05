"use client";

import React, { useState } from "react";
import { useTranslate } from "@/app/hooks/useTranslate";
import { trackFAQInteraction } from "@/lib/analytics";

type FAQItem = {
  id?: string;
  question?: string;
  answer?: string;
};

type ServiceFAQData = {
  header?: {
    subtitle?: string;
    title?: string;
    description?: string;
  };
  items?: FAQItem[];
};

interface FAQServiceDetailProps {
  serviceKey: string;
}

const FAQServiceDetail: React.FC<FAQServiceDetailProps> = ({ serviceKey }) => {
  const { getSection } = useTranslate();
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);

  const faqData = getSection("faqServiceDetail") as Record<
    string,
    ServiceFAQData
  >;
  const serviceFAQ = faqData?.[serviceKey] || {};

  const displayData = {
    header: {
      subtitle: serviceFAQ?.header?.subtitle || "FAQ",
      title: serviceFAQ?.header?.title || "Everything You Need to Know",
      description:
        serviceFAQ?.header?.description ||
        "Quick answers to your most common questions–so you can book, manage, and enjoy our cleaning service with ease.",
    },
    items: Array.isArray(serviceFAQ?.items) ? serviceFAQ.items : [],
  };

  const toggleFAQ = (index: number) => {
    const wasOpen = openFAQs.includes(index);
    const faq = displayData.items[index];

    setOpenFAQs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

    if (faq) {
      const action = wasOpen ? "collapse" : "expand";
      trackFAQInteraction(
        faq.id || `faq_${index}`,
        action,
        faq.question || "",
        serviceKey
      );
    }
  };

  if (displayData.items.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="max-w-360 mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center mb-4">
            <span
              className="text-[16px] md:text-[16px] font-bold uppercase leading-8 tracking-wide font-sans"
              style={{
                background: "linear-gradient(90deg,#1B4CFA,#102C90)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {displayData.header.subtitle}
            </span>
          </div>
          <h2 className="text-[24px] md:text-[32px] font-bold text-[#1A1A1A] leading-tight font-sans">
            {displayData.header.title}
          </h2>
          <div className="mx-auto mt-6 max-w-2xl px-4">
            <p className="text-[16px] md:text-[18px] font-medium text-[#3D3D3D] leading-relaxed font-sans">
              {displayData.header.description}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {displayData.items.map((faq: FAQItem, index: number) => {
              const isOpen = openFAQs.includes(index);
              const isLast = index === displayData.items.length - 1;
              return (
                <div
                  key={faq?.id || index}
                  className={`pb-6 ${isLast ? "" : "border-b border-gray-200"}`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 text-left bg-transparent border-0 p-0 cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex-1 text-[16px] md:text-[18px] font-medium text-[#1A1A1A] text-left font-sans">
                      {faq?.question || ""}
                    </span>
                    <span
                      className={`ml-3 text-[24px] font-bold transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      style={{
                        background: "linear-gradient(90deg,#1B4CFA,#102C90)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                      aria-hidden
                    >
                      {isOpen ? "\u2212" : "+"}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "max-h-500 opacity-100 py-4"
                        : "max-h-0 opacity-0 py-0"
                    }`}
                  >
                    <div className="text-[14px] md:text-[16px] font-medium text-gray-700 leading-[150%] font-sans">
                      <p>{faq?.answer || ""}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQServiceDetail;
