"use client";

import { useEffect, RefObject } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Hook: fires a `web-v2:section_view` event once when a DOM node becomes visible.
 * Usage: const ref = useRef(null); useSectionView(ref, 'HeroSection');
 */
export default function useSectionView(
  ref: RefObject<Element>,
  sectionName: string,
  options: IntersectionObserverInit = { threshold: 0.4 }
) {
  useEffect(() => {
    if (!ref?.current || typeof IntersectionObserver === "undefined") return;

    const el = ref.current;
    let fired = false;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!fired && entry.isIntersecting) {
          fired = true;
          trackEvent("section_view", { section: sectionName });
        }
      });
    }, options);

    obs.observe(el);

    return () => obs.disconnect();
  }, [ref, sectionName, options]);
}
