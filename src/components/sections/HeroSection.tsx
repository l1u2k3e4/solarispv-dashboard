import Image from "next/image";
import Link from "next/link";
import { Phone, Star } from "lucide-react";

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
                Elektromeisterbetrieb · Bochum + Castrop-Rauxel
              </p>
              <h1 className="mt-4 text-balance text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                Ihr Elektromeisterbetrieb in Bochum –
                <span className="block text-solaris-300">
                  seit Jahrzehnten zuverlässig vor Ort
                </span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-navy-100 sm:text-lg">
                Elektroinstallation · Smart Home · Wallbox · E-Check. Hauptsitz Bochum,
                Filiale in Castrop-Rauxel.
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

              <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-navy-100">
                <span
                  role="img"
                  aria-label="Bewertung 5 von 5 Sternen"
                  className="flex items-center gap-0.5 text-solaris-400"
                >
                  <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                  <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                  <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                  <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                  <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                </span>
                <span className="font-bold text-white">Meisterbetrieb</span>
                <span className="text-navy-200">·</span>
                <span>Innung Bochum-Hattingen</span>
              </div>
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
