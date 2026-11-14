import type { NextConfig } from "next";
import { REVIEW_DESTINATION, REVIEW_PATH } from "./src/lib/site";

// NOTE: the previous version of this file never exported its config, so none of
// these settings were applied. It is now a proper default export.
const MEDIA_CACHE = "public, max-age=604800, stale-while-revalidate=2592000"; // 7 days, revalidate in background

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // NFC card / QR code → Google review form. Temporary (307) so the destination can
      // change later without the old one being cached by phones or search engines.
      { source: REVIEW_PATH, destination: REVIEW_DESTINATION, permanent: false },
      { source: "/reviews", destination: REVIEW_DESTINATION, permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=2592000" }] },
      // Films, previews, posters, product images and share cards
      { source: "/media/:path*", headers: [{ key: "Cache-Control", value: MEDIA_CACHE }] },
      // Brochure PDFs, covers and preview pages
      { source: "/catalogues/:path*", headers: [{ key: "Cache-Control", value: MEDIA_CACHE }] },
    ];
  },
};

export default nextConfig;
