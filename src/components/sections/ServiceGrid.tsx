import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { services } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export function ServiceGrid() {
  return (
    <section id="leistungen" className="bg-white py-16 lg:py-24">
      <div className="container-wide">
        <div className="mb-10 max-w-2xl lg:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sternhoff-accent">
            Unsere Leistungen
          </p>
          <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
            Sechs Bereiche – ein Meisterbetrieb für alles, was Strom braucht.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            const href =
              service.slug === "notdienst" ? "/notdienst" : "/#leistungen";
            return (
              <Link
                key={service.slug}
                href={href}
                className={cn(
                  "group relative flex flex-col rounded-xl border-2 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sternhoff-primary focus-visible:ring-offset-2",
                  service.highlight
                    ? "border-sternhoff-accent bg-sternhoff-accent/5"
                    : "border-border hover:border-sternhoff-primary"
                )}
              >
                <span
                  className={cn(
                    "mb-4 flex h-12 w-12 items-center justify-center rounded-lg",
                    service.highlight
                      ? "bg-sternhoff-accent text-white"
                      : "bg-sternhoff-primary/10 text-sternhoff-primary"
                  )}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg leading-snug">{service.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <span className="mt-5 flex items-center gap-1 text-sm font-bold text-sternhoff-primary group-hover:gap-2 transition-all">
                  Mehr erfahren
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
