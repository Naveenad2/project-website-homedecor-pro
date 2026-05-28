// app/sitemap.ts
// ─────────────────────────────────────────────────────────────────────────────
// Next.js 14+ generates /sitemap.xml from this file automatically.
// Place this file at:  app/sitemap.ts
//
// HOW TO EXTEND:
//   — For dynamic routes (e.g. blog posts, project pages), fetch slugs from
//     your CMS/DB inside this function and push them into the `urls` array.
//   — For very large sites (>50k URLs) use generateSitemaps() to split into
//     multiple sitemaps: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-multiple-sitemaps
// ─────────────────────────────────────────────────────────────────────────────

import type { MetadataRoute } from "next";

const BASE_URL = "https://precisehomes.in";

// ── Static routes ─────────────────────────────────────────────────────────────
// Add / remove pages as your site grows.
const staticRoutes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "",            priority: 1.0,  changeFrequency: "weekly"  },  // homepage
  { path: "/about",      priority: 0.8,  changeFrequency: "monthly" },
  { path: "/services",   priority: 0.9,  changeFrequency: "monthly" },
  { path: "/products",   priority: 0.9,  changeFrequency: "weekly"  },
  { path: "/contact",    priority: 0.7,  changeFrequency: "yearly"  },
  { path: "/projects",   priority: 0.8,  changeFrequency: "weekly"  },

  // Product category pages
  { path: "/products/saint-gobain-glass",       priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/fundermax-cladding",       priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/lg-hausys",                priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/exterior-cladding",        priority: 0.8,  changeFrequency: "monthly" },
  { path: "/products/glass-facades",            priority: 0.8,  changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Static pages ────────────────────────────────────────────────────────────
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  // ── Dynamic pages (example: fetch project slugs from a CMS) ────────────────
  // Uncomment and adapt when you have dynamic routes:
  //
  // const projects = await fetch("https://your-cms.io/api/projects").then(r => r.json());
  // const dynamicEntries: MetadataRoute.Sitemap = projects.map((p: { slug: string; updatedAt: string }) => ({
  //   url: `${BASE_URL}/projects/${p.slug}`,
  //   lastModified: new Date(p.updatedAt),
  //   changeFrequency: "monthly" as const,
  //   priority: 0.7,
  // }));
  // return [...staticEntries, ...dynamicEntries];

  return staticEntries;
}