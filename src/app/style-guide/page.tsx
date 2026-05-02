import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

// Border-Radius-Tokens (Schritt 8 / Prompt 12) — Wert errechnet aus --radius: 0.25rem
const RADII = [
  { token: "rounded-none", computed: "0px", role: "Rohe Kanten — sparsam (z.B. Tabellen-Reihen)" },
  { token: "rounded-sm", computed: "0px", role: "Checkboxen, kleine Marker (calc clamp)" },
  { token: "rounded-md", computed: "2px", role: "Buttons, Inputs, Icon-Boxen, Werkzeug-Anmutung" },
  { token: "rounded / rounded-lg", computed: "4px", role: "Default-Cards, Service-Cards" },
  { token: "rounded-xl", computed: "10px", role: "Hero-Frames, Förder-Container, Bilder" },
  { token: "rounded-2xl", computed: "16px", role: "Sehr große Visual-Frames (sparsam)" },
  { token: "rounded-pill / rounded-full", computed: "9999px", role: "Status-Badges, Avatar, FABs" },
] as const;

const RADII_DEMO = [
  { cls: "rounded-none", label: "none" },
  { cls: "rounded-md", label: "md" },
  { cls: "rounded-lg", label: "lg" },
  { cls: "rounded-xl", label: "xl" },
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
          Tokens, Typografie, Buttons, Logo, Surfaces, Border-Radius (eckiger
          UI-Stil aus Prompt 12).
        </p>
        <p className="text-foreground-subtle text-sm">
          Diese Seite ist nur in Development sichtbar (
          <code>NODE_ENV !== &quot;production&quot;</code>) und nicht
          indexierbar.
        </p>
      </header>

      <Section title="Border-Radius — Token (--radius: 0.25rem / 4px)">
        <p className="max-w-3xl text-sm text-muted-foreground">
          Foundation seit Prompt 12: <code>--radius</code> wurde von
          <code> 0.625rem</code> (10px) auf <code>0.25rem</code> (4px)
          reduziert. Cards wirken eckiger / handwerklicher, Buttons + Inputs
          bleiben mit 2px komfortabel touchfreundlich. Status-Badges + Avatare
          bleiben bewusst rund (Stempel-/FAB-Konvention).
        </p>

        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="grid grid-cols-12 gap-2 border-b border-border pb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <div className="col-span-4">Token</div>
            <div className="col-span-2">Computed</div>
            <div className="col-span-6">Verwendung</div>
          </div>
          {RADII.map((r) => (
            <div
              key={r.token}
              className="grid grid-cols-12 gap-2 border-b border-border/40 py-2 text-sm"
            >
              <code className="col-span-4 font-mono">{r.token}</code>
              <code className="col-span-2 font-mono">{r.computed}</code>
              <span className="col-span-6 text-muted-foreground">{r.role}</span>
            </div>
          ))}
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-solaris-700">
            Visueller Abgleich (gleiche Surface-Größe, nur Radius wechselt)
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {RADII_DEMO.map((d) => (
              <div key={d.cls} className="space-y-2">
                <div
                  className={`flex aspect-square w-full items-center justify-center border-2 border-navy-500 bg-solaris-50 text-sm font-bold text-navy-500 ${d.cls}`}
                  aria-hidden
                >
                  {d.label}
                </div>
                <code className="block text-center font-mono text-xs text-muted-foreground">
                  {d.cls}
                </code>
              </div>
            ))}
          </div>
        </div>
      </Section>

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

      <Section title="Buttons — alle Varianten × Größen">
        <p className="text-sm text-muted-foreground">
          Alle Größen verwenden <code>rounded-md</code> (2px). Pill-Größe
          explizit für Tag/Filter-Chips. Hover: Farbwechsel + leichter
          <code> translate-y</code> für tactile Feedback.
        </p>

        <div className="space-y-6">
          {(["default", "accent", "outline", "ghost", "destructive"] as const).map(
            (variant) => (
              <div key={variant} className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  variant=&quot;{variant}&quot;
                </p>
                <div className="flex flex-wrap items-end gap-3">
                  <Button variant={variant} size="sm">
                    sm
                  </Button>
                  <Button variant={variant} size="default">
                    default
                  </Button>
                  <Button variant={variant} size="lg">
                    lg
                  </Button>
                  <Button variant={variant} size="xl">
                    xl
                  </Button>
                  <Button variant={variant} size="pill">
                    pill (Filter)
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </Section>

      <Section title="Cards — Border-Radius-Vergleich">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(["rounded-none", "rounded-md", "rounded-lg", "rounded-xl"] as const).map(
            (cls) => (
              <div
                key={cls}
                className={`flex flex-col gap-2 border border-border bg-white p-5 shadow-brand-sm ${cls}`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-solaris-700">
                  {cls}
                </p>
                <p className="text-base font-bold text-navy-500">
                  PV-Anlage 10 kWp
                </p>
                <p className="text-sm text-muted-foreground">
                  Beispiel-Card mit Token <code>{cls}</code>.
                </p>
              </div>
            )
          )}
        </div>
      </Section>

      <Section title="Form-Inputs (rounded-md / 2px, soft solaris focus-ring)">
        <div className="grid max-w-xl gap-4">
          <div>
            <Label htmlFor="sg-name">Name</Label>
            <Input id="sg-name" type="text" placeholder="Andreas Mellies" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="sg-msg">Nachricht</Label>
            <Textarea
              id="sg-msg"
              placeholder="Kurz beschreiben, was Sie planen."
              className="mt-2"
            />
          </div>
        </div>
      </Section>

      <Section title="Badges / Status-Stempel (rounded-pill)">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-pill border border-solaris-200 bg-solaris-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-solaris-700">
            Meisterbetrieb
          </span>
          <span className="inline-flex items-center rounded-pill bg-navy-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Festpreis
          </span>
          <span className="inline-flex items-center rounded-pill border border-border bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground">
            30-km-Radius
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-800">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Neu
          </span>
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
