"use client";

import { useCallback, useEffect, useEffectEvent, useSyncExternalStore } from "react";

// ─── Scroll lock (ref-counted so stacked overlays don't unlock each other) ───
let lockCount = 0;
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    if (lockCount === 0) {
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;
    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        html.style.overflow = "";
        document.body.style.overflow = "";
      }
    };
  }, [active]);
}

// ─── Media bus: only one source plays with sound at a time ───────────────────
// A player announces itself when it starts audible playback; others pause.
// `null` means "nobody has the stage" (e.g. the film viewer closed).
type Listener = (owner: string | null) => void;
const listeners = new Set<Listener>();
export const mediaBus = {
  announce(owner: string | null) {
    listeners.forEach((l) => l(owner));
  },
  subscribe(l: Listener) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};

// ─── Environment preferences ─────────────────────────────────────────────────
type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** True when autoplaying video should be avoided (reduced motion or Data Saver). */
export function prefersLowMotionOrData(): boolean {
  if (typeof window === "undefined") return false;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  const slow = conn?.saveData === true || conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";
  return reduced || slow;
}

function subscribeLowMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  const conn = (navigator as Navigator & { connection?: NetworkInformation & EventTarget }).connection;
  conn?.addEventListener?.("change", onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    conn?.removeEventListener?.("change", onChange);
  };
}

/** Hydration-safe subscription to reduced-motion / Data Saver (false on the server). */
export function useLowMotion(): boolean {
  return useSyncExternalStore(subscribeLowMotion, prefersLowMotionOrData, () => false);
}

// ─── Automatic sound ─────────────────────────────────────────────────────────
// Browsers never let a page *start* audio before the visitor interacts with it.
// So: try to play with sound; if refused, play muted and switch sound on at the
// visitor's first tap / click / key press anywhere on the page. A visitor who
// mutes on purpose is remembered and never auto-unmuted again.
const SOUND_PREF_KEY = "ph-sound";

export function soundPreference(): "on" | "off" | null {
  try {
    const v = window.localStorage.getItem(SOUND_PREF_KEY);
    return v === "on" || v === "off" ? v : null;
  } catch {
    return null;
  }
}

export function setSoundPreference(value: "on" | "off") {
  try {
    window.localStorage.setItem(SOUND_PREF_KEY, value);
  } catch {
    /* storage unavailable (private mode) */
  }
}

/** Start playback, with sound if the browser allows it, otherwise muted. Resolves to whether sound is on. */
export async function playWithSoundIfAllowed(v: HTMLVideoElement): Promise<boolean> {
  if (soundPreference() !== "off") {
    v.muted = false;
    try {
      await v.play();
      return true;
    } catch {
      /* autoplay with sound refused — fall back to muted */
    }
  }
  v.muted = true;
  try {
    await v.play();
  } catch {
    /* even muted autoplay refused (rare: Data Saver / OS power saving) */
  }
  return false;
}

const ACTIVATION_EVENTS = ["pointerdown", "touchend", "keydown", "click"] as const;

/**
 * Unmute `getVideo()` at the first real user activation (tap/click/key) on the page.
 * `canUnmute` lets the caller skip it (e.g. the video is scrolled out of view).
 * Returns a cleanup function.
 */
export function armSoundOnFirstInteraction(getVideo: () => HTMLVideoElement | null, canUnmute: () => boolean = () => true) {
  const detach = () => ACTIVATION_EVENTS.forEach((e) => document.removeEventListener(e, handler, true));
  function handler(e: Event) {
    if (soundPreference() === "off") return detach();
    const v = getVideo();
    if (!v || !v.muted) return detach();
    if (!canUnmute()) return;
    if (e instanceof KeyboardEvent && (e.key === "Escape" || e.key === "Tab")) return;
    // Taps on the player's own sound controls are handled by those controls.
    if (e.target instanceof Element && e.target.closest("[data-sound-control]")) return;
    v.muted = false;
    v.volume = 1;
    v.play().catch(() => {
      v.muted = true;
    });
    detach();
  }
  ACTIVATION_EVENTS.forEach((e) => document.addEventListener(e, handler, { capture: true, passive: true }));
  return detach;
}

export function safeSession(key: string, value?: string): string | null {
  try {
    if (value === undefined) return window.sessionStorage.getItem(key);
    window.sessionStorage.setItem(key, value);
    return value;
  } catch {
    return null;
  }
}

/**
 * Close an overlay with the phone's Back button.
 * While open, a history entry is pushed (Next.js' patched pushState copies its own
 * router state into it, so going back never reloads the page); `popstate` closes it.
 * UI close buttons must call the returned `requestClose`, which rewinds that entry.
 * History is never touched in effect cleanup, so React Strict Mode's double effects
 * in development can't close the overlay on open.
 */
export function useBackButtonClose(open: boolean, onClose: () => void) {
  const onPop = useEffectEvent(() => onClose());
  useEffect(() => {
    if (!open) return;
    if (!window.history.state?.phOverlay) window.history.pushState({ phOverlay: true }, "");
    const handler = () => onPop();
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [open]);
  return useCallback(() => {
    if (window.history.state?.phOverlay) window.history.back();
    else onClose();
  }, [onClose]);
}
