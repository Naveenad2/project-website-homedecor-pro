"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Hero — "story reel" of real Precise Homes project films, with sound.
//
// Browsers only allow *muted* autoplay, so the reel starts muted with a clear
// "Tap for sound" control. Once the visitor enables sound it stays on (same
// <video> element, so iOS keeps it unlocked) as stories advance, and the choice
// is remembered for the session. The reel pauses when scrolled away, when the
// tab is hidden, and while the full-screen film viewer is open.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useEffectEvent, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Pause, Play, Volume2, VolumeX } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { HERO_FILMS, filmMedia } from "@/data/films";
import { waLink } from "@/lib/site";
import { mediaBus, safeSession, useLowMotion } from "@/lib/client-utils";
import { syne } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;
const SOUND_KEY = "ph-hero-sound";

const QUICK_LINKS = [
  { label: "uPVC Windows", href: "/products/saint-gobain-upvc-windows" },
  { label: "System Aluminium", href: "/products/system-aluminium-windows" },
  { label: "Toughened Glass", href: "/products/toughened-glass" },
  { label: "Shower Partitions", href: "/products/shower-partitions" },
  { label: "Glass Handrails", href: "/products/glass-handrails" },
  { label: "Fundermax HPL", href: "/products/fundermax-hpl-cladding" },
  { label: "iCLAD Cladding", href: "/products/iclad-cladding" },
];

function KineticWord({ text, accent, delay }: { text: string; accent?: boolean; delay: number }) {
  return (
    <span className="block overflow-x-visible overflow-y-clip pb-[0.04em]">
      <span className="flex">
        {text.split("").map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-60%", opacity: 0, transition: { duration: 0.35, delay: i * 0.012, ease: EASE } }}
            transition={{ duration: 0.9, delay: delay + i * 0.03, ease: EASE }}
            className={`inline-block ${accent ? "text-transparent bg-clip-text bg-gradient-to-r from-[#3d8fd6] via-[#5fb0ff] to-[#9ad0ff]" : "text-white"}`}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const stories = HERO_FILMS;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const inViewRef = useRef(true);
  const suspendedRef = useRef(false);
  const userPausedRef = useRef(false);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const swipedRef = useRef(false);
  const advancingRef = useRef(false);
  const userStartedRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true); // mirrored from the element's volumechange event
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false); // browser refused autoplay
  const [userStarted, setUserStarted] = useState(false);
  const [readySlug, setReadySlug] = useState<string | null>(null);
  const lowMotion = useLowMotion();

  const story = stories[index];
  const frameReady = readySlug === story.slug;
  const needsTap = !userStarted && (lowMotion || blocked);
  const media = filmMedia(story.slug);
  const storyEnd = story.endCardAt ?? story.duration;

  // Effect Event: called only from effects / the observers they register.
  const tryPlay = useEffectEvent(async () => {
    const v = videoRef.current;
    if (!v || !inViewRef.current || suspendedRef.current || userPausedRef.current || document.hidden) return;
    try {
      await v.play();
      setBlocked(false);
    } catch {
      if (!v.muted) {
        v.muted = true; // volumechange → state
        try {
          await v.play();
          setBlocked(false);
          return;
        } catch {
          /* fall through */
        }
      }
      setBlocked(true);
    }
  });

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + stories.length) % stories.length),
    [stories.length],
  );

  /** Auto-advance exactly once per story (rAF end-detection and `ended` can both fire). */
  const advance = useCallback(() => {
    if (advancingRef.current) return;
    advancingRef.current = true;
    go(1);
  }, [go]);

  // Respect reduced-motion / Data Saver; otherwise restore the visitor's sound choice and play.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (lowMotion && !userStartedRef.current) {
      v.pause();
      userPausedRef.current = true;
      return;
    }
    if (safeSession(SOUND_KEY) === "on") v.muted = false; // volumechange → state
    void tryPlay();
  }, [lowMotion]);

  // New story → the <video> src prop changes (same element), restart playback.
  useEffect(() => {
    advancingRef.current = false;
    barRefs.current.forEach((b, i) => {
      if (b) b.style.transform = `scaleX(${i < index ? 1 : 0})`;
    });
    // tryPlay only sets state after the play() promise settles (async), never synchronously.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void tryPlay();
  }, [index]);

  // Progress, smooth audio fades and skipping the white logo outro.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && v.duration) {
        const t = v.currentTime;
        const bar = barRefs.current[index];
        if (bar) bar.style.transform = `scaleX(${Math.min(1, t / storyEnd)})`;
        if (!v.muted) v.volume = Math.max(0, Math.min(1, Math.min(t / 0.5, (storyEnd - t) / 0.6)));
        if (t >= storyEnd - 0.04 && !v.paused) advance();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, storyEnd, advance]);

  // Pause when scrolled away / tab hidden; resume when back.
  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.intersectionRatio >= 0.3;
        if (inViewRef.current) void tryPlay();
        else v.pause();
      },
      { threshold: [0, 0.3, 0.6] },
    );
    io.observe(el);
    const onVis = () => (document.hidden ? v.pause() : void tryPlay());
    document.addEventListener("visibilitychange", onVis);
    const unsub = mediaBus.subscribe((owner) => {
      suspendedRef.current = owner !== null && owner !== "hero";
      if (suspendedRef.current) v.pause();
      else void tryPlay();
    });
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      unsub();
    };
  }, []);

  const toggleSound = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const nextMuted = !v.muted;
    v.muted = nextMuted; // volumechange → state
    safeSession(SOUND_KEY, nextMuted ? "off" : "on");
    if (!nextMuted) {
      v.volume = 1;
      userPausedRef.current = false;
      userStartedRef.current = true;
      setUserStarted(true);
      mediaBus.announce("hero");
      v.play().catch(() => undefined);
    }
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPausedRef.current = false;
      userStartedRef.current = true;
      setUserStarted(true);
      v.play().catch(() => undefined);
    } else {
      userPausedRef.current = true;
      v.pause();
    }
  }, []);

  const startWithSound = () => {
    const v = videoRef.current;
    if (!v) return;
    userPausedRef.current = false;
    userStartedRef.current = true;
    setUserStarted(true);
    v.muted = false; // volumechange → state
    safeSession(SOUND_KEY, "on");
    mediaBus.announce("hero");
    v.play().catch(() => undefined);
  };

  const onVideoTap = () => {
    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }
    if (needsTap) startWithSound();
    else toggleSound();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    swipedRef.current = false;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchRef.current;
    touchRef.current = null;
    if (!s) return;
    const dx = e.changedTouches[0].clientX - s.x;
    const dy = e.changedTouches[0].clientY - s.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      swipedRef.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };

  const soundLabel = muted ? "Tap for sound" : "Sound on";

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Precise Homes — Saint-Gobain windows, glass and cladding in Kochi"
      className={`relative w-full overflow-hidden bg-[#03070b] ${syne.className}`}
    >
      {/* Desktop ambient backdrop — the current story, blurred */}
      <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.img
            key={story.slug}
            src={media.poster}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover scale-125 blur-[70px] saturate-[1.4]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[#03070b] via-[#03070b]/85 to-[#03070b]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-transparent to-[#03070b]/70" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "72px 72px" }}
        />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1920px] grid-cols-1 lg:grid-cols-12 lg:items-center lg:gap-10 px-5 sm:px-8 lg:px-16 xl:px-24 pb-8 lg:pb-12 pt-24 lg:pt-32">
        {/* ── Copy ─────────────────────────────────────────────────────── */}
        <div className="relative z-20 flex flex-col justify-end lg:justify-center lg:col-span-7 xl:col-span-7 min-h-[calc(100svh-8rem)] lg:min-h-0 pointer-events-none lg:pointer-events-auto">
          <div className="pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className="h-[2px] w-8 sm:w-12 bg-[#D72731]" />
              <h1 className="text-[#ff6b72] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] leading-relaxed">
                Saint-Gobain uPVC Windows, Glass &amp; Cladding · Kochi
              </h1>
            </motion.div>

            <div className="mt-4 sm:mt-5 text-[8.2vw] lg:text-[min(4.4vw,84px)] font-extrabold uppercase leading-[0.92] tracking-tighter drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]">
              <p className="sr-only">{story.hero?.words.join(" ")}</p>
              <AnimatePresence mode="wait">
                <motion.div key={story.slug} className="flex flex-col" aria-hidden="true">
                  {story.hero?.words.map((w, i) => <KineticWord key={w + i} text={w} accent={i === 1} delay={0.1 + i * 0.12} />)}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: EASE }}
              className="mt-5 sm:mt-6 max-w-xl text-white/75 lg:text-white/60 text-[13.5px] sm:text-[15px] leading-relaxed font-medium line-clamp-3 sm:line-clamp-none"
            >
              Kochi&apos;s Saint-Gobain experience centre for <strong className="text-white font-semibold">uPVC &amp; system aluminium windows</strong>, toughened, laminated &amp; lacquered glass, shower partitions, glass handrails and{" "}
              <strong className="text-white font-semibold">Fundermax HPL &amp; iCLAD cladding</strong> — supplied and installed across Kerala.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3"
            >
              <a
                href={waLink("Hi Precise Homes! I'd like a free quote and site visit for my home.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#25D366] pl-5 pr-2 py-2 text-white shadow-[0_10px_34px_rgba(37,211,102,0.35)] hover:bg-[#1ebe5b] transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em]">Free Quote</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-md px-5 py-3 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] text-white hover:bg-white/15 transition-colors"
              >
                Explore Products
              </Link>
              <Link href="/#films" className="hidden sm:inline-flex items-center gap-2 px-2 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors">
                <Play className="w-3.5 h-3.5" fill="currentColor" /> Watch Films
              </Link>
            </motion.div>

            {/* Keyword quick links (desktop) — real internal links to product pages */}
            <motion.nav
              aria-label="Popular products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="hidden lg:flex flex-wrap gap-2 mt-6 max-w-2xl"
            >
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10.5px] font-semibold text-white/55 hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </motion.nav>

            {/* Story selector (desktop) */}
            <div className="hidden lg:flex items-end gap-3 mt-7">
              {stories.map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Play story ${i + 1}: ${s.title}`}
                  aria-current={i === index}
                  className={`group relative w-[58px] aspect-[9/16] overflow-hidden rounded-xl ring-1 transition-all duration-500 ${i === index ? "ring-white/80 w-[72px]" : "ring-white/15 opacity-60 hover:opacity-100"}`}
                >
                  <img src={filmMedia(s.slug).poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </button>
              ))}
              <div className="ml-3 pb-1">
                <p className="text-white/35 text-[9px] font-bold uppercase tracking-[0.3em]">Now playing</p>
                <p className="text-white text-[13px] font-semibold mt-1 max-w-[220px] leading-snug">{story.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Video: full-bleed on mobile, framed 9:16 on desktop ──────── */}
        <div className="lg:col-span-5 lg:relative lg:flex lg:justify-center">
          <div
            className="group/frame absolute inset-0 z-0 lg:relative lg:inset-auto lg:h-[min(70svh,620px)] xl:h-[min(74svh,720px)] lg:aspect-[9/16] lg:overflow-hidden lg:rounded-[30px] lg:ring-1 lg:ring-white/15 lg:shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <video
              ref={videoRef}
              src={media.src}
              poster={media.start}
              muted
              autoPlay
              playsInline
              preload="auto"
              aria-label={`${story.title} — ${story.location}`}
              onClick={onVideoTap}
              onPlaying={() => {
                setPlaying(true);
                setReadySlug(story.slug);
              }}
              onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
              onPause={() => setPlaying(false)}
              onEnded={advance}
              className="absolute inset-0 h-full w-full object-cover cursor-pointer"
            />
            {/* Poster hand-off while the next story loads */}
            <AnimatePresence>
              {!frameReady && (
                <motion.img
                  key={story.slug}
                  src={media.start}
                  alt=""
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
              )}
            </AnimatePresence>

            {/* Legibility gradients */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03070b] via-[#03070b]/45 to-transparent lg:from-black/70 lg:via-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#03070b]/85 to-transparent lg:h-28 lg:from-black/60" />

            {/* Story progress */}
            <div className="absolute inset-x-4 lg:inset-x-5 top-[84px] sm:top-[92px] lg:top-5 z-10 flex gap-1.5" role="tablist" aria-label="Stories">
              {stories.map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Story ${i + 1}: ${s.title}`}
                  onClick={() => setIndex(i)}
                  className="relative h-6 flex-1 flex items-center"
                >
                  <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/25">
                    <span
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                      className="absolute inset-0 origin-left rounded-full bg-white"
                      style={{ transform: `scaleX(${i < index ? 1 : 0})` }}
                    />
                  </span>
                </button>
              ))}
            </div>

            {/* Caption + controls */}
            <div className="absolute inset-x-4 lg:inset-x-5 top-[118px] sm:top-[126px] lg:top-12 z-10 flex items-start justify-between gap-3">
              <AnimatePresence mode="wait">
                <motion.span
                  key={story.slug}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90"
                >
                  <MapPin className="w-3 h-3 text-[#ff6b72]" /> {story.hero?.sub}
                </motion.span>
              </AnimatePresence>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause video" : "Play video"}
                  className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/60"
                >
                  {playing ? <Pause className="w-4 h-4" fill="currentColor" /> : <Play className="w-4 h-4 translate-x-[1px]" fill="currentColor" />}
                </button>
              </div>
            </div>

            {/* Sound control — the hero's key interaction */}
            <div className="absolute z-10 right-4 top-[162px] sm:top-[172px] lg:top-auto lg:bottom-5 lg:inset-x-5 flex lg:justify-center pointer-events-none">
              <button
                type="button"
                onClick={needsTap ? startWithSound : toggleSound}
                aria-pressed={!muted}
                aria-label={muted ? "Turn sound on" : "Turn sound off"}
                className={`pointer-events-auto group inline-flex items-center gap-2.5 rounded-full pl-3 pr-4 py-2.5 backdrop-blur-md border transition-all duration-500 ${
                  muted ? "bg-white text-[#03070b] border-white shadow-[0_8px_30px_rgba(255,255,255,0.25)]" : "bg-black/45 text-white border-white/20"
                }`}
              >
                {muted ? <VolumeX className="w-[18px] h-[18px]" /> : <Volume2 className="w-[18px] h-[18px]" />}
                <span className="text-[11px] font-bold uppercase tracking-[0.14em]">{needsTap ? "Play with sound" : soundLabel}</span>
                {!muted && (
                  <span className="flex items-end gap-[2px] h-3" aria-hidden="true">
                    {[0, 1, 2, 3].map((b) => (
                      <span key={b} className="w-[2px] rounded-full bg-[#25D366] animate-[eq_0.9s_ease-in-out_infinite]" style={{ animationDelay: `${b * 0.15}s`, height: "100%" }} />
                    ))}
                  </span>
                )}
                {muted && <span className="absolute inset-0 rounded-full ring-2 ring-white/60 animate-[wa-ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" aria-hidden="true" />}
              </button>
            </div>

            {/* Desktop prev/next */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous story"
              className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/35 backdrop-blur-md border border-white/15 items-center justify-center text-white opacity-0 group-hover/frame:opacity-100 focus-visible:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next story"
              className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/35 backdrop-blur-md border border-white/15 items-center justify-center text-white opacity-0 group-hover/frame:opacity-100 focus-visible:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Play overlay when autoplay isn't possible (reduced motion / data saver / blocked) */}
            {needsTap && (
              <button
                type="button"
                onClick={startWithSound}
                className="absolute inset-0 z-[5] flex items-center justify-center"
                aria-label="Play the film with sound"
              >
                <span className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                  <Play className="w-8 h-8 translate-x-0.5" fill="currentColor" />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
