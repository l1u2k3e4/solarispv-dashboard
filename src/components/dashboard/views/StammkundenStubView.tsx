"use client";

import { Users2 } from "lucide-react";
import { Phase2Stub } from "@/components/dashboard/ui/Phase2Stub";

export function StammkundenStubView() {
  return (
    <Phase2Stub
      icon={Users2}
      title="Stammkunden"
      subtitle="Bestandskunden mit aktiver PV-Anlage (Phase 2)"
      paket="Service-Plus"
      bullets={[
        "Bestandskunden-Liste mit installierter Anlagengröße, Inbetriebnahme-Datum, letztem Service-Termin und nächstem Wartungsfenster.",
        "Erinnerungs-Workflow: fällige Wartung → automatischer Stoßauftrag in die Lead-Inbox als interner Lead, Bürokraft kann Termin vorschlagen.",
        "Service-Slots pro Saison (Modul-Reinigung Frühjahr, Speicher-Health-Check Herbst, Wechselrichter-Update bei Firmware-Release).",
        "Kunden-Stammdaten: Anlagen-Konfiguration (Module, Wechselrichter, Speicher), Dokumente (Inbetriebnahme-Protokoll, Garantieurkunde), Notizen.",
        "Voraussetzung: Service-Plus-Paket + saubere Übergabe der Bestandskunden-Daten aus dem Buchhaltungs-/Auftragssystem.",
      ]}
      ctaHref="/leistungen/photovoltaik"
      ctaLabel="Photovoltaik-Leistungen ansehen"
    />
  );
}
