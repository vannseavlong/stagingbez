"use client";

import Image from "next/image";
import React from "react";

type CoreItem = {
  icon: string; // image src path
  title: string;
  description: string;
};

export default function CoreValue({ items }: { items: CoreItem[] }) {
  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Desktop: single row with dividers */}
        <div className="hidden lg:flex divide-x divide-gray-200 border-b">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex-1 p-6 text-center ${
                i === 0 ? "border-l border-gray-200" : ""
              } ${i === items.length - 1 ? "border-r border-gray-200" : ""}`}
            >
              <div className="flex justify-center mb-3">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={44}
                  height={44}
                  className="w-[44px] h-[44px]"
                />
              </div>
              <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-3 font-sans">
                {item.title}
              </h3>
              <p className="text-[#3D3D3D] text-sm leading-relaxed mx-auto max-w-[260px] h-[80px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tablet: two columns */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-0 lg:hidden">
          {items.map((item, i) => (
            <div key={i} className="p-4 text-center border">
              <div className="flex justify-center mb-3">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={44}
                  height={44}
                  className="w-[44px] h-[44px]"
                />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: stacked single column */}
        <div className="grid grid-cols-1 gap-4 mt-4 md:hidden">
          {items.map((item, i) => (
            <div key={i} className="p-4 text-center">
              <div className="flex justify-center mb-3">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={44}
                  height={44}
                  className="w-[44px] h-[44px]"
                />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 mx-auto text-sm text-center leading-relaxed max-w-[220px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
