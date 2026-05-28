"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractivePlatform() {
  const [activeIdx, setActiveIdx] = useState(0);

  const capabilities = [
    { 
      title: "Saint Gobain", 
      subtitle: "Glass Architecture", 
      desc: "Harnessing high-fidelity structural glass integration to control light and space with unmatched architectural precision.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
    },
    { 
      title: "Fundermax", 
      subtitle: "Exterior Chemistry", 
      desc: "Applying the latest high-pressure laminate chemistry to engineer weather-resistant, striking exterior facades.",
      image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2072"
    },
    { 
      title: "LG Hausys", 
      subtitle: "Surface Science", 
      desc: "Powering interior surfaces with advanced material science, fueled by differentiated structural datasets.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
    },
  ];

  return (
    <section className="relative h-screen w-full bg-white flex items-center overflow-hidden">
      
      {/* Dynamic Background Image Reveal */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={capabilities[activeIdx].image}
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-white/80 backdrop-blur-3xl z-10" />
      </div>

      <div className="container mx-auto px-6 relative z-20 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Active Info Plate */}
        <motion.div 
          key={`info-${activeIdx}`}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="bg-white/40 border border-white/60 p-10 rounded-3xl shadow-2xl backdrop-blur-xl"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#D72731] block mb-4">
            0{activeIdx + 1} // {capabilities[activeIdx].subtitle}
          </span>
          <h3 style={{ fontFamily: "'Telegraf', sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase text-[#02589F] mb-6 leading-none tracking-tighter">
            {capabilities[activeIdx].title}
          </h3>
          <p className="text-lg text-slate-700 font-medium leading-relaxed">
            {capabilities[activeIdx].desc}
          </p>
        </motion.div>

        {/* Hover Interaction Menu */}
        <div className="flex flex-col gap-2">
          {capabilities.map((cap, i) => (
            <div 
              key={i} 
              onMouseEnter={() => setActiveIdx(i)}
              className="group relative cursor-pointer py-6 border-b border-[#02589F]/10"
            >
              <div className="flex items-center justify-between relative z-10">
                <h4 style={{ fontFamily: "'Telegraf', sans-serif" }} className={`text-3xl md:text-5xl font-bold tracking-tighter uppercase transition-colors duration-500 ${activeIdx === i ? 'text-[#D72731]' : 'text-[#02589F] opacity-30 group-hover:opacity-60'}`}>
                  {cap.title}
                </h4>
                <span className={`text-sm font-bold tracking-widest transition-all duration-500 ${activeIdx === i ? 'text-[#02589F] opacity-100' : 'opacity-0 -translate-x-4'}`}>
                  VIEW
                </span>
              </div>
              
              {/* Liquid highlight line */}
              <motion.div 
                className="absolute bottom-0 left-0 h-[2px] bg-[#D72731] z-20"
                initial={false}
                animate={{ width: activeIdx === i ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}