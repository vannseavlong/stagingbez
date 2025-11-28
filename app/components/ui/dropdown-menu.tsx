"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import Link from "next/link";

type ContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DropdownMenuContext = createContext<ContextType | null>(null);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  className = "",
  showChevron = true,
  chevronGradient = false,
}: {
  children: React.ReactNode;
  className?: string;
  showChevron?: boolean;
  chevronGradient?: boolean;
}) {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) return null;

  return (
    <button
      type="button"
      aria-expanded={ctx.open}
      onClick={() => ctx.setOpen(!ctx.open)}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      {children}
      {showChevron ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            ctx.open ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 14 10"
          fill="none"
          aria-hidden
        >
          {chevronGradient ? (
            <defs>
              <linearGradient id="beasyChevronGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1B4CFA" />
                <stop offset="100%" stopColor="#102C90" />
              </linearGradient>
            </defs>
          ) : null}
          <path
            d="M1 1.5L7 7.5L13 1.5"
            stroke={chevronGradient ? "url(#beasyChevronGrad)" : "currentColor"}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = useContext(DropdownMenuContext);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) ctx?.setOpen(false);
    }
    if (ctx?.open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [ctx]);

  if (!ctx) return null;

  return ctx.open ? (
    <div
      ref={ref}
      className={`absolute left-0 mt-4 z-50 w-auto min-w-[12rem] overflow-hidden rounded-[6px] bg-white shadow-lg border border-[#E8E8E8] ${className}`}
      role="menu"
    >
      <div className="flex flex-col gap-4 py-4">{children}</div>
    </div>
  ) : null;
}

export function DropdownMenuItem({
  href,
  children,
  onSelect,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}) {
  const ctx = useContext(DropdownMenuContext);
  const base = "flex items-center gap-2 px-6 py-0 text-[16px] font-medium";
  return (
    <Link
      href={href}
      onClick={() => {
        ctx?.setOpen(false);
        onSelect?.();
      }}
      className={`${base} ${className}`}
    >
      {children}
    </Link>
  );
}

export default DropdownMenu;
