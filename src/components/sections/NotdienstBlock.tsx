import Image from "next/image";
import { Phone, MessageCircle, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { kontakt, oeffnungszeiten } from "@/lib/demo-data";

export function NotdienstBlock() {
  return (
    <section id="notdienst" className="relative overflow-hidden bg-sternhoff-accent text-white">
      <Image
        src="/images/PHOTO-2018-10-23-15-44-22.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-sternhoff-accent/80 mix-blend-multiply"
        aria-hidden="true"
      />

      <div className="container-wide relative py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              24/7 erreichbar im Pott
            </p>
            <h2 className="mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Notdienst Bochum + Castrop-Rauxel
            </h2>
            <div className="mt-6 flex items-start gap-3 text-base sm:text-lg">
              <Clock className="mt-1 h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <p>
                <span className="font-bold">{oeffnungszeiten.notdienstZeiten}</span>
                <br />
                <span className="text-white/85">{oeffnungszeiten.notdienstWochenende}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-3 lg:justify-end">
            <Button asChild variant="outline-white" size="xl" className="bg-white/10 backdrop-blur-sm">
              <a href={kontakt.hauptsitz.telLink} aria-label={`Notdienst anrufen ${kontakt.hauptsitz.tel}`}>
                <Phone className="h-5 w-5" />
                {kontakt.hauptsitz.tel}
              </a>
            </Button>
            <Button asChild variant="outline-white" size="xl" className="bg-white/10 backdrop-blur-sm">
              <a
                href={kontakt.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Notdienst über WhatsApp kontaktieren"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
