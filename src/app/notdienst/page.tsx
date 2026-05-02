import type { Metadata } from "next";
import { Phone, MessageCircle, Wrench, Clock } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyButtons } from "@/components/layout/MobileStickyButtons";
import { Button } from "@/components/ui/button";
import { kontakt, oeffnungszeiten } from "@/lib/demo-data";

export const metadata: Metadata = {
  title:
    "Service & Wartung für Photovoltaik-Anlagen am Niederrhein · Solaris PV",
  description:
    "Solaris PV: Wartung, Wechselrichter-Diagnose, Anlagenreinigung und Fehlersuche für PV-Anlagen am Niederrhein. Auch für nicht von uns installierte Anlagen.",
};

const ablauf = [
  {
    nr: "01",
    titel: "Anliegen schildern",
    text: "Per Telefon, WhatsApp oder Formular: Anlagentyp, Wechselrichter, Symptome – wir hören zu.",
  },
  {
    nr: "02",
    titel: "Erst-Einschätzung",
    text: "Wir geben eine erste Einschätzung zum Aufwand und schlagen einen Wartungs- oder Service-Termin vor.",
  },
  {
    nr: "03",
    titel: "Vor Ort am Niederrhein",
    text: "Unser Servicewagen kommt in der Region Moers, Krefeld, Duisburg, Niederrhein – termingerecht koordiniert.",
  },
  {
    nr: "04",
    titel: "Reparatur & Doku",
    text: "Wartung, Wechselrichter-Tausch, Reinigung oder Fehlersuche – inkl. Protokoll für Versicherung und Hersteller-Garantie.",
  },
];

export default function NotdienstPage() {
  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden bg-solaris-500 text-white">
          <div className="container-wide py-16 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/85">
                Service & Wartung · Niederrhein
              </p>
              <h1 className="mt-4 text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Service & Wartung für Photovoltaik-Anlagen am Niederrhein
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/95 sm:text-lg">
                Wartung, Wechselrichter-Diagnose, PV-Reinigung und Fehlersuche –
                auch für Anlagen, die nicht von uns installiert wurden.
              </p>

              <div className="mx-auto mt-10 max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <p className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Erreichbarkeit
                </p>
                <p className="mt-3 text-2xl font-bold sm:text-3xl">
                  {oeffnungszeiten.buero}
                </p>
                <p className="mt-2 text-sm text-white/85">
                  WhatsApp 24/7 – wir antworten zu Bürozeiten. {oeffnungszeiten.samstag}.
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
              So läuft Wartung & Service ab.
            </h2>
            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ablauf.map((step) => (
                <li
                  key={step.nr}
                  className="rounded-lg border-2 border-border bg-white p-6 transition-colors hover:border-solaris-500"
                >
                  <span className="text-3xl font-bold text-solaris-700">
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

        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="container-narrow">
            <div className="rounded-xl border border-border bg-white p-6 sm:p-10">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy-500">
                  <Wrench className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-2xl leading-tight">Was leistet Solaris PV im Service?</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    Wartungs-Pakete für PV-Anlagen, Wechselrichter-Tausch
                    (Hersteller-übergreifend), Modul-Reinigung, Ertrags-Monitoring
                    und Fehlersuche bei Ertragsabfall. Wir arbeiten transparent –
                    Festpreis-Angebot nach Begehung, keine versteckten Aufschläge.
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
