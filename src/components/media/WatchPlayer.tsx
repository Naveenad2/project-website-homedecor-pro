"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { armSoundOnFirstInteraction, mediaBus, playWithSoundIfAllowed, prefersLowMotionOrData, setSoundPreference } from "@/lib/client-utils";

/** Watch-page player: autoplays (with sound when the browser allows, otherwise sound on first tap). */
export default function WatchPlayer({ src, poster, title }: { src: string; poster: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!prefersLowMotionOrData()) void playWithSoundIfAllowed(v);
    const disarm = armSoundOnFirstInteraction(() => ref.current);
    const unsub = mediaBus.subscribe((owner) => {
      if (owner && owner !== "watch") v.pause();
    });
    return () => {
      disarm();
      unsub();
    };
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setSoundPreference(v.muted ? "off" : "on");
    if (!v.muted) {
      v.volume = 1;
      mediaBus.announce("watch");
      v.play().catch(() => undefined);
    }
  };

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[min(100%,calc(82svh*9/16))] overflow-hidden rounded-[24px] bg-black ring-1 ring-white/15">
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls
        playsInline
        muted
        preload="metadata"
        aria-label={title}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        className="absolute inset-0 h-full w-full object-contain bg-black"
      />
      <button
        type="button"
        data-sound-control
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white"
      >
        {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
