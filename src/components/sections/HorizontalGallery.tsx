"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HorizontalGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Map vertical scroll to horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  // Background text moves in the opposite direction for parallax depth
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const photos = [
    { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070", title: "Commercial Facade", loc: "Ernakulam" },
    { src: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2072", title: "Structural Laminate", loc: "Kochi" },
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070", title: "Interior Surface", loc: "Padivattom" },
    { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069", title: "Acoustic Glass", loc: "Kerala" },
  ];

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#050b14] overflow-hidden">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Massive Parallax Background Typography */}
        <motion.div style={{ x: bgTextX }} className="absolute inset-0 flex items-center whitespace-nowrap z-0 pointer-events-none">
          <h1 style={{ fontFamily: "'Telegraf', sans-serif" }} className="text-[25vw] font-bold text-white/[0.03] uppercase tracking-tighter pl-12">
            PORTFOLIO ARCHIVES
          </h1>
        </motion.div>

        {/* Scrolling Image Strip */}
        <motion.div style={{ x }} className="flex gap-12 px-6 md:px-32 relative z-10 items-center will-change-transform">
          {photos.map((item, i) => (
            <div 
              key={i} 
              className="relative shrink-0 overflow-hidden bg-slate-900 rounded-[2rem] shadow-2xl w-[85vw] md:w-[50vw] h-[60vh] md:h-[75vh] group"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-[0.25,1,0.5,1]"
              />
              
              {/* High Contrast Legibility Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/90 via-[#050b14]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Perfectly Clear Text Block */}
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between md:items-end gap-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1]">
                  <div>
                    <p className="text-[#D72731] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                      0{i + 1} // {item.loc}
                    </p>
                    <p style={{ fontFamily: "'Telegraf', sans-serif" }} className="text-white text-2xl md:text-3xl uppercase tracking-tighter">
                      {item.title}
                    </p>
                  </div>
                  <button className="px-6 py-2 bg-white text-[#050b14] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#D72731] hover:text-white transition-colors">
                    View
                  </button>
                </div>
              </div>

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}