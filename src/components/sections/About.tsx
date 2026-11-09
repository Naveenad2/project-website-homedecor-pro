"use client";

import { Space_Grotesk, Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ClipReveal from "@/components/ui/ClipReveal";
import {
  ArrowUpRight,
  Plus,
  ShieldCheck,
  PenTool,
  Globe,
  Award,
  MapPin,
  Star,
  Check,
  ChevronRight,
  Phone,
  Users,
} from "lucide-react";
import { waLink } from "@/lib/site";

// ─── NEW FONTS (Replacing Syne, DM Sans, Outfit, Playfair) ────────────
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["italic"],
  display: "swap",
  variable: "--font-fraunces", // used by the italic "home today." headline
});

// ─── Animation constants ───────────────────────
const E = [0.22, 1, 0.36, 1] as const;

// ─── Images ───────────────────────────────────────────────────────────────────
const IMG = {
  hero: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000",
  glass:
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800",
  exterior:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800",
  modern:
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1800",
  surface:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1800",
  cta: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2500",
  design:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1800",
};

const MARQUEE_NAMES = [
  "Saint-Gobain",
  "Fundermax",
  "iCLAD",
  "Novelio",
  "Dimore",
  "Vitrum",
  "Forms+Surfaces",
  "LG Hausys",
  "3M",
];


// ─── Animated Counter ─────────────────────────────────────────────────────────
function useCounter(target: number, inView: boolean, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const start = performance.now();
      const dur = 2200;
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.floor(eased * target));
        if (p < 1) requestAnimationFrame(tick);
        else setVal(target);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, target, delay]);
  return val;
}

function StatItem({
  n,
  suffix,
  label,
  delay,
}: {
  n: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const val = useCounter(n, inView, delay);
  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white leading-none tracking-tight">
        {val}
        {suffix}
      </div>
      <div className="font-[family-name:var(--font-space)] text-white/40 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em]">
        {label}
      </div>
    </div>
  );
}

// ─── Bento Image Cell ─────────────────────────────────────────────────────────
function ImgCell({
  src,
  alt = "",
  className = "",
  delay = 0,
  children,
}: {
  src: string;
  alt?: string;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.15, delay, ease: E }}
      className={`relative overflow-hidden rounded-2xl md:rounded-3xl group ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[2.2s] ease-[0.22,1,0.36,1]"
      />
      {children}
    </motion.div>
  );
}

// ─── Root Section ─────────────────────────────────────────────────────────────
export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ctaParallax = useTransform(scrollYProgress, [0.65, 1], ["0%", "18%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative w-full bg-[#03070b] overflow-hidden ${spaceGrotesk.variable} ${jakarta.variable} ${fraunces.variable} font-[family-name:var(--font-space)] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]`}
    >

      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-[20%] w-[700px] h-[700px] rounded-full bg-[#02589F]/[0.07] blur-[180px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#D72731]/[0.05] blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-5 md:px-10 lg:px-16 xl:px-20">
        {/* ═══════════════════════════════════════════════
            1. INTRO — text left + hero image right
        ═══════════════════════════════════════════════ */}
        <div className="pt-20 md:pt-28 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* ── Left text column ── */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-7 lg:py-3">
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: E }}
              className="flex items-center gap-4"
            >
              <div className="w-8 h-[2px] bg-[#D72731]" />
              <span className="font-[family-name:var(--font-space)] text-[#D72731] text-[10px] font-bold uppercase tracking-[0.4em]">
                About // Ernakulam, Kerala
              </span>
            </motion.div>

            {/* Title stack */}
            <div className="flex flex-col gap-0.5">
              {[
                { text: "Precise Home.", color: "text-white" },
                { text: "Your Trusted", color: "text-[#02589F] brightness-[1.35] saturate-[1.6]" },
                { text: "Home Agency.", color: "text-white" },
              ].map(({ text, color }, i) => (
                <ClipReveal
                  key={i}
                  as="h2"
                  delay={i * 0.1}
                  duration={1.15}
                  className={`font-[family-name:var(--font-space)] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.0] tracking-tight ${color}`}
                >
                  {text}
                </ClipReveal>
              ))}
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.95, delay: 0.3, ease: E }}
              className="font-[family-name:var(--font-jakarta)] text-white/55 text-[14px] md:text-[15px] leading-[1.9] font-medium max-w-sm"
            >
              Your premier home care service provider in Ernakulam — delivering
              high-quality glass, cladding, and home surfaces from world-class
              brands, with expert support from design through installation.
            </motion.p>

            {/* Stats 2×2 */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.95, delay: 0.34, ease: E }}
              className="grid grid-cols-2 gap-x-6 gap-y-6 py-6 border-t border-b border-white/[0.08]"
            >
              <StatItem n={500} suffix="+" label="Projects Done" delay={0} />
              <StatItem n={8} suffix="+" label="Years Active" delay={80} />
              <StatItem n={3} suffix="" label="Elite Brands" delay={160} />
              <StatItem
                n={1000}
                suffix="+"
                label="Happy Families"
                delay={240}
              />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.95, delay: 0.44, ease: E }}
              className="flex items-center gap-5 flex-wrap"
            >
              <a
                href={waLink("Hi Precise Homes! I'd like to start a project with you.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl pl-7 pr-2 py-2 flex items-center gap-5 transition-all duration-500 hover:bg-white/10 hover:border-white/25 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
                aria-label="Start your project with Precise Homes on WhatsApp"
              >
                <span className="font-[family-name:var(--font-space)] text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em]">
                  Start Project
                </span>
                <ArrowUpRight className="w-4 h-4 text-white transform group-hover:rotate-45 transition-transform duration-400" />
              </a>
              <a
                href="tel:+919895105012"
                aria-label="Call Precise Homes"
                className="group flex items-center gap-2.5 text-white/40 hover:text-white/70 transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="font-[family-name:var(--font-space)] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">
                  Call Us
                </span>
              </a>
            </motion.div>
          </div>

          {/* ── Right hero image ── */}
          <ImgCell
            src={IMG.hero}
            alt="Precise Home — modern luxury interior by Precise Homes Ernakulam"
            delay={0.06}
            className="lg:col-span-7 min-h-[360px] md:min-h-[480px] lg:min-h-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070b]/70 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#03070b]/40 via-transparent to-transparent" />

            {/* Corner ticks */}
            <div className="absolute top-4 right-4 border-t border-r border-white/20 w-6 h-6 pointer-events-none" />
            <div className="absolute bottom-4 left-4 border-b border-l border-white/20 w-6 h-6 pointer-events-none" />

            {/* Top chip */}
            <div className="absolute top-5 left-5 z-10 flex items-center gap-2.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2.5">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 rounded-full bg-[#D72731]"
              />
              <span className="font-[family-name:var(--font-space)] text-white text-[11px] font-bold tracking-wide">
                Ernakulam · Est. 2016
              </span>
            </div>

            {/* Bottom chip */}
            <div className="absolute bottom-5 right-5 z-10 flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3">
              <Star className="w-4 h-4 text-[#D72731] shrink-0" />
              <div>
                <div className="font-[family-name:var(--font-space)] text-white text-[11px] font-bold leading-tight">
                  Authorized Dealer
                </div>
                <div className="font-[family-name:var(--font-jakarta)] text-white/50 text-[9px] leading-tight mt-0.5">
                  Saint Gobain · Fundermax · LG Hausys
                </div>
              </div>
            </div>
          </ImgCell>
        </div>

        {/* ═══════════════════════════════════════════════
            2. BRAND MARQUEE STRIP
        ═══════════════════════════════════════════════ */}
        <div
          className="mt-5 -mx-5 md:-mx-10 lg:-mx-16 xl:-mx-20 border-t border-b border-white/[0.08] py-4 overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="flex items-center whitespace-nowrap w-max"
          >
            {[...MARQUEE_NAMES, ...MARQUEE_NAMES].map((name, i) => (
              <div
                key={i}
                className="flex items-center gap-8 md:gap-14 px-6 md:px-10"
              >
                <span className="font-[family-name:var(--font-space)] text-lg md:text-xl font-bold text-white/[0.12] uppercase tracking-widest">
                  {name}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#D72731] shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════
            3. BENTO GRID — Row A
        ═══════════════════════════════════════════════ */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* A — Tall left image */}
          <ImgCell
            src={IMG.glass}
            alt="Saint-Gobain glass facade — Precise Homes Ernakulam Kerala"
            delay={0}
            className="md:col-span-5 min-h-[400px] md:min-h-[540px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-[#03070b]/25 to-transparent" />

            <div className="absolute top-5 left-5 z-10 bg-[#02589F]/30 border border-[#02589F]/40 backdrop-blur-sm rounded-full px-4 py-1.5">
              <span className="font-[family-name:var(--font-space)] text-[#60b4ff] text-[9px] font-bold uppercase tracking-wider">
                Saint Gobain Certified
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
              <div className="font-[family-name:var(--font-space)] text-[#D72731] text-[9px] font-bold uppercase tracking-[0.4em] mb-2">
                Premium Material
              </div>
              <h3 className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                Glass Solutions
              </h3>
              <p className="font-[family-name:var(--font-jakarta)] text-white/55 text-[13px] leading-relaxed mb-5 max-w-xs">
                Architectural glass for windows, façades, partitions, and shower
                enclosures.
              </p>
              <Link
                href="/saint-gobain"
                aria-label="Explore Saint-Gobain glass solutions by Precise Homes"
                className="flex items-center gap-2 group/cta cursor-pointer w-max"
              >
                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover/cta:bg-[#D72731] group-hover/cta:border-[#D72731] transition-colors duration-300">
                  <ChevronRight className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-[family-name:var(--font-space)] text-white/40 text-[10px] font-bold uppercase tracking-wider group-hover/cta:text-white/60 transition-colors">
                  Explore
                </span>
              </Link>
            </div>
          </ImgCell>

          {/* B — Right column */}
          <div className="md:col-span-7 flex flex-col gap-5">
            {/* B1 — Story text card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.95, delay: 0.1, ease: E }}
              className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-2xl md:rounded-3xl p-7 md:p-9 flex flex-col justify-between gap-6 hover:border-white/[0.14] transition-colors duration-500"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Plus className="w-3.5 h-3.5 text-[#D72731] shrink-0" />
                  <span className="font-[family-name:var(--font-space)] text-white/30 text-[10px] font-bold uppercase tracking-[0.35em]">
                    Our Story
                  </span>
                </div>
                <span className="font-[family-name:var(--font-space)] text-5xl font-bold text-white/[0.05] leading-none shrink-0">
                  01
                </span>
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-space)] text-2xl md:text-[1.65rem] font-bold text-white leading-tight tracking-tight mb-4">
                  Built on Trust,
                  <br />
                  Driven by Excellence.
                </h3>
                <p className="font-[family-name:var(--font-jakarta)] text-white/50 text-[13px] md:text-[14px] leading-[1.85] font-medium max-w-lg">
                  Since 2016, Precise Home has been redefining home care across
                  Kerala. From first consultation to final installation, we
                  handle every step with meticulous care and world-class
                  materials — because your home deserves nothing less.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "Design Support",
                  "On-site Visits",
                  "Kerala-wide",
                  "On-time Delivery",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="font-[family-name:var(--font-space)] text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white/35 border border-white/[0.08] px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* B2 — Sub-row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ImgCell
                src={IMG.exterior}
                alt="Fundermax exterior cladding — Precise Homes Kerala"
                delay={0.15}
                className="min-h-[200px] sm:min-h-0"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#03070b]/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 z-10 bg-[#D72731] rounded-lg px-2.5 py-1">
                  <span className="font-[family-name:var(--font-space)] text-white text-[9px] font-bold uppercase tracking-wide">
                    Fundermax
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 z-10">
                  <div className="font-[family-name:var(--font-space)] text-white/40 text-[9px] uppercase tracking-widest font-bold mb-1">
                    Exterior
                  </div>
                  <div className="font-[family-name:var(--font-space)] text-lg font-bold text-white">
                    Cladding
                  </div>
                </div>
              </ImgCell>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.95, delay: 0.22, ease: E }}
                className="bg-[#02589F] rounded-2xl md:rounded-3xl p-7 flex flex-col justify-between gap-4 min-h-[200px]"
              >
                <Globe className="w-6 h-6 text-white/50" />
                <div>
                  <div className="font-[family-name:var(--font-space)] text-3xl font-bold text-white leading-none mb-1">
                    All
                  </div>
                  <div className="font-[family-name:var(--font-space)] text-3xl font-bold text-white/30 leading-none mb-4">
                    Kerala.
                  </div>
                  <p className="font-[family-name:var(--font-jakarta)] text-white/65 text-[12px] leading-relaxed">
                    Sales & after-sales service across every district in the
                    state.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-white/45">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="font-[family-name:var(--font-space)] text-[9px] font-bold uppercase tracking-wider">
                    Statewide Coverage
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            4. BENTO GRID — Row B
        ═══════════════════════════════════════════════ */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-5">
          {/* Red — Quality */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.06, ease: E }}
            className="sm:col-span-1 md:col-span-4 bg-[#D72731] rounded-2xl md:rounded-3xl p-7 md:p-8 flex flex-col justify-between gap-6 min-h-[260px]"
          >
            <ShieldCheck className="w-6 h-6 text-white/50" />
            <div>
              <h4 className="font-[family-name:var(--font-space)] text-xl md:text-2xl font-bold text-white leading-tight mb-3">
                Premium Quality Guaranteed
              </h4>
              <p className="font-[family-name:var(--font-jakarta)] text-white/70 text-[12px] md:text-[13px] leading-relaxed mb-5">
                Authorized dealers for the world&apos;s most trusted home material
                brands — every product meets international standards.
              </p>
              <div className="flex flex-col gap-2.5">
                {["Saint Gobain", "Fundermax", "LG Hausys"].map((brand) => (
                  <div key={brand} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="font-[family-name:var(--font-space)] text-white/85 text-[12px] font-semibold">
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Centre image — Design */}
          <ImgCell
            src={IMG.design}
            alt="Expert design team — Precise Homes Kerala on-site consultation"
            delay={0.12}
            className="sm:col-span-1 md:col-span-5 min-h-[260px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070b]/80 via-[#03070b]/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#03070b]/50 via-transparent to-transparent" />
            <div className="absolute top-5 left-5 z-10 bg-black/35 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
              <PenTool className="w-3.5 h-3.5 text-[#D72731]" />
              <span className="font-[family-name:var(--font-space)] text-white/70 text-[10px] font-bold uppercase tracking-wide">
                Expert Design
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <div className="font-[family-name:var(--font-space)] text-white/35 text-[9px] uppercase tracking-widest font-bold mb-1">
                Our Approach
              </div>
              <h4 className="font-[family-name:var(--font-space)] text-xl font-bold text-white leading-tight">
                Design-to-Installation Support
              </h4>
            </div>
          </ImgCell>

          {/* Dark — Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.2, ease: E }}
            className="sm:col-span-2 md:col-span-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl md:rounded-3xl p-7 flex flex-col justify-between gap-5 min-h-[260px] hover:border-white/[0.14] transition-colors duration-500"
          >
            <div className="flex items-center justify-between">
              <Award className="w-5 h-5 text-white/25" />
              <span className="font-[family-name:var(--font-space)] text-4xl font-bold text-white/[0.05] leading-none">
                8+
              </span>
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-space)] text-xl font-bold text-white leading-tight mb-3">
                Years of Expertise
              </h4>
              <p className="font-[family-name:var(--font-jakarta)] text-white/45 text-[12px] md:text-[13px] leading-relaxed">
                A proven track record of 500+ successful projects across
                Ernakulam and beyond.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-white/[0.08] border border-[#03070b] ring-1 ring-white/10"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-white/30">
                <Users className="w-3 h-3" />
                <span className="font-[family-name:var(--font-space)] text-[10px] font-bold uppercase tracking-wider">
                  1000+ Clients
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════
            6. CTA — Full-bleed parallax image
        ═══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.25, ease: E }}
          className="mt-5 relative rounded-2xl md:rounded-3xl overflow-hidden"
          aria-label="Get a free consultation from Precise Homes Kerala"
        >
          {/* Parallax image */}
          <motion.div
            style={{ y: ctaParallax }}
            className="absolute inset-0 w-full h-[140%] -top-[20%]"
          >
            <img
              src={IMG.cta}
              alt="Transform your home with Precise Homes — Kerala home care experts"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-[#03070b]/65 to-[#03070b]/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#03070b]/80 via-[#03070b]/30 to-transparent" />

          {/* Crosshair corners */}
          <Plus
            className="absolute top-6 left-6 text-white/12 w-5 h-5"
            aria-hidden="true"
          />
          <Plus
            className="absolute top-6 right-6 text-white/12 w-5 h-5"
            aria-hidden="true"
          />
          <Plus
            className="absolute bottom-6 left-6 text-white/12 w-5 h-5"
            aria-hidden="true"
          />
          <Plus
            className="absolute bottom-6 right-6 text-white/12 w-5 h-5"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-14 md:py-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-6 h-[2px] bg-[#D72731]" />
                <span className="font-[family-name:var(--font-space)] text-[#D72731] text-[10px] font-bold uppercase tracking-[0.4em]">
                  Get Started
                </span>
              </div>

              <ClipReveal
                as="h3"
                maskClassName="mb-1"
                duration={1.15}
                className="font-[family-name:var(--font-space)] text-[clamp(2rem,4vw,3.2rem)] font-bold text-white leading-[0.95] tracking-tight uppercase"
              >
                Transform Your
              </ClipReveal>
              <ClipReveal
                as="h3"
                maskClassName="mb-7 pb-1"
                delay={0.1}
                duration={1.15}
                className="font-[family-name:var(--font-fraunces)] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[0.95] tracking-tight text-[#02589F] brightness-[1.35] saturate-[1.6] italic normal-case"
              >
                home today.
              </ClipReveal>
              <p className="font-[family-name:var(--font-jakarta)] text-white/50 text-[14px] md:text-[15px] leading-relaxed max-w-md">
                Contact us for a free on-site consultation. We&apos;ll visit your
                space and craft a proposal tailored precisely to your vision and
                budget.
              </p>
            </div>

            <motion.a
              href={waLink("Hi Precise Homes! I'd like a free quote and site visit.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get a free quote from Precise Homes on WhatsApp"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.95, delay: 0.32, ease: E }}
              className="group shrink-0 rounded-full bg-white/[0.07] border border-white/12 backdrop-blur-md pl-7 pr-2 py-2 flex items-center gap-5 hover:bg-white/[0.11] hover:border-white/25 transition-all duration-500 shadow-2xl"
            >
              <span className="font-[family-name:var(--font-space)] text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em]">
                Get Free Quote
              </span>
              <div className="w-10 h-10 rounded-full bg-[#D72731] flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500 shadow-[0_0_24px_rgba(215,39,49,0.5)]">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom spacer */}
        <div className="h-16 md:h-24" />
      </div>
    </section>
  );
}