"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Handshake, FileCheck2, SunMedium, Check, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Beratung",
    icon: Handshake,
    bullets: [
      "Individuell und persönlich",
      "Umfassend und fachspezifisch",
      "Direkter Draht zu Andreas Mellies",
      "Verständlich erklärt — kein Fachchinesisch",
    ],
    cta: { label: "Mehr zur Beratung", href: "/so-laeuft-es#beratung" },
  },
  {
    number: "02",
    title: "Angebot",
    icon: FileCheck2,
    bullets: [
      "Festpreis nach Vor-Ort-Termin",
      "Transparente Kostenübersicht",
      "Zukunftsfähige Komponentenwahl",
      "Förderung berechnet & dokumentiert",
    ],
    cta: { label: "Beispiel-Angebot ansehen", href: "/so-laeuft-es#angebot" },
  },
  {
    number: "03",
    title: "Installation",
    icon: SunMedium,
    bullets: [
      "Hochwertige Produkte namhafter Hersteller",
      "Eigenes Montage-Team — kein Subunternehmer",
      "Effiziente, saubere Arbeit",
      "Inbetriebnahme + Anmeldung beim Netzbetreiber inklusive",
    ],
    cta: { label: "Montage-Ablauf", href: "/so-laeuft-es#montage" },
  },
];

export function SoEinfachGehtSolaris() {
  return (
    <section className="relative isolate overflow-hidden bg-solaris-500 py-20 lg:py-28">
      {/* Topographie-Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/patterns/topo-orange.svg')] bg-cover opacity-100 mix-blend-overlay"
      />
      {/* Vignette für Fokus auf Cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-solaris-500/0 via-transparent to-solaris-600/40"
      />

      <div className="container-wide relative">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-solaris-100">
            Nachhaltigkeit trifft Effizienz
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black leading-[1.05] text-white md:text-5xl lg:text-6xl">
            So einfach geht Solaris.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Drei Schritte. Ein Ansprechpartner. Vom ersten Anruf bis zur
            Inbetriebnahme — Sie haben mit mir persönlich zu tun.
            <strong className="block mt-1 text-white">Andreas Mellies, Elektro-Meister.</strong>
          </p>
        </div>

        {/* 3 Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col bg-white border-t-4 border-solaris-500 p-8 shadow-brand-md hover:shadow-brand-lg transition-shadow"
              >
                {/* Connector-Pfeil (nur Desktop, zwischen den Cards) */}
                {idx < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute -right-8 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-white/40 md:block"
                  >
                    <ArrowRight className="absolute -right-1 -top-2 h-4 w-4 text-white/40" />
                  </div>
                )}

                {/* Schritt-Nummer als Hintergrund-Akzent */}
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-4 text-6xl font-black leading-none text-solaris-100/60"
                >
                  {step.number}
                </span>

                {/* Icon-Container — eckig */}
                <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-md bg-solaris-500 text-white transition-transform group-hover:rotate-3 group-hover:scale-105">
                  <Icon className="h-8 w-8" strokeWidth={2} />
                </div>

                <h3 className="relative mt-6 text-2xl font-black text-navy-700">
                  {step.title}
                </h3>

                <ul className="relative mt-4 flex flex-1 flex-col gap-3 text-sm text-navy-700">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center bg-solaris-500/10 text-solaris-600">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={step.cta.href}
                  className="relative mt-6 inline-flex items-center gap-1 text-sm font-bold text-solaris-600 hover:text-solaris-700 group-hover:gap-2 transition-all"
                >
                  {step.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
