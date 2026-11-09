import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import CatalogueLibrary from "./CatalogueLibrary";
import { CATALOGUES } from "@/data/catalogues";
import { syne } from "@/lib/fonts";

const HOME_CATALOGUES = ["iclad-facade-cladding-catalogue", "fundermax-max-compact-exterior", "dimore-aluminium-windows-doors", "saint-gobain-automatic-doors", "novelio-wall-coverings-brochure"];

export default function Catalogues() {
  const featured = HOME_CATALOGUES.map((s) => CATALOGUES.find((c) => c.slug === s)).filter((c) => c !== undefined);
  return (
    <section id="catalogues" aria-labelledby="catalogues-title" className={`relative w-full overflow-hidden bg-[#03070b] py-20 md:py-24 ${syne.className}`}>
      <div className="relative mx-auto max-w-[1920px] px-5 md:px-10 lg:px-16 xl:px-20">
        <SectionIntro id="catalogues-title" kicker="Brochures" title="Catalogues to" accent="browse.">
          <p>Preview or download the official brochures — or ask us to send them on WhatsApp.</p>
          <Link href="/catalogues" className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/60 hover:text-white transition-colors">
            All {CATALOGUES.length} catalogues <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </SectionIntro>
        <div className="mt-10">
          <CatalogueLibrary catalogues={featured} layout="rail" />
        </div>
      </div>
    </section>
  );
}
