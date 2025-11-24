import React from "react";

type CompareHandleProps = {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  /** optional suffix to keep gradient ids unique when used multiple times on a page */
  idSuffix?: string;
};

export function CompareHandle({
  width = 24,
  height = 24,
  className,
  style,
  idSuffix = "",
}: CompareHandleProps) {
  const prefix = idSuffix ? `compare-${idSuffix}` : "compare";
  const id0 = `${prefix}-paint0`;
  const id1 = `${prefix}-paint1`;
  const id2 = `${prefix}-paint2`;
  const id3 = `${prefix}-paint3`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M20 17H4"
        stroke={`url(#${id0})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 14C17 14 19.9999 16.2095 19.9999 17C19.9999 17.7906 16.9999 20 16.9999 20"
        stroke={`url(#${id1})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 7H20"
        stroke={`url(#${id2})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.99997 4C6.99997 4 4 6.20947 4 7.00002C3.99999 7.79058 7 10 7 10"
        stroke={`url(#${id3})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={id0}
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
          id={id1}
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
          id={id2}
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
          id={id3}
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
  );
}
