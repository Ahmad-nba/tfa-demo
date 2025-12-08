// components/landing/FeatureCard.jsx
"use client";

import { motion } from "framer-motion";
import { FeatureCardProps } from "../type-safety/featureCardProps";

export default function FeatureCard({ title, desc, Icon }: FeatureCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      }}
      whileHover={{ y: -4 }}
      className="bg-card border border-border rounded-xl p-6 flex flex-col gap-3 
                 hover:bg-surface-2 transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-surface-2 flex items-center justify-center">
        <Icon className="text-accent2 text-2xl" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
