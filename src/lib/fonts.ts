import { Syne, Plus_Jakarta_Sans } from "next/font/google";

// Shared font instances for the new sections (same families the site already uses),
// declared once so they are not re-instantiated in every component.
export const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
