import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "A One Juice & Ice Cream Sahiwal",
    short_name: "A One Juice",
    description:
      "Fresh juices, power shakes, milk shakes, ice cream & more in Sahiwal, Punjab, Pakistan.",
    start_url: "/",
    display: "standalone",
    background_color: "#080810",
    theme_color: "#FFD700",
    orientation: "portrait",
    categories: ["food", "drink", "lifestyle"],
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
