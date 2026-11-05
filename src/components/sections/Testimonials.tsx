"use client";

import React, { useRef, useEffect, useState } from "react";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { Quote, ArrowUpRight, MapPin } from "lucide-react";
import { SpriteIcon } from "../ui/IconSprite";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const E = [0.22, 1, 0.36, 1] as const;

const REVIEWS = [
  {
    name: "Krishna D.S",
    role: "9 reviews · 10 photos",
    avatar: "K",
    rating: 5,
    text: "Really nice experience. The space showcases various home products with glass, aesthetic cladding options, and beautiful wallpapers that completely transformed the look of our walls.",
    tag: "Glass & Cladding",
    color: "#02589F",
  },
  {
    name: "Rammohan Chozhiath",
    role: "8 reviews",
    avatar: "R",
    rating: 5,
    text: "Great display at the showroom. Staff were very helpful and knowledgeable. They have the best Saint Gobain UPVC windows — highly satisfied with the quality.",
    tag: "UPVC Windows",
    color: "#D72731",
  },
  {
    name: "Dev DV",
    role: "3 reviews",
    avatar: "D",
    rating: 5,
    text: "Great experience with Precise Homes. Really satisfied with the customized solutions provided by their expert designers for exterior cladding and home appliances.",
    tag: "Exterior Cladding",
    color: "#02589F",
  },
  {
    name: "alwin shelal thomas",
    role: "5 reviews",
    avatar: "A",
    rating: 5,
    text: "Excellent experience at My Home by Saint Gobain showroom in Kochi. Knowledgeable staff, wide selection of uPVC windows, and professional service. Highly recommended.",
    tag: "Saint Gobain",
    color: "#D72731",
  },
  {
    name: "Sajith P. George",
    role: "3 reviews",
    avatar: "S",
    rating: 5,
    text: "If you are looking at durable windows, handrails, cubicles — this is the place! Great collection, the team knows what they're doing. Approachable and trustworthy!",
    tag: "Windows & Rails",
    color: "#02589F",
  },
  {
    name: "Vineesh Gangadharan",
    role: "Local Guide · 31 reviews",
    avatar: "V",
    rating: 5,
    text: "Highly recommended team with a consultative approach. Friendly staff with great expertise in home solutions. A must-visit experience centre for new home makers.",
    tag: "Home Solutions",
    color: "#D72731",
  },
  {
    name: "Ananthu S",
    role: "9 reviews",
    avatar: "A",
    rating: 5,
    text: "Wonderful showroom. Saint Gobain world of variety — UPVC Windows, Handrail system, Shower Partitions, Kitchen shutters, Wall coverings and much more to experience.",
    tag: "Full Range",
    color: "#02589F",
  },
  {
    name: "rahul aravind",
    role: "2 reviews",
    avatar: "R",
    rating: 5,
    text: "Best Saint Gobain partner in Kerala. Highly professional staff and a beautiful showroom displaying every product. The experience is truly unmatched anywhere else.",
    tag: "Best in Kerala",
    color: "#D72731",
  },
  {
    name: "Vineeth Mohan",
    role: "5 reviews",
    avatar: "V",
    rating: 5,
    text: "It was a pleasant experience and I really appreciate the guidance and support we got from the staff for choosing the right products for my home. Excellent service.",
    tag: "Expert Guidance",
    color: "#02589F",
  },
  {
    name: "Zafeena Rasheed",
    role: "1 review",
    avatar: "Z",
    rating: 5,
    text: "A very friendly, helpful and knowledgeable staff. The showroom showcases various home products that completely transformed my home. Highly recommended.",
    tag: "Home Transform",
    color: "#D72731",
  },
];

const ROW1 = REVIEWS.slice(0, 5);
const ROW2 = REVIEWS.slice(5);

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[0,1,2,3,4].map(i => (
        <SpriteIcon key={i} id="ph-star" className="w-3 h-3 text-[#D72731]" />
      ))}
    </div>
  );
}

const GoogleIcon = () => <SpriteIcon id="ph-google" className="w-[13px] h-[13px]" />;

function ReviewCard({ r }: { r: typeof REVIEWS[0] }) {
  const isBlue = r.color === "#02589F";
  return (
    <div className="flex-shrink-0 w-[310px] md:w-[350px] flex flex-col gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 hover:border-white/[0.18] transition-colors duration-500 group relative overflow-hidden">
      {/* Glow blob */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${r.color}25, transparent 70%)`, filter: "blur(20px)" }}
      />

      {/* Top row */}
      <div className="flex items-center justify-between">
        <Stars />
        <div className="flex items-center gap-1.5 bg-white/[0.04] rounded-full px-2.5 py-1 border border-white/[0.06]">
          <GoogleIcon />
          <span className="text-white/30 text-[9px] font-bold">Google</span>
        </div>
      </div>

      {/* Tag */}
      <div
        className="w-fit rounded-full px-3 py-1"
        style={{
          background: `${r.color}18`,
          border: `1px solid ${r.color}30`,
        }}
      >
        <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: isBlue ? "#60b4ff" : "#ff8888" }}>
          {r.tag}
        </span>
      </div>

      {/* Quote */}
      <p className="text-white/55 text-[13px] leading-[1.8] font-medium flex-1 relative">
        <Quote className="inline w-3 h-3 mr-1 opacity-30" style={{ color: r.color }} />
        {r.text}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-white/[0.06] pt-4">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
          style={{ background: `${r.color}30`, border: `1px solid ${r.color}45` }}
        >
          {r.avatar}
        </div>
        <div className="min-w-0">
          <div className="text-white text-[12px] font-semibold truncate">{r.name}</div>
          <div className="text-white/30 text-[10px]">{r.role}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, speed = 55 }: { items: typeof REVIEWS; reverse?: boolean; speed?: number }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden -mx-5 md:-mx-10 lg:-mx-16 xl:-mx-20 select-none">
      <motion.div
        animate={{ x: reverse ? ["-33.3333%", "0%"] : ["0%", "-33.3333%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 w-max px-4"
      >
        {doubled.map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </motion.div>
    </div>
  );
}

function useCounter(to: number, active: boolean, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      const dur = 1800;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        setVal(Math.floor((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(tick);
        else setVal(to);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [active, to, delay]);
  return val;
}

export default function Testimonials() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: "-60px" });
  const count = useCounter(49, inView, 200);

  return (
    <section
      id="testimonials"
      className={`relative w-full bg-[#03070b] overflow-hidden pb-24 md:pb-32 ${jakarta.className}`}
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-[10%] w-[600px] h-[600px] rounded-full bg-[#D72731]/[0.05] blur-[160px]" />
        <div className="absolute bottom-0 left-[5%] w-[500px] h-[500px] rounded-full bg-[#02589F]/[0.06] blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-5 md:px-10 lg:px-16 xl:px-20">

        {/* ── Header ── */}
        <div ref={headRef} className="pt-20 md:pt-28 mb-12 md:mb-16">

          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: E }}
            className="flex items-center gap-4 mb-7"
          >
            <div className="w-7 h-[2px] bg-[#D72731]" />
            <span className="text-[#D72731] text-[10px] font-bold uppercase tracking-[0.42em]">
              Testimonials // Verified Google Reviews
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            {/* Title */}
            <div>
              <div className="overflow-hidden mb-1">
                <motion.h2
                  initial={{ y: "105%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.05, ease: E }}
                  className={`${syne.className} text-[clamp(2.2rem,5.5vw,4rem)] font-extrabold text-white leading-[0.95] tracking-tighter`}
                >
                  What Our Clients
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "105%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.05, delay: 0.09, ease: E }}
                  className={`${syne.className} text-[clamp(2.2rem,5.5vw,4rem)] font-extrabold leading-[0.95] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#02589F] to-[#00aaff]`}
                >
                  Say About Us.
                </motion.h2>
              </div>
            </div>

            {/* Rating summary card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: E }}
              className="flex items-center gap-5 bg-white/[0.035] border border-white/[0.09] rounded-2xl px-6 py-5 shrink-0 flex-wrap"
            >
              {/* Score */}
              <div className="flex items-end gap-3">
                <span className={`${syne.className} text-5xl font-extrabold text-white leading-none`}>4.9</span>
                <div className="flex flex-col gap-1.5 pb-0.5">
                  <Stars />
                  <span className="text-white/30 text-[9px] font-bold uppercase tracking-wider">Avg Rating</span>
                </div>
              </div>

              <div className="w-px h-10 bg-white/[0.08]" />

              {/* Count */}
              <div>
                <div className={`${syne.className} text-4xl font-extrabold text-white leading-none mb-1`}>
                  {count}+
                </div>
                <div className="text-white/30 text-[9px] font-bold uppercase tracking-wider">Reviews</div>
              </div>

              <div className="w-px h-10 bg-white/[0.08]" />

              {/* Google Maps CTA */}
              <a
                href="https://maps.google.com/?q=Precise+Homes+Padivattom+Kochi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.2] rounded-xl px-4 py-3 transition-all duration-300"
              >
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-white/35" />
                  <div>
                    <div className="text-white text-[11px] font-semibold leading-none">Google Maps</div>
                    <div className="text-white/30 text-[9px] mt-0.5">View all reviews</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/25 group-hover:text-white/55 group-hover:rotate-45 transition-all duration-300" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Marquee Row 1 ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: E }}
      >
        <MarqueeRow items={ROW1} speed={52} />
      </motion.div>

      <div className="h-4" />

      {/* ── Marquee Row 2 ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1, ease: E }}
      >
        <MarqueeRow items={ROW2} reverse speed={64} />
      </motion.div>

      {/* ── Bottom strip ── */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 md:px-10 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: E }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-white/[0.07] pt-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {["K","R","D","V","S"].map((l, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#03070b]"
                  style={{ background: i % 2 === 0 ? "#02589F35" : "#D7273135", outline: `1px solid ${i % 2 === 0 ? "#02589F40" : "#D7273140"}` }}
                >
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div className="text-white text-[13px] font-semibold">1,000+ Happy Families</div>
              <div className="text-white/35 text-[11px] mt-0.5">Ernakulam&apos;s most trusted home partner</div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Precise+Homes+Padivattom+Kochi"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border border-white/[0.09] hover:border-white/[0.2] rounded-full pl-6 pr-2 py-2 transition-all duration-400"
          >
            <span className="text-white/45 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-white/70 transition-colors">
              Read All Reviews
            </span>
            <div className="w-8 h-8 rounded-full bg-[#D72731] flex items-center justify-center group-hover:rotate-45 transition-transform duration-400 shadow-[0_0_16px_rgba(215,39,49,0.4)]">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}