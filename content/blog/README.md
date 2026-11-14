# How to publish a blog post

Every `.md` file in this folder becomes a page at `https://www.precisehomes.in/blog/<file-name>`.
The blog list, homepage "Read before you renovate" section, sitemap, RSS feed, Google
structured data and the links from product pages all update by themselves.

---

## 1. Create the file

1. Copy `_template.md` and rename the copy, e.g. `upvc-window-price-kerala.md`.
   - Lowercase words joined with hyphens. Put the main keyword in the name — it becomes the web address.
   - Files starting with `_` (like the template) and this README are never published.
2. Fill in the details between the two `---` lines at the top:

| Field | What to write | Required |
| --- | --- | --- |
| `title` | The headline. Main keyword first, 55–65 characters. Use quotes if it contains a colon. | Yes |
| `description` | 1–2 sentences shown on Google under the title. Under 155 characters. | Yes |
| `date` | Publish date as `2026-12-01` (year-month-day). | Yes |
| `updated` | When you improve an old post, add the new date here. Google likes fresh content. | No |
| `category` | One word or two: `Windows`, `Glass`, `Cladding`, `Maintenance`, `Projects`. | Yes |
| `cover` | Cover photo path, e.g. `/media/blog/my-photo.jpg`. Landscape, ideally 1200×630. | Yes |
| `coverAlt` | Describe the cover photo in plain words (helps Google Images). | Recommended |
| `ogImage` | Different 1200×630 JPG for WhatsApp/Facebook previews. Defaults to the cover. | No |
| `products` | Product slugs the post is about, e.g. `[saint-gobain-upvc-windows, toughened-glass]`. The post then appears on those product pages. | Recommended |
| `keywords` | 3–6 search phrases, e.g. `[upvc window price kerala, upvc windows cost kochi]`. | Recommended |
| `author` | Defaults to "Precise Homes Team". | No |
| `draft` | `true` keeps the post hidden. Delete the line to publish. | No |

## 2. Write the article

| You type | You get |
| --- | --- |
| `## Heading` | Main section heading (also listed in "On this page") |
| `### Smaller heading` | Sub-heading |
| `**bold**` and `*italic*` | **bold** and *italic* |
| `[link text](/products/toughened-glass)` | A link — use `/…` for pages on this site |
| `- item` | Bullet list |
| `1. step` | Numbered list |
| `> **Tip:** text` | Highlighted tip box |
| A table with `\|` columns (see the template) | A neat table that scrolls on phones |
| `![describe the photo](/media/blog/photo.jpg "caption")` | A photo with an optional caption |
| `---` on its own line | A divider |
| `{{film: kollam-window-splash-test}}` | One of our project films, playable on the page |
| `{{product: saint-gobain-upvc-windows}}` | A product card with a WhatsApp "Quote" button |
| `{{product: saint-gobain-upvc-windows/sliding-windows}}` | A product-type card |
| `{{cta}}` | The "Free site visit" box with WhatsApp and call buttons |

Leave an empty line between paragraphs, headings, lists and tables.
Don't use the `|` character inside table cells.

**FAQ section:** end the post with `## Frequently asked questions`, then each question as
`### Question?` with the answer underneath. They appear in the site's FAQ accordion and are
marked up for Google. The first link inside an answer becomes its "read more" button.

## 3. Add photos

- Put photos in `public/media/blog/` (create the folder the first time).
- Use your own project photos — real Kerala homes beat stock photos for Google and for customers.
- Name files with words, not numbers: `upvc-sliding-window-kaloor-villa.jpg`, not `IMG_2041.jpg`.
- Make them small: cover 1200×630, photos about 1600 px wide, under 300 KB.
  Free tool: <https://squoosh.app> (choose MozJPEG or WebP, quality 75).

## 4. Check it (optional, on your computer)

```bash
npm run dev
```

Open <http://localhost:3000/blog> — edits appear when you refresh.

## 5. Publish

Commit the new files and push to GitHub (`main`). Vercel builds and publishes the site,
usually within a few minutes.

If a post has a mistake (missing title, wrong product slug, photo not found…), the build stops
with a message starting with `[blog]` that says exactly what to fix. **The live site stays as it
was until you fix it**, so a broken post can never go online.

## 6. Tell Google and your customers

1. **Search Console** → paste the post's address in the search bar at the top (URL inspection)
   → **Request indexing**.
2. **Google Business Profile** → *Add update* → short summary + photo + "Learn more" link to the post.
3. Share on Instagram, Facebook and WhatsApp Status. Send it to customers who asked that question.

---

## Writing tips that help ranking

- **One main keyword per post** — in the title, the file name, the first paragraph and one `##` heading.
- **Answer the question in the first paragraph.** Then explain the details.
- **1,000–2,000 words** of genuinely useful text. Real prices, real projects and real photos win.
- **Show experience:** mention the project and place ("at our Kaloor villa…"), embed a film.
- **Link to 2–3 product pages** and one other blog post.
- **Never copy text** from other websites or brand brochures — Google ignores copied pages.
- **Update old posts** every few months (new photos, current prices) and change `updated:`.

## Valid slugs

**Products** (for `products:` and `{{product: …}}`):
`saint-gobain-upvc-windows`, `saint-gobain-aluminium-windows`, `system-aluminium-windows`,
`automatic-sliding-doors`, `saint-gobain-glass`, `toughened-glass`, `laminated-glass`,
`lacquered-glass`, `shower-partitions`, `glass-handrails`, `fundermax-hpl-cladding`,
`high-pressure-laminates`, `iclad-cladding`, `novelio-wall-coverings`, `architectural-surfaces`,
`lg-hausys-surfaces`, `roofing-shingles`

**Product types** (for `{{product: product/type}}`):
`saint-gobain-upvc-windows/sliding-windows`, `saint-gobain-upvc-windows/casement-windows`,
`saint-gobain-upvc-windows/french-doors`, `saint-gobain-upvc-windows/soundproof-windows`,
`saint-gobain-upvc-windows/double-glazed-windows`, `system-aluminium-windows/aluminium-sliding-doors`,
`glass-handrails/staircase-glass-railing`, `glass-handrails/balcony-glass-railing`,
`toughened-glass/glass-partitions`, `laminated-glass/glass-skylights`,
`fundermax-hpl-cladding/compound-wall-cladding`

**Films** (for `{{film: …}}`):
`kaloor-villa-kochi-aerial`, `kollam-window-splash-test`, `kollam-fundermax-cladding`,
`edappally-glass-handrail`, `kollam-homeowner-sliding-windows`, `kollam-glass-skylight-terrace`,
`kollam-homeowner-review`, `kollam-saint-gobain-glass-quality`, `fort-kochi-architect-review`,
`kaloor-villa-french-doors`, `kaloor-villa-tilt-turn-windows`, `kaloor-villa-homeowner-talk`,
`kaloor-villa-garden-windows`, `kaloor-villa-owner-review`, `experience-centre-tour`,
`saint-gobain-shingles-glass-railing`

**Ready-made images you can use:**

- `cover:` — use a landscape *photo* (no text on it). Already on the site:
  `/media/hero/kollam-window-splash-test.webp`, `/media/hero/edappally-glass-handrail.webp`,
  `/media/hero/kollam-fundermax-cladding.webp`, and the gallery photos in
  `/images/saintgobain/`, `/images/fundermax/` and `/images/lg/` (e.g. `/images/fundermax/fundermax1.jpeg`).
- `ogImage:` — the designed 1200×630 share cards with our logo, one per film
  (e.g. `/media/og/kollam-window-splash-test.jpg`) and one per product
  (e.g. `/media/og/products/shower-partitions.jpg`). These look best in WhatsApp and Facebook previews.

## Next post ideas (2 a month)

1. uPVC window price in Kerala — what decides the cost *(add your real ₹ ranges — the most-searched topic)*
2. Sliding vs casement windows — which is right for each room
3. Glass handrail price & designs for Kerala homes
4. Shower partition ideas for small bathrooms
5. Fundermax HPL vs paint for compound walls
6. Project story: the Kaloor villa, start to finish
7. How to reduce heat through windows in a Kerala summer
8. Soundproofing a bedroom near a busy Kochi road
9. Choosing glass for a nadumuttam / courtyard skylight
10. Project story: the Kollam residence
