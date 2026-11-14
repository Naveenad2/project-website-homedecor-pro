import type { Metadata } from "next";
import { SITE } from "./site";

/**
 * Per-page metadata with a self-referencing canonical, Open Graph and Twitter cards.
 * Next.js replaces (not deep-merges) nested objects such as `openGraph`, so every
 * page passes its full set here rather than relying on the root layout.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  keywords,
  type = "website",
  absoluteTitle = false,
  rss = false,
  article,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt?: string;
  keywords?: string[];
  type?: "website" | "article";
  absoluteTitle?: boolean;
  /** Advertise the blog RSS feed (<link rel="alternate" type="application/rss+xml">). */
  rss?: boolean;
  /** Open Graph article details for blog posts. */
  article?: { publishedTime: string; modifiedTime?: string; section?: string; tags?: string[] };
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }];
  const base = { locale: "en_IN", siteName: SITE.name, url: path, title: fullTitle, description, images };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: path,
      ...(rss ? { types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: `${SITE.name} Blog` }] } } : {}),
    },
    openGraph: article && type === "article" ? { ...base, type: "article", authors: [SITE.name], ...article } : { ...base, type },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
