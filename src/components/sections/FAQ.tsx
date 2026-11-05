import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import JsonLd from "@/components/ui/JsonLd";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import type { Faq } from "@/data/faqs";
import { SITE, telLink, waLink } from "@/lib/site";
import { syne } from "@/lib/fonts";

/**
 * Server-rendered FAQ using native <details> (works without JS, fully crawlable).
 * The matching FAQPage JSON-LD is generated from the same data, so they never drift apart.
 */
export default function FAQ({
  faqs,
  title = "Questions, answered.",
  kicker = "FAQ // Kochi · Kerala",
  id = "faq",
}: {
  faqs: Faq[];
  title?: string;
  kicker?: string;
  id?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative w-full bg-[#03070b] py-20 md:py-28 ${syne.className}`}>
      <JsonLd data={schema} />
      <div className="relative mx-auto max-w-[1920px] px-5 md:px-10 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-4">
              <span className="h-[2px] w-8 bg-[#D72731]" />
              <span className="text-[#ff6b72] text-[10px] font-bold uppercase tracking-[0.35em]">{kicker}</span>
            </div>
            <h2 id={`${id}-title`} className="mt-6 text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[0.98] tracking-tighter text-white">
              {title}
            </h2>
            <p className="mt-5 text-white/50 text-[14px] leading-relaxed max-w-sm font-medium">
              Can&apos;t find what you&apos;re looking for? Our team in Padivattom, Kochi replies quickly on WhatsApp.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={waLink("Hi Precise Homes! I have a question about your products.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#1ebe5b] transition-colors">
                <WhatsAppIcon className="w-4 h-4" /> Ask on WhatsApp
              </a>
              <a href={telLink} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 hover:text-white hover:border-white/35 transition-colors">
                Call {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-3">
          {faqs.map((f, i) => (
            <details key={f.q} className="group rounded-2xl border border-white/[0.09] bg-white/[0.025] open:bg-white/[0.05] open:border-white/[0.16] transition-colors" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-white text-[15px] md:text-[17px] font-semibold leading-snug">{f.q}</h3>
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-transform duration-300 group-open:rotate-45 group-open:bg-[#D72731] group-open:border-[#D72731] group-open:text-white">
                  <Plus className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-6 -mt-1">
                <p className="text-white/60 text-[14px] leading-relaxed max-w-3xl">{f.a}</p>
                {f.link && (
                  <Link
                    href={f.link.href}
                    {...(f.link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#7cc0ff] hover:text-white transition-colors"
                  >
                    {f.link.label} <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
