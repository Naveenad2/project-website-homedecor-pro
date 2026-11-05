import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import ProductShowcase from "./ProductShowcase";
import { PRODUCTS, toProductCard } from "@/data/products";
import { syne } from "@/lib/fonts";

export default function Products() {
  return (
    <section id="products" aria-labelledby="products-title" className={`relative w-full overflow-hidden bg-[#03070b] py-20 md:py-28 ${syne.className}`}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-[8%] w-[680px] h-[680px] rounded-full bg-[#02589F]/[0.09] blur-[170px]" />
        <div className="absolute bottom-[10%] right-[-8%] w-[560px] h-[560px] rounded-full bg-[#D72731]/[0.05] blur-[160px]" />
      </div>
      <div className="relative mx-auto max-w-[1920px] px-5 md:px-10 lg:px-16 xl:px-20">
        <SectionIntro
          id="products-title"
          kicker="Our Products // Kochi · Kerala"
          title="Everything your home needs."
          accent="Precisely installed."
          aside={
            <Link href="/products" className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors">
              Browse all {PRODUCTS.length} products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <p>
            From <strong className="text-white/80 font-semibold">Saint-Gobain uPVC and aluminium windows</strong> to toughened, laminated and lacquered glass, shower partitions, glass handrails and{" "}
            <strong className="text-white/80 font-semibold">Fundermax HPL and iCLAD façade cladding</strong> — see, touch and choose at our Padivattom experience centre, then let our team install it right.
          </p>
        </SectionIntro>
        <div className="mt-10">
          <ProductShowcase products={PRODUCTS.map(toProductCard)} />
        </div>
      </div>
    </section>
  );
}
