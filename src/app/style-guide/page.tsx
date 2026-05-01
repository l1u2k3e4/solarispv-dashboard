import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = {
  title: "Style Guide",
  robots: { index: false, follow: false },
};

const SOLARIS_STEPS = [
  { step: 50, hex: "#fff4ec" },
  { step: 100, hex: "#ffe6d4" },
  { step: 200, hex: "#ffcfad" },
  { step: 300, hex: "#ffb47f" },
  { step: 400, hex: "#fd9245" },
  { step: 500, hex: "#f47603" },
  { step: 600, hex: "#c4600d" },
  { step: 700, hex: "#a05010" },
  { step: 800, hex: "#743c11" },
  { step: 900, hex: "#42240f" },
] as const;

const NAVY_STEPS = [
  { step: 50, hex: "#e8eaec" },
  { step: 100, hex: "#cdcfd5" },
  { step: 200, hex: "#9fa4ae" },
  { step: 300, hex: "#6d7482" },
  { step: 400, hex: "#313c4f" },
  { step: 500, hex: "#02152a" },
  { step: 600, hex: "#041224" },
  { step: 700, hex: "#05101f" },
  { step: 800, hex: "#040c19" },
  { step: 900, hex: "#020711" },
] as const;

const SEMANTIC_TOKENS = [
  {
    label: "bg-primary",
    bg: "bg-primary",
    fg: "text-primary-foreground",
    note: "Navy auf Orange (CTA-Button)",
  },
  {
    label: "bg-accent",
    bg: "bg-accent",
    fg: "text-accent-foreground",
    note: "Weiß auf Navy (Sekundär-CTA)",
  },
  {
    label: "bg-muted",
    bg: "bg-muted",
    fg: "text-foreground",
    note: "Subtle Surface",
  },
  {
    label: "bg-destructive",
    bg: "bg-destructive",
    fg: "text-destructive-foreground",
    note: "Error / Validation",
  },
] as const;

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Photovoltaik aus Moers für den Niederrhein: Planung, Installation, Wartung. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Solaris PV — Andreas Mellies — Grünbergstr. 39a, 47445 Moers.`;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6 py-10 border-b border-border">
      <h2 className="text-2xl md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ step, hex }: { step: number; hex: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-16 w-full rounded-md border border-border"
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <div className="text-xs text-foreground-muted">
        <div className="font-medium text-foreground">{step}</div>
        <div className="font-mono">{hex}</div>
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="space-y-2 pb-8 border-b border-border">
        <h1 className="text-4xl md:text-5xl">Solaris PV — Style Guide</h1>
        <p className="text-foreground-muted text-lg">
          Generiert aus Prompt 09. Tokens, Typografie, Buttons, Logo, Surfaces.
        </p>
        <p className="text-foreground-subtle text-sm">
          Diese Seite ist nur in Development sichtbar (
          <code>NODE_ENV !== &quot;production&quot;</code>) und nicht
          indexierbar.
        </p>
      </header>

      <Section title="Farben — Solaris (Primary)">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {SOLARIS_STEPS.map((s) => (
            <Swatch key={s.step} step={s.step} hex={s.hex} />
          ))}
        </div>
      </Section>

      <Section title="Farben — Navy (Sekundär)">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {NAVY_STEPS.map((s) => (
            <Swatch key={s.step} step={s.step} hex={s.hex} />
          ))}
        </div>
      </Section>

      <Section title="Semantic Tokens">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SEMANTIC_TOKENS.map((t) => (
            <div
              key={t.label}
              className={`${t.bg} ${t.fg} rounded-lg p-6 border border-border`}
            >
              <div className="font-mono text-sm opacity-80">{t.label}</div>
              <div className="text-lg font-semibold mt-1">
                Beispieltext auf {t.label}
              </div>
              <div className="text-sm mt-1 opacity-90">{t.note}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typografie">
        <div className="space-y-4">
          <h1 className="text-5xl">H1 — Solaris PV aus Moers</h1>
          <h2 className="text-4xl">H2 — Photovoltaik für den Niederrhein</h2>
          <h3 className="text-2xl">H3 — Andreas Mellies, Inhaber</h3>
          <p className="text-foreground max-w-3xl leading-relaxed">{LOREM}</p>
          <p className="text-foreground-muted max-w-3xl">
            Mute-Text Beispiel: <code>text-foreground-muted</code> für
            sekundäre Informationen, Captions, Hinweise unter Formularfeldern.
          </p>
          <p>
            Link-Beispiel:{" "}
            <a
              href="https://www.solarispv.de"
              className="text-solaris-700 underline underline-offset-2 hover:text-solaris-800"
            >
              solarispv.de
            </a>
          </p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            className="rounded-md bg-primary text-primary-foreground px-5 py-3 font-semibold hover:bg-primary-hover transition-colors"
          >
            Primary CTA
          </button>
          <button
            type="button"
            className="rounded-md bg-accent text-accent-foreground px-5 py-3 font-semibold hover:opacity-90 transition-opacity"
          >
            Accent (Navy)
          </button>
          <button
            type="button"
            className="rounded-md border border-border text-foreground px-5 py-3 font-semibold hover:bg-muted transition-colors"
          >
            Outline
          </button>
          <button
            type="button"
            className="rounded-md bg-destructive text-destructive-foreground px-5 py-3 font-semibold hover:opacity-90 transition-opacity"
          >
            Destructive
          </button>
        </div>
      </Section>

      <Section title="Logo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg bg-white border border-border p-8 flex items-center justify-center">
            <Logo withLink={false} />
          </div>
          <div className="rounded-lg bg-navy-500 p-8 flex items-center justify-center">
            <Logo variant="white" withLink={false} />
          </div>
        </div>
      </Section>

      <Section title="Surfaces">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-border shadow-brand-md rounded-lg p-6">
            <h3 className="text-xl mb-2">Card auf Weiß</h3>
            <p className="text-foreground-muted text-sm">
              <code>bg-white border border-border shadow-brand-md</code>
            </p>
          </div>
          <div className="bg-solaris-50 border border-solaris-200 rounded-lg p-6">
            <h3 className="text-xl mb-2">Card auf Solaris-50</h3>
            <p className="text-foreground-muted text-sm">
              <code>bg-solaris-50 border border-solaris-200</code> — für
              Hervorhebungs-Sections.
            </p>
          </div>
          <div className="bg-navy-500 text-white rounded-lg p-6">
            <h3 className="text-xl mb-2 text-white">Dark Card</h3>
            <p className="text-white/80 text-sm">
              <code>bg-navy-500 text-white</code> — für Footer / Dark-Hero.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
