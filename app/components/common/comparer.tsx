"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useId,
  memo,
} from "react";
import Image, { StaticImageData } from "next/image";
import { CompareHandle } from "../icons/svgs";

type ComparerProps = {
  beforeImg: string | StaticImageData;
  afterImg: string | StaticImageData;
  className?: string;
  initialPosition?: number; // 0..1
  handleSize?: number;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);

function ComparerComponent({
  beforeImg,
  afterImg,
  className,
  initialPosition = 0.5,
  handleSize = 36,
}: ComparerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayInnerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const separatorLineRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const posRef = useRef(clamp(initialPosition));
  const [, setTick] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const svgId = useId();

  const setOverlayPosition = useCallback(
    (ratio: number) => {
      const overlayInner = overlayInnerRef.current;
      const handle = handleRef.current;
      const separatorLine = separatorLineRef.current;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const widthPx = ratio * rect.width;

      if (overlayInner) overlayInner.style.width = `${widthPx}px`;
      if (handle) {
        const px = widthPx;
        handle.style.transform = `translate3d(${px - handleSize / 2
          }px, -50%, 0)`;
      }
      if (separatorLine) {
        const px = widthPx;
        separatorLine.style.transform = `translate3d(${px}px, 0, 0)`;
      }
    },
    [handleSize]
  );

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      setOverlayPosition(posRef.current);
      setTick((t) => t + 1);
    });
  }, [setOverlayPosition]);

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width);
      posRef.current = ratio;
      scheduleUpdate();
    },
    [scheduleUpdate]
  );

  const onImageLoad = useCallback(
    (res: any) => {
      const nw = res?.naturalWidth ?? res?.currentTarget?.naturalWidth;
      const nh = res?.naturalHeight ?? res?.currentTarget?.naturalHeight;
      if (nw && nh) setAspectRatio(nh / nw);
      scheduleUpdate();
    },
    [scheduleUpdate]
  );

  useEffect(() => {
    setOverlayPosition(posRef.current);

    const el = containerRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if ((e as any).button !== undefined && (e as any).button !== 0) return;
      draggingRef.current = true;
      el.setPointerCapture?.((e as any).pointerId);
      updateFromPointer(e.clientX);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      if (e.cancelable) e.preventDefault();
      updateFromPointer(e.clientX);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (draggingRef.current) {
        draggingRef.current = false;
        el.releasePointerCapture?.((e as any).pointerId);
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    const ro = new ResizeObserver(() => scheduleUpdate());
    ro.observe(el);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [setOverlayPosition, updateFromPointer, scheduleUpdate]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className || ""}`}
      style={{
        touchAction: "pan-y",
        WebkitTapHighlightColor: "transparent",
        ...(aspectRatio ? { paddingTop: `${aspectRatio * 100}%` } : {}),
      }}
      tabIndex={0}
      role="group"
      aria-label="Image comparison slider"
    >
      <Image
        src={afterImg}
        alt="After"
        onLoad={onImageLoad}
        className="block select-none"
        draggable={false}
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />

      <div
        ref={overlayInnerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={beforeImg}
          alt="Before"
          onLoad={onImageLoad}
          className="block select-none"
          draggable={false}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "left center" }}
        />
      </div>

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
        <CompareHandle idSuffix={svgId} style={{ pointerEvents: "none" }} />
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(ComparerComponent);
