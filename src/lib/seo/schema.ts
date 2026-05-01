// Schema.org JSON-LD Helpers — Solaris PV
// Inhaber: Andreas Mellies. Marketing-Standort: Grünbergstr. 39a, 47445 Moers.
// Sitz (Impressum): Birkenstr. 12, 47447 Moers.
// Werte verifiziert in Prompt 10 — Quellen siehe ../../_solaris-stammdaten.md

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.solarispv.de";

const TELEPHONE = "+4928418163727"; // E.164 — Quelle: solarispv.de/impressum
const EMAIL = "energie@solarispv.de"; // Quelle: solarispv.de/impressum

const LOGO_PATH = "/images/logo-solaris-pv.png";

// --- NAP-Konstanten -------------------------------------------------------

/** Marketing-/Hauptstandort (NAP-Quelle für LocalBusiness, GMB, Citations) */
export const BUERO_MOERS = {
  "@type": "PostalAddress",
  streetAddress: "Grünbergstr. 39a",
  postalCode: "47445",
  addressLocality: "Moers",
  addressRegion: "NRW",
  addressCountry: "DE",
} as const;

/** Geokoordinaten Bürostandort — OSM Nominatim 2026-05-01 (Straße, nicht Hausnummer) */
export const BUERO_GEO = {
  "@type": "GeoCoordinates",
  latitude: 51.4726644,
  longitude: 6.6039919,
} as const;

/** Sitz für Impressum / LegalAddress */
export const IMPRESSUM_MOERS = {
  "@type": "PostalAddress",
  streetAddress: "Birkenstraße 12",
  postalCode: "47447",
  addressLocality: "Moers",
  addressRegion: "NRW",
  addressCountry: "DE",
} as const;

/** Solaris PV Business-Stammdaten (Inhaber Andreas Mellies) */
export const LOCAL_BUSINESS_BASE = {
  name: "Solaris PV",
  // ❓ Rechtsform vor Live-Gang verifizieren (Einzelunternehmen / e.K. / GmbH); siehe _offene-fragen.md B2
  legalName: "SolarisPV Inh. Andreas Mellies",
  founderName: "Andreas Mellies",
  description:
    "Solaris PV — Photovoltaik vom Elektro-Meisterbetrieb in Moers. Andreas Mellies plant PV-Anlagen, Speicher, Wallboxen und Wärmepumpen für den Niederrhein persönlich.",
  url: SITE_URL,
  telephone: TELEPHONE,
  email: EMAIL,
  image: `${SITE_URL}${LOGO_PATH}`,
  logo: `${SITE_URL}${LOGO_PATH}`,
  priceRange: "€€",
  vatID: "DE216715857",
  areaServed: [
    "Moers",
    "Neukirchen-Vluyn",
    "Kamp-Lintfort",
    "Rheinberg",
    "Voerde",
    "Duisburg",
    "Krefeld",
    "Dinslaken",
    "Niederrhein",
  ],
} as const;

// --- Helper-Types ---------------------------------------------------------

export type Standort =
  | "moers"
  | "neukirchen-vluyn"
  | "kamp-lintfort"
  | "rheinberg"
  | "voerde"
  | "niederrhein";

type FaqItem = { question: string; answer: string };

type BreadcrumbItem = { name: string; url: string };

// --- LocalBusiness --------------------------------------------------------

/**
 * JSON-LD LocalBusiness / ProfessionalService Schema für Solaris PV.
 * Nutzt dual `@type` für maximale Rich-Result-Kompatibilität.
 *
 * @param standort optional. Default = "moers" (Bürostandort).
 */
export function localBusinessSchema(standort?: Standort) {
  // Solaris hat aktuell nur einen Standort — Argument ist Vorbereitung für spätere Filialen.
  void standort;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "Electrician"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: LOCAL_BUSINESS_BASE.name,
    legalName: LOCAL_BUSINESS_BASE.legalName,
    description: LOCAL_BUSINESS_BASE.description,
    url: LOCAL_BUSINESS_BASE.url,
    telephone: LOCAL_BUSINESS_BASE.telephone,
    email: LOCAL_BUSINESS_BASE.email,
    image: LOCAL_BUSINESS_BASE.image,
    logo: LOCAL_BUSINESS_BASE.logo,
    priceRange: LOCAL_BUSINESS_BASE.priceRange,
    vatID: LOCAL_BUSINESS_BASE.vatID,
    // Marketing-Standort als primäre Adresse, Impressum-Sitz als zweite Adresse.
    // Google liest die erste Adresse als NAP-Citation.
    address: [BUERO_MOERS, IMPRESSUM_MOERS],
    geo: BUERO_GEO,
    areaServed: LOCAL_BUSINESS_BASE.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
    founder: {
      "@type": "Person",
      name: LOCAL_BUSINESS_BASE.founderName,
      jobTitle: "Inhaber & Elektro-Meister",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "16:00",
      },
    ],
    sameAs: [] as string[],
  } as const;
}

// --- BreadcrumbList -------------------------------------------------------

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  } as const;
}

// --- WebPage --------------------------------------------------------------

export function webPageSchema(opts: {
  url: string;
  name: string;
  description?: string;
  inLanguage?: string;
}) {
  const absoluteUrl = opts.url.startsWith("http")
    ? opts.url
    : `${SITE_URL}${opts.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl}#webpage`,
    url: absoluteUrl,
    name: opts.name,
    description: opts.description,
    inLanguage: opts.inLanguage ?? "de-DE",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Solaris PV",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Solaris PV",
    },
  } as const;
}

// --- FAQPage --------------------------------------------------------------

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } as const;
}

// --- Service --------------------------------------------------------------

export function serviceSchema(opts: {
  serviceType: string;
  name: string;
  description: string;
  url?: string;
  areaServed?: readonly string[];
}) {
  const areas = opts.areaServed ?? LOCAL_BUSINESS_BASE.areaServed;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.serviceType,
    name: opts.name,
    description: opts.description,
    url: opts.url
      ? opts.url.startsWith("http")
        ? opts.url
        : `${SITE_URL}${opts.url}`
      : undefined,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Solaris PV",
      founder: {
        "@type": "Person",
        name: LOCAL_BUSINESS_BASE.founderName,
      },
    },
    areaServed: areas.map((name) => ({ "@type": "City", name })),
  } as const;
}
