import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import JsonLd from "@/components/ui/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { syne } from "@/lib/fonts";

export type Crumb = { name: string; href: string };

/** Visible breadcrumb trail + matching BreadcrumbList structured data. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.href) })),
        }}
      />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-white/40">
        {all.map((c, i) => (
          <span key={c.href} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3 text-white/20" />}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-white/70">
                {c.name}
              </span>
            ) : (
              <Link href={c.href} className="hover:text-white transition-colors">
                {c.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}

/** Shared chrome for the content pages (products, films, catalogues). */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className={`relative min-h-screen bg-[#03070b] text-white overflow-x-clip selection:bg-[#D72731] selection:text-white ${syne.className}`}>
      <Navbar />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden="true">
        <div className="absolute -top-40 left-[10%] w-[700px] h-[700px] rounded-full bg-[#02589F]/[0.10] blur-[170px]" />
        <div className="absolute -top-20 right-[5%] w-[500px] h-[500px] rounded-full bg-[#D72731]/[0.06] blur-[160px]" />
      </div>
      <div className="relative">{children}</div>
      <Footer />
    </main>
  );
}

export const CONTAINER = "mx-auto max-w-[1920px] px-5 md:px-10 lg:px-16 xl:px-20";
