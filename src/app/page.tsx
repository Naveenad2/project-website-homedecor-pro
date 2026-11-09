import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Films from "@/components/sections/Films";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import Catalogues from "@/components/sections/Catalogues";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import JsonLd from "@/components/ui/JsonLd";
import { FILMS, HERO_FILMS, filmMedia, filmUploadDate } from "@/data/films";
import { PRODUCTS } from "@/data/products";
import { HOME_FAQS } from "@/data/faqs";
import { LD_ID, SITE, absoluteUrl, isoDuration } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { "en-IN": "/", "x-default": "/" } },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE.name,
    title: "Saint-Gobain uPVC Windows & Glass in Kochi | Precise Homes",
    description:
      "Kochi's Saint-Gobain dealer for uPVC & aluminium windows, toughened & laminated glass, shower partitions, glass handrails, Fundermax HPL & iCLAD cladding.",
  },
};

const PRODUCT_NAMES = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p.name]));

export default function Home() {
  const lead = HERO_FILMS[0];
  const leadMedia = filmMedia(lead.slug);
  const pageLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: SITE.url,
        name: "Saint-Gobain uPVC Windows, Glass & Cladding in Kochi — Precise Homes",
        isPartOf: { "@id": LD_ID.website },
        about: { "@id": LD_ID.business },
        inLanguage: "en-IN",
        primaryImageOfPage: absoluteUrl(leadMedia.poster),
      },
      {
        "@type": "VideoObject",
        "@id": `${SITE.url}/#hero-video`,
        name: lead.title,
        description: lead.description,
        thumbnailUrl: [absoluteUrl(leadMedia.poster)],
        uploadDate: filmUploadDate(lead),
        duration: isoDuration(lead.duration),
        contentUrl: absoluteUrl(leadMedia.src),
        url: absoluteUrl(`/films/${lead.slug}`),
        inLanguage: "en-IN",
        publisher: { "@id": LD_ID.business },
      },
      {
        "@type": "ItemList",
        name: "Precise Homes project films",
        itemListElement: FILMS.map((f, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/films/${f.slug}`), name: f.title })),
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#03070b] selection:bg-[#D72731] selection:text-white overflow-x-clip">
      <JsonLd data={pageLd} />
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Films films={FILMS} productNames={PRODUCT_NAMES} />
      <Gallery />
      <Testimonials />
      <Catalogues />
      <FAQ faqs={HOME_FAQS} />
      <Footer />
    </main>
  );
}
