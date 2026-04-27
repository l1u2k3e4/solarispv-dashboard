import { trustBadges } from "@/lib/demo-data";

export function TrustBar() {
  return (
    <section
      aria-label="Vertrauenssignale"
      className="border-y border-border bg-white"
    >
      <div className="container-wide py-6 lg:py-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 text-center sm:grid-cols-4 sm:text-left">
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <li
                key={badge.label}
                className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sternhoff-primary/10 text-sternhoff-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold text-sternhoff-text-dark">
                  {badge.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
