"use client";

import React, { useId, useEffect, useState, useRef } from "react";
import Image from "next/image";

type TaskSection = {
  title?: string;
  items: string[];
};

type TaskInfoProps = {
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  // Now accepts multiple task sections
  taskList?: TaskSection[];
};

export default function TaskInfo({
  title = "What’s Included in Your Cleaning Task",
  imageSrc = "/images/services/AC_cleaning.webp",
  imageAlt = "Cleaning procedure",
  taskList = [
    {
      title: "Information of procedure",
      items: [
        "Vacuum all sofa surfaces",
        "Spray specialized cleaning solution on all sofa surfaces",
        "Use scrubber to remove stains and grime",
        "Vacuum remaining residue",
        "Rinse and vacuum again",
        "Vacuum dry",
        "Tidy work area",
      ],
    },
  ],
}: TaskInfoProps) {
  // unique id to scope injected styles
  const id = useId();
  const scrollId = `task-titles-${id.replace(/:/g, "-")}`;
  const tasksId = `task-list-${id.replace(/:/g, "-")}`;
  const imageRef = useRef<HTMLDivElement | null>(null);
  const tasksRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxTasksHeight, setMaxTasksHeight] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    // inject small CSS to hide horizontal scrollbar for the titles strip
    const style = document.createElement("style");
    style.setAttribute("data-generated", scrollId);
    style.innerHTML = `#${scrollId} { -ms-overflow-style: none; scrollbar-width: none; } #${scrollId}::-webkit-scrollbar { display: none; }`;
    document.head.appendChild(style);
    return () => {
      try {
        document.head.removeChild(style);
      } catch {
        /* ignore */
      }
    };
  }, [scrollId]);

  // Inject CSS to hide scrollbar for the vertical task list
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-generated", tasksId);
    style.innerHTML = `#${tasksId} { -ms-overflow-style: none; scrollbar-width: none; } #${tasksId}::-webkit-scrollbar { display: none; }`;
    document.head.appendChild(style);
    return () => {
      try {
        document.head.removeChild(style);
      } catch {
        /* ignore */
      }
    };
  }, [tasksId]);

  // Measure image container height and apply to tasks container so they align
  useEffect(() => {
    function measure() {
      try {
        const h = imageRef.current?.clientHeight;
        if (h && h > 0) setMaxTasksHeight(h);
      } catch {
        /* ignore measurement errors */
      }
    }

    // measure after mount and on resize
    measure();
    const ro = new ResizeObserver(measure);
    if (imageRef.current) ro.observe(imageRef.current);
    window.addEventListener("resize", measure);
    // also measure again shortly after (image load etc)
    const t = window.setTimeout(measure, 250);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
      try {
        ro.disconnect();
      } catch {
        /* ignore */
      }
    };
  }, [imageRef, taskList, activeIndex]);

  // ensure active index stays valid when taskList changes
  useEffect(() => {
    if (activeIndex >= taskList.length) setActiveIndex(0);
  }, [taskList, activeIndex]);

  return (
    <section className="w-full font-sans">
      {/* Blue header background */}
      <div className="relative w-full">
        <div className="bg-gradient-to-r from-[#0b3ea8] to-[#1a5ff8]">
          <div className="max-w-[1440px] h-[450px] mx-auto px-6 sm:px-8 lg:px-16">
            <div className="pt-12 md:pt-16 lg:pt-24 pb-6 md:pb-8 lg:pb-10 relative">
              <h2 className="text-white font-sans font-bold text-[24px] md:text-[32px] leading-tight lg:leading-tight">
                {title}
              </h2>
            </div>
          </div>
        </div>

        {/* White card overlapping the blue area */}
        <div className="-mt-[220px] md:-mt-[240px] lg:-mt-[260px]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
            <div className="bg-white shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 lg:p-8">
                {/* Title and tabs row: title left, horizontal tabs right (desktop) */}
                <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div
                    id={scrollId}
                    className="flex gap-4 overflow-x-auto pb-3"
                  >
                    {taskList.map((sec, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`whitespace-nowrap text-[16px] font-medium px-3 py-2 ${
                          i === activeIndex
                            ? "text-[#0f4ac9] border-b-2 border-[#0f4ac9]"
                            : "text-gray-700"
                        }`}
                      >
                        {sec.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-8">
                  {/* Left - image */}
                  <div className="w-full lg:w-1/2">
                    <div
                      ref={imageRef}
                      className="border border-gray-100 p-0 bg-gray-50 relative w-full aspect-[4/3] overflow-hidden"
                    >
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        sizes="(min-width: 450px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Right - titles (horizontal scroll) + tasks (vertical scroll trimmed to image height) */}
                  <div className="w-full lg:w-1/2 flex flex-col pt-2 md:pt-3 lg:pt-0 h-full">
                    <div
                      id={tasksId}
                      ref={tasksRef}
                      className="overflow-y-auto flex-1"
                      style={{
                        maxHeight: maxTasksHeight
                          ? `${maxTasksHeight}px`
                          : undefined,
                      }}
                    >
                      <ul className="space-y-4 mt-0">
                        {(taskList[activeIndex]?.items || []).map((it, idx) => (
                          <li key={idx} className="flex items-start gap-4">
                            <span
                              className="mt-1 flex-shrink-0 text-[#0f4ac9]"
                              aria-hidden
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 2L13.59 8.26L20 9.27L15 13.14L16.18 19.5L12 16.77L7.82 19.5L9 13.14L4 9.27L10.41 8.26L12 2Z"
                                  fill="#0f4ac9"
                                />
                              </svg>
                            </span>
                            <p className="text-[#374151] text-[16px] leading-relaxed">
                              {it}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
