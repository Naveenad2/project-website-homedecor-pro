"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Hero — a reel of real Precise Homes project films.
// Sound: playback starts with sound whenever the browser allows it; otherwise it
// starts muted and sound switches on at the visitor's first tap/click/key press
// (browsers never allow audio before any interaction). A small speaker button
// mutes/unmutes; a deliberate mute is remembered.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useEffectEvent, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Pause, Play, Plus, Volume2, VolumeX } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { HERO_FILMS, filmMedia } from "@/data/films";
import { SITE, waLink } from "@/lib/site";
import { armSoundOnFirstInteraction, mediaBus, playWithSoundIfAllowed, setSoundPreference, useLowMotion } from "@/lib/client-utils";
import { syne } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

// Same character-reveal headline as the original hero.
function KineticWord({ text, accent, delay }: { text: string; accent?: boolean; delay: number }) {
  return (
    <span className="block overflow-x-visible overflow-y-clip py-[2px]">
      <span className="flex">
        {text.split("").map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            initial={{ y: "108%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-60%", opacity: 0, transition: { duration: 0.3, delay: i * 0.01, ease: EASE } }}
            transition={{ duration: 1, delay: delay + i * 0.035, ease: EASE }}
            className={`inline-block ${accent ? "text-[#02589F] saturate-[180%] brightness-[1.35]" : "text-white"}`}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

// Layout: phones (<768px) get the full-bleed film; tablets and up get the framed card
// over a project photo, with extra detailing (card stack, frame lines) from 1024px.
// 1×1 transparent GIF: phones keep this and never download the background photos.
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const FRAMED = "(min-width: 768px)";
const PARTNERS = ["Saint-Gobain", "Fundermax", "iCLAD", "Novelio", "LG Hausys"];

/** Wide screens only — a slow-turning seal beside the film card. */
function Seal() {
  return (
    <span className="pointer-events-none absolute -left-[74px] top-[11%] z-20 hidden xl:flex w-[104px] h-[104px] items-center justify-center rounded-full bg-[#03070b]/80 ring-1 ring-white/15 shadow-[0_18px_50px_rgba(0,0,0,0.55)]" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_26s_linear_infinite]">
        <defs>
          <path id="ph-seal" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-white/75 text-[7.4px] font-bold uppercase">
          {/* 2π × 37 ≈ 232 — spacing stretches so the phrase closes the ring exactly */}
          <textPath href="#ph-seal" textLength={231} lengthAdjust="spacing">
            Precise Homes • Kochi • Since {SITE.foundingYear} •
          </textPath>
        </text>
      </svg>
      <span className="w-2.5 h-2.5 rounded-full bg-[#D72731]" />
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
  const userStartedRef = useRef(false);
  const advancingRef = useRef(false);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const swipedRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true); // mirrored from the element (volumechange + playing)
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  const [readySlug, setReadySlug] = useState<string | null>(null);
  const lowMotion = useLowMotion();

  const story = stories[index];
  const media = filmMedia(story.slug);
  const storyEnd = story.endCardAt ?? story.duration;
  const frameReady = readySlug === story.slug;
  const needsTap = !userStarted && (lowMotion || blocked);

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + stories.length) % stories.length), [stories.length]);

  /** Advance exactly once per story (end detection and the `ended` event can both fire). */
  const advance = useCallback(() => {
    if (advancingRef.current) return;
    advancingRef.current = true;
    go(1);
  }, [go]);

  // Effect Event: resume playback when allowed (called from effects and the observers they register).
  const resume = useEffectEvent(async () => {
    const v = videoRef.current;
    if (!v || !inViewRef.current || suspendedRef.current || userPausedRef.current || document.hidden) return;
    try {
      await v.play();
      setBlocked(false);
    } catch {
      setBlocked(true);
    }
  });

  // Start: with sound if the browser allows it, otherwise muted + sound on first interaction.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (lowMotion && !userStartedRef.current) {
      v.pause();
      userPausedRef.current = true;
      return;
    }
    let cancelled = false;
    playWithSoundIfAllowed(v).then(() => {
      if (!cancelled && v.paused) setBlocked(true);
    });
    const disarm = armSoundOnFirstInteraction(() => videoRef.current, () => inViewRef.current && !suspendedRef.current);
    return () => {
      cancelled = true;
      disarm();
    };
  }, [lowMotion]);

  // New story → same <video> element, new src (sound stays on), restart progress.
  useEffect(() => {
    advancingRef.current = false;
    barRefs.current.forEach((b, i) => {
      if (b) b.style.transform = `scaleX(${i < index ? 1 : 0})`;
    });
    // resume() only sets state after the play() promise settles (async), never synchronously.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void resume();
  }, [index]);

  // Progress bar, gentle audio fade at the end, and skipping the white logo outro.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && v.duration) {
        const t = v.currentTime;
        const bar = barRefs.current[index];
        if (bar) bar.style.transform = `scaleX(${Math.min(1, t / storyEnd)})`;
        if (!v.muted) v.volume = Math.max(0, Math.min(1, (storyEnd - t) / 0.6));
        if (t >= storyEnd - 0.04 && !v.paused) advance();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, storyEnd, advance]);

  // Pause when scrolled away / tab hidden / another player takes the stage.
  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.intersectionRatio >= 0.3;
        if (inViewRef.current) void resume();
        else v.pause();
      },
      { threshold: [0, 0.3, 0.6] },
    );
    io.observe(el);
    const onVis = () => (document.hidden ? v.pause() : void resume());
    document.addEventListener("visibilitychange", onVis);
    const unsub = mediaBus.subscribe((owner) => {
      suspendedRef.current = owner !== null && owner !== "hero";
      if (suspendedRef.current) v.pause();
      else void resume();
    });
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      unsub();
    };
  }, []);

  // Desktop: warm the other stories' background photos once the page is idle.
  useEffect(() => {
    if (!window.matchMedia(FRAMED).matches) return;
    const run = () =>
      stories.forEach((s) => {
        const img = new Image();
        img.decoding = "async";
        img.src = filmMedia(s.slug).heroBg;
      });
    // Safari has no requestIdleCallback.
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(run, 2500);
    return () => clearTimeout(t);
  }, [stories]);

  const startWithSound = () => {
    const v = videoRef.current;
    if (!v) return;
    userPausedRef.current = false;
    userStartedRef.current = true;
    setUserStarted(true);
    v.muted = false;
    v.volume = 1;
    setSoundPreference("on");
    mediaBus.announce("hero");
    v.play().catch(() => undefined);
  };

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) startWithSound();
    else {
      v.muted = true;
      setSoundPreference("off");
    }
  };

  const togglePlay = () => {
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
  };

  const onVideoTap = () => {
    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }
    toggleSound();
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

  const iconBtn = "w-8 h-8 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/65 transition-colors";

  return (
    <section ref={sectionRef} id="top" aria-label="Precise Homes — Saint-Gobain windows, glass and cladding in Kochi" className={`relative w-full overflow-hidden bg-[#03070b] ${syne.className}`}>
      {/* ── Tablet/desktop backdrop: the current project, full-bleed, slowly drifting ── */}
      <div className="absolute inset-0 hidden md:block" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={story.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: EASE }}
            className="absolute inset-0 overflow-hidden"
          >
            <picture>
              <source media={FRAMED} srcSet={media.heroBg} type="image/webp" />
              <img
                src={BLANK}
                alt=""
                width={1920}
                height={1080}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
                className="absolute inset-0 h-full w-full object-cover will-change-transform animate-[kenburns_22s_ease-out_forwards]"
              />
            </picture>
          </motion.div>
        </AnimatePresence>
        {/* Legibility: deep tone on the copy side, the photo breathes behind the film */}
        <div className="absolute inset-0 bg-[#03070b]/40 lg:bg-[#03070b]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03070b] from-[8%] via-[#03070b]/75 via-[40%] to-transparent to-[80%]" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#03070b]/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#03070b] via-[#03070b]/60 to-transparent" />
        {/* Window-frame linework (desktop) */}
        <div className="absolute left-8 right-8 top-[112px] bottom-8 hidden lg:block border border-white/[0.07]">
          {(["-left-[6px] -top-[6px]", "-right-[6px] -top-[6px]", "-left-[6px] -bottom-[6px]", "-right-[6px] -bottom-[6px]"] as const).map((pos) => (
            <Plus key={pos} className={`absolute ${pos} w-3 h-3 text-white/40`} strokeWidth={1.5} />
          ))}
        </div>
        {/* Drawing-sheet labels in the side gutters */}
        <span className="absolute right-[12px] top-1/2 -translate-y-1/2 hidden lg:block rotate-180 text-[9px] font-bold uppercase tracking-[0.32em] text-white/35 tabular-nums [writing-mode:vertical-rl]">
          Padivattom, Kochi · {SITE.geo.lat.toFixed(4)}° N {SITE.geo.lng.toFixed(4)}° E
        </span>
        <span className="absolute left-[12px] bottom-12 hidden lg:flex flex-col items-center gap-3">
          <span className="rotate-180 text-[9px] font-bold uppercase tracking-[0.32em] text-white/45 [writing-mode:vertical-rl]">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-white animate-[scrollcue_2.2s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
          </span>
        </span>
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1920px] grid-cols-1 md:grid-cols-12 md:items-center md:gap-8 lg:gap-10 px-5 sm:px-8 lg:px-16 xl:px-24 pb-10 md:pb-12 pt-24 md:pt-28 lg:pt-32">
        {/* ── Copy ── */}
        <div className="relative z-20 flex flex-col justify-end md:justify-center md:col-span-7 min-h-[calc(100svh-8rem)] md:min-h-0 pointer-events-none md:pointer-events-auto">
          <div className="pointer-events-auto">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: EASE }} className="flex items-center gap-4">
              <span className="h-[2px] w-10 md:w-14 bg-[#D72731]" />
              <h1 className="text-[#ff4651] md:text-[#D72731] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.35em] leading-relaxed [text-shadow:0_1px_10px_rgba(0,0,0,0.8)]">Saint-Gobain Windows, Glass &amp; Cladding · Kochi</h1>
            </motion.div>

            <div className="mt-4 md:mt-6 text-[8.2vw] md:text-[min(6.4vw,56px)] lg:text-[min(4.4vw,84px)] font-bold uppercase leading-[0.9] tracking-tighter drop-shadow-2xl">
              <p className="sr-only">{story.hero?.words.join(" ")}</p>
              <AnimatePresence mode="wait">
                <motion.div key={story.slug} className="flex flex-col" aria-hidden="true">
                  {story.hero?.words.map((w, i) => <KineticWord key={w + i} text={w} accent={i === 1} delay={0.1 + i * 0.12} />)}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: EASE }}
              className="mt-5 md:mt-6 max-w-lg text-white/70 md:text-white/60 lg:text-white/55 text-[13.5px] md:text-[15px] leading-[1.8] font-medium"
            >
              uPVC &amp; aluminium windows, toughened glass, shower partitions, glass handrails and Fundermax &amp; iCLAD cladding — supplied and installed across Kerala.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: EASE }} className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
              <a
                href={waLink("Hi Precise Homes! I'd like a free quote and site visit for my home.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#25D366] pl-5 pr-2 py-2 text-white hover:bg-[#1ebe5b] transition-colors"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">Free Quote</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>
              <Link
                href="/#products"
                className="inline-flex items-center rounded-full border border-white/[0.15] bg-white/[0.06] backdrop-blur-md px-5 py-3 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-colors"
              >
                Our Products
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
              className="hidden md:block mt-10 lg:mt-12 max-w-[560px] border-t border-white/10 pt-5"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D72731]">Authorised partners</span>
              <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                {PARTNERS.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* ── Video: full-bleed on phones, framed 9:16 from tablets up ── */}
        <div className="md:col-span-5 md:relative md:flex md:justify-center">
          {/* Unpositioned on phones, so the full-bleed film still fills the hero there */}
          <div className="md:relative md:mb-16 lg:mb-14 lg:-translate-x-6">
            {/* Desktop: the next films wait in a fanned stack behind the card */}
            <div className="absolute inset-0 hidden lg:block">
              {stories.map((s, i) => {
                const level = (i - index + stories.length) % stories.length;
                const shown = level === 1 || level === 2;
                return (
                  <motion.button
                    key={s.slug}
                    type="button"
                    tabIndex={shown ? 0 : -1}
                    aria-hidden={!shown}
                    aria-label={`Play story ${i + 1}: ${s.title}`}
                    onClick={() => setIndex(i)}
                    initial={false}
                    animate={{ x: `${level * 15}%`, y: level * -20, rotate: level * 3.5, scale: 1 - level * 0.07, opacity: shown ? 1 : 0 }}
                    whileHover={shown ? { x: `${level * 15 + 3}%` } : undefined}
                    transition={{ duration: 0.9, ease: EASE }}
                    style={{ transformOrigin: "0% 100%", zIndex: 4 - level, pointerEvents: shown ? "auto" : "none" }}
                    className="group/peek absolute inset-0 overflow-hidden rounded-[26px] bg-[#0b1118] ring-1 ring-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                  >
                    <img src={filmMedia(s.slug).poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                    <span className="absolute inset-0 bg-[#03070b]/60 transition-opacity duration-500 group-hover/peek:opacity-40" />
                  </motion.button>
                );
              })}
            </div>

            <Seal />

            <div
              className="group/frame absolute inset-0 z-0 md:z-10 md:relative md:inset-auto md:h-[min(56svh,520px)] lg:h-[min(64svh,620px)] md:aspect-[9/16] md:overflow-hidden md:rounded-[26px] md:ring-1 md:ring-white/20 md:shadow-[0_50px_120px_-20px_rgba(0,0,0,0.85)]"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <video
                ref={videoRef}
                src={media.src}
                poster={media.start}
                muted
                playsInline
                preload="auto"
                data-sound-control
                aria-label={`${story.title} — ${story.location}`}
                onClick={onVideoTap}
                onPlaying={(e) => {
                  setPlaying(true);
                  setReadySlug(story.slug);
                  // A src change drops any still-queued volumechange (e.g. the first tap both
                  // unmutes and switches story), so re-read the real state here as well.
                  setMuted(e.currentTarget.muted);
                }}
                onPause={() => setPlaying(false)}
                onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
                onEnded={advance}
                className="absolute inset-0 h-full w-full object-cover cursor-pointer"
              />
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

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03070b] from-10% via-[#03070b]/75 via-45% to-transparent to-80% md:from-black/55 md:from-0% md:via-transparent md:via-30% md:to-transparent" />
              {/* Framed card: faint glass sheen + inner edge */}
              <div className="pointer-events-none absolute inset-0 hidden md:block rounded-[26px] bg-gradient-to-br from-white/[0.09] via-transparent via-35% to-transparent ring-1 ring-inset ring-white/10" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#03070b]/85 to-transparent md:h-24 md:from-black/50" />

              {/* Story progress */}
              <div className="absolute inset-x-5 top-[84px] sm:top-[92px] md:inset-x-4 md:top-4 z-10 flex gap-1.5" role="tablist" aria-label="Stories">
                {stories.map((s, i) => (
                  <button key={s.slug} type="button" role="tab" aria-selected={i === index} aria-label={`Story ${i + 1}: ${s.title}`} onClick={() => setIndex(i)} className="relative h-5 flex-1 flex items-center">
                    <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-white/25">
                      <span
                        ref={(el) => {
                          barRefs.current[i] = el;
                        }}
                        className="absolute inset-0 origin-left bg-white"
                        style={{ transform: `scaleX(${i < index ? 1 : 0})` }}
                      />
                    </span>
                  </button>
                ))}
              </div>

              {/* Caption + small controls */}
              <div className="absolute inset-x-5 top-[110px] sm:top-[118px] md:inset-x-4 md:top-auto md:bottom-4 z-10 flex items-center justify-between md:justify-end gap-3">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={story.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="inline-flex md:hidden min-w-0 items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.2em] text-white/85"
                  >
                    <MapPin className="w-3 h-3 shrink-0 text-[#D72731]" /> <span className="truncate">{story.hero?.sub}</span>
                  </motion.span>
                </AnimatePresence>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button type="button" data-sound-control onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? "Turn sound on" : "Turn sound off"} className={iconBtn}>
                    {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <button type="button" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"} className={iconBtn}>
                    {playing ? <Pause className="w-3.5 h-3.5" fill="currentColor" /> : <Play className="w-3.5 h-3.5 translate-x-px" fill="currentColor" />}
                  </button>
                </div>
              </div>

              {/* Prev / next on hover — mouse only; touch screens swipe the card instead */}
              <button type="button" onClick={() => go(-1)} aria-label="Previous story" className="hidden md:pointer-fine:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/35 backdrop-blur-md border border-white/15 items-center justify-center text-white opacity-0 group-hover/frame:opacity-100 focus-visible:opacity-100 transition-opacity">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next story" className="hidden md:pointer-fine:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/35 backdrop-blur-md border border-white/15 items-center justify-center text-white opacity-0 group-hover/frame:opacity-100 focus-visible:opacity-100 transition-opacity">
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Reduced motion / Data Saver / autoplay blocked: one tap starts the film with sound */}
              {needsTap && (
                <button type="button" data-sound-control onClick={startWithSound} className="absolute inset-0 z-[5] flex items-center justify-center" aria-label="Play the film with sound">
                  <span className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                    <Play className="w-6 h-6 translate-x-0.5" fill="currentColor" />
                  </span>
                </button>
              )}
            </div>

            {/* Caption under the framed card */}
            <div className="absolute inset-x-1 top-full mt-4 hidden md:block">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]">
                <span className="shrink-0 tabular-nums text-white">
                  {String(index + 1).padStart(2, "0")}
                  <span className="text-white/35"> / {String(stories.length).padStart(2, "0")}</span>
                </span>
                <span className="h-px flex-1 bg-white/15" />
                <span className="shrink-0 text-white/40">{story.kind}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={story.slug}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mt-2 flex items-start gap-1.5 text-[9.5px] font-bold uppercase leading-relaxed tracking-[0.16em] text-white/75"
                >
                  <MapPin className="mt-[2px] w-3 h-3 shrink-0 text-[#D72731]" /> {story.hero?.sub}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
