"use client"; // Required for App Router

import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";

type ImageComparerProps = {
  beforeImg: string;
  afterImg: string;
  className?: string;
};

const ReactCompareImage = dynamic(() => import("react-compare-image"), {
  ssr: false,
  // Optional: Show a simple loading state while the component is being downloaded/rendered on the client.
  loading: () => (
    <div className="flex justify-center items-center h-96 bg-gray-100 rounded-lg">
      Loading Comparison...
    </div>
  ),
});

const ImageComparer = ({
  beforeImg,
  afterImg,
  className,
}: ImageComparerProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = wrapperRef.current;
    if (!root) return;

    const container = root.querySelector(
      '[data-testid="container"]'
    ) as HTMLElement | null;
    if (!container) return;

    // Prefer vertical page pans while allowing horizontal slider gestures.
    container.style.touchAction = "pan-y";
    (container.style as any)["-ms-touch-action"] = "pan-y";

    // Make internal images non-selectable and block pointer events so the slider receives input cleanly.
    const imgs = Array.from(container.querySelectorAll("img")) as HTMLElement[];
    imgs.forEach((img) => {
      img.style.userSelect = "none";
      img.style.pointerEvents = "none";
      img.style.display = "block";
      // keep images aligned and avoid transforms that can cause sub-pixel jitter
      (img.style as any).backfaceVisibility = "hidden";
    });

    // Make slider element capture pointer but not block touch-action on parent
    const slider = container.querySelector(
      '[data-testid="container"] > div'
    ) as HTMLElement | null;
    if (slider) {
      slider.style.touchAction = "none";
    }

    return () => {
      try {
        if (container) {
          container.style.touchAction = "";
          (container.style as any)["-ms-touch-action"] = "";
        }
        imgs.forEach((img) => {
          img.style.userSelect = "";
          img.style.pointerEvents = "";
          img.style.display = "";
          (img.style as any).backfaceVisibility = "";
        });
        if (slider) slider.style.touchAction = "";
      } catch {}
    };
  }, []);

  return (
    // Let the parent control width. Add a wrapper ref so we can adjust internal element styles for smoother gestures.
    <div
      ref={wrapperRef}
      className={`w-full mx-auto ${className || ""}`}
      style={{ touchAction: "pan-y" }}
    >
      <ReactCompareImage
        leftImage={beforeImg}
        rightImage={afterImg}
        // centered start position
        sliderPositionPercentage={0.5}
        // slightly larger handle for easier dragging on touch devices
        handleSize={44}
        // reduce slider line width for a cleaner look
        sliderLineWidth={2}
        // ensure the images inside the component use these CSS fallbacks as well
        leftImageCss={{
          userSelect: "none",
          pointerEvents: "none",
          display: "block",
        }}
        rightImageCss={{
          userSelect: "none",
          pointerEvents: "none",
          display: "block",
        }}
      />
    </div>
  );
};

export default ImageComparer;
