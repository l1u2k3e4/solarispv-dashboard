import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { kontakt } from "@/lib/demo-data";
import { partners, type Partner } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Unsere Partner – Hersteller, denen wir vertrauen | Solaris PV",
  description:
    "Mit welchen Herstellern Solaris PV arbeitet — FENECON, Meyer Burger, Huawei, RCT Power und mehr. Warum diese Auswahl, was Sie davon haben.",
  openGraph: {
    title: "Unsere Partner – Hersteller, denen wir vertrauen",
    description:
      "Mit welchen Herstellern Solaris PV arbeitet und warum diese Auswahl für Ihre Anlage entscheidend ist.",
    url: "/partner",
    images: ["/og-image.png"],
    locale: "de_DE",
    type: "website",
  },
  alternates: { canonical: "/partner" },
};

const categories = [
  "Module",
  "Wechselrichter",
  "Speicher",
  "Wallbox",
  "Wärmepumpe",
  "Mehreres",
] as const;

export default function PartnerPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy-500 py-16 text-white lg:py-24">
        <div className="container-wide">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-300">
            Unsere Hersteller-Partner
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-black md:text-5xl lg:text-6xl">
            Wir verbauen, worauf wir uns verlassen können.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-100 sm:text-lg">
            Solaris PV ist ein unabhängiger Meisterbetrieb — wir sind an keinen
            einzelnen Hersteller gebunden. Stattdessen wählen wir pro Anlage
            das System, das wirklich zu Ihrem Dach, Ihrem Verbrauch und Ihrem
            Budget passt. Diese Hersteller stehen seit Jahren in unserer
            Werkstatt.
          </p>
        </div>
      </section>

      {/* Logo-Wand */}
      <section className="bg-white py-16">
        <div className="container-wide">
          <h2 className="text-2xl font-black text-navy-700">
            Hersteller, denen wir vertrauen
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {partners.map((p) => (
              <Link
                key={p.slug}
                href={`#${p.slug}`}
                className="group flex h-24 items-center justify-center border border-navy-100 bg-white p-4 transition-all hover:border-solaris-500 hover:shadow-brand-md"
                aria-label={`${p.name} — Profil ansehen`}
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={160}
                  height={56}
                  className="h-12 w-auto object-contain opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Kategorien */}
      <section className="bg-navy-50 py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-black text-navy-700 lg:text-4xl">
            Was wir konkret von wem verbauen.
          </h2>

          {categories.map((cat) => {
            const inCat = partners.filter((p) => p.category === cat);
            if (!inCat.length) return null;
            return (
              <div key={cat} className="mt-12">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-solaris-700">
                  {cat}
                </h3>
                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  {inCat.map((p) => (
                    <PartnerCard key={p.slug} partner={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-solaris-500 py-16 text-white">
        <div className="container-wide max-w-3xl">
          <h2 className="text-3xl font-black md:text-4xl">
            Welcher Hersteller passt zu Ihrer Anlage?
          </h2>
          <p className="mt-4 text-white/90">
            Das hängt von Ihrem Dach, Ihrem Verbrauch und Ihrer Sicht auf
            Marke vs. Preis ab. Wir sortieren das im Vor-Ort-Termin mit Ihnen.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link href="/#foerderberatung">Beratung anfordern</Link>
            </Button>
            <Button asChild variant="outline-white" size="lg">
              <a href={kontakt.hauptsitz.telLink}>
                Jetzt anrufen: {kontakt.hauptsitz.tel}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Solaris PV",
                item: "https://www.solarispv.de/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Partner",
                item: "https://www.solarispv.de/partner",
              },
            ],
          }),
        }}
      />
    </main>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article
      id={partner.slug}
      className="scroll-mt-24 border-l-4 border-solaris-500 bg-white p-6 shadow-brand-sm"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center bg-navy-50">
          <Image
            src={partner.logo}
            alt={partner.name}
            width={56}
            height={56}
            className="h-10 w-10 object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xl font-black text-navy-700">{partner.name}</h4>
          <p className="mt-0.5 text-sm text-navy-500">{partner.origin}</p>
          {partner.partnerStatus && (
            <p className="mt-1 inline-flex items-center gap-1 bg-solaris-500/10 px-2 py-0.5 text-xs font-bold text-solaris-700">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              {partner.partnerStatus}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-navy-700">{partner.highlight}</p>
      <p className="mt-3 text-sm text-navy-500">
        <strong className="text-navy-700">Warum wir&apos;s verbauen:</strong>{" "}
        {partner.whySolaris}
      </p>

      {partner.warranty && (
        <p className="mt-3 text-xs text-navy-500">
          <strong>Garantie:</strong> {partner.warranty}
        </p>
      )}

      {partner.externalUrl && (
        <a
          href={partner.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-solaris-700 hover:text-solaris-600"
        >
          Hersteller-Website
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}
