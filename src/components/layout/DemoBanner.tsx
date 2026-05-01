/**
 * Globaler Demo-Banner für die Solaris-PV-Demo auf Vercel.
 * Aktiviert via NEXT_PUBLIC_DEMO_MODE=true in .env.production.
 * Server-Component — wird zur Build-Zeit aufgelöst und ist im Production-Build
 * entweder vorhanden oder komplett raus, kein Client-JS-Footprint.
 */
export function DemoBanner() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "true") return null;

  return (
    <div className="border-b border-solaris-200 bg-solaris-50 px-4 py-2 text-center text-xs font-medium text-solaris-800 sm:text-sm">
      Demo-Stand · Diese Seite zeigt das Konzept der neuen Solaris-PV-Website
    </div>
  );
}
