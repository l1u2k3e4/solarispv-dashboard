import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ROITeaser() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-wide">
        <div className="mx-auto max-w-4xl rounded-2xl border-2 border-sternhoff-primary/15 bg-gradient-to-br from-sternhoff-bg-light to-white p-8 sm:p-12 lg:p-16">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-12">
            <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-sternhoff-primary text-white">
              <Calculator className="h-8 w-8" aria-hidden="true" />
            </span>

            <div className="flex-1">
              <h2 className="text-2xl leading-tight sm:text-3xl">
                Lohnt sich Ihre PV-Anlage? Rechnen Sie es selbst aus.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                In 60 Sekunden zur ersten Schätzung: Anlagengröße, Jahresertrag,
                Ersparnis und Amortisation – ohne Anmeldung, direkt im Browser.
              </p>
            </div>

            <Button asChild variant="default" size="lg" className="flex-shrink-0">
              <Link href="/rechner/photovoltaik">
                Zum PV-Rechner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
