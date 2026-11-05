"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Syne } from "next/font/google";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useInView,
  useMotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  LayoutGrid,
  Film,
} from "lucide-react";
import { LD_ID, waLink } from "@/lib/site";

// ─── Typography (unchanged) ───────────────────────────────────────────────────
const syneFont = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// ─── Physics & Easing ────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { stiffness: 120, damping: 20, mass: 0.8 };

// ─── Types ───────────────────────────────────────────────────────────────────
type Span = "hero" | "wide" | "tall" | "square";
type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  category: string;
  brand: string;
  tag: string;
  span: Span;
  year: string;
  location: string;
};

// ─── Gallery Data (41 items: 18 Fundermax · 15 Saint-Gobain · 8 LG Hausys) ──
// [title, subtitle, tag, span]
const F_DATA: [string, string, string, Span][] = [
  ["Modern Residential Facade", "HPL Panel Excellence", "CLADDING", "wide"],
  ["Wood-Look HPL Exterior", "Natural Warm Aesthetics", "WOODLOOK", "square"],
  ["Contemporary Panel Design", "Architectural Precision", "FACADE", "square"],
  ["Vertical Panel System", "Bold Linear Rhythm", "PANEL", "tall"],
  ["Ceiling Feature Cladding", "Overhead Grandeur", "OVERHEAD", "tall"],
  ["Balcony Facade System", "Weather-Proof Beauty", "BALCONY", "tall"],
  ["Wall Cladding System", "Durable & Elegant", "WALL", "tall"],
  ["Premium HPL Residential", "Quality Craftsmanship", "PREMIUM", "wide"],
  ["Entrance Feature Design", "First Impressions", "ENTRY", "tall"],
  ["Horizontal Stripe Facade", "Linear Elegance", "STRIPE", "wide"],
  ["Commercial Cladding", "Corporate Presence", "COMMERCIAL", "wide"],
  ["Colorful HPL Exterior", "Vibrant Personality", "COLOR", "tall"],
  ["Multi-Storey Facade", "Architectural Scale", "MULTI", "tall"],
  ["Gate Pillar Cladding", "Refined Entrance", "GATE", "tall"],
  ["Staircase Cladding", "Structural Beauty", "STAIRS", "tall"],
  ["Mixed Palette Exterior", "Contrast & Harmony", "MIX", "tall"],
  ["Window Sill Detail", "Precision Detailing", "DETAIL", "tall"],
  ["Canopy & Pergola Feature", "Outdoor Elegance", "CANOPY", "tall"],
];

const S_DATA: [string, string, string, Span][] = [
  ["Warm Interior Glazing", "Thermal Comfort Glass", "GLASS", "wide"],
  ["Sliding Glass Door", "Seamless Living Flow", "DOOR", "tall"],
  ["Landscape View Window", "Framing Nature's Best", "VIEW", "tall"],
  ["Large Panel Glazing", "Maximum Natural Light", "PANEL", "tall"],
  ["Panoramic Window System", "Unobstructed Vistas", "PANORAMA", "tall"],
  ["Premium Glass Install", "Crystal Clarity", "PREMIUM", "wide"],
  ["uPVC Sliding System", "Smooth Effortless Glide", "UPVC", "tall"],
  ["Horizontal Glass Strip", "Modern Fenestration", "STRIP", "wide"],
  ["Interior Glazed View", "Natural Daylight Inflow", "INTERIOR", "tall"],
  ["Double Glazed Unit", "Energy Efficiency", "DGU", "wide"],
  ["Glass Facade Panel", "Architectural Glazing", "FACADE", "wide"],
  ["Strip Window System", "Controlled Light Entry", "WINDOWS", "wide"],
  ["Frosted Interior Door", "Privacy & Modern Style", "FROSTED", "tall"],
  ["Premium Door System", "Architectural Entry", "ENTRY", "tall"],
  ["Revolving Glass Entry", "Grand Entrance Statement", "REVOLVE", "tall"],
];

const L_DATA: [string, string, string, Span][] = [
  ["Ceiling Panel Feature", "Interior Excellence", "CEILING", "tall"],
  ["Wood-Look Interior", "Warmth & Rich Texture", "WOOD", "tall"],
  ["Textured Ceiling Design", "Sculptural Surface", "TEXTURE", "tall"],
  ["Lit Ceiling Panel", "Integrated Lighting", "LIGHTING", "tall"],
  ["Warm Gold Interior", "Luxury Ambience", "LUXURY", "tall"],
  ["Warm Tone Feature", "Cosy Atmosphere", "WARM", "tall"],
  ["Stripe Ceiling Detail", "Geometric Precision", "STRIPE", "wide"],
  ["Corner Detail Panel", "Refined Junctions", "DETAIL", "tall"],
];

const LG_FILENAMES = [
  "/images/lg/lg1.jpeg",
  "/images/lg/lg2.jpeg",
  "/images/lg/lg3.jpeg",
  "/images/lg/lg4.jpeg",
  "/images/lg/lg5.jpeg",
  "/images/lg/lg6.jpeg",
  "/images/lg/lg7.jpeg",
  "/images/lg/lg8.jpeg",
];

const LOCS = ["Ernakulam", "Kochi", "Thrissur"];
const YEARS = ["2024", "2024", "2023"];

function buildItems(
  prefix: string,
  folder: string,
  category: string,
  brand: string,
  altBase: string,
  data: [string, string, string, Span][],
  filenames?: string[],
): GalleryItem[] {
  return data.map(([title, subtitle, tag, span], i) => ({
    id: `${prefix}${i + 1}`,
    src: filenames ? filenames[i] : `/images/${folder}/${folder}${i + 1}.jpeg`,
    alt: `${brand} ${tag.toLowerCase()} - ${title.toLowerCase()} installation ${LOCS[i % 3]} Kerala | Precise Homes`,
    title,
    subtitle,
    category,
    brand,
    tag,
    span,
    year: YEARS[i % 3],
    location: LOCS[i % 3],
  }));
}

const FUNDERMAX_ITEMS = buildItems(
  "f",
  "fundermax",
  "Exterior Cladding",
  "Fundermax",
  "Fundermax HPL exterior cladding",
  F_DATA,
);
const SAINTGOBAIN_ITEMS = buildItems(
  "s",
  "saintgobain",
  "Glass Solutions",
  "Saint-Gobain",
  "Saint-Gobain glass windows and doors",
  S_DATA,
);
const LG_ITEMS = buildItems(
  "l",
  "lg",
  "Home Appliances",
  "LG Hausys",
  "LG Hausys interior panel",
  L_DATA,
  LG_FILENAMES,
);

const ALL_ITEMS: GalleryItem[] = [
  ...FUNDERMAX_ITEMS,
  ...SAINTGOBAIN_ITEMS,
  ...LG_ITEMS,
];

// ─── Category Config ──────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "ALL", label: "All Projects", count: ALL_ITEMS.length },
  {
    key: "Exterior Cladding",
    label: "Exterior Cladding",
    count: FUNDERMAX_ITEMS.length,
  },
  {
    key: "Glass Solutions",
    label: "Glass Solutions",
    count: SAINTGOBAIN_ITEMS.length,
  },
  { key: "Home Appliances", label: "Home Appliances", count: LG_ITEMS.length },
];

// ─── SEO: Schema.org JSON-LD ─────────────────────────────────────────────────
const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Precise Homes Project Portfolio – Glass, Cladding & Interior Solutions Kerala",
  description:
    "Portfolio of completed projects: Saint-Gobain glass and uPVC window installations, Fundermax HPL exterior cladding and LG Hausys interior panels across Kerala.",
  numberOfItems: ALL_ITEMS.length,
  publisher: { "@id": LD_ID.business },
};

// ─── Span → CSS classes ───────────────────────────────────────────────────────
const SPAN_CLASS: Record<Span, string> = {
  hero: "col-span-1 sm:col-span-2 row-span-2",
  wide: "col-span-1 sm:col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  square: "col-span-1 row-span-1",
};

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = value / 60;
    const t = setInterval(() => {
      n += step;
      if (n >= value) {
        setDisplay(value);
        clearInterval(t);
      } else setDisplay(Math.floor(n));
    }, 16);
    return () => clearInterval(t);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Film Perforation Strip ───────────────────────────────────────────────────
function Perforations() {
  return (
    <div className="flex gap-[10px] px-2 bg-[#080d14] py-[6px] overflow-hidden w-full">
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="shrink-0 w-5 h-[14px] rounded-[2px] bg-white/[0.06] border border-white/[0.08]"
        />
      ))}
    </div>
  );
}

// ─── Gallery Card (3-D tilt + scan-line + corner marks) ───────────────────────
function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (i: GalleryItem) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);

  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), SPRING);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), SPRING);

  const isLarge = item.span === "wide" || item.span === "hero";

  return (
    <motion.article
      ref={ref}
      role="button"
      aria-label={`View project: ${item.title} by ${item.brand}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(item)}
      className={`relative group cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#D72731]/60 ${SPAN_CLASS[item.span]}`}
      initial={{ opacity: 0, y: 60, filter: "blur(16px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.3, delay: (index % 6) * 0.07, ease: EASE }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mx.set(0);
        my.set(0);
      }}
      onClick={() => onOpen(item)}
    >
      {/* Image */}
      <motion.img
        src={item.src}
        alt={item.alt}
        loading={index < 6 ? "eager" : "lazy"}
        decoding="async"
        width={item.span === "wide" ? 1200 : 600}
        height={item.span === "tall" ? 900 : 450}
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-[#03070b]/15 to-transparent" />

      {/* Blue brand tint on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-[#02589F]/15 mix-blend-multiply pointer-events-none"
      />

      {/* Scan-line (sweeps top → bottom on hover) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="scan"
            className="absolute left-0 right-0 h-[1.5px] bg-[#D72731]/80 shadow-[0_0_16px_rgba(215,39,49,0.9),0_0_40px_rgba(215,39,49,0.3)] z-20 pointer-events-none"
            initial={{ top: "-2px" }}
            animate={{ top: "calc(100% + 2px)" }}
            transition={{
              duration: 1.8,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />
        )}
      </AnimatePresence>

      {/* Top: tag */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: 12 } : {}}
          transition={{ duration: 0.8, delay: (index % 6) * 0.07 + 0.5 }}
          className="h-[1.5px] bg-[#D72731] origin-left"
        />
        <span className="text-[#D72731] font-bold text-[7px] uppercase tracking-[0.45em]">
          {item.tag}
        </span>
      </div>

      {/* Ghost year (hover) */}
      <motion.div
        animate={{ opacity: hovered ? 0.18 : 0, y: hovered ? 0 : 12 }}
        transition={{ duration: 0.5 }}
        className="absolute top-2 right-3 text-white font-bold leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
        aria-hidden="true"
      >
        {item.year}
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 z-10">
        <motion.div
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="text-white/40 text-[8px] uppercase tracking-[0.4em] font-bold mb-1">
            {item.brand}
          </p>
          <h3
            className={`font-bold text-white leading-tight tracking-tight ${isLarge ? "text-xl lg:text-2xl" : "text-base lg:text-lg"}`}
          >
            {item.title}
          </h3>

          {/* Expand on hover */}
          <motion.div
            animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
              <div>
                <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-medium">
                  {item.subtitle}
                </p>
                <p className="text-white/25 text-[8px] mt-0.5">
                  {item.location}
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#D72731] flex items-center justify-center shadow-[0_0_24px_rgba(215,39,49,0.5)]">
                <Eye className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Hover border */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 border border-white/20 pointer-events-none"
      />

      {/* Architectural corner marks */}
      {(
        [
          "top-2 left-2 border-t border-l",
          "top-2 right-2 border-t border-r",
          "bottom-2 left-2 border-b border-l",
          "bottom-2 right-2 border-b border-r",
        ] as const
      ).map((cls) => (
        <motion.div
          key={cls}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          className={`absolute w-4 h-4 border-[#D72731]/70 pointer-events-none ${cls}`}
        />
      ))}
    </motion.article>
  );
}

// ─── Filmstrip View ───────────────────────────────────────────────────────────
function Filmstrip({
  items,
  onOpen,
}: {
  items: GalleryItem[];
  onOpen: (i: GalleryItem) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollL, setScrollL] = useState(0);

  const filmW = (span: Span) =>
    span === "wide" || span === "hero" ? 520 : span === "tall" ? 220 : 320;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative overflow-hidden rounded-none border-y border-white/10"
      role="region"
      aria-label="Project filmstrip view"
    >
      <Perforations />
      {/* Gradient edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#03070b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#03070b] to-transparent z-10 pointer-events-none" />

      <div
        ref={ref}
        className={`flex gap-3 overflow-x-auto py-3 px-6 ${dragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
        style={{ scrollbarWidth: "none" }}
        onMouseDown={(e) => {
          setDragging(true);
          setStartX(e.pageX - (ref.current?.offsetLeft ?? 0));
          setScrollL(ref.current?.scrollLeft ?? 0);
        }}
        onMouseMove={(e) => {
          if (!dragging || !ref.current) return;
          e.preventDefault();
          ref.current.scrollLeft =
            scrollL - (e.pageX - ref.current.offsetLeft - startX) * 2;
        }}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
      >
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.025, ease: EASE }}
            className="relative shrink-0 h-[340px] overflow-hidden group cursor-pointer"
            style={{ width: filmW(item.span) }}
            onClick={() => !dragging && onOpen(item)}
            role="button"
            aria-label={`View ${item.title}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070b]/80 via-transparent to-transparent" />

            {/* Scan line on hover */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.div
                className="absolute left-0 right-0 h-[1px] bg-[#D72731]/70 shadow-[0_0_10px_rgba(215,39,49,0.7)]"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
              />
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-[#D72731] text-[7px] font-bold uppercase tracking-[0.4em]">
                {item.tag}
              </p>
              <p className="text-white font-bold text-sm leading-tight">
                {item.title}
              </p>
              <p className="text-white/40 text-[8px] mt-0.5">
                {item.brand} · {item.location}
              </p>
            </div>

            {/* Index */}
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center">
              <span className="text-white/40 text-[8px] font-bold">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <Perforations />
      <p
        className="text-center text-white/20 text-[9px] uppercase tracking-[0.4em] font-bold py-2"
        aria-hidden="true"
      >
        ← Drag to Explore →
      </p>
    </motion.div>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({
  item,
  items,
  onClose,
  onNav,
  onJump,
}: {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
  onJump: (it: GalleryItem) => void;
}) {
  const idx = items.findIndex((i) => i.id === item.id);
  const filmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = filmRef.current?.querySelector(
      `[data-active="true"]`,
    ) as HTMLElement | null;
    thumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [item]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onNav]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery lightbox: ${item.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#03070b]/97 backdrop-blur-2xl" />

      {/* Corner marks */}
      {[
        "top-6 left-6",
        "top-6 right-6",
        "bottom-6 left-6",
        "bottom-6 right-6",
      ].map((pos) => (
        <Plus
          key={pos}
          className={`absolute ${pos} text-white/10 w-5 h-5 pointer-events-none`}
        />
      ))}

      {/* Main panel */}
      <motion.div
        initial={{ scale: 0.93, y: 30, filter: "blur(8px)" }}
        animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ scale: 0.93, y: 30 }}
        transition={{ duration: 0.65, ease: EASE }}
        className="relative z-10 w-full max-w-6xl mx-4 flex flex-col lg:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full lg:w-[62%] aspect-[4/3] lg:aspect-auto lg:h-[72vh] overflow-hidden bg-[#080d14]">
          <AnimatePresence mode="wait">
            <motion.img
              key={item.id}
              src={item.src}
              alt={item.alt}
              loading="eager"
              initial={{
                opacity: 0,
                scale: 1.08,
                filter: "blur(20px) saturate(2) brightness(1.4)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px) saturate(1) brightness(1)",
              }}
              exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
              transition={{ duration: 0.75, ease: EASE }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#03070b]/50 via-transparent to-transparent pointer-events-none" />

          {/* Prev / Next */}
          {[
            { dir: -1 as const, pos: "left-4", Icon: ChevronLeft },
            { dir: 1 as const, pos: "right-4", Icon: ChevronRight },
          ].map(({ dir, pos, Icon }) => (
            <button
              key={dir}
              onClick={() => onNav(dir)}
              aria-label={dir === -1 ? "Previous project" : "Next project"}
              className={`absolute ${pos} top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/20 hover:border-[#D72731]/50 transition-all group`}
            >
              <Icon className="w-5 h-5 text-white group-hover:text-[#D72731] transition-colors" />
            </button>
          ))}

          {/* Dot nav */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 items-center">
            {items.map((_, i) => (
              <div
                key={i}
                className={`h-[2px] rounded-full transition-all duration-500 ${i === idx ? "w-8 bg-[#D72731]" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-[38%] bg-[#080d14] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
          <div className="flex-1 p-7 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-[2px] bg-[#D72731]" />
                <span className="text-[#D72731] font-bold tracking-[0.4em] uppercase text-[8px]">
                  {item.tag}
                </span>
                <span className="ml-auto text-white/20 text-[8px] font-bold">
                  {String(idx + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-white leading-[1.1] tracking-tight mb-2">
                {item.title}
              </h2>
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-8">
                {item.subtitle}
              </p>

              <dl className="space-y-3 border-t border-white/10 pt-6">
                {[
                  { label: "Brand", value: item.brand },
                  { label: "Category", value: item.category },
                  { label: "Year", value: item.year },
                  { label: "Location", value: `${item.location}, Kerala` },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center"
                  >
                    <dt className="text-white/25 text-[9px] uppercase tracking-[0.3em] font-bold">
                      {label}
                    </dt>
                    <dd className="text-white/70 text-[10px] font-semibold">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <a
                href={waLink(`Hi Precise Homes! I'd like a project similar to "${item.title}" (${item.brand}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 w-full"
                aria-label="Start a similar project with Precise Homes on WhatsApp"
              >
                <span className="text-white/50 text-[9px] uppercase tracking-[0.3em] font-bold group-hover:text-white transition-colors">
                  Start a Similar Project
                </span>
                <div className="ml-auto w-9 h-9 rounded-full bg-[#D72731]/20 border border-[#D72731]/40 flex items-center justify-center group-hover:bg-[#D72731] transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D72731] group-hover:text-white transition-colors" />
                </div>
              </a>
            </div>
          </div>

          {/* Thumbnail filmstrip */}
          <div
            ref={filmRef}
            className="flex gap-1.5 overflow-x-auto p-3 bg-black/30 border-t border-white/10"
            style={{ scrollbarWidth: "none" }}
            aria-label="All projects in this category"
          >
            {items.map((it) => (
              <button
                key={it.id}
                data-active={it.id === item.id}
                aria-current={it.id === item.id}
                aria-label={`Go to ${it.title}`}
                onClick={() => onJump(it)}
                className={`shrink-0 w-14 h-10 overflow-hidden transition-all duration-300 rounded-[1px] ${it.id === item.id ? "ring-[1.5px] ring-[#D72731] opacity-100" : "opacity-30 hover:opacity-60"}`}
              >
                <img
                  src={it.src}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
      >
        <X className="w-4 h-4 text-white/50 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
      </button>
    </motion.div>
  );
}

// ─── Marquee Ticker ───────────────────────────────────────────────────────────
function MarqueeTicker() {
  const base = [
    "Saint-Gobain Glass Kerala",
    "Fundermax HPL Cladding",
    "LG Hausys Interior Panels",
    "Exterior Facade Ernakulam",
    "Glass Solutions Kochi",
    "Precise Homes Kerala",
    "Premium Installations",
    "Home Improvement Experts",
  ];
  const doubled = [...base, ...base];
  return (
    <div
      className="relative w-full overflow-hidden py-5 border-y border-white/10 my-24"
      aria-hidden="true"
    >
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#03070b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#03070b] to-transparent z-10 pointer-events-none" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-8 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 shrink-0">
            <span className="text-white/15 text-[10px] font-bold uppercase tracking-[0.45em]">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D72731] shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main Gallery Section ─────────────────────────────────────────────────────
export default function Gallery() {
  const [activeCat, setActiveCat] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "film">("grid");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-5%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const filtered = useMemo(
    () =>
      activeCat === "ALL"
        ? ALL_ITEMS
        : ALL_ITEMS.filter((i) => i.category === activeCat),
    [activeCat],
  );

  const openLightbox = useCallback((item: GalleryItem) => {
    setLightboxItem(item);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxItem(null);
    document.body.style.overflow = "";
  }, []);

  const navLightbox = useCallback(
    (dir: 1 | -1) => {
      if (!lightboxItem) return;
      const i = filtered.findIndex((x) => x.id === lightboxItem.id);
      setLightboxItem(filtered[(i + dir + filtered.length) % filtered.length]);
    },
    [lightboxItem, filtered],
  );


  return (
    <section
      ref={sectionRef}
      className={`relative bg-[#03070b] overflow-hidden selection:bg-[#D72731] selection:text-white ${syneFont.className}`}
      aria-label="Project portfolio gallery – Precise Homes Kerala"
    >
      {/* JSON-LD SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-[700px] h-[700px] rounded-full bg-[#02589F]/7 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#D72731]/5 blur-[110px] pointer-events-none" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1920px] mx-auto px-5 md:px-12 lg:px-24 pt-28 pb-32">
        {/* ── Section Header ── */}
        <header ref={headerRef} className="mb-20 lg:mb-28">
          {/* Eyebrow */}
          <div className="overflow-hidden mb-5">
            <motion.div
              initial={{ y: "110%" }}
              animate={headerInView ? { y: "0%" } : {}}
              transition={{ duration: 1.1, ease: EASE }}
              className="flex items-center gap-5"
            >
              <div className="w-10 h-[2px] bg-[#D72731]" />
              <span className="text-[#D72731] font-bold tracking-[0.45em] uppercase text-[9px]">
                Our Work // Portfolio
              </span>
            </motion.div>
          </div>

          {/* Title + right column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            {/* Left: large animated title */}
            <motion.div className="lg:col-span-7" style={{ y: titleY }}>
              {[
                { text: "CRAFTED", color: "text-white", delay: 0 },
                {
                  text: "WITH",
                  color: "text-[#02589F] brightness-125",
                  delay: 0.12,
                },
                { text: "PRECISION", color: "text-white", delay: 0.22 },
              ].map(({ text, color, delay }) => (
                <div key={text} className="overflow-hidden">
                  <motion.h2
                    initial={{ y: "105%", rotateX: 10, filter: "blur(10px)" }}
                    animate={
                      headerInView
                        ? { y: "0%", rotateX: 0, filter: "blur(0px)" }
                        : {}
                    }
                    transition={{ duration: 1.5, delay, ease: EASE }}
                    className={`text-[14vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[6vw] font-bold leading-[0.88] tracking-tighter uppercase ${color} ${text === "PRECISION" ? "after:content-['.'] after:text-[#D72731]" : ""}`}
                  >
                    {text}
                    {text === "PRECISION" && (
                      <span className="text-[#D72731]">.</span>
                    )}
                  </motion.h2>
                </div>
              ))}
            </motion.div>

            {/* Right: stats + description */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
                className="grid grid-cols-3 gap-3"
              >
                {[
                  { val: 500, sfx: "+", label: "Projects Done" },
                  { val: 12, sfx: "+", label: "Years Active" },
                  { val: 98, sfx: "%", label: "Satisfaction" },
                ].map(({ val, sfx, label }) => (
                  <div key={label}>
                    <p className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
                      <Counter value={val} suffix={sfx} />
                    </p>
                    <p className="text-white/25 text-[8px] uppercase tracking-[0.35em] font-semibold mt-1">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Description (SEO-rich) */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.52, ease: EASE }}
                className="text-white/45 text-sm md:text-[15px] leading-[1.85] font-medium"
              >
                As Ernakulam&apos;s authorized dealer for{" "}
                <strong className="text-white/60 font-semibold">
                  Saint-Gobain glass solutions
                </strong>
                ,{" "}
                <strong className="text-white/60 font-semibold">
                  Fundermax exterior HPL cladding
                </strong>
                , and{" "}
                <strong className="text-white/60 font-semibold">
                  LG Hausys interior panels
                </strong>{" "}
                — every project is a testament to precision craftsmanship and
                premium quality across Kerala.
              </motion.p>
            </div>
          </div>
        </header>

        {/* ── Controls: Filter + View Mode ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.6, ease: EASE }}
          className="flex flex-wrap items-center gap-3 mb-10"
          role="toolbar"
          aria-label="Gallery filters and view mode"
        >
          {/* Category pills */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => {
              const active = activeCat === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCat(cat.key);
                    setViewMode("grid"); // switching category returns to the grid
                  }}
                  aria-pressed={active}
                  aria-label={`Filter: ${cat.label} (${cat.count} projects)`}
                  className={`relative flex items-center gap-2 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.3em] rounded-full border transition-all duration-400 ${
                    active
                      ? "bg-[#D72731] border-[#D72731] text-white shadow-[0_0_24px_rgba(215,39,49,0.35)]"
                      : "bg-white/5 border-white/10 text-white/45 hover:border-white/25 hover:text-white/75"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`text-[7px] font-bold tabular-nums ${active ? "text-white/70" : "text-white/25"}`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Spacer */}
          <div className="flex-1 hidden md:block" />

          {/* View mode toggle */}
          <div
            className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1"
            role="group"
            aria-label="View mode"
          >
            {[
              { mode: "grid" as const, Icon: LayoutGrid, label: "Grid view" },
              { mode: "film" as const, Icon: Film, label: "Filmstrip view" },
            ].map(({ mode, Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                aria-pressed={viewMode === mode}
                aria-label={label}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${viewMode === mode ? "bg-[#D72731] shadow-[0_0_12px_rgba(215,39,49,0.4)]" : "hover:bg-white/10"}`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${viewMode === mode ? "text-white" : "text-white/40"}`}
                />
              </button>
            ))}
          </div>

          {/* Count */}
          <span className="text-white/20 text-[9px] uppercase tracking-[0.4em] font-bold hidden md:block">
            {filtered.length} Items
          </span>
        </motion.div>

        {/* ── Gallery Display ── */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key={`grid-${activeCat}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
              style={{ gridAutoRows: "280px", gridAutoFlow: "dense" }}
              role="list"
              aria-label={`${activeCat === "ALL" ? "All projects" : activeCat} gallery`}
            >
              {filtered.map((item, idx) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={idx}
                  onOpen={openLightbox}
                />
              ))}
            </motion.div>
          ) : (
            <Filmstrip
              key={`film-${activeCat}`}
              items={filtered}
              onOpen={openLightbox}
            />
          )}
        </AnimatePresence>

        {/* ── SEO rich text (visually subtle, crawlable) ── */}
        <div className="mt-16 pt-10 border-t border-white/5">
          <p className="text-white/15 text-[10px] leading-[1.9] max-w-4xl font-medium">
            Precise Homes is an authorized dealer and installation expert for{" "}
            <em>Saint-Gobain glass solutions</em>,{" "}
            <em>Fundermax HPL exterior cladding</em>, and{" "}
            <em>LG Hausys interior panels</em> in Ernakulam, Kochi, Thrissur and
            across Kerala. Our portfolio includes residential glass facades,
            uPVC sliding doors, double-glazed units, weather-resistant HPL
            facade cladding, gate pillar panels, and premium interior ceiling
            panels. Contact us at Civil Line Road, Padivattom, Kochi — Kerala
            682024.
          </p>
        </div>

        {/* ── Ticker ── */}
        <MarqueeTicker />

        {/* ── Bottom CTA ── */}
        <div className="relative border-t border-white/10 pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <Plus className="absolute -top-3 left-0 text-white/15 w-5 h-5" />
          <Plus className="absolute -top-3 right-0 text-white/15 w-5 h-5" />

          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-7 h-[2px] bg-[#D72731]" />
              <span className="text-[#D72731] text-[9px] font-bold uppercase tracking-[0.4em]">
                Have a Project?
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tighter leading-[1.05]">
              Let&apos;s Build Something
              <br />
              <span className="text-[#02589F] brightness-125">
                Extraordinary.
              </span>
            </h2>
          </div>

          <MagneticButton>
            <a
              href={waLink("Hi Precise Homes! I saw your project portfolio and would like to start a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl pl-7 pr-2 py-2 flex items-center gap-5 transition-all duration-500 hover:bg-white/10 hover:border-white/25 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
              aria-label="Start your project with Precise Homes on WhatsApp"
            >
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                Start a Project
              </span>
              <div className="w-10 h-10 rounded-full bg-[#D72731] flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shadow-[0_0_24px_rgba(215,39,49,0.45)]">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            items={filtered}
            onClose={closeLightbox}
            onNav={navLightbox}
            onJump={setLightboxItem}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
