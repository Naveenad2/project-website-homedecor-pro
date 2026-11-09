import media from "./media.generated.json";

// ─────────────────────────────────────────────────────────────────────────────
// Project films. Durations / end-card timestamps come from media.generated.json,
// which is written by the media pipeline that encodes /public/media/*.
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectKey = "kaloor" | "kollam" | "fort-kochi" | "edappally" | "experience-centre" | "roofing";
export type FilmKind = "Client Story" | "Walkthrough" | "Product Demo" | "Expert Talk" | "Showroom Tour";

export type Film = {
  slug: string;
  title: string;
  description: string;
  project: ProjectKey;
  location: string;
  kind: FilmKind;
  products: string[];
  uploadDate: string;
  duration: number;
  /** Seconds where the white logo outro begins — the hero skips it. */
  endCardAt: number | null;
  hero?: { words: [string, string, string]; sub: string };
};

export const PROJECTS: { key: ProjectKey | "all"; label: string }[] = [
  { key: "all", label: "All Films" },
  { key: "kaloor", label: "Kaloor Villa" },
  { key: "kollam", label: "Kollam Residence" },
  { key: "fort-kochi", label: "Fort Kochi" },
  { key: "edappally", label: "Edappally" },
  { key: "experience-centre", label: "Experience Centre" },
  { key: "roofing", label: "Roofing" },
];

type FilmInput = Omit<Film, "duration" | "endCardAt">;

const FILM_INPUT: FilmInput[] = [
  {
    slug: "kaloor-villa-kochi-aerial",
    title: "A Kochi Villa, Seen From Above",
    description:
      "Drone views over Kaloor lead into a family home finished with wood-finish Saint-Gobain windows and wide sliding doors, as the homeowner shares her experience of working with Precise Homes.",
    project: "kaloor",
    location: "Kaloor, Kochi",
    kind: "Client Story",
    products: ["saint-gobain-upvc-windows", "saint-gobain-glass"],
    uploadDate: "2026-10-03",
    hero: { words: ["TRANSFORM", "YOUR", "HOMES"], sub: "Kaloor Villa · Kochi" },
  },
  {
    slug: "kollam-window-splash-test",
    title: "The Monsoon Splash Test",
    description:
      "Water is thrown straight at a closed, wood-finish Saint-Gobain window at our Kollam project to show how a properly sealed window keeps Kerala's monsoon rain outside.",
    project: "kollam",
    location: "Kollam",
    kind: "Product Demo",
    products: ["saint-gobain-upvc-windows"],
    uploadDate: "2026-02-03",
    hero: { words: ["BUILT", "FOR", "MONSOONS"], sub: "Window Splash Test · Kollam" },
  },
  {
    slug: "kollam-fundermax-cladding",
    title: "Fundermax Wood-Look Cladding",
    description:
      "A walk around a Kollam residence where Fundermax HPL panels in a warm wood décor clad the gate and boundary walls — the look of timber without termites, warping or repainting.",
    project: "kollam",
    location: "Kollam",
    kind: "Walkthrough",
    products: ["fundermax-hpl-cladding", "high-pressure-laminates"],
    uploadDate: "2026-02-02",
    hero: { words: ["CLAD", "IN", "CHARACTER"], sub: "Fundermax HPL Cladding · Kollam" },
  },
  {
    slug: "edappally-glass-handrail",
    title: "Frameless Glass Handrail, Up Close",
    description:
      "On an Edappally rooftop our team explains a frameless glass handrail piece by piece — the glass, the fixing profile and what makes it safe for terraces and staircases.",
    project: "edappally",
    location: "Edappally, Kochi",
    kind: "Product Demo",
    products: ["glass-handrails", "toughened-glass", "laminated-glass"],
    uploadDate: "2026-07-05",
    hero: { words: ["CLEAR", "SAFE", "VIEWS"], sub: "Glass Handrail · Edappally" },
  },
  {
    slug: "kollam-homeowner-sliding-windows",
    title: "Wide Sliding Windows: A Homeowner's View",
    description:
      "At the Kollam residence, the homeowner walks through her light-filled living spaces and the large wood-finish sliding windows installed by Precise Homes.",
    project: "kollam",
    location: "Kollam",
    kind: "Client Story",
    products: ["saint-gobain-upvc-windows", "saint-gobain-glass"],
    uploadDate: "2026-02-12",
  },
  {
    slug: "kollam-glass-skylight-terrace",
    title: "Light, Glass & Terrace Walkthrough",
    description:
      "From a glass skylight above the stairwell to the open terrace — a tour of how glazing brings daylight deep into the Kollam home.",
    project: "kollam",
    location: "Kollam",
    kind: "Walkthrough",
    products: ["saint-gobain-glass", "toughened-glass", "saint-gobain-upvc-windows"],
    uploadDate: "2026-02-15",
  },
  {
    slug: "kollam-homeowner-review",
    title: "Homeowner Review — Kollam",
    description:
      "The homeowner of our Kollam project shares her experience, from choosing windows and finishes to living with them every day.",
    project: "kollam",
    location: "Kollam",
    kind: "Client Story",
    products: ["saint-gobain-upvc-windows", "fundermax-hpl-cladding"],
    uploadDate: "2026-02-24",
  },
  {
    slug: "kollam-saint-gobain-glass-quality",
    title: "Why Saint-Gobain Glass?",
    description:
      "Beside a finished window in Kollam, our expert explains where Saint-Gobain glass is made — including its glass manufacturing complex near Chennai — and how to judge window quality.",
    project: "kollam",
    location: "Kollam",
    kind: "Expert Talk",
    products: ["saint-gobain-glass", "saint-gobain-upvc-windows"],
    uploadDate: "2026-03-06",
  },
  {
    slug: "fort-kochi-architect-review",
    title: "An Architect's Review — Fort Kochi",
    description:
      "An architect reviews a home tucked into a heritage lane in Fort Kochi, discussing the windows and sliding glass doors specified with Precise Homes.",
    project: "fort-kochi",
    location: "Fort Kochi",
    kind: "Expert Talk",
    products: ["saint-gobain-upvc-windows", "saint-gobain-glass"],
    uploadDate: "2026-07-06",
  },
  {
    slug: "kaloor-villa-french-doors",
    title: "Wood-Finish French Doors & Sliders",
    description:
      "Inside the Kaloor villa: French doors and sliding systems in a rich wood finish, framed by tropical planting.",
    project: "kaloor",
    location: "Kaloor, Kochi",
    kind: "Walkthrough",
    products: ["saint-gobain-upvc-windows"],
    uploadDate: "2026-09-18",
  },
  {
    slug: "kaloor-villa-tilt-turn-windows",
    title: "Staircase Glass & Casement Windows",
    description:
      "A double-height staircase lined with glass balustrades, and tall casement windows that open wide to let Kochi's breeze in.",
    project: "kaloor",
    location: "Kaloor, Kochi",
    kind: "Walkthrough",
    products: ["saint-gobain-upvc-windows", "glass-handrails"],
    uploadDate: "2026-09-26",
  },
  {
    slug: "kaloor-villa-homeowner-talk",
    title: "In Conversation: The Kaloor Homeowner",
    description:
      "Seated beside a garden-facing sliding window, the homeowner talks with our team about the project and the finishes she chose.",
    project: "kaloor",
    location: "Kaloor, Kochi",
    kind: "Client Story",
    products: ["saint-gobain-upvc-windows"],
    uploadDate: "2026-10-02",
  },
  {
    slug: "kaloor-villa-garden-windows",
    title: "Garden-View Sliding Windows",
    description:
      "Large sliding windows open the Kaloor villa's living room onto a private garden, and the homeowner explains what mattered most to her.",
    project: "kaloor",
    location: "Kaloor, Kochi",
    kind: "Client Story",
    products: ["saint-gobain-upvc-windows", "saint-gobain-glass"],
    uploadDate: "2026-10-04",
  },
  {
    slug: "kaloor-villa-owner-review",
    title: "The Owner's Verdict — Kaloor Villa",
    description:
      "Standing by the wood-finish French doors he chose, the owner of the Kaloor villa shares his experience with Precise Homes.",
    project: "kaloor",
    location: "Kaloor, Kochi",
    kind: "Client Story",
    products: ["saint-gobain-upvc-windows"],
    uploadDate: "2026-10-06",
  },
  {
    slug: "experience-centre-tour",
    title: "Tour Our Experience Centre",
    description:
      "Walk through our Saint-Gobain experience centre near Azeezia Supermarket, Padivattom — uPVC window displays, glass samples, shower cubicles and more under one roof.",
    project: "experience-centre",
    location: "Padivattom, Kochi",
    kind: "Showroom Tour",
    products: ["saint-gobain-upvc-windows", "saint-gobain-glass", "shower-partitions", "lacquered-glass", "toughened-glass"],
    uploadDate: "2026-07-06",
  },
  {
    slug: "saint-gobain-shingles-glass-railing",
    title: "Roofing Shingles & Glass Railing Talk",
    description:
      "On a sloping roof finished in Saint-Gobain shingles, our team discusses roofing for Kerala's heavy rain, alongside a frameless glass railing.",
    project: "roofing",
    location: "Kerala",
    kind: "Expert Talk",
    products: ["roofing-shingles", "glass-handrails"],
    uploadDate: "2026-07-06",
  },
];

type MediaFilm = { duration: number; endCardAt: number | null };
const mediaFilms = media.films as Record<string, MediaFilm>;

export const FILMS: Film[] = FILM_INPUT.map((f) => {
  const m = mediaFilms[f.slug];
  return { ...f, duration: m?.duration ?? 60, endCardAt: m?.endCardAt ?? null };
});

/** Films that play as "stories" in the homepage hero, in order. */
export const HERO_FILMS: Film[] = FILMS.filter((f) => f.hero);

export const filmMedia = (slug: string) => ({
  src: `/media/films/${slug}.mp4`,
  preview: `/media/previews/${slug}.mp4`,
  poster: `/media/posters/${slug}.webp`,
  start: `/media/posters/${slug}-start.webp`,
  og: `/media/og/${slug}.jpg`,
  /** 1920×1080 desktop hero background (hero stories only). */
  heroBg: `/media/hero/${slug}.webp`,
});

export const getFilm = (slug: string) => FILMS.find((f) => f.slug === slug);

export const filmsForProduct = (productSlug: string) =>
  FILMS.filter((f) => f.products.includes(productSlug));

/** ISO timestamp with IST offset, as recommended for VideoObject.uploadDate. */
export const filmUploadDate = (f: Film) => `${f.uploadDate}T10:00:00+05:30`;
