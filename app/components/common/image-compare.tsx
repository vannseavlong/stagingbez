"use client"; // Required for App Router

import dynamic from "next/dynamic";
import React from "react";

type ImageComparerProps = {
  beforeImg: string;
  afterImg: string;
  className?: string;
};

const ReactCompareImage = dynamic(() => import("react-compare-image"), {
  ssr: false,
  // Optional: Show a simple loading state while the component is being downloaded/rendered on the client.
  loading: () => (
    <div className="flex justify-center items-center h-96 bg-gray-100 rounded-lg">
      Loading Comparison...
    </div>
  ),
});

const ImageComparer = ({
  beforeImg,
  afterImg,
  className,
}: ImageComparerProps) => {
  return (
    // Pass the className down, and apply a max-width using the provided prop instead of inline style
    <div className={`w-full max-w-[600px] mx-auto ${className || ""}`}>
      <ReactCompareImage
        leftImage={beforeImg}
        rightImage={afterImg}
        // Retain your custom option
        sliderPositionPercentage={0.5}
      />
    </div>
  );
};

export default ImageComparer;
