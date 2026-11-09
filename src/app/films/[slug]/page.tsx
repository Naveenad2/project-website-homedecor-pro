import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MapPin, Phone } from "lucide-react";
import PageShell, { Breadcrumbs, CONTAINER } from "@/components/layout/PageShell";
import WatchPlayer from "@/components/media/WatchPlayer";
import FilmGrid from "@/components/media/FilmGrid";
import JsonLd from "@/components/ui/JsonLd";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { FILMS, PROJECTS, filmMedia, filmUploadDate, getFilm } from "@/data/films";
import { PRODUCTS } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { LD_ID, SITE, absoluteUrl, formatDuration, isoDuration, telLink, waLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return FILMS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = getFilm(slug);
  if (!f) return {};
  return buildMetadata({
    title: `${f.title} — ${f.location} (Video)`,
    description: f.description,
    path: `/films/${f.slug}`,
    image: filmMedia(f.slug).og,
    imageAlt: `${f.title} — Precise Homes project film, ${f.location}`,
    keywords: [...f.products.map((p) => p.replace(/-/g, " ")), `${f.location.toLowerCase()} home`, "precise homes video"],
  });
}

const PRODUCT_NAMES = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p.name]));

export default async function FilmPage({ params }: Props) {
  const { slug } = await params;
  const f = getFilm(slug);
  if (!f) notFound();

  const m = filmMedia(f.slug);
  const url = absoluteUrl(`/films/${f.slug}`);
  const sameProject = FILMS.filter((x) => x.project === f.project && x.slug !== f.slug);
  const others = FILMS.filter((x) => x.project !== f.project).slice(0, 10 - Math.min(sameProject.length, 5));
  const projectLabel = PROJECTS.find((p) => p.key === f.project)?.label ?? "";

  const ld = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${url}#video`,
    name: f.title,
    description: f.description,
    thumbnailUrl: [absoluteUrl(m.poster), absoluteUrl(m.og)],
    uploadDate: filmUploadDate(f),
    duration: isoDuration(f.duration),
    contentUrl: absoluteUrl(m.src),
    url,
    inLanguage: "en-IN",
    isFamilyFriendly: true,
    genre: f.kind,
    keywords: f.products.map((p) => PRODUCT_NAMES[p]).filter(Boolean).join(", "),
    contentLocation: { "@type": "Place", name: `${f.location}, Kerala, India` },
    publisher: { "@id": LD_ID.business },
    isPartOf: { "@id": LD_ID.website },
  };

  return (
    <PageShell>
      <JsonLd data={ld} />
      <section className={`${CONTAINER} pt-28 md:pt-36 pb-12`}>
        <Breadcrumbs items={[{ name: "Films", href: "/films" }, { name: f.title, href: `/films/${f.slug}` }]} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-6 xl:col-span-5">
            <WatchPlayer src={m.src} poster={m.poster} title={f.title} />
          </div>
          <div className="lg:col-span-6 xl:col-span-7 lg:pt-6">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]">
              <span className="rounded-full bg-[#D72731] px-3 py-1 text-white">{f.kind}</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-white/70">
                <MapPin className="w-3 h-3" /> {f.location}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-white/70">
                <Clock className="w-3 h-3" /> {formatDuration(f.duration)}
              </span>
            </div>
            <h1 className="mt-5 text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1] tracking-tighter">{f.title}</h1>
            <p className="mt-5 text-white/60 text-[16px] leading-relaxed max-w-2xl">{f.description}</p>

            <div className="mt-7">
              <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.28em]">Products in this film</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {f.products.map((p) =>
                  PRODUCT_NAMES[p] ? (
                    <Link key={p} href={`/products/${p}`} className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-[12.5px] font-semibold text-white/85 hover:bg-white/15 hover:text-white transition-colors">
                      {PRODUCT_NAMES[p]}
                    </Link>
                  ) : null,
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={waLink(`Hi Precise Homes! I watched "${f.title}" and would like something similar for my home.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:bg-[#1ebe5b] transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" /> I want this for my home
              </a>
              <a href={telLink} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white/80 hover:text-white hover:border-white/35 transition-colors">
                <Phone className="w-4 h-4" /> {SITE.phoneDisplay}
              </a>
            </div>
            <Link href="/films" className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> All project films
            </Link>
          </div>
        </div>
      </section>

      {sameProject.length > 0 && (
        <section aria-labelledby="same-project" className={`${CONTAINER} py-10 border-t border-white/[0.07]`}>
          <h2 id="same-project" className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            More from {projectLabel}
          </h2>
          <FilmGrid films={sameProject} productNames={PRODUCT_NAMES} />
        </section>
      )}
      <section aria-labelledby="more-films" className={`${CONTAINER} py-10 pb-20 border-t border-white/[0.07]`}>
        <h2 id="more-films" className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
          More project films
        </h2>
        <FilmGrid films={others} productNames={PRODUCT_NAMES} />
      </section>
    </PageShell>
  );
}
