// app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Root layout — global SEO (metadata + one consolidated JSON-LD graph), the
// floating WhatsApp button and the full-screen film viewer used site-wide.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata, Viewport } from "next";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import JsonLd from "@/components/ui/JsonLd";
import IconSprite from "@/components/ui/IconSprite";
import { FilmViewerProvider } from "@/components/media/FilmViewer";
import { PRODUCTS, categoryLabel } from "@/data/products";
import { BRANDS, LD_ID, SEO_KEYWORDS, SITE, absoluteUrl } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#03070b",
  colorScheme: "dark",
};

const TITLE = "Saint-Gobain uPVC Windows & Glass in Kochi | Precise Homes";
const DESCRIPTION =
  "Kochi's Saint-Gobain dealer for uPVC & aluminium windows, toughened & laminated glass, shower partitions, glass handrails, Fundermax HPL & iCLAD cladding.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: "%s | Precise Homes" },
  description: DESCRIPTION,
  keywords: SEO_KEYWORDS,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Home Improvement",
  // NOTE: no `alternates.canonical` here — it would be inherited by every page.
  // Each page sets its own canonical via buildMetadata() in lib/seo.ts.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  appleWebApp: { capable: true, title: SITE.name, statusBarStyle: "black-translucent" },
  formatDetection: { telephone: true, address: true, email: true },
  other: {
    "geo.region": SITE.address.regionCode,
    "geo.placename": `${SITE.address.locality}, ${SITE.address.region}, India`,
    "geo.position": `${SITE.geo.lat};${SITE.geo.lng}`,
    ICBM: `${SITE.geo.lat}, ${SITE.geo.lng}`,
    "msapplication-TileColor": "#03070b",
    "msapplication-config": "/browserconfig.xml",
  },
};

// One authoritative entity graph — every page's JSON-LD references these @ids.
const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": LD_ID.business,
      name: SITE.name,
      alternateName: SITE.alternateNames,
      description:
        "Precise Homes is a Saint-Gobain dealer and experience centre in Padivattom, Kochi, supplying and installing uPVC and system aluminium windows, toughened, laminated and lacquered glass, shower partitions, glass handrails, Fundermax HPL and iCLAD façade cladding across Kerala.",
      url: SITE.url,
      logo: { "@type": "ImageObject", "@id": LD_ID.logo, url: absoluteUrl("/logo.png"), width: 2218, height: 1413 },
      image: [absoluteUrl("/media/posters/kaloor-villa-kochi-aerial.webp"), absoluteUrl("/media/products/saint-gobain-upvc-windows.webp")],
      telephone: SITE.phone,
      email: SITE.email,
      priceRange: "₹₹",
      foundingDate: String(SITE.foundingYear),
      address: {
        "@type": "PostalAddress",
        streetAddress: `${SITE.address.street} (${SITE.address.landmark})`,
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
      },
      geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
      hasMap: SITE.mapsUrl,
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: SITE.hours.days, opens: SITE.hours.opens, closes: SITE.hours.closes },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Malayalam"],
      },
      areaServed: SITE.areaServed.map((name) => ({ "@type": name === "Kerala" ? "State" : "City", name })),
      sameAs: Object.values(SITE.social),
      brand: BRANDS.map((name) => ({ "@type": "Brand", name })),
      knowsAbout: [
        "Saint-Gobain uPVC windows",
        "System aluminium windows",
        "Toughened glass",
        "Laminated glass",
        "Lacquered glass",
        "Shower partitions",
        "Glass handrails",
        "Fundermax HPL cladding",
        "High pressure laminates",
        "iCLAD sintered stone cladding",
        "Glass-fibre wall coverings",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Windows, glass, cladding and surfaces",
        itemListElement: PRODUCTS.map((p) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${p.name} in Kochi`,
            serviceType: categoryLabel(p.category),
            url: absoluteUrl(`/products/${p.slug}`),
            areaServed: "Kerala, India",
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": LD_ID.website,
      url: SITE.url,
      name: SITE.name,
      inLanguage: "en-IN",
      publisher: { "@id": LD_ID.business },
    },
  ],
};

const PRODUCT_NAMES = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p.name]));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body>
        <IconSprite />
        <JsonLd data={ORGANIZATION_LD} />
        <CustomCursor />
        <FilmViewerProvider productNames={PRODUCT_NAMES}>{children}</FilmViewerProvider>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
