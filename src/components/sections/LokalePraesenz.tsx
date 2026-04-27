import Image from "next/image";
import { MapPin } from "lucide-react";

import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { stadtteile, standorte } from "@/lib/demo-data";

export function LokalePraesenz() {
  return (
    <section id="standorte" className="bg-sternhoff-bg-light py-16 lg:py-24">
      <div className="container-wide">
        <div className="mb-10 max-w-2xl lg:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sternhoff-accent">
            Lokal verankert
          </p>
          <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
            Wir sind in Bochum zuhause.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Hauptsitz Bessemerstraße 80 in Bochum, Filiale in Castrop-Rauxel.
            Vom Altbau in Linden bis zum Mehrfamilienhaus in Wattenscheid – wir
            kennen die Häuser im Pott.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl">Bochum-Stadtteile, in denen wir tagtäglich arbeiten:</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {stadtteile.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-sternhoff-primary/30 bg-white px-4 py-1.5 text-sm font-bold text-sternhoff-primary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[standorte.hauptsitz, standorte.filiale].map((s) => (
                <div
                  key={s.name}
                  className="rounded-lg border border-border bg-white p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-sternhoff-accent">
                    {s.rolle}
                  </p>
                  <p className="mt-1 text-lg font-bold text-sternhoff-text-dark">
                    {s.name}
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-sternhoff-primary" aria-hidden="true" />
                    <span>
                      {s.strasse}<br />
                      {s.plz} {s.stadt}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <ImagePlaceholder
              label="Karte folgt – interaktive Map kommt im Live-Build"
              aspectRatio="16:9"
              variant="branded"
            />
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-xl">
              <Image
                src="/images/PHOTO-2018-07-02-16-38-30.jpg"
                alt="Adressschild Bessemerstraße 80 vor unserer Bochumer Werkstatt"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-sm italic text-muted-foreground">
              Hier finden Sie uns – Bessemerstr. 80, 44793 Bochum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
