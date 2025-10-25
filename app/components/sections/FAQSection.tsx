"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslate } from "@/app/hooks/useTranslate";
import { trackFAQInteraction } from "@/lib/analytics";

type FAQTranslationItem = {
  id?: string;
  question?: string;
  answer?: string;
};

type FAQTranslationCategory = {
  category?: string;
  items?: FAQTranslationItem[];
};

type FAQTranslation = {
  header?: { subtitle?: string; title?: string; description?: string };
  showMoreButton?: string;
  showLessButton?: string;
  faqs?: FAQTranslationCategory[];
};

const FAQSection: React.FC = () => {
  const { getSection } = useTranslate();
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const faqData = getSection("faqSection") as FAQTranslation;

  const displayData = useMemo(() => {
    return {
      header: {
        subtitle: faqData?.header?.subtitle || "FAQ",
        title: faqData?.header?.title || "Frequently asked questions",
        description: faqData?.header?.description || "",
      },
      showMoreButton: faqData?.showMoreButton || "Show More",
      showLessButton: faqData?.showLessButton || "Show Less",
      faqs: Array.isArray(faqData?.faqs) ? faqData.faqs : [],
    };
  }, [faqData]);

  const faqs = displayData.faqs as FAQTranslationCategory[];
  const categories = faqs.map((f) => f?.category).filter(Boolean) as string[];

  useEffect(() => {
    if (categories.length > 0) {
      if (!activeCategory || !categories.includes(activeCategory)) {
        setActiveCategory(categories[0]);
        setOpenFAQs([]);
        setShowAll(false);
      }
    }
  }, [categories, activeCategory]);

  const faqsForActiveCategory = (() => {
    if (faqs.length === 0) return [] as FAQTranslationItem[];
    if (activeCategory && categories.includes(activeCategory)) {
      return faqs.find((cat) => cat?.category === activeCategory)?.items || [];
    }
    return faqs[0]?.items || [];
  })();

  const faqsToShow = showAll
    ? faqsForActiveCategory
    : faqsForActiveCategory.slice(0, 6);

  const toggleFAQ = (index: number) => {
    const wasOpen = openFAQs.includes(index);
    const faq = faqsToShow[index];

    setOpenFAQs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

    if (faq) {
      const action = wasOpen ? "collapse" : "expand";
      trackFAQInteraction(
        faq.id || `faq_${index}`,
        action,
        faq.question || "",
        activeCategory || ""
      );
    }
  };

  const toggleShowAll = () => {
    setShowAll((s) => !s);
    setOpenFAQs([]);
  };

  const handleCategoryClick = (category: string) => {
    const previousCategory = activeCategory;
    setActiveCategory(category);
    setOpenFAQs([]);
    setShowAll(false);

    if (previousCategory && previousCategory !== category) {
      trackFAQInteraction(
        `category_${category.replace(/\s+/g, "_").toLowerCase()}`,
        "category_change",
        `Changed from ${previousCategory} to ${category}`,
        category
      );
    }
  };

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="text-center mb-20 md:mb-24">
          <div className="flex items-center justify-center mb-4">
            <span
              className="text-[14px] md:text-[16px] font-bold uppercase tracking-wide font-sans"
              style={{
                background: "linear-gradient(90deg,#1B4CFA,#102C90)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {displayData.header.subtitle}
            </span>
          </div>
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-[#1A1A1A] leading-tight font-sans">
            {displayData.header.title}
          </h2>
          <div className="mx-auto mt-6 max-w-xl px-4">
            <span className="text-[16px] md:text-[18px] font-medium text-[#3D3D3D] leading-relaxed font-sans">
              {displayData.header.description}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-start md:gap-40">
          {categories.length > 0 ? (
            <>
              <div className="flex md:flex-col gap-2 md:min-w-[250px] mb-6 md:mb-0 overflow-x-auto md:overflow-visible">
                {categories.map((category, index) => {
                  const isActive = activeCategory === category;
                  return (
                    <div
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                      className={`cursor-pointer text-left px-3 py-2 text-[14px] md:text-[16px] lg:text-[18px] font-medium font-sans mr-3 md:mr-0 whitespace-nowrap ${
                        isActive
                          ? "bg-gray-100 rounded-lg lg:bg-transparent text-[#1A1A1A]"
                          : "text-[#1A1A1A] hover:bg-gray-50 lg:hover:bg-transparent"
                      }`}
                    >
                      {isActive ? (
                        <span
                          className="hidden lg:inline"
                          style={{
                            background:
                              "linear-gradient(90deg,#1B4CFA,#102C90)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                          }}
                        >
                          {category}
                        </span>
                      ) : null}
                      <span className={isActive ? "lg:hidden" : ""}>
                        {category}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex-1">
                <div className="space-y-8">
                  {faqsToShow.length > 0 ? (
                    faqsToShow.map((faq: FAQTranslationItem, index: number) => {
                      const isOpen = openFAQs.includes(index);
                      return (
                        <div
                          key={faq?.id || index}
                          className="border-b border-gray-200 pb-4"
                        >
                          <button
                            className="w-full flex items-start gap-4 text-left bg-transparent border-0 p-0 cursor-pointer"
                            onClick={() => toggleFAQ(index)}
                            aria-expanded={isOpen}
                          >
                            <span
                              className={`ml-auto text-[24px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1B4CFA] to-[#102C90] transform transition-transform duration-300 ${
                                isOpen ? "rotate-180" : "rotate-0"
                              }`}
                            >
                              {isOpen ? "\u2212" : "+"}
                            </span>
                            <span className="flex-1 text-[16px] md:text-[18px] font-medium text-[#1A1A1A] font-sans">
                              {faq?.question || ""}
                            </span>
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              isOpen
                                ? "max-h-[2000px] opacity-100 py-4"
                                : "max-h-0 opacity-0 py-0"
                            }`}
                          >
                            <div className="text-[14px] md:text-[16px] font-medium text-gray-700 leading-[150%] font-sans">
                              <p>{faq?.answer || ""}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-8">
                      <p>No FAQs found.</p>
                    </div>
                  )}
                </div>

                {faqsForActiveCategory.length > 6 && (
                  <div className="flex justify-center mt-8">
                    <button
                      className="px-6 py-3 bg-gradient-to-r from-[#1B4CFA] to-[#102C90] text-white text-base font-semibold rounded-md shadow-md hover:-translate-y-1 transition-transform"
                      onClick={toggleShowAll}
                    >
                      {showAll
                        ? displayData.showLessButton
                        : displayData.showMoreButton}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="py-8">
              <p>No FAQs found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
