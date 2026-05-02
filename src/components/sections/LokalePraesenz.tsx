import Image from "next/image";
import { MapPin } from "lucide-react";

import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { stadtteile, standorte } from "@/lib/demo-data";

export function LokalePraesenz() {
  return (
    <section id="standorte" className="bg-solaris-50 py-16 lg:py-24">
      <div className="container-wide">
        <div className="mb-10 max-w-2xl lg:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
            Lokal verankert
          </p>
          <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
            Wir sind in Moers zuhause.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Bürostandort Grünbergstr. 39a in Moers — wir bauen am gesamten
            Niederrhein. Vom Einfamilienhaus in Repelen bis zur Gewerbedach-Anlage
            in Kamp-Lintfort: Andreas Mellies plant jede Anlage persönlich.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl">Moers-Stadtteile, in denen wir tagtäglich arbeiten:</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {stadtteile.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-pill border border-solaris-200 bg-white px-4 py-1.5 text-sm font-bold text-solaris-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[standorte.hauptsitz].map((s) => (
                <div
                  key={s.name}
                  className="rounded-lg border border-border bg-white p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-solaris-700">
                    {s.rolle}
                  </p>
                  <p className="mt-1 text-lg font-bold text-navy-500">
                    {s.name}
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-solaris-700" aria-hidden="true" />
                    <span>
                      {s.strasse}<br />
                      {s.plz} {s.stadt}
                    </span>
                  </p>
                </div>
              ))}
              <div className="rounded-lg border border-border bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-solaris-700">
                  Service-Region
                </p>
                <p className="mt-1 text-lg font-bold text-navy-500">
                  30-km-Radius Niederrhein
                </p>
                <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-solaris-700" aria-hidden="true" />
                  <span>
                    Moers · Neukirchen-Vluyn · Kamp-Lintfort ·<br />
                    Rheinberg · Voerde · Duisburg · Krefeld
                  </span>
                </p>
              </div>
            </div>

            <ImagePlaceholder
              label="Karte folgt – interaktive Map kommt im Live-Build"
              aspectRatio="16:9"
              variant="branded"
            />
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md shadow-xl">
              <Image
                src="/images/lokal/pv-region-niederrhein.jpg"
                alt="Photovoltaik-Anlage in der Region Niederrhein – installiert von Solaris PV aus Moers"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-sm italic text-muted-foreground">
              Hier finden Sie uns – Grünbergstr. 39a, 47445 Moers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
