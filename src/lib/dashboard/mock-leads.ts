import type { Lead } from "./types";

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

function iso(now: Date, offsetMs: number): string {
  return new Date(now.getTime() - offsetMs).toISOString();
}

/**
 * Erzeugt 10 deterministische Mock-Leads mit relativ-zu-jetzt
 * verteilten Eingangszeiten. Reihenfolge / IDs / Inhalte sind stabil —
 * nur die Zeitstempel werden gegen `now` berechnet.
 *
 * Verteilung:
 *   - heute: Leads 1, 4, 9
 *   - gestern: Leads 2, 3, 7, 8
 *   - letzte Woche: Leads 5, 6, 10
 */
export function getMockLeads(now: Date = new Date()): Lead[] {
  return [
    {
      id: "lead-001",
      kanal: "chatbot",
      eingangszeit: iso(now, 12 * MIN),
      status: "neu",
      name: "Familie Müller",
      telefon: "0234 1234567",
      email: "familie.mueller@example.de",
      anliegen:
        "Hallo, wir wollen eine Wallbox in unserem Einfamilienhaus in Bochum-Linden installieren lassen. Tesla Model Y, ca. 11 kW. Zählerschrank ist von 2018. Was kostet das ungefähr und wann hätten Sie Zeit?",
      adresse: "Lindener Hauptstr., 44879 Bochum",
      stadtteil: "Linden",
      chatVerlauf: [
        {
          user: "Hi, ich suche eine Wallbox-Installation für Bochum-Linden.",
          bot: "Gerne! Damit ich passend antworten kann: Welches Auto laden Sie und wie alt ist Ihr Zählerschrank?",
        },
        {
          user: "Tesla Model Y, Schrank ist von 2018.",
          bot: "Sehr gut, das ist ein moderner Schrank — typischerweise reicht das ohne Umbau. Welche Wallbox haben Sie im Blick (KEBA, go-e, Tesla)?",
        },
        {
          user: "Egal, Hauptsache 11 kW und förderfähig. Können Sie mich anrufen?",
          bot: "Klar! Tina aus dem Büro meldet sich morgen Vormittag bei Ihnen. Ich notiere die Eckdaten.",
        },
      ],
      kiVorschlaege: [
        {
          typ: "kurz-mail",
          text: "Sehr geehrte Familie Müller,\n\nvielen Dank für Ihre Anfrage zur Wallbox-Installation in Bochum-Linden. Auf Basis Ihrer Angaben (Tesla Model Y, Zählerschrank Bj. 2018) ist eine 11-kW-Wallbox ohne Umbau realistisch.\n\nWir rufen Sie morgen zwischen 9 und 10 Uhr an, um den Vor-Ort-Termin abzustimmen — Festpreis erhalten Sie direkt nach der Begehung.\n\nFreundliche Grüße\nTina · Elektro Sternhoff GmbH\n0234 92339560",
          confidence: 0.85,
        },
        {
          typ: "whatsapp",
          text: "Hallo Familie Müller, hier Tina von Elektro Sternhoff. Vielen Dank für Ihre Anfrage zur Wallbox in Linden. Passt es, wenn ich Sie morgen Vormittag kurz anrufe? Vor-Ort-Termin können wir dann direkt einplanen.",
          confidence: 0.74,
        },
      ],
    },
    {
      id: "lead-002",
      kanal: "roi-rechner",
      eingangszeit: iso(now, 1 * DAY + 2 * HOUR),
      status: "neu",
      name: "Hans Schmidt",
      telefon: "0234 8765432",
      email: "h.schmidt@example.de",
      anliegen:
        "Habe online den ROI-Rechner durchgespielt — 50 m² Süddach, ca. 9 kWp. Möchte gerne ein verbindliches Angebot inkl. Speicher-Option.",
      adresse: "44869 Bochum",
      stadtteil: "Wattenscheid",
      pvBerechnung: {
        kwp: 9,
        investition: 15300,
        ersparnisJahr: 1615,
        amortisationJahre: 9.5,
      },
      kiVorschlaege: [
        {
          typ: "rueckruf-best",
          text: "Rückruf-Vorschlag: heute 14–16 Uhr.\n\nAufhänger: Herr Schmidt hat den ROI-Rechner mit 9 kWp / 15.300 € / 9,5 Jahre Amortisation durchgespielt. Im Gespräch direkt Speicher-Option ansprechen (verlängert Amortisation auf ~11 J, deckt aber 70 % Eigenverbrauch).\n\nVor-Ort-Termin bis Ende nächste Woche anbieten.",
          confidence: 0.81,
        },
      ],
    },
    {
      id: "lead-003",
      kanal: "formular",
      eingangszeit: iso(now, 1 * DAY + 5 * HOUR),
      status: "in-bearbeitung",
      name: "Hausverwaltung Becker",
      telefon: "0234 4455667",
      email: "becker@hv-becker.de",
      anliegen:
        "B2B-Anfrage: MFH mit 24 Wohneinheiten in Hofstede. Wir benötigen einen E-Check nach DGUV V3 inkl. Prüfprotokoll für die Versicherung. Bitte Angebot.",
      adresse: "Hofsteder Str., 44809 Bochum",
      stadtteil: "Hofstede",
      notizen:
        "Anfrage gestern Mittag, Tina hat Eckdaten erfasst — Festpreis-Angebot kommt heute Nachmittag raus.",
    },
    {
      id: "lead-004",
      kanal: "whatsapp",
      eingangszeit: iso(now, 1 * HOUR),
      status: "neu",
      name: "Frau Yıldız",
      telefon: "0234 9988776",
      anliegen:
        "Hallo!! Steckdose im Wohnzimmer kaputt, Funken beim Stecker rein. Können Sie heute noch kommen?? Ist das gefährlich?",
      stadtteil: "Riemke",
      kiVorschlaege: [
        {
          typ: "whatsapp",
          text: "Hallo Frau Yıldız, das klingt nach einem Sicherungs-Problem — bitte die Sicherung sofort rausdrehen und den Stecker NICHT mehr verwenden. Ich schicke gleich einen Kollegen vorbei (zwischen 14 und 16 Uhr in Riemke). Ruf Sie jetzt einmal kurz an.",
          confidence: 0.92,
        },
      ],
    },
    {
      id: "lead-005",
      kanal: "chatbot",
      eingangszeit: iso(now, 6 * DAY),
      status: "abgeschlossen",
      name: "Dr. Markus Weber",
      telefon: "0234 1122334",
      email: "m.weber@example.de",
      anliegen:
        "Suche Beratung zu KNX-Smart-Home in einem Neubau in Querenburg. Beleuchtung, Beschattung, Heizung — alles über einen Bus.",
      adresse: "44801 Bochum",
      stadtteil: "Querenburg",
      chatVerlauf: [
        {
          user: "Welche Smart-Home-Systeme empfehlen Sie für Neubauten?",
          bot: "Wir setzen vorrangig auf KNX — herstellerunabhängig, langlebig, und durch Elektriker wartbar. Loxone ist die Alternative, falls Sie eine zentrale Visualisierung wollen.",
        },
        {
          user: "Können Sie das vor Ort planen?",
          bot: "Ja, kostenfreier Vor-Ort-Termin mit unserem KNX-Spezialisten. Tina meldet sich für Terminabsprache.",
        },
      ],
      notizen: "Termin am 28.04. 14 Uhr eingebucht — Tina",
      bearbeiteUm: iso(now, 5 * DAY),
    },
    {
      id: "lead-006",
      kanal: "formular",
      eingangszeit: iso(now, 5 * DAY),
      status: "abgeschlossen",
      name: "Familie Krause",
      telefon: "0234 3344556",
      email: "krause.bochum@example.de",
      anliegen:
        "PV-Anlage 8 kWp gewünscht, Süddach, EFH in Wattenscheid. Bitte Festpreis-Angebot.",
      adresse: "44869 Bochum",
      stadtteil: "Wattenscheid",
      notizen: "Auftrag erteilt 15.300€ — Installation in KW 21 geplant.",
      bearbeiteUm: iso(now, 4 * DAY),
    },
    {
      id: "lead-007",
      kanal: "roi-rechner",
      eingangszeit: iso(now, 1 * DAY + 8 * HOUR),
      status: "neu",
      name: "Familie Hartmann",
      telefon: "0234 7766554",
      email: "hartmann.efh@example.de",
      anliegen:
        "Großes Dach (130 m²), Berechnung ergab 24 kWp. Wir interessieren uns für PV + Speicher + Wallbox als Gesamtpaket. Förder-Beratung erwünscht.",
      adresse: "44879 Bochum",
      stadtteil: "Linden",
      pvBerechnung: {
        kwp: 24,
        investition: 33600,
        ersparnisJahr: 4180,
        amortisationJahre: 8.0,
      },
    },
    {
      id: "lead-008",
      kanal: "whatsapp",
      eingangszeit: iso(now, 1 * DAY + 3 * HOUR),
      status: "in-bearbeitung",
      name: "Herr Köhler",
      telefon: "0234 5566778",
      anliegen:
        "Sicherungskasten ist von 1978, Versicherung verlangt Erneuerung. EFH in Riemke. Können Sie ein Angebot machen?",
      stadtteil: "Riemke",
      kiVorschlaege: [
        {
          typ: "rueckruf-best",
          text: "Rückruf-Vorschlag: morgen 9–11 Uhr.\n\nAufhänger: Versicherungs-Auflage Sicherungskasten-Erneuerung. Direkt Vor-Ort-Termin anbieten — Festpreis kommt nach Begehung. FI-Schutz und SLS-Schalter mit einplanen.",
          confidence: 0.78,
        },
      ],
      notizen: "Tina hat gestern WhatsApp beantwortet, Termin offen.",
    },
    {
      id: "lead-009",
      kanal: "chatbot",
      eingangszeit: iso(now, 3 * HOUR),
      status: "neu",
      name: "Familie Petrov",
      telefon: "0234 6677889",
      email: "petrov.bochum@example.de",
      anliegen:
        "Wir prüfen eine Wärmepumpe und brauchen Beratung zu BAFA-Förderung — auch für den E-Installationsanteil. EFH Weitmar.",
      adresse: "44795 Bochum",
      stadtteil: "Weitmar",
      chatVerlauf: [
        {
          user: "Bekommen wir auf den Elektroteil der Wärmepumpe BAFA-Förderung?",
          bot: "Ja, der E-Installationsanteil ist im BAFA-Heizungsbonus enthalten — bis zu 70 % je nach Konstellation. Wir bündeln das mit dem Heizungsbauer.",
        },
        {
          user: "Können Sie das gemeinsam planen?",
          bot: "Sehr gerne. Tina aus unserem Büro meldet sich für einen Vor-Ort-Termin und stimmt mit Ihrem Heizungsbauer ab.",
        },
      ],
      kiVorschlaege: [
        {
          typ: "kurz-mail",
          text: "Sehr geehrte Familie Petrov,\n\nvielen Dank für Ihre Anfrage zur Wärmepumpe. Den E-Installationsanteil rechnen wir gemeinsam mit Ihrem Heizungsbauer im BAFA-Förderantrag mit ab — typischerweise zwischen 30 und 70 % Bezuschussung.\n\nWir schlagen einen kostenfreien Vor-Ort-Termin in Weitmar vor — Tina ruft Sie morgen Vormittag an.\n\nFreundliche Grüße\nTina · Elektro Sternhoff GmbH",
          confidence: 0.79,
        },
      ],
    },
    {
      id: "lead-010",
      kanal: "formular",
      eingangszeit: iso(now, 7 * DAY),
      status: "abgeschlossen",
      name: "Frau Schwerin",
      telefon: "0234 2233445",
      email: "schwerin@example.de",
      anliegen:
        "Notdienst-Einsatz: Kompletter Stromausfall in der Wohnung. Konnte über Notdienst-Nummer einen Termin machen.",
      stadtteil: "Mitte",
      notizen: "Einsatz erfolgreich, Rechnung erstellt — Tina",
      bearbeiteUm: iso(now, 6 * DAY),
    },
  ];
}

// Statischer Export für SSR-stabile Defaults — Zeitstempel werden im
// Client-Mount durch frische `getMockLeads(new Date())` ersetzt.
export const MOCK_LEADS: Lead[] = getMockLeads(new Date(0));
