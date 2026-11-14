import type { Metadata } from "next";
import Link from "next/link";
import PageShell, { Breadcrumbs, CONTAINER } from "@/components/layout/PageShell";
import { ProductGrid } from "@/components/sections/ProductShowcase";
import JsonLd from "@/components/ui/JsonLd";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { CATEGORIES, PRODUCTS, toProductCard } from "@/data/products";
import { PRODUCT_TYPES, productTypeHref } from "@/data/product-types";
import { buildMetadata } from "@/lib/seo";
import { LD_ID, absoluteUrl, waLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Windows, Glass, Cladding & Surfaces in Kochi — All Products",
  description:
    "Saint-Gobain uPVC & aluminium windows, system aluminium, toughened, laminated & lacquered glass, shower partitions, glass handrails, Fundermax HPL, iCLAD cladding and more — Kochi, Kerala.",
  path: "/products",
  image: "/media/og/products/saint-gobain-upvc-windows.jpg",
  keywords: ["upvc windows kochi", "system aluminium windows", "toughened glass kochi", "shower partitions kochi", "glass handrail kochi", "fundermax cladding", "iclad cladding", "hpl cladding"],
});

const BLURBS: Record<string, string> = {
  "windows-doors": "Saint-Gobain uPVC and aluminium windows, Dimore & Vitrum system aluminium, and Saint-Gobain automatic entrance doors.",
  glass: "Saint-Gobain glass for every room — toughened, laminated and lacquered glass, shower partitions and frameless glass handrails.",
  cladding: "Weather-proof façades and interiors with Fundermax high-pressure laminates and iCLAD sintered stone panels.",
  "walls-surfaces": "Crack-free Novelio wall coverings, Forms+Surfaces decorative glass and metal, and LG Hausys interior surfaces.",
  roofing: "Lightweight, textured Saint-Gobain roofing shingles for sloped roofs, pergolas and gazebos.",
};

export default function ProductsPage() {
  const groups = CATEGORIES.filter((c) => c.key !== "all")
    .map((c) => ({ ...c, items: PRODUCTS.filter((p) => p.category === c.key) }))
    .filter((g) => g.items.length);

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/products")}#page`,
    url: absoluteUrl("/products"),
    name: "Products — Precise Homes, Kochi",
    isPartOf: { "@id": LD_ID.website },
    about: { "@id": LD_ID.business },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: absoluteUrl(`/products/${p.slug}`) })),
    },
  };

  return (
    <PageShell>
      <JsonLd data={ld} />
      <section className={`${CONTAINER} pt-32 md:pt-40 pb-10`}>
        <Breadcrumbs items={[{ name: "Products", href: "/products" }]} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="text-[#ff6b72] text-[10px] font-bold uppercase tracking-[0.35em]">Products // Kochi · Kerala</p>
            <h1 className="mt-5 text-[clamp(2.3rem,6vw,5rem)] font-bold leading-[0.95] tracking-tighter">
              Windows, glass, cladding
              <span className="block text-[#02589F] brightness-[1.35] saturate-[1.6]">&amp; surfaces.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-white/55 text-[15px] leading-relaxed">
              {PRODUCTS.length} product lines from Saint-Gobain, Fundermax, iCLAD, Dimore, Vitrum, Novelio, Forms+Surfaces and LG Hausys — supplied and installed by our Kochi team across Kerala.
            </p>
            <a href={waLink("Hi Precise Homes! Can you help me choose the right products for my home?")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#1ebe5b] transition-colors">
              <WhatsAppIcon className="w-4 h-4" /> Help me choose
            </a>
          </div>
        </div>
        <nav aria-label="Product categories" className="mt-10 flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
          {groups.map((g) => (
            <a key={g.key} href={`#${g.key}`} className="shrink-0 rounded-full border border-white/12 px-4 py-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/60 hover:text-white hover:border-white/30 transition-colors">
              {g.label} <span className="text-white/30">{g.items.length}</span>
            </a>
          ))}
        </nav>
        <div className="mt-7">
          <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.24em]">Popular types</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {PRODUCT_TYPES.map((t) => (
              <li key={`${t.parent}/${t.slug}`}>
                <Link
                  href={productTypeHref(t)}
                  className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] font-semibold text-white/65 hover:text-white hover:border-white/30 transition-colors"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.key} id={g.key} aria-labelledby={`${g.key}-title`} className={`${CONTAINER} py-10 md:py-14 scroll-mt-24`}>
          <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-t border-white/[0.08] pt-8">
            <h2 id={`${g.key}-title`} className="text-2xl md:text-4xl font-bold tracking-tight">
              {g.label}
            </h2>
            <p className="max-w-xl text-white/45 text-[14px] leading-relaxed">{BLURBS[g.key]}</p>
          </div>
          <ProductGrid products={g.items.map(toProductCard)} />
        </section>
      ))}
      <div className="h-16" />
    </PageShell>
  );
}
