import type { MetadataRoute } from "next";

import { services } from "@/lib/demo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.solarispv.de";
  const lastModified = new Date();

  // Static public routes (no /admin /studio /style-guide /api)
  const staticPaths = [
    "/",
    "/partner",
    "/so-laeuft-es",
    "/foerderung-photovoltaik-2026",
    "/notdienst",
    "/rechner/photovoltaik",
    "/b2b/hausverwaltungen",
    "/impressum",
    "/datenschutz",
  ];

  const servicesPaths = services.map((s) => `/leistungen/${s.slug}`);

  const standortePaths = [
    "/photovoltaik/moers",
    "/photovoltaik/neukirchen-vluyn",
    "/photovoltaik/kamp-lintfort",
    "/photovoltaik/rheinberg",
    "/photovoltaik/voerde",
    "/photovoltaik/niederrhein",
  ];

  return [...staticPaths, ...servicesPaths, ...standortePaths].map((path) => ({
    url: base + path,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority:
      path === "/" ? 1.0 : path.startsWith("/photovoltaik/") ? 0.8 : 0.7,
  }));
}
