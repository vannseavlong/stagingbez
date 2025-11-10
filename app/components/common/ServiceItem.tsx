import React from "react";
import Image, { type StaticImageData } from "next/image";

type Props = {
  title: string;
  // path to image in public/external URL OR a static import (StaticImageData)
  imageSrc?: string | StaticImageData;
  price?: string | number;
  className?: string;
};

export default function ServiceItem({
  title,
  imageSrc = "/images/services/sofa.png",
  price = "0",
  className = "",
}: Props) {
  return (
    <article
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col justify-between min-h-[240px] ${className}`}
    >
      <div>
        <div className="inline-block rounded-lg p-3 bg-white border border-gray-100">
          {/* Use plain <img> to reliably load from /public; Next/Image sometimes needs static imports */}
          <Image
            src={imageSrc}
            alt={title}
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
        </div>

        <h4 className="mt-4 text-[18px] font-semibold text-gray-900 leading-tight">
          {title}
        </h4>
      </div>

      <>
        {/* make divider span the full card width including padded edges */}
        <hr className="-mx-8 my-6 border-t border-gray-200" />

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Starts From:</div>
          <div className="text-lg font-extrabold text-gray-900">${price}</div>
        </div>
      </>
    </article>
  );
}
