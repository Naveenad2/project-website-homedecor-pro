// app/robots.ts
// ─────────────────────────────────────────────────────────────────────────────
// Next.js 14+ generates /robots.txt from this file automatically.
// Place this file at:  app/robots.ts
// ─────────────────────────────────────────────────────────────────────────────

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all well-behaved crawlers
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",        // no API routes indexed
          "/_next/",      // Next.js internals
          "/admin/",      // admin panel if any
          "/private/",    // any private pages
          "/*.json$",     // raw JSON files
        ],
      },
      {
        // Block AI training crawlers
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Omgilibot",
          "FacebookBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: "https://precisehomes.in/sitemap.xml",
    host: "https://precisehomes.in",
  };
}