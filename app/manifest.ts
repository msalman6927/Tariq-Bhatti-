import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tariq Ahmed Bhatti Campaign | Sahiwal Chamber Elections 2026-28",
    short_name: "Tariq Ahmed Bhatti",
    description:
      "Vote and support Tariq Ahmed Bhatti for Sahiwal Chamber Elections 2026-28.",
    start_url: "/",
    display: "standalone",
    background_color: "#07172d",
    theme_color: "#d4af37",
    orientation: "portrait",
    categories: ["business", "politics"],
    lang: "en-PK",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
