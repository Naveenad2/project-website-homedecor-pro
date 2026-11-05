"use client";

import { useRef } from "react";
import { useInViewPreview } from "./FilmCard";

/** Image with an optional muted preview loop that plays while on screen. */
export default function PreviewMedia({ image, preview, alt, className = "" }: { image: string; preview?: string; alt: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useInViewPreview(ref, preview, 0.3);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={image} alt={alt} width={960} height={1200} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      {preview && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 data-[playing=true]:opacity-100"
        />
      )}
    </div>
  );
}
