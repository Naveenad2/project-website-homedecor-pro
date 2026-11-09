"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { useInViewPreview } from "@/components/media/FilmCard";
import type { ProductCardData } from "@/data/products";
import { waLink } from "@/lib/site";

/** One product: photo (or silent preview loop), brand, name, one line, and two actions. */
function ProductTile({ p, className = "" }: { p: ProductCardData; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useInViewPreview(videoRef, p.preview, 0.45);

  return (
    <article className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-[#0b1118] ring-1 ring-white/10 hover:ring-white/25 transition-[box-shadow] duration-500 ${className}`}>
      <img
        src={p.image}
        alt={`${p.name} — supplied and installed by Precise Homes, Kochi`}
        loading="lazy"
        decoding="async"
        width={960}
        height={1200}
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
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
      <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#03070b] via-[#03070b]/50 to-transparent" />
      <span className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-20 bg-gradient-to-b from-black/55 to-transparent" />

      <span className="pointer-events-none absolute top-4 left-4 text-[9px] font-bold uppercase tracking-[0.3em] text-white/80">{p.brand}</span>

      {/* In normal flow so the title link's ::after can cover the whole tile */}
      <div className="p-5">
        <h3 className="text-white text-[18px] md:text-[19px] font-bold leading-tight tracking-tight">
          <Link href={`/products/${p.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {p.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-white/60 text-[12.5px] leading-relaxed line-clamp-2">{p.tagline}</p>
        <div className="relative z-10 mt-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/50 group-hover:text-white transition-colors">
            Details <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-45" />
          </span>
          <a
            href={waLink(`Hi Precise Homes! I'm interested in ${p.name}. Please share details and a quote.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${p.name} on WhatsApp`}
            className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:bg-[#1ebe5b] transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

/** Responsive grid of product tiles — /products and product pages. */
export function ProductGrid({ products }: { products: ProductCardData[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[320px] gap-3 md:gap-4">
      {products.map((p) => (
        <ProductTile key={p.slug} p={p} />
      ))}
    </div>
  );
}

/** Homepage selection: swipeable row on phones, grid from tablet up. */
export function ProductRail({ products }: { products: ProductCardData[] }) {
  return (
    <div className="-mx-5 px-5 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-px-5 no-scrollbar" role="list">
      {products.map((p) => (
        <div key={p.slug} role="listitem" className="snap-start shrink-0 w-[76vw] sm:w-auto h-[360px] sm:h-[340px] flex">
          <ProductTile p={p} className="w-full" />
        </div>
      ))}
    </div>
  );
}
