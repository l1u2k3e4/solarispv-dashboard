"use client";

import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Paket = "Premium" | "Service-Plus";

type Props = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  paket: Paket;
  bullets: string[];
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

const PAKET_BADGE: Record<Paket, string> = {
  Premium: "bg-solaris-500/10 text-solaris-700",
  "Service-Plus": "bg-navy-500/10 text-navy-500",
};

export function Phase2Stub({
  icon: Icon,
  title,
  subtitle,
  paket,
  bullets,
  ctaHref,
  ctaLabel = "Mehr im Pakete-Vergleich",
  className,
}: Props) {
  return (
    <div className={cn("h-full overflow-y-auto bg-gray-50 px-4 py-6 sm:px-6 lg:px-8", className)}>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-500">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
      </header>

      <article className="rounded-lg border border-dashed border-slate-300 bg-white p-8 shadow-brand-sm">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-solaris-500/10 text-solaris-600">
            <Icon className="h-7 w-7" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-xs font-bold uppercase tracking-wide",
                PAKET_BADGE[paket]
              )}
            >
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {paket}-Paket
            </span>
            <h2 className="mt-2 text-xl font-bold text-navy-500">
              Dieser Tab kommt mit dem {paket}-Paket
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Der Tab ist bewusst schon in der Sidebar — damit du siehst, was im
              nächsten Ausbaustadium dazukommt. Aktuell ist hier noch keine
              Live-Datenquelle angeschlossen.
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-solaris-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {ctaHref && (
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-1.5 rounded-md bg-solaris-500 px-3 py-2 text-xs font-bold text-primary-foreground transition-colors hover:bg-solaris-600"
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </article>
    </div>
  );
}
