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
    return [
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
  },
};

export default nextConfig;
