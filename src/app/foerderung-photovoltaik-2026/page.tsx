import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  CalendarClock,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyButtons } from "@/components/layout/MobileStickyButtons";
import { Button } from "@/components/ui/button";
import { kontakt } from "@/lib/demo-data";
import { SITE_URL, breadcrumbListSchema } from "@/lib/seo/schema";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const STAND = "2026-05-02";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${SITE_URL}/foerderung-photovoltaik-2026`;
  const title =
    "Förderung Photovoltaik 2026 — KfW, MwSt-Nullsatz, progres.NRW, KfW 458";
  const description =
    "Welche Förderung für Photovoltaik 2026 wirklich gilt: MwSt-Nullsatz § 12 Abs. 3 UStG, KfW 270 Erneuerbare Energien Standard, progres.NRW Markteinführung und KfW 458 für Wärmepumpen. Stand 2. Mai 2026 — von Solaris PV Moers geprüft.";
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
// Förderprogramme — verifiziert via WebSearch 2026-05-02
// ---------------------------------------------------------------------------

type Programm = {
  slug: string;
  titel: string;
  traeger: string;
  status: "aktiv" | "ausgelaufen";
  was: string;
  hoehe: string;
  voraussetzungen: string[];
  quelle: { label: string; url: string };
  hinweis?: string;
};

const programme: Programm[] = [
  {
    slug: "mwst-nullsatz",
    titel: "MwSt-Nullsatz § 12 Abs. 3 UStG",
    traeger: "Bundesfinanzministerium · gesetzliche Regelung",
    status: "aktiv",
    was: "0 % Umsatzsteuer auf PV-Anlagen, Speicher, Wechselrichter, Montage und Inbetriebnahme — wenn die Anlage auf oder in der Nähe eines Wohngebäudes installiert wird und max. 30 kWp hat.",
    hoehe:
      "0 % Mehrwertsteuer (statt 19 %) — bei einer 10-kWp-Anlage mit Speicher entspricht das ca. 3.500–4.500 € Ersparnis gegenüber Brutto-Preisen mit 19 % MwSt.",
    voraussetzungen: [
      "Installation auf/an Wohngebäude oder öffentlichem Gebäude",
      "Anlagengröße ≤ 30 kWp (sonst Nachweis über überwiegende Nutzung erforderlich)",
      "Lieferung und Installation an Anlagen-Betreiber:in",
    ],
    quelle: {
      label: "BMF FAQ Photovoltaik-Förderung",
      url: "https://www.bundesfinanzministerium.de/Content/DE/FAQ/foerderung-photovoltaikanlagen.html",
    },
    hinweis:
      "Stand 2026-05-02: Der Nullsteuersatz ist als Dauerregelung im Gesetz verankert — kein Auslaufdatum. Eine Abschaffung würde eine neue gesetzliche Regelung benötigen.",
  },
  {
    slug: "kfw-270",
    titel: "KfW 270 — Erneuerbare Energien Standard",
    traeger: "KfW Bankengruppe · Bundesförderkredit",
    status: "aktiv",
    was: "Zinsgünstiger Investitionskredit für PV-Anlagen, Speicher, Montage, Wechselrichter — finanzierbar bis zu 100 % der Investitionskosten, max. 150 Mio. € pro Vorhaben.",
    hoehe:
      "Effektiver Jahreszins ab ca. 3,2 % bis 11,3 % je Bonität (Stand Frühjahr 2026). Laufzeit 5–30 Jahre, 1–5 tilgungsfreie Anlaufjahre möglich. [Stand 2026-05-02 — Mellies bestätigen für individuelles Angebot]",
    voraussetzungen: [
      "Antrag VOR Investitions-Beginn über Hausbank",
      "Bonitäts-Prüfung durch Hausbank",
      "Anlage muss Mindest-Einspeise-/Eigenverbrauchs-Quote erfüllen",
    ],
    quelle: {
      label: "KfW 270 Programm-Seite",
      url: "https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/F%C3%B6rderprodukte/Erneuerbare-Energien-%E2%80%93-Standard-(270)/",
    },
    hinweis:
      "Antrag läuft IMMER über Ihre Hausbank, nicht direkt bei der KfW.",
  },
  {
    slug: "progres-nrw",
    titel: "progres.NRW — Markteinführung",
    traeger: "Land NRW · NRW.BANK / Bezirksregierung Arnsberg",
    status: "aktiv",
    was: "Landeszuschuss für stationäre Batteriespeicher in Verbindung mit einer NEU zu errichtenden PV-Anlage. Förderfähig sind außerdem Klimaschutztechniken (Wärmepumpen-Komponenten, Wallbox-Anschluss-Aufrüstungen).",
    hoehe:
      "100 € je kWh Brutto-Speicherkapazität (max. ein Speichersystem pro Gebäude/Standort). Bei einem 10-kWh-Speicher = 1.000 € Zuschuss. Allgemein bis zu 70 % der zuwendungsfähigen Ausgaben möglich.",
    voraussetzungen: [
      "Antrag VOR Maßnahmen-Beginn",
      "Speicher in Verbindung mit NEUER PV-Anlage (kein Nachrüst-Speicher)",
      "Inbetriebnahme in NRW",
      "Programm läuft bis 30.06.2027",
    ],
    quelle: {
      label: "progres.nrw NRW.BANK",
      url: "https://www.nrwbank.de/de/foerderung/foerderprodukte/15645/progresnrw---programmbereich-klimaschutztechnik.html",
    },
  },
  {
    slug: "kfw-458",
    titel: "KfW 458 — Heizungsförderung (Wärmepumpe)",
    traeger:
      "KfW Bankengruppe · Bundesförderung für effiziente Gebäude (BEG EM)",
    status: "aktiv",
    was: "Zuschuss für den Einbau einer klimafreundlichen Heizung — z. B. Luft-Wasser-Wärmepumpe in Sanierung oder Neubau. Wichtig: Die frühere BAFA-Heizungsförderung wurde 2024 in die KfW 458 überführt.",
    hoehe:
      "30 % Grundförderung + bis zu 40 % Boni (Klimageschwindigkeits-Bonus 20 %, Einkommens-Bonus, Effizienz-Bonus) = bis zu 70 % Zuschuss. Förderfähige Kosten max. 30.000 € pro Wohneinheit → bis 21.000 € Zuschuss möglich.",
    voraussetzungen: [
      "Selbstnutzende:r Eigentümer:in (für Klimageschwindigkeits-Bonus)",
      "Hydraulischer Abgleich der Heizung geplant",
      "Antrag VOR Auftragserteilung an Fachunternehmen",
      "Klimageschwindigkeits-Bonus: alte fossile Heizung wird bis 31.12.2028 ersetzt",
    ],
    quelle: {
      label: "KfW Heizungsförderung",
      url: "https://www.kfw.de/inlandsfoerderung/Heizungsf%C3%B6rderung/",
    },
    hinweis:
      "BAFA-BEG-Einzelmaßnahmen für Heizung gibt es 2026 nicht mehr eigenständig — Wärmepumpe wird komplett über KfW 458 abgewickelt. BAFA bleibt zuständig für andere Effizienz-Maßnahmen (z. B. Dämmung).",
  },
  {
    slug: "estg-72",
    titel: "Steuerfreiheit Eigenverbrauch § 3 Nr. 72 EStG",
    traeger: "Bundesfinanzministerium · Einkommensteuer-Recht",
    status: "aktiv",
    was: "Einnahmen UND Eigenverbrauch von PV-Anlagen sind seit 01.01.2022 von der Einkommensteuer befreit — kein Gewinn-Ausweis nötig, kein Anlage-EÜR-Aufwand mehr.",
    hoehe:
      "100 % Steuerbefreiung für Einnahmen und Eigenverbrauch. Bei 10-kWp-Anlage mit ca. 9.500 kWh/Jahr Ertrag = mehrere hundert € Steuerersparnis pro Jahr (je Steuersatz).",
    voraussetzungen: [
      "PV-Anlage auf/an EFH oder Gewerbe ≤ 30 kWp",
      "Bei Mehrfamilien-Häusern bis 15 kWp je Wohneinheit, max. 100 kWp je Steuerpflichtigem",
    ],
    quelle: {
      label: "BMF FAQ Photovoltaik-Förderung",
      url: "https://www.bundesfinanzministerium.de/Content/DE/FAQ/foerderung-photovoltaikanlagen.html",
    },
  },
];

const ausgelaufen: Programm[] = [
  {
    slug: "kfw-442",
    titel: "KfW 442 — Solarstrom für Elektroautos",
    traeger: "KfW Bankengruppe (eingestellt 2024)",
    status: "ausgelaufen",
    was: "Ehemaliger Zuschuss für PV + Speicher + Wallbox als Komplett-Paket für E-Auto-Besitzer:innen.",
    hoehe:
      "Historisch bis 10.200 € (PV bis 6.000 €, Speicher bis 3.600 €, Wallbox 600 € Pauschale). Fördertopf 2023 ausgeschöpft (33.000 Anträge bewilligt) — Programm 2024 eingestellt.",
    voraussetzungen: [
      "NICHT MEHR BEANTRAGBAR — als Alternative bleibt der KfW-270-Kredit + progres.NRW-Speicherzuschuss",
    ],
    quelle: {
      label: "KfW 442 (eingestellt)",
      url: "https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/F%C3%B6rderprodukte/Solarstrom-f%C3%BCr-Elektroautos-(442)/",
    },
    hinweis:
      "Stand 2026-05-02: Es gibt aktuell kein Nachfolge-Programm auf Bundesebene für die Wallbox-PV-Speicher-Kombination. Falls neu aufgelegt, prüfen wir das im Vor-Ort-Termin.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function FoerderungPhotovoltaikPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Solaris PV", url: "/" },
    { name: "Förderung Photovoltaik 2026", url: "/foerderung-photovoltaik-2026" },
  ]);

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <main className="pb-16 lg:pb-0">
        {/* HERO */}
        <section className="bg-navy-500 py-16 text-white lg:py-24">
          <div className="container-wide">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-300">
              Solaris PV · Förderwissen Stand {STAND}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-black md:text-5xl lg:text-6xl">
              Förderung Photovoltaik 2026 — was wirklich gilt.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-navy-100 sm:text-lg">
              MwSt-Nullsatz, KfW 270, progres.NRW, KfW 458 für Wärmepumpe und
              die Steuerbefreiung nach § 3 Nr. 72 EStG. Kein Hochglanz-PDF —
              Stand 2. Mai 2026, mit Quellen, Höhen und Voraussetzungen.
            </p>
          </div>
        </section>

        {/* CAVEAT-BLOCK */}
        <section className="bg-white py-10">
          <div className="container-wide">
            <div className="border-l-4 border-solaris-500 bg-solaris-50 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-solaris-500 text-white"
                >
                  <AlertTriangle className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="text-lg font-black text-navy-700">
                    Förderlage ändert sich quartalsweise.
                  </p>
                  <p className="mt-2 leading-relaxed text-navy-700">
                    Die hier gelisteten Konditionen sind Stand{" "}
                    <strong>{STAND}</strong> und werden quartalsweise geprüft.
                    Im Vor-Ort-Termin prüfen wir Ihre konkrete Förderung anhand
                    des tagesaktuellen Stands — inkl. Antragsfristen, Bonitäts-
                    Prüfung und Reihenfolge der Anträge (KfW vor Auftrag,
                    progres.NRW vor Maßnahme).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AKTIVE PROGRAMME — Tabelle */}
        <section className="bg-white py-12 lg:py-16">
          <div className="container-wide">
            <h2 className="text-3xl font-black text-navy-700 lg:text-4xl">
              Aktive Förderprogramme 2026
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-navy-500">
              Diese Programme sind zum Stand {STAND} beantragbar. Reihenfolge
              und Kombinierbarkeit klären wir im Beratungstermin —
              insbesondere bei der Kombination KfW 270 + progres.NRW.
            </p>

            <div className="mt-10 grid gap-6">
              {programme.map((p) => (
                <ProgrammCard key={p.slug} programm={p} />
              ))}
            </div>
          </div>
        </section>

        {/* AUSGELAUFENE PROGRAMME */}
        <section className="bg-navy-50 py-12 lg:py-16">
          <div className="container-wide">
            <h2 className="text-3xl font-black text-navy-700 lg:text-4xl">
              Ausgelaufen — bitte nicht mehr beantragen
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-navy-500">
              Diese Programme sind beendet. Wer im Netz noch Werbung dafür
              sieht: das sind Alt-Beiträge.
            </p>

            <div className="mt-10 grid gap-6">
              {ausgelaufen.map((p) => (
                <ProgrammCard key={p.slug} programm={p} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA-BLOCK */}
        <section className="bg-solaris-500 py-16 text-white lg:py-20">
          <div className="container-wide max-w-3xl">
            <h2 className="text-3xl font-black md:text-4xl">
              Wir prüfen Ihre Förderung kostenlos im Vor-Ort-Termin.
            </h2>
            <p className="mt-4 text-white/90">
              Welcher Förder-Mix bei Ihnen am meisten bringt — KfW-Kredit,
              progres.NRW-Zuschuss, KfW-458 für die Wärmepumpe — klären wir vor
              Ort. Anfahrt im 30-km-Radius Moers ist im Festpreis enthalten.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link href="/#foerderberatung">
                  <CalendarClock className="h-5 w-5" />
                  Förder-Beratung anfordern
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

// ---------------------------------------------------------------------------
// Programm-Card
// ---------------------------------------------------------------------------

function ProgrammCard({ programm }: { programm: Programm }) {
  const isAktiv = programm.status === "aktiv";
  return (
    <article
      className={`border-l-4 bg-white p-6 shadow-brand-sm sm:p-8 ${
        isAktiv ? "border-solaris-500" : "border-navy-300"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-solaris-700">
            {programm.traeger}
          </p>
          <h3 className="mt-2 text-2xl font-black text-navy-700">
            {programm.titel}
          </h3>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold ${
            isAktiv
              ? "bg-green-100 text-green-800"
              : "bg-navy-100 text-navy-700"
          }`}
        >
          {isAktiv ? (
            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
          ) : (
            <XCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
          )}
          {isAktiv ? "Aktiv 2026" : "Ausgelaufen"}
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-solaris-700">
            Was wird gefördert
          </p>
          <p className="mt-2 text-sm leading-relaxed text-navy-700">
            {programm.was}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-solaris-700">
            Höhe (Stand {STAND})
          </p>
          <p className="mt-2 text-sm leading-relaxed text-navy-700">
            {programm.hoehe}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-solaris-700">
          Voraussetzungen
        </p>
        <ul className="mt-2 grid gap-2">
          {programm.voraussetzungen.map((v) => (
            <li key={v} className="flex items-start gap-2 text-sm text-navy-700">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-solaris-500" />
              {v}
            </li>
          ))}
        </ul>
      </div>

      {programm.hinweis && (
        <p className="mt-6 border-l-2 border-solaris-300 bg-navy-50 p-4 text-sm leading-relaxed text-navy-700">
          <strong>Hinweis: </strong>
          {programm.hinweis}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href={programm.quelle.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-bold text-solaris-700 hover:text-solaris-600"
        >
          {programm.quelle.label}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
