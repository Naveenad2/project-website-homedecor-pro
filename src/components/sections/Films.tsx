"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Film as FilmIcon } from "lucide-react";
import FilmCard from "@/components/media/FilmCard";
import { useFilmViewer } from "@/components/media/FilmViewer";
import { type Film, PROJECTS, type ProjectKey } from "@/data/films";
import { syne } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Films({ films, productNames }: { films: Film[]; productNames: Record<string, string> }) {
  const viewer = useFilmViewer();
  const railRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<ProjectKey | "all">("all");
  const [edges, setEdges] = useState({ start: true, end: false });

  const list = useMemo(() => (project === "all" ? films : films.filter((f) => f.project === project)), [films, project]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: films.length };
    films.forEach((f) => (c[f.project] = (c[f.project] ?? 0) + 1));
    return c;
  }, [films]);
  const locations = new Set(films.map((f) => f.location)).size;

  // Track scroll position for arrow state + edge fades.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () =>
      setEdges({ start: rail.scrollLeft < 8, end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8 });
    update();
    rail.scrollTo({ left: 0 });
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [list]);

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * Math.max(rail.clientWidth * 0.8, 280), behavior: "smooth" });
  };

  return (
    <section id="films" aria-labelledby="films-title" className={`relative w-full overflow-hidden bg-[#03070b] py-20 md:py-28 ${syne.className}`}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 right-[10%] w-[640px] h-[640px] rounded-full bg-[#D72731]/[0.06] blur-[160px]" />
        <div className="absolute bottom-0 left-[5%] w-[560px] h-[560px] rounded-full bg-[#02589F]/[0.08] blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-[1920px] px-5 md:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} className="flex items-center gap-4">
              <span className="h-[2px] w-8 bg-[#D72731]" />
              <span className="text-[#ff6b72] text-[10px] font-bold uppercase tracking-[0.35em]">Project Films // Real Homes</span>
            </motion.div>
            <h2 id="films-title" className="mt-6 text-[clamp(2.2rem,5.4vw,4.4rem)] font-extrabold leading-[0.95] tracking-tighter text-white">
              Real homes.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3d8fd6] to-[#9ad0ff]">Real stories.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-white/55 text-[14px] md:text-[15px] leading-relaxed font-medium">
              Walk through Saint-Gobain uPVC windows, glass handrails, shower cubicles and Fundermax cladding we&apos;ve installed in Kaloor, Kollam, Fort Kochi and Edappally — and hear homeowners and architects in their own words.
            </p>
            <div className="mt-5 flex items-center gap-6 text-white">
              <div>
                <p className="text-2xl font-bold">{films.length}</p>
                <p className="text-white/35 text-[9px] font-bold uppercase tracking-[0.28em]">Films</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{locations}</p>
                <p className="text-white/35 text-[9px] font-bold uppercase tracking-[0.28em]">Locations</p>
              </div>
              <Link href="/films" className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/70 hover:text-white hover:border-white/35 transition-colors">
                <FilmIcon className="w-3.5 h-3.5" /> All films <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Filters + rail arrows */}
        <div className="mt-10 flex items-center gap-4">
        <div className="min-w-0 flex-1 -mx-5 px-5 md:mx-0 md:px-0 flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Filter films by project">
          {PROJECTS.filter((p) => counts[p.key]).map((p) => {
            const active = project === p.key;
            return (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setProject(p.key)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-[10.5px] font-bold uppercase tracking-[0.16em] transition-colors ${active ? "text-white" : "text-white/50 hover:text-white/80 border border-white/10"}`}
              >
                {active && <motion.span layoutId="film-filter" className="absolute inset-0 rounded-full bg-[#D72731] shadow-[0_0_24px_rgba(215,39,49,0.35)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative">
                  {p.label} <span className={active ? "text-white/70" : "text-white/30"}>{counts[p.key]}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="hidden md:flex shrink-0 gap-2">
          <button type="button" onClick={() => scrollBy(-1)} disabled={edges.start} aria-label="Scroll films left" className="w-11 h-11 rounded-full border border-white/15 bg-white/[0.05] flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/15 transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" onClick={() => scrollBy(1)} disabled={edges.end} aria-label="Scroll films right" className="w-11 h-11 rounded-full border border-white/15 bg-white/[0.05] flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/15 transition">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        </div>
      </div>

      {/* Rail */}
      <div className="relative mt-8">
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-24 bg-gradient-to-r from-[#03070b] to-transparent transition-opacity ${edges.start ? "opacity-0" : "opacity-100"}`}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-24 bg-gradient-to-l from-[#03070b] to-transparent transition-opacity ${edges.end ? "opacity-0" : "opacity-100"}`}
          aria-hidden="true"
        />
        <div
          ref={railRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-px-5 md:scroll-px-10 lg:scroll-px-16 xl:scroll-px-20 px-5 md:px-10 lg:px-16 xl:px-20 pb-4"
          role="list"
          aria-label="Project films"
        >
          {list.map((film, i) => (
            <div key={film.slug} role="listitem" className="snap-start shrink-0 w-[64vw] sm:w-[38vw] md:w-[30vw] lg:w-[21vw] xl:w-[17vw] 2xl:w-[300px] max-w-[320px]">
              <FilmCard film={film} productNames={productNames} eager={i < 2} onOpen={() => viewer.open(list, i)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
