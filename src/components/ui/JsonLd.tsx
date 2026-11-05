import { jsonLdString } from "@/lib/site";

/** Structured data as a native <script> (recommended by the Next.js JSON-LD guide), `<` escaped. */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}
