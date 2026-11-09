import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import { ProductRail } from "./ProductShowcase";
import { PRODUCTS, getProduct, toProductCard } from "@/data/products";
import { syne } from "@/lib/fonts";

// Homepage shows a focused selection; the full range lives on /products.
const HOME_SELECTION = [
  "saint-gobain-upvc-windows",
  "system-aluminium-windows",
  "toughened-glass",
  "shower-partitions",
  "glass-handrails",
  "fundermax-hpl-cladding",
  "iclad-cladding",
  "lacquered-glass",
];

export default function Products() {
  const items = HOME_SELECTION.map((s) => getProduct(s)).filter((p) => p !== undefined);
  return (
    <section id="products" aria-labelledby="products-title" className={`relative w-full bg-[#03070b] py-20 md:py-24 ${syne.className}`}>
      <div className="relative mx-auto max-w-[1920px] px-5 md:px-10 lg:px-16 xl:px-20">
        <SectionIntro id="products-title" kicker="Products // Kochi" title="What we supply" accent="and install.">
          <p>Saint-Gobain windows and glass, Fundermax and iCLAD cladding — see them at our Padivattom experience centre.</p>
        </SectionIntro>
        <div className="mt-10">
          <ProductRail products={items.map(toProductCard)} />
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75 hover:text-white hover:border-white/35 transition-colors"
          >
            View all {PRODUCTS.length} products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
