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
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt?: string;
  keywords?: string[];
  type?: "website" | "article";
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { type, locale: "en_IN", siteName: SITE.name, url: path, title: fullTitle, description, images },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
