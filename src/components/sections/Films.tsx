"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import FilmCard from "@/components/media/FilmCard";
import { useFilmViewer } from "@/components/media/FilmViewer";
import { type Film, PROJECTS, type ProjectKey } from "@/data/films";
import { syne } from "@/lib/fonts";


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
    <section id="films" aria-labelledby="films-title" className={`relative w-full overflow-hidden bg-[#03070b] py-20 md:py-24 ${syne.className}`}>
      <div className="relative mx-auto max-w-[1920px] px-5 md:px-10 lg:px-16 xl:px-20">
        <SectionIntro id="films-title" kicker="Project Films // Kerala" title="Real homes," accent="real stories.">
          <p>Homeowners, architects and our team — filmed at projects in Kaloor, Kollam, Fort Kochi and Edappally.</p>
          <Link href="/films" className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/60 hover:text-white transition-colors">
            All {films.length} films <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </SectionIntro>

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
