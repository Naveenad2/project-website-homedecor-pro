// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for business details (NAP), links and SEO constants.
// Keep Name / Address / Phone identical everywhere — consistency is a local-SEO
// ranking signal for Google Maps & "near me" searches.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Precise Homes",
  alternateNames: ["Precise Home Care", "Precise Homes Kochi", "My Home by Saint-Gobain Kochi"],
  url: "https://www.precisehomes.in", // live primary domain (Vercel redirects the bare domain here)
  foundingYear: 2016,
  phone: "+919895105012",
  phoneDisplay: "+91 98951 05012",
  whatsappNumber: "919895105012",
  email: "precisehomeauto@gmail.com",
  address: {
    street: "Building No: 42/3405, Civil Line Road, Padivattom",
    landmark: "Near Azeezia Supermarket",
    locality: "Kochi",
    district: "Ernakulam",
    region: "Kerala",
    regionCode: "IN-KL",
    postalCode: "682024",
    country: "IN",
  },
  geo: { lat: 10.0128, lng: 76.3089 },
  mapsUrl: "https://maps.google.com/?q=Precise+Homes+Padivattom+Kochi",
  /**
   * ★ GOOGLE REVIEW LINK — used by the NFC card, QR codes and the footer.
   * https://www.precisehomes.in/review redirects to this address.
   * Paste the link from Google Business Profile → "Ask for reviews" → copy link
   * (it looks like https://g.page/r/XXXXXXXX/review), then redeploy.
   * While it is empty, /review opens the Google Maps listing instead.
   */
  googleReviewUrl: "https://g.page/r/CT_tu4o3b4LoEBM/review",
  hours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00", label: "Mon – Sat · 9 AM – 6 PM" },
  social: {
    instagram: "https://www.instagram.com/precisehomeautocare",
    facebook: "https://www.facebook.com/precisehomeauto",
    youtube: "https://www.youtube.com/@precisehomeautocare",
  },
  areaServed: ["Kochi", "Ernakulam", "Kakkanad", "Edappally", "Aluva", "Thrissur", "Kollam", "Kottayam", "Alappuzha", "Thiruvananthapuram", "Kozhikode", "Kerala"],
} as const;

/** Short link printed on the NFC card / QR code. Keep it stable — only the destination ever changes. */
export const REVIEW_PATH = "/review";
const reviewUrl: string = SITE.googleReviewUrl;
// Fallback has no "?query" on purpose: Next.js re-parses query strings in redirect destinations.
const MAPS_LISTING = "https://www.google.com/maps/search/Precise%20Homes%20Padivattom%20Kochi";
/** Where /review sends people: the Google review form, or the Maps listing until the link is added. */
export const REVIEW_DESTINATION: string = reviewUrl || MAPS_LISTING;

export const FULL_ADDRESS =`${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.district}, ${SITE.address.region} ${SITE.address.postalCode}`;

/** Brands Precise Homes supplies & installs. */
export const BRANDS = ["Saint-Gobain", "Fundermax", "iCLAD", "Novelio", "Dimore", "Vitrum", "Forms+Surfaces", "LG Hausys", "3M"] as const;

/** Primary search phrases this site targets (Kochi / Cochin / Ernakulam / Kerala / India). */
export const SEO_KEYWORDS = [
  "saint gobain windows",
  "saint gobain upvc windows",
  "saint gobain upvc windows kochi",
  "upvc windows cochin",
  "upvc windows kochi",
  "upvc windows ernakulam",
  "upvc windows kerala",
  "system aluminium windows",
  "saint gobain aluminium windows",
  "aluminium windows kochi",
  "aluminium windows kerala",
  "shower partitions kochi",
  "shower partitions",
  "glass handrail kochi",
  "glass handrail",
  "saint gobain glass",
  "saint gobain glass kochi",
  "toughened glass kochi",
  "toughen glass",
  "laminated glass kochi",
  "laminated glass",
  "lacquered glass",
  "lackered glass",
  "fundermax cladding",
  "fundermax cladding kerala",
  "hpl cladding",
  "hpl cladding kochi",
  "high pressure laminates",
  "iclad cladding",
  "iclad sintered stone cladding",
  "finesta windows",
  "fenesta windows alternative",
  "novelio wall covering",
  "automatic sliding door kochi",
  "precise homes",
  "my home by saint gobain kochi",
];

// ─── WhatsApp ────────────────────────────────────────────────────────────────
export const DEFAULT_WA_MESSAGE =
  "Hi Precise Homes! I found you on your website and would like to know more about your products.";

export function waLink(message: string = DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:${SITE.phone}`;

// ─── URL helpers ─────────────────────────────────────────────────────────────
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}

/** Stable @id references so every JSON-LD block points at the same entities. */
export const LD_ID = {
  business: `${SITE.url}/#business`,
  website: `${SITE.url}/#website`,
  logo: `${SITE.url}/#logo`,
} as const;

/** JSON.stringify with `<` escaped — prevents `</script>` injection inside JSON-LD. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** ISO-8601 duration (PT1M23S) for VideoObject structured data. */
export function isoDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  return `PT${m ? `${m}M` : ""}${s % 60}S`;
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(bytes >= 1e7 ? 0 : 1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1e3))} KB`;
}
