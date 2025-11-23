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
}: {
  children: React.ReactNode;
  className?: string;
  showChevron?: boolean;
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
          <path
            d="M1 1.5L7 7.5L13 1.5"
            stroke="currentColor"
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
      className={`absolute left-0 mt-2 z-50 w-auto min-w-[12rem] overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 ${className}`}
      role="menu"
    >
      <div className="py-1">{children}</div>
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
  const base =
    "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-beasy-gradient";
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
