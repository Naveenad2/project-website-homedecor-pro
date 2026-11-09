"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const TAGS = { div: motion.div, h2: motion.h2, h3: motion.h3, span: motion.span } as const;

/**
 * A line that slides up out of a clipping mask when it scrolls into view.
 *
 * The in-view trigger sits on the (unclipped) mask, not on the moving line: a line
 * parked below its overflow-hidden parent has zero visible area, so an observer on
 * the line itself never fires and the text would stay hidden for good.
 */
export default function ClipReveal({
  as = "div",
  children,
  className = "",
  maskClassName = "",
  delay = 0,
  duration = 1.1,
}: {
  as?: keyof typeof TAGS;
  children: ReactNode;
  className?: string;
  maskClassName?: string;
  delay?: number;
  duration?: number;
}) {
  const Line = TAGS[as];
  return (
    <motion.div
      className={`overflow-hidden ${maskClassName}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
    >
      <Line
        variants={{
          hidden: { y: "105%", opacity: 0 },
          shown: { y: "0%", opacity: 1, transition: { duration, delay, ease: EASE } },
        }}
        className={className}
      >
        {children}
      </Line>
    </motion.div>
  );
}
