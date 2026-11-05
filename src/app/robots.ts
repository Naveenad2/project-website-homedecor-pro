// app/robots.ts — generates /robots.txt
import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All search engines. /_next/ must stay crawlable: Google needs the CSS/JS to render pages.
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        // AI *training* crawlers stay blocked (site owner's choice). User-initiated assistants
        // such as ChatGPT-User are allowed so the business can be found and cited in AI answers.
        userAgent: ["GPTBot", "Google-Extended", "CCBot", "anthropic-ai", "Claude-Web", "Omgilibot", "FacebookBot"],
        disallow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}
