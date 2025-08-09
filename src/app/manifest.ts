import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Quilted Chronicles - Collaborative Storytelling",
    short_name: "Quilted Chronicles",
    description:
      "Join the ultimate collaborative storytelling community. Write chapters, continue stories, and explore multiple endings.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon1.jpeg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/icon2.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
    categories: ["books", "entertainment", "education", "lifestyle"],
    orientation: "portrait",
    scope: "/",
    lang: "en",
    dir: "ltr",
  };
}
