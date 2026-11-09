import { Syne } from "next/font/google";

// The site's original typeface (same family and weights as the original Hero / Navbar / Gallery).
export const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
