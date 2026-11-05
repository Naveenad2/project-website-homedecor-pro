"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, Download, ExternalLink, X } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { type Catalogue, catalogueAssets } from "@/data/catalogues";
import { formatBytes, waLink } from "@/lib/site";
import { useBackButtonClose, useScrollLock } from "@/lib/client-utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function CatalogueCard({ c, onPreview }: { c: Catalogue; onPreview: () => void }) {
  const a = catalogueAssets(c);
  const landscape = c.aspect > 1.05;
  return (
    <article className="group flex flex-col" style={{ "--accent": c.accent } as CSSProperties}>
      <button
        type="button"
        onClick={onPreview}
        aria-label={`Preview ${c.title}`}
        className="relative block aspect-[4/5] w-full rounded-[22px] bg-gradient-to-br from-white/[0.06] to-white/[0.02] ring-1 ring-white/10 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <span className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-60" style={{ background: "radial-gradient(circle at 50% 110%, var(--accent), transparent 65%)" }} />
        <span className="absolute inset-0 flex items-center justify-center p-6 sm:p-7 [perspective:1100px]">
          <span
            className={`relative block shadow-[0_24px_50px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotateY(-16deg)_rotateX(4deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_translateY(-6px)] ${landscape ? "w-full" : "h-full"}`}
            style={{ aspectRatio: String(c.aspect) }}
          >
            <img src={a.cover} alt={`${c.title} — cover`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover rounded-[3px]" />
            {/* spine + page-edge shading */}
            <span className="absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-black/45 via-black/10 to-transparent rounded-l-[3px]" />
            <span className="absolute inset-y-[2px] -right-[5px] w-[5px] rounded-r-[2px] bg-[repeating-linear-gradient(90deg,#f3f3f3_0,#f3f3f3_1px,#cfcfcf_1px,#cfcfcf_2px)] opacity-90" />
          </span>
        </span>
        <span className="absolute left-4 top-4 rounded-full bg-black/50 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white">{c.kind}</span>
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#03070b] opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100">
          <BookOpen className="w-3.5 h-3.5" /> Preview
        </span>
      </button>

      <div className="mt-4 px-1 flex-1 flex flex-col">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
          {c.brand}
        </p>
        <h3 className="mt-1 text-white text-[15px] font-bold leading-snug">{c.title}</h3>
        <p className="mt-1.5 text-white/45 text-[12px] leading-relaxed line-clamp-2">{c.description}</p>
        <p className="mt-2 text-white/30 text-[10.5px] font-semibold">
          {c.pages} pages · PDF {formatBytes(c.bytes)}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={onPreview}
            aria-label={`Preview ${c.title}`}
            className="flex-1 min-w-0 h-10 inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white hover:bg-white/15 transition-colors"
          >
            <BookOpen className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Preview</span>
          </button>
          <a
            href={a.pdf}
            download
            aria-label={`Download ${c.title} PDF (${formatBytes(c.bytes)})`}
            className="w-10 h-10 shrink-0 rounded-full border border-white/15 bg-white/[0.06] flex items-center justify-center text-white hover:bg-white/15 transition-colors"
          >
            <Download className="w-4 h-4" />
          </a>
          <a
            href={waLink(`Hi Precise Homes! Please send me the "${c.title}" brochure and more details.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get ${c.title} on WhatsApp`}
            className="w-10 h-10 shrink-0 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:bg-[#1ebe5b] transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

function CatalogueViewer({ c, onClose }: { c: Catalogue; onClose: () => void }) {
  const a = catalogueAssets(c);
  const trackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(0);
  const total = c.previewPages;

  useScrollLock(true);
  const requestClose = useBackButtonClose(true, onClose);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => prev?.focus?.({ preventScroll: true });
  }, []);

  const goTo = useCallback((i: number) => {
    const t = trackRef.current;
    if (!t) return;
    const n = Math.max(0, Math.min(total, i));
    t.scrollTo({ left: n * t.clientWidth, behavior: "smooth" });
  }, [total]);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const onScroll = () => setPage(Math.round(t.scrollLeft / Math.max(1, t.clientWidth)));
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => t.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
      if (e.key === "ArrowRight") goTo(page + 1);
      if (e.key === "ArrowLeft") goTo(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, page, requestClose]);

  const slides = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${c.title} preview`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[300] flex flex-col bg-[#03070b]/97 backdrop-blur-xl overscroll-contain"
    >
      <div className="flex items-center justify-between gap-4 px-4 sm:px-8 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: c.accent }}>
            {c.brand} · {c.kind}
          </p>
          <p className="text-white text-[15px] sm:text-lg font-bold truncate">{c.title}</p>
        </div>
        <button ref={closeRef} type="button" onClick={requestClose} aria-label="Close preview" className="w-11 h-11 shrink-0 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative flex-1 min-h-0">
        <div ref={trackRef} className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar" style={{ scrollBehavior: "smooth" }}>
          {slides.map((n) => (
            <div key={n} className="snap-center shrink-0 w-full h-full flex items-center justify-center px-4 sm:px-16 py-2">
              <img
                src={a.page(n)}
                alt={`${c.title} — page ${n}`}
                loading={n <= 2 ? "eager" : "lazy"}
                decoding="async"
                className="max-h-full max-w-full object-contain rounded-md shadow-[0_30px_80px_rgba(0,0,0,0.6)] bg-white"
              />
            </div>
          ))}
          {/* Final slide: get the full document */}
          <div className="snap-center shrink-0 w-full h-full flex items-center justify-center px-6">
            <div className="max-w-sm text-center">
              <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.25em]">That&apos;s the preview</p>
              <p className="mt-3 text-white text-2xl font-bold">Read all {c.pages} pages</p>
              <p className="mt-2 text-white/50 text-sm">Open the complete PDF, or ask us to send it — with a free consultation — on WhatsApp.</p>
              <div className="mt-6 flex flex-col gap-3">
                <a href={a.pdf} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-[#03070b]">
                  <ExternalLink className="w-4 h-4" /> Open full PDF · {formatBytes(c.bytes)}
                </a>
                <a href={waLink(`Hi Precise Homes! Please send me the "${c.title}" brochure.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white">
                  <WhatsAppIcon className="w-4 h-4" /> Get it on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <button type="button" onClick={() => goTo(page - 1)} disabled={page === 0} aria-label="Previous page" className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/15 items-center justify-center text-white disabled:opacity-25 hover:bg-white/20">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button type="button" onClick={() => goTo(page + 1)} disabled={page >= total} aria-label="Next page" className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/15 items-center justify-center text-white disabled:opacity-25 hover:bg-white/20">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 sm:px-8 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <p className="text-white/50 text-[12px] font-semibold tabular-nums">
          {page < total ? `Page ${page + 1} of ${c.pages}` : "Full document"}
        </p>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {[...slides, total + 1].map((n, i) => (
            <span key={n} className={`h-1.5 rounded-full transition-all duration-300 ${i === page ? "w-6 bg-white" : "w-1.5 bg-white/25"}`} />
          ))}
        </div>
        <a href={a.pdf} download className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10">
          <Download className="w-4 h-4" /> <span className="hidden sm:inline">Download</span> PDF
        </a>
      </div>
    </motion.div>
  );
}

export default function CatalogueLibrary({ catalogues }: { catalogues: Catalogue[] }) {
  const [active, setActive] = useState<Catalogue | null>(null);
  const close = useCallback(() => setActive(null), []);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6">
        {catalogues.map((c, i) => (
          <motion.div key={c.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.7, delay: (i % 5) * 0.06, ease: EASE }}>
            <CatalogueCard c={c} onPreview={() => setActive(c)} />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>{active && <CatalogueViewer key={active.slug} c={active} onClose={close} />}</AnimatePresence>
    </>
  );
}
