"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type ComparerProps = {
  beforeImg: string;
  afterImg: string;
  className?: string;
  initialPosition?: number; // 0..1
  handleSize?: number;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);

export default function Comparer({
  beforeImg,
  afterImg,
  className,
  initialPosition = 0.5,
  handleSize = 36,
}: ComparerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayInnerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const separatorLineRef = useRef<HTMLDivElement | null>(null);
  const beforeImgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const posRef = useRef(clamp(initialPosition));
  const [, setTick] = useState(0); // used to force minimal re-render for ARIA updates
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const setOverlayPosition = useCallback(
    (ratio: number) => {
      const overlayInner = overlayInnerRef.current;
      const handle = handleRef.current;
      const separatorLine = separatorLineRef.current;
      const container = containerRef.current;

      if (!container) return;
      const rect = container.getBoundingClientRect();

      // Update container width for image sizing
      setContainerWidth(rect.width);

      // Instead of scaleX, we'll use width to clip the overlay
      if (overlayInner) {
        const widthPx = ratio * rect.width;
        overlayInner.style.width = `${widthPx}px`;
      }

      if (handle) {
        const dpr =
          typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
        const rawPx = ratio * rect.width;
        // Snap to physical device pixels to avoid sub-pixel jitter
        const px = Math.round(rawPx * dpr) / dpr;
        // translate3d to ensure GPU compositing
        handle.style.transform = `translate3d(${
          px - handleSize / 2
        }px, -50%, 0)`;
      }

      // Update separator line position
      if (separatorLine) {
        const dpr =
          typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
        const rawPx = ratio * rect.width;
        const px = Math.round(rawPx * dpr) / dpr;
        separatorLine.style.transform = `translate3d(${px}px, 0, 0)`;
      }
    },
    [handleSize]
  );

  // schedule RAF update (debounced to animation frame)
  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      setOverlayPosition(posRef.current);
      // small state toggle so React updates aria-valuenow if needed
      setTick((t) => t + 1);
    });
  }, [setOverlayPosition]);

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const ratio = clamp(x / rect.width);
      posRef.current = ratio;
      scheduleUpdate();
    },
    [scheduleUpdate]
  );

  useEffect(() => {
    // set initial position once images/layout loaded
    setOverlayPosition(posRef.current);
  }, [setOverlayPosition]);

  // when after image loads, capture aspect ratio so both images can be absolutely
  // positioned and perfectly overlap without layout shifts.
  const onAfterLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      if (img.naturalWidth && img.naturalHeight) {
        setAspectRatio(img.naturalHeight / img.naturalWidth);
      }
      // ensure overlay position recalculates after image load
      scheduleUpdate();
    },
    [scheduleUpdate]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Ensure container prefers vertical panning so page scroll is smooth
    el.style.touchAction = "pan-y";

    const onPointerDown = (e: PointerEvent) => {
      // Only left button or touch
      if ((e as any).button !== undefined && (e as any).button !== 0) return;
      draggingRef.current = true;
      // capture pointer to continue receiving events
      try {
        el.setPointerCapture?.((e as any).pointerId);
      } catch {}
      updateFromPointer(e.clientX);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      // prevent default to avoid synthetic scrolls while dragging
      if (e.cancelable) e.preventDefault();
      updateFromPointer(e.clientX);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (draggingRef.current) {
        draggingRef.current = false;
        try {
          el.releasePointerCapture?.((e as any).pointerId);
        } catch {}
      }
    };

    el.addEventListener("pointerdown", onPointerDown as EventListener);
    // attach move on window to continue drag outside container; not passive because we may preventDefault
    window.addEventListener("pointermove", onPointerMove as EventListener);
    window.addEventListener("pointerup", onPointerUp as EventListener);
    window.addEventListener("pointercancel", onPointerUp as EventListener);

    // on resize, reapply overlay position (in case width changed)
    const ro = new ResizeObserver(() => scheduleUpdate());
    ro.observe(el);

    // Optional debug overlay (enable by adding ?compareDebug=1 or localStorage.compareDebug = '1')
    let debugEnabled = false;
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        debugEnabled =
          params.get("compareDebug") === "1" ||
          localStorage.getItem("compareDebug") === "1";
      }
    } catch {}

    let debugDiv: HTMLElement | null = null;
    let dbgRaf: number | null = null;
    let lastPointerX: number | null = null;
    if (debugEnabled) {
      debugDiv = document.createElement("div");
      debugDiv.style.position = "absolute";
      debugDiv.style.right = "8px";
      debugDiv.style.top = "8px";
      debugDiv.style.zIndex = "9999";
      debugDiv.style.background = "rgba(0,0,0,0.6)";
      debugDiv.style.color = "white";
      debugDiv.style.fontSize = "12px";
      debugDiv.style.padding = "8px";
      debugDiv.style.borderRadius = "6px";
      debugDiv.style.pointerEvents = "none";
      el.appendChild(debugDiv);

      const update = () => {
        if (!debugDiv || !el) return;
        const rect = el.getBoundingClientRect();
        const handle = handleRef.current;
        let handleX = -1;
        if (handle) {
          const hRect = handle.getBoundingClientRect();
          handleX = Math.round(hRect.left - rect.left + hRect.width / 2);
        }
        const containerW = Math.round(rect.width);
        const ratio =
          handleX >= 0 && containerW > 0
            ? +(handleX / containerW).toFixed(3)
            : null;
        debugDiv.innerHTML = `w: ${containerW}px<br/>handleX: ${handleX}px<br/>pointerX: ${
          lastPointerX ?? "-"
        }<br/>ratio: ${ratio ?? "-"}`;
      };

      const onDbgPointer = (ev: PointerEvent) => {
        lastPointerX = Math.round(ev.clientX - el.getBoundingClientRect().left);
        if (!dbgRaf) {
          dbgRaf = requestAnimationFrame(() => {
            dbgRaf = null;
            update();
          });
        }
      };

      el.addEventListener("pointermove", onDbgPointer as EventListener, {
        passive: true,
      });
      el.addEventListener("pointerdown", onDbgPointer as EventListener);
      window.addEventListener("resize", update);
      update();
    }

    return () => {
      el.removeEventListener("pointerdown", onPointerDown as EventListener);
      window.removeEventListener("pointermove", onPointerMove as EventListener);
      window.removeEventListener("pointerup", onPointerUp as EventListener);
      window.removeEventListener("pointercancel", onPointerUp as EventListener);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (debugDiv && debugDiv.parentNode)
        debugDiv.parentNode.removeChild(debugDiv);
    };
  }, [scheduleUpdate, updateFromPointer]);

  // keyboard support (arrow keys)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        posRef.current = clamp(posRef.current - 0.02);
        scheduleUpdate();
        e.preventDefault();
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        posRef.current = clamp(posRef.current + 0.02);
        scheduleUpdate();
        e.preventDefault();
      }
    };
    el.addEventListener("keydown", onKey as EventListener);
    return () => el.removeEventListener("keydown", onKey as EventListener);
  }, [scheduleUpdate]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className || ""}`}
      // prefer vertical page scroll when starting touch here
      style={{
        touchAction: "pan-y",
        WebkitTapHighlightColor: "transparent",
        // maintain aspect ratio if known (padding-top trick), otherwise use min-height
        ...(aspectRatio
          ? { paddingTop: `${aspectRatio * 100}%` }
          : { minHeight: "400px" }),
      }}
      tabIndex={0}
      role="group"
      aria-label="Image comparison slider"
    >
      {/* base image (after) - absolutely positioned to perfectly overlap */}
      <img
        src={afterImg}
        alt="After"
        onLoad={onAfterLoad}
        className="block select-none"
        draggable={false}
        onError={() => console.error("Failed to load after image:", afterImg)}
        style={{
          position: aspectRatio ? "absolute" : "relative",
          left: 0,
          top: 0,
          width: "100%",
          height: aspectRatio ? "100%" : "auto",
          objectFit: "cover",
        }}
      />

      {/* overlay that reveals left/before image (we clip the width to reveal the image underneath) */}
      <div
        ref={overlayRef}
        aria-hidden={false}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          height: "100%",
          width: `100%`,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          ref={overlayInnerRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            overflow: "hidden",
            willChange: "width",
          }}
        >
          <img
            ref={beforeImgRef}
            src={beforeImg}
            alt="Before"
            className="block select-none"
            draggable={false}
            onError={() =>
              console.error("Failed to load before image:", beforeImg)
            }
            style={{
              display: "block",
              width: containerWidth > 0 ? `${containerWidth}px` : "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "left center",
            }}
          />
        </div>
      </div>

      {/* vertical separator line */}
      <div
        ref={separatorLineRef}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "3px",
          background: "white",
          boxShadow: "0 0 5px rgba(0,0,0,0.2)",
          zIndex: 15,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      {/* slider handle */}
      <div
        ref={handleRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(posRef.current * 100)}
        tabIndex={0}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          width: `${handleSize}px`,
          height: `${handleSize}px`,
          borderRadius: "9999px",
          background: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "ew-resize",
          zIndex: 20,
          touchAction: "none",
          willChange: "transform",
        }}
        className="select-none"
      >
        {/* Expand/Contract Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ pointerEvents: "none" }}
        >
          <path
            d="M20 17H4"
            stroke="url(#paint0_linear_887_1663)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 14C17 14 19.9999 16.2095 19.9999 17C19.9999 17.7906 16.9999 20 16.9999 20"
            stroke="url(#paint1_linear_887_1663)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 7H20"
            stroke="url(#paint2_linear_887_1663)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.99997 4C6.99997 4 4 6.20947 4 7.00002C3.99999 7.79058 7 10 7 10"
            stroke="url(#paint3_linear_887_1663)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_887_1663"
              x1="20"
              y1="18"
              x2="19.7136"
              y2="15.3205"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1B4CFA" />
              <stop offset="1" stopColor="#102C90" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_887_1663"
              x1="19.9999"
              y1="20"
              x2="15.62"
              y2="18.7194"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1B4CFA" />
              <stop offset="1" stopColor="#102C90" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_887_1663"
              x1="20"
              y1="8"
              x2="19.695"
              y2="5.32471"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1B4CFA" />
              <stop offset="1" stopColor="#102C90" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_887_1663"
              x1="7"
              y1="10"
              x2="2.62011"
              y2="8.71938"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1B4CFA" />
              <stop offset="1" stopColor="#102C90" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
