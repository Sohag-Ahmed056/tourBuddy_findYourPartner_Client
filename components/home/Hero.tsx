"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function TravelHero() {
  return (
    <section className=" relative max-w-7xl mx-auto w-full h-[60vh] md:h-[70vh] rounded-[2.5rem] overflow-hidden mt-6 shadow-2xl bg-slate-950">
      {/* 1. Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-600/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-blue-600/15 rounded-full blur-[120px]"
        />
      </div>

      {/* 2. Texture & Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:40px_40px]" />

      {/* 3. Content */}
      <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col items-center justify-center text-center px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span className="text-[10px] font-bold text-emerald-100 tracking-[0.2em] uppercase">
            AI-Powered Travel Assistant
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]"
        >
          Explore Your Next <br /> 
          <span className="text-emerald-500 italic font-serif">Adventure</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Describe your dream trip below and let our AI match you with the 
          perfect local travel plans instantly.
        </motion.p>
      </div>

      {/* 4. Bottom Fade for Overlay Smoothness */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
    </section>
  );
}