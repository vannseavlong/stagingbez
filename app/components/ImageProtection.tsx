"use client";

import { useEffect } from "react";

/**
 * ImageProtection component - Lightweight image protection
 * Only prevents right-click context menu on images
 * Does NOT block clicks, touches, or other interactions
 */
export default function ImageProtection() {
  useEffect(() => {
    // Only disable right-click on images - nothing else
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu, {
      passive: false,
    });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return null;
}
