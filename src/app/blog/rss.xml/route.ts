// /blog/rss.xml — RSS feed of blog posts, built once at deploy time.
import { getAllPosts, postHref, postIsoDate } from "@/lib/blog";
import { SITE, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function GET() {
  const posts = getAllPosts();
  const feedUrl = absoluteUrl("/blog/rss.xml");
  const newest = posts[0] ? new Date(postIsoDate(posts[0].updated ?? posts[0].date)) : new Date();

  const items = posts
    .map((p) => {
      const link = absoluteUrl(postHref(p.slug));
      return [
        "    <item>",
        `      <title>${esc(p.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${new Date(postIsoDate(p.date)).toUTCString()}</pubDate>`,
        `      <category>${esc(p.category)}</category>`,
        `      <description>${esc(p.description)}</description>`,
        `      <media:content url="${esc(absoluteUrl(p.ogImage))}" medium="image" />`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${esc(`${SITE.name} Blog`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>Guides to windows, glass and cladding for Kerala homes from ${esc(SITE.name)}, Kochi.</description>
    <language>en-IN</language>
    <lastBuildDate>${newest.toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
