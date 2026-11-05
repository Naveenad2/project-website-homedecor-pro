import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import CatalogueLibrary from "./CatalogueLibrary";
import { CATALOGUES } from "@/data/catalogues";
import { syne } from "@/lib/fonts";

export default function Catalogues() {
  const pages = CATALOGUES.reduce((n, c) => n + c.pages, 0);
  return (
    <section id="catalogues" aria-labelledby="catalogues-title" className={`relative w-full overflow-hidden bg-[#03070b] py-20 md:py-28 ${syne.className}`}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-[10%] right-[12%] w-[620px] h-[620px] rounded-full bg-[#B08D57]/[0.06] blur-[170px]" />
      </div>
      <div className="relative mx-auto max-w-[1920px] px-5 md:px-10 lg:px-16 xl:px-20">
        <SectionIntro
          id="catalogues-title"
          kicker="Brochures & Catalogues"
          title="Explore before"
          accent="you visit."
          aside={
            <Link href="/catalogues" className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors">
              Open the brochure library <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        >
          <p>
            {CATALOGUES.length} official catalogues — {pages.toLocaleString("en-IN")} pages of iCLAD façades, Fundermax décors, Dimore & Vitrum window systems, Saint-Gobain automatic doors, Novelio wall coverings and Forms+Surfaces. Preview them right here, download the PDF, or get them on WhatsApp.
          </p>
        </SectionIntro>
        <div className="mt-12">
          <CatalogueLibrary catalogues={CATALOGUES} />
        </div>
      </div>
    </section>
  );
}
