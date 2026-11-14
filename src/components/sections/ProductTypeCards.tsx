import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type ProductType, productTypeHref, productTypeImage } from "@/data/product-types";

/** Grid of product-type tiles (sliding windows, casements, French doors…). Server-rendered links. */
export default function ProductTypeCards({ types, headingLevel = "h3" }: { types: ProductType[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {types.map((t) => (
        <li key={`${t.parent}/${t.slug}`}>
          <article className="group relative isolate flex h-[230px] md:h-[270px] flex-col justify-end overflow-hidden rounded-2xl bg-[#0b1118] ring-1 ring-white/10 hover:ring-white/25 transition-[box-shadow] duration-500">
            <img
              src={productTypeImage(t)}
              alt=""
              loading="lazy"
              decoding="async"
              width={720}
              height={1080}
              className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
            <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#03070b] via-[#03070b]/55 to-[#03070b]/5" />
            <div className="p-5">
              <Heading className="text-white text-[17px] md:text-[18px] font-bold leading-tight tracking-tight">
                <Link href={productTypeHref(t)} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
                  {t.name}
                </Link>
              </Heading>
              <p className="mt-1.5 text-white/60 text-[12.5px] leading-relaxed line-clamp-2">{t.tagline}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/50 group-hover:text-white transition-colors">
                Explore <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
