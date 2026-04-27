// Schema.org JSON-LD Helpers
// Wird in Phase 1 erweitert (FAQPage, Service, JobPosting, Article, BreadcrumbList).

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.elektro-sternhoff.de";

export const STERNHOFF_BOCHUM = {
  "@type": "PostalAddress",
  streetAddress: "Bessemerstr. 80",
  postalCode: "44793",
  addressLocality: "Bochum",
  addressCountry: "DE",
} as const;

export const STERNHOFF_CASTROP = {
  "@type": "PostalAddress",
  streetAddress: "Gerther Str. 37",
  postalCode: "44577",
  addressLocality: "Castrop-Rauxel",
  addressCountry: "DE",
} as const;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    name: "Elektro Sternhoff GmbH",
    url: SITE_URL,
    telephone: "+49-2305-5488875",
    email: "info@elektro-sternhoff.de",
    address: [STERNHOFF_BOCHUM, STERNHOFF_CASTROP],
    sameAs: [],
  };
}

export function localBusinessSchema(opts: {
  standort: "bochum" | "castrop";
  areaServed?: string;
}) {
  const address =
    opts.standort === "bochum" ? STERNHOFF_BOCHUM : STERNHOFF_CASTROP;
  return {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    name: "Elektro Sternhoff GmbH",
    url: SITE_URL,
    telephone: "+49-2305-5488875",
    address,
    areaServed: opts.areaServed
      ? { "@type": "City", name: opts.areaServed }
      : undefined,
    openingHours: "Mo-Fr 07:30-17:00",
  };
}
