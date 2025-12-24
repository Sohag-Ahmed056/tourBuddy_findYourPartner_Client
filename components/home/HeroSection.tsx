"use client";

import { motion } from "framer-motion";
import TravelHero from "@/components/home/Hero";
import AITourSuggestion from "@/components/travel/AiTourSuggestion";

export default function HeroSection() {
  return (
    <>
      {/* 1. Hero Section */}
      <div className="flex justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <TravelHero />
      </div>

      {/* 2. AI Suggestion Overlay */}
      <section className="relative z-30 w-full px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl mx-auto -mt-28 md:-mt-40" 
        >
          <AITourSuggestion />
        </motion.div>
      </section>
    </>
  );
}