"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function BentoGrid() {
  const cards = [
    {
      title: "Saint Gobain",
      subtitle: "Structural Glass",
      desc: "Harnessing high-fidelity glass integration to control light and space with unmatched architectural precision.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
      span: "md:col-span-2 md:row-span-2",
      height: "h-[500px] md:h-full"
    },
    {
      title: "Fundermax",
      subtitle: "Exterior Chemistry",
      desc: "Weather-resistant, striking exterior laminate facades.",
      image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2072",
      span: "md:col-span-1 md:row-span-1",
      height: "h-[350px]"
    },
    {
      title: "LG Hausys",
      subtitle: "Surface Science",
      desc: "Advanced material science for premium interior environments.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
      span: "md:col-span-1 md:row-span-1",
      height: "h-[350px]"
    }
  ];

  return (
    <section className="relative w-full bg-[#f4f4f5] py-32 px-6 z-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="text-[#D72731] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Our Ecosystem</span>
            <h2 style={{ fontFamily: "'Telegraf', sans-serif" }} className="text-4xl md:text-6xl font-bold uppercase text-[#02589F] leading-[0.9] tracking-tighter">
              Integrated <br/> Capabilities.
            </h2>
          </div>
          <p className="max-w-md text-slate-600 font-medium">
            We partner exclusively with world-leading material engineers to deliver uncompromising precision in every commercial and residential installation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          {cards.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className={`group relative rounded-[2rem] overflow-hidden bg-white/60 border border-white/80 shadow-[0_20px_40px_-10px_rgba(2,88,159,0.05)] backdrop-blur-xl cursor-pointer ${card.span} ${card.height}`}
            >
              {/* Background Image Reveal */}
              <div className="absolute inset-0 z-0 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-1000 ease-[0.25,1,0.5,1]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between transition-colors duration-500 group-hover:text-white">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D72731] group-hover:text-[#D72731] drop-shadow-sm">
                    [ 0{i + 1} ]
                  </span>
                  <div className="w-12 h-12 rounded-full border border-[#02589F]/20 group-hover:border-white/40 flex items-center justify-center group-hover:bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5 text-[#02589F] group-hover:text-white transition-colors" />
                  </div>
                </div>

                <div>
                  <h3 style={{ fontFamily: "'Telegraf', sans-serif" }} className="text-3xl md:text-5xl font-bold uppercase text-[#02589F] group-hover:text-white mb-2 tracking-tighter transition-colors duration-500">
                    {card.title}
                  </h3>
                  <h4 className="text-sm font-bold tracking-widest uppercase mb-4 text-slate-400 group-hover:text-slate-300">
                    {card.subtitle}
                  </h4>
                  <p className="text-slate-600 group-hover:text-slate-200 font-medium leading-relaxed max-w-sm transition-colors duration-500">
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}