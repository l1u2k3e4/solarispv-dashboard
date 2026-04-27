/**
 * Globaler Demo-Banner für die Sternhoff-Demo auf Vercel.
 * Aktiviert via NEXT_PUBLIC_DEMO_MODE=true in .env.production.
 * Server-Component — wird zur Build-Zeit aufgelöst und ist im Production-Build
 * entweder vorhanden oder komplett raus, kein Client-JS-Footprint.
 */
export function DemoBanner() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "true") return null;

  return (
    <div className="bg-sternhoff-accent px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
      Demo-Stand · Diese Seite zeigt das Konzept der neuen Sternhoff-Website
    </div>
  );
}
