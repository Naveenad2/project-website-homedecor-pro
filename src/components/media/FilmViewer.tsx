"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Full-screen, Reels-style film viewer.
// • One <video> element is reused for every film, so once the visitor has tapped
//   to open it, sound keeps working on iOS as they swipe between films.
// • Swipe up/down (or left/right) on mobile · arrows / ↑ ↓ ← → / J K on desktop.
// • Space = play/pause · M = mute · Esc or phone Back button = close.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp, ExternalLink, Loader2, MapPin, Play, RotateCcw, Share2, Volume2, VolumeX, X } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { type Film, filmMedia } from "@/data/films";
import { absoluteUrl, formatDuration, waLink } from "@/lib/site";
import { mediaBus, useBackButtonClose, useScrollLock } from "@/lib/client-utils";
import { jakarta } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

type ViewerState = { list: Film[]; index: number };
type ViewerApi = { open: (list: Film[], index: number) => void };

const ViewerContext = createContext<ViewerApi | null>(null);

export function useFilmViewer(): ViewerApi {
  const ctx = useContext(ViewerContext);
  if (!ctx) throw new Error("useFilmViewer must be used inside <FilmViewerProvider>");
  return ctx;
}

export function FilmViewerProvider({ children, productNames }: { children: ReactNode; productNames: Record<string, string> }) {
  const [state, setState] = useState<ViewerState | null>(null);
  const pathname = usePathname();
  const open = useCallback((list: Film[], index: number) => {
    if (list.length) setState({ list, index: Math.min(Math.max(index, 0), list.length - 1) });
  }, []);
  const close = useCallback(() => setState(null), []);
  const api = useMemo(() => ({ open }), [open]);

  // Close the viewer when the route changes (e.g. a product link inside it was followed).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (state) setState(null);
  }

  return (
    <ViewerContext.Provider value={api}>
      {children}
      <AnimatePresence>
        {state && <FilmViewer key="film-viewer" list={state.list} startIndex={state.index} onClose={close} productNames={productNames} />}
      </AnimatePresence>
    </ViewerContext.Provider>
  );
}

function FilmViewer({
  list,
  startIndex,
  onClose,
  productNames,
}: {
  list: Film[];
  startIndex: number;
  onClose: () => void;
  productNames: Record<string, string>;
}) {
  const [index, setIndex] = useState(startIndex);
  const [dir, setDir] = useState(0);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const swipedRef = useRef(false);

  const film = list[index];
  const media = filmMedia(film.slug);
  const multiple = list.length > 1;

  useScrollLock(true);
  const requestClose = useBackButtonClose(true, onClose);

  // Take the stage: the hero (and anything else audible) pauses while the viewer is open.
  useEffect(() => {
    mediaBus.announce("viewer");
    return () => mediaBus.announce(null);
  }, []);

  // Focus management — focus the close button, restore focus on exit.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => previous?.focus?.({ preventScroll: true });
  }, []);

  const go = useCallback(
    (delta: number) => {
      if (!multiple) return;
      setDir(delta);
      setIndex((i) => (i + delta + list.length) % list.length);
    },
    [list.length, multiple],
  );

  // Load & play whenever the film changes (same element → iOS keeps audio unlocked).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(false);
    setFailed(false);
    setPaused(false);
    v.src = filmMedia(film.slug).src;
    v.currentTime = 0;
    v.play().catch(() => {
      // Autoplay with sound refused (rare after a tap) → retry muted, show the sound button state.
      v.muted = true;
      setMuted(true);
      v.play().catch(() => setPaused(true));
    });
    // Warm the next poster so the swipe transition is instant.
    if (list.length > 1) {
      const next = list[(index + 1) % list.length];
      const img = new Image();
      img.src = filmMedia(next.slug).start;
    }
  }, [film.slug, index, list]);

  // Progress bar driven by rAF (no React re-render per frame).
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && barRef.current && v.duration) barRef.current.style.transform = `scaleX(${Math.min(1, v.currentTime / v.duration)})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Stop the media element when the viewer unmounts (frees the network connection).
  useEffect(() => {
    const v = videoRef.current;
    return () => {
      if (!v) return;
      v.pause();
      v.removeAttribute("src");
      v.load();
    };
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => undefined);
    else v.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) v.play().catch(() => undefined);
  }, []);

  const retry = () => {
    const v = videoRef.current;
    if (!v) return;
    setFailed(false);
    v.load();
    v.play().catch(() => undefined);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
      else if (["ArrowDown", "ArrowRight", "j", "J"].includes(e.key)) {
        e.preventDefault();
        go(1);
      } else if (["ArrowUp", "ArrowLeft", "k", "K"].includes(e.key)) {
        e.preventDefault();
        go(-1);
      } else if (e.key === " " && !(e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement)) {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m" || e.key === "M") toggleMute();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, requestClose, toggleMute, togglePlay]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
    swipedRef.current = false;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const fast = Date.now() - start.t < 600;
    if (Math.max(Math.abs(dx), Math.abs(dy)) > (fast ? 40 : 80)) {
      swipedRef.current = true;
      if (Math.abs(dy) >= Math.abs(dx)) go(dy < 0 ? 1 : -1);
      else go(dx < 0 ? 1 : -1);
    }
  };
  const onStageClick = () => {
    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }
    togglePlay();
  };

  const seek = (e: React.PointerEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = Math.min(v.duration - 0.2, Math.max(0, ((e.clientX - r.left) / r.width) * v.duration));
  };

  const share = async () => {
    const url = absoluteUrl(`/films/${film.slug}`);
    try {
      if (navigator.share) {
        await navigator.share({ title: film.title, text: `${film.title} — Precise Homes, Kochi`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* share sheet dismissed */
    }
  };

  const enquiry = waLink(`Hi Precise Homes! I just watched "${film.title}" (${film.location}) on your website and would like to discuss a similar project.`);
  const upNext = multiple ? [1, 2, 3].map((d) => list[(index + d) % list.length]).filter((f, i, a) => f.slug !== film.slug && a.indexOf(f) === i) : [];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Film player: ${film.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-[300] bg-[#020407] overscroll-contain ${jakarta.className}`}
    >
      {/* Ambient backdrop (desktop) */}
      <div className="absolute inset-0 hidden lg:block overflow-hidden" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.img
            key={film.slug}
            src={media.poster}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 h-full w-full object-cover scale-125 blur-3xl saturate-150"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[#020407]/40 via-[#020407]/70 to-[#020407]/95" />
      </div>

      <div className="relative h-full w-full flex items-center justify-center lg:gap-12 xl:gap-16 lg:px-10">
        {/* ── Stage ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="relative h-[100dvh] w-full lg:h-[min(90dvh,880px)] lg:w-auto lg:aspect-[9/16] lg:rounded-[28px] overflow-hidden bg-black lg:shadow-[0_40px_120px_rgba(0,0,0,0.6)] lg:ring-1 lg:ring-white/10"
          style={{ touchAction: "none" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={onStageClick}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-contain lg:object-cover"
            playsInline
            preload="auto"
            poster={media.start}
            aria-label={film.title}
            onPlaying={() => {
              setStarted(true);
              setBuffering(false);
              setPaused(false);
            }}
            onWaiting={() => setBuffering(true)}
            onCanPlay={() => setBuffering(false)}
            onPause={() => setPaused(true)}
            onPlay={() => setPaused(false)}
            onEnded={() => (multiple ? go(1) : setPaused(true))}
            onError={() => setFailed(true)}
          />

          {/* Poster hand-off: slides in with the swipe, fades once playback starts */}
          <AnimatePresence initial={false} custom={dir}>
            {!started && (
              <motion.img
                key={film.slug}
                src={media.start}
                alt=""
                aria-hidden="true"
                custom={dir}
                variants={{
                  enter: (d: number) => ({ y: d > 0 ? "100%" : d < 0 ? "-100%" : 0, opacity: d === 0 ? 0 : 1 }),
                  center: { y: 0, opacity: 1 },
                  exit: { opacity: 0 },
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-0 h-full w-full object-contain lg:object-cover bg-black"
              />
            )}
          </AnimatePresence>

          {/* Gradients for legibility */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/90 via-black/40 to-transparent lg:h-28 lg:from-black/60" />

          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-10 px-4 pt-[max(0.75rem,env(safe-area-inset-top))]" onClick={(e) => e.stopPropagation()}>
            <div className="group relative h-5 flex items-center cursor-pointer" onPointerDown={seek} aria-hidden="true">
              <div className="h-[3px] w-full rounded-full bg-white/25 overflow-hidden group-hover:h-[5px] transition-all">
                <div ref={barRef} className="h-full w-full origin-left bg-white" style={{ transform: "scaleX(0)" }} />
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <img src="/logo-nav.webp" alt="" className="h-6 w-auto opacity-90" />
                {multiple && (
                  <span className="text-white/60 text-[11px] font-bold tabular-nums">
                    {index + 1} / {list.length}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/60"
                >
                  {muted ? <VolumeX className="w-[18px] h-[18px]" /> : <Volume2 className="w-[18px] h-[18px]" />}
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={requestClose}
                  aria-label="Close player"
                  className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Centre state: paused / buffering / error */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            {failed ? (
              <div className="pointer-events-auto mx-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 p-5 text-center" onClick={(e) => e.stopPropagation()}>
                <p className="text-white text-sm font-semibold">This film couldn&apos;t load.</p>
                <p className="text-white/60 text-xs mt-1">Please check your connection.</p>
                <button type="button" onClick={retry} className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black">
                  <RotateCcw className="w-3.5 h-3.5" /> Try again
                </button>
              </div>
            ) : buffering && started ? (
              <Loader2 className="w-10 h-10 text-white/80 animate-spin" />
            ) : !started ? (
              <Loader2 className="w-9 h-9 text-white/70 animate-spin [animation-delay:400ms]" />
            ) : paused ? (
              <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-20 h-20 rounded-full bg-black/45 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Play className="w-8 h-8 text-white translate-x-0.5" fill="currentColor" />
              </motion.span>
            ) : null}
          </div>

          {/* Bottom info (mobile & tablet) */}
          <div
            className="lg:hidden absolute inset-x-0 bottom-0 z-10 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              <span className="rounded-full bg-[#D72731] text-white px-2.5 py-1">{film.kind}</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {film.location}
              </span>
              <span className="text-white/40">· {formatDuration(film.duration)}</span>
            </div>
            <h2 className="mt-2 text-white text-[19px] font-bold leading-tight">{film.title}</h2>
            <p className="mt-1 text-white/70 text-[12.5px] leading-relaxed line-clamp-2">{film.description}</p>
            <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
              {film.products.map((p) =>
                productNames[p] ? (
                  <Link key={p} href={`/products/${p}`} className="shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/90">
                    {productNames[p]}
                  </Link>
                ) : null,
              )}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <a href={enquiry} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-[13px] font-bold text-white">
                <WhatsAppIcon className="w-4 h-4" /> Enquire about this
              </a>
              <button type="button" onClick={share} aria-label="Share film" className="w-12 h-12 shrink-0 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white">
                {copied ? <Check className="w-5 h-5 text-[#25D366]" /> : <Share2 className="w-5 h-5" />}
              </button>
            </div>
            {multiple && <p className="mt-2 text-center text-white/35 text-[10px] tracking-wide">Swipe up for the next film</p>}
          </div>
        </motion.div>

        {/* ── Desktop side panel ────────────────────────────────────────── */}
        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="hidden lg:flex flex-col w-[360px] xl:w-[400px] max-h-[90dvh] overflow-y-auto no-scrollbar"
        >
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="rounded-full bg-[#D72731] text-white px-2.5 py-1">{film.kind}</span>
            <span className="flex items-center gap-1 text-white/60">
              <MapPin className="w-3 h-3" /> {film.location}
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={film.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
              <h2 className="mt-4 text-white text-3xl font-bold leading-[1.1] tracking-tight">{film.title}</h2>
              <p className="mt-3 text-white/60 text-[14px] leading-relaxed">{film.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {film.products.map((p) =>
                  productNames[p] ? (
                    <Link key={p} href={`/products/${p}`} className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-white/80 hover:bg-white/15 hover:text-white transition-colors">
                      {productNames[p]}
                    </Link>
                  ) : null,
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center gap-2">
            <a href={enquiry} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-[13px] font-bold text-white hover:bg-[#1ebe5b] transition-colors">
              <WhatsAppIcon className="w-4 h-4" /> Enquire on WhatsApp
            </a>
            <button type="button" onClick={share} aria-label="Share film" className="w-12 h-12 rounded-full bg-white/[0.07] border border-white/15 flex items-center justify-center text-white hover:bg-white/15">
              {copied ? <Check className="w-5 h-5 text-[#25D366]" /> : <Share2 className="w-5 h-5" />}
            </button>
            <Link href={`/films/${film.slug}`} aria-label="Open film page" className="w-12 h-12 rounded-full bg-white/[0.07] border border-white/15 flex items-center justify-center text-white hover:bg-white/15">
              <ExternalLink className="w-[18px] h-[18px]" />
            </Link>
          </div>

          {upNext.length > 0 && (
            <div className="mt-8">
              <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Up next</p>
              <div className="flex flex-col gap-2">
                {upNext.map((f) => (
                  <button
                    key={f.slug}
                    type="button"
                    onClick={() => {
                      const target = list.findIndex((x) => x.slug === f.slug);
                      setDir(target > index ? 1 : -1);
                      setIndex(target);
                    }}
                    className="group flex items-center gap-3 rounded-2xl p-2 text-left hover:bg-white/[0.06] transition-colors"
                  >
                    <img src={filmMedia(f.slug).poster} alt="" loading="lazy" className="w-12 h-[84px] rounded-lg object-cover ring-1 ring-white/10" />
                    <span className="min-w-0">
                      <span className="block text-white text-[13px] font-semibold leading-snug line-clamp-2 group-hover:text-white">{f.title}</span>
                      <span className="block text-white/40 text-[11px] mt-1">
                        {f.location} · {formatDuration(f.duration)}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <p className="mt-8 text-white/25 text-[10px] leading-relaxed">Space play/pause · M mute · ↑ ↓ next film · Esc close</p>
        </motion.aside>

        {/* Desktop prev / next */}
        {multiple && (
          <div className="hidden lg:flex flex-col gap-3 absolute right-6 top-1/2 -translate-y-1/2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous film" className="w-12 h-12 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-white hover:bg-white/20">
              <ChevronUp className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next film" className="w-12 h-12 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-white hover:bg-white/20">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Screen-reader status */}
      <p className="sr-only" aria-live="polite">
        {paused ? "Paused" : "Playing"} {film.title}
      </p>
    </motion.div>
  );
}
