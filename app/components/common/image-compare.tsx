"use client"; // Required for App Router

import ReactCompareImage from "react-compare-image";

type ImageComparerProps = {
  beforeImg: string;
  afterImg: string;
};

const ImageComparer = ({ beforeImg, afterImg }: ImageComparerProps) => {
  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <ReactCompareImage
        leftImage={beforeImg}
        rightImage={afterImg}
        sliderPositionPercentage={0.5}
      />
    </div>
  );
};

export default ImageComparer;
