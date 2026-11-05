"use client";

import FilmCard from "./FilmCard";
import { useFilmViewer } from "./FilmViewer";
import type { Film } from "@/data/films";

/** Responsive grid of film cards; tapping one opens the full-screen viewer on that film. */
export default function FilmGrid({
  films,
  productNames,
  className = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4",
}: {
  films: Film[];
  productNames: Record<string, string>;
  className?: string;
}) {
  const viewer = useFilmViewer();
  return (
    <div className={className}>
      {films.map((f, i) => (
        <FilmCard key={f.slug} film={f} productNames={productNames} onOpen={() => viewer.open(films, i)} />
      ))}
    </div>
  );
}
