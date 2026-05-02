import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/studio/", "/api/", "/style-guide"],
      },
    ],
    sitemap: "https://www.solarispv.de/sitemap.xml",
    host: "https://www.solarispv.de",
  };
}
