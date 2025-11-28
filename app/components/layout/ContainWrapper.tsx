import React from "react";

const ContainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white">
      <div className="lg:max-w-[1440px] lg:mx-auto px-6 sm:px-8 lg:px-16 pt-30 lg:pt-40">
        {children}
      </div>
    </div>
  );
};

export default ContainWrapper;
