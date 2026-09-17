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
    /* Versioned for the same reason as the link tags in the root layout: an
       installed icon is cached per origin and will not be replaced otherwise. */
    icons: [
      { src: "/icon-192.png?v=3", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/favicon.png?v=3", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
  };
}
