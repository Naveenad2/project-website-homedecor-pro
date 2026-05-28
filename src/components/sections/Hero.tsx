"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Syne } from "next/font/google";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Plus, Globe, Sparkles } from "lucide-react";
import ProjectModal from "@/components/ui/ProjectModal";



// --- Typography
const syneFont = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// --- Constants
const EASE = [0.22, 1, 0.36, 1] as const;
const INTERVAL = 7000;

// --- Slide Data
const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500",
    words: ["TRANSFORM", "YOUR", "HOMES"],
    accent: 1,
    sub: "Glass Solutions & Facades",
    stat: { val: "500+", label: "Projects Delivered" },
  },
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2500",
    words: ["CREATE", "INSPIRED", "SPACES"],
    accent: 1,
    sub: "Premium Interior Cladding",
    stat: { val: "12+", label: "Years of Craft" },
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2500",
    words: ["PRECISE", "HOME", "AGENCY"],
    accent: 1,
    sub: "Saint-Gobain · Fundermax · LG Hausys",
    stat: { val: "98%", label: "Client Satisfaction" },
  },
];

// --- SEO: JSON-LD Structured Data (LocalBusiness + Service schema)
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://precisehomes.in/#business",
      name: "Precise Homes",
      alternateName: "Precise Home Care Agency",
      url: "https://precisehomes.in",
      logo: {
        "@type": "ImageObject",
        url: "https://precisehomes.in/wp-content/uploads/2024/07/cropped-precise-homes-new-fav-icon-270x270.jpg",
      },
      image:
        "https://precisehomes.in/wp-content/uploads/2023/07/precise-homecare-fundermax.jpg",
      description:
        "Precise Homes is Ernakulam's premier home care service provider offering high-quality glass solutions, exterior cladding, and durable home appliances from Saint-Gobain, Fundermax, and LG Hausys.",
      telephone: "+919895105012",
      email: "info@precisehomes.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Building No: 42/3405, Civil Line Road, Padivattom",
        addressLocality: "Kochi",
        addressRegion: "Kerala",
        postalCode: "682024",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 10.0158,
        longitude: 76.3419,
      },
      areaServed: [
        { "@type": "State", name: "Kerala" },
        { "@type": "City", name: "Ernakulam" },
        { "@type": "City", name: "Kochi" },
      ],
      priceRange: "₹₹₹",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/precisehomesindia",
        "https://www.instagram.com/precisehomesindia/",
        "https://www.youtube.com/@precisehomeautocare",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Home Care Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Saint-Gobain Glass Solutions",
              description:
                "Authorized dealer for Saint-Gobain glass installations, facades and glazing solutions across Kerala.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Fundermax Exterior Cladding",
              description:
                "Premium Fundermax exterior cladding panels for modern home and commercial facades in Ernakulam.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "LG Hausys Interior Surfaces",
              description:
                "LG Hausys hi-macs and engineered surfaces for premium interior finishing in Kerala.",
            },
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "120",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://precisehomes.in/#website",
      url: "https://precisehomes.in",
      name: "Precise Homes",
      description:
        "Kerala's trusted home care agency — glass solutions, cladding & premium appliances.",
      publisher: { "@id": "https://precisehomes.in/#business" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://precisehomes.in/?s={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://precisehomes.in/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://precisehomes.in/",
        },
      ],
    },
  ],
};

// --- Detect touch device
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

// --- Custom Cursor (desktop only)
function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 240, damping: 30 });
  const sy = useSpring(y, { stiffness: 240, damping: 30 });
  const trailX = useSpring(x, { stiffness: 55, damping: 16 });
  const trailY = useSpring(y, { stiffness: 55, damping: 16 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        style={{
          left: trailX,
          top: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed z-[999] pointer-events-none hidden md:block w-8 h-8 rounded-full border border-[#D72731]/40 mix-blend-difference"
        animate={{ scale: clicked ? 1.6 : 1 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        style={{
          left: sx,
          top: sy,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed z-[999] pointer-events-none hidden md:block w-2 h-2 rounded-full bg-[#D72731]"
        animate={{ scale: clicked ? 0.5 : 1 }}
        transition={{ duration: 0.12 }}
      />
    </>
  );
}

// --- Scan-line Overlay
function ScanLines() {
  return (
    <div
      className="absolute inset-0 z-[18] pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)",
        backgroundSize: "100% 4px",
      }}
    />
  );
}

// --- Particle type
interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  dur: number;
  delay: number;
}

// --- Ambient Particle Field
// FIX: Particles are generated only on the client via useEffect,
// preventing the SSR/CSR Math.random() hydration mismatch.
function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        dur: Math.random() * 8 + 6,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 z-[16] pointer-events-none hidden lg:block overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -34, 0],
            opacity: [0, 0.45, 0],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// --- Character-Split Word Reveal
function KineticWord({
  text,
  accent,
  delay = 0,
  indent = false,
}: {
  text: string;
  accent?: boolean;
  delay?: number;
  indent?: boolean;
}) {
  const chars = text.split("");

  return (
    <div
      className={`overflow-hidden flex items-end py-[2px] ${
        indent ? "md:pl-[5vw]" : ""
      }`}
    >
      <div className="flex">
        {chars.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: "108%", opacity: 0, rotateX: 22, skewX: -3 }}
            animate={{ y: "0%", opacity: 1, rotateX: 0, skewX: 0 }}
            transition={{
              duration: 1.15,
              delay: delay + i * 0.038,
              ease: EASE,
            }}
            className={`inline-block text-[12vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.5vw] xl:text-[6.5vw] font-bold leading-[0.88] tracking-tighter uppercase drop-shadow-2xl ${
              ch === " " ? "w-[0.25em]" : ""
            } ${
              accent
                ? "text-[#02589F] saturate-[180%] brightness-[1.35]"
                : "text-white"
            }`}
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// --- Rotating Stamp
function RotatingStamp() {
  return (
    <div className="absolute top-28 right-10 md:top-36 md:right-20 z-30 hidden lg:flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="relative w-24 h-24 xl:w-28 xl:h-28 flex items-center justify-center opacity-50 hover:opacity-80 transition-opacity duration-500"
      >
        <div className="absolute inset-0 rounded-full border border-white/15" />
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <path
            id="stamp-curve"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="transparent"
          />
          <text
            fontSize="9"
            fontWeight="700"
            letterSpacing="3"
            fill="rgba(255,255,255,0.7)"
            fontFamily="inherit"
          >
            <textPath href="#stamp-curve" startOffset="0%">
              PRECISE HOME CARE • AUTHORIZED •{" "}
            </textPath>
          </text>
        </svg>
        <Globe className="w-5 h-5 text-[#D72731]" />
      </motion.div>
    </div>
  );
}

// --- Scroll Indicator
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, delay: 2.4, ease: EASE }}
      className="flex flex-col items-center gap-2"
    >
      <span className="text-white/25 text-[8px] font-bold uppercase tracking-[0.5em]">
        Scroll
      </span>
      <div className="w-[1.5px] h-10 bg-white/10 rounded-full relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#D72731] to-transparent rounded-full"
          animate={{ y: ["-100%", "100%"] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1],
          }}
          style={{ height: "50%" }}
        />
      </div>
    </motion.div>
  );
}

// --- Slide Progress Tracker
function SlideTracker({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (i: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 22 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.3, delay: 1.9, ease: EASE }}
      className="flex flex-col gap-3 items-end"
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-[#02589F] text-[8px] font-bold uppercase tracking-[0.45em] brightness-125">
          Visual
        </span>
        <span className="text-white/30 text-[8px] font-bold tracking-widest tabular-nums">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="flex gap-[3px] w-full h-[2px]">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="h-full flex-grow relative overflow-hidden bg-white/15 hover:bg-white/30 transition-colors duration-300"
          >
            {current === idx && (
              <motion.div
                key={`prog-${idx}`}
                className="absolute inset-0 bg-[#D72731] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              />
            )}
            {current > idx && (
              <div className="absolute inset-0 bg-white/50" />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// --- Live Stat Badge
function StatBadge({ val, label }: { val: string; label: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={val}
        initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(5px)" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="flex flex-col"
      >
        <span className="text-white font-bold text-2xl md:text-3xl tracking-tighter leading-none">
          {val}
        </span>
        <span className="text-white/30 text-[8px] uppercase tracking-[0.35em] font-semibold mt-1">
          {label}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

// --- Main Hero Component
export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isMobile = useIsMobile();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
      setIsTransitioning(false);
    }, 90);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      if (i === current) return;
      if (timerRef.current) clearInterval(timerRef.current);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(i);
        setIsTransitioning(false);
        timerRef.current = setInterval(advance, INTERVAL);
      }, 90);
    },
    [current, advance]
  );

  useEffect(() => {
    timerRef.current = setInterval(advance, INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance]);

  const slide = SLIDES[current];

  return (
    <>
      {/* ── JSON-LD Structured Data ─────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Custom cursor — desktop only */}
      {!isMobile && <CustomCursor />}

      <section
        className={`relative min-h-[100svh] w-full bg-[#03070b] overflow-hidden ${syneFont.className}`}
        style={{ cursor: isMobile ? "auto" : "none" }}
        aria-label="Precise Homes Hero — Home Care Agency Ernakulam"
      >
        {/* 1. Background Image Engine */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={`bg-${current}`}
              initial={{ opacity: 0, scale: 1.07 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 2.2, ease: EASE }}
              className="absolute inset-0 w-full h-full origin-center"
              style={{ willChange: "transform, opacity" }}
            >
              <motion.img
                src={slide.img}
                alt={`Precise Homes — ${slide.sub}`}
                animate={!isMobile ? { scale: [1.0, 1.045] } : {}}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                className="w-full h-full object-cover"
                style={{ willChange: "transform" }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Layered gradient vignette system */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#03070b] via-[#03070b]/55 to-[#03070b]/5" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#03070b]/92 via-[#03070b]/35 to-transparent" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#03070b]/50 via-transparent to-transparent" />
          <motion.div
            key={`glow-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2 }}
            className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_60%_60%_at_20%_80%,rgba(2,88,159,0.18),transparent)] mix-blend-screen"
          />

          {/* Film grain */}
          <div
            className="absolute inset-0 z-[15] pointer-events-none opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px 200px",
            }}
          />

          {!isMobile && <ScanLines />}
          {!isMobile && <ParticleField />}
        </div>

        {/* 2. Architectural border frame */}
        <div className="absolute inset-4 md:inset-10 border border-white/[0.07] z-20 pointer-events-none hidden md:block">
          {[
            "-top-[10px] -left-[10px]",
            "-top-[10px] -right-[10px]",
            "-bottom-[10px] -left-[10px]",
            "-bottom-[10px] -right-[10px]",
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.3 + i * 0.1,
                ease: EASE,
              }}
              className={`absolute ${pos}`}
            >
              <Plus className="w-5 h-5 text-white/20" />
            </motion.div>
          ))}
        </div>

        {/* Vertical telemetry line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2.0, delay: 0.6, ease: EASE }}
          className="absolute left-5 md:left-11 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-20 hidden md:block origin-top"
        />

        {/* 3. Rotating Stamp */}
        <RotatingStamp />

        {/* Slide number: vertical right ticker */}
        <div className="absolute right-5 md:right-11 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={`num-${current}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-white/15 font-bold text-[9px] uppercase tracking-[0.5em] [writing-mode:vertical-rl]"
            >
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(SLIDES.length).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* 4. Master Content Layout */}
        <div className="relative z-30 w-full h-full min-h-[100svh] max-w-[1920px] mx-auto px-5 sm:px-10 lg:px-20 xl:px-24 flex flex-col justify-between pt-24 sm:pt-32 md:pt-36 pb-10 sm:pb-14">

          {/* Eyebrow kicker */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.15, delay: 0.2, ease: EASE }}
              className="flex items-center gap-5"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.05, delay: 0.4, ease: EASE }}
                className="w-10 md:w-16 h-[2px] bg-[#D72731] origin-left"
              />
              <span className="text-[#D72731] font-bold tracking-[0.45em] uppercase text-[8px] md:text-[9px]">
                Home Care Agency // Ernakulam
              </span>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 1.0 }}
                className="hidden sm:flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D72731] animate-pulse" />
                <span className="text-white/25 text-[7px] font-bold uppercase tracking-[0.5em]">
                  Live
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* 5. Kinetic Typography */}
          <div className="flex-grow flex flex-col justify-center perspective-[1200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-${current}`}
                className="flex flex-col gap-0"
              >
                {slide.words.map((word, wi) => (
                  <KineticWord
                    key={`${current}-${wi}`}
                    text={word}
                    accent={wi === slide.accent}
                    delay={wi * 0.13}
                    indent={wi === 1}
                  />
                ))}

                {/* Red period */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.65, delay: 0.58, ease: EASE }}
                  className="flex items-center gap-5 mt-2 ml-1"
                >
                  <span
                    className="text-[#D72731] text-[12vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.5vw] xl:text-[6.5vw] font-bold leading-none"
                    style={{ display: "inline-block" }}
                  >
                    .
                  </span>
                  {/* Subtitle badge */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`sub-${current}`}
                      initial={{ opacity: 0, x: -18, filter: "blur(7px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: 18, filter: "blur(5px)" }}
                      transition={{ duration: 0.85, delay: 0.52, ease: EASE }}
                      className="flex items-center gap-3 bg-white/[0.05] border border-white/10 backdrop-blur-md rounded-full px-4 py-1.5 hidden sm:flex"
                    >
                      <Sparkles className="w-3 h-3 text-[#D72731] shrink-0" />
                      <span className="text-white/60 text-[9px] font-bold uppercase tracking-[0.3em]">
                        {slide.sub}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 6. Footer Strip */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end pt-10 md:pt-14 border-t border-white/[0.08] relative">
            <Plus className="absolute -top-2.5 left-0 text-white/15 w-5 h-5" />
            <Plus className="absolute -top-2.5 right-0 text-white/15 w-5 h-5" />

            {/* Body copy */}
            <div className="lg:col-span-6 xl:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.25, delay: 0.6, ease: EASE }}
                className="text-white/55 text-sm md:text-[15px] leading-[1.85] font-medium max-w-xl"
              >
                Ernakulam's premier home care service. High-quality glass
                solutions, exterior cladding, and appliances from{" "}
                <span className="text-white/85 font-semibold">
                  Saint-Gobain, Fundermax & LG Hausys
                </span>
                — crafted with precision.
              </motion.p>
            </div>

            {/* Controls column */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
              {/* CTA + Stat Group */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.25, delay: 0.78, ease: EASE }}
                className="flex items-center gap-6"
              >
                {/* CTA Button */}
               <button
  type="button"
  onClick={() => setModalOpen(true)}
  className="group relative overflow-hidden rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl pl-7 pr-2 py-2 flex items-center gap-5 transition-all duration-500 hover:bg-white/10 hover:border-white/25 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
  aria-label="Start your project with Precise Homes"
>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#D72731]/10 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.42 }}
                    style={{ originX: 0 }}
                  />
                  <span className="text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] relative z-10 whitespace-nowrap">
                    Start Project
                  </span>
                  <div className="relative z-10 w-9 h-9 rounded-full bg-[#D72731] flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500 ease-out shadow-[0_0_24px_rgba(215,39,49,0.45)]">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>

                {/* Stat */}
                <div className="hidden sm:block border-l border-white/10 pl-6">
                  <StatBadge val={slide.stat.val} label={slide.stat.label} />
                </div>
              </motion.div>

              {/* Tracker + Scroll */}
              <div className="flex flex-col gap-6 items-end w-full max-w-[200px] sm:max-w-[220px] ml-auto">
                <SlideTracker
                  total={SLIDES.length}
                  current={current}
                  onSelect={goTo}
                />
                <div className="self-start md:self-end">
                  <ScrollIndicator />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transition wipe overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.14, ease: "easeInOut" }}
              style={{ originY: "center" }}
              className="absolute inset-0 z-50 bg-[#03070b]/30 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </section>
       <ProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}