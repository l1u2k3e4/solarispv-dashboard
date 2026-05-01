import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { kontakt } from "@/lib/demo-data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy-500 text-white">
      <Image
        src="/images/hero/pv-anlage-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-navy-500/60"
      />
      <div className="container-wide relative py-12 sm:py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy-100">
                Elektro-Meisterbetrieb · 30-km-Radius Moers · Niederrhein
              </p>
              <h1 className="mt-4 text-balance text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                Ihre Anlage. Mein Name.
                <span className="block text-solaris-300">
                  Meine Verantwortung.
                </span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-navy-100 sm:text-lg">
                Andreas Mellies, Elektro-Meister aus Moers. Ich plane jede
                Photovoltaik-Anlage am Niederrhein persönlich — vom ersten
                Telefonat bis zur Inbetriebnahme.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
                  <Link href="/#foerderberatung">Kostenlose Beratung anfordern</Link>
                </Button>
                <Button asChild variant="outline-white" size="lg" className="w-full sm:w-auto">
                  <a href={kontakt.hauptsitz.telLink}>
                    <Phone className="h-4 w-4" />
                    Jetzt anrufen: {kontakt.hauptsitz.tel}
                  </a>
                </Button>
              </div>

              <ul className="mt-6 flex flex-col gap-2 text-sm text-navy-100 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
                <li className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-solaris-400"
                  />
                  <span className="font-bold text-white">
                    Inhaber Andreas Mellies persönlich
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-solaris-400"
                  />
                  <span className="font-bold text-white">
                    Festpreis nach Vor-Ort-Termin
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-solaris-400"
                  />
                  <span className="font-bold text-white">
                    9 Hersteller, ehrliche Empfehlung
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 lg:aspect-[5/4]">
              <Image
                src="/images/hero/pv-anlage-hero.jpg"
                alt="Solaris-PV-Anlage am Niederrhein – Drohnenaufnahme einer fertigen Photovoltaik-Installation"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
