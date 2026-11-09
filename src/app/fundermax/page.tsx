
"use client";


import { useState, useRef, useEffect, useCallback } from "react";
import { Syne } from "next/font/google";
import {
  motion, useScroll, useTransform, useSpring,
  AnimatePresence, useInView, useMotionValue,
} from "framer-motion";
import {
  ArrowUpRight, Plus, X, ChevronLeft, ChevronRight,
  Eye, ArrowLeft, MapPin, Phone, Mail, Shield, Layers,
  Droplets, Sun, Award, Cpu,
} from "lucide-react";
import Link from "next/link";
import { LD_ID, SITE, waLink } from "@/lib/site";


// ─── Font ────────────────────────────────────────────────────────────────────
const syneFont = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// ─── Physics ─────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { stiffness: 120, damping: 20, mass: 0.8 };

// ─── Types ───────────────────────────────────────────────────────────────────
type Span = "hero" | "wide" | "tall" | "square";
type GalleryItem = {
  id: string; src: string; alt: string; title: string;
  subtitle: string; tag: string; span: Span; year: string; location: string;
};

// ─── Gallery Data (18 images – dimensions derived from screenshots) ───────────
const GALLERY: GalleryItem[] = [
  { id:"f1",  src:"/images/fundermax/fundermax1.jpeg",  span:"wide",   tag:"FACADE",     title:"Modern Residential Facade",   subtitle:"HPL Panel Excellence",      year:"2024", location:"Ernakulam", alt:"Fundermax HPL exterior cladding modern residential facade Ernakulam Kerala Precise Homes" },
  { id:"f2",  src:"/images/fundermax/fundermax2.jpeg",  span:"square", tag:"WOODLOOK",   title:"Wood-Look HPL Exterior",       subtitle:"Natural Warm Aesthetics",   year:"2024", location:"Kochi",     alt:"Fundermax wood-look HPL exterior panel Kochi Kerala Precise Homes" },
  { id:"f3",  src:"/images/fundermax/fundermax3.jpeg",  span:"square", tag:"CLADDING",   title:"Contemporary Panel Design",   subtitle:"Architectural Precision",   year:"2023", location:"Thrissur",  alt:"Fundermax contemporary HPL panel design Thrissur Kerala Precise Homes" },
  { id:"f4",  src:"/images/fundermax/fundermax4.jpeg",  span:"tall",   tag:"PANEL",      title:"Vertical Panel System",       subtitle:"Bold Linear Rhythm",        year:"2024", location:"Ernakulam", alt:"Fundermax vertical HPL panel system Ernakulam Kerala Precise Homes" },
  { id:"f5",  src:"/images/fundermax/fundermax5.jpeg",  span:"tall",   tag:"OVERHEAD",   title:"Ceiling Feature Cladding",    subtitle:"Overhead Grandeur",         year:"2024", location:"Kochi",     alt:"Fundermax ceiling feature cladding Kochi Kerala Precise Homes" },
  { id:"f6",  src:"/images/fundermax/fundermax6.jpeg",  span:"tall",   tag:"BALCONY",    title:"Balcony Facade System",       subtitle:"Weather-Proof Beauty",      year:"2023", location:"Thrissur",  alt:"Fundermax balcony facade system weather-proof Thrissur Kerala Precise Homes" },
  { id:"f7",  src:"/images/fundermax/fundermax7.jpeg",  span:"tall",   tag:"WALL",       title:"Wall Cladding System",        subtitle:"Durable & Elegant",         year:"2024", location:"Ernakulam", alt:"Fundermax wall cladding system durable Ernakulam Kerala Precise Homes" },
  { id:"f8",  src:"/images/fundermax/fundermax8.jpeg",  span:"wide",   tag:"PREMIUM",    title:"Premium HPL Residential",     subtitle:"Quality Craftsmanship",     year:"2024", location:"Kochi",     alt:"Fundermax premium HPL residential quality Kochi Kerala Precise Homes" },
  { id:"f9",  src:"/images/fundermax/fundermax9.jpeg",  span:"tall",   tag:"ENTRY",      title:"Entrance Feature Design",     subtitle:"First Impressions",         year:"2023", location:"Thrissur",  alt:"Fundermax entrance feature design Thrissur Kerala Precise Homes" },
  { id:"f10", src:"/images/fundermax/fundermax10.jpeg", span:"wide",   tag:"STRIPE",     title:"Horizontal Stripe Facade",    subtitle:"Linear Elegance",           year:"2024", location:"Ernakulam", alt:"Fundermax horizontal stripe facade Ernakulam Kerala Precise Homes" },
  { id:"f11", src:"/images/fundermax/fundermax11.jpeg", span:"wide",   tag:"COMMERCIAL", title:"Commercial Cladding",         subtitle:"Corporate Presence",        year:"2024", location:"Kochi",     alt:"Fundermax commercial HPL cladding Kochi Kerala Precise Homes" },
  { id:"f12", src:"/images/fundermax/fundermax12.jpeg", span:"tall",   tag:"COLOR",      title:"Colorful HPL Exterior",       subtitle:"Vibrant Personality",       year:"2023", location:"Thrissur",  alt:"Fundermax colorful HPL exterior Thrissur Kerala Precise Homes" },
  { id:"f13", src:"/images/fundermax/fundermax13.jpeg", span:"tall",   tag:"MULTI",      title:"Multi-Storey Facade",         subtitle:"Architectural Scale",       year:"2024", location:"Ernakulam", alt:"Fundermax multi-storey facade Ernakulam Kerala Precise Homes" },
  { id:"f14", src:"/images/fundermax/fundermax14.jpeg", span:"tall",   tag:"GATE",       title:"Gate Pillar Cladding",        subtitle:"Refined Entrance",          year:"2024", location:"Kochi",     alt:"Fundermax gate pillar cladding Kochi Kerala Precise Homes" },
  { id:"f15", src:"/images/fundermax/fundermax15.jpeg", span:"tall",   tag:"STAIRS",     title:"Staircase Cladding",          subtitle:"Structural Beauty",         year:"2023", location:"Thrissur",  alt:"Fundermax staircase cladding Thrissur Kerala Precise Homes" },
  { id:"f16", src:"/images/fundermax/fundermax16.jpeg", span:"tall",   tag:"MIX",        title:"Mixed Palette Exterior",      subtitle:"Contrast & Harmony",        year:"2024", location:"Ernakulam", alt:"Fundermax mixed palette exterior Ernakulam Kerala Precise Homes" },
  { id:"f17", src:"/images/fundermax/fundermax17.jpeg", span:"tall",   tag:"DETAIL",     title:"Window Sill Detail",          subtitle:"Precision Detailing",       year:"2024", location:"Kochi",     alt:"Fundermax window sill detail Kochi Kerala Precise Homes" },
  { id:"f18", src:"/images/fundermax/fundermax18.jpeg", span:"tall",   tag:"CANOPY",     title:"Canopy & Pergola Feature",    subtitle:"Outdoor Elegance",          year:"2023", location:"Thrissur",  alt:"Fundermax canopy pergola feature outdoor Thrissur Kerala Precise Homes" },
];

const SPAN_CLASS: Record<Span, string> = {
  hero:   "col-span-1 sm:col-span-2 row-span-2",
  wide:   "col-span-1 sm:col-span-2 row-span-1",
  tall:   "col-span-1 row-span-2",
  square: "col-span-1 row-span-1",
};

// ─── SEO JSON-LD ─────────────────────────────────────────────────────────────
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.precisehomes.in/fundermax#webpage",
      url: "https://www.precisehomes.in/fundermax",
      name: "Fundermax HPL Cladding in Kochi — Precise Homes",
      isPartOf: { "@id": LD_ID.website },
      about: { "@id": LD_ID.business },
      breadcrumb: { "@id": "https://www.precisehomes.in/fundermax#breadcrumb" },
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.precisehomes.in/fundermax#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.precisehomes.in/" },
        { "@type": "ListItem", position: 2, name: "Fundermax HPL Cladding", item: "https://www.precisehomes.in/fundermax" },
      ],
    },
    {
      "@type": "ImageGallery",
      name: "Fundermax HPL Cladding projects by Precise Homes, Kerala",
      description: "Completed Fundermax HPL exterior cladding projects across Ernakulam, Kochi, Thrissur and Kerala.",
      numberOfItems: GALLERY.length,
      publisher: { "@id": LD_ID.business },
    },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────
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
      if (n >= value) { setDisplay(value); clearInterval(t); }
      else setDisplay(Math.floor(n));
    }, 16);
    return () => clearInterval(t);
  }, [inView, value]);
  return <span ref={ref}>{display}{suffix}</span>;
}


function GalleryCard({ item, index, onOpen }: { item: GalleryItem; index: number; onOpen: (i: GalleryItem) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), SPRING);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), SPRING);
  const isLarge = item.span === "wide" || item.span === "hero";

  return (
    <motion.article
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`View: ${item.title}`}
      onKeyDown={(e) => e.key === "Enter" && onOpen(item)}
      className={`relative group cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#D72731]/60 ${SPAN_CLASS[item.span]}`}
      initial={{ opacity: 0, y: 60, filter: "blur(16px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.3, delay: (index % 6) * 0.07, ease: EASE }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1400, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); mx.set(0); my.set(0); }}
      onClick={() => onOpen(item)}
    >
      <motion.img
        src={item.src} alt={item.alt}
        loading={index < 6 ? "eager" : "lazy"} decoding="async"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-[#03070b]/15 to-transparent" />
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-[#D72731]/10 mix-blend-multiply pointer-events-none" />

      {/* Scan-line */}
      <AnimatePresence>
        {hovered && (
          <motion.div key="scan"
            className="absolute left-0 right-0 h-[1.5px] bg-[#D72731]/80 shadow-[0_0_16px_rgba(215,39,49,0.9)] z-20 pointer-events-none"
            initial={{ top: "-2px" }} animate={{ top: "calc(100% + 2px)" }}
            transition={{ duration: 1.8, ease: "linear", repeat: Infinity, repeatDelay: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Tag */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <motion.div initial={{ width: 0 }} animate={inView ? { width: 12 } : {}}
          transition={{ duration: 0.8, delay: (index % 6) * 0.07 + 0.5 }}
          className="h-[1.5px] bg-[#D72731] origin-left" />
        <span className="text-[#D72731] font-bold text-[7px] uppercase tracking-[0.45em]">{item.tag}</span>
      </div>

      {/* Ghost year */}
      <motion.div animate={{ opacity: hovered ? 0.15 : 0, y: hovered ? 0 : 12 }} transition={{ duration: 0.5 }}
        className="absolute top-2 right-3 text-white font-bold leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(36px,5vw,68px)" }} aria-hidden="true">
        {item.year}
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 z-10">
        <motion.div animate={{ y: hovered ? -6 : 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <p className="text-white/40 text-[8px] uppercase tracking-[0.4em] font-bold mb-1">Fundermax</p>
          <h3 className={`font-bold text-white leading-tight tracking-tight ${isLarge ? "text-xl lg:text-2xl" : "text-base lg:text-lg"}`}>
            {item.title}
          </h3>
          <motion.div animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
              <div>
                <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-medium">{item.subtitle}</p>
                <p className="text-white/25 text-[8px] mt-0.5">{item.location}, Kerala</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#D72731] flex items-center justify-center shadow-[0_0_24px_rgba(215,39,49,0.5)]">
                <Eye className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 border border-white/20 pointer-events-none" />
      {(["top-2 left-2 border-t border-l","top-2 right-2 border-t border-r","bottom-2 left-2 border-b border-l","bottom-2 right-2 border-b border-r"] as const).map((cls) => (
        <motion.div key={cls} animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          className={`absolute w-4 h-4 border-[#D72731]/70 pointer-events-none ${cls}`} />
      ))}
    </motion.article>
  );
}

function Lightbox({ item, items, onClose, onNav, onJump }: {
  item: GalleryItem; items: GalleryItem[];
  onClose: () => void; onNav: (dir: 1 | -1) => void; onJump: (it: GalleryItem) => void;
}) {
  const idx = items.findIndex((i) => i.id === item.id);
  const filmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = filmRef.current?.querySelector(`[data-active="true"]`) as HTMLElement | null;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
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
    <motion.div role="dialog" aria-modal="true" aria-label={`Lightbox: ${item.title}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      onClick={onClose}>
      <div className="absolute inset-0 bg-[#03070b]/97 backdrop-blur-2xl" />
      {(["top-6 left-6","top-6 right-6","bottom-6 left-6","bottom-6 right-6"]).map((pos) => (
        <Plus key={pos} className={`absolute ${pos} text-white/10 w-5 h-5 pointer-events-none`} />
      ))}
      <motion.div
        initial={{ scale: 0.93, y: 30, filter: "blur(8px)" }}
        animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ scale: 0.93, y: 30 }}
        transition={{ duration: 0.65, ease: EASE }}
        className="relative z-10 w-full max-w-6xl mx-4 flex flex-col lg:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}>

        {/* Image */}
        <div className="relative w-full lg:w-[62%] aspect-[4/3] lg:aspect-auto lg:h-[72vh] overflow-hidden bg-[#080d14]">
          <AnimatePresence mode="wait">
            <motion.img key={item.id} src={item.src} alt={item.alt} loading="eager"
              initial={{ opacity: 0, scale: 1.08, filter: "blur(20px) saturate(2)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px) saturate(1)" }}
              exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
              transition={{ duration: 0.75, ease: EASE }}
              className="w-full h-full object-cover" />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#03070b]/50 via-transparent to-transparent pointer-events-none" />
          {([{ dir: -1 as const, pos: "left-4", Icon: ChevronLeft },
             { dir:  1 as const, pos: "right-4", Icon: ChevronRight }]).map(({ dir, pos, Icon }) => (
            <button key={dir} onClick={() => onNav(dir)}
              aria-label={dir === -1 ? "Previous" : "Next"}
              className={`absolute ${pos} top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/20 hover:border-[#D72731]/50 transition-all group`}>
              <Icon className="w-5 h-5 text-white group-hover:text-[#D72731] transition-colors" />
            </button>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 items-center">
            {items.map((_, i) => (
              <div key={i} className={`h-[2px] rounded-full transition-all duration-500 ${i === idx ? "w-8 bg-[#D72731]" : "w-2 bg-white/20"}`} />
            ))}
          </div>
        </div>

        {/* Info panel */}
        <div className="w-full lg:w-[38%] bg-[#080d14] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
          <div className="flex-1 p-7 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-[2px] bg-[#D72731]" />
                <span className="text-[#D72731] font-bold tracking-[0.4em] uppercase text-[8px]">{item.tag}</span>
                <span className="ml-auto text-white/20 text-[8px] font-bold">
                  {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white leading-[1.1] tracking-tight mb-2">{item.title}</h2>
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-8">{item.subtitle}</p>
              <dl className="space-y-3 border-t border-white/10 pt-6">
                {[
                  { label: "Brand",    value: "Fundermax" },
                  { label: "Category", value: "Exterior HPL Cladding" },
                  { label: "Year",     value: item.year },
                  { label: "Location", value: `${item.location}, Kerala` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <dt className="text-white/25 text-[9px] uppercase tracking-[0.3em] font-bold">{label}</dt>
                    <dd className="text-white/70 text-[10px] font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10">
              <a href={waLink(`Hi Precise Homes! I'd like a project like "${item.title}" (Fundermax HPL Cladding).`)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 w-full"
                aria-label="Start a similar HPL cladding project">
                <span className="text-white/50 text-[9px] uppercase tracking-[0.3em] font-bold group-hover:text-white transition-colors">
                  Start a Similar Project
                </span>
                <div className="ml-auto w-9 h-9 rounded-full bg-[#D72731]/20 border border-[#D72731]/40 flex items-center justify-center group-hover:bg-[#D72731] transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D72731] group-hover:text-white transition-colors" />
                </div>
              </a>
            </div>
          </div>

          {/* Filmstrip thumbnails */}
          <div ref={filmRef}
            className="flex gap-1.5 overflow-x-auto p-3 bg-black/30 border-t border-white/10"
            style={{ scrollbarWidth: "none" }}
            aria-label="All projects">
            {items.map((it) => (
              <button key={it.id} data-active={it.id === item.id}
                aria-current={it.id === item.id} aria-label={`Go to ${it.title}`} onClick={() => onJump(it)}
                className={`shrink-0 w-14 h-10 overflow-hidden transition-all duration-300 rounded-[1px] ${it.id === item.id ? "ring-[1.5px] ring-[#D72731] opacity-100" : "opacity-30 hover:opacity-60"}`}>
                <img src={it.src} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Close */}
      <button onClick={onClose} aria-label="Close lightbox"
        className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group">
        <X className="w-4 h-4 text-white/50 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
      </button>
    </motion.div>
  );
}

type Feature = { Icon: React.ComponentType<{ className?: string }>; title: string; desc: string };

/** One feature tile — hooks live at component level (they were previously called inside .map()). */
function FeatureCard({ Icon, title, desc, i }: Feature & { i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
                <motion.div ref={ref}
                  initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
                  className="group relative bg-white/[0.03] border border-white/[0.07] p-6 lg:p-7 hover:border-[#D72731]/30 hover:bg-white/[0.06] transition-all duration-500">
                  <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#D72731] group-hover:w-full transition-all duration-700" />
                  <div className="w-10 h-10 rounded-full bg-[#D72731]/10 border border-[#D72731]/20 flex items-center justify-center mb-5 group-hover:bg-[#D72731]/20 transition-all duration-300">
                    <Icon className="w-4 h-4 text-[#D72731]" />
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base tracking-tight mb-2">{title}</h3>
                  <p className="text-white/35 text-[12px] leading-[1.75] font-medium">{desc}</p>
                </motion.div>
              );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function FundermaxPage() {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const openLightbox = useCallback((item: GalleryItem) => {
    setLightboxItem(item);
    document.body.style.overflow = "hidden";
  }, []);
  const closeLightbox = useCallback(() => {
    setLightboxItem(null);
    document.body.style.overflow = "";
  }, []);
  const navLightbox = useCallback((dir: 1 | -1) => {
    if (!lightboxItem) return;
    const i = GALLERY.findIndex((x) => x.id === lightboxItem.id);
    setLightboxItem(GALLERY[(i + dir + GALLERY.length) % GALLERY.length]);
  }, [lightboxItem]);

  const FEATURES = [
    { Icon: Shield,   title: "B1 Fire-Rated",       desc: "Certified fire resistance class B1/B2 for safe facade applications on all building types." },
    { Icon: Droplets, title: "Weather-Proof",        desc: "Resists moisture, rain, frost, and humidity — designed for Kerala's tropical climate." },
    { Icon: Sun,      title: "UV-Stable",            desc: "Colour-fast under intense UV radiation. Retains aesthetics for 15+ years without fading." },
    { Icon: Layers,   title: "200+ Surface Options", desc: "From wood-grain to solid colours — unlimited design possibilities for every architectural vision." },
    { Icon: Cpu,      title: "Low Maintenance",      desc: "Smooth surface repels dirt and grime; simple water cleaning restores original finish." },
    { Icon: Award,    title: "Authorized Dealer",    desc: "Direct-certified dealership ensuring genuine Fundermax panels with full warranty support." },
  ];

  return (
    <main
      ref={sectionRef}
      className={`relative bg-[#03070b] min-h-screen overflow-hidden selection:bg-[#D72731] selection:text-white ${syneFont.className}`}
      aria-label="Fundermax HPL Exterior Cladding – Precise Homes Kerala"
    >
      {/* SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-[900px] h-[900px] rounded-full bg-[#D72731]/5 blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#02589F]/5 blur-[130px] pointer-events-none" />
      {/* Grid texture */}
      <div className="fixed inset-0 opacity-[0.022] pointer-events-none"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />

      {/* ── TOP NAV ───────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 py-5 bg-[#03070b]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <Link href="/" className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#D72731]/50 group-hover:bg-[#D72731]/10 transition-all duration-300">
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.35em] hidden sm:block">Back to Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-5 h-[2px] bg-[#D72731]" />
          <span className="text-white font-bold text-[10px] uppercase tracking-[0.4em]">Fundermax</span>
          <span className="text-white/20 text-[10px]">×</span>
          <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium">Precise Homes</span>
        </div>

      <a href={waLink("Hi Precise Homes! I'd like a quote for Fundermax HPL Cladding.")} target="_blank" rel="noopener noreferrer"
  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#D72731] text-white text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-[#D72731]/80 transition-all shadow-[0_0_20px_rgba(215,39,49,0.3)]">
  Get Quote
  <ArrowUpRight className="w-3 h-3" />
</a>
      </nav>

      <div className="relative z-10 max-w-[1920px] mx-auto px-5 md:px-12 lg:px-24 pt-28 pb-0">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <header ref={heroRef} className="relative mb-20 lg:mb-28 pt-8 lg:pt-16">
          {/* Eyebrow */}
          <div className="overflow-hidden mb-6">
            <motion.div initial={{ y: "110%" }} animate={heroInView ? { y: "0%" } : {}}
              transition={{ duration: 1.1, ease: EASE }}
              className="flex items-center gap-5">
              <div className="w-10 h-[2px] bg-[#D72731]" />
              <span className="text-[#D72731] font-bold tracking-[0.45em] uppercase text-[9px]">
                Exterior Cladding // HPL Panels
              </span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            {/* Title */}
            <motion.div className="lg:col-span-7" style={{ y: parallaxY }}>
              <h1>
              {[
                { text: "FUNDER", color: "text-white",    delay: 0 },
                { text: "MAX",    color: "text-[#D72731]", delay: 0.1 },
                { text: "HPL",    color: "text-white",    delay: 0.2 },
              ].map(({ text, color, delay }) => (
                <span key={text} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "105%", rotateX: 10, filter: "blur(10px)" }}
                    animate={heroInView ? { y: "0%", rotateX: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.5, delay, ease: EASE }}
                    className={`text-[17vw] sm:text-[12vw] lg:text-[9vw] xl:text-[7.5vw] font-bold leading-[0.85] tracking-tighter uppercase ${color}`}>
                    {text}
                  </motion.span>
                </span>
              ))}
              </h1>
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "105%", filter: "blur(10px)" }}
                  animate={heroInView ? { y: "0%", filter: "blur(0px)" } : {}}
                  transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
                  className="text-white/25 text-sm md:text-base font-medium tracking-[0.25em] uppercase mt-4">
                  Exterior Cladding Solutions — Kerala
                </motion.p>
              </div>
            </motion.div>

            {/* Stats + description */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
                className="grid grid-cols-3 gap-3">
                {[
                  { val: 18,  sfx: "+", label: "Projects Shown" },
                  { val: 200, sfx: "+", label: "Color Options" },
                  { val: 15,  sfx: "Y", label: "Warranty" },
                ].map(({ val, sfx, label }) => (
                  <div key={label}>
                    <p className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
                      <Counter value={val} suffix={sfx} />
                    </p>
                    <p className="text-white/25 text-[8px] uppercase tracking-[0.35em] font-semibold mt-1">{label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.52, ease: EASE }}
                className="text-white/45 text-sm md:text-[15px] leading-[1.85] font-medium">
                As Ernakulam&apos;s authorized <strong className="text-white/60 font-semibold">Fundermax HPL cladding dealer</strong>, Precise Homes delivers
                weather-proof, UV-stable facade solutions for residential and commercial projects across Kerala.
                Fundermax High Pressure Laminate panels combine architectural beauty with exceptional durability.
              </motion.p>
            </div>
          </div>

          {/* Hero image strip */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
            className="relative mt-12 h-[220px] md:h-[320px] lg:h-[420px] overflow-hidden rounded-none">
            <img src="/images/fundermax/fundermax1.jpeg"
              alt="Fundermax HPL exterior cladding showcase Kerala Precise Homes"
              className="w-full h-full object-cover object-center"
              loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#03070b] via-transparent to-[#03070b]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-transparent to-transparent" />

            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex items-center gap-4 bg-[#080d14]/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#D72731] animate-pulse" />
              <span className="text-white/60 text-[9px] font-bold uppercase tracking-[0.35em]">Authorized Fundermax Dealer · Kerala</span>
            </div>
          </motion.div>
        </header>

        {/* ── FEATURES ─────────────────────────────────────────────────── */}
        <section className="mb-24 lg:mb-32" aria-label="Fundermax product features">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-8 h-[2px] bg-[#D72731]" />
            <span className="text-[#D72731] font-bold tracking-[0.45em] uppercase text-[9px]">Why Fundermax</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <FeatureCard key={title} Icon={Icon} title={title} desc={desc} i={i} />
            ))}
          </div>
        </section>

        {/* ── GALLERY ──────────────────────────────────────────────────── */}
        <section className="mb-24 lg:mb-32" aria-label="Fundermax project gallery Kerala">
          {/* Controls header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-5 mb-3">
                <div className="w-8 h-[2px] bg-[#D72731]" />
                <span className="text-[#D72731] font-bold tracking-[0.45em] uppercase text-[9px]">Project Portfolio</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tighter">
                HPL Cladding<br />
                <span className="text-[#D72731]">Installations.</span>
              </h2>
            </div>

          </div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
              style={{ gridAutoRows: "280px", gridAutoFlow: "dense" }}
              role="list" aria-label="Fundermax HPL cladding gallery">
              {GALLERY.map((item, idx) => (
                <GalleryCard key={item.id} item={item} index={idx} onOpen={openLightbox} />
              ))}
            </motion.div>
        </section>

        {/* ── SEO text ─────────────────────────────────────────────────── */}
        <div className="mb-24 pt-8 border-t border-white/5">
          <p className="text-white/40 text-[12px] leading-[1.9] max-w-4xl font-medium">
            Precise Homes is an authorized dealer for <em>Fundermax HPL exterior cladding panels</em> in Ernakulam, Kochi,
            Thrissur, and across Kerala. Our installations include residential HPL facade cladding, balcony panels, gate pillar cladding,
            canopy features, staircase panels, and commercial building facades. Fundermax High Pressure Laminate (HPL) panels are
            weather-resistant, fire-rated, UV-stable, and available in 200+ surface designs. Contact us at Civil Line Road, Padivattom,
            Kochi — Kerala 682024 for Fundermax supply and installation enquiries.
          </p>
        </div>
      </div>

      {/* ── MAP SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative" aria-label="Precise Homes location Kochi Kerala">
        <div className="max-w-[1920px] mx-auto px-5 md:px-12 lg:px-24 mb-0">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-8 h-[2px] bg-[#D72731]" />
            <span className="text-[#D72731] font-bold tracking-[0.45em] uppercase text-[9px]">Find Us</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tighter mb-12">
            Visit Our<br /><span className="text-[#02589F] brightness-125">Showroom.</span>
          </h2>
        </div>

        <div className="relative h-[480px] md:h-[560px] overflow-hidden">
          {/* Dark overlay on map */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-0 bg-[#03070b]/20" />
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#03070b] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#03070b] to-transparent" />
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#03070b] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#03070b] to-transparent" />
          </div>

          <iframe
            title="Precise Homes location – Civil Line Road Padivattom Kochi Kerala"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.677408580019!2d76.30397!3d10.02617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080dc6c3a73fe9%3A0x68c8b45a87e48a8b!2sPadivattom%2C+Kochi%2C+Kerala+682024!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="w-full h-full border-0 saturate-[0.15] contrast-[1.1] brightness-[0.85]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          {/* Info card overlay */}
          <div className="absolute z-20 bottom-10 left-5 md:left-12 lg:left-24 bg-[#080d14]/95 backdrop-blur-2xl border border-white/10 p-6 max-w-xs">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D72731]" />
            <p className="text-[#D72731] text-[7px] font-bold uppercase tracking-[0.45em] mb-3">Precise Homes</p>
            <p className="text-white font-bold text-base leading-snug mb-4">
              Building No: 42/3405,<br />
              Civil Line Road, Padivattom,<br />
              Kochi, Ernakulam — 682024
            </p>
            <div className="space-y-2">
              <a href="tel:+919895105012" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                <Phone className="w-3 h-3 shrink-0 text-[#D72731]" />
                <span className="text-[10px] font-medium">+91 98951 05012</span>
              </a>
              <a href="mailto:precisehomeauto@gmail.com" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                <Mail className="w-3 h-3 shrink-0 text-[#D72731]" />
                <span className="text-[10px] font-medium">precisehomeauto@gmail.com</span>
              </a>
            </div>
            <a href="https://maps.google.com/?q=Precise+Homes+Padivattom+Kochi" target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[#D72731] hover:text-white transition-colors">
              <MapPin className="w-3 h-3" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Get Directions</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className={`relative bg-[#03070b] border-t border-white/[0.07] pt-20 pb-10 px-5 md:px-12 lg:px-24 ${syneFont.className}`}>
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-[#D72731]" />
                <span className="text-white font-bold text-sm tracking-[0.2em] uppercase">Precise Homes</span>
              </div>
              <p className="text-white/35 text-[12px] leading-[1.85] max-w-sm mb-6">
                Ernakulam&apos;s authorized dealer for Fundermax HPL exterior cladding, Saint-Gobain glass solutions,
                and LG Hausys interior panels. Premium supply & installation across Kerala.
              </p>
              <div className="flex items-center gap-3">
                {([["Facebook", SITE.social.facebook], ["Instagram", SITE.social.instagram], ["YouTube", SITE.social.youtube]] as const).map(([s, href]) => (
                  <a key={s} href={href} target="_blank" rel="noopener noreferrer" aria-label={s} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#D72731]/40 hover:bg-[#D72731]/10 transition-all cursor-pointer">
                    <span className="text-white/30 text-[7px] font-bold">{s[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-white/25 text-[8px] uppercase tracking-[0.4em] font-bold mb-5">Headquarters</p>
              <div className="space-y-4">
                <a href="https://maps.google.com/?q=Precise+Homes+Padivattom+Kochi" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 group">
                  <MapPin className="w-3.5 h-3.5 text-[#D72731] shrink-0 mt-0.5" />
                  <span className="text-white/45 text-[11px] leading-[1.7] font-medium group-hover:text-white/70 transition-colors">
                    Building No: 42/3405,<br />Civil Line Road, Padivattom,<br />Kochi, Ernakulam — 682024
                  </span>
                </a>
                <a href="tel:+919895105012" className="flex items-center gap-3 group">
                  <Phone className="w-3.5 h-3.5 text-[#D72731] shrink-0" />
                  <span className="text-white/45 text-[11px] font-medium group-hover:text-white/70 transition-colors">+91 98951 05012</span>
                </a>
                <a href="mailto:precisehomeauto@gmail.com" className="flex items-center gap-3 group">
                  <Mail className="w-3.5 h-3.5 text-[#D72731] shrink-0" />
                  <span className="text-white/45 text-[11px] font-medium group-hover:text-white/70 transition-colors">precisehomeauto@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <p className="text-white/25 text-[8px] uppercase tracking-[0.4em] font-bold mb-5">Our Brands</p>
              <div className="space-y-3">
                {[
                  { label: "Fundermax HPL Cladding", href: "/fundermax" },
                  { label: "Saint-Gobain Glass",     href: "/saint-gobain" },
                  { label: "LG Hausys Panels",        href: "/lg-hausys" },
                  { label: "All Products",            href: "/products" },
                ].map(({ label, href }) => (
                  <Link key={label} href={href}
                    className="flex items-center gap-3 group text-white/35 hover:text-white transition-colors">
                    <div className="w-3 h-[1px] bg-[#D72731]/40 group-hover:w-5 group-hover:bg-[#D72731] transition-all duration-300" />
                    <span className="text-[11px] font-medium">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-white/15 text-[9px] uppercase tracking-[0.35em] font-medium">
              © {new Date().getFullYear()} Precise Home Pvt. Ltd. · All Rights Reserved
            </p>
            <p className="text-white/15 text-[9px] uppercase tracking-[0.35em] font-medium">
              Authorized Fundermax Dealer · Ernakulam, Kerala
            </p>
          </div>
        </div>
      </footer>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} items={GALLERY} onClose={closeLightbox} onNav={navLightbox} onJump={setLightboxItem} />
        )}
      </AnimatePresence>
    </main>
  );
}