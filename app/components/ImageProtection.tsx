"use client";

import { useEffect } from "react";

/**
 * ImageProtection component - Global image protection
 * Add this component to your layout to protect all images site-wide
 */
export default function ImageProtection() {
  useEffect(() => {
    // Disable right-click on all images
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.closest("img")) {
        e.preventDefault();
        return false;
      }
    };

    // Disable drag on all images
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        e.preventDefault();
        return false;
      }
    };

    // Prevent keyboard shortcuts for saving images (Ctrl+S on image)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S / Cmd+S when focused on an image
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        const activeElement = document.activeElement;
        if (activeElement?.tagName === "IMG") {
          e.preventDefault();
          return false;
        }
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
