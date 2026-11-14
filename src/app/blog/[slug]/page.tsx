import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ListTree, Phone } from "lucide-react";
import PageShell, { Breadcrumbs, CONTAINER } from "@/components/layout/PageShell";
import PostBody, { QuoteCallout } from "@/components/blog/PostBody";
import { PostGrid } from "@/components/blog/PostCard";
import { ProductGrid } from "@/components/sections/ProductShowcase";
import FAQ from "@/components/sections/FAQ";
import JsonLd from "@/components/ui/JsonLd";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { PRODUCTS, type Product, getProduct, productHref, toProductCard } from "@/data/products";
import { formatPostDate, getAllPosts, getPost, getRelatedPosts, postHref, postIsoDate } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { LD_ID, SITE, absoluteUrl, telLink, waLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    absoluteTitle: true,
    description: post.description,
    path: postHref(post.slug),
    image: post.ogImage,
    imageAlt: post.coverAlt,
    keywords: post.keywords,
    type: "article",
    rss: true,
    article: {
      publishedTime: postIsoDate(post.date),
      modifiedTime: postIsoDate(post.updated ?? post.date),
      section: post.category,
      tags: post.keywords,
    },
  });
}

function Toc({ items }: { items: { id: string; text: string }[] }) {
  return (
    <ol className="space-y-1">
      {items.map((h, i) => (
        <li key={h.id}>
          <a href={`#${h.id}`} className="group flex gap-3 rounded-lg px-2 py-1.5 text-[13.5px] leading-snug text-white/55 hover:bg-white/[0.04] hover:text-white transition-colors">
            <span className="w-5 shrink-0 text-[11px] font-bold tabular-nums text-white/25 group-hover:text-[#ff6b72] pt-px">{String(i + 1).padStart(2, "0")}</span>
            <span>{h.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = absoluteUrl(postHref(post.slug));
  const related = getRelatedPosts(post, 3);
  const products = post.products.map((s) => getProduct(s)).filter((p): p is Product => p !== undefined);
  const shopProducts = products.length ? products.slice(0, 4) : PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const toc = [...post.headings, ...(post.faqs.length ? [{ id: "post-faq", text: "Frequently asked questions" }] : [])];
  const isTeam = post.author === "Precise Homes Team";

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [absoluteUrl(post.ogImage), ...(post.cover !== post.ogImage ? [absoluteUrl(post.cover)] : [])],
    datePublished: postIsoDate(post.date),
    dateModified: postIsoDate(post.updated ?? post.date),
    author: isTeam
      ? { "@type": "Organization", "@id": LD_ID.business, name: SITE.name, url: SITE.url }
      : { "@type": "Person", name: post.author, worksFor: { "@id": LD_ID.business } },
    publisher: { "@id": LD_ID.business },
    isPartOf: { "@type": "Blog", "@id": `${absoluteUrl("/blog")}#blog`, name: `${SITE.name} Blog` },
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    wordCount: post.wordCount,
    inLanguage: "en-IN",
    ...(products.length ? { about: products.map((p) => ({ "@id": `${absoluteUrl(productHref(p.slug))}#service` })) } : {}),
  };

  return (
    <PageShell>
      <JsonLd data={ld} />

      <article>
        <header className={`${CONTAINER} pt-32 md:pt-40`}>
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title, href: postHref(post.slug) }]} />
          <div className="mt-8 max-w-4xl">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
              <span className="text-[#ff6b72]">{post.category}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/20" />
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/20" />
              <span>{post.readingMinutes} min read</span>
            </p>
            <h1 className="mt-5 text-[clamp(2rem,5.2vw,4.1rem)] font-bold leading-[1.02] tracking-tighter">{post.title}</h1>
            <p className="mt-5 max-w-3xl text-white/65 text-[17px] md:text-[19px] leading-relaxed">{post.description}</p>
            <div className="mt-7 flex items-center gap-3">
              <img src="/icons/icon-192.png" alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full ring-1 ring-white/15" />
              <p className="text-[13px] leading-snug text-white/50">
                <span className="font-semibold text-white/85">{post.author}</span>
                <span className="block sm:inline">
                  <span className="hidden sm:inline"> · </span>
                  Saint-Gobain dealer in Kochi since {SITE.foundingYear}
                  {post.updated && (
                    <>
                      {" "}
                      · Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
                    </>
                  )}
                </span>
              </p>
            </div>
          </div>
          <figure className="mt-10">
            <img
              src={post.cover}
              alt={post.coverAlt}
              width={1200}
              height={630}
              fetchPriority="high"
              decoding="async"
              className="w-full aspect-[1200/630] max-h-[640px] object-cover rounded-[22px] md:rounded-[30px] ring-1 ring-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
            />
          </figure>
        </header>

        <div className={`${CONTAINER} pt-10 pb-14 md:pt-14 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16`}>
          {/* Sidebar — first in the DOM so the contents list sits above the article on phones */}
          <aside className="lg:col-span-4 lg:order-2" aria-label="Article tools">
            {toc.length > 1 && (
              <details className="lg:hidden rounded-2xl border border-white/[0.09] bg-white/[0.03] open:bg-white/[0.05]">
                <summary className="flex cursor-pointer list-none items-center gap-2.5 p-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 [&::-webkit-details-marker]:hidden">
                  <ListTree className="w-4 h-4 text-[#ff6b72]" /> On this page
                </summary>
                <nav aria-label="On this page" className="px-2 pb-3">
                  <Toc items={toc} />
                </nav>
              </details>
            )}

            <div className="hidden lg:flex lg:sticky lg:top-28 flex-col gap-4">
              {toc.length > 1 && (
                <nav aria-label="On this page" className="rounded-2xl border border-white/[0.09] bg-white/[0.03] p-4">
                  <p className="px-2 pb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">On this page</p>
                  <Toc items={toc} />
                </nav>
              )}
              {products.length > 0 && (
                <div className="rounded-2xl border border-white/[0.09] bg-white/[0.03] p-4">
                  <p className="px-2 pb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">In this article</p>
                  <ul className="space-y-1">
                    {products.map((p) => (
                      <li key={p.slug}>
                        <Link href={productHref(p.slug)} className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-[13.5px] font-semibold text-white/70 hover:bg-white/[0.04] hover:text-white transition-colors">
                          {p.name}
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-white/30 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#02589F]/20 to-transparent p-5">
                <p className="text-white text-[16px] font-bold">Talk to our team</p>
                <p className="mt-1.5 text-white/55 text-[13px] leading-relaxed">Free site visit anywhere in Kerala. {SITE.hours.label}.</p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={waLink(`Hi Precise Homes! I was reading "${post.title}" and have a question.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#1ebe5b] transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4" /> WhatsApp
                  </a>
                  <a href={telLink} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 hover:text-white hover:border-white/35 transition-colors">
                    <Phone className="w-4 h-4" /> {SITE.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:order-1 min-w-0">
            <div className="max-w-[46rem]">
              <PostBody blocks={post.blocks} topic={post.title} />
              {/* Posts without their own {{cta}} still end with the free-site-visit box */}
              {!post.blocks.some((b) => b.type === "cta") && <QuoteCallout topic={post.title} />}
            </div>
          </div>
        </div>
      </article>

      {post.faqs.length > 0 && <FAQ faqs={post.faqs} title="Questions, answered." kicker={`FAQ // ${post.category}`} id="post-faq" />}

      <section aria-labelledby="shop-title" className={`${CONTAINER} pb-14 md:pb-20`}>
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-t border-white/[0.08] pt-8">
          <h2 id="shop-title" className="text-2xl md:text-4xl font-bold tracking-tight">
            {products.length ? "Products in this guide" : "Popular products"}
          </h2>
          <Link href="/products" className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 hover:text-white">
            All products →
          </Link>
        </div>
        <ProductGrid products={shopProducts.map(toProductCard)} />
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className={`${CONTAINER} pb-20`}>
          <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-t border-white/[0.08] pt-8">
            <h2 id="related-title" className="text-2xl md:text-4xl font-bold tracking-tight">
              Keep reading
            </h2>
            <Link href="/blog" className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 hover:text-white">
              All articles →
            </Link>
          </div>
          <PostGrid posts={related} />
        </section>
      )}
    </PageShell>
  );
}
