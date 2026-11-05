import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// The gallery page itself is a client component, so its metadata lives here.
export const metadata: Metadata = buildMetadata({
  title: "Saint-Gobain Glass & uPVC Windows in Kochi — Projects",
  description: "Saint-Gobain glass and uPVC window projects by Precise Homes in Kochi, Ernakulam and Kerala — sliding, casement and French windows, glass doors, partitions and glazing.",
  path: "/saint-gobain",
  image: "/media/og/products/saint-gobain-glass.jpg",
  keywords: ["saint gobain glass", "saint gobain windows", "saint gobain upvc windows kochi", "upvc windows cochin", "saint gobain dealer kochi"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
