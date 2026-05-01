/**
 * Fallback-Logik für den Chatbot, wenn `NEXT_PUBLIC_N8N_CHAT_WEBHOOK`
 * nicht gesetzt ist (Demo-Modus auf localhost ohne n8n).
 *
 * Pattern-Match auf userInput (lowercase, deutsch). Keys aus Konzept
 * Sektion 4 + Verhaltensregeln aus Prompt 15 TEIL E.
 *
 * Regeln (Hardgate):
 *   - Niemals konkrete Preise nennen → "Festpreis nach Vor-Ort-Begehung"
 *   - Bei Notfall-Keywords sofort Notdienst-Telefon + Adresse fragen
 *   - Bei Telefonnummer: Lead-Bestätigung + Rückruf-Versprechen
 *   - Default: Solaris-Follow-Up + Stadtteil-Frage
 */

const TELEFON_REGEX = /\b\d{3,4}[\s/-]?\d{6,}\b/;

const NOTFALL_KEYWORDS = [
  "kaputt",
  "sicherung",
  "stromausfall",
  "kein strom",
  "brand",
  "brennt",
  "gefährlich",
  "gefahr",
  "rauch",
  "funken",
];

const KOSTEN_KEYWORDS = [
  "kosten",
  "preis",
  "preise",
  "kostet",
  "e-check",
  "e check",
  "echeck",
];

const WALLBOX_KEYWORDS = ["wallbox", "ladestation", "laden", "ladepunkt"];

const FOERDER_KEYWORDS = [
  "förder",
  "foerder",
  "förderung",
  "foerderung",
  "kfw",
  "bafa",
  "zuschuss",
];

const matches = (input: string, keywords: string[]): boolean =>
  keywords.some((kw) => input.includes(kw));

function delay(min: number, max: number): Promise<void> {
  const ms = Math.floor(min + Math.random() * (max - min));
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMockResponse(userInput: string): Promise<string> {
  await delay(600, 1200);

  const text = userInput.toLowerCase().trim();

  // 1) Telefon-Pattern → Lead-Aufnahme bestätigen
  if (TELEFON_REGEX.test(text)) {
    return "Vielen Dank! **Wir melden uns morgen bei Ihnen** und besprechen alle Details persönlich.\n\nSoll ich Ihnen vorab eine Bestätigung per Mail schicken?";
  }

  // 2) Notfall-Keywords → Service-Hotline
  if (matches(text, NOTFALL_KEYWORDS)) {
    return "Das klingt dringend. Bitte rufen Sie uns direkt unter **02841 / 816 37 27** an — wir sind Mo–Fr 09:00–16:00 erreichbar, WhatsApp 24/7.\n\nDamit wir gleich starten können: **In welcher Straße und welchem Ort befinden Sie sich?**";
  }

  // 3) Kosten / E-Check / Preisrahmen
  if (matches(text, KOSTEN_KEYWORDS)) {
    return "Konkrete Preise nennen wir grundsätzlich erst nach einer **kostenlosen Vor-Ort-Begehung** durch unseren Meister. Danach bekommen Sie einen **Festpreis** — keine Überraschungen.\n\nDer Ablauf:\n- Kurzes Telefonat zur Einordnung\n- Termin vor Ort (kostenlos)\n- Festpreis-Angebot schriftlich\n- Umsetzung durch unser Team\n\nIn welchem Stadtteil von Moers oder welcher Niederrhein-Stadt sind Sie?";
  }

  // 4) Wallbox / Ladestation
  if (matches(text, WALLBOX_KEYWORDS)) {
    return "Wallboxen installieren wir regelmäßig in Moers und am Niederrhein — inklusive Anmeldung beim Netzbetreiber, Lastmanagement und kostenloser Vor-Ort-Begehung.\n\nDamit unser Meister die passende Empfehlung geben kann: **In welchem Stadtteil sind Sie** (z. B. Repelen, Asberg, Hülsdonk)?";
  }

  // 5) Förderung Stand 2026
  if (matches(text, FOERDER_KEYWORDS)) {
    return "**Stand 2026** — kurz und ehrlich:\n- **KfW 270** (PV-Kredit) ab ca. **3,27 % Zins**, weiterhin verfügbar\n- **BAFA** fördert Wärmepumpen (nicht PV direkt)\n- **NRW**: aktuell **kein landesweiter Zuschuss** für Einfamilienhäuser, aber progres.NRW vom Land NRW\n- **Moers**: aktuell **kein eigenes PV-Programm**, aber progres.NRW vom Land NRW\n- **0 % Mehrwertsteuer** auf PV-Anlagen ≤ 30 kWp\n- **Einkommensteuer-Befreiung** für kleine PV-Anlagen\n\nQuellen: kfw.de, bundesnetzagentur.de, BDEW, Verbraucherzentrale.\n\nMöchten Sie, dass wir Sie zur passenden Förderung individuell zurückrufen?";
  }

  // 6) Default
  return "Das schaue ich für Sie nach — **wir melden uns morgen bei Ihnen** mit einer fundierten Antwort.\n\nDamit unser Meister sich vorbereiten kann: **In welchem Stadtteil von Moers oder welcher Niederrhein-Stadt** sind Sie?";
}
