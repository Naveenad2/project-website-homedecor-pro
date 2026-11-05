"use client";

import { useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { useInViewPreview } from "@/components/media/FilmCard";
import { CATEGORIES, type ProductCategory } from "@/data/product-categories";
import type { ProductCardData } from "@/data/products";
import { waLink } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const MOBILE_LIMIT = 6;

function ProductTile({ p, big, collapsed }: { p: ProductCardData; big: boolean; collapsed: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useInViewPreview(videoRef, p.preview, 0.45);
  const href = `/products/${p.slug}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.55, ease: EASE }}
      style={{ "--accent": p.accent } as CSSProperties}
      className={`group relative isolate flex-col justify-end overflow-hidden rounded-[26px] bg-[#0b1118] ring-1 ring-white/10 hover:ring-white/25 transition-[box-shadow] duration-500 hover:shadow-[0_28px_70px_-20px_var(--accent)] ${big ? "sm:col-span-2 row-span-2" : ""} ${collapsed ? "hidden sm:flex" : "flex"}`}
    >
      {/* Background layers (negative z so the in-flow body paints above them) */}
      <img
        src={p.image}
        alt={`${p.name} — supplied and installed by Precise Homes, Kochi`}
        loading="lazy"
        decoding="async"
        width={960}
        height={1200}
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
      />
      {p.preview && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-0 transition-opacity duration-700 data-[playing=true]:opacity-100"
        />
      )}
      <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#03070b] via-[#03070b]/55 to-[#03070b]/5" />
      <span
        className="pointer-events-none absolute -bottom-24 -left-16 -z-10 h-64 w-64 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-80"
        style={{ background: "var(--accent)" }}
      />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" style={{ background: "var(--accent)" }} />

      {/* Top chips */}
      <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
        <span className="rounded-full bg-black/45 backdrop-blur-md border border-white/15 px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.18em] text-white">{p.brand}</span>
        {big && <span className="rounded-full px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.18em] text-white" style={{ background: "var(--accent)" }}>Popular</span>}
      </div>

      {/* Body — in normal flow, so the title link's ::after can stretch over the whole tile */}
      <div className="p-5 md:p-6">
        <h3 className={`font-bold leading-[1.1] tracking-tight text-white ${big ? "text-[26px] md:text-[34px]" : "text-[19px] md:text-[21px]"}`}>
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {p.name}
          </Link>
        </h3>
        <p className={`mt-2 text-white/70 leading-relaxed ${big ? "text-[14px] max-w-md" : "text-[12.5px] line-clamp-2"}`}>{big ? p.summary : p.tagline}</p>
        {big && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.highlights.map((h) => (
              <li key={h} className="rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-sm px-3 py-1 text-[10.5px] font-semibold text-white/85">
                {h}
              </li>
            ))}
          </ul>
        )}
        <div className="relative z-10 mt-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/60 group-hover:text-white transition-colors">
            View details <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-45" />
          </span>
          <a
            href={waLink(`Hi Precise Homes! I'm interested in ${p.name}. Please share details and a quote.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${p.name} on WhatsApp`}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_6px_20px_rgba(37,211,102,0.35)] hover:bg-[#1ebe5b] transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span className={big ? "" : "hidden xl:inline"}>Enquire</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/** Plain responsive grid of product tiles (no filters) — used on /products and product pages. */
export function ProductGrid({ products }: { products: ProductCardData[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] gap-3 md:gap-4">
      {products.map((p) => (
        <ProductTile key={p.slug} p={p} big={false} collapsed={false} />
      ))}
    </div>
  );
}

export default function ProductShowcase({ products }: { products: ProductCardData[] }) {
  const [cat, setCat] = useState<ProductCategory | "all">("all");
  const [expanded, setExpanded] = useState(false);
  const isAll = cat === "all";
  const filtered = useMemo(() => (isAll ? products : products.filter((p) => p.category === cat)), [cat, isAll, products]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: products.length };
    products.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, [products]);

  return (
    <div>
      <div className="-mx-5 px-5 md:mx-0 md:px-0 flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Filter products by category">
        {CATEGORIES.filter((c) => counts[c.key]).map((c) => {
          const active = cat === c.key;
          return (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setCat(c.key);
                setExpanded(false);
              }}
              className={`relative shrink-0 rounded-full px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.16em] transition-colors ${active ? "text-[#03070b]" : "text-white/55 hover:text-white border border-white/10"}`}
            >
              {active && <motion.span layoutId="product-filter" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative">
                {c.label} <span className={active ? "text-[#03070b]/50" : "text-white/30"}>{counts[c.key]}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] grid-flow-dense gap-3 md:gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProductTile key={p.slug} p={p} big={isAll && !!p.featured} collapsed={!expanded && i >= MOBILE_LIMIT} />
          ))}
        </AnimatePresence>
      </motion.div>

      {!expanded && filtered.length > MOBILE_LIMIT && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="sm:hidden mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
        >
          Show all {filtered.length} products <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
