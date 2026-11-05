import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Precise Homes — Windows, Glass & Cladding, Kochi",
    short_name: "Precise Homes",
    description: "Saint-Gobain uPVC windows, glass, shower partitions, glass handrails, Fundermax HPL and iCLAD cladding in Kochi, Kerala.",
    start_url: "/",
    display: "standalone",
    background_color: "#03070b",
    theme_color: "#03070b",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
