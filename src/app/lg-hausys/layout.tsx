import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// The gallery page itself is a client component, so its metadata lives here.
export const metadata: Metadata = buildMetadata({
  title: "LG Hausys Interior Surfaces & Panels in Kochi",
  description: "LG Hausys interior surface projects by Precise Homes in Kochi and Kerala — wood-look ceiling panels, feature walls, HI-MACS solid surfaces and interior films.",
  path: "/lg-hausys",
  image: "/media/og/products/lg-hausys-surfaces.jpg",
  keywords: ["lg hausys kochi", "lx hausys kerala", "hi-macs kochi", "interior panels kochi"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
