"use client";
import React, {
  useRef,
  useEffect,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useId,
} from "react";

type Props = {
  children: ReactNode;
};

export type ServiceCarouselHandle = {
  next: () => void;
  prev: () => void;
  scrollByAmount: (amt: number) => void;
  // returns true when content overflows horizontally
  isOverflowing: () => boolean;
};

const ServiceCarousel = forwardRef<ServiceCarouselHandle, Props>(
  ({ children }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    // useId is SSR-safe and will generate stable ids across server and client.
    const reactId = useId();
    // sanitize useId output to create a valid DOM id (remove colons)
    const safeId = `svc-carousel-${reactId.replace(/:/g, "-")}`;

    useEffect(() => {
      const id = safeId;
      const style = document.createElement("style");
      style.setAttribute("data-generated", id);
      style.innerHTML = `#${id} { -ms-overflow-style: none; scrollbar-width: none; } #${id}::-webkit-scrollbar { display: none; }`;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }, [safeId]);

    const scrollBy = (amount: number) => {
      const el = containerRef.current;
      if (!el) return;
      el.scrollBy({ left: amount, behavior: "smooth" });
    };

    const isOverflowing = () => {
      const el = containerRef.current;
      if (!el) return false;
      return el.scrollWidth > el.clientWidth + 1;
    };

    const prev = () => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      scrollBy(-Math.round(w * 0.7));
    };

    const next = () => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      scrollBy(Math.round(w * 0.7));
    };

    useImperativeHandle(ref, () => ({
      next,
      prev,
      scrollByAmount: scrollBy,
      isOverflowing,
    }));

    return (
      <div>
        <div
          id={safeId}
          ref={containerRef}
          className="overflow-x-auto scrollbar-hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex flex-row gap-6 py-2">{children}</div>
        </div>
      </div>
    );
  }
);

ServiceCarousel.displayName = "ServiceCarousel";

export default ServiceCarousel;
