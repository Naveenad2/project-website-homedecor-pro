import type { Metadata } from "next";
import Link from "next/link";
import PageShell, { Breadcrumbs, CONTAINER } from "@/components/layout/PageShell";
import CatalogueLibrary from "@/components/sections/CatalogueLibrary";
import JsonLd from "@/components/ui/JsonLd";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { CATALOGUES, catalogueAssets } from "@/data/catalogues";
import { getProduct } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { LD_ID, absoluteUrl, waLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Brochures & Catalogues — iCLAD, Fundermax, Dimore, Novelio",
  description:
    "Preview or download official catalogues: iCLAD sintered stone cladding, Fundermax Max Compact Exterior, Dimore & Vitrum aluminium windows, Saint-Gobain automatic doors, Novelio and Forms+Surfaces.",
  path: "/catalogues",
  image: "/media/og/products/iclad-cladding.jpg",
  keywords: ["iclad cladding catalogue", "fundermax catalogue", "dimore windows brochure", "novelio wall covering catalogue", "saint gobain automatic door brochure"],
});

export default function CataloguesPage() {
  const pages = CATALOGUES.reduce((n, c) => n + c.pages, 0);
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl("/catalogues"),
    name: "Brochures & catalogues — Precise Homes, Kochi",
    isPartOf: { "@id": LD_ID.website },
    about: { "@id": LD_ID.business },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: CATALOGUES.length,
      itemListElement: CATALOGUES.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "DigitalDocument",
          name: c.title,
          description: c.description,
          url: absoluteUrl(catalogueAssets(c).pdf),
          encodingFormat: "application/pdf",
          numberOfPages: c.pages,
          thumbnailUrl: absoluteUrl(catalogueAssets(c).cover),
          about: { "@type": "Brand", name: c.brand },
        },
      })),
    },
  };

  return (
    <PageShell>
      <JsonLd data={ld} />
      <section className={`${CONTAINER} pt-32 md:pt-40 pb-12`}>
        <Breadcrumbs items={[{ name: "Catalogues", href: "/catalogues" }]} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="text-[#ff6b72] text-[10px] font-bold uppercase tracking-[0.35em]">Brochure Library</p>
            <h1 className="mt-5 text-[clamp(2.3rem,6vw,5rem)] font-bold leading-[0.95] tracking-tighter">
              Brochures &amp;
              <span className="block text-[#02589F] brightness-[1.35] saturate-[1.6]">catalogues.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-white/55 text-[15px] leading-relaxed">
              {CATALOGUES.length} catalogues and {pages.toLocaleString("en-IN")} pages of colours, profiles and specifications. Preview instantly, download the PDF, or ask us to WhatsApp it to you.
            </p>
            <a href={waLink("Hi Precise Homes! Please send me your brochures and catalogues.")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#1ebe5b] transition-colors">
              <WhatsAppIcon className="w-4 h-4" /> Send me the brochures
            </a>
          </div>
        </div>
      </section>

      <section aria-label="All catalogues" className={`${CONTAINER} pb-16`}>
        <CatalogueLibrary catalogues={CATALOGUES} />
      </section>

      <section aria-labelledby="by-product" className={`${CONTAINER} pb-24`}>
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-10">
          <h2 id="by-product" className="text-xl md:text-2xl font-bold tracking-tight">Find a brochure by product</h2>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {CATALOGUES.flatMap((c) => c.products)
              .filter((p, i, a) => a.indexOf(p) === i)
              .map((slug) => getProduct(slug))
              .filter((p) => p !== undefined)
              .map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="text-white/60 text-[14px] font-semibold hover:text-white transition-colors">
                    {p.name} →
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
