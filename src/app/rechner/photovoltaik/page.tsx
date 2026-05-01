import type { Metadata } from "next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyButtons } from "@/components/layout/MobileStickyButtons";
import { PVRechner } from "@/components/sections/PVRechner";

export const metadata: Metadata = {
  title:
    "PV-Rechner Bochum 2026 — Solar-Ertrag & Amortisation berechnen | Sternhoff",
  description:
    "Berechnen Sie Ertrag, Ersparnis und Amortisation Ihrer Photovoltaik-Anlage. Aktuelle Werte 2026 für Bochum & Umgebung. Kostenlose Vor-Ort-Beratung von Elektro Sternhoff.",
};

export default function PVRechnerPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 pb-16 lg:pb-0">
        <section className="bg-navy-500 text-white">
          <div className="container-wide py-12 lg:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              PV-Rechner · Bochum
            </p>
            <h1 className="mt-3 max-w-3xl text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Lohnt sich Ihre PV-Anlage? Rechnen Sie es selbst aus.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              Vier Eingaben, eine Schätzung. Anlagengröße, Jahresertrag,
              jährliche Ersparnis und Amortisationszeit – direkt im Browser.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container-wide">
            <PVRechner />
          </div>
        </section>

        <section className="pb-12 lg:pb-16">
          <details className="container-wide mx-auto max-w-2xl text-xs text-muted-foreground">
            <summary className="cursor-pointer font-medium text-solaris-700 hover:underline">
              Berechnungsgrundlagen &amp; Quellen anzeigen
            </summary>
            <div className="mt-3 space-y-2 leading-relaxed">
              <p>
                <strong>Stand der Daten:</strong> 27.04.2026 · Nächste
                Aktualisierung: August 2026 (nach EEG-Degression)
              </p>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Einspeisevergütung 7,78 ct/kWh (Teileinspeisung &lt; 10 kWp):{" "}
                  <a
                    href="https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Foerderung/start.html"
                    target="_blank"
                    rel="noopener"
                    className="text-solaris-700 hover:underline"
                  >
                    Bundesnetzagentur
                  </a>
                </li>
                <li>
                  Strompreis-Mittelwert 30 ct/kWh:{" "}
                  <a
                    href="https://www.bdew.de/service/daten-und-grafiken/bdew-strompreisanalyse/"
                    target="_blank"
                    rel="noopener"
                    className="text-solaris-700 hover:underline"
                  >
                    BDEW Strompreisanalyse
                  </a>
                </li>
                <li>
                  KfW-Programm 270:{" "}
                  <a
                    href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestandsimmobilie/Energieeffizient-Sanieren/Photovoltaik/"
                    target="_blank"
                    rel="noopener"
                    className="text-solaris-700 hover:underline"
                  >
                    kfw.de
                  </a>
                </li>
                <li>Jahresertrag NRW: PVGIS (EU Joint Research Centre)</li>
                <li>
                  Anlagen-Investition: Solaranlagen-Portal, gruenes.haus
                  (April 2026)
                </li>
              </ul>
              <p className="mt-3 italic">
                Diese Berechnung ersetzt keine fachliche Beratung. Für ein
                verbindliches Angebot kontaktieren Sie uns direkt — die
                Vor-Ort-Begehung ist kostenlos und unverbindlich.
              </p>
            </div>
          </details>
        </section>
      </main>
      <Footer />
      <MobileStickyButtons />
    </>
  );
}
