"use client";

import { Calculator } from "lucide-react";
import { Phase2Stub } from "@/components/dashboard/ui/Phase2Stub";

export function PvRechnerStubView() {
  return (
    <Phase2Stub
      icon={Calculator}
      title="PV-Rechner"
      subtitle="Lead-Liste aus dem PV-Rechner mit Mail-Capture (Phase 2)"
      paket="Premium"
      bullets={[
        "Jeder Rechner-Durchlauf wird mit Mail-Adresse erfasst und landet hier — inkl. eingegebener Eckdaten (kWp, geschätzte Investition, Jahresertrag, Eigenverbrauchsquote, Amortisationsdauer).",
        "Filter: nach Datum, nach Anlagengröße (kWp-Klassen), nach Conversion (Lead überführt ja/nein), nach Stadtteil.",
        "Quick-Action „In Lead-Inbox überführen“ — überträgt den Rechner-Lead in die Hauptinbox als Kanal `roi-rechner` und legt einen KI-Antwort-Vorschlag an.",
        "Datenquelle: Public-Site `/rechner/photovoltaik` — wenn der Rechner-Block dort live ist, zeigt dieser Tab seine Leads automatisch an.",
      ]}
      ctaHref="/rechner/photovoltaik"
      ctaLabel="PV-Rechner ansehen"
    />
  );
}
