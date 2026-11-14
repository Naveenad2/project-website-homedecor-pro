import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import FilmGrid from "@/components/media/FilmGrid";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import type { Block } from "@/lib/blog";
import { getFilm } from "@/data/films";
import { PRODUCTS, getProduct, productHref, productImage } from "@/data/products";
import { getProductType, productTypeHref, productTypeImage } from "@/data/product-types";
import { SITE, telLink, waLink } from "@/lib/site";

const PRODUCT_NAMES = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p.name]));

// ── Inline Markdown: **bold**, *italic*, `code`, [links](/path) ─────────────

const INLINE_RE = /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)|\*\*(.+?)\*\*|\*(?!\s)(.+?)(?<!\s)\*|`([^`]+)`/g;
const LINK_CLASS =
  "font-semibold text-[#7cc0ff] underline decoration-[#7cc0ff]/35 underline-offset-[5px] hover:text-white hover:decoration-white/60 transition-colors";

function InlineLink({ href, title, children }: { href: string; title?: string; children: ReactNode }) {
  // Absolute links to this site become internal links.
  const local = href.startsWith(SITE.url) ? href.slice(SITE.url.length) || "/" : href;
  if (local.startsWith("/") || local.startsWith("#")) {
    return (
      <Link href={local} title={title} className={LINK_CLASS}>
        {children}
      </Link>
    );
  }
  if (/^(mailto:|tel:)/i.test(local)) {
    return (
      <a href={local} className={LINK_CLASS}>
        {children}
      </a>
    );
  }
  if (/^https?:\/\//i.test(local)) {
    return (
      <a href={local} title={title} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
        {children}
      </a>
    );
  }
  return <>{children}</>; // anything else (e.g. javascript:) is rendered as plain text
}

export function renderInline(text: string, key = "i"): ReactNode[] {
  const out: ReactNode[] = [];
  const re = new RegExp(INLINE_RE.source, "g");
  let last = 0;
  let n = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}.${n++}`;
    if (m[1] !== undefined) {
      out.push(
        <InlineLink key={k} href={m[2]} title={m[3]}>
          {renderInline(m[1], k)}
        </InlineLink>,
      );
    } else if (m[4] !== undefined) {
      out.push(
        <strong key={k} className="font-bold text-white">
          {renderInline(m[4], k)}
        </strong>,
      );
    } else if (m[5] !== undefined) {
      out.push(<em key={k}>{renderInline(m[5], k)}</em>);
    } else if (m[6] !== undefined) {
      out.push(
        <code key={k} className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[0.9em] text-white/90">
          {m[6]}
        </code>,
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// ── Embeds ───────────────────────────────────────────────────────────────────

function FilmEmbed({ slug }: { slug: string }) {
  const film = getFilm(slug);
  if (!film) return null;
  return (
    <figure className="mt-9 grid grid-cols-[minmax(0,9.5rem)_1fr] sm:grid-cols-[12rem_1fr] items-center gap-4 sm:gap-6 rounded-[26px] border border-white/[0.08] bg-white/[0.03] p-3 sm:p-4">
      <FilmGrid films={[film]} productNames={PRODUCT_NAMES} className="grid grid-cols-1" />
      <figcaption className="min-w-0 pr-1">
        <p className="text-[#ff6b72] text-[9.5px] font-bold uppercase tracking-[0.24em]">Project film · {film.location}</p>
        <p className="mt-2 text-white text-[16px] sm:text-[18px] font-bold leading-snug">{film.title}</p>
        <p className="mt-1.5 text-white/55 text-[13px] sm:text-[14px] leading-relaxed line-clamp-4 sm:line-clamp-none">{film.description}</p>
        <Link href={`/films/${film.slug}`} className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7cc0ff] hover:text-white transition-colors">
          Film page <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </figcaption>
    </figure>
  );
}

function ProductEmbed({ slug }: { slug: string }) {
  const [parentSlug, typeSlug] = slug.split("/");
  const t = typeSlug ? getProductType(parentSlug, typeSlug) : undefined;
  const p = getProduct(parentSlug);
  if (!p || (typeSlug && !t)) return null;
  const name = t ? t.name : p.name;
  const href = t ? productTypeHref(t) : productHref(p.slug);
  const image = t ? productTypeImage(t) : productImage(p.slug);
  const line = t ? t.tagline : p.tagline;
  return (
    <aside className="mt-9 flex items-stretch gap-4 sm:gap-5 rounded-[26px] border border-white/[0.08] bg-white/[0.03] p-3 sm:p-4">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block w-24 sm:w-32 shrink-0 overflow-hidden rounded-2xl bg-[#0b1118]">
        <img src={image} alt="" loading="lazy" decoding="async" width={720} height={900} className="absolute inset-0 h-full w-full object-cover" />
      </Link>
      <div className="min-w-0 flex flex-col justify-center py-1">
        <p className="text-white/45 text-[9.5px] font-bold uppercase tracking-[0.24em]">{p.brand}</p>
        <p className="mt-1.5 text-white text-[16px] sm:text-[18px] font-bold leading-snug">
          <Link href={href} className="hover:text-[#7cc0ff] transition-colors">
            {name}
          </Link>
        </p>
        <p className="mt-1 text-white/55 text-[13px] sm:text-[14px] leading-relaxed">{line}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Link href={href} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 hover:text-white hover:border-white/35 transition-colors">
            Details <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={waLink(`Hi Precise Homes! I read your article and I'm interested in ${name}. Please share details and a quote.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white hover:bg-[#1ebe5b] transition-colors"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" /> Quote
          </a>
        </div>
      </div>
    </aside>
  );
}

export function QuoteCallout({ topic }: { topic?: string }) {
  return (
    <aside className="mt-10 overflow-hidden rounded-[26px] border border-white/[0.1] bg-gradient-to-br from-[#02589F]/25 via-white/[0.03] to-[#D72731]/10 p-6 md:p-7">
      <p className="text-[#ff6b72] text-[10px] font-bold uppercase tracking-[0.28em]">Free site visit</p>
      <p className="mt-3 text-white text-[20px] md:text-[23px] font-bold leading-tight tracking-tight">Planning this for your home?</p>
      <p className="mt-2 text-white/60 text-[14.5px] leading-relaxed max-w-xl">
        Send your plan, window sizes or a few photos on WhatsApp — our Kochi team replies quickly, then visits to measure anywhere in Kerala.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={waLink(`Hi Precise Homes! I'd like a free site visit${topic ? ` — I was reading "${topic}"` : ""}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:bg-[#1ebe5b] transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4" /> WhatsApp us
        </a>
        <a href={telLink} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 hover:text-white hover:border-white/35 transition-colors">
          <Phone className="w-4 h-4" /> {SITE.phoneDisplay}
        </a>
      </div>
    </aside>
  );
}

// ── Blocks ───────────────────────────────────────────────────────────────────

const ALIGN = { left: "text-left", center: "text-center", right: "text-right" } as const;

function BlockView({ b, k, topic }: { b: Block; k: string; topic: string }) {
  switch (b.type) {
    case "heading": {
      if (b.level === 2)
        return (
          <h2 id={b.id} className="scroll-mt-28 mt-14 first:mt-0 text-[clamp(1.55rem,3.2vw,2.15rem)] font-bold leading-[1.15] tracking-tight text-white">
            {renderInline(b.text, k)}
          </h2>
        );
      if (b.level === 3)
        return (
          <h3 id={b.id} className="scroll-mt-28 mt-10 text-[19px] md:text-[21px] font-bold leading-snug tracking-tight text-white">
            {renderInline(b.text, k)}
          </h3>
        );
      return (
        <h4 id={b.id} className="scroll-mt-28 mt-8 text-[16px] md:text-[17px] font-bold text-white/90">
          {renderInline(b.text, k)}
        </h4>
      );
    }
    case "paragraph":
      return <p className="mt-5 text-white/70 text-[16px] md:text-[17px] leading-[1.8]">{renderInline(b.text, k)}</p>;
    case "list": {
      const items = b.items.map((it, i) => (
        <li key={i} className={b.ordered ? "pl-2 marker:font-bold marker:text-[#ff6b72]" : "relative pl-6"}>
          {!b.ordered && <span aria-hidden="true" className="absolute left-0.5 top-[0.72em] h-1.5 w-1.5 rounded-full bg-[#D72731]" />}
          {renderInline(it, `${k}.${i}`)}
        </li>
      ));
      const cls = "mt-5 space-y-2.5 text-white/70 text-[16px] md:text-[17px] leading-[1.75]";
      return b.ordered ? <ol className={`${cls} list-decimal pl-6`}>{items}</ol> : <ul className={cls}>{items}</ul>;
    }
    case "quote":
      return (
        <blockquote className="mt-7 rounded-2xl border-l-4 border-[#D72731] bg-white/[0.04] px-5 py-4 md:px-6 md:py-5 text-white/80 text-[15.5px] md:text-[16px] leading-relaxed">
          {renderInline(b.text, k)}
        </blockquote>
      );
    case "table":
      return (
        <div className="mt-7 overflow-x-auto rounded-2xl border border-white/[0.1] no-scrollbar">
          <table className="w-full min-w-[560px] border-collapse text-[14px]">
            <thead>
              <tr className="bg-white/[0.05]">
                {b.header.map((h, i) => (
                  <th key={i} scope="col" className={`px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/60 ${ALIGN[b.align[i]]}`}>
                    {renderInline(h, `${k}.h${i}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, r) => (
                <tr key={r} className="border-t border-white/[0.07] even:bg-white/[0.015]">
                  {row.map((cell, c) => (
                    <td key={c} className={`px-4 py-3 align-top leading-relaxed ${c === 0 ? "font-semibold text-white/90" : "text-white/70"} ${ALIGN[b.align[c]]}`}>
                      {renderInline(cell, `${k}.${r}.${c}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image":
      return (
        <figure className="mt-9">
          <img src={b.src} alt={b.alt} loading="lazy" decoding="async" className="w-full h-auto rounded-[22px] ring-1 ring-white/10" />
          {b.caption && <figcaption className="mt-2.5 text-white/45 text-[12.5px] leading-relaxed">{b.caption}</figcaption>}
        </figure>
      );
    case "hr":
      return <hr className="my-12 border-white/10" />;
    case "film":
      return <FilmEmbed slug={b.slug} />;
    case "product":
      return <ProductEmbed slug={b.slug} />;
    case "cta":
      return <QuoteCallout topic={topic} />;
  }
}

/** Renders a post body: Markdown blocks plus {{film}}, {{product}} and {{cta}} embeds. */
export default function PostBody({ blocks, topic }: { blocks: Block[]; topic: string }) {
  return (
    <div>
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} k={`b${i}`} topic={topic} />
      ))}
    </div>
  );
}
