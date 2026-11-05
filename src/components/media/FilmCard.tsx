"use client";

import { useEffect, useRef, type RefObject } from "react";
import { MapPin, Play } from "lucide-react";
import { type Film, filmMedia } from "@/data/films";
import { formatDuration } from "@/lib/site";
import { prefersLowMotionOrData } from "@/lib/client-utils";

/**
 * Autoplays a muted preview loop only while the element is on screen.
 * The source is attached lazily (nothing downloads until the card is visible),
 * and the video fades in only once frames are actually playing.
 */
export function useInViewPreview(ref: RefObject<HTMLVideoElement | null>, src: string | undefined, threshold = 0.5) {
  useEffect(() => {
    const v = ref.current;
    if (!v || !src || prefersLowMotionOrData()) return;
    let attached = false;
    const onPlaying = () => {
      v.dataset.playing = "true";
    };
    v.addEventListener("playing", onPlaying);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!attached) {
            v.muted = true;
            v.src = src;
            attached = true;
          }
          v.play().catch(() => undefined);
        } else {
          v.pause();
        }
      },
      { threshold },
    );
    io.observe(v);
    return () => {
      io.disconnect();
      v.removeEventListener("playing", onPlaying);
      v.pause();
    };
  }, [ref, src, threshold]);
}

export default function FilmCard({
  film,
  onOpen,
  productNames,
  eager = false,
}: {
  film: Film;
  onOpen: () => void;
  productNames?: Record<string, string>;
  eager?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const m = filmMedia(film.slug);
  useInViewPreview(videoRef, m.preview, 0.3);
  const chips = (productNames ? film.products.map((p) => productNames[p]).filter(Boolean) : []).slice(0, 2);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Play film: ${film.title}, ${film.location}, ${formatDuration(film.duration)}`}
      className="group relative block w-full aspect-[9/16] overflow-hidden rounded-[22px] bg-[#0b1118] ring-1 ring-white/10 text-left transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D72731]"
    >
      <img
        src={m.poster}
        alt={`${film.title} — ${film.location}`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        width={720}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-[opacity,transform] duration-700 data-[playing=true]:opacity-100 group-hover:scale-[1.06]"
      />

      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03070b] via-[#03070b]/25 to-[#03070b]/10" />

      <span className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
        <span className="rounded-full bg-black/45 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
          {film.kind}
        </span>
        <span className="rounded-full bg-black/45 backdrop-blur-md border border-white/15 px-2 py-1 text-[10px] font-bold tabular-nums text-white/90">
          {formatDuration(film.duration)}
        </span>
      </span>

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white scale-90 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100">
          <Play className="w-6 h-6 translate-x-0.5" fill="currentColor" />
        </span>
      </span>

      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff8a8f]">
          <MapPin className="w-3 h-3" /> {film.location}
        </span>
        <span className="mt-1.5 block text-white text-[15px] sm:text-base font-bold leading-snug">{film.title}</span>
        {chips.length > 0 && (
          <span className="mt-2.5 flex flex-wrap gap-1.5">
            {chips.map((c) => (
              <span key={c} className="rounded-full bg-white/10 border border-white/15 px-2 py-0.5 text-[9.5px] font-semibold text-white/80">
                {c}
              </span>
            ))}
          </span>
        )}
      </span>
    </button>
  );
}
