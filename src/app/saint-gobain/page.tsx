"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import {
  motion, useScroll, useTransform, useSpring,
  AnimatePresence, useInView, useMotionValue,
} from "framer-motion";
import {
  ArrowUpRight, Plus, X, ChevronLeft, ChevronRight,
  Eye, ArrowLeft, MapPin, Phone, Mail, Shield, Layers,
  Droplets, Sun, Award, Cpu, Film, LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { LD_ID, SITE, waLink } from "@/lib/site";

// ─── Font ────────────────────────────────────────────────────────────────────
const syneFont = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

// ─── Gallery Data (15 images matched to your Saint Gobain folder) ───────────
const GALLERY: GalleryItem[] = [
  { id:"sg1",  src:"/images/saintgobain/saintgobain1.jpeg",  span:"wide",   tag:"UPVC",      title:"UPVC Window Systems",  subtitle:"Acoustic Excellence",     year:"2024", location:"Ernakulam", alt:"Saint Gobain UPVC window system Ernakulam Kerala Precise Homes" },
  { id:"sg2",  src:"/images/saintgobain/saintgobain2.jpeg",  span:"tall",   tag:"DOORS",     title:"French Glass Doors",       subtitle:"Elegant & Durable",       year:"2024", location:"Kochi",     alt:"Saint Gobain glass doors Kochi Kerala Precise Homes" },
  { id:"sg3",  src:"/images/saintgobain/saintgobain3.jpeg",  span:"tall",   tag:"WINDOWS",   title:"Clear View Windows",       subtitle:"Maximum Light",           year:"2023", location:"Thrissur",  alt:"Saint Gobain clear view windows Thrissur Kerala Precise Homes" },
  { id:"sg4",  src:"/images/saintgobain/saintgobain4.jpeg",  span:"tall",   tag:"FACADE",    title:"Structural Glazing",       subtitle:"Modern Exteriors",        year:"2024", location:"Ernakulam", alt:"Saint Gobain structural glass facade Ernakulam Kerala" },
  { id:"sg5",  src:"/images/saintgobain/saintgobain5.jpeg",  span:"tall",   tag:"SAFETY",    title:"Toughened Glass Grills",   subtitle:"Secure & Stylish",        year:"2024", location:"Kochi",     alt:"Saint Gobain toughened glass safety Kochi Kerala" },
  { id:"sg6",  src:"/images/saintgobain/saintgobain6.jpeg",  span:"wide",   tag:"SLIDING",   title:"Sliding Window Systems",   subtitle:"Space Saving",            year:"2023", location:"Thrissur",  alt:"Saint Gobain sliding window systems Thrissur Kerala" },
  { id:"sg7",  src:"/images/saintgobain/saintgobain7.jpeg",  span:"tall",   tag:"DOORS",     title:"Hinged Glass Doors",       subtitle:"Classic Aesthetics",      year:"2024", location:"Ernakulam", alt:"Saint Gobain hinged glass doors Ernakulam Kerala" },
  { id:"sg8",  src:"/images/saintgobain/saintgobain8.jpeg",  span:"wide",   tag:"PANORAMA",  title:"Panoramic View Windows",   subtitle:"Uninterrupted Scenery",   year:"2024", location:"Kochi",     alt:"Saint Gobain panoramic windows Kochi Kerala" },
  { id:"sg9",  src:"/images/saintgobain/saintgobain9.jpeg",  span:"tall",   tag:"VENTILATION",title:"Awning Windows",          subtitle:"Optimal Airflow",         year:"2023", location:"Thrissur",  alt:"Saint Gobain awning windows Thrissur Kerala" },
  { id:"sg10", src:"/images/saintgobain/saintgobain10.jpeg", span:"wide",   tag:"CUSTOM",    title:"Bespoke Glass Panels",     subtitle:"Tailored Dimensions",     year:"2024", location:"Ernakulam", alt:"Saint Gobain bespoke glass panels Ernakulam Kerala" },
  { id:"sg11", src:"/images/saintgobain/saintgobain11.jpeg", span:"tall",   tag:"PARTITION", title:"Interior Glass Partitions",subtitle:"Seamless Spaces",         year:"2024", location:"Kochi",     alt:"Saint Gobain interior partitions Kochi Kerala" },
  { id:"sg12", src:"/images/saintgobain/saintgobain12.jpeg", span:"wide",   tag:"SYSTEM",    title:"Multi-track UPVC",         subtitle:"Advanced Engineering",    year:"2023", location:"Thrissur",  alt:"Saint Gobain multi-track UPVC Thrissur Kerala" },
  { id:"sg13", src:"/images/saintgobain/saintgobain13.jpeg", span:"tall",   tag:"BALCONY",   title:"Balcony Glass Doors",      subtitle:"Indoor-Outdoor Flow",     year:"2024", location:"Ernakulam", alt:"Saint Gobain balcony doors Ernakulam Kerala" },
  { id:"sg14", src:"/images/saintgobain/saintgobain14.jpeg", span:"square", tag:"ENTRY",     title:"Main Entrance Glass",      subtitle:"Grand Welcomes",          year:"2024", location:"Kochi",     alt:"Saint Gobain entrance glass Kochi Kerala" },
  { id:"sg15", src:"/images/saintgobain/saintgobain15.jpeg", span:"tall",   tag:"RESIDENTIAL",title:"Villa Glass Integration", subtitle:"Complete Solutions",      year:"2023", location:"Thrissur",  alt:"Saint Gobain residential integration Thrissur Kerala" },
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
      "@id": "https://precisehomes.in/saint-gobain#webpage",
      url: "https://precisehomes.in/saint-gobain",
      name: "Saint-Gobain Glass & uPVC Windows in Kochi — Precise Homes",
      isPartOf: { "@id": LD_ID.website },
      about: { "@id": LD_ID.business },
      breadcrumb: { "@id": "https://precisehomes.in/saint-gobain#breadcrumb" },
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://precisehomes.in/saint-gobain#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://precisehomes.in/" },
        { "@type": "ListItem", position: 2, name: "Saint-Gobain Glass & uPVC Windows", item: "https://precisehomes.in/saint-gobain" },
      ],
    },
    {
      "@type": "ImageGallery",
      name: "Saint-Gobain Glass & uPVC Windows projects by Precise Homes, Kerala",
      description: "Completed Saint Gobain glass, uPVC windows and glazing projects across Ernakulam, Kochi, Thrissur and Kerala.",
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

function Perforations() {
  return (
    <div className="flex gap-[10px] px-2 bg-[#080d14] py-[6px] overflow-hidden w-full">
      {Array.from({ length: 80 }).map((_, i) => (
        <div key={i} className="shrink-0 w-5 h-[14px] rounded-[2px] bg-white/[0.06] border border-white/[0.08]" />
      ))}
    </div>
  );
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
      className={`relative group cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#02589F]/60 ${SPAN_CLASS[item.span]}`}
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
        className="absolute inset-0 bg-[#02589F]/20 mix-blend-multiply pointer-events-none" />

      {/* Scan-line */}
      <AnimatePresence>
        {hovered && (
          <motion.div key="scan"
            className="absolute left-0 right-0 h-[1.5px] bg-[#02589F]/80 shadow-[0_0_16px_rgba(2,88,159,0.9)] z-20 pointer-events-none"
            initial={{ top: "-2px" }} animate={{ top: "calc(100% + 2px)" }}
            transition={{ duration: 1.8, ease: "linear", repeat: Infinity, repeatDelay: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Tag */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <motion.div initial={{ width: 0 }} animate={inView ? { width: 12 } : {}}
          transition={{ duration: 0.8, delay: (index % 6) * 0.07 + 0.5 }}
          className="h-[1.5px] bg-[#02589F] origin-left" />
        <span className="text-[#60b4ff] font-bold text-[7px] uppercase tracking-[0.45em]">{item.tag}</span>
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
          <p className="text-white/40 text-[8px] uppercase tracking-[0.4em] font-bold mb-1">Saint Gobain</p>
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
              <div className="w-9 h-9 rounded-full bg-[#02589F] flex items-center justify-center shadow-[0_0_24px_rgba(2,88,159,0.5)]">
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
          className={`absolute w-4 h-4 border-[#02589F]/70 pointer-events-none ${cls}`} />
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
              className={`absolute ${pos} top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/20 hover:border-[#02589F]/50 transition-all group`}>
              <Icon className="w-5 h-5 text-white group-hover:text-[#60b4ff] transition-colors" />
            </button>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 items-center">
            {items.map((_, i) => (
              <div key={i} className={`h-[2px] rounded-full transition-all duration-500 ${i === idx ? "w-8 bg-[#02589F]" : "w-2 bg-white/20"}`} />
            ))}
          </div>
        </div>

        {/* Info panel */}
        <div className="w-full lg:w-[38%] bg-[#080d14] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
          <div className="flex-1 p-7 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-[2px] bg-[#02589F]" />
                <span className="text-[#60b4ff] font-bold tracking-[0.4em] uppercase text-[8px]">{item.tag}</span>
                <span className="ml-auto text-white/20 text-[8px] font-bold">
                  {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white leading-[1.1] tracking-tight mb-2">{item.title}</h2>
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-8">{item.subtitle}</p>
              <dl className="space-y-3 border-t border-white/10 pt-6">
                {[
                  { label: "Brand",    value: "Saint Gobain" },
                  { label: "Category", value: "Architectural Glass & UPVC" },
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
              <a href={waLink(`Hi Precise Homes! I'd like a project like "${item.title}" (Saint-Gobain Glass & uPVC Windows).`)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 w-full"
                aria-label="Start a similar Saint Gobain project">
                <span className="text-white/50 text-[9px] uppercase tracking-[0.3em] font-bold group-hover:text-white transition-colors">
                  Start a Similar Project
                </span>
                <div className="ml-auto w-9 h-9 rounded-full bg-[#02589F]/20 border border-[#02589F]/40 flex items-center justify-center group-hover:bg-[#02589F] transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#60b4ff] group-hover:text-white transition-colors" />
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
                className={`shrink-0 w-14 h-10 overflow-hidden transition-all duration-300 rounded-[1px] ${it.id === item.id ? "ring-[1.5px] ring-[#02589F] opacity-100" : "opacity-30 hover:opacity-60"}`}>
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
                  className="group relative bg-white/[0.03] border border-white/[0.07] p-6 lg:p-7 hover:border-[#02589F]/30 hover:bg-white/[0.06] transition-all duration-500">
                  <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#02589F] group-hover:w-full transition-all duration-700" />
                  <div className="w-10 h-10 rounded-full bg-[#02589F]/10 border border-[#02589F]/20 flex items-center justify-center mb-5 group-hover:bg-[#02589F]/20 transition-all duration-300">
                    <Icon className="w-4 h-4 text-[#60b4ff]" />
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base tracking-tight mb-2">{title}</h3>
                  <p className="text-white/35 text-[12px] leading-[1.75] font-medium">{desc}</p>
                </motion.div>
              );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SaintGobainPage() {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "film">("grid");
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
    { Icon: Shield,   title: "Toughened Safety", desc: "Stronger than standard glass, providing maximum safety and impact resistance for residential and commercial spaces." },
    { Icon: Droplets, title: "Acoustic Insulation", desc: "Advanced soundproofing capabilities, creating quiet, serene interiors even in noisy urban environments." },
    { Icon: Sun,      title: "Low-E Thermal",    desc: "Energy-efficient Low-E glass blocks harmful UV rays and regulates indoor temperature, reducing cooling costs." },
    { Icon: Layers,   title: "Crystal Clear",    desc: "Unmatched optical clarity and transparency, maximizing natural light and seamless visual connectivity." },
    { Icon: Cpu,      title: "Easy Maintenance", desc: "Smooth, non-porous surfaces that resist staining and water spots, ensuring long-lasting brilliance." },
    { Icon: Award,    title: "Authorized Dealer",desc: "Direct-certified dealership ensuring genuine Saint Gobain glass and UPVC solutions with full warranty." },
  ];

  return (
    <main
      ref={sectionRef}
      className={`relative bg-[#03070b] min-h-screen overflow-hidden selection:bg-[#02589F] selection:text-white ${jakarta.className}`}
      aria-label="Saint Gobain Glass Solutions – Precise Homes Kerala"
    >
      {/* SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-[900px] h-[900px] rounded-full bg-[#02589F]/5 blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#D72731]/5 blur-[130px] pointer-events-none" />
      {/* Grid texture */}
      <div className="fixed inset-0 opacity-[0.022] pointer-events-none"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />

      {/* ── TOP NAV ───────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 py-5 bg-[#03070b]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <Link href="/" className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#02589F]/50 group-hover:bg-[#02589F]/10 transition-all duration-300">
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.35em] hidden sm:block">Back to Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-5 h-[2px] bg-[#02589F]" />
          <span className="text-white font-bold text-[10px] uppercase tracking-[0.4em]">Saint Gobain</span>
          <span className="text-white/20 text-[10px]">×</span>
          <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium">Precise Homes</span>
        </div>

       <a href={waLink("Hi Precise Homes! I'd like a quote for Saint-Gobain Glass & uPVC Windows.")} target="_blank" rel="noopener noreferrer"
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
              <div className="w-10 h-[2px] bg-[#02589F]" />
              <span className="text-[#60b4ff] font-bold tracking-[0.45em] uppercase text-[9px]">
                Architectural Glass // UPVC Windows
              </span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            {/* Title */}
            <motion.div className="lg:col-span-7" style={{ y: parallaxY }}>
              <h1>
              {[
                { text: "SAINT",  color: "text-white",       delay: 0 },
                { text: "GOBAIN", color: "text-[#02589F]",   delay: 0.1 },
                { text: "GLASS",  color: "text-white",       delay: 0.2 },
              ].map(({ text, color, delay }) => (
                <span key={text} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "105%", rotateX: 10, filter: "blur(10px)" }}
                    animate={heroInView ? { y: "0%", rotateX: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.5, delay, ease: EASE }}
                    className={`${syneFont.className} block text-[17vw] sm:text-[12vw] lg:text-[9vw] xl:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase ${color}`}>
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
                  Architectural Glass Solutions — Kerala
                </motion.p>
              </div>
            </motion.div>

            {/* Stats + description */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
                className="grid grid-cols-3 gap-3">
                {[
                  { val: 15,  sfx: "+", label: "Projects Shown" },
                  { val: 100, sfx: "%", label: "Optical Clarity" },
                  { val: 10,  sfx: "Y", label: "Warranty" },
                ].map(({ val, sfx, label }) => (
                  <div key={label}>
                    <p className={`${syneFont.className} text-3xl md:text-4xl font-bold text-white tracking-tighter`}>
                      <Counter value={val} suffix={sfx} />
                    </p>
                    <p className="text-white/25 text-[8px] uppercase tracking-[0.35em] font-semibold mt-1">{label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.52, ease: EASE }}
                className="text-white/45 text-sm md:text-[15px] leading-[1.85] font-medium">
                As Ernakulam&apos;s authorized <strong className="text-white/60 font-semibold">Saint-Gobain glass dealer</strong>, Precise Homes delivers
                unmatched optical clarity, acoustic insulation, and thermal efficiency for residential and commercial projects across Kerala.
                Experience world-class architectural glass and UPVC systems.
              </motion.p>
            </div>
          </div>

          {/* Hero image strip */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
            className="relative mt-12 h-[220px] md:h-[320px] lg:h-[420px] overflow-hidden rounded-none">
            <img src="/images/saintgobain/saintgobain1.jpeg"
              alt="Saint Gobain Glass Solutions showcase Kerala Precise Homes"
              className="w-full h-full object-cover object-center"
              loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#03070b] via-transparent to-[#03070b]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-transparent to-transparent" />

            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex items-center gap-4 bg-[#080d14]/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#02589F] animate-pulse" />
              <span className="text-white/60 text-[9px] font-bold uppercase tracking-[0.35em]">Authorized Saint Gobain Dealer · Kerala</span>
            </div>
          </motion.div>
        </header>

        {/* ── FEATURES ─────────────────────────────────────────────────── */}
        <section className="mb-24 lg:mb-32" aria-label="Saint Gobain product features">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-8 h-[2px] bg-[#02589F]" />
            <span className="text-[#60b4ff] font-bold tracking-[0.45em] uppercase text-[9px]">Why Saint Gobain</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <FeatureCard key={title} Icon={Icon} title={title} desc={desc} i={i} />
            ))}
          </div>
        </section>

        {/* ── GALLERY ──────────────────────────────────────────────────── */}
        <section className="mb-24 lg:mb-32" aria-label="Saint Gobain project gallery Kerala">
          {/* Controls header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-5 mb-3">
                <div className="w-8 h-[2px] bg-[#02589F]" />
                <span className="text-[#60b4ff] font-bold tracking-[0.45em] uppercase text-[9px]">Project Portfolio</span>
              </div>
              <h2 className={`${syneFont.className} text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tighter`}>
                Glass & UPVC<br />
                <span className="text-[#02589F]">Installations.</span>
              </h2>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1" role="group" aria-label="View mode">
              {([
                { mode: "grid" as const, Icon: LayoutGrid, label: "Grid view" },
                { mode: "film" as const, Icon: Film,       label: "Film view" },
              ]).map(({ mode, Icon, label }) => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  aria-pressed={viewMode === mode} aria-label={label}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${viewMode === mode ? "bg-[#02589F] shadow-[0_0_12px_rgba(2,88,159,0.4)]" : "hover:bg-white/10"}`}>
                  <Icon className={`w-3.5 h-3.5 ${viewMode === mode ? "text-white" : "text-white/40"}`} />
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div key="grid"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
                style={{ gridAutoRows: "280px", gridAutoFlow: "dense" }}
                role="list" aria-label="Saint Gobain glass cladding gallery">
                {GALLERY.map((item, idx) => (
                  <GalleryCard key={item.id} item={item} index={idx} onOpen={openLightbox} />
                ))}
              </motion.div>
            ) : (
              <motion.div key="film"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative overflow-hidden rounded-none border-y border-white/10">
                <Perforations />
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#03070b] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#03070b] to-transparent z-10 pointer-events-none" />
                <div className="flex gap-3 overflow-x-auto py-3 px-6 cursor-grab" style={{ scrollbarWidth: "none" }}>
                  {GALLERY.map((item, idx) => (
                    <motion.div key={item.id}
                      initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: idx * 0.025, ease: EASE }}
                      className="relative shrink-0 h-[320px] w-[220px] overflow-hidden group cursor-pointer"
                      onClick={() => openLightbox(item)} role="button" aria-label={`View ${item.title}`}>
                      <img src={item.src} alt={item.alt} loading="lazy" decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#03070b]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-[#60b4ff] text-[7px] font-bold uppercase tracking-[0.4em]">{item.tag}</p>
                        <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
                      </div>
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center">
                        <span className="text-white/40 text-[8px] font-bold">{String(idx + 1).padStart(2, "0")}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Perforations />
                <p className="text-center text-white/20 text-[9px] uppercase tracking-[0.4em] font-bold py-2">← Drag to Explore →</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── SEO text ─────────────────────────────────────────────────── */}
        <div className="mb-24 pt-8 border-t border-white/5">
          <p className="text-white/15 text-[10px] leading-[1.9] max-w-4xl font-medium">
            Precise Homes is an authorized dealer for <em>Saint-Gobain architectural glass and UPVC window systems</em> in Ernakulam, Kochi,
            Thrissur, and across Kerala. Our installations include UPVC windows, structural glazing, toughened glass partitions, shower enclosures,
            and custom mirrors. Saint-Gobain glass delivers acoustic insulation, Low-E thermal efficiency, and high-impact safety for both residential and
            commercial spaces. Contact us at Civil Line Road, Padivattom, Kochi — Kerala 682024 for Saint Gobain supply and installation enquiries.
          </p>
        </div>
      </div>

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
                Ernakulam&apos;s authorized dealer for Saint-Gobain glass solutions, Fundermax HPL exterior cladding,
                and LG Hausys interior panels. Premium supply & installation across Kerala.
              </p>
              <div className="flex items-center gap-3">
                {([["Facebook", SITE.social.facebook], ["Instagram", SITE.social.instagram], ["YouTube", SITE.social.youtube]] as const).map(([s, href]) => (
                  <a key={s} href={href} target="_blank" rel="noopener noreferrer" aria-label={s} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#02589F]/40 hover:bg-[#02589F]/10 transition-all cursor-pointer">
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
                  <MapPin className="w-3.5 h-3.5 text-[#02589F] shrink-0 mt-0.5" />
                  <span className="text-white/45 text-[11px] leading-[1.7] font-medium group-hover:text-white/70 transition-colors">
                    Building No: 42/3405,<br />Civil Line Road, Padivattom,<br />Kochi, Ernakulam — 682024
                  </span>
                </a>
                <a href="tel:+919895105012" className="flex items-center gap-3 group">
                  <Phone className="w-3.5 h-3.5 text-[#02589F] shrink-0" />
                  <span className="text-white/45 text-[11px] font-medium group-hover:text-white/70 transition-colors">+91 98951 05012</span>
                </a>
                <a href="mailto:precisehomeauto@gmail.com" className="flex items-center gap-3 group">
                  <Mail className="w-3.5 h-3.5 text-[#02589F] shrink-0" />
                  <span className="text-white/45 text-[11px] font-medium group-hover:text-white/70 transition-colors">precisehomeauto@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <p className="text-white/25 text-[8px] uppercase tracking-[0.4em] font-bold mb-5">Our Brands</p>
              <div className="space-y-3">
                {[
                  { label: "Saint-Gobain Glass",     href: "/saint-gobain" },
                  { label: "Fundermax HPL Cladding", href: "/fundermax" },
                  { label: "LG Hausys Panels",        href: "/lg-hausys" },
                  { label: "All Products",            href: "/products" },
                ].map(({ label, href }) => (
                  <Link key={label} href={href}
                    className="flex items-center gap-3 group text-white/35 hover:text-white transition-colors">
                    <div className="w-3 h-[1px] bg-[#02589F]/40 group-hover:w-5 group-hover:bg-[#02589F] transition-all duration-300" />
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
              Authorized Saint Gobain Dealer · Ernakulam, Kerala
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