import type { Metadata } from "next";
import Link from "next/link";
import { Phone, CalendarClock, Check, Handshake, FileCheck2, SunMedium } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyButtons } from "@/components/layout/MobileStickyButtons";
import { Button } from "@/components/ui/button";
import { kontakt } from "@/lib/demo-data";
import { SITE_URL, breadcrumbListSchema } from "@/lib/seo/schema";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const url = `${SITE_URL}/so-laeuft-es`;
  const title =
    "So läuft's bei Solaris PV — Beratung · Angebot · Installation";
  const description =
    "Drei Schritte vom Erstkontakt zur fertigen PV-Anlage: persönliche Beratung, Festpreis-Angebot mit Förder-Berechnung und saubere Installation vom eigenen Montage-Team. Kein Sales-Skript, ein Ansprechpartner — Andreas Mellies, Elektro-Meister.";
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
// Inhalte (Quelle: SoEinfachGehtSolaris.tsx-Bullets, fachlich erweitert)
// ---------------------------------------------------------------------------

type Step = {
  id: "beratung" | "angebot" | "montage";
  number: string;
  title: string;
  eyebrow: string;
  intro: string;
  icon: typeof Handshake;
  bullets: { title: string; detail: string }[];
};

const steps: Step[] = [
  {
    id: "beratung",
    number: "01",
    title: "Beratung",
    eyebrow: "Schritt 1 · Persönlich, nicht standardisiert",
    intro:
      "Sie haben mit Andreas Mellies persönlich zu tun — vom ersten Anruf an. Kein Call-Center, kein Vertriebs-Trichter, kein Folgegespräch mit jemand anderem. Wir hören zuerst zu: Was steht auf dem Dach, was läuft im Haus, was soll die Anlage in 10 Jahren leisten?",
    icon: Handshake,
    bullets: [
      {
        title: "Individuell und persönlich",
        detail:
          "Jeder Vor-Ort-Termin wird vom Inhaber selbst geführt — nicht von einem Außendienst-Mitarbeiter, der danach an einen Planer weitergibt.",
      },
      {
        title: "Vor-Ort-Termin innerhalb von 5 Werktagen",
        detail:
          "Sie rufen an oder schreiben — innerhalb einer Woche steht der Termin. Anfahrt im 30-km-Radius Moers ist im Festpreis enthalten.",
      },
      {
        title: "Kein Sales-Skript — Mellies hört zuerst zu",
        detail:
          "Wir verkaufen nichts, was Sie nicht brauchen. Wenn ein 5-kWh-Speicher reicht, planen wir keinen 10er. Wenn Ihr Dach für PV nicht taugt, sagen wir es.",
      },
      {
        title: "Umfassend und fachspezifisch",
        detail:
          "Statik, Verschattung, Stromverbrauch, Sektorenkopplung, Förderwege, Netzanschluss — alle Themen kommen auf den Tisch, nicht nur die Module.",
      },
      {
        title: "Festpreis-Zusage bereits am Telefon möglich",
        detail:
          "Bei Standard-EFH-Konstellationen geben wir eine belastbare Preis-Range schon im ersten Telefonat — kein „kommt darauf an, wir melden uns“.",
      },
      {
        title: "Verständlich erklärt — kein Fachchinesisch",
        detail:
          "kWp, kWh, Eigenverbrauchsquote, Hybrid-Wechselrichter — alles wird so erklärt, dass Sie die Entscheidung selbst treffen können.",
      },
      {
        title: "Direkter Draht zu Andreas Mellies",
        detail:
          "Sie haben eine Handynummer und eine Mail. Keine Tickets, keine Hotline, keine Warteschleife.",
      },
    ],
  },
  {
    id: "angebot",
    number: "02",
    title: "Angebot",
    eyebrow: "Schritt 2 · Festpreis statt Schätzung",
    intro:
      "Nach dem Vor-Ort-Termin bekommen Sie ein vollständiges Angebot mit Festpreis — keine Pauschal-Schätzung, kein „je nach Aufwand“. Komponenten, Förderung, Liefertermin: alles auf einer Seite, alles verbindlich.",
    icon: FileCheck2,
    bullets: [
      {
        title: "Festpreis nach Vor-Ort-Termin",
        detail:
          "Der Preis im Angebot ist der Preis auf der Rechnung. Keine Überraschungen bei der Schlussabrechnung — egal ob Statik, Gerüst oder Netzanschluss.",
      },
      {
        title: "Transparente Kostenübersicht",
        detail:
          "Module, Wechselrichter, Speicher, Montage, Anmeldung beim Netzbetreiber — jede Position einzeln ausgewiesen, nicht als Klumpensumme.",
      },
      {
        title: "Förderung berechnet (KfW 270, MwSt-Nullsatz, progres.NRW)",
        detail:
          "Der Nullsteuersatz nach § 12 Abs. 3 UStG ist bereits eingerechnet. Welche Kombination aus KfW-270-Kredit und progres.NRW-Zuschuss bei Ihnen passt, klären wir mit Ihnen.",
      },
      {
        title: "Komponentenwahl mit 9 Hersteller-Partnern",
        detail:
          "Meyer Burger, Jinko, FENECON, Huawei, RCT-Power, EcoFlow, ABB, Hyundai, Lorenz — wir empfehlen, was zu Ihrem Dach passt, nicht was Provision bringt.",
      },
      {
        title: "Zukunftsfähige Komponentenwahl",
        detail:
          "Hybrid-Wechselrichter, der Speicher und Wallbox später aufnimmt. Energiemanager, der Sektorenkopplung mit Wärmepumpe vorbereitet.",
      },
      {
        title: "Preisbindung 30 Tage",
        detail:
          "Sie haben Zeit zum Vergleichen — 30 Tage Preisbindung sind Standard. Innerhalb dieser Frist können Sie sicher entscheiden.",
      },
      {
        title: "Förderung dokumentiert",
        detail:
          "Sie bekommen eine Übersicht, welche Anträge wann gestellt werden — und welche wir für Sie übernehmen.",
      },
    ],
  },
  {
    id: "montage",
    number: "03",
    title: "Installation",
    eyebrow: "Schritt 3 · Eigenes Team, kein Subunternehmer",
    intro:
      "Die Anlage wird von unserem eigenen Montage-Team gebaut — keine wechselnden Sub-Subunternehmer, kein anonymes Vertrags-Team. Das spüren Sie am ersten Tag der Montage und am Sauberkeits-Niveau auf dem Dach.",
    icon: SunMedium,
    bullets: [
      {
        title: "Hochwertige Produkte namhafter Hersteller",
        detail:
          "Module, Wechselrichter und Speicher kommen von den 9 Hersteller-Partnern, die wir seit Jahren in der Werkstatt haben — keine No-Name-Komponenten.",
      },
      {
        title: "Eigenes Montage-Team — kein Subunternehmer",
        detail:
          "Die Personen, die auf Ihrem Dach stehen, kennen Andreas Mellies persönlich und arbeiten nach unseren Standards.",
      },
      {
        title: "2–3 Tage Bauzeit für EFH-Anlage",
        detail:
          "Standard-Anlagen 8–12 kWp mit Speicher sind in 2 bis 3 Tagen fertig. Bei größeren oder komplexeren Setups planen wir den Zeitraum vorher mit Ihnen.",
      },
      {
        title: "Effiziente, saubere Arbeit",
        detail:
          "Schutzmatten, Bauzaun-Disziplin, tägliches Aufräumen. Nach der Montage soll das Grundstück so aussehen wie vorher — nur mit PV-Anlage.",
      },
      {
        title: "Inbetriebnahme + Anmeldung Netzbetreiber",
        detail:
          "Marktstammdatenregister-Eintrag, Netzanschluss-Anmeldung, Inbetriebnahme-Protokoll — alles erledigt, bevor wir vom Hof fahren.",
      },
      {
        title: "Übergabe-Dokumentation komplett",
        detail:
          "Sie bekommen ein PDF-Bundle mit allen Protokollen, Rechnungen, Garantien und Anmeldungen — direkt verwertbar für Steuerberater und Versicherung.",
      },
      {
        title: "Wartung und Service aus einer Hand",
        detail:
          "Im 1. Jahr begleiten wir die Anlage aktiv. Danach bleiben wir als Service-Partner für Wechselrichter-Tausch, Diagnose und Erweiterungen.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SoLaeuftEsPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Solaris PV", url: "/" },
    { name: "So läuft's", url: "/so-laeuft-es" },
  ]);

  return (
    <>
      <Header />

      <main className="pb-16 lg:pb-0">
        {/* HERO */}
        <section className="bg-navy-500 py-16 text-white lg:py-24">
          <div className="container-wide">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-300">
              Solaris PV · Ablauf
            </p>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-black md:text-5xl lg:text-6xl">
              So läuft&apos;s bei uns — Beratung, Angebot, Installation.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-100 sm:text-lg">
              Drei Schritte. Ein Ansprechpartner. Vom ersten Anruf bis zur
              Inbetriebnahme haben Sie mit Andreas Mellies persönlich zu tun —
              kein Call-Center, kein Sales-Trichter, kein anonymes Vertriebs-Team.
            </p>

            <nav
              aria-label="Sprung-Navigation"
              className="mt-10 flex flex-wrap gap-3"
            >
              {steps.map((s) => (
                <Link
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 border border-white/30 bg-white/5 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-solaris-500 hover:bg-solaris-500"
                >
                  <span className="text-solaris-300">{s.number}</span>
                  {s.title}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* 3 SEKTIONEN — alternierend bg-white / bg-navy-50 */}
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isAlt = idx % 2 === 1;
          return (
            <section
              key={step.id}
              id={step.id}
              className={`scroll-mt-24 py-16 lg:py-24 ${
                isAlt ? "bg-navy-50" : "bg-white"
              }`}
            >
              <div className="container-wide">
                <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
                  {/* Linke Spalte: Eyebrow + Titel + Intro */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
                      {step.eyebrow}
                    </p>
                    <div className="mt-4 flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center bg-solaris-500 text-white"
                      >
                        <Icon className="h-7 w-7" strokeWidth={2} />
                      </span>
                      <div>
                        <p className="text-5xl font-black leading-none text-solaris-100">
                          {step.number}
                        </p>
                        <h2 className="mt-2 text-3xl font-black text-navy-700 lg:text-4xl">
                          {step.title}
                        </h2>
                      </div>
                    </div>
                    <p className="mt-6 leading-relaxed text-navy-700">
                      {step.intro}
                    </p>
                  </div>

                  {/* Rechte Spalte: Bullets als Cards mit Pinselstrich */}
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {step.bullets.map((b) => (
                      <li
                        key={b.title}
                        className="border-l-4 border-solaris-500 bg-white p-5 shadow-brand-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center bg-solaris-500/10 text-solaris-600">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </span>
                          <div>
                            <p className="font-bold text-navy-700">{b.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-navy-500">
                              {b.detail}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA-BLOCK */}
        <section className="bg-solaris-500 py-16 text-white lg:py-20">
          <div className="container-wide max-w-3xl">
            <h2 className="text-3xl font-black md:text-4xl">
              Klingt nach einem Plan? Dann lassen Sie uns reden.
            </h2>
            <p className="mt-4 text-white/90">
              Vor-Ort-Termin innerhalb von 5 Werktagen, Anfahrt im 30-km-Radius
              Moers im Festpreis enthalten — Andreas Mellies persönlich.
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

        {/* Schema.org BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
      </main>

      <Footer />
      <MobileStickyButtons />
    </>
  );
}
