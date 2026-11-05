// Kept separate from products.ts so client components can import the category
// list without pulling the full product copy into the browser bundle.
export type ProductCategory = "windows-doors" | "glass" | "cladding" | "walls-surfaces" | "roofing";

export const CATEGORIES: { key: ProductCategory | "all"; label: string }[] = [
  { key: "all", label: "All Products" },
  { key: "windows-doors", label: "Windows & Doors" },
  { key: "glass", label: "Glass" },
  { key: "cladding", label: "Cladding & HPL" },
  { key: "walls-surfaces", label: "Walls & Surfaces" },
  { key: "roofing", label: "Roofing" },
];
