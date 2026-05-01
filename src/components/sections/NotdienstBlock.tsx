import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NotdienstBlock() {
  return (
    <section id="foerder-banner" className="relative overflow-hidden bg-solaris-50">
      <Image
        src="/images/hero/pv-anlage-hero.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
        aria-hidden="true"
      />

      <div className="container-wide relative py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
              Förder-Tracker 2026
            </p>
            <h2 className="mt-3 text-3xl leading-tight text-navy-500 sm:text-4xl lg:text-5xl">
              Förderung 2026 — was diesen Monat gilt.
            </h2>
            <div className="mt-6 flex items-start gap-3 text-base text-foreground sm:text-lg">
              <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-solaris-700" aria-hidden="true" />
              <p>
                <span className="font-bold text-navy-500">
                  Nullsteuersatz nach § 12 Abs. 3 UStG, KfW-270-Kredit,
                  progres.NRW-Zuschuss, BAFA-Wärmepumpen-Förderung.
                </span>
                <br />
                <span className="text-muted-foreground">Stand 2026.</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-3 lg:justify-end">
            <Button asChild variant="default" size="xl">
              <Link href="/foerderung-photovoltaik-2026">
                Förder-Tracker öffnen
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
