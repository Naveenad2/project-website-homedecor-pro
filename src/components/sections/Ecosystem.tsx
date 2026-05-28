"use client";

import React, { useRef, useState, useEffect } from "react";
import { Montserrat, Inter } from "next/font/google";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  Plus,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Layers,
  Zap,
  Wind,
  Home,
  Square,
  Circle,
} from "lucide-react";
import ProjectModal from "../ui/ProjectModal";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// ─── Easing (no window dep) ───────────────────────────────────────────────────
const E = [0.22, 1, 0.36, 1] as const;

// ─── Brand data ───────────────────────────────────────────────────────────────
const BRANDS = [
  {
    id: "saint-gobain",
    code: "SG",
    name: "Saint Gobain",
    tagline: "World of Glass",
    accentColor: "#02589F",
    lightColor: "#60b4ff",
    bgGradient: "from-[#02589F]/20 via-[#02589F]/5 to-transparent",
    description:
      "Kerala's #1 authorized Saint Gobain dealer — UPVC windows, glass partitions, shower enclosures, handrail systems, and wall coverings under one roof.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800",
    products: [
      { icon: Square, label: "UPVC Windows" },
      { icon: Layers, label: "Glass Partitions" },
      { icon: Circle, label: "Shower Enclosures" },
      { icon: Wind, label: "Handrail Systems" },
    ],
    stat: { value: "500+", label: "Installations" },
    href: "/saint-gobain",
  },
  {
    id: "fundermax",
    code: "FM",
    name: "Fundermax",
    tagline: "Exterior Excellence",
    accentColor: "#D72731",
    lightColor: "#ff8080",
    bgGradient: "from-[#D72731]/20 via-[#D72731]/5 to-transparent",
    description:
      "High-performance exterior cladding panels that protect, insulate, and transform your building's façade with decades of durability and striking aesthetics.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800",
    products: [
      { icon: Home, label: "Façade Cladding" },
      { icon: Layers, label: "Interior Panels" },
      { icon: Square, label: "Compact Boards" },
      { icon: Zap, label: "HPL Surfaces" },
    ],
    stat: { value: "8+", label: "Years Partner" },
    href: "/fundermax",
  },
  {
    id: "lg-hausys",
    code: "LG",
    name: "LG Hausys",
    tagline: "Surface Innovation",
    accentColor: "#02589F",
    lightColor: "#60b4ff",
    bgGradient: "from-[#02589F]/20 via-[#02589F]/5 to-transparent",
    description:
      "Innovative surface materials that blend beauty and function — from Hi-Macs solid surfaces to premium vinyl flooring and wall coverings for every interior.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1800",
    products: [
      { icon: Layers, label: "Hi-Macs Surfaces" },
      { icon: Square, label: "Vinyl Flooring" },
      { icon: Wind, label: "Wall Coverings" },
      { icon: Home, label: "Kitchen Panels" },
    ],
    stat: { value: "3", label: "Elite Brands" },
    href: "/lg-hausys",
  },
];

// ─── Process steps ────────────────────────────────────────────────────────────
const PROCESS = [
  {
    n: "01",
    title: "Consultation",
    desc: "On-site visit and detailed assessment of your space, needs, and vision.",
  },
  {
    n: "02",
    title: "Proposal",
    desc: "Custom proposal with product recommendations, specifications, and pricing.",
  },
  {
    n: "03",
    title: "Installation",
    desc: "Expert installation by certified technicians with zero compromise on finish.",
  },
  {
    n: "04",
    title: "After Care",
    desc: "Ongoing support, maintenance, and warranty service across Kerala.",
  },
];

// ─── Reveal wrapper (fixes hydration: initial is always the same) ─────────────
function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Clip-reveal for large text (no conditional initial) ──────────────────────
function TextReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, delay, ease: E }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Brand card ───────────────────────────────────────────────────────────────
function BrandCard({
  brand,
  index,
}: {
  brand: (typeof BRANDS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Reveal delay={index * 0.12} className="h-full">
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative h-full flex flex-col rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] hover:border-white/[0.18] transition-colors duration-500 cursor-default"
        style={{ minHeight: 520 }}
      >
        {/* ── Image top ── */}
        <div className="relative h-52 md:h-60 overflow-hidden shrink-0">
          <img
            src={brand.img}
            alt={brand.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.2s] ease-[0.22,1,0.36,1] group-hover:scale-[1.07]"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-[#03070b]/30 to-transparent" />

          {/* Code badge top-left */}
          <div className="absolute top-4 left-4 z-10">
            <div
              className={`${montserrat.className} w-10 h-10 rounded-xl flex items-center justify-center text-white text-[11px] font-bold tracking-wide`}
              style={{
                backgroundColor: `${brand.accentColor}30`,
                border: `1px solid ${brand.accentColor}50`,
                backdropFilter: "blur(12px)",
              }}
            >
              {brand.code}
            </div>
          </div>

          {/* Stat badge top-right */}
          <div className="absolute top-4 right-4 z-10 flex flex-col items-end">
            <span
              className={`${montserrat.className} text-2xl font-bold leading-[1.1]`}
              style={{ color: brand.lightColor }}
            >
              {brand.stat.value}
            </span>
            <span
              className={`${montserrat.className} text-white/40 text-[9px] font-bold uppercase tracking-wider`}
            >
              {brand.stat.label}
            </span>
          </div>

          {/* Tagline over image bottom */}
          <div className="absolute bottom-4 left-5 z-10">
            <div
              className={`${montserrat.className} text-[9px] font-bold uppercase tracking-[0.35em]`}
              style={{ color: brand.lightColor }}
            >
              {brand.tagline}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div
          className="flex flex-col flex-1 p-6 md:p-7 gap-5 relative"
          style={{
            background: `linear-gradient(135deg, ${brand.accentColor}08, transparent 60%)`,
          }}
        >
          {/* Glowing orb on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
            transition={{ duration: 0.6, ease: E }}
            className="absolute -top-20 -right-10 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${brand.accentColor}20, transparent 70%)`,
              filter: "blur(30px)",
            }}
          />

          {/* Name */}
          <div>
            <h3
              className={`${montserrat.className} text-xl md:text-2xl font-bold text-white leading-tight tracking-normal mb-3`}
            >
              {brand.name}
            </h3>
            <p className="text-white/60 text-[13px] leading-[1.8] font-normal">
              {brand.description}
            </p>
          </div>

          {/* Product pills */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {brand.products.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300"
              >
                <Icon
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: brand.lightColor }}
                />
                <span
                  className={`${inter.className} text-white/60 text-[11px] font-medium leading-tight`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck
                className="w-3.5 h-3.5"
                style={{ color: brand.lightColor }}
              />
              <span
                className={`${montserrat.className} text-white/40 text-[9px] font-bold uppercase tracking-wider`}
              >
                Authorized Dealer
              </span>
            </div>
            <a
              href={brand.href}
              className="group/cta flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5 border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300"
            >
              <span
                className={`${montserrat.className} text-white/50 text-[10px] font-bold uppercase tracking-wider group-hover/cta:text-white/80 transition-colors`}
              >
                Explore
              </span>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-400 group-hover/cta:rotate-45"
                style={{ backgroundColor: `${brand.accentColor}30` }}
              >
                <ArrowUpRight
                  className="w-3 h-3"
                  style={{ color: brand.lightColor }}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Process step ─────────────────────────────────────────────────────────────
function ProcessStep({
  step,
  index,
  isLast,
}: {
  step: (typeof PROCESS)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex gap-4 md:gap-6 relative">
      {/* Left — number + line */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1, ease: E }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/[0.12] flex items-center justify-center shrink-0"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <span
            className={`${montserrat.className} text-sm md:text-base font-bold text-white/50`}
          >
            {step.n}
          </span>
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1 + 0.2, ease: E }}
            className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent origin-top mt-2"
          />
        )}
      </div>

      {/* Right — text */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.1, ease: E }}
        className="pb-8 md:pb-10"
      >
        <h4
          className={`${montserrat.className} text-lg md:text-xl font-bold text-white mb-3 tracking-normal`}
        >
          {step.title}
        </h4>
        <p
          className={`${inter.className} text-white/50 text-[13px] md:text-[14px] leading-[1.8] font-normal max-w-xs`}
        >
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Ecosystem() {
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const featParallax = useTransform(scrollYProgress, [0.3, 0.9], ["0%", "14%"]);

  return (
    <section
      ref={sectionRef}
      id="brands"
      aria-label="Precise Homes — Authorized Brand Ecosystem"
      className={`relative w-full bg-[#03070b] overflow-hidden ${inter.className}`}
    >
      {/* ── Ambient glows ─────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[5%] left-[-10%] w-[700px] h-[700px] rounded-full bg-[#02589F]/[0.07] blur-[200px]" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#D72731]/[0.05] blur-[180px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#02589F]/[0.04] blur-[160px]" />
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-5 md:px-10 lg:px-16 xl:px-20">
        {/* ══════════════════════════════════════════════
            INTRO STRIP
        ══════════════════════════════════════════════ */}
        <div className="pt-20 md:pt-28 mb-14 md:mb-18">
          {/* Top row: kicker + CTA */}
          <div className="flex items-start justify-between gap-6 mb-8 md:mb-12">
            <Reveal>
              <div className="flex items-center gap-4">
                <div className="w-7 h-[2px] bg-[#D72731]" />
                <span
                  className={`${montserrat.className} text-[#D72731] text-[10px] font-bold uppercase tracking-[0.3em]`}
                >
                  Brand Ecosystem // Authorized Dealer
                </span>
              </div>
            </Reveal>

            {/* <Reveal delay={0.1} className="hidden md:block">
              <a
                href="/contact"
                className="group flex items-center gap-3 border border-white/[0.1] rounded-full pl-5 pr-2 py-2 hover:border-white/[0.22] transition-all duration-400"
              >
                <span className={`${montserrat.className} text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-white/80 transition-colors`}>
                  Get a Free Quote
                </span>
                <div className="w-8 h-8 rounded-full bg-[#D72731] flex items-center justify-center group-hover:rotate-45 transition-transform duration-400 shadow-[0_0_18px_rgba(215,39,49,0.4)]">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </a>
            </Reveal> */}
          </div>

          {/* Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <TextReveal>
                <h2
                  className={`${montserrat.className} text-[clamp(2rem,5vw,3.75rem)] font-bold text-white leading-[1.15] tracking-normal`}
                >
                  World-Class Brands.
                </h2>
              </TextReveal>
              <TextReveal delay={0.08}>
                <h2
                  className={`${montserrat.className} text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.15] tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-[#02589F] to-[#00aaff] mt-2`}
                >
                  One Trusted Partner.
                </h2>
              </TextReveal>
            </div>
            <Reveal delay={0.18} className="lg:col-span-5 lg:pb-1">
              <p
                className={`${inter.className} text-white/60 text-[14px] md:text-[15px] leading-[1.9] font-normal max-w-md`}
              >
                As an authorized dealer of Saint Gobain, Fundermax, and LG
                Hausys, we bring Kerala's finest selection of glass, cladding,
                and surface materials — backed by expert design support and
                statewide service.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            BRAND CARDS — 3 col grid
        ══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-8">
          {BRANDS.map((brand, i) => (
            <BrandCard key={brand.id} brand={brand} index={i} />
          ))}
        </div>

        {/* ══════════════════════════════════════════════
            FEATURE BANNER — parallax image left, process right
        ══════════════════════════════════════════════ */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 mb-8">
          {/* Left — parallax hero image */}
          <Reveal className="lg:col-span-5 min-h-[380px] md:min-h-[500px]">
            <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden group border border-white/[0.08]">
              <motion.div
                style={{ y: featParallax }}
                className="absolute inset-[-12%] w-[124%] h-[124%]"
              >
                <img
                  src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1800"
                  alt="Precise Homes showroom — modern interior"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[2.5s] ease-[0.22,1,0.36,1]"
                />
              </motion.div>

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-[#03070b]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#03070b]/40 via-transparent to-transparent" />

              {/* Corner ticks */}
              <div className="absolute top-5 right-5 border-t border-r border-white/20 w-5 h-5 pointer-events-none" />
              <div className="absolute bottom-5 left-5 border-b border-l border-white/20 w-5 h-5 pointer-events-none" />

              {/* Floating glass chips */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2.5 bg-black/40 backdrop-blur-xl border border-white/[0.1] rounded-xl px-4 py-2.5">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#D72731]"
                />
                <span
                  className={`${montserrat.className} text-white text-[11px] font-bold tracking-wide`}
                >
                  Ernakulam Showroom
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <div
                  className={`${montserrat.className} text-white/50 text-[9px] uppercase tracking-widest font-bold mb-2`}
                >
                  Experience Centre
                </div>
                <h3
                  className={`${montserrat.className} text-2xl md:text-3xl font-bold text-white leading-tight mb-4`}
                >
                  Visit Our Showroom
                </h3>
                <p
                  className={`${inter.className} text-white/60 text-[13px] leading-relaxed mb-6 max-w-xs`}
                >
                  Civil Line Road, Padivattom, Kochi — see every product
                  displayed and experience the quality in person.
                </p>
                <a
                  href="https://maps.google.com/?q=Precise+Homes+Padivattom+Kochi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/map flex items-center gap-3 w-max"
                >
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover/map:bg-[#D72731] group-hover/map:border-[#D72731] transition-all duration-300">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                  <span
                    className={`${montserrat.className} text-white/50 text-[10px] font-bold uppercase tracking-wider group-hover/map:text-white/80 transition-colors`}
                  >
                    Get Directions
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right — process + quick stats */}
          <div className="lg:col-span-7 flex flex-col gap-5 md:gap-6">
            {/* Process card */}
            <Reveal
              delay={0.08}
              className="flex-1 bg-white/[0.025] border border-white/[0.08] rounded-2xl md:rounded-3xl p-8 md:p-10 hover:border-white/[0.14] transition-colors duration-500"
            >
              <div className="flex items-center gap-4 mb-10">
                <Plus className="w-4 h-4 text-[#D72731] shrink-0" />
                <span
                  className={`${montserrat.className} text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]`}
                >
                  Our Process
                </span>
              </div>

              <div className="flex flex-col">
                {PROCESS.map((step, i) => (
                  <ProcessStep
                    key={step.n}
                    step={step}
                    index={i}
                    isLast={i === PROCESS.length - 1}
                  />
                ))}
              </div>
            </Reveal>

            {/* Bottom stats row */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[
                { value: "500+", label: "Projects", accent: "#02589F" },
                { value: "All Kerala", label: "Coverage", accent: "#D72731" },
                { value: "8+", label: "Years", accent: "#02589F" },
              ].map(({ value, label, accent }, i) => (
                <Reveal
                  key={label}
                  delay={0.1 + i * 0.07}
                  className="bg-white/[0.025] border border-white/[0.08] rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-5 hover:border-white/[0.14] transition-colors duration-500"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <div>
                    <div
                      className={`${montserrat.className} text-2xl md:text-3xl font-bold text-white leading-[1.1] mb-2`}
                    >
                      {value}
                    </div>
                    <div
                      className={`${montserrat.className} text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]`}
                    >
                      {label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            BOTTOM MARQUEE — product names
        ══════════════════════════════════════════════ */}
        <div className="mt-10 -mx-5 md:-mx-10 lg:-mx-16 xl:-mx-20 border-t border-white/[0.07] overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex items-center whitespace-nowrap w-max py-6"
          >
            {[
              "Saint Gobain",
              "UPVC Windows",
              "Fundermax",
              "Exterior Cladding",
              "LG Hausys",
              "Shower Partitions",
              "Glass Handrails",
              "Wall Coverings",
              "Saint Gobain",
              "UPVC Windows",
              "Fundermax",
              "Exterior Cladding",
              "LG Hausys",
              "Shower Partitions",
              "Glass Handrails",
              "Wall Coverings",
            ].map((name, i) => (
              <div
                key={i}
                className="flex items-center gap-10 md:gap-16 px-6 md:px-10"
              >
                <span
                  className={`${montserrat.className} text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white/[0.15]`}
                >
                  {name}
                </span>
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: i % 2 === 0 ? "#D72731" : "#02589F",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════
            FULL-WIDTH CTA CARD
        ══════════════════════════════════════════════ */}
        <Reveal className="mt-8 mb-0">
          <div className="relative border border-white/[0.08] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
            {/* Layered bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#02589F]/10 via-[#03070b] to-[#D72731]/10 pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(2,88,159,0.15),transparent_60%)] pointer-events-none" />

            {/* Corner marks */}
            <Plus className="absolute top-6 left-6 text-white/10 w-4 h-4" />
            <Plus className="absolute top-6 right-6 text-white/10 w-4 h-4" />
            <Plus className="absolute bottom-6 left-6 text-white/10 w-4 h-4" />
            <Plus className="absolute bottom-6 right-6 text-white/10 w-4 h-4" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 px-8 md:px-12 lg:px-20 py-16 md:py-20">
              <div className="max-w-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-[2px] bg-[#D72731]" />
                  <span
                    className={`${montserrat.className} text-[#D72731] text-[10px] font-bold uppercase tracking-[0.3em]`}
                  >
                    Ready to Start
                  </span>
                </div>
                <TextReveal>
                  <h3
                    className={`${montserrat.className} text-[clamp(1.8rem,4vw,3rem)] font-bold text-white leading-[1.2] tracking-normal`}
                  >
                    Your dream home is{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#02589F] to-[#00aaff] block mt-1 md:inline md:mt-0">
                      one call away.
                    </span>
                  </h3>
                </TextReveal>
                <Reveal delay={0.15} className="mt-6">
                  <p
                    className={`${inter.className} text-white/60 text-[14px] md:text-[15px] leading-[1.9] font-normal`}
                  >
                    Book a free on-site consultation — we'll assess your space,
                    recommend the right products, and deliver a tailored
                    proposal with no obligations.
                  </p>
                </Reveal>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="group relative overflow-hidden rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl pl-7 pr-2 py-2 flex items-center gap-5 transition-all duration-500 hover:bg-white/10 hover:border-white/25 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
                  aria-label="Start your project with Precise Homes"
                >
                  <span
                    className={`${montserrat.className} text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]`}
                  >
                    Book Consultation
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-400">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </button>

                <a
                  href="tel:+919895105012"
                  className="group flex items-center justify-center w-full sm:w-auto gap-3 border border-white/[0.15] rounded-full px-8 py-4 hover:border-white/[0.3] transition-all duration-300"
                >
                  <span
                    className={`${montserrat.className} text-white/60 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] group-hover:text-white/90 transition-colors`}
                  >
                    +91 98951 05012
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom spacer */}
        <div className="h-16 md:h-24" />
        <ProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </section>
  );
}
