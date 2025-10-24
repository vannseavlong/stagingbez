"use client";

import Image from "next/image";
import { useTranslate } from "@/app/hooks/useTranslate";
import { useState, useEffect } from "react";

export default function TestimonialSection() {
  const { t } = useTranslate();

  const subtitle = t("testimonial.subtitle", "TESTIMONIALS");
  const title = t("testimonial.title", "What Our Customers Say");
  const description = t(
    "testimonial.description",
    "Hear what our customers have to say about their experience with us."
  );

  return (
    <section className="py-16 overflow-x-hidden">
      <div className="max-w-5xl mx-auto text-center px-4 overflow-x-hidden">
        {/* Subtitle */}
        <div
          className="font-bold text-[14px] md:text-[16px] leading-6 mb-4 font-[Inter]"
          style={{
            background: "linear-gradient(90deg,#1B4CFA,#102C90)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {subtitle}
        </div>

        {/* Title */}
        <h2 className="text-[24px] md:text-[32px] font-bold text-[#1a1a1a] mb-6 font-[Inter]">
          {title}
        </h2>

        {/* Description */}
        <p className="text-[16px] md:text-[18px] font-medium text-[#1a1a1a] max-w-2xl mx-auto mb-10 font-[Inter]">
          {description}
        </p>

        {/* Video area: interactive row of videos/thumbnails */}
        <div className="mt-8 w-full max-w-full">
          <VideoRow />
        </div>
      </div>
    </section>
  );
}

function VideoRow() {
  const { t } = useTranslate();

  const items = [
    {
      img: "/images/testimonial/loung_coffee.webp",
      caption: t("testimonial.captions.cafeLounge", "Cafe Lounge"),
      videoId: "lTYwpANidX4",
      videoSi: "naY-J-GMJyEpgiFA",
    },
    {
      img: "/images/testimonial/willow_coffee.webp",
      caption: t("testimonial.captions.willowCoffee", "Willow Coffee"),
      videoId: "1ErTMLL-QrQ",
      videoSi: "UpBmOPN1A6zsG0SM",
    },
    {
      img: "/images/testimonial/pang_coffee.webp",
      caption: t("testimonial.captions.pangCafe", "1987 Pang & Cafe"),
      videoId: "a9zqWXhw0R4",
      videoSi: "gIiuPT0g2vPO4TO7",
    },
  ];
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [centerIndex, setCenterIndex] = useState<number>(1); // focus middle by default (index 1 = Willow Coffee)
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Function to rotate items array so the selected index becomes the center
  const getRotatedItems = (selectedIndex: number) => {
    // For 3 items: [0, 1, 2]
    // If selectedIndex = 0, return [2, 0, 1] (0 in center)
    // If selectedIndex = 1, return [0, 1, 2] (1 in center - default)
    // If selectedIndex = 2, return [1, 2, 0] (2 in center)
    const len = items.length;
    const result: typeof items = [];
    for (let i = 0; i < len; i++) {
      const idx = (selectedIndex - 1 + i + len) % len;
      result.push(items[idx]);
    }
    return result;
  };

  const rotatedItems = getRotatedItems(centerIndex);

  const handleCardClick = (position: "left" | "center" | "right") => {
    // Stop any playing video when swapping
    if (position !== "center") {
      setPlayingIndex(null);
    }

    if (position === "left") {
      // Move left card to center
      setCenterIndex((centerIndex - 1 + items.length) % items.length);
    } else if (position === "right") {
      // Move right card to center
      setCenterIndex((centerIndex + 1) % items.length);
    }
    // Center card click does nothing (already centered)
  };

  // Desktop: show three cards with center focus (no scrolling)
  if (isDesktop) {
    return (
      <div className="hidden lg:flex items-center justify-center gap-8">
        {rotatedItems.map((it, position) => {
          const isCenter = position === 1;
          const sizeClass = isCenter
            ? "w-[418px] h-[743px]"
            : "w-[300px] h-[533px] opacity-80";
          const positionKey =
            position === 0 ? "left" : position === 1 ? "center" : "right";
          const originalIdx = items.findIndex(
            (item) => item.caption === it.caption
          );
          const currentVideo = items[originalIdx];
          return (
            <div
              key={`${it.caption}-${position}`}
              onClick={() =>
                handleCardClick(positionKey as "left" | "center" | "right")
              }
              className={`transition-all duration-300 ${sizeClass} relative rounded-sm overflow-hidden shadow-lg cursor-pointer`}
              style={{ minWidth: isCenter ? 418 : 300 }}
            >
              {playingIndex === originalIdx && isCenter ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentVideo.videoId}?si=${currentVideo.videoSi}&rel=0&autoplay=1`}
                  title={`Testimonial video ${originalIdx}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-black/30" />
                  <Image
                    src={it.img}
                    alt={it.caption}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  {isCenter && (
                    <button
                      aria-label={`Play ${it.caption}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlayingIndex(originalIdx);
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-20 h-20 md:w-16 md:h-16 rounded-full shadow-2xl hover:scale-110 transition-transform duration-200"
                      style={{
                        background:
                          "linear-gradient(300.32deg, #1B4CFA 0%, #102C90 100%)",
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.1875 17.128C24.7162 18.9187 22.489 20.184 18.0343 22.7148C13.728 25.1612 11.575 26.3845 9.83979 25.8928C9.12242 25.6895 8.46881 25.3035 7.94167 24.7716C6.66669 23.4852 6.66669 20.9901 6.66669 16C6.66669 11.0099 6.66669 8.5148 7.94167 7.22843C8.46881 6.6966 9.12242 6.31051 9.83979 6.10723C11.575 5.61553 13.728 6.83876 18.0343 9.28524C22.489 11.816 24.7162 13.0813 25.1875 14.872C25.382 15.6112 25.382 16.3888 25.1875 17.128Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                  <div className="absolute bottom-3 left-3 text-white font-medium text-lg font-[Roboto]">
                    {it.caption}
                  </div>
                </>
              )}
              {playingIndex === originalIdx && isCenter && (
                <button
                  aria-label="Close video"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlayingIndex(null);
                  }}
                  className="absolute top-3 right-3 z-30 bg-white/80 rounded-full p-2"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Tablet & Mobile: show 3 cards with swappable center focus
  return (
    <div className="lg:hidden">
      <div className="relative">
        {/* Prev / Next buttons for tablet & mobile */}
        <button
          aria-label="Previous testimonial"
          onClick={() => {
            setPlayingIndex(null);
            setCenterIndex((centerIndex - 1 + items.length) % items.length);
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white/90 rounded-full p-2 shadow-md md:p-3"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          aria-label="Next testimonial"
          onClick={() => {
            setPlayingIndex(null);
            setCenterIndex((centerIndex + 1) % items.length);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/90 rounded-full p-2 shadow-md md:p-3"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center justify-center gap-4 px-4 py-8 overflow-hidden">
          {rotatedItems.map((it, position) => {
            const isCenter = position === 1;
            const positionKey =
              position === 0 ? "left" : position === 1 ? "center" : "right";
            const originalIdx = items.findIndex(
              (item) => item.caption === it.caption
            );
            const currentVideo = items[originalIdx];
            // sizes: smaller frames for mobile, medium for tablet
            const width = isCenter ? 280 : 200;
            const height = isCenter ? 500 : 360;
            return (
              <div
                key={`${it.caption}-${position}`}
                onClick={() =>
                  handleCardClick(positionKey as "left" | "center" | "right")
                }
                className={`relative rounded-sm overflow-hidden shadow-lg flex-shrink-0 transition-all duration-500 ease-in-out cursor-pointer ${
                  isCenter ? "z-20 scale-100" : "opacity-80 scale-95"
                }`}
                style={{ width, height }}
              >
                {playingIndex === originalIdx && isCenter ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${currentVideo.videoId}?si=${currentVideo.videoSi}&rel=0&autoplay=1`}
                    title={`Testimonial video ${originalIdx}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/30" />
                    <Image
                      src={it.img}
                      alt={it.caption}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    {isCenter && (
                      <button
                        aria-label={`Play ${it.caption}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingIndex(originalIdx);
                        }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl hover:scale-110 transition-transform duration-200"
                        style={{
                          background:
                            "linear-gradient(300.32deg, #1B4CFA 0%, #102C90 100%)",
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="md:w-8 md:h-8"
                        >
                          <path
                            d="M25.1875 17.128C24.7162 18.9187 22.489 20.184 18.0343 22.7148C13.728 25.1612 11.575 26.3845 9.83979 25.8928C9.12242 25.6895 8.46881 25.3035 7.94167 24.7716C6.66669 23.4852 6.66669 20.9901 6.66669 16C6.66669 11.0099 6.66669 8.5148 7.94167 7.22843C8.46881 6.6966 9.12242 6.31051 9.83979 6.10723C11.575 5.61553 13.728 6.83876 18.0343 9.28524C22.489 11.816 24.7162 13.0813 25.1875 14.872C25.382 15.6112 25.382 16.3888 25.1875 17.128Z"
                            fill="white"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                    <div className="absolute bottom-3 left-3 text-white font-medium text-lg z-20 font-[Roboto]">
                      {it.caption}
                    </div>
                  </>
                )}
                {playingIndex === originalIdx && isCenter && (
                  <button
                    aria-label="Close video"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlayingIndex(null);
                    }}
                    className="absolute top-3 right-3 z-30 bg-white/80 rounded-full p-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
