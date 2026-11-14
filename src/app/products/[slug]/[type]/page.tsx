import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Info, Phone } from "lucide-react";
import PageShell, { Breadcrumbs, CONTAINER } from "@/components/layout/PageShell";
import PreviewMedia from "@/components/media/PreviewMedia";
import FilmGrid from "@/components/media/FilmGrid";
import { ProductGrid } from "@/components/sections/ProductShowcase";
import ProductTypeCards from "@/components/sections/ProductTypeCards";
import FAQ from "@/components/sections/FAQ";
import { PostGrid } from "@/components/blog/PostCard";
import JsonLd from "@/components/ui/JsonLd";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { PRODUCTS, categoryLabel, getProduct, productHref, toProductCard } from "@/data/products";
import { PRODUCT_TYPES, getProductType, productTypeHref, productTypeImage, productTypeOgImage, typesForProduct } from "@/data/product-types";
import { type Film, filmMedia, getFilm } from "@/data/films";
import { getPostsForProduct } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { LD_ID, SITE, absoluteUrl, telLink, waLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string; type: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_TYPES.map((t) => ({ slug: t.parent, type: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, type } = await params;
  const t = getProductType(slug, type);
  if (!t) return {};
  return buildMetadata({
    title: t.seoTitle,
    description: t.seoDescription,
    path: productTypeHref(t),
    image: productTypeOgImage(t),
    imageAlt: `${t.name} in Kochi — Precise Homes`,
    keywords: t.keywords,
  });
}

const PRODUCT_NAMES = Object.fromEntries(PRODUCTS.map((x) => [x.slug, x.name]));

export default async function ProductTypePage({ params }: Props) {
  const { slug, type } = await params;
  const t = getProductType(slug, type);
  const p = getProduct(slug);
  if (!t || !p) notFound();

  const siblings = typesForProduct(p.slug).filter((x) => x.slug !== t.slug);
  // When a product has a single type page, cross-link to related types in the same category instead.
  const others = siblings.length
    ? siblings
    : PRODUCT_TYPES.filter((x) => x.slug !== t.slug && getProduct(x.parent)?.category === p.category).slice(0, 4);
  const films = [t.film, ...(t.films ?? [])]
    .map((s) => (s ? getFilm(s) : undefined))
    .filter((f): f is Film => f !== undefined);
  const posts = getPostsForProduct(p.slug, 3);
  const relatedProducts = [p, ...PRODUCTS.filter((x) => x.slug !== p.slug && x.category === p.category)].slice(0, 4);
  const url = absoluteUrl(productTypeHref(t));
  const enquiry = waLink(`Hi Precise Homes! I'm interested in ${t.name}. Please share details and a quote.`);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${t.name} in Kochi`,
        serviceType: t.name,
        category: categoryLabel(p.category),
        description: t.summary,
        url,
        image: absoluteUrl(productTypeImage(t)),
        brand: p.brand.split(" · ").map((name) => ({ "@type": "Brand", name })),
        provider: { "@id": LD_ID.business },
        isRelatedTo: { "@id": `${absoluteUrl(productHref(p.slug))}#service` },
        areaServed: [{ "@type": "City", name: "Kochi" }, { "@type": "State", name: "Kerala" }, { "@type": "Country", name: "India" }],
        audience: { "@type": "Audience", audienceType: "Homeowners, architects and builders" },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${t.seoTitle} | ${SITE.name}`,
        description: t.seoDescription,
        isPartOf: { "@id": LD_ID.website },
        about: { "@id": `${url}#service` },
        primaryImageOfPage: absoluteUrl(productTypeImage(t)),
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <PageShell>
      <JsonLd data={ld} />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className={`${CONTAINER} pt-32 md:pt-40 pb-14`}>
        <Breadcrumbs
          items={[
            { name: "Products", href: "/products" },
            { name: p.name, href: productHref(p.slug) },
            { name: t.name, href: productTypeHref(t) },
          ]}
        />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white" style={{ background: p.accent }}>
                {p.brand}
              </span>
              <Link href={productHref(p.slug)} className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 hover:text-white">
                {p.name}
              </Link>
            </div>
            <h1 className="mt-5 text-[clamp(2.2rem,5.6vw,4.6rem)] font-bold leading-[0.96] tracking-tighter">
              {t.name}
              <span className="block text-[#02589F] brightness-[1.35] saturate-[1.6]">in Kochi &amp; Kerala</span>
            </h1>
            <p className="mt-5 text-white/80 text-lg md:text-xl font-semibold leading-snug max-w-2xl">{t.tagline}</p>
            <p className="mt-3 text-white/55 text-[15px] leading-relaxed max-w-2xl">{t.summary}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={enquiry} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:bg-[#1ebe5b] transition-colors">
                <WhatsAppIcon className="w-5 h-5" /> Get a free quote
              </a>
              <a href={telLink} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white/80 hover:text-white hover:border-white/35 transition-colors">
                <Phone className="w-4 h-4" /> {SITE.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <PreviewMedia
              image={productTypeImage(t)}
              preview={t.film ? filmMedia(t.film).preview : undefined}
              alt={`${t.name} — installed by Precise Homes in Kerala`}
              className="aspect-[4/5] w-full max-w-[520px] mx-auto rounded-[30px] ring-1 ring-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </section>

      {/* ── Overview + features ───────────────────────────────────────── */}
      <section aria-labelledby="overview-title" className={`${CONTAINER} py-12 md:py-16 border-t border-white/[0.07]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 id="overview-title" className="text-2xl md:text-4xl font-bold tracking-tight">
              Why choose {t.name}?
            </h2>
            <div className="mt-5 space-y-4 text-white/60 text-[15px] leading-relaxed">
              {t.intro.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 content-start">
            {t.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 md:p-6 hover:border-white/[0.16] transition-colors">
                <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: `${p.accent}33` }}>
                  <Check className="w-4 h-4" style={{ color: p.accent === "#02589F" ? "#7cc0ff" : "#fff" }} />
                </span>
                <h3 className="mt-4 text-white text-[16px] font-bold">{f.title}</h3>
                <p className="mt-1.5 text-white/50 text-[13.5px] leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Good to know + best for + specs ───────────────────────────── */}
      <section aria-labelledby="advice-title" className={`${CONTAINER} py-12 md:py-16 border-t border-white/[0.07]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 id="advice-title" className="text-xl md:text-2xl font-bold tracking-tight">
              Good to know before you choose
            </h2>
            <ol className="mt-5 space-y-3">
              {t.goodToKnow.map((g, i) => (
                <li key={g.title} className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D72731]/15 text-[12px] font-bold text-[#ff8a8f]">{i + 1}</span>
                  <div>
                    <h3 className="text-white text-[15.5px] font-bold">{g.title}</h3>
                    <p className="mt-1 text-white/55 text-[14px] leading-relaxed">{g.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            {t.specs && (
              <>
                <h2 className="mt-10 text-xl md:text-2xl font-bold tracking-tight">Specifications</h2>
                <dl className="mt-5 divide-y divide-white/[0.08] rounded-2xl border border-white/[0.08] overflow-hidden">
                  {t.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-6 px-5 py-4 bg-white/[0.02]">
                      <dt className="text-white/40 text-[11px] font-bold uppercase tracking-[0.16em]">{s.label}</dt>
                      <dd className="sm:col-span-2 text-white/80 text-[14px] leading-relaxed">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
          <div className="lg:col-span-5">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Best for</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {t.bestFor.map((a) => (
                <li key={a} className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-white/75">
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent p-6">
              <p className="flex items-center gap-2 text-white text-[16px] font-bold">
                <Info className="w-4 h-4 text-[#7cc0ff]" /> See it before you buy
              </p>
              <p className="mt-1.5 text-white/50 text-[13.5px] leading-relaxed">
                Visit our experience centre: {SITE.address.street}, {SITE.address.locality} — {SITE.address.landmark}. {SITE.hours.label}.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7cc0ff] hover:text-white">
                  Get directions <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <Link href={productHref(p.slug)} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7cc0ff] hover:text-white">
                  All {p.name} <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Films ─────────────────────────────────────────────────────── */}
      {films.length > 0 && (
        <section aria-labelledby="films-title" className={`${CONTAINER} py-12 md:py-16 border-t border-white/[0.07]`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <h2 id="films-title" className="text-2xl md:text-4xl font-bold tracking-tight">
              See it in a real home
            </h2>
            <Link href="/films" className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 hover:text-white">
              All project films →
            </Link>
          </div>
          <FilmGrid films={films} productNames={PRODUCT_NAMES} />
        </section>
      )}

      {/* ── Other types ───────────────────────────────────────────────── */}
      {others.length > 0 && (
        <section aria-labelledby="types-title" className={`${CONTAINER} py-12 md:py-16 border-t border-white/[0.07]`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <h2 id="types-title" className="text-2xl md:text-4xl font-bold tracking-tight">
              {siblings.length ? "Compare other options" : "Related solutions"}
            </h2>
            <Link href={productHref(p.slug)} className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 hover:text-white">
              {p.name} overview →
            </Link>
          </div>
          <ProductTypeCards types={others} />
        </section>
      )}

      <FAQ faqs={t.faqs} title={`${t.name}: your questions`} kicker={`FAQ // ${p.brand}`} id="type-faq" />

      {/* ── Guides ────────────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section aria-labelledby="guides-title" className={`${CONTAINER} pb-14 md:pb-16`}>
          <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-t border-white/[0.08] pt-8">
            <h2 id="guides-title" className="text-2xl md:text-4xl font-bold tracking-tight">
              Helpful guides
            </h2>
            <Link href="/blog" className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 hover:text-white">
              All articles →
            </Link>
          </div>
          <PostGrid posts={posts} />
        </section>
      )}

      {/* ── Related products ──────────────────────────────────────────── */}
      <section aria-labelledby="related-title" className={`${CONTAINER} pb-20 pt-4`}>
        <h2 id="related-title" className="text-2xl md:text-4xl font-bold tracking-tight mb-6">
          You may also like
        </h2>
        <ProductGrid products={relatedProducts.map(toProductCard)} />
      </section>
    </PageShell>
  );
}
