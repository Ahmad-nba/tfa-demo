// components/landing/BenefitsSection.jsx
"use client";

import { motion } from "framer-motion";
import { benefits } from "../lib/benefits";
import { FaCheckCircle } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function BenefitsSection() {
  return (
    <section className="w-full px-2 sm:px-6 py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        
        {/* LEFT SIDE — BENEFITS LIST */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col justify-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
          >
            Why Choose <span className="text-accent2">TFA?</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-text-secondary max-w-xl mb-10"
          >
            Join hundreds of disciplined members who are building long-term wealth and 
            receiving yearly payouts through TFA’s trusted, community-backed fund system.
          </motion.p>

          {/* Bullet points container with stagger */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-5"
          >
            {benefits.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <FaCheckCircle className="text-accent2 mt-1 text-lg" />
                <p className="text-text-primary text-base">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE — METRICS CARD */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-surface-2 border border-border rounded-2xl p-2 sm:p-8 flex flex-col justify-center shadow-lg"
        >
          <h3 className="text-4xl font-bold text-accent2 text-center">
            UGX 20.7M+
          </h3>
          <p className="text-text-secondary text-center mb-10">
            Total savings accumulated across all members
          </p>

          {/* Stats grid with stagger */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { value: "98%", label: "Member Trust Score" },
              { value: "400+", label: "Active Members" },
              { value: "24%", label: "Annual Returns" },
              { value: "7+ yrs", label: "Track Record" },
            ].map((stat, i) => (
              <motion.div
                variants={statVariants}
                key={i}
                className="text-center"
              >
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
