import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/account/", "/settings/", "/verify/", "/api/"],
        crawlDelay: 1,
      },
      {
        userAgent: [
          "GPTBot",
          "Google-Extended",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
        ],
        disallow: "/",
      },
    ],
    sitemap: "https://www.quiltedchronicles.com/sitemap.xml",
  };
}
