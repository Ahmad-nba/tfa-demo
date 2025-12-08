"use client";

import { motion } from "framer-motion";
import FeatureCard from "../components/featureCard";
import { featuresData } from "../lib/featuesData";

export default function FeaturesSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      className="w-full py-16 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-4"
        >
          Powerful Features for Smarter Finance
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-text-secondary text-center max-w-2xl mx-auto mb-12"
        >
          Experience the perfect blend of trusted financial systems and modern digital convenience.
        </motion.p>

        {/* Feature Cards Grid */}
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuresData.map((item, idx) => (
            <FeatureCard
              key={idx}
              title={item.title}
              desc={item.desc}
              Icon={item.icon}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
