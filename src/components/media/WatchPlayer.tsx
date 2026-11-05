"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { mediaBus, prefersLowMotionOrData } from "@/lib/client-utils";

/** Watch-page player: native controls, muted autoplay, one-tap sound, yields to the film viewer. */
export default function WatchPlayer({ src, poster, title }: { src: string; poster: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (prefersLowMotionOrData()) v.pause();
    else v.play().catch(() => undefined);
    return mediaBus.subscribe((owner) => {
      if (owner && owner !== "watch") v.pause();
    });
  }, []);

  const unmute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    mediaBus.announce("watch");
    v.play().catch(() => undefined);
  };

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[min(100%,calc(82svh*9/16))] overflow-hidden rounded-[28px] bg-black ring-1 ring-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls
        playsInline
        muted
        autoPlay
        preload="metadata"
        aria-label={title}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        className="absolute inset-0 h-full w-full object-contain bg-black"
      />
      {muted && (
        <button
          type="button"
          onClick={unmute}
          className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#03070b] shadow-[0_8px_30px_rgba(255,255,255,0.25)]"
        >
          <Volume2 className="w-4 h-4" /> Tap for sound
        </button>
      )}
    </div>
  );
}
