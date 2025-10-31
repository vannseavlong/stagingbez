"use client";

import Image from "next/image";
import { useTranslate } from "@/app/hooks/useTranslate";
import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

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
      <div className="max-w-[1440px] mx-auto text-center px-6 sm:px-8 lg:px-16 overflow-x-hidden">
        {/* Subtitle */}
        <div
          className="font-bold text-[16px] md:text-[16px] leading-[32px] mb-4 font-sans"
          style={{
            background: "linear-gradient(90deg,#1B4CFA,#102C90)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {subtitle}
        </div>

        {/* Title */}
        <h2 className="text-[24px] md:text-[32px] font-bold text-[#1a1a1a] mb-6 font-sans">
          {title}
        </h2>

        {/* Description */}
        <p className="text-[16px] md:text-[18px] font-medium text-[#1a1a1a] max-w-2xl mx-auto mb-10 font-sans">
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
    // ... (Your items array remains the same)
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
    // Added YouTube Shorts as requested
    {
      img: "/images/testimonial/aircon.webp",
      caption: t("testimonial.captions.short1", "Air Conditioner Cleaning"),
      videoId: "3MMXjKZDNlo",
      videoSi: "",
    },
    {
      img: "/images/testimonial/all_in_bEasy.webp",
      caption: t("testimonial.captions.short2", "Everything with bEasy"),
      videoId: "xq0WCurantk",
      videoSi: "",
    },
  ];
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [centerIndex, setCenterIndex] = useState<number>(1); // focus middle by default (index 1 = Willow Coffee)
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  // 💡 NEW STATE for the transition
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const getVisibleItems = (selectedIndex: number) => {
    // ... (Your getVisibleItems logic remains the same)
    const len = items.length;
    if (len === 0) return [] as typeof items;
    if (len === 1) return [items[0], items[0], items[0]] as typeof items;
    if (len === 2)
      return [
        items[(selectedIndex - 1 + len) % len],
        items[selectedIndex],
        items[(selectedIndex + 1) % len],
      ] as typeof items;

    // Normal case: len >= 3
    const left = items[(selectedIndex - 1 + len) % len];
    const center = items[selectedIndex];
    const right = items[(selectedIndex + 1) % len];
    return [left, center, right];
  };

  const rotatedItems = getVisibleItems(centerIndex);

  const handleCardClick = (position: "left" | "center" | "right") => {
    if (position !== "center") {
      setPlayingIndex(null);
      // 💡 NEW: Set direction for visual transition cue (even if simple fade/scale)
      if (position === "left") {
        setDirection("prev");
        setCenterIndex(
          (prevIndex) => (prevIndex - 1 + items.length) % items.length
        );
      } else if (position === "right") {
        setDirection("next");
        setCenterIndex((prevIndex) => (prevIndex + 1) % items.length);
      }
      // 💡 NEW: Clear direction after a short delay (must match transition duration)
      setTimeout(() => setDirection(null), 500); // 500ms matches the transition-all duration below
    }
  };

  const handleNext = () => {
    setPlayingIndex(null);
    setDirection("next");
    setCenterIndex((prevIndex) => (prevIndex + 1) % items.length);
    setTimeout(() => setDirection(null), 500);
  };

  const handlePrev = () => {
    setPlayingIndex(null);
    setDirection("prev");
    setCenterIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
    setTimeout(() => setDirection(null), 500);
  };
  // ... (isDesktop logic remains the same)

  // Desktop: show three cards with center focus (no scrolling)
  if (isDesktop) {
    // ... (Desktop return block remains the same, but the transition class is already there)
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
              // ✅ Desktop already has the transition class: `transition-all duration-300`
              className={`transition-all duration-300 ${sizeClass} relative rounded-sm overflow-hidden shadow-lg cursor-pointer`}
              style={{ minWidth: isCenter ? 418 : 300 }}
            >
              {/* ... (Video and Image content for desktop) ... */}
              {playingIndex === originalIdx && isCenter ? (
                (() => {
                  const siParam = currentVideo.videoSi
                    ? `&si=${currentVideo.videoSi}`
                    : "";
                  const src = `https://www.youtube.com/embed/${currentVideo.videoId}?rel=0&autoplay=1${siParam}`;
                  return (
                    <iframe
                      className="w-full h-full"
                      src={src}
                      title={`Testimonial video ${originalIdx}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  );
                })()
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
                        try {
                          trackEvent("video_play", {
                            video_index: originalIdx,
                            video_id: currentVideo.videoId,
                            title: currentVideo.caption,
                          });
                        } catch {}
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
                  <div className="absolute bottom-3 left-3 text-white font-medium text-lg font-sans">
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
                  className="absolute top-3 right-3 z-30 rounded-full p-2 text-white"
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
          onClick={handlePrev} // 💡 Use new handler
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white/90 rounded-full p-2 shadow-md md:p-3"
        >
          {/* ... (SVG content) ... */}
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
          onClick={handleNext} // 💡 Use new handler
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/90 rounded-full p-2 shadow-md md:p-3"
        >
          {/* ... (SVG content) ... */}
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

        {/* 💡 Apply transition to the inner container */}
        <div
          key={centerIndex} // 💡 Key change forces re-render/transition on content change
          className={`flex items-center justify-center gap-4 px-4 py-8 overflow-hidden transition-all duration-500 ease-in-out ${
            direction === "next"
              ? "animate-slide-out-left"
              : direction === "prev"
              ? "animate-slide-out-right"
              : ""
          }`}
        >
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
                // ✅ Inner transition remains here for the scaling/opacity effect
                className={`relative rounded-sm overflow-hidden shadow-lg flex-shrink-0 transition-all duration-500 ease-in-out cursor-pointer ${
                  isCenter ? "z-20 scale-100" : "opacity-80 scale-95"
                }`}
                style={{ width, height }}
              >
                {/* ... (Content remains the same) ... */}
                {playingIndex === originalIdx && isCenter ? (
                  // ... iframe ...
                  (() => {
                    const siParam = currentVideo.videoSi
                      ? `&si=${currentVideo.videoSi}`
                      : "";
                    const src = `https://www.youtube.com/embed/${currentVideo.videoId}?rel=0&autoplay=1${siParam}`;
                    return (
                      <iframe
                        className="w-full h-full"
                        src={src}
                        title={`Testimonial video ${originalIdx}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    );
                  })()
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
                      try {
                        trackEvent("video_close", {
                          video_index: originalIdx,
                          video_id: currentVideo.videoId,
                          title: currentVideo.caption,
                        });
                      } catch {}
                      setPlayingIndex(null);
                    }}
                    className="absolute top-3 right-3 z-30 rounded-full p-2 text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
        </div>
        {/* Indicators here if you had them */}
      </div>
    </div>
  );
}
