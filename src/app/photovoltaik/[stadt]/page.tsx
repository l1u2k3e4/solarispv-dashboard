import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  CalendarClock,
  MapPin,
  Sun,
  BatteryCharging,
  Plug,
  Thermometer,
  Wrench,
  ArrowRight,
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyButtons } from "@/components/layout/MobileStickyButtons";
import { Button } from "@/components/ui/button";
import {
  kontakt,
  standortseiten,
  stadtteile as moersStadtteile,
  type Standortseite,
} from "@/lib/demo-data";
import {
  SITE_URL,
  breadcrumbListSchema,
  faqPageSchema,
  localBusinessSchema,
  serviceSchema,
  webPageSchema,
  type Standort,
} from "@/lib/seo/schema";

// ---------------------------------------------------------------------------
// Static Params + Metadata
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return standortseiten.map((s) => ({ stadt: s.slug }));
}

type RouteParams = { params: { stadt: string } };

function findStandort(slug: string): Standortseite | undefined {
  return standortseiten.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const standort = findStandort(params.stadt);
  if (!standort) return {};
  const url = `${SITE_URL}/photovoltaik/${standort.slug}/`;
  return {
    title: standort.metaTitle,
    description: standort.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: standort.metaTitle,
      description: standort.metaDescription,
      url,
      type: "website",
      locale: "de_DE",
    },
  };
}

// ---------------------------------------------------------------------------
// Stadtteile / Geo-Snippets pro Stadt
// ---------------------------------------------------------------------------

/**
 * Stadtteile pro Welle-1-Stadt. Quelle: allgemein anerkannte Ortsteile (Wikipedia-Niveau).
 * Für Moers: vollständige Liste aus demo-data.ts. Für die Nachbarstädte je 4–6 Hauptortsteile.
 */
const STADTTEILE_BY_SLUG: Record<string, string[]> = {
  moers: moersStadtteile,
  "neukirchen-vluyn": [
    "Neukirchen",
    "Vluyn",
    "Rayen",
    "Niep",
    "Vluynbusch",
  ],
  "kamp-lintfort": [
    "Kamp",
    "Lintfort",
    "Niersenbruch",
    "Hoerstgen",
    "Geisbruch",
    "Kamperbrück",
  ],
  rheinberg: [
    "Rheinberg-Stadt",
    "Borth",
    "Budberg",
    "Orsoy",
    "Ossenberg",
    "Millingen",
  ],
  voerde: [
    "Voerde-Mitte",
    "Friedrichsfeld",
    "Spellen",
    "Möllen",
    "Götterswickerhamm",
    "Holthausen",
  ],
};

const REGION_STAEDTE = standortseiten.filter((s) => s.slug !== "niederrhein");

// ---------------------------------------------------------------------------
// Page-Komponente
// ---------------------------------------------------------------------------

export default function StandortseitePage({ params }: RouteParams) {
  const standort = findStandort(params.stadt);
  if (!standort) {
    notFound();
  }

  const isHub = standort.slug === "niederrhein";
  const stadtteile = STADTTEILE_BY_SLUG[standort.slug] ?? [];
  const km = standort.kmFromMoers;

  const definition =
    isHub
      ? `Photovoltaik am Niederrhein bedeutet bei Solaris PV: Andreas Mellies plant jede Anlage persönlich, mit 9 Hersteller-Optionen, Nullsteuersatz nach § 12 Abs. 3 UStG und Anfahrt im 30-km-Radius des Bürostandorts Moers.`
      : `Photovoltaik in ${standort.city} bedeutet bei Solaris PV: Andreas Mellies plant Ihre Anlage persönlich, mit 9 Hersteller-Optionen, Nullsteuersatz nach § 12 Abs. 3 UStG und ${km}-km-Anfahrt aus dem Bürostandort Moers.`;

  const heroSubclaim = isHub
    ? "48 h bis Vor-Ort-Termin · Anfahrt im 30-km-Radius im Festpreis enthalten"
    : `48 h bis Vor-Ort-Termin · Anfahrt ${km} km im Festpreis enthalten`;

  // ---- FAQs (lokal-spezifisch) -------------------------------------------
  const faqItems = [
    {
      question: isHub
        ? "Was kostet eine PV-Anlage am Niederrhein?"
        : `Was kostet eine PV-Anlage in ${standort.city}?`,
      answer: `Eine 10-kWp-Anlage mit 10-kWh-Speicher liegt 2026 typischerweise zwischen 18.000 € und 24.000 € — durch den Nullsteuersatz nach § 12 Abs. 3 UStG sind das gleichzeitig die Brutto-Preise. Das konkrete Festpreis-Angebot machen wir nach einem 60-minütigen Vor-Ort-Termin in ${
        isHub ? "Ihrer Region am Niederrhein" : standort.city
      }.`,
    },
    {
      question: "Welche Förderung gilt 2026?",
      answer:
        "2026 gilt der dauerhafte Nullsteuersatz nach § 12 Abs. 3 UStG (0 % MwSt. auf PV, Speicher, Montage), die Steuerfreiheit des Eigenverbrauchs nach § 3 Nr. 72 EStG bis 30 kWp, der KfW-270-Kredit und progres.NRW als Landeszuschuss. Die passende Förder-Kombination prüfen wir im Beratungstermin.",
    },
    {
      question: "Wie lange dauert die Installation?",
      answer:
        "Vom Auftrag bis zur Inbetriebnahme dauert es typischerweise 6 bis 10 Wochen — DC-Komponenten benötigen 4 bis 6 Wochen Lieferzeit, die Montage selbst ist in 2 bis 3 Tagen erledigt, die Inbetriebnahme inklusive Marktstammdaten-Anmeldung folgt unmittelbar.",
    },
  ];

  // ---- Schema.org JSON-LD ------------------------------------------------
  const standortKey = standort.slug as Standort;
  const baseLocalBusiness = localBusinessSchema(standortKey);
  // Stadt-spezifischer areaServed: bei Hub bleibt die Default-Liste, bei Stadt-Seite
  // wird der areaServed auf die Stadt fokussiert (mit AdministrativeArea-Bezug).
  const localBusiness = isHub
    ? baseLocalBusiness
    : {
        ...baseLocalBusiness,
        areaServed: [
          {
            "@type": "City" as const,
            name: standort.city,
            containedInPlace: {
              "@type": "AdministrativeArea" as const,
              name: "Niederrhein, NRW",
            },
          },
        ],
      };

  const service = serviceSchema({
    serviceType: "Photovoltaik-Installation",
    name: isHub
      ? "Photovoltaik am Niederrhein"
      : `Photovoltaik in ${standort.city}`,
    description: standort.metaDescription,
    url: `/photovoltaik/${standort.slug}/`,
    areaServed: isHub
      ? ["Moers", "Neukirchen-Vluyn", "Kamp-Lintfort", "Rheinberg", "Voerde", "Niederrhein"]
      : [standort.city],
  });

  const breadcrumbs = breadcrumbListSchema([
    { name: "Start", url: "/" },
    { name: "Standorte", url: "/standorte/" },
    {
      name: standort.city,
      url: `/photovoltaik/${standort.slug}/`,
    },
  ]);

  const webPage = webPageSchema({
    url: `/photovoltaik/${standort.slug}/`,
    name: standort.metaTitle,
    description: standort.metaDescription,
  });

  const faqSchema = faqPageSchema(
    faqItems.map((f) => ({ question: f.question, answer: f.answer }))
  );

  // ---- Quer-Verlinkung: 3 andere Welle-1-Städte (deterministisch) --------
  const otherCities = standortseiten
    .filter((s) => s.slug !== standort.slug && s.slug !== "niederrhein")
    .slice(0, 3);

  const hubLink =
    standort.slug === "niederrhein" ? null : "/photovoltaik/niederrhein/";

  // ---- Service-Icons (für Fokus-Badges) ----------------------------------
  const serviceIconBySlug: Record<string, typeof Sun> = {
    photovoltaik: Sun,
    stromspeicher: BatteryCharging,
    wallbox: Plug,
    waermepumpe: Thermometer,
    "e-check": Wrench,
  };
  const serviceLabelBySlug: Record<string, string> = {
    photovoltaik: "Photovoltaik-Anlage",
    stromspeicher: "Stromspeicher",
    wallbox: "Wallbox & Ladelösung",
    waermepumpe: "Wärmepumpe",
    "e-check": "E-Check & Elektroinstallation",
  };

  return (
    <>
      <Header />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="pb-16 lg:pb-0">
        {/* -------------------------------------------------------------- */}
        {/* HERO                                                            */}
        {/* -------------------------------------------------------------- */}
        <section className="relative overflow-hidden bg-accent text-white">
          <div className="container-wide py-16 lg:py-24">
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-300">
                {isHub
                  ? "Region-Hub Niederrhein"
                  : `Standort ${standort.city} · ${km} km Bürostandort Moers`}
              </p>
              <h1 className="mt-4 text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">
                {isHub
                  ? "Photovoltaik am Niederrhein — vom Elektro-Meisterbetrieb"
                  : `Photovoltaik in ${standort.city} — vom Elektro-Meisterbetrieb`}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">
                {heroSubclaim}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="default" size="xl">
                  <a href={kontakt.hauptsitz.telLink}>
                    <Phone className="h-5 w-5" />
                    {kontakt.hauptsitz.tel}
                  </a>
                </Button>
                <Button asChild variant="outline-white" size="xl">
                  <a href="/#kontakt">
                    <CalendarClock className="h-5 w-5" />
                    Vor-Ort-Termin anfragen
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* DEFINITION-BLOCK (AI-citable)                                   */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container-narrow">
            <div className="rounded-xl border-2 border-border bg-gray-50 p-6 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
                Was Photovoltaik {isHub ? "am Niederrhein" : `in ${standort.city}`} bei Solaris PV bedeutet
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground">
                {definition}
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* LOKALE PRÄSENZ — Stadtteile ODER Region-Liste                  */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="container-wide">
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
                <MapPin className="mr-1 inline h-4 w-4" aria-hidden="true" />
                {isHub ? "Welle-1-Städte im 30-km-Radius" : `Stadtteile in ${standort.city}`}
              </p>
              <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
                {isHub
                  ? "Wir sind in der gesamten Region am Niederrhein vor Ort."
                  : `Wir bedienen ${standort.city} und die umliegenden Stadtteile.`}
              </h2>

              {isHub ? (
                <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {REGION_STAEDTE.map((s) => (
                    <li
                      key={s.slug}
                      className="rounded-lg border-2 border-border bg-white p-5 transition-colors hover:border-solaris-500"
                    >
                      <Link
                        href={`/photovoltaik/${s.slug}/`}
                        className="flex items-baseline justify-between gap-3"
                      >
                        <span className="text-lg font-bold text-navy-500">
                          {s.city}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {s.kmFromMoers} km
                        </span>
                      </Link>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {s.einwohner.toLocaleString("de-DE")} Einwohner
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <ul className="mt-10 flex flex-wrap gap-2">
                    {stadtteile.map((teil) => (
                      <li
                        key={teil}
                        className="rounded-pill border border-border bg-white px-4 py-2 text-sm font-medium text-foreground"
                      >
                        {teil}
                      </li>
                    ))}
                    {standort.slug !== "moers" && (
                      <li className="rounded-pill border border-dashed border-border px-4 py-2 text-sm font-medium text-muted-foreground">
                        und weitere
                      </li>
                    )}
                  </ul>
                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                    {standort.einwohner > 0 && (
                      <>
                        {standort.city} hat rund{" "}
                        {standort.einwohner.toLocaleString("de-DE")} Einwohner.
                        {" "}
                      </>
                    )}
                    Andreas Mellies plant jede Anlage persönlich vor Ort — keine
                    Sub-Subunternehmer, kein anonymes Sales-Team.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* GEO-STATISTIK + LEISTUNGEN                                      */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container-wide grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
                Sonneneinstrahlung Niederrhein
              </p>
              <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
                Was eine PV-Anlage hier wirklich leistet.
              </h2>
              <div className="prose prose-slate mt-6 max-w-none">
                <p>
                  Die Sonneneinstrahlung am Niederrhein liegt zwischen{" "}
                  <strong>950 und 1.050 kWh/kWp pro Jahr</strong> (DWD-Strahlungsdaten,
                  Referenzperiode 1991–2020). Das ist solide Mittelklasse für
                  Deutschland — keine Spitzenwerte wie in Süddeutschland, aber
                  zuverlässig genug, um eine PV-Anlage in 10 bis 14 Jahren
                  amortisieren zu lassen.
                </p>
                <p>
                  Eine typische EFH-Anlage in {isHub ? "der Region" : standort.city}{" "}
                  liegt zwischen <strong>8 und 12 kWp</strong>. Mit einem
                  10-kWh-Speicher steigt die Eigenverbrauchsquote von rund 30 % auf{" "}
                  <strong>60 bis 75 %</strong> (HTW Berlin Stromspeicher-Inspektion
                  2024). Das ist der Punkt, an dem der Speicher sich rechnet — und
                  der Punkt, an dem Sektorenkopplung mit Wärmepumpe oder Wallbox
                  wirtschaftlich wird.
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
                Leistungen für {isHub ? "die Region" : standort.city}
              </p>
              <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
                Was wir hier umsetzen.
              </h2>
              <ul className="mt-6 grid gap-3">
                {standort.fokus.map((slug) => {
                  const Icon = serviceIconBySlug[slug] ?? Sun;
                  return (
                    <li
                      key={slug}
                      className="flex items-start gap-3 rounded-lg border border-border bg-gray-50 p-4"
                    >
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy-500">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-bold text-foreground">
                          {serviceLabelBySlug[slug] ?? slug}
                        </p>
                        <Link
                          href={`/leistungen/${slug}/`}
                          className="text-sm text-solaris-700 hover:underline"
                        >
                          Details zur Leistung
                          <ArrowRight className="ml-1 inline h-3 w-3" aria-hidden="true" />
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* HERSTELLER-EMPFEHLUNG                                           */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="container-narrow">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
              Hersteller-Empfehlung für {isHub ? "den Niederrhein" : standort.city}
            </p>
            <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
              Welche Hersteller sich hier in der Praxis bewährt haben.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Solaris PV arbeitet mit 9 Herstellern und ist an keinen einzelnen
              Lieferanten gebunden. Für{" "}
              {isHub ? "den Niederrhein" : `${standort.city} und Umgebung`} hat sich
              in den letzten Jahren diese Kombination als Default-Setup
              etabliert — gerade für die typischen Satteldächer aus den 60er-
              bis 90er-Jahren, die hier den Bestand prägen:
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              <li className="rounded-lg border-2 border-border bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-solaris-700">
                  Premium-Modul
                </p>
                <p className="mt-1 text-lg font-bold">Meyer Burger</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Made in Germany, 30 Jahre Produktgarantie — wenn maximale
                  Lebensdauer gefragt ist.
                </p>
              </li>
              <li className="rounded-lg border-2 border-border bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-solaris-700">
                  Volumen-Modul (Mid-Range)
                </p>
                <p className="mt-1 text-lg font-bold">Jinko-Solar</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Bestes Preis-/Leistungs-Verhältnis — wenn Wirtschaftlichkeit
                  vor Premium-Optik steht.
                </p>
              </li>
              <li className="rounded-lg border-2 border-border bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-solaris-700">
                  Speicher + Energiemanager
                </p>
                <p className="mt-1 text-lg font-bold">FENECON</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Sektorenkopplung mit Wärmepumpe und Wallbox — der FEMS-Manager
                  steuert alles aus einer Logik.
                </p>
              </li>
              <li className="rounded-lg border-2 border-border bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-solaris-700">
                  Montagesystem
                </p>
                <p className="mt-1 text-lg font-bold">Lorenz</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Statisch geprüfte Aufständerung für Aufdach, Indach und
                  Flachdach — robust für die typischen Niederrhein-Dachformen.
                </p>
              </li>
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Welche Kombination bei Ihnen wirklich passt, klären wir im
              Vor-Ort-Termin — abhängig von Dachform, Verschattung,
              Stromverbrauch und Budget. Ein typisches Setup für ein EFH in{" "}
              {isHub ? "der Region" : standort.city} ist 10 kWp Jinko-Module mit
              FENECON-Home-10-Speicher, kombiniert mit einer ABB-Wallbox.
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* ANFAHRT-INFO                                                    */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container-narrow">
            <div className="rounded-xl border-2 border-solaris-200 bg-solaris-50 p-6 sm:p-10">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-2xl leading-tight">
                    Anfahrt {isHub ? "am Niederrhein" : `nach ${standort.city}`}
                  </h2>
                  <p className="mt-3 leading-relaxed text-foreground">
                    {isHub ? (
                      <>
                        Solaris PV operiert aus dem Bürostandort{" "}
                        <strong>Grünbergstr. 39a, 47445 Moers</strong>. Im
                        30-km-Radius — also in allen 5 Welle-1-Städten — ist
                        die Anfahrt im Festpreis enthalten. Premium-Anfragen
                        bedienen wir bis 60 km Entfernung.
                      </>
                    ) : (
                      <>
                        <strong>{standort.city}</strong> ist <strong>{km} km</strong>{" "}
                        vom Solaris-Bürostandort{" "}
                        <strong>Grünbergstr. 39a, 47445 Moers</strong> entfernt.
                        Anfahrt für Vor-Ort-Termin und Montage ist im Festpreis
                        enthalten — keine versteckten Kilometer-Pauschalen.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* MINI-FAQ                                                        */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="container-narrow">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
              Häufige Fragen
            </p>
            <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
              Was Kunden in {isHub ? "der Region" : standort.city} oft fragen.
            </h2>
            <dl className="mt-10 grid gap-5">
              {faqItems.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-lg border-2 border-border bg-white p-6"
                >
                  <dt className="text-lg font-bold text-navy-500">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* QUER-VERLINKUNG                                                 */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container-wide">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
              Weitere Standorte & Leistungen
            </p>
            <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
              Solaris PV ist auch hier vor Ort.
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {hubLink && (
                <Link
                  href={hubLink}
                  className="group rounded-lg border-2 border-solaris-500 bg-white p-5 transition-colors hover:bg-solaris-50"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-solaris-700">
                    Region-Hub
                  </p>
                  <p className="mt-2 text-lg font-bold text-navy-500">
                    Niederrhein
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Übersicht aller Welle-1-Städte
                  </p>
                  <ArrowRight
                    className="mt-3 h-4 w-4 text-solaris-700 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              )}

              {otherCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/photovoltaik/${city.slug}/`}
                  className="group rounded-lg border-2 border-border bg-white p-5 transition-colors hover:border-solaris-500"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Standort
                  </p>
                  <p className="mt-2 text-lg font-bold text-navy-500">
                    {city.city}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {city.kmFromMoers} km von Moers
                  </p>
                  <ArrowRight
                    className="mt-3 h-4 w-4 text-solaris-700 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/leistungen/photovoltaik/"
                className="text-sm font-bold text-solaris-700 hover:underline"
              >
                Alle Leistungen ansehen
                <ArrowRight className="ml-1 inline h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* CTA-BLOCK                                                       */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-accent py-16 text-white lg:py-20">
          <div className="container-narrow text-center">
            <h2 className="text-3xl leading-tight sm:text-4xl">
              {isHub
                ? "Photovoltaik am Niederrhein? Andreas Mellies ruft Sie zurück."
                : `Photovoltaik in ${standort.city}? Andreas Mellies ruft Sie zurück.`}
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              48 h bis Vor-Ort-Termin · Festpreis-Angebot nach Begehung · Anfahrt
              inklusive.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild variant="default" size="xl">
                <a href={kontakt.hauptsitz.telLink}>
                  <Phone className="h-5 w-5" />
                  {kontakt.hauptsitz.tel}
                </a>
              </Button>
              <Button asChild variant="outline-white" size="xl">
                <a href="/#kontakt">
                  <CalendarClock className="h-5 w-5" />
                  Termin online anfragen
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyButtons />
    </>
  );
}
