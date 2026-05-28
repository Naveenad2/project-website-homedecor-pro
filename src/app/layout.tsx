// app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ADVANCED SEO — Precise Homes | precisehomes.in
// Hosted on Vercel · Next.js 14+ App Router
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import Script from "next/script";

// ─────────────────────────────────────────────────────────────────────────────
// VIEWPORT  (must be a named export from layout.tsx in Next.js 14+)
// ─────────────────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#03070b" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
const BASE_URL = "https://precisehomes.in";

export const metadata: Metadata = {
  // ── Base URL (resolves all relative paths in metadata) ───────────────────
  metadataBase: new URL(BASE_URL),

  // ── Title strategy ────────────────────────────────────────────────────────
  title: {
    default:
      "Precise Homes | Home Care Agency Ernakulam — Glass, Cladding & Appliances",
    template: "%s | Precise Homes",
  },

  // ── Description (≤160 chars) ──────────────────────────────────────────────
  description:
    "Ernakulam's premier home care agency. Authorized dealer of Saint-Gobain glass, Fundermax exterior cladding & LG Hausys surfaces. 500+ projects across Kerala. Call +919895105012.",

  // ── Keywords ──────────────────────────────────────────────────────────────
  keywords: [
    "home care agency ernakulam",
    "glass solutions kochi",
    "saint gobain dealer ernakulam",
    "fundermax cladding kerala",
    "lg hausys dealer kochi",
    "exterior cladding ernakulam",
    "glass facades kerala",
    "home renovation ernakulam",
    "precise homes",
    "precise home care",
    "building materials dealer kochi",
    "interior cladding ernakulam",
    "aluminium facades kerala",
    "upvc windows kerala",
    "glass partition ernakulam",
    "structural glazing kerala",
  ],

  // ── Canonical + hreflang ──────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-IN": BASE_URL,
      "x-default": BASE_URL,
    },
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Authors / Publisher ───────────────────────────────────────────────────
  authors: [{ name: "Precise Homes Pvt. Ltd.", url: BASE_URL }],
  creator: "Precise Homes Pvt. Ltd.",
  publisher: "Precise Homes Pvt. Ltd.",

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Precise Homes",
    title:
      "Precise Homes | Home Care Agency Ernakulam — Glass, Cladding & Appliances",
    description:
      "Ernakulam's premier home care agency. Authorized dealer of Saint-Gobain, Fundermax & LG Hausys. 500+ projects delivered across Kerala.",
    images: [
      {
        // Primary OG image — 1200×630 recommended
        // TIP: Create a dedicated /public/og-image.jpg (1200×630) for best results.
        // Using the best product photo as fallback for now:
        url: `${BASE_URL}/images/fundermax/fundermax2.jpeg`,
        width: 1200,
        height: 630,
        alt: "Precise Homes — Premium Glass Solutions and Exterior Cladding in Ernakulam, Kerala",
        type: "image/jpeg",
      },
      {
        // Square fallback (used by WhatsApp, some Slack previews)
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
        alt: "Precise Homes Logo",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Precise Homes | Home Care Agency Ernakulam",
    description:
      "Authorized dealer of Saint-Gobain, Fundermax & LG Hausys in Kerala. Glass solutions, exterior cladding, premium appliances.",
    images: [`${BASE_URL}/images/fundermax/fundermax2.jpeg`],
    creator: "@precisehomesindia",
    site: "@precisehomesindia",
  },

  // ── Icons & Favicons ──────────────────────────────────────────────────────
  // NOTE: logo-mini.png is 28×28 — ideal for 32×32 favicon slot.
  // logo.png is used for larger sizes and Apple touch icon.
  icons: {
    icon: [
      { url: "/logo-mini.png", sizes: "28x28",  type: "image/png" },
      { url: "/logo-mini.png", sizes: "32x32",  type: "image/png" },
      { url: "/logo.png",      sizes: "192x192", type: "image/png" },
      { url: "/logo.png",      sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo-mini.png",
  },

  // ── Manifest / PWA ────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",
  applicationName: "Precise Homes",
  appleWebApp: {
    capable: true,
    title: "Precise Homes",
    statusBarStyle: "black-translucent",
  },

  // ── Geo + Dublin Core + misc (Bing/Yandex local SEO) ─────────────────────
  other: {
    // Geographic signals
    "geo.region": "IN-KL",
    "geo.placename": "Ernakulam, Kerala, India",
    "geo.position": "10.0158;76.3419",
    ICBM: "10.0158, 76.3419",

    // Dublin Core
    "DC.title": "Precise Homes — Home Care Agency Ernakulam",
    "DC.description":
      "Premier home care agency in Ernakulam offering Saint-Gobain glass, Fundermax cladding and LG Hausys surfaces.",
    "DC.subject": "Home Care, Glass Solutions, Exterior Cladding, Kerala",
    "DC.language": "en-IN",
    "DC.coverage": "Ernakulam, Kerala, India",

    // Microsoft
    "msapplication-TileColor": "#03070b",
    "msapplication-TileImage": "/logo.png",
    "msapplication-config": "/browserconfig.xml",

    // Misc
    "format-detection": "telephone=yes",
    rating: "general",
    revisit: "7 days",
    language: "English",
    copyright: "Precise Homes Pvt. Ltd.",
    category: "Home Improvement, Construction Materials",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD STRUCTURED DATA
// Inline as a <Script> in the layout so it ships on every page.
// Google parses this for rich results (Local Business, breadcrumbs, etc.)
// ─────────────────────────────────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#organization`,
  name: "Precise Homes",
  alternateName: "Precise Home Care",
  description:
    "Ernakulam's premier home care agency. Authorized dealer of Saint-Gobain glass, Fundermax exterior cladding & LG Hausys surfaces.",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${BASE_URL}/images/fundermax/fundermax2.jpeg`,
  telephone: "+919895105012",
  email: "info@precisehomes.in", // ← update if different
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ernakulam",
    addressRegion: "Kerala",
    postalCode: "682016", // ← update with actual PIN
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.0158,
    longitude: 76.3419,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/precisehomesindia",   // update URLs
    "https://www.instagram.com/precisehomesindia",
    "https://twitter.com/precisehomesindia",
  ],
  areaServed: {
    "@type": "State",
    name: "Kerala",
    containsPlace: [
      { "@type": "City", name: "Ernakulam" },
      { "@type": "City", name: "Kochi" },
      { "@type": "City", name: "Thrissur" },
    ],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home Care Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Saint-Gobain Glass Solutions",
          description:
            "Authorized dealer for Saint-Gobain glass — facades, partitions, and specialty glass.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fundermax Exterior Cladding",
          description:
            "Premium exterior and interior cladding solutions using Fundermax HPL panels.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "LG Hausys Surfaces",
          description:
            "Authorized dealer for LG Hausys premium surfaces and interior materials.",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Precise Homes",
  description:
    "Home care agency in Ernakulam offering glass, cladding and appliance solutions.",
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ROOT LAYOUT
// ─────────────────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        {/* ── DNS prefetch / preconnect for performance (also helps CWV/SEO) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* ── JSON-LD Structured Data ─────────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      <body>
        <CustomCursor />
        {/* <Navbar /> */}
        <main>{children}</main>
        {/* <Footer /> */}

        {/* ── Google Analytics 4 (replace G-XXXXXXXXXX with your ID) ────── */}
        {/* Uncomment when you have a GA4 measurement ID:
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', { page_path: window.location.pathname });
          `}
        </Script>
        */}
      </body>
    </html>
  );
}