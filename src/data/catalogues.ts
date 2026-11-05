import media from "./media.generated.json";

// ─────────────────────────────────────────────────────────────────────────────
// Brochures & catalogues. Page counts / sizes come from media.generated.json
// (written by the catalogue pipeline). A catalogue without generated assets is
// automatically left out, so the site never links to a missing file.
// ─────────────────────────────────────────────────────────────────────────────

export type Catalogue = {
  slug: string;
  title: string;
  brand: string;
  kind: "Catalogue" | "Brochure" | "Presentation";
  description: string;
  products: string[];
  accent: string;
  pages: number;
  previewPages: number;
  bytes: number;
  aspect: number;
};

type CatalogueInput = Omit<Catalogue, "pages" | "previewPages" | "bytes" | "aspect">;

const INPUT: CatalogueInput[] = [
  {
    slug: "iclad-facade-cladding-catalogue",
    title: "iCLAD Sintered Stone Façade Cladding",
    brand: "iCLAD",
    kind: "Catalogue",
    description:
      "6 mm sintered stone panels in 3000 × 1000 mm and 1800 × 600 mm formats for ventilated façades, columns, louvres, soffits and compound walls.",
    products: ["iclad-cladding"],
    accent: "#B08D57",
  },
  {
    slug: "fundermax-max-compact-exterior",
    title: "Fundermax Max Compact Exterior 2.3",
    brand: "Fundermax",
    kind: "Presentation",
    description:
      "The latest Max Compact Exterior collection — 132 décors, new surfaces and formats for façades, balconies and outdoor elements.",
    products: ["fundermax-hpl-cladding", "high-pressure-laminates"],
    accent: "#D72731",
  },
  {
    slug: "dimore-aluminium-windows-doors",
    title: "Dimore System Aluminium Windows & Doors",
    brand: "Dimore",
    kind: "Brochure",
    description:
      "Duraslim and Vistaslim sliding systems, Elegante sliding doors and more — slim-interlock system aluminium engineered for Indian conditions.",
    products: ["system-aluminium-windows", "saint-gobain-aluminium-windows"],
    accent: "#6B7C93",
  },
  {
    slug: "vitrum-slimline-windows",
    title: "Vitrum Slimline Window Systems",
    brand: "Vitrum",
    kind: "Presentation",
    description:
      "Ultra-slim architectural window systems that bring the outdoors in — chosen for landmark residences across India.",
    products: ["system-aluminium-windows"],
    accent: "#8A9BA8",
  },
  {
    slug: "saint-gobain-automatic-doors",
    title: "Saint-Gobain Automatic Entrance Doors",
    brand: "Saint-Gobain",
    kind: "Brochure",
    description:
      "Access Lite and Access Pro automatic sliding doors, 1 million-cycle tested, with motion and safety sensors for homes, offices and showrooms.",
    products: ["automatic-sliding-doors"],
    accent: "#02589F",
  },
  {
    slug: "novelio-wall-coverings-brochure",
    title: "Novelio Paintable Wall Coverings",
    brand: "Novelio",
    kind: "Brochure",
    description:
      "Glass-fibre wall coverings from Saint-Gobain ADFORS that hide and prevent cracks, resist impact and can be repainted for years.",
    products: ["novelio-wall-coverings"],
    accent: "#5E8C7B",
  },
  {
    slug: "novelio-classic-catalogue",
    title: "Novelio Classic Collection",
    brand: "Novelio",
    kind: "Catalogue",
    description:
      "The authentic fibreglass wall covering in pre-painted, pre-glued and self-adhesive versions — dozens of weaves and textures.",
    products: ["novelio-wall-coverings"],
    accent: "#5E8C7B",
  },
  {
    slug: "novelio-nature-opposites-catalogue",
    title: "Novelio Nature & Opposites",
    brand: "Novelio",
    kind: "Catalogue",
    description:
      "Designer glass-fibre wallcoverings with natural textures for homes, hotels, schools, hospitals and offices.",
    products: ["novelio-wall-coverings"],
    accent: "#7A8C5E",
  },
  {
    slug: "forms-surfaces-india-catalogue",
    title: "Forms+Surfaces Architectural Surfaces",
    brand: "Forms+Surfaces",
    kind: "Catalogue",
    description:
      "VividGlass decorative laminated glass, stainless steel, bonded metal, bonded quartz and the LEVELe wall cladding system.",
    products: ["architectural-surfaces", "laminated-glass"],
    accent: "#9C7B5B",
  },
  {
    slug: "forms-surfaces-master-presentation",
    title: "Forms+Surfaces Design Portfolio",
    brand: "Forms+Surfaces",
    kind: "Presentation",
    description:
      "Elevator interiors, wall cladding, decorative glass and site elements created for public spaces around the world.",
    products: ["architectural-surfaces"],
    accent: "#9C7B5B",
  },
];

type MediaCatalogue = { pages: number; previewPages: number; bytes: number; aspect: number };
const generated = media.catalogues as Record<string, MediaCatalogue>;

export const CATALOGUES: Catalogue[] = INPUT.flatMap((c) => {
  const m = generated[c.slug];
  return m ? [{ ...c, ...m }] : [];
});

export const catalogueAssets = (c: Pick<Catalogue, "slug">) => ({
  pdf: `/catalogues/${c.slug}.pdf`,
  cover: `/catalogues/covers/${c.slug}.webp`,
  page: (n: number) => `/catalogues/pages/${c.slug}/${n}.webp`,
});

export const getCatalogue = (slug: string) => CATALOGUES.find((c) => c.slug === slug);

export const cataloguesForProduct = (productSlug: string) =>
  CATALOGUES.filter((c) => c.products.includes(productSlug));
