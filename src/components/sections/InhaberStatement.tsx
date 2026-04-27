import Image from "next/image";

export function InhaberStatement() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-xl shadow-xl">
              <Image
                src="/images/PHOTO-2018-07-10-11-25-40.jpg"
                alt="Gerhard Sternhoff, Geschäftsführer und Elektromeister, in unserem Bochumer Büro"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sternhoff-accent">
              Inhaber-Statement
            </p>
            <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
              Gerhard Sternhoff – Ihr Elektromeister in Bochum
            </h2>

            <blockquote className="mt-8 border-l-4 border-sternhoff-accent pl-6 text-lg italic leading-relaxed text-sternhoff-text-dark sm:text-xl">
              „Ich bin mit dem Ruhrgebiet aufgewachsen und kenne die Häuser hier
              – vom Altbau in Linden bis zum Mehrfamilienhaus in Wattenscheid.
              Wenn Sie uns rufen, löst meine Mannschaft das Problem. Beim ersten
              Mal.“
            </blockquote>

            <p className="mt-6 text-sm font-bold text-sternhoff-text-dark">
              — Gerhard Sternhoff
            </p>
            <p className="text-sm text-muted-foreground">
              Geschäftsführer · Elektro Sternhoff GmbH
            </p>

            <p className="mt-8 border-t border-border pt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Meisterbetrieb · Innung Bochum-Hattingen · ~20 Mitarbeiter ·
              Standorte Bochum + Castrop-Rauxel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
