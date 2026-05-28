"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const smoothCurve = [0.16, 1, 0.3, 1];

export default function ArchitecturalGrid() {
  const items = [
    {
      title: "Saint Gobain",
      tag: "Structural Glass",
      desc: "Harnessing high-fidelity glass integration to control light, thermal dynamics, and spatial acoustics with unmatched precision.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
    },
    {
      title: "Fundermax",
      tag: "Exterior Facades",
      desc: "Engineering weather-resistant, architecturally striking exterior laminates designed to endure extreme conditions.",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
    },
    {
      title: "LG Hausys",
      tag: "Interior Surfaces",
      desc: "Powering premium interior environments with highly durable, visually stunning advanced material science.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    }
  ];

  return (
    <section className="relative w-full bg-[#f4f4f5] py-32 px-6 z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-[#02589F]/10 pb-12">
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: true }} transition={{ duration: 1, ease: smoothCurve }}
              style={{ fontFamily: "'Telegraf', sans-serif" }} 
              className="text-4xl md:text-6xl font-bold uppercase text-[#02589F] leading-tight tracking-tighter"
            >
              Integrated <br/> Ecosystem.
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }}
            className="max-w-md text-slate-700 font-medium leading-relaxed"
          >
            We operate exclusively with the world's most rigid material engineers to guarantee absolute quality in commercial and residential developments.
          </motion.p>
        </div>

        {/* Complex Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Feature Block (Span 8) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: smoothCurve }}
            className="lg:col-span-8 bg-white rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-8 shadow-[0_20px_40px_-10px_rgba(2,88,159,0.05)] border border-slate-100 group relative overflow-hidden"
          >
            <div className="w-full md:w-1/2 flex flex-col justify-between relative z-10">
              <span className="text-[#D72731] font-bold tracking-[0.2em] uppercase text-xs mb-8">01 / {items[0].tag}</span>
              <div>
                <h3 style={{ fontFamily: "'Telegraf', sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase text-[#02589F] mb-6 tracking-tighter">
                  {items[0].title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                  {items[0].desc}
                </p>
                <Link href="/saint-gobain" className="inline-flex items-center gap-3 text-sm font-bold text-[#02589F] uppercase tracking-widest group-hover:text-[#D72731] transition-colors">
                  Explore <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-[300px] md:h-auto rounded-[1.5rem] overflow-hidden relative">
              <img src={items[0].img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" alt={items[0].title} />
            </div>
          </motion.div>

          {/* Secondary Block (Span 4) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: smoothCurve }}
            className="lg:col-span-4 bg-[#02589F] text-white rounded-[2rem] p-8 md:p-12 flex flex-col justify-between shadow-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000">
               <img src={items[1].img} className="w-full h-full object-cover" alt={items[1].title} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#02589F] via-[#02589F]/80 to-[#02589F]/40" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <span className="text-[#D72731] font-bold tracking-[0.2em] uppercase text-xs mb-8">02 / {items[1].tag}</span>
              <div>
                <h3 style={{ fontFamily: "'Telegraf', sans-serif" }} className="text-3xl md:text-4xl font-bold uppercase mb-4 tracking-tighter">
                  {items[1].title}
                </h3>
                <p className="text-white/80 font-medium leading-relaxed mb-8 text-sm">
                  {items[1].desc}
                </p>
                <Link href="/fundermax" className="inline-flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest group-hover:text-[#D72731] transition-colors">
                  Explore <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Tertiary Block (Span 12, split internally) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: smoothCurve }}
            className="lg:col-span-12 bg-white rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row-reverse gap-8 shadow-[0_20px_40px_-10px_rgba(2,88,159,0.05)] border border-slate-100 group overflow-hidden"
          >
            <div className="w-full md:w-1/2 flex flex-col justify-between relative z-10">
              <span className="text-[#D72731] font-bold tracking-[0.2em] uppercase text-xs mb-8">03 / {items[2].tag}</span>
              <div>
                <h3 style={{ fontFamily: "'Telegraf', sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase text-[#02589F] mb-6 tracking-tighter">
                  {items[2].title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-8 max-w-md">
                  {items[2].desc}
                </p>
                <Link href="/lg-hausys" className="inline-flex items-center gap-3 text-sm font-bold text-[#02589F] uppercase tracking-widest group-hover:text-[#D72731] transition-colors">
                  Explore <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-[1.5rem] overflow-hidden relative">
              <img src={items[2].img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" alt={items[2].title} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}