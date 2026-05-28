"use client";

import { motion } from "framer-motion";
import { SITE_DATA } from "@/lib/constants";
import Link from "next/link";
import SmoothReveal from "@/components/ui/SmoothReveal";

export default function Services() {
  return (
    <section className="py-32 bg-white relative border-t border-slate-100">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-5">
            <SmoothReveal>
              <h2 className="text-4xl md:text-5xl font-black text-[#02589F] tracking-tighter uppercase leading-tight">
                Engineering <br/> The Exceptional.
              </h2>
            </SmoothReveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <SmoothReveal type="block" delay={0.2}>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                By partnering exclusively with the world's most rigid material engineers, we guarantee uncompromising quality in every residential and commercial installation.
              </p>
            </SmoothReveal>
          </div>
        </div>

        <div className="w-full border-t-2 border-slate-900">
          {SITE_DATA.brands.map((brand, index) => (
            <SmoothReveal type="block" delay={index * 0.1} key={brand.name}>
              <Link href={brand.href} className="group block relative w-full border-b border-slate-200 overflow-hidden">
                
                <div className="absolute inset-0 bg-[#D72731] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />
                
                <div className="relative z-10 py-10 md:py-16 px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-500 group-hover:text-white">
                  
                  <div className="flex items-center gap-8 md:gap-16 w-full md:w-1/2">
                    <span className="text-sm font-bold tracking-widest text-slate-400 group-hover:text-white/70 transition-colors">
                      0{index + 1}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black text-[#02589F] group-hover:text-white transition-colors tracking-tighter uppercase">
                      {brand.name}
                    </h3>
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <p className="text-base md:text-lg font-medium text-slate-500 group-hover:text-white/90 transition-colors max-w-sm">
                      {brand.title}
                    </p>
                    <div className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center group-hover:border-white transition-colors shrink-0">
                      <span className="block w-2 h-2 bg-[#02589F] group-hover:bg-white rounded-full transition-colors" />
                    </div>
                  </div>

                </div>
              </Link>
            </SmoothReveal>
          ))}
        </div>
      </div>
    </section>
  );
}