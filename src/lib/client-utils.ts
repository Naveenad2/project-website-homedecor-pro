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
