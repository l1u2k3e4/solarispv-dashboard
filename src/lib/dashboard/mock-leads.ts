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
      telefon: "02841 1234567",
      email: "familie.mueller@example.de",
      anliegen:
        "Hallo, wir wollen eine Wallbox in unserem Einfamilienhaus in Moers-Repelen installieren lassen. Tesla Model Y, ca. 11 kW. Zählerschrank ist von 2018. Was kostet das ungefähr und wann hätten Sie Zeit?",
      adresse: "Repelener Str., 47445 Moers",
      stadtteil: "Repelen",
      chatVerlauf: [
        {
          user: "Hi, ich suche eine Wallbox-Installation für Moers-Repelen.",
          bot: "Gerne! Damit ich passend antworten kann: Welches Auto laden Sie und wie alt ist Ihr Zählerschrank?",
        },
        {
          user: "Tesla Model Y, Schrank ist von 2018.",
          bot: "Sehr gut, das ist ein moderner Schrank — typischerweise reicht das ohne Umbau. Welche Wallbox haben Sie im Blick (KEBA, go-e, Tesla)?",
        },
        {
          user: "Egal, Hauptsache 11 kW und förderfähig. Können Sie mich anrufen?",
          bot: "Klar! Wir melden uns morgen Vormittag bei Ihnen. Ich notiere die Eckdaten.",
        },
      ],
      kiVorschlaege: [
        {
          typ: "kurz-mail",
          text: "Sehr geehrte Familie Müller,\n\nvielen Dank für Ihre Anfrage zur Wallbox-Installation in Moers-Repelen. Auf Basis Ihrer Angaben (Tesla Model Y, Zählerschrank Bj. 2018) ist eine 11-kW-Wallbox ohne Umbau realistisch.\n\nWir rufen Sie morgen zwischen 9 und 10 Uhr an, um den Vor-Ort-Termin abzustimmen — Festpreis erhalten Sie direkt nach der Begehung.\n\nFreundliche Grüße\nSolaris PV · Andreas Mellies · 02841 / 816 37 27",
          confidence: 0.85,
        },
        {
          typ: "whatsapp",
          text: "Hallo Familie Müller, hier Solaris PV. Vielen Dank für Ihre Anfrage zur Wallbox in Repelen. Passt es, wenn wir Sie morgen Vormittag kurz anrufen? Vor-Ort-Termin können wir dann direkt einplanen.",
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
      telefon: "02841 8765432",
      email: "h.schmidt@example.de",
      anliegen:
        "Habe online den ROI-Rechner durchgespielt — 50 m² Süddach, ca. 9 kWp. Möchte gerne ein verbindliches Angebot inkl. Speicher-Option.",
      adresse: "47445 Moers",
      stadtteil: "Asberg",
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
      telefon: "02841 4455667",
      email: "becker@hv-becker.de",
      anliegen:
        "B2B-Anfrage: MFH mit 24 Wohneinheiten in Hülsdonk. Wir prüfen eine PV-Großanlage mit Mieterstrom-Modell und benötigen einen E-Check nach DGUV V3 inkl. Prüfprotokoll für die Versicherung. Bitte Angebot.",
      adresse: "Hülsdonker Str., 47445 Moers",
      stadtteil: "Hülsdonk",
      notizen:
        "Anfrage gestern Mittag, Eckdaten erfasst — Festpreis-Angebot kommt heute Nachmittag raus.",
    },
    {
      id: "lead-004",
      kanal: "whatsapp",
      eingangszeit: iso(now, 1 * HOUR),
      status: "neu",
      name: "Frau Yıldız",
      telefon: "02841 9988776",
      anliegen:
        "Hallo!! Wechselrichter unserer PV-Anlage zeigt Fehler F23, kein Ertrag mehr. Anlage ist 7 Jahre alt. Können Sie kurzfristig vorbeischauen??",
      stadtteil: "Schwafheim",
      kiVorschlaege: [
        {
          typ: "whatsapp",
          text: "Hallo Frau Yıldız, F23 ist meist ein Isolations-Fehler — das prüfen wir mit Messgerät vor Ort. Wir kommen morgen zwischen 14 und 16 Uhr nach Schwafheim. Wir rufen Sie jetzt einmal kurz an, um die Eckdaten aufzunehmen.",
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
      telefon: "02841 1122334",
      email: "m.weber@example.de",
      anliegen:
        "Suche Beratung zu PV + Speicher + Smart-Home-Anbindung in einem Neubau in Kapellen. KNX gewünscht – Energie-Monitoring soll integriert sein.",
      adresse: "47445 Moers",
      stadtteil: "Kapellen",
      chatVerlauf: [
        {
          user: "Welche Smart-Home-Systeme empfehlen Sie für PV-Neubauten?",
          bot: "Wir setzen vorrangig auf KNX — herstellerunabhängig, langlebig, durch Elektriker wartbar. Für reines Energie-Monitoring reicht oft auch der Wechselrichter (SMA, Fronius) plus App.",
        },
        {
          user: "Können Sie das vor Ort planen?",
          bot: "Ja, kostenfreier Vor-Ort-Termin durch Andreas Mellies persönlich. Wir melden uns für Terminabsprache.",
        },
      ],
      notizen: "Termin am 28.04. 14 Uhr eingebucht — Mellies",
      bearbeiteUm: iso(now, 5 * DAY),
    },
    {
      id: "lead-006",
      kanal: "formular",
      eingangszeit: iso(now, 5 * DAY),
      status: "abgeschlossen",
      name: "Familie Krause",
      telefon: "02841 3344556",
      email: "krause.moers@example.de",
      anliegen:
        "PV-Anlage 8 kWp gewünscht, Süddach, EFH in Vinn. Bitte Festpreis-Angebot.",
      adresse: "47445 Moers",
      stadtteil: "Vinn",
      notizen: "Auftrag erteilt 15.300€ — Installation in KW 21 geplant.",
      bearbeiteUm: iso(now, 4 * DAY),
    },
    {
      id: "lead-007",
      kanal: "roi-rechner",
      eingangszeit: iso(now, 1 * DAY + 8 * HOUR),
      status: "neu",
      name: "Familie Hartmann",
      telefon: "02841 7766554",
      email: "hartmann.efh@example.de",
      anliegen:
        "Großes Dach (130 m²), Berechnung ergab 24 kWp. Wir interessieren uns für PV + Speicher + Wallbox als Gesamtpaket. Förder-Beratung erwünscht.",
      adresse: "47445 Moers",
      stadtteil: "Repelen",
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
      telefon: "02841 5566778",
      anliegen:
        "Bestehende PV-Anlage 6 kWp, Wechselrichter SMA SB5000 ist nach 11 Jahren ausgefallen. EFH in Meerbeck. Können Sie ein Angebot für den Tausch machen?",
      stadtteil: "Meerbeck",
      kiVorschlaege: [
        {
          typ: "rueckruf-best",
          text: "Rückruf-Vorschlag: morgen 9–11 Uhr.\n\nAufhänger: SMA SB5000, 11 Jahre alt — typischer Lebenszyklus, Tausch sinnvoll. Direkt Vor-Ort-Termin anbieten — Festpreis nach Begehung. Hybrid-Wechselrichter mit Speicher-Option mit anbieten (Förderung KfW 270 noch verfügbar).",
          confidence: 0.78,
        },
      ],
      notizen: "WhatsApp gestern beantwortet, Termin offen.",
    },
    {
      id: "lead-009",
      kanal: "chatbot",
      eingangszeit: iso(now, 3 * HOUR),
      status: "neu",
      name: "Familie Petrov",
      telefon: "02841 6677889",
      email: "petrov.moers@example.de",
      anliegen:
        "Wir prüfen eine Wärmepumpe und brauchen Beratung zu BAFA-Förderung — auch für den E-Installationsanteil. EFH Asberg.",
      adresse: "47445 Moers",
      stadtteil: "Asberg",
      chatVerlauf: [
        {
          user: "Bekommen wir auf den Elektroteil der Wärmepumpe BAFA-Förderung?",
          bot: "Ja, der E-Installationsanteil ist im BAFA-Heizungsbonus enthalten — bis zu 70 % je nach Konstellation. Wir bündeln das mit dem Heizungsbauer.",
        },
        {
          user: "Können Sie das gemeinsam planen?",
          bot: "Sehr gerne. Wir melden uns für einen Vor-Ort-Termin und stimmen mit Ihrem Heizungsbauer ab.",
        },
      ],
      kiVorschlaege: [
        {
          typ: "kurz-mail",
          text: "Sehr geehrte Familie Petrov,\n\nvielen Dank für Ihre Anfrage zur Wärmepumpe. Den E-Installationsanteil rechnen wir gemeinsam mit Ihrem Heizungsbauer im BAFA-Förderantrag mit ab — typischerweise zwischen 30 und 70 % Bezuschussung.\n\nWir schlagen einen kostenfreien Vor-Ort-Termin in Asberg vor — wir rufen Sie morgen Vormittag an.\n\nFreundliche Grüße\nSolaris PV · Andreas Mellies",
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
      telefon: "02841 2233445",
      email: "schwerin@example.de",
      anliegen:
        "Service-Einsatz: Ertragsabfall der PV-Anlage seit 2 Wochen. Konnte über die Service-Nummer einen Termin machen.",
      stadtteil: "Hülsdonk",
      notizen: "Einsatz erfolgreich — verschmutzte Module gereinigt, Rechnung erstellt.",
      bearbeiteUm: iso(now, 6 * DAY),
    },
  ];
}

// Statischer Export für SSR-stabile Defaults — Zeitstempel werden im
// Client-Mount durch frische `getMockLeads(new Date())` ersetzt.
export const MOCK_LEADS: Lead[] = getMockLeads(new Date(0));
