"use client";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

import hero from "../assets/heroimage.jpg";
import background from "../assets/background.jpg";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative bg-fixed bg-cover bg-center bg-no-repeat px-6 py-6 md:py-24"
      style={{
        backgroundImage: `url(${background.src})`, // use .src when importing image with Next.js
      }}
    >
      {/* Overlay to add tone */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content wrapper */}
      <div className="relative mx-auto max-w-7xl flex flex-col md:flex-row items-center md:justify-between gap-12 text-white">
        {/* Text Content */}
        <motion.div
          className="max-w-xl text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Where Savings Build Trust, <br className="hidden md:block" />
            and Trust Builds Wealth.
          </h1>
          <p className="mt-4 text-lg sm:text-md lg:text-xl text-gray-200">
            Join your community in growing a culture of savings and investments.
            Secure your future with TFA today.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-8 py-4 rounded-full font-bold border-2 border-green-500/50 hover:border-green-400 transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
            >
              Get a free account
            </motion.button>

            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center justify-center px-6 py-3 border border-gray-400 rounded-full font-semibold hover:bg-gray-100 hover:text-black transition"
            >
              <Link
                href="/auth"
                className="flex items-center justify-center rounded-full font-semibold hover:bg-gray-100 hover:text-black transition"
              >
                Login <FaArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.button>
          </div>
        </motion.div>

        {/* Right-side image (optional overlay graphic) */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="w-72 sm:w-80 md:w-[520px] aspect-4/3 bg-gray-200/20 rounded-2xl shadow-lg overflow-hidden relative">
            <Image
              src={hero}
              alt="Savings Growth Banner"
              fill
              priority
              className="rounded-2xl object-center shadow-lg object-cover opacity-90"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
