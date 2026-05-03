import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { kontakt } from "@/lib/demo-data";

const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAMF/8QAIhAAAgEDAgcAAAAAAAAAAAAAAQIDAAQREjEiNENyc5HB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAABABEh/9oADAMBAAIRAxEAPwAUdtIlwYWlfWoGkFzgipXs0sKPh3OAA3Ed9seqff8AJ2/ctY951vJ9NSPJTL//2Q==";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-500 text-white">
      <Image
        src="/images/hero/pv-anlage-hero.jpg"
        alt=""
        fill
        priority
        quality={68}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={HERO_BLUR_DATA_URL}
        className="object-cover object-center lg:object-[65%_center]"
        aria-hidden="true"
      />

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/hero/pv-anlage-hero.jpg"
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover object-center motion-reduce:hidden lg:block lg:object-[65%_center]"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-500/90 via-navy-500/60 to-navy-500/25"
      />

      <div className="container-wide relative py-16 sm:py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-300">
            Elektro-Meisterbetrieb · 30-km-Radius Moers · Niederrhein
          </p>
          <h1 className="mt-4 text-balance text-4xl font-black leading-[1.05] text-white md:text-5xl lg:text-6xl">
            Ihre Anlage. Mein Name.
            <span className="block text-solaris-300">Meine Verantwortung.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">
            Andreas Mellies, Elektro-Meister aus Moers. Ich plane jede
            Photovoltaik-Anlage am Niederrhein persönlich — vom ersten Telefonat
            bis zur Inbetriebnahme.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-navy-600/40 backdrop-blur-sm">
        <div className="container-wide py-4">
          <ul className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 flex-shrink-0 bg-solaris-400" />
              <span className="font-bold text-white">Inhaber Andreas Mellies persönlich</span>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 flex-shrink-0 bg-solaris-400" />
              <span className="font-bold text-white">Festpreis nach Vor-Ort-Termin</span>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 flex-shrink-0 bg-solaris-400" />
              <span className="font-bold text-white">9 Hersteller, ehrliche Empfehlung</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
