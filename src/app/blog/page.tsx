import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Rss } from "lucide-react";
import PageShell, { Breadcrumbs, CONTAINER } from "@/components/layout/PageShell";
import { FeaturedPostCard, PostGrid } from "@/components/blog/PostCard";
import { QuoteCallout } from "@/components/blog/PostBody";
import JsonLd from "@/components/ui/JsonLd";
import { PRODUCT_TYPES, productTypeHref } from "@/data/product-types";
import { getAllPosts, postHref, postIsoDate } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { LD_ID, SITE, absoluteUrl } from "@/lib/site";

const TITLE = "Blog — Window & Glass Guides for Kerala Homes";
const DESCRIPTION =
  "Practical guides from Precise Homes, Kochi: choosing uPVC and aluminium windows, stopping monsoon leaks and picking the right safety glass for Kerala homes.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/blog",
  image: "/media/og/kaloor-villa-kochi-aerial.jpg",
  imageAlt: "Precise Homes blog — guides for Kerala homes",
  keywords: ["upvc windows guide kerala", "best upvc windows kerala", "window buying guide india", "glass guide kochi", "home renovation kerala blog"],
  rss: true,
});

export default function BlogPage() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;
  const categories = [...new Set(posts.map((p) => p.category))];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    url: absoluteUrl("/blog"),
    name: `${SITE.name} Blog`,
    description: DESCRIPTION,
    inLanguage: "en-IN",
    isPartOf: { "@id": LD_ID.website },
    publisher: { "@id": LD_ID.business },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(postHref(p.slug))}#article`,
      headline: p.title,
      url: absoluteUrl(postHref(p.slug)),
      datePublished: postIsoDate(p.date),
      dateModified: postIsoDate(p.updated ?? p.date),
      image: absoluteUrl(p.ogImage),
    })),
  };

  return (
    <PageShell>
      <JsonLd data={ld} />

      <section className={`${CONTAINER} pt-32 md:pt-40 pb-10 md:pb-12`}>
        <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="text-[#ff6b72] text-[10px] font-bold uppercase tracking-[0.35em]">Journal // Kochi · Kerala</p>
            <h1 className="mt-5 text-[clamp(2.3rem,6vw,5rem)] font-bold leading-[0.95] tracking-tighter">
              Guides for
              <span className="block text-[#02589F] brightness-[1.35] saturate-[1.6]">Kerala homes.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-white/55 text-[15px] leading-relaxed">
              Straight answers from the team that measures, supplies and installs windows, glass and cladding across Kerala every week — written for homeowners, architects and builders.
            </p>
            {categories.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Topics">
                {categories.map((c) => (
                  <li key={c} className="rounded-full border border-white/12 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {lead ? (
        <>
          <section aria-label="Latest article" className={`${CONTAINER} pb-10 md:pb-14`}>
            <FeaturedPostCard post={lead} />
          </section>
          {rest.length > 0 && (
            <section aria-labelledby="all-articles" className={`${CONTAINER} pb-14 md:pb-20`}>
              <h2 id="all-articles" className="mb-6 border-t border-white/[0.08] pt-8 text-2xl md:text-4xl font-bold tracking-tight">
                More articles
              </h2>
              <PostGrid posts={rest} />
            </section>
          )}
        </>
      ) : (
        <section className={`${CONTAINER} pb-16`}>
          <p className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-white/60">New guides are on the way — check back soon.</p>
        </section>
      )}

      {/* Popular product pages — helps readers (and Google) move from advice to products */}
      <section aria-labelledby="popular-title" className={`${CONTAINER} pb-14 md:pb-20`}>
        <div className="border-t border-white/[0.08] pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <h2 id="popular-title" className="text-2xl md:text-3xl font-bold tracking-tight">
              Popular in Kochi
            </h2>
            <p className="mt-3 text-white/50 text-[14px] leading-relaxed">The window, glass and cladding types people ask us about most.</p>
            <a href="/blog/rss.xml" className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45 hover:text-white transition-colors">
              <Rss className="w-3.5 h-3.5" /> RSS feed
            </a>
          </div>
          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRODUCT_TYPES.map((t) => (
              <li key={`${t.parent}/${t.slug}`}>
                <Link
                  href={productTypeHref(t)}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[14px] font-semibold text-white/75 hover:text-white hover:border-white/20 transition-colors"
                >
                  {t.name} in Kochi
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-white/30 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Free site visit" className={`${CONTAINER} pb-20`}>
        <div className="max-w-4xl">
          <QuoteCallout />
        </div>
      </section>
    </PageShell>
  );
}
