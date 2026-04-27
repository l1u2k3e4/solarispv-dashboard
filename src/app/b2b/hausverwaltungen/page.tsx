"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import { FileText, ShieldCheck, Clock, Wallet, ArrowRight } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyButtons } from "@/components/layout/MobileStickyButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Toast } from "@/components/ui/Toast";
import { referenzen } from "@/lib/demo-data";

const usps = [
  {
    icon: FileText,
    titel: "Rahmenverträge",
    text: "Feste Konditionen, klare Reaktionszeiten, ein Ansprechpartner für Ihren gesamten Bestand.",
  },
  {
    icon: ShieldCheck,
    titel: "DGUV V3 / E-Check",
    text: "Versicherungsrelevante Prüfungen mit Plakette und Protokoll – termingerecht, dokumentiert.",
  },
  {
    icon: Clock,
    titel: "24/7-Notfall-SLA",
    text: "Definierte Erreichbarkeit für Ihre Bestandsobjekte – Reaktionszeit nach Vereinbarung.",
  },
  {
    icon: Wallet,
    titel: "Festpreise je MFH",
    text: "Wartungs- und Sanierungspakete pro Mehrfamilienhaus statt unkalkulierbarer Stundensätze.",
  },
];

const ablauf = [
  {
    nr: "01",
    titel: "Bestand prüfen",
    text: "Wir besichtigen Ihre Objekte, dokumentieren Ist-Zustand und Risiken.",
  },
  {
    nr: "02",
    titel: "Angebot",
    text: "Festpreis-Pakete pro Haus, transparente Wartungs- und Sanierungs-Roadmap.",
  },
  {
    nr: "03",
    titel: "Wartung & Service",
    text: "Wir kümmern uns dauerhaft – Sie bekommen einmal im Jahr den Statusbericht.",
  },
];

export default function B2BHausverwaltungenPage() {
  const [form, setForm] = useState({
    name: "",
    firma: "",
    we: "",
    telefon: "",
  });
  const [toastOpen, setToastOpen] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setToastOpen(true);
    setForm({ name: "", firma: "", we: "", telefon: "" });
  }

  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="bg-sternhoff-primary text-white">
          <div className="container-wide grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                B2B · Hausverwaltungen
              </p>
              <h1 className="mt-3 text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Elektrohandwerk für Hausverwaltungen im Ruhrgebiet
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
                Ein Ansprechpartner für Ihren gesamten Bestand. Rahmenverträge,
                E-Check, Notfall-SLA – aus Bochum und Castrop-Rauxel.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="accent" size="lg">
                  <a href="#anfrage">Rahmenvertrag anfragen</a>
                </Button>
                <Button asChild variant="outline-white" size="lg">
                  <a href="tel:+4923492339560">Direkt anrufen</a>
                </Button>
              </div>
            </div>
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/images/IMG_4644.jpeg"
                  alt="Werkstatt-Außenfassade Sternhoff Meisterbetrieb in Bochum"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-sm italic text-white/80">
                Echter Standort, echte Substanz – Bessemerstraße 80, Bochum.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="container-wide">
            <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">
              Vier USPs, die für Verwaltungs-Tagesgeschäft gebaut sind.
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {usps.map((u) => {
                const Icon = u.icon;
                return (
                  <div
                    key={u.titel}
                    className="rounded-xl border-2 border-border bg-white p-6 transition-colors hover:border-sternhoff-primary"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-sternhoff-primary/10 text-sternhoff-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg leading-snug">{u.titel}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {u.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-sternhoff-bg-light py-16 lg:py-24">
          <div className="container-wide">
            <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">
              So arbeiten wir mit Ihnen.
            </h2>
            <ol className="mt-10 grid gap-6 lg:grid-cols-3">
              {ablauf.map((step) => (
                <li
                  key={step.nr}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  <span className="text-3xl font-bold text-sternhoff-accent">
                    {step.nr}
                  </span>
                  <h3 className="mt-3 text-xl leading-tight">{step.titel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="container-wide">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-3xl leading-tight sm:text-4xl">
                Referenzen aus dem Bestand.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {referenzen.map((r) => (
                <div
                  key={r.titel}
                  className="rounded-xl border border-border bg-white p-5"
                >
                  <ImagePlaceholder
                    label="Projektfoto folgt"
                    aspectRatio="4:5"
                    variant="subtle"
                  />
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-sternhoff-accent">
                    {r.ort}
                  </p>
                  <h3 className="mt-2 text-lg leading-snug">{r.titel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {r.leistung}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <ImagePlaceholder
                label="Teamfoto folgt"
                aspectRatio="16:9"
                variant="branded"
              />
            </div>
          </div>
        </section>

        <section id="anfrage" className="bg-sternhoff-primary py-16 text-white lg:py-24">
          <div className="container-narrow">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl leading-tight sm:text-4xl">
                Rahmenvertrag anfragen
              </h2>
              <p className="mt-4 text-base text-white/85">
                Sie hören innerhalb eines Werktags von uns – mit konkretem
                Vorschlag für Ihren Bestand.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-10 rounded-2xl bg-white p-6 text-sternhoff-text-dark shadow-2xl sm:p-10"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="b2b-name">Name</Label>
                  <Input
                    id="b2b-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="b2b-firma">Firma</Label>
                  <Input
                    id="b2b-firma"
                    type="text"
                    autoComplete="organization"
                    required
                    value={form.firma}
                    onChange={(e) => setForm({ ...form, firma: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="b2b-we">Anzahl Wohneinheiten</Label>
                  <Input
                    id="b2b-we"
                    type="number"
                    min={1}
                    required
                    value={form.we}
                    onChange={(e) => setForm({ ...form, we: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="b2b-tel">Telefon</Label>
                  <Input
                    id="b2b-tel"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={form.telefon}
                    onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button type="submit" variant="accent" size="lg" className="mt-6 w-full sm:w-auto">
                Anfrage senden
                <ArrowRight className="h-4 w-4" />
              </Button>

              <p className="mt-4 text-xs text-muted-foreground">
                Demo: Im Live-Betrieb wird die Anfrage an Sternhoff gesendet.
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyButtons />
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message="Demo: Im Live-Betrieb wird die Anfrage an Sternhoff gesendet."
      />
    </>
  );
}
