"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageTrail({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<{ id: number; x: number; y: number; src: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  let renderCount = useRef(0);

  // High-end architectural imagery for the trail effect
  const trailSources = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600",
    "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=600",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600"
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only trigger every Nth frame to keep it sparse and premium
    renderCount.current += 1;
    if (renderCount.current % 12 !== 0) return;

    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    
    const newImage = {
      id: Date.now(),
      x: e.clientX - left,
      y: e.clientY - top,
      src: trailSources[renderCount.current % trailSources.length]
    };

    setImages((prev) => [...prev, newImage]);

    // Automatically remove the image after animation completes
    setTimeout(() => {
      setImages((prev) => prev.filter((img) => img.id !== newImage.id));
    }, 1200); // Wait for the exit animation duration
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full h-full overflow-hidden"
    >
      <AnimatePresence>
        {images.map((img) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.5, rotate: Math.random() * 20 - 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute pointer-events-none z-0 rounded-2xl overflow-hidden shadow-2xl shadow-[#02589F]/20 border border-white/50"
            style={{ 
              left: img.x, 
              top: img.y,
              x: "-50%", // Center on cursor
              y: "-50%",
              width: "25vw",
              height: "35vh",
              maxWidth: "300px",
              maxHeight: "400px"
            }}
          >
            <img src={img.src} alt="Trail" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* The Actual Hero Content sits ABOVE the image trail */}
      <div className="relative z-10 pointer-events-none h-full w-full">
        {children}
      </div>
    </div>
  );
}