"use client";

import React from "react";

type Props = {
  open: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
};

// Animated hamburger -> X button. Controlled by `open` prop.
export default function HamburgerXButton({
  open,
  onClick,
  className,
  ariaLabel = "Toggle menu",
}: Props) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-expanded={open}
      onClick={onClick}
      className={className}
    >
      <div className="relative w-6 h-6 flex items-center justify-center transform-gpu">
        <span
          className={`block absolute left-0 right-0 h-[2px] bg-current transform transition-transform duration-500 ease-out origin-center motion-reduce:motion-safe:duration-150 ${
            open ? "translate-y-0 rotate-45" : "-translate-y-[6px] rotate-0"
          }`}
        />
        <span
          className={`block absolute left-0 right-0 h-[2px] bg-current transition-opacity duration-300 ease-out motion-reduce:motion-safe:duration-150 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block absolute left-0 right-0 h-[2px] bg-current transform transition-transform duration-500 ease-out origin-center motion-reduce:motion-safe:duration-150 ${
            open ? "translate-y-0 -rotate-45" : "translate-y-[6px] rotate-0"
          }`}
        />
      </div>
    </button>
  );
}
