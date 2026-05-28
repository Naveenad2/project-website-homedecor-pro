"use client";

import { motion } from "framer-motion";

export default function Showcase() {
  return (
    <section className="bg-white border-b border-technical">
      
      {/* Massive Full Width Image Placeholder */}
      <div className="w-full h-[60vh] bg-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#02589F]/10 z-10" />
        {/* Placeholder for an architectural background image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/50 font-bold tracking-widest uppercase">[ Premium Space Render ]</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-technical border-b border-technical">
        
        <div className="p-12 md:p-24 flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D72731] mb-8">Installation</span>
          <div>
            <p className="text-sm text-slate-500 mb-4">September 4, 2026</p>
            <h3 style={{ fontFamily: "'Telegraf', sans-serif" }} className="text-3xl font-bold text-[#02589F] uppercase leading-tight mb-6">
              Optogenetics-enabled discovery of structural stress modulators
            </h3>
            <p className="text-slate-600 font-medium">
              In this landmark publication, we unveil our first-of-a-kind facade screening platform, which unlocks a novel mode of spatial design.
            </p>
          </div>
        </div>

        <div className="p-12 md:p-24 flex flex-col justify-between bg-slate-50">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D72731] mb-8">Engineering</span>
          <div>
            <p className="text-sm text-slate-500 mb-4">February 20, 2026</p>
            <h3 style={{ fontFamily: "'Telegraf', sans-serif" }} className="text-3xl font-bold text-[#02589F] uppercase leading-tight">
              Integrating deep learning and mechanistic modeling for structural integrity.
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}