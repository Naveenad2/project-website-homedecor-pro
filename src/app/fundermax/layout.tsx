import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// The gallery page itself is a client component, so its metadata lives here.
export const metadata: Metadata = buildMetadata({
  title: "Fundermax HPL Cladding Projects in Kochi & Kerala",
  description: "Fundermax HPL exterior cladding projects by Precise Homes — wood-look façades, gates, balconies and compound walls across Kochi, Ernakulam and Kerala.",
  path: "/fundermax",
  image: "/media/og/products/fundermax-hpl-cladding.jpg",
  keywords: ["fundermax cladding", "fundermax cladding kerala", "hpl cladding kochi", "high pressure laminates", "exterior cladding ernakulam"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
