/**
 * PV-ROI-Rechner — Konstanten Stand April 2026
 *
 * Quellen (Stand 27.04.2026):
 * - Einspeisevergütung: Bundesnetzagentur, gilt 1.2.–31.7.2026
 * - Strompreis: BDEW + Verbraucherzentrale Mittelwert Neukunden + Bestandskunden
 * - Investitionskosten: Solaranlagen-Portal, gruenes.haus, 1komma5
 * - KfW 270: kfw.de/inlandsfoerderung/Privatpersonen
 * - NRW Förderung: metergrid.de, ennergy.de — keine landesweiten Zuschüsse für EFH 2026
 * - Jahresertrag NRW: PVGIS-Mittelwert 900–1.000 kWh/kWp
 */

export const PV_CONSTANTS_2026 = {
  // Einspeisevergütung in €/kWh (Stand 1.2.2026, gilt bis 31.7.2026)
  einspeiseverguetung: {
    teileinspeisungBis10kWp: 0.0778,
    teileinspeisung10bis40kWp: 0.0673,
    volleinspeisungBis10kWp: 0.1234,
  },

  // Strompreis Eigenverbrauch in €/kWh (Mittelwert NEU + BESTAND April 2026)
  strompreisEigenverbrauch: 0.30,

  // Jahresertrag pro kWp in kWh — Mittelwert NRW/Bochum (PVGIS)
  jahresertragProKwp: 950,

  // Faustformel: kWp pro m² Dachfläche (modernes Modul ~400–450 W auf ~2 m²)
  kwpProQuadratmeter: 0.18,

  // Investition in €/kWp — größenabhängig (schlüsselfertig, ohne Speicher/Wallbox)
  investitionProKwp: {
    klein: 1700, // 5–10 kWp
    mittel: 1400, // 10–20 kWp
    gross: 1200, // 20+ kWp
  },

  // Förder-Hinweise
  foerderung: {
    nrwZuschussProEFH: 0, // Keine landesweite NRW-Förderung 2026
    kfw270ZinssatzAb: 3.27, // % p.a. — kein Zuschuss, sondern Kredit
    nullsteuersatzGilt: true, // 0 % USt für PV <30 kWp
    einkommensteuerBefreiung: true, // Befreiung für PV <30 kWp
  },

  // Stand der Daten — Pflicht-Anzeige im Footer
  stand: "2026-04-27",
  naechsteAktualisierung: "2026-08-01", // EEG-Degression
} as const;

/**
 * Wählt die richtige Investitions-Spanne basierend auf Anlagengröße.
 */
export function getInvestitionProKwp(kwp: number): number {
  if (kwp < 10) return PV_CONSTANTS_2026.investitionProKwp.klein;
  if (kwp < 20) return PV_CONSTANTS_2026.investitionProKwp.mittel;
  return PV_CONSTANTS_2026.investitionProKwp.gross;
}
