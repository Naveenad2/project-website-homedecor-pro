// ─────────────────────────────────────────────────────────────────────────────
// Blog engine — reads Markdown posts from /content/blog/*.md at build time.
//
// No CMS and no extra packages: write a .md file, push, and the post is live.
// A small Markdown subset is supported (see content/blog/README.md). Mistakes in
// a post (missing title, wrong product slug, missing image…) stop the build with
// a clear message, so a broken post can never go live — the previous version of
// the site stays online until the post is fixed.
// ─────────────────────────────────────────────────────────────────────────────

import fs from "node:fs";
import path from "node:path";
import type { Faq } from "@/data/faqs";
import { FILMS } from "@/data/films";
import { PRODUCTS } from "@/data/products";
import { getProductType } from "@/data/product-types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const DEFAULT_AUTHOR = "Precise Homes Team";
const WORDS_PER_MINUTE = 200;

// ── Types ────────────────────────────────────────────────────────────────────

export type Block =
  | { type: "heading"; level: 2 | 3 | 4; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; header: string[]; align: ("left" | "center" | "right")[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "hr" }
  | { type: "film"; slug: string }
  | { type: "product"; slug: string }
  | { type: "cta" };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** YYYY-MM-DD */
  date: string;
  updated?: string;
  author: string;
  category: string;
  /** Landscape cover image (ideally 1200×630), path inside /public. */
  cover: string;
  coverAlt: string;
  /** Share image for WhatsApp / Facebook (1200×630 JPG). Defaults to the cover. */
  ogImage: string;
  /** Product slugs this post is about — links the post and the product pages both ways. */
  products: string[];
  keywords: string[];
  readingMinutes: number;
  wordCount: number;
};

export type Post = PostMeta & {
  blocks: Block[];
  /** h2 headings, for the "On this page" list. */
  headings: { id: string; text: string }[];
  faqs: Faq[];
};

// ── Small helpers ────────────────────────────────────────────────────────────

/** Markdown inline syntax → plain text (for ids, FAQ answers, word counts). */
export function stripInline(s: string): string {
  return s
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(?!\s)(.+?)(?<!\s)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

function slugify(s: string): string {
  return stripInline(s)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "section";
}

function fail(file: string, msg: string): never {
  throw new Error(`[blog] content/blog/${file}: ${msg}`);
}

const publicFileExists = (p: string) => fs.existsSync(path.join(PUBLIC_DIR, decodeURIComponent(p)));

/** "2026-11-14" → "14 Nov 2026" (Indian date order). */
export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(
    new Date(postIsoDate(date)),
  );
}

/** ISO timestamp with IST offset for structured data, sitemaps and RSS. */
export const postIsoDate = (date: string) => `${date}T09:00:00+05:30`;

// ── Front matter (the block between the two --- lines) ──────────────────────

type FrontMatter = Record<string, string | string[] | boolean>;

function unquote(s: string): string {
  const t = s.trim();
  if (t.length >= 2 && ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")))) return t.slice(1, -1);
  return t;
}

function parseValue(v: string): string | string[] | boolean {
  const s = v.trim();
  if (s.startsWith("[") && s.endsWith("]")) {
    return s
      .slice(1, -1)
      .split(",")
      .map((x) => unquote(x).trim())
      .filter(Boolean);
  }
  if (s === "true") return true;
  if (s === "false") return false;
  return unquote(s);
}

function parseFrontMatter(src: string, file: string): { data: FrontMatter; body: string } {
  const m = src.match(/^﻿?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!m) fail(file, 'the file must start with a front-matter block between two "---" lines (copy _template.md).');
  const data: FrontMatter = {};
  m[1].split(/\r?\n/).forEach((raw, n) => {
    const line = raw.trim();
    if (!line || line.startsWith("#")) return;
    const kv = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (!kv) fail(file, `front-matter line ${n + 2} should look like "key: value" but is: ${line}`);
    data[kv[1]] = parseValue(kv[2]);
  });
  return { data, body: src.slice(m[0].length) };
}

// ── Markdown body → blocks ───────────────────────────────────────────────────

const EMBED_RE = /^\{\{\s*(film|product|cta)\s*(?::\s*([a-z0-9/-]+))?\s*\}\}$/i;
const HEADING_RE = /^(#{1,4})\s+(.+?)\s*#*$/;
const HR_RE = /^(?:-{3,}|\*{3,}|_{3,})$/;
const IMAGE_RE = /^!\[([^\]]*)\]\(\s*(\S+?)(?:\s+"([^"]*)")?\s*\)$/;
const LIST_RE = /^([-*+]|\d{1,3}[.)])\s+(.*)$/;
const QUOTE_RE = /^>\s?(.*)$/;
const TABLE_SEP_RE = /^\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)*\|?$/;

function splitRow(line: string): string[] {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);
  return s.split("|").map((c) => c.trim());
}

function parseBody(md: string, file: string): Block[] {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  const usedIds = new Map<string, number>();
  const uniqueId = (text: string) => {
    const base = slugify(text);
    const n = usedIds.get(base) ?? 0;
    usedIds.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  };
  const isTableStart = (idx: number) =>
    lines[idx].includes("|") && idx + 1 < lines.length && TABLE_SEP_RE.test(lines[idx + 1].trim());
  const startsBlock = (idx: number) => {
    const t = lines[idx].trim();
    return HEADING_RE.test(t) || EMBED_RE.test(t) || IMAGE_RE.test(t) || LIST_RE.test(t) || QUOTE_RE.test(t) || HR_RE.test(t) || isTableStart(idx) || t.startsWith("<!--");
  };
  const isOrdered = (marker: string) => /^\d/.test(marker);

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    // <!-- notes for the writer --> are ignored
    if (line.startsWith("<!--")) {
      while (i < lines.length && !lines[i].includes("-->")) i++;
      i++;
      continue;
    }

    let m: RegExpMatchArray | null;

    if ((m = line.match(EMBED_RE))) {
      const kind = m[1].toLowerCase() as "film" | "product" | "cta";
      const slug = m[2]?.toLowerCase();
      if (kind === "cta") blocks.push({ type: "cta" });
      else if (!slug) fail(file, `"${line}" needs a slug, e.g. {{${kind}: ${kind === "film" ? "kollam-window-splash-test" : "saint-gobain-upvc-windows"}}}`);
      else if (kind === "film") {
        if (!FILMS.some((f) => f.slug === slug)) fail(file, `unknown film "${slug}". Valid films: ${FILMS.map((f) => f.slug).join(", ")}`);
        blocks.push({ type: "film", slug });
      } else {
        const [parent, type] = slug.split("/");
        const ok = type ? !!getProductType(parent, type) : PRODUCTS.some((p) => p.slug === parent);
        if (!ok) fail(file, `unknown product "${slug}". Use a product slug such as ${PRODUCTS.slice(0, 3).map((p) => p.slug).join(", ")} — or product/type, e.g. saint-gobain-upvc-windows/sliding-windows`);
        blocks.push({ type: "product", slug });
      }
      i++;
      continue;
    }

    if ((m = line.match(HEADING_RE))) {
      const level = Math.min(4, Math.max(2, m[1].length)) as 2 | 3 | 4;
      blocks.push({ type: "heading", level, text: m[2], id: uniqueId(m[2]) });
      i++;
      continue;
    }

    if (HR_RE.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    if ((m = line.match(IMAGE_RE))) {
      const src = m[2];
      if (src.startsWith("/") && !publicFileExists(src)) fail(file, `image "${src}" was not found in the /public folder.`);
      if (!m[1].trim()) fail(file, `image "${src}" needs alt text: ![describe the photo](${src})`);
      blocks.push({ type: "image", src, alt: m[1].trim(), caption: m[3] });
      i++;
      continue;
    }

    if (isTableStart(i)) {
      const header = splitRow(lines[i]);
      const align = splitRow(lines[i + 1]).map((c) => (c.startsWith(":") && c.endsWith(":") ? "center" : c.endsWith(":") ? "right" : "left")) as (
        | "left"
        | "center"
        | "right"
      )[];
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim() && lines[i].includes("|")) {
        const cells = splitRow(lines[i]);
        rows.push(header.map((_, c) => cells[c] ?? ""));
        i++;
      }
      blocks.push({ type: "table", header, align: header.map((_, c) => align[c] ?? "left"), rows });
      continue;
    }

    if (QUOTE_RE.test(line)) {
      const parts: string[] = [];
      while (i < lines.length && QUOTE_RE.test(lines[i].trim())) {
        parts.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", text: parts.join(" ").trim() });
      continue;
    }

    if ((m = line.match(LIST_RE))) {
      const ordered = isOrdered(m[1]);
      const items: string[] = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (!t) {
          // A blank line continues the list only if the next item is the same kind of list.
          let j = i + 1;
          while (j < lines.length && !lines[j].trim()) j++;
          const next = j < lines.length ? lines[j].trim().match(LIST_RE) : null;
          if (next && isOrdered(next[1]) === ordered) {
            i = j;
            continue;
          }
          break;
        }
        const lm = t.match(LIST_RE);
        if (lm) {
          if (isOrdered(lm[1]) !== ordered) break;
          items.push(lm[2]);
          i++;
          continue;
        }
        if (startsBlock(i)) break;
        if (items.length) items[items.length - 1] += ` ${t}`;
        i++;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    // Paragraph: consecutive lines until a blank line or another block.
    const parts = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !startsBlock(i)) {
      parts.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "paragraph", text: parts.join(" ") });
  }
  return blocks;
}

/**
 * A "## FAQ" / "## Frequently asked questions" section is lifted out of the body:
 * each "### Question" + the text under it becomes an FAQ, shown in the site's FAQ
 * accordion with FAQPage structured data.
 */
function extractFaqs(blocks: Block[], file: string): { blocks: Block[]; faqs: Faq[] } {
  const out: Block[] = [];
  const faqs: Faq[] = [];
  let inFaq = false;
  for (const b of blocks) {
    if (b.type === "heading" && b.level === 2) {
      inFaq = /^(faqs?|frequently asked questions)\b/i.test(stripInline(b.text).trim());
      if (inFaq) continue;
    }
    if (!inFaq) {
      out.push(b);
      continue;
    }
    if (b.type === "heading") {
      faqs.push({ q: stripInline(b.text).trim(), a: "" });
      continue;
    }
    const last = faqs[faqs.length - 1];
    if (!last) fail(file, 'in the FAQ section, start each question with "### " (three hashes).');
    const text =
      b.type === "paragraph" || b.type === "quote" ? b.text : b.type === "list" ? b.items.join("; ") : "";
    if (!text) continue;
    // The first [link](/path) in an answer becomes the FAQ's "read more" button.
    const lm = !last.link ? text.match(/\[([^\]]+)\]\(([^)\s]+)\)/) : null;
    if (lm && (lm[2].startsWith("/") || /^https?:\/\//i.test(lm[2]))) last.link = { href: lm[2], label: stripInline(lm[1]) };
    last.a = `${last.a} ${stripInline(text)}`.trim();
  }
  for (const f of faqs) if (!f.a) fail(file, `FAQ "${f.q}" has no answer under it.`);
  return { blocks: out, faqs };
}

function countWords(blocks: Block[], faqs: Faq[]): number {
  const text = [
    ...blocks.map((b) =>
      b.type === "paragraph" || b.type === "quote" || b.type === "heading"
        ? b.text
        : b.type === "list"
          ? b.items.join(" ")
          : b.type === "table"
            ? [...b.header, ...b.rows.flat()].join(" ")
            : "",
    ),
    ...faqs.map((f) => `${f.q} ${f.a}`),
  ].join(" ");
  return stripInline(text).split(/\s+/).filter(Boolean).length;
}

// ── Loading ──────────────────────────────────────────────────────────────────

function req(data: FrontMatter, key: string, file: string): string {
  return opt(data, key, file) ?? fail(file, `"${key}:" is missing in the front matter.`);
}

function opt(data: FrontMatter, key: string, file: string): string | undefined {
  const v = data[key];
  if (v === undefined || v === "") return undefined;
  if (typeof v !== "string") fail(file, `"${key}:" should be text, not a list or true/false.`);
  return v.trim();
}

function list(data: FrontMatter, key: string, file: string): string[] {
  const v = data[key];
  if (v === undefined || v === "") return [];
  if (typeof v === "string") return v.split(",").map((x) => x.trim()).filter(Boolean);
  if (!Array.isArray(v)) fail(file, `"${key}:" should be a list like [one, two].`);
  return v;
}

function loadPost(fileName: string): Post | null {
  const file = fileName;
  const slug = fileName.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail(file, "file names must be lowercase words joined by hyphens, e.g. best-upvc-windows-kerala.md");

  const { data, body } = parseFrontMatter(fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8"), file);
  if (data.draft === true) return null;

  const title = req(data, "title", file);
  const description = req(data, "description", file);
  const date = req(data, "date", file);
  const updated = opt(data, "updated", file);
  for (const [k, d] of [["date", date], ["updated", updated]] as const) {
    if (d && !/^\d{4}-\d{2}-\d{2}$/.test(d)) fail(file, `"${k}:" must look like 2026-11-14 (year-month-day).`);
  }
  const cover = req(data, "cover", file);
  const ogImage = opt(data, "ogImage", file) ?? cover;
  for (const img of [cover, ogImage]) {
    if (!img.startsWith("/")) fail(file, `images must be paths inside /public that start with "/", e.g. /blog/my-photo.jpg — got "${img}".`);
    if (!publicFileExists(img)) fail(file, `image "${img}" was not found in the /public folder.`);
  }
  const products = list(data, "products", file);
  for (const p of products) {
    if (!PRODUCTS.some((x) => x.slug === p)) fail(file, `unknown product "${p}" in "products:". Valid: ${PRODUCTS.map((x) => x.slug).join(", ")}`);
  }

  const parsed = extractFaqs(parseBody(body, file), file);
  const wordCount = countWords(parsed.blocks, parsed.faqs);

  return {
    slug,
    title,
    description,
    date,
    updated: updated && updated !== date ? updated : undefined,
    author: opt(data, "author", file) ?? DEFAULT_AUTHOR,
    category: req(data, "category", file),
    cover,
    coverAlt: opt(data, "coverAlt", file) ?? title,
    ogImage,
    products,
    keywords: list(data, "keywords", file),
    readingMinutes: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
    wordCount,
    blocks: parsed.blocks,
    headings: parsed.blocks.flatMap((b) => (b.type === "heading" && b.level === 2 ? [{ id: b.id, text: stripInline(b.text) }] : [])),
    faqs: parsed.faqs,
  };
}

let cache: Post[] | null = null;

/** All published posts, newest first. (Re-read on every request in `next dev` so edits show instantly.) */
export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_") && f.toLowerCase() !== "readme.md")
    : [];
  const posts = files
    .map(loadPost)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  cache = posts;
  return posts;
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

/** Posts that list this product in their front matter. */
export const getPostsForProduct = (productSlug: string, limit = 3) =>
  getAllPosts()
    .filter((p) => p.products.includes(productSlug))
    .slice(0, limit);

/** Best matches by shared products, then same category, then newest. */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.products.filter((x) => post.products.includes(x)).length * 2 + (p.category === post.category ? 1 : 0) }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map((x) => x.p);
}

export const postHref = (slug: string) => `/blog/${slug}`;
