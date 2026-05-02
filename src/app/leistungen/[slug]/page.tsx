import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, CalendarClock, ArrowRight, ChevronRight } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyButtons } from "@/components/layout/MobileStickyButtons";
import { Button } from "@/components/ui/button";
import { kontakt, services, faqs, type Service } from "@/lib/demo-data";
import { SITE_URL, breadcrumbListSchema, faqPageSchema } from "@/lib/seo/schema";

// ---------------------------------------------------------------------------
// Static Params + Metadata
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type RouteParams = { params: { slug: string } };

function findService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const service = findService(params.slug);
  if (!service) return {};
  const url = `${SITE_URL}/leistungen/${service.slug}/`;
  const title = `${service.name} — Solaris PV Moers`;
  const description = service.description;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "de_DE",
      images: ["/og-image.png"],
    },
  };
}

// ---------------------------------------------------------------------------
// Service-spezifische Bullets (fachlich, nicht erfunden — Strategie-Brief §4)
// ---------------------------------------------------------------------------

const SERVICE_BULLETS: Record<string, string[]> = {
  photovoltaik: [
    "Auslegung nach DWD-Strahlungsdaten Niederrhein (950–1.050 kWh/kWp/Jahr)",
    "Aufdach, Indach und Flachdach — alle gängigen Dachformen",
    "Statik-Prüfung vor Montage inkludiert",
    "9 Hersteller-Optionen (Meyer Burger, Jinko, Hyundai, …)",
    "Anmeldung Marktstammdatenregister + Netzbetreiber inklusive",
    "Nullsteuersatz § 12 Abs. 3 UStG bereits eingerechnet",
  ],
  stromspeicher: [
    "Heim- und Hybrid-Speicher 5–30 kWh",
    "FENECON Home, RCT-Power, Huawei LUNA2000",
    "Notstrom-Funktion bei Hybrid-Wechselrichtern",
    "Energiemanager (FEMS) für Sektorenkopplung",
    "Eigenverbrauchsquote von 30 % auf 60–75 % steigerbar",
    "progres.NRW-Zuschuss 100 €/kWh bei Neuanlagen prüfen",
  ],
  wallbox: [
    "Wallboxen 11 kW und 22 kW für Privat",
    "Lastmanagement für Mehrparteien-Häuser und Firmen",
    "PV-Überschuss-Laden mit Energiemanager",
    "ABB- und Huawei-Wallboxen aus dem Standard-Setup",
    "Anmeldung beim Netzbetreiber inklusive",
    "Vorbereitung für späteren Speicher-Ausbau",
  ],
  waermepumpe: [
    "Luft-Wasser-Wärmepumpen für Neubau und Sanierung",
    "Sektorenkopplung mit PV-Anlage und Speicher",
    "KfW-458-Förderung bis zu 70 % planbar",
    "Hydraulischer Abgleich (Förder-Voraussetzung)",
    "Heizlast-Berechnung vor Auslegung",
    "Energiemanager steuert Wärmepumpe nach PV-Überschuss",
  ],
  notstrom: [
    "Notstrom-fähige Hybrid-Speicher (FENECON, Huawei LUNA2000)",
    "Automatische Umschaltung bei Netzausfall",
    "EcoFlow Delta Pro für Inselanlagen + mobile Setups",
    "Auslegung nach Notstrom-Verbrauchern (Heizung, Kühlschrank, IT)",
    "Auch nachrüstbar bei bestehenden PV-Anlagen",
    "Inselanlagen für abgelegene Standorte ohne Netzanschluss",
  ],
  "e-check": [
    "Versicherungs-relevanter E-Check (DIN VDE 0100-600)",
    "DGUV V3 für Gewerbe und Vermieter",
    "Komplette Hausinstallation und Sanierung",
    "Vorbereitung Zählerschrank für PV / Wallbox / Speicher",
    "Mängel-Protokoll mit Foto-Doku",
    "Reparaturen direkt vom Elektro-Meister",
  ],
  "service-wartung": [
    "PV-Wartung nach Hersteller-Vorgaben",
    "Wechselrichter-Diagnose und -Tausch",
    "Anlagenreinigung (Module, Wechselrichter-Lüfter)",
    "Fehlersuche bei Ertragsverlust",
    "Auch für nicht von uns installierte Anlagen",
    "Service-Vertrag mit jährlicher Sichtprüfung optional",
  ],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LeistungPage({ params }: RouteParams) {
  const service = findService(params.slug);
  if (!service) {
    notFound();
  }

  const Icon = service.icon;
  const bullets = SERVICE_BULLETS[service.slug] ?? [];

  // Verwandte Services (alle anderen, max 3)
  const otherServices = services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  // FAQs: Filter nach service.slug, falls keine matchen → alle FAQs
  // (demo-data.ts faqs hat keine `category` — wir zeigen alle als allgemeine FAQ)
  const relevantFaqs = faqs;

  // Schema.org
  const breadcrumbs = breadcrumbListSchema([
    { name: "Solaris PV", url: "/" },
    { name: "Leistungen", url: "/leistungen/" },
    {
      name: service.name,
      url: `/leistungen/${service.slug}/`,
    },
  ]);

  const faqSchema = faqPageSchema(
    relevantFaqs.slice(0, 5).map((f) => ({ question: f.q, answer: f.a }))
  );

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="pb-16 lg:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden bg-navy-500 py-16 text-white lg:py-24">
          <div className="container-wide">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-300">
              Solaris PV · Leistung
            </p>

            <div className="mt-6 flex items-start gap-5">
              <span
                aria-hidden="true"
                className="flex h-16 w-16 flex-shrink-0 items-center justify-center bg-solaris-500 text-white"
              >
                <Icon className="h-9 w-9" strokeWidth={2} />
              </span>
              <h1 className="max-w-3xl text-balance text-4xl font-black md:text-5xl lg:text-6xl">
                {service.name}
              </h1>
            </div>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-navy-100 sm:text-lg">
              {service.description}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="default" size="lg">
                <a href={kontakt.hauptsitz.telLink}>
                  <Phone className="h-5 w-5" />
                  {kontakt.hauptsitz.tel}
                </a>
              </Button>
              <Button asChild variant="outline-white" size="lg">
                <Link href="/#foerderberatung">
                  <CalendarClock className="h-5 w-5" />
                  Vor-Ort-Termin anfragen
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* BULLET-SEKTION */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
                  Was Sie bekommen
                </p>
                <h2 className="mt-3 text-3xl font-black text-navy-700 lg:text-4xl">
                  Leistungs-Umfang im Detail.
                </h2>
                <p className="mt-6 leading-relaxed text-navy-500">
                  Andreas Mellies plant {service.name.toLowerCase()} persönlich —
                  von der ersten Auslegung bis zur Inbetriebnahme. Anfahrt im
                  30-km-Radius Moers ist im Festpreis enthalten.
                </p>
              </div>

              {bullets.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="border-l-4 border-solaris-500 bg-white p-5 shadow-brand-sm"
                    >
                      <div className="flex items-start gap-3">
                        <ChevronRight
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-solaris-600"
                          strokeWidth={3}
                        />
                        <p className="text-sm font-medium text-navy-700">{b}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="border-l-4 border-solaris-500 bg-white p-6 shadow-brand-sm">
                  <p className="leading-relaxed text-navy-700">
                    {service.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        {relevantFaqs.length > 0 && (
          <section className="bg-navy-50 py-16 lg:py-20">
            <div className="container-narrow">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
                Häufige Fragen
              </p>
              <h2 className="mt-3 text-3xl font-black text-navy-700 lg:text-4xl">
                Was Kunden zu {service.name} oft fragen.
              </h2>
              <dl className="mt-10 grid gap-5">
                {relevantFaqs.slice(0, 5).map((faq) => (
                  <div
                    key={faq.q}
                    className="border-l-4 border-solaris-500 bg-white p-6 shadow-brand-sm"
                  >
                    <dt className="text-lg font-bold text-navy-700">{faq.q}</dt>
                    <dd className="mt-3 leading-relaxed text-navy-500">
                      {faq.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* VERWANDTE LEISTUNGEN */}
        {otherServices.length > 0 && (
          <section className="bg-white py-16 lg:py-20">
            <div className="container-wide">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
                Weitere Leistungen
              </p>
              <h2 className="mt-3 text-3xl font-black text-navy-700 lg:text-4xl">
                Solaris PV plant aus einer Hand.
              </h2>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherServices.map((s) => {
                  const SIcon = s.icon;
                  return (
                    <Link
                      key={s.slug}
                      href={`/leistungen/${s.slug}/`}
                      className="group border-t-4 border-solaris-500 bg-white p-6 shadow-brand-sm transition-shadow hover:shadow-brand-md"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-flex h-12 w-12 items-center justify-center bg-solaris-500/10 text-solaris-600"
                      >
                        <SIcon className="h-6 w-6" strokeWidth={2} />
                      </span>
                      <p className="mt-4 text-lg font-black text-navy-700">
                        {s.name}
                      </p>
                      <p className="mt-2 line-clamp-3 text-sm text-navy-500">
                        {s.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-solaris-700 group-hover:gap-2 transition-all">
                        Details
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA-BLOCK */}
        <section className="bg-solaris-500 py-16 text-white lg:py-20">
          <div className="container-wide max-w-3xl">
            <h2 className="text-3xl font-black md:text-4xl">
              {service.name} — Andreas Mellies plant Ihre Anlage persönlich.
            </h2>
            <p className="mt-4 text-white/90">
              Vor-Ort-Termin innerhalb von 5 Werktagen, Festpreis-Angebot nach
              Begehung, Anfahrt im 30-km-Radius Moers im Festpreis enthalten.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link href="/#foerderberatung">
                  <CalendarClock className="h-5 w-5" />
                  Beratung anfordern
                </Link>
              </Button>
              <Button asChild variant="outline-white" size="lg">
                <a href={kontakt.hauptsitz.telLink}>
                  <Phone className="h-5 w-5" />
                  Jetzt anrufen: {kontakt.hauptsitz.tel}
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
