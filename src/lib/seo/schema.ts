// Schema.org JSON-LD Helpers — Solaris PV
// Brand-Migration Prompt 09 (Subagent C). NAP-Quelle: Memory.md §Brand-Token + §7-Tabelle.
// Inhaber: Andreas Mellies. Marketing-Standort: Grünbergstr. 39a, 47445 Moers.
// Sitz (Impressum): Birkenstr. 12, 47447 Moers.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.solarispv.de";

// TODO P10 Telefon und E-Mail final aus Impressum / Mellies-Briefing übernehmen.
const TELEPHONE_PLACEHOLDER = "+49 2841 ____"; // TODO P10
const EMAIL_PLACEHOLDER = "info@solarispv.de"; // TODO P10

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

/** Sitz für Impressum / LegalAddress */
export const IMPRESSUM_MOERS = {
  "@type": "PostalAddress",
  streetAddress: "Birkenstr. 12",
  postalCode: "47447",
  addressLocality: "Moers",
  addressRegion: "NRW",
  addressCountry: "DE",
} as const;

/** Solaris PV Business-Stammdaten (Inhaber Andreas Mellies) */
export const LOCAL_BUSINESS_BASE = {
  name: "Solaris PV",
  // TODO Rechtsform mit Mellies klären (Einzelunternehmen / e.K. / GmbH).
  legalName: "Solaris PV Andreas Mellies",
  founderName: "Andreas Mellies",
  description:
    "Solaris PV – Photovoltaik-Fachbetrieb aus Moers für den Niederrhein. Planung, Installation, Wartung von PV-Anlagen, Speichern, Wallboxen.",
  url: SITE_URL,
  telephone: TELEPHONE_PLACEHOLDER,
  email: EMAIL_PLACEHOLDER,
  image: `${SITE_URL}${LOGO_PATH}`,
  logo: `${SITE_URL}${LOGO_PATH}`,
  priceRange: "€€",
  areaServed: ["Moers", "Krefeld", "Duisburg", "Niederrhein"],
} as const;

// --- Helper-Types ---------------------------------------------------------

export type Standort = "moers";

type FaqItem = { question: string; answer: string };

type BreadcrumbItem = { name: string; url: string };

// --- LocalBusiness --------------------------------------------------------

/**
 * JSON-LD LocalBusiness / ProfessionalService Schema für Solaris PV.
 * Nutzt dual `@type` für maximale Rich-Result-Kompatibilität.
 *
 * @param standort optional. Default = "moers" (aktuell einziger Standort).
 */
export function localBusinessSchema(standort?: Standort) {
  // Solaris hat aktuell nur einen Standort — Argument ist Vorbereitung für spätere Filialen.
  void standort;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
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
    // Marketing-Standort als primäre Adresse, Impressum-Sitz als zweite Adresse.
    // Google liest die erste Adresse als NAP-Citation.
    address: [BUERO_MOERS, IMPRESSUM_MOERS],
    areaServed: LOCAL_BUSINESS_BASE.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
    founder: {
      "@type": "Person",
      name: LOCAL_BUSINESS_BASE.founderName,
      jobTitle: "Inhaber & Geschäftsführer",
    },
    // openingHoursSpecification: TODO P10 öffnungszeiten verifizieren
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
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
