/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  async redirects() {
    // Mappings auf Basis von analyse/01-scraping/sitemap.json (16 alte Solaris-PV-URLs).
    // Anchor-Mappings nur dort, wo der Title in sitemap.json eindeutig ist; ansonsten
    // Catch-All `/startseite/unsere-partner/:slug -> /partner` als sicheres Fallback.
    const baseRedirects = [
      {
        source: "/galerie",
        destination: "/photovoltaik/moers#projekte",
        permanent: true,
      },
      {
        source: "/kontakt",
        destination: "/#foerderberatung",
        permanent: true,
      },
      {
        source: "/ueber-uns",
        destination: "/#inhaber",
        permanent: true,
      },
      {
        source: "/startseite/unsere-partner",
        destination: "/partner",
        permanent: true,
      },
      {
        source: "/startseite/unsere-partner/:slug",
        destination: "/partner",
        permanent: true,
      },
    ];

    // Dashboard-Variante: wenn IS_DASHBOARD=true (gesetzt im Vercel-Projekt
    // solarispv-dashboard), leitet die Root-URL direkt auf das Lead-Inbox-
    // Dashboard, damit Partner-Links nicht auf der Marketing-Home landen.
    if (process.env.IS_DASHBOARD === "true") {
      return [
        { source: "/", destination: "/admin/inbox", permanent: false },
        ...baseRedirects,
      ];
    }

    return baseRedirects;
  },
};

export default nextConfig;
