import type { Metadata } from "next";
import { Phone, MessageCircle, Wrench, Clock } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyButtons } from "@/components/layout/MobileStickyButtons";
import { Button } from "@/components/ui/button";
import { kontakt, oeffnungszeiten } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Elektro-Notdienst Bochum & Castrop-Rauxel",
  description:
    "Stromausfall, Sicherung fliegt, Kurzschluss? Sternhoff-Notdienst Mo–Fr 7:00–23:00 Uhr für Bochum und Castrop-Rauxel. Wochenende nach Vereinbarung.",
};

const ablauf = [
  {
    nr: "01",
    titel: "Anrufen",
    text: "Schildern Sie uns das Problem – Strom weg, Sicherung fliegt, Brandgeruch?",
  },
  {
    nr: "02",
    titel: "Sofort-Einschätzung",
    text: "Wir geben am Telefon eine erste Risiko-Bewertung und planen den Einsatz.",
  },
  {
    nr: "03",
    titel: "Vor Ort",
    text: "Unser Servicewagen ist auf dem Weg – im Stadtgebiet meist innerhalb weniger Stunden.",
  },
  {
    nr: "04",
    titel: "Reparatur",
    text: "Wir stellen den sicheren Betrieb wieder her und dokumentieren den Einsatz.",
  },
];

export default function NotdienstPage() {
  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden bg-sternhoff-accent text-white">
          <div className="container-wide py-16 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/85">
                Elektro-Notdienst · Bochum + Castrop-Rauxel
              </p>
              <h1 className="mt-4 text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Stromausfall? Wir sind da.
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/95 sm:text-lg">
                Wenn Strom, Licht oder Sicherung Sie im Stich lassen – rufen Sie
                an. Wir packen es an.
              </p>

              <div className="mx-auto mt-10 max-w-md rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <p className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Erreichbarkeit
                </p>
                <p className="mt-3 text-2xl font-bold sm:text-3xl">
                  {oeffnungszeiten.notdienstZeiten}
                </p>
                <p className="mt-2 text-sm text-white/85">
                  Samstag + Sonntag: nach Vereinbarung – bitte direkt anrufen.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild variant="outline-white" size="xl" className="bg-white/10 backdrop-blur-sm">
                  <a href={kontakt.hauptsitz.telLink}>
                    <Phone className="h-5 w-5" />
                    {kontakt.hauptsitz.tel}
                  </a>
                </Button>
                <Button asChild variant="outline-white" size="xl" className="bg-white/10 backdrop-blur-sm">
                  <a
                    href={kontakt.whatsapp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="container-wide">
            <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">
              So läuft der Einsatz ab.
            </h2>
            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ablauf.map((step) => (
                <li
                  key={step.nr}
                  className="rounded-xl border-2 border-border bg-white p-6 transition-colors hover:border-sternhoff-accent"
                >
                  <span className="text-3xl font-bold text-sternhoff-accent">
                    {step.nr}
                  </span>
                  <h3 className="mt-3 text-lg leading-snug">{step.titel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-sternhoff-bg-light py-16 lg:py-20">
          <div className="container-narrow">
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-10">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-sternhoff-primary/10 text-sternhoff-primary">
                  <Wrench className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-2xl leading-tight">Was kostet der Notdienst?</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    Wir arbeiten transparent: Notdienst-Pauschale ab{" "}
                    <span className="font-bold text-sternhoff-text-dark">
                      89 € Anfahrt
                    </span>{" "}
                    plus regulärer Stundenlohn. Keine versteckten Aufschläge,
                    kein Festpreis ohne Sicht auf das Problem – das ist im
                    Notdienst nicht seriös.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyButtons />
    </>
  );
}
