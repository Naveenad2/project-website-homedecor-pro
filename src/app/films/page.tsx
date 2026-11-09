import type { Metadata } from "next";
import PageShell, { Breadcrumbs, CONTAINER } from "@/components/layout/PageShell";
import FilmGrid from "@/components/media/FilmGrid";
import JsonLd from "@/components/ui/JsonLd";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { FILMS, PROJECTS, filmMedia, filmUploadDate } from "@/data/films";
import { PRODUCTS } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { LD_ID, absoluteUrl, formatDuration, isoDuration, waLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Project Films — uPVC Windows, Glass & Cladding in Kerala Homes",
  description:
    "Watch real Precise Homes projects in Kaloor, Kollam, Fort Kochi and Edappally — Saint-Gobain uPVC windows, glass handrails, shower cubicles, Fundermax cladding and homeowner reviews.",
  path: "/films",
  image: "/media/og/kaloor-villa-kochi-aerial.jpg",
  keywords: ["upvc windows kochi video", "saint gobain windows review", "glass handrail kochi", "fundermax cladding kerala", "precise homes projects"],
});

const PRODUCT_NAMES = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p.name]));

export default function FilmsPage() {
  const groups = PROJECTS.filter((p) => p.key !== "all")
    .map((p) => ({ ...p, films: FILMS.filter((f) => f.project === p.key) }))
    .filter((g) => g.films.length);
  const total = FILMS.reduce((s, f) => s + f.duration, 0);

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl("/films"),
    name: "Project films — Precise Homes, Kochi",
    isPartOf: { "@id": LD_ID.website },
    about: { "@id": LD_ID.business },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: FILMS.length,
      itemListElement: FILMS.map((f, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/films/${f.slug}`),
        item: {
          "@type": "VideoObject",
          name: f.title,
          description: f.description,
          thumbnailUrl: [absoluteUrl(filmMedia(f.slug).poster)],
          uploadDate: filmUploadDate(f),
          duration: isoDuration(f.duration),
          contentUrl: absoluteUrl(filmMedia(f.slug).src),
          url: absoluteUrl(`/films/${f.slug}`),
        },
      })),
    },
  };

  return (
    <PageShell>
      <JsonLd data={ld} />
      <section className={`${CONTAINER} pt-32 md:pt-40 pb-6`}>
        <Breadcrumbs items={[{ name: "Films", href: "/films" }]} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="text-[#ff6b72] text-[10px] font-bold uppercase tracking-[0.35em]">Project Films // Real Homes</p>
            <h1 className="mt-5 text-[clamp(2.3rem,6vw,5rem)] font-bold leading-[0.95] tracking-tighter">
              Watch our work
              <span className="block text-[#02589F] brightness-[1.35] saturate-[1.6]">across Kerala.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-white/55 text-[15px] leading-relaxed">
              {FILMS.length} films · {Math.round(total / 60)} minutes of real projects, product demos and homeowner reviews. Tap any film to watch with sound; swipe for the next.
            </p>
            <a href={waLink("Hi Precise Homes! I watched your project films and would like to discuss my home.")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#1ebe5b] transition-colors">
              <WhatsAppIcon className="w-4 h-4" /> Discuss my project
            </a>
          </div>
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.key} id={g.key} aria-labelledby={`films-${g.key}`} className={`${CONTAINER} py-10 md:py-12 scroll-mt-24`}>
          <div className="mb-6 flex items-end justify-between gap-4 border-t border-white/[0.08] pt-8">
            <h2 id={`films-${g.key}`} className="text-2xl md:text-4xl font-bold tracking-tight">
              {g.label}
            </h2>
            <p className="text-white/40 text-[12px] font-semibold">
              {g.films.length} {g.films.length === 1 ? "film" : "films"} · {formatDuration(g.films.reduce((s, f) => s + f.duration, 0))}
            </p>
          </div>
          <FilmGrid films={g.films} productNames={PRODUCT_NAMES} />
        </section>
      ))}
      <div className="h-16" />
    </PageShell>
  );
}
