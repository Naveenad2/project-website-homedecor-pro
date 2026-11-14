import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import PageShell, { Breadcrumbs, CONTAINER } from "@/components/layout/PageShell";
import PreviewMedia from "@/components/media/PreviewMedia";
import FilmGrid from "@/components/media/FilmGrid";
import CatalogueLibrary from "@/components/sections/CatalogueLibrary";
import { ProductGrid } from "@/components/sections/ProductShowcase";
import ProductTypeCards from "@/components/sections/ProductTypeCards";
import FAQ from "@/components/sections/FAQ";
import { PostGrid } from "@/components/blog/PostCard";
import JsonLd from "@/components/ui/JsonLd";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { PRODUCTS, categoryLabel, getProduct, productImage, productOgImage, toProductCard } from "@/data/products";
import { filmMedia, filmsForProduct } from "@/data/films";
import { cataloguesForProduct } from "@/data/catalogues";
import { typesForProduct } from "@/data/product-types";
import { getPostsForProduct } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { LD_ID, SITE, absoluteUrl, telLink, waLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.seoTitle,
    description: p.seoDescription,
    path: `/products/${p.slug}`,
    image: productOgImage(p.slug),
    imageAlt: `${p.name} in Kochi — Precise Homes`,
    keywords: p.keywords,
  });
}

const PRODUCT_NAMES = Object.fromEntries(PRODUCTS.map((x) => [x.slug, x.name]));

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const films = filmsForProduct(p.slug);
  const catalogues = cataloguesForProduct(p.slug);
  const types = typesForProduct(p.slug);
  const posts = getPostsForProduct(p.slug, 3);
  const related = PRODUCTS.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 4);
  const more = related.length < 4 ? PRODUCTS.filter((x) => x.slug !== p.slug && x.category !== p.category && x.featured).slice(0, 4 - related.length) : [];
  const preview = p.previewFilm ? filmMedia(p.previewFilm).preview : films[0] ? filmMedia(films[0].slug).preview : undefined;
  const url = absoluteUrl(`/products/${p.slug}`);
  const enquiry = waLink(`Hi Precise Homes! I'm interested in ${p.name}. Please share details and a quote.`);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${p.name} in Kochi`,
        serviceType: categoryLabel(p.category),
        description: p.summary,
        url,
        image: absoluteUrl(productImage(p.slug)),
        brand: p.brand.split(" · ").map((name) => ({ "@type": "Brand", name })),
        provider: { "@id": LD_ID.business },
        areaServed: [{ "@type": "City", name: "Kochi" }, { "@type": "State", name: "Kerala" }, { "@type": "Country", name: "India" }],
        audience: { "@type": "Audience", audienceType: "Homeowners, architects and builders" },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${p.seoTitle} | ${SITE.name}`,
        isPartOf: { "@id": LD_ID.website },
        about: { "@id": `${url}#service` },
        primaryImageOfPage: absoluteUrl(productImage(p.slug)),
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <PageShell>
      <JsonLd data={ld} />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className={`${CONTAINER} pt-32 md:pt-40 pb-14`}>
        <Breadcrumbs items={[{ name: "Products", href: "/products" }, { name: p.name, href: `/products/${p.slug}` }]} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white" style={{ background: p.accent }}>
                {p.brand}
              </span>
              <Link href={`/products#${p.category}`} className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 hover:text-white">
                {categoryLabel(p.category)}
              </Link>
            </div>
            <h1 className="mt-5 text-[clamp(2.2rem,5.6vw,4.6rem)] font-bold leading-[0.96] tracking-tighter">
              {p.name}
              <span className="block text-[#02589F] brightness-[1.35] saturate-[1.6]">in Kochi &amp; Kerala</span>
            </h1>
            <p className="mt-5 text-white/80 text-lg md:text-xl font-semibold leading-snug max-w-2xl">{p.tagline}</p>
            <p className="mt-3 text-white/55 text-[15px] leading-relaxed max-w-2xl">{p.summary}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={enquiry} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:bg-[#1ebe5b] transition-colors">
                <WhatsAppIcon className="w-5 h-5" /> Get a free quote
              </a>
              <a href={telLink} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white/80 hover:text-white hover:border-white/35 transition-colors">
                <Phone className="w-4 h-4" /> {SITE.phoneDisplay}
              </a>
              {p.brandPage && (
                <Link href={p.brandPage} className="inline-flex items-center gap-1.5 px-2 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7cc0ff] hover:text-white transition-colors">
                  See project gallery <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
          <div className="lg:col-span-5">
            <PreviewMedia
              image={productImage(p.slug)}
              preview={preview}
              alt={`${p.name} — installed by Precise Homes in Kerala`}
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
              Why choose {p.name}?
            </h2>
            <div className="mt-5 space-y-4 text-white/60 text-[15px] leading-relaxed">
              {p.intro.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 content-start">
            {p.features.map((f) => (
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

      {/* ── Types (each has its own page) ─────────────────────────────── */}
      {types.length > 0 && (
        <section aria-labelledby="types-title" className={`${CONTAINER} py-12 md:py-16 border-t border-white/[0.07]`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <h2 id="types-title" className="text-2xl md:text-4xl font-bold tracking-tight">
              Choose your type
            </h2>
            <p className="max-w-xl text-white/45 text-[14px] leading-relaxed">
              Each option has its own strengths — compare them, then see them working at our Padivattom experience centre.
            </p>
          </div>
          <ProductTypeCards types={types} />
        </section>
      )}

      {/* ── Specs + applications ──────────────────────────────────────── */}
      <section aria-label="Specifications and applications" className={`${CONTAINER} py-12 md:py-16 border-t border-white/[0.07]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {p.specs && (
            <div className="lg:col-span-7">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Specifications</h2>
              <dl className="mt-5 divide-y divide-white/[0.08] rounded-2xl border border-white/[0.08] overflow-hidden">
                {p.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-6 px-5 py-4 bg-white/[0.02]">
                    <dt className="text-white/40 text-[11px] font-bold uppercase tracking-[0.16em]">{s.label}</dt>
                    <dd className="sm:col-span-2 text-white/80 text-[14px] leading-relaxed">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div className={p.specs ? "lg:col-span-5" : "lg:col-span-12"}>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Where it&apos;s used</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.applications.map((a) => (
                <li key={a} className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-white/75">
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent p-6">
              <p className="text-white text-[16px] font-bold">Visit our experience centre</p>
              <p className="mt-1.5 text-white/50 text-[13.5px] leading-relaxed">
                {SITE.address.street}, {SITE.address.locality} — {SITE.address.landmark}. {SITE.hours.label}.
              </p>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7cc0ff] hover:text-white">
                Get directions <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Films ─────────────────────────────────────────────────────── */}
      {films.length > 0 && (
        <section aria-labelledby="films-title" className={`${CONTAINER} py-12 md:py-16 border-t border-white/[0.07]`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <h2 id="films-title" className="text-2xl md:text-4xl font-bold tracking-tight">
              See it in real homes
            </h2>
            <Link href="/films" className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 hover:text-white">
              All project films →
            </Link>
          </div>
          <FilmGrid films={films} productNames={PRODUCT_NAMES} />
        </section>
      )}

      {/* ── Brochures ─────────────────────────────────────────────────── */}
      {catalogues.length > 0 && (
        <section aria-labelledby="brochures-title" className={`${CONTAINER} py-12 md:py-16 border-t border-white/[0.07]`}>
          <h2 id="brochures-title" className="text-2xl md:text-4xl font-bold tracking-tight mb-8">
            Brochures &amp; catalogues
          </h2>
          <CatalogueLibrary catalogues={catalogues} />
        </section>
      )}

      <FAQ faqs={p.faqs} title={`${p.name}: your questions`} kicker={`FAQ // ${p.brand}`} id="product-faq" />

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

      {/* ── Related ───────────────────────────────────────────────────── */}
      <section aria-labelledby="related-title" className={`${CONTAINER} pb-20 pt-4`}>
        <h2 id="related-title" className="text-2xl md:text-4xl font-bold tracking-tight mb-6">
          You may also like
        </h2>
        <ProductGrid products={[...related, ...more].map(toProductCard)} />
      </section>
    </PageShell>
  );
}
