import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, Phone, Star } from "lucide-react";
import PageShell, { Breadcrumbs, CONTAINER } from "@/components/layout/PageShell";
import FilmGrid from "@/components/media/FilmGrid";
import JsonLd from "@/components/ui/JsonLd";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { getFilm, type Film } from "@/data/films";
import { PRODUCTS } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { FULL_ADDRESS, LD_ID, REVIEW_PATH, SITE, absoluteUrl, telLink, waLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Saint-Gobain Dealer in Padivattom, Kochi",
  description:
    "Visit Precise Homes, Civil Line Road, Padivattom, Kochi (near Azeezia Supermarket), Mon–Sat 9 AM–6 PM. Call or WhatsApp +91 98951 05012 for a free site visit.",
  path: "/contact",
  image: "/media/og/experience-centre-tour.jpg",
  imageAlt: "Precise Homes experience centre, Padivattom, Kochi",
  keywords: ["precise homes contact", "saint gobain dealer kochi", "upvc windows showroom kochi", "precise homes padivattom", "saint gobain experience centre kochi"],
});

const PRODUCT_NAMES = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p.name]));
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(`${SITE.name}, Civil Line Road, Padivattom, Kochi ${SITE.address.postalCode}`)}&output=embed`;

const STEPS = [
  { title: "Send your plan", text: "WhatsApp your plan, window sizes or a few photos — or walk into the experience centre." },
  { title: "Free site visit", text: "We visit anywhere in Kerala to measure precisely and understand each room." },
  { title: "Quotation", text: "You receive a quote based on the measured sizes and the products and glass you choose." },
  { title: "Installation", text: "Trained fitters install and seal every opening, with after-sales support." },
];

export default function ContactPage() {
  const tour = getFilm("experience-centre-tour");
  const tourFilms: Film[] = tour ? [tour] : [];

  const ld = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl("/contact")}#page`,
    url: absoluteUrl("/contact"),
    name: `Contact ${SITE.name}`,
    isPartOf: { "@id": LD_ID.website },
    about: { "@id": LD_ID.business },
    mainEntity: { "@id": LD_ID.business },
    inLanguage: "en-IN",
  };

  const cardCls = "group flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 hover:border-white/[0.18] transition-colors";
  const iconCls = "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#02589F]/15 text-[#7cc0ff]";

  return (
    <PageShell>
      <JsonLd data={ld} />

      <section className={`${CONTAINER} pt-32 md:pt-40 pb-12`}>
        <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="text-[#ff6b72] text-[10px] font-bold uppercase tracking-[0.35em]">Contact // Padivattom · Kochi</p>
            <h1 className="mt-5 text-[clamp(2.3rem,6vw,5rem)] font-bold leading-[0.95] tracking-tighter">
              Visit, call or WhatsApp
              <span className="block text-[#02589F] brightness-[1.35] saturate-[1.6]">our Kochi team.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-white/55 text-[15px] leading-relaxed">
              See Saint-Gobain windows, glass, shower cubicles and cladding at our experience centre — or send us your plan and we&apos;ll come to you, anywhere in Kerala.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Contact details and map" className={`${CONTAINER} pb-14 md:pb-20`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          <address className="not-italic lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 content-start">
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${cardCls} sm:col-span-2 lg:col-span-1`}>
              <span className={iconCls}>
                <MapPin className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Experience centre</span>
                <span className="mt-1.5 block text-white text-[15px] font-semibold leading-relaxed">{FULL_ADDRESS}</span>
                <span className="mt-1 block text-white/45 text-[13px]">{SITE.address.landmark}</span>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7cc0ff] group-hover:text-white">
                  Get directions <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </span>
            </a>
            <a href={telLink} className={cardCls}>
              <span className={iconCls}>
                <Phone className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Call</span>
                <span className="mt-1.5 block text-white text-[16px] font-semibold tabular-nums">{SITE.phoneDisplay}</span>
              </span>
            </a>
            <a href={waLink("Hi Precise Homes! I'd like to book a free site visit.")} target="_blank" rel="noopener noreferrer" className={cardCls}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                <WhatsAppIcon className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">WhatsApp</span>
                <span className="mt-1.5 block text-white text-[16px] font-semibold">Chat with us</span>
              </span>
            </a>
            <a href={`mailto:${SITE.email}`} className={cardCls}>
              <span className={iconCls}>
                <Mail className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Email</span>
                <span className="mt-1.5 block truncate text-white text-[15px] font-semibold">{SITE.email}</span>
              </span>
            </a>
            <div className={cardCls}>
              <span className={iconCls}>
                <Clock className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Opening hours</span>
                <span className="mt-1.5 block text-white text-[15px] font-semibold">{SITE.hours.label}</span>
                <span className="mt-0.5 block text-white/45 text-[13px]">Closed on Sundays</span>
              </span>
            </div>
          </address>

          <div className="lg:col-span-7 min-h-[340px] md:min-h-[460px] overflow-hidden rounded-[26px] ring-1 ring-white/10 bg-[#0b1118]">
            <iframe
              src={MAP_EMBED}
              title={`Map: ${SITE.name}, Padivattom, Kochi`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[340px] md:min-h-[460px] w-full border-0 grayscale-[35%] invert-[0.9] hue-rotate-180 contrast-[0.9]"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className={`${CONTAINER} py-12 md:py-16 border-t border-white/[0.07]`}>
        <h2 id="process-title" className="text-2xl md:text-4xl font-bold tracking-tight">
          How a project works
        </h2>
        <ol className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 md:p-6">
              <span className="text-[#ff6b72] text-[11px] font-bold tabular-nums tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-white text-[17px] font-bold">{s.title}</h3>
              <p className="mt-1.5 text-white/55 text-[14px] leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="areas-title" className={`${CONTAINER} py-12 md:py-16 border-t border-white/[0.07]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 id="areas-title" className="text-2xl md:text-4xl font-bold tracking-tight">
              Areas we serve
            </h2>
            <p className="mt-3 text-white/55 text-[15px] leading-relaxed max-w-xl">
              Based in Padivattom, Kochi, we supply and install across Ernakulam district and the rest of Kerala.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SITE.areaServed.map((a) => (
                <li key={a} className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-white/75">
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#D72731]/15 to-transparent p-6">
              <p className="flex items-center gap-2 text-white text-[17px] font-bold">
                <Star className="w-4 h-4 text-[#FBBC04]" fill="currentColor" /> Happy with our work?
              </p>
              <p className="mt-1.5 text-white/55 text-[14px] leading-relaxed">A short Google review helps other Kerala families find a team they can trust.</p>
              <a
                href={REVIEW_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#03070b] hover:bg-white/85 transition-colors"
              >
                Leave a Google review <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          {tourFilms.length > 0 && (
            <div className="lg:col-span-5">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.24em] mb-4">Take the tour first</p>
              <div className="max-w-[300px]">
                <FilmGrid films={tourFilms} productNames={PRODUCT_NAMES} className="grid grid-cols-1" />
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
