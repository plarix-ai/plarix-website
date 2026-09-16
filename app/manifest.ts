import type { MetadataRoute } from "next";

import { entity } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Plarix",
    short_name: "Plarix",
    description: entity.disambiguating,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/favicon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
