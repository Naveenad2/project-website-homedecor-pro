"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SmoothRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  type?: "text" | "block";
}

export const smoothCurve = [0.16, 1, 0.3, 1];

export default function SmoothReveal({ children, delay = 0, className = "", type = "text" }: SmoothRevealProps) {
  if (type === "block") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, delay, ease: smoothCurve }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, delay, ease: smoothCurve }}
      >
        {children}
      </motion.div>
    </div>
  );
}