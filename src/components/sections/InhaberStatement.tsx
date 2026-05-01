import Image from "next/image";

export function InhaberStatement() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-xl shadow-xl">
              <Image
                src="/images/team/andreas-mellies.jpg"
                alt="Andreas Mellies, Inhaber und Photovoltaik-Spezialist von Solaris PV"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-solaris-700">
              Inhaber-Statement
            </p>
            <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
              Andreas Mellies — Ihr Elektro-Meister in Moers
            </h2>

            <blockquote className="mt-8 border-l-4 border-solaris-500 pl-6 text-lg italic leading-relaxed text-foreground sm:text-xl">
              „Ich plane jede Anlage selbst — und stehe persönlich dafür gerade.
              Das ist mein Versprechen seit der ersten Solaris-PV-Anlage.“
            </blockquote>

            <p className="mt-6 font-display text-sm font-semibold text-navy-500">
              — Andreas Mellies, Inhaber & Elektro-Meister · SolarisPV
            </p>

            <p className="mt-8 border-t border-border pt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Elektro-Meisterbetrieb · 9 Hersteller-Partnerschaften ·
              30-km-Radius Moers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
