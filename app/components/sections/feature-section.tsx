"use client";
import { FC } from "react";
import { Shield, Users, RefreshCcw, Clock } from "lucide-react";

const features = [
  {
    icon: <Clock className="w-8 h-8 text-blue-600" />,
    title: "Quick Booking",
    description:
      "Book your cleaning in just a few taps – simple, fast, and hassle-free.",
  },
  {
    icon: <RefreshCcw className="w-8 h-8 text-blue-600" />,
    title: "Flexible Service",
    description:
      "Plan change? No problem. Easily reschedule or adjust your booking anytime.",
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-600" />,
    title: "Safety First",
    description:
      "Your home’s security matters. Every cleaner is fully vetted and trained for your peace of mind.",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "Professional Team",
    description:
      "Our cleaners are properly trained and committed to providing high-quality service.",
  },
];

const FeatureSectionWithDividers: FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Use flex on large screens so divide-x creates vertical lines */}
        <div className="hidden lg:flex divide-x divide-gray-200 border-t border-b border-r border-l">
          {features.map((item, i) => (
            <div key={i} className="flex-1 p-8 text-center">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Fallback grid for smaller screens (stacked with gap) */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-6">
          {features.map((item, i) => (
            <div key={i} className="p-6 text-center border rounded-lg">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSectionWithDividers;
