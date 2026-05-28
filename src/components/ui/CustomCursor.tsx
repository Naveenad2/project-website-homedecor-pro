"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isVisible, cursorX, cursorY]);

  return (
    <>
      {/* Cinematic Film Grain Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      
      {/* Outer Magnetic Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-8 w-8 rounded-full border border-[#D72731] bg-[#D72731]/10 mix-blend-difference backdrop-blur-sm"
        style={{ x: cursorXSpring, y: cursorYSpring, opacity: isVisible ? 1 : 0 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-1.5 w-1.5 rounded-full bg-[#D72731]"
        style={{ x: useSpring(useMotionValue(cursorX.get() + 13), {damping: 40, stiffness: 600}), y: useSpring(useMotionValue(cursorY.get() + 13), {damping: 40, stiffness: 600}), opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}