"use client";

import { useTranslate } from "@/app/hooks/useTranslate";
import { Users, Clock, Award, Star, Home, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type StatItem = {
  key: string;
  icon?: string;
  value?: string;
  label?: string;
};

type StatsSection = {
  header?: {
    subtitle?: string;
    title?: string;
  };
  items?: StatItem[];
};

// Map icon keys to lucide-react components
const iconMap: Record<string, LucideIcon> = {
  users: Users,
  clock: Clock,
  award: Award,
  star: Star,
  home: Home,
  check: CheckCircle,
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  },
};

export default function Stats() {
  const { getSection } = useTranslate();

  const statsSection = getSection("stats") as StatsSection;

  const items = Array.isArray(statsSection?.items) ? statsSection.items : [];

  return (
    <section className="bg-white pt-30 lg:pt-40">
      <div className="lg:max-w-[1440px] lg:mx-auto">
        {/* Header */}
        {statsSection?.header && (
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {statsSection.header.subtitle && (
              <h5 className="text-sm sm:text-base font-bold leading-[28px] sm:leading-[32px] tracking-[1.5px] text-beasy-gradient mb-2 opacity-80 font-sans">
                {statsSection.header.subtitle}
              </h5>
            )}
            {statsSection.header.title && (
              <h2 className="text-black text-[20px] sm:text-[24px] md:text-[32px] lg:text-[36px] font-bold tracking-wide leading-snug font-sans">
                {statsSection.header.title}
              </h2>
            )}
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((item, idx) => {
            const IconComponent = iconMap[item.icon || "star"] || Star;

            return (
              <motion.div
                key={item.key || idx}
                className="flex flex-col items-center text-center p-4 sm:p-6"
                variants={cardVariants}
              >
                {/* Icon */}
                <motion.div
                  className="w-[44px] h-[44px] rounded-full bg-beasy-gradient flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-[#1B4CFA]/20"
                  variants={iconVariants}
                >
                  <IconComponent className="w-[22px] h-[22px] text-white" strokeWidth={2} />
                </motion.div>

                {/* Value */}
                <h3 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-bold text-beasy-gradient leading-tight mb-1 sm:mb-2">
                  {item.value || "0"}
                </h3>

                {/* Label */}
                <p className="text-[#3D3D3D] font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[150%] font-sans">
                  {item.label || ""}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
