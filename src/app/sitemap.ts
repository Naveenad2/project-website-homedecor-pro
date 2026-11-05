// app/sitemap.ts — generates /sitemap.xml with image and video extensions.
import type { MetadataRoute } from "next";
import { FILMS, HERO_FILMS, filmMedia, filmUploadDate } from "@/data/films";
import { PRODUCTS, productImage } from "@/data/products";
import { CATALOGUES, catalogueAssets } from "@/data/catalogues";
import { SITE, absoluteUrl } from "@/lib/site";

/** Next.js writes sitemap fields verbatim, so text must be XML-escaped here (e.g. "&"). */
const xml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const lead = HERO_FILMS[0];

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: HERO_FILMS.map((f) => absoluteUrl(filmMedia(f.slug).poster)),
      videos: [
        {
          title: xml(lead.title),
          description: xml(lead.description),
          thumbnail_loc: absoluteUrl(filmMedia(lead.slug).poster),
          content_loc: absoluteUrl(filmMedia(lead.slug).src),
          duration: Math.round(lead.duration),
          publication_date: filmUploadDate(lead),
          family_friendly: "yes",
        },
      ],
    },
    {
      url: absoluteUrl("/products"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...PRODUCTS.map((p) => ({
      url: absoluteUrl(`/products/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.featured ? 0.9 : 0.8,
      images: [absoluteUrl(productImage(p.slug))],
    })),
    {
      url: absoluteUrl("/films"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...FILMS.map((f) => ({
      url: absoluteUrl(`/films/${f.slug}`),
      lastModified: new Date(`${f.uploadDate}T10:00:00+05:30`),
      changeFrequency: "yearly" as const,
      priority: 0.7,
      videos: [
        {
          title: xml(f.title),
          description: xml(f.description),
          thumbnail_loc: absoluteUrl(filmMedia(f.slug).poster),
          content_loc: absoluteUrl(filmMedia(f.slug).src),
          duration: Math.round(f.duration),
          publication_date: filmUploadDate(f),
          family_friendly: "yes" as const,
        },
      ],
    })),
    {
      url: absoluteUrl("/catalogues"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: CATALOGUES.map((c) => absoluteUrl(catalogueAssets(c).cover)),
    },
    { url: absoluteUrl("/saint-gobain"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/fundermax"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/lg-hausys"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
