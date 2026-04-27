import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-xs uppercase tracking-widest text-sternhoff-primary">
        Elektromeisterbetrieb · Bochum + Castrop-Rauxel
      </div>
      <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight md:text-5xl">
        Elektro Sternhoff – die neue Website entsteht hier.
      </h1>
      <p className="mt-6 text-base text-muted-foreground">
        Hauptsitz Bessemerstr. 80, 44793 Bochum · Filiale Gerther Str. 37,
        44577 Castrop-Rauxel · Tel{" "}
        <a className="underline" href="tel:+4923055488875">
          02305 5488875
        </a>{" "}
        · Mail{" "}
        <a className="underline" href="mailto:info@elektro-sternhoff.de">
          info@elektro-sternhoff.de
        </a>
      </p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <Link
          href="/studio"
          className="rounded-md bg-sternhoff-primary px-4 py-3 text-sm text-white hover:opacity-90"
        >
          Sanity Studio öffnen → /studio
        </Link>
        <a
          href="https://www.elektro-sternhoff.de/"
          className="rounded-md border border-border px-4 py-3 text-sm hover:bg-muted"
        >
          Aktuelle (alte) Website ansehen
        </a>
      </div>
      <p className="mt-12 text-xs text-muted-foreground">
        Build-Status: Phase 0 (Init). Strategie-Brief und Roadmap liegen unter{" "}
        <code>/analyse</code> und <code>/website/PROJEKTPLAN.md</code>.
      </p>
    </main>
  );
}
