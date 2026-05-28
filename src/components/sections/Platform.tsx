"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Platform() {
  const capabilities = [
    { num: "01.", title: "Saint Gobain", desc: "We harness high-fidelity glass integration to control light and space with unmatched architectural precision." },
    { num: "02.", title: "Fundermax", desc: "We apply the latest high-pressure laminate chemistry to engineer weather-resistant exterior facades." },
    { num: "03.", title: "LG Hausys", desc: "We power interior surfaces with advanced material science fueled by differentiated structural datasets." },
  ];

  return (
    <section id="platform" className="py-24 px-6 bg-white border-b border-technical">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        
        {/* Left Side Info */}
        <div>
          <h3 style={{ fontFamily: "'Telegraf', sans-serif" }} className="text-4xl md:text-5xl font-bold text-[#02589F] uppercase leading-tight mb-8">
            The Integrated <br/> Architecture.
          </h3>
          <p className="text-lg text-slate-600 mb-8 font-medium">
            Combining structural glass, exterior chemistry, and surface materials into an engine of design discovery. Our platform enables precise, dynamic control of architectural targets, generating environments that unlock a previously inaccessible premium space.
          </p>
          
          <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 border border-[#02589F] rounded-full text-[#02589F] text-xs font-bold uppercase tracking-widest hover:bg-[#02589F] hover:text-white transition-colors">
            Discover our platform <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right Side Technical List */}
        <div className="border-t border-technical">
          {capabilities.map((cap, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="py-8 border-b border-technical grid grid-cols-12 gap-4 group cursor-pointer"
            >
              <div className="col-span-2 text-sm font-bold text-[#D72731]">{cap.num}</div>
              <div className="col-span-10">
                <h4 style={{ fontFamily: "'Telegraf', sans-serif" }} className="text-2xl font-bold text-[#02589F] uppercase mb-2 group-hover:text-[#D72731] transition-colors">
                  {cap.title}
                </h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}