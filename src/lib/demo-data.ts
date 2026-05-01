// Solaris PV — Single Source of Truth für Content (Stammdaten + Mock-Daten)
// Verifizierte Werte: ../../_solaris-stammdaten.md
// Offene Fragen: ../../_offene-fragen.md
// Migration Prompt 10 (Content-Migration aus Sternhoff-Fork).

import type { LucideIcon } from "lucide-react";
import {
  Sun,
  BatteryCharging,
  Plug,
  Thermometer,
  Zap,
  ShieldCheck,
  Wrench,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// 1. Kontaktdaten (Telefon, Mail, WhatsApp)
// ---------------------------------------------------------------------------

/**
 * Solaris PV hat einen einzigen Marketing-Standort (Bürostandort Grünbergstr. 39a).
 * Der Sitz im Impressum (Birkenstr. 12) ist NUR für Impressum / LegalAddress relevant
 * und wird separat in `standorte.sitz` geführt — nicht als zweite Telefon-/Mail-Linie.
 *
 * Schema bleibt aus Sternhoff-Erbe `hauptsitz`-strukturiert, damit alle Konsumenten
 * (Footer, Header, MobileStickyButtons, …) ohne Refactor weiterlaufen.
 */
export const kontakt = {
  hauptsitz: {
    label: "Bürostandort Moers",
    tel: "02841 / 816 37 27",
    telLink: "tel:+4928418163727",
    fax: "02841 / 816 37 28",
  },
  whatsapp: {
    // ❓ TODO Mellies — aktuell Festnetz, WhatsApp benötigt Mobilnummer (siehe _offene-fragen.md W1)
    number: "+4928418163727",
    link: "https://wa.me/4928418163727?text=Hallo%20Solaris%20PV%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20PV-Anlage.",
  },
  email: "energie@solarispv.de",
  emailLink: "mailto:energie@solarispv.de",
};

// ---------------------------------------------------------------------------
// 2. Standorte
// ---------------------------------------------------------------------------

export const standorte = {
  hauptsitz: {
    name: "Moers",
    strasse: "Grünbergstr. 39a",
    plz: "47445",
    stadt: "Moers",
    rolle: "Bürostandort",
    geo: { lat: 51.4726644, lng: 6.6039919 },
  },
  /** Nur für Impressum / LegalAddress / Schema — NICHT als zweiten Marketing-Standort behandeln. */
  sitz: {
    name: "Moers",
    strasse: "Birkenstraße 12",
    plz: "47447",
    stadt: "Moers",
    rolle: "Sitz (Impressum)",
    geo: { lat: 51.3991704, lng: 6.6272079 },
  },
};

// ---------------------------------------------------------------------------
// 3. Öffnungszeiten
// ---------------------------------------------------------------------------

export const oeffnungszeiten = {
  buero: "Mo–Fr 09:00–16:00 Uhr",
  /** ❓ Sa-Termine möglich? (siehe _offene-fragen.md W7). Strategie-Brief §12 nimmt es an. */
  samstag: "Sa nach Vereinbarung",
};

// ---------------------------------------------------------------------------
// 4. Stadtteile (für Lokale-Präsenz-Section + Standortseite Moers)
// ---------------------------------------------------------------------------
// Quelle: standortseiten-plan.md §Welle 1 (Moers-Stadtteile)

export const stadtteile = [
  "Repelen",
  "Asberg",
  "Hülsdonk",
  "Schwafheim",
  "Kapellen",
  "Vinn",
  "Meerbeck",
  "Scherpenberg",
  "Eick",
];

// ---------------------------------------------------------------------------
// 5. Brand-Kerntext (für Hero / Über-uns / SEO)
// ---------------------------------------------------------------------------

export const brand = {
  name: "Solaris PV",
  legalName: "SolarisPV® Inh. Andreas Mellies",
  owner: "Andreas Mellies",
  ownerRole: "Inhaber & Elektro-Meister",
  tagline: "Photovoltaik vom Meisterbetrieb am Niederrhein",
  /** Kurzbeschreibung (Footer, Meta, Schema). */
  shortDescription:
    "Komplettlösungen für PV-Anlagen, Speicher, Wallboxen und Wärmepumpen — Beratung, Planung, Montage und Service vom Elektro-Meisterbetrieb in Moers.",
  /** Positions-Claim aus dem Strategie-Brief §2. */
  positioning:
    "Solaris PV ist der Solo-Meisterbetrieb am Niederrhein, bei dem Andreas Mellies jede Photovoltaik-Anlage persönlich plant — vom ersten Telefonat bis zur Inbetriebnahme.",
};

// ---------------------------------------------------------------------------
// 6. Services (Solaris-PV-Leistungen, laut Strategie-Brief §4)
// ---------------------------------------------------------------------------

export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
  highlight?: boolean;
};

export const services: Service[] = [
  {
    slug: "photovoltaik",
    name: "Photovoltaik-Anlagen",
    icon: Sun,
    description:
      "Auslegung, Planung und Montage von Aufdach-, Indach- und Flachdach-Anlagen für Privat und Gewerbe — vom Beratungsgespräch bis zur Anmeldung beim Netzbetreiber.",
    highlight: true,
  },
  {
    slug: "stromspeicher",
    name: "Stromspeicher",
    icon: BatteryCharging,
    description:
      "Heim- und Hybrid-Speicher von 5 bis 30 kWh — FENECON, RCT-Power, Huawei LUNA2000 — inklusive Notstrom-Funktion und Energiemanager.",
  },
  {
    slug: "wallbox",
    name: "Wallbox & Ladelösungen",
    icon: Plug,
    description:
      "Wallboxen für Privat (11/22 kW) und Firmen mit Lastmanagement — ABB, Huawei. PV-Überschuss-Laden inklusive.",
  },
  {
    slug: "waermepumpe",
    name: "Wärmepumpe",
    icon: Thermometer,
    description:
      "Luft-Wasser-Wärmepumpen für Neubau und Sanierung — Sektorenkopplung mit PV und Speicher, BAFA-Förderung inklusive.",
  },
  {
    slug: "notstrom",
    name: "Notstrom & Inselanlagen",
    icon: Zap,
    description:
      "Notstrom-fähige Speicher (FENECON, EcoFlow Delta Pro) und Inselanlagen — Strom auch bei Netzausfall, automatische Umschaltung.",
  },
  {
    slug: "e-check",
    name: "E-Check & Elektroinstallation",
    icon: ShieldCheck,
    description:
      "Versicherungs-relevanter E-Check, DGUV V3 für Gewerbe, komplette Hausinstallation und Sanierung vom Elektro-Meister.",
  },
  {
    slug: "service-wartung",
    name: "Service & Wartung",
    icon: Wrench,
    description:
      "PV-Wartung, Wechselrichter-Diagnose und -Tausch, Anlagenreinigung und Fehlersuche — auch für nicht von uns installierte Anlagen.",
  },
];

// ---------------------------------------------------------------------------
// 7. Hersteller-Partnerschaften (Strategie-Brief Hebel B)
// ---------------------------------------------------------------------------
// Quelle: analyse/01-scraping/partners-and-trust.json — alle 9 sind als Subseiten
// auf der alten Site geführt, also bestätigte Listing-Partner.

export type Hersteller = {
  slug: string;
  name: string;
  kategorie: string;
  empfehlung: string;
};

export const hersteller: Hersteller[] = [
  {
    slug: "fenecon",
    name: "FENECON",
    kategorie: "Speicher · Energiemanager",
    empfehlung:
      "Für Sektorenkopplung mit Wärmepumpe und Wallbox — Energiemanager FEMS steuert alles aus einer Logik.",
  },
  {
    slug: "meyer-burger",
    name: "Meyer Burger",
    kategorie: "Premium-Module Made-in-Germany",
    empfehlung:
      "Wenn maximale Lebensdauer (30 Jahre Produktgarantie) und deutsche Fertigung Pflicht sind.",
  },
  {
    slug: "huawei",
    name: "Huawei",
    kategorie: "Wechselrichter · LUNA2000",
    empfehlung:
      "Hybrid-Wechselrichter mit DC-gekoppeltem Speicher — gutes Preis-/Leistungs-Verhältnis im Mittelsegment.",
  },
  {
    slug: "rct-power",
    name: "RCT-Power",
    kategorie: "Speicher · Wechselrichter",
    empfehlung:
      "Sehr deutsche Anlagen mit gutem Service — wenn lange Hersteller-Garantie wichtiger ist als Anschaffungspreis.",
  },
  {
    slug: "jinko-solar",
    name: "Jinko-Solar",
    kategorie: "Volumen-Module",
    empfehlung:
      "Bestes Preis-/Leistungs-Verhältnis bei Modulen — wenn Wirtschaftlichkeit vor Premium-Optik steht.",
  },
  {
    slug: "hyundai",
    name: "Hyundai",
    kategorie: "Module · Premium-Mittelklasse",
    empfehlung: "Solide Mittelklasse mit langer Hersteller-Garantie.",
  },
  {
    slug: "ecoflow",
    name: "EcoFlow",
    kategorie: "Notstrom · Inselanlagen",
    empfehlung:
      "Delta Pro Ultra für Notstrom-Setups und Stand-Alone-Lösungen — auch nachrüstbar.",
  },
  {
    slug: "abb",
    name: "ABB",
    kategorie: "Wallbox · Schaltgeräte",
    empfehlung:
      "Wallboxen mit Lastmanagement für Mehrparteien-Häuser und Firmen-Setups.",
  },
  {
    slug: "lorenz",
    name: "Lorenz Montagesysteme",
    kategorie: "Aufständerung · Montagesysteme",
    empfehlung:
      "Robuste, statisch geprüfte Montagesysteme für jede Dach- und Flachdach-Situation.",
  },
];

// ---------------------------------------------------------------------------
// 8. Trust-Badges
// ---------------------------------------------------------------------------

export const trustBadges = [
  { icon: Award, label: "Elektro-Meisterbetrieb" },
  { icon: Users, label: "Inhaber Andreas Mellies persönlich" },
  { icon: ShieldCheck, label: "9 Hersteller-Partner — ehrlich beraten" },
  { icon: CheckCircle2, label: "30-km-Radius Moers · Niederrhein" },
];

// ---------------------------------------------------------------------------
// 9. Referenz-Cases
// ---------------------------------------------------------------------------
// ❓ DEMO-DATEN — Mellies muss echte Daten + Foto-Einwilligungen liefern
// (siehe _offene-fragen.md W4). Bis dahin Platzhalter, die strukturell stimmen.

export const referenzen = [
  {
    titel: "EFH-Anlage 9,8 kWp + 10 kWh Speicher",
    ort: "Moers-Repelen",
    leistung:
      "Meyer-Burger-Module · FENECON Home 10 · Huawei-Wechselrichter · Inbetriebnahme 03/2025",
    placeholder: true,
  },
  {
    titel: "Aufdach-Anlage 12,4 kWp + Wallbox",
    ort: "Neukirchen-Vluyn",
    leistung:
      "Jinko-Module · RCT-Power-Speicher 10 kWh · ABB-Wallbox 22 kW · Inbetriebnahme 09/2024",
    placeholder: true,
  },
  {
    titel: "PV-Großanlage 24 kWp Gewerbedach",
    ort: "Kamp-Lintfort",
    leistung:
      "Jinko-Module · Huawei-Wechselrichter · Lorenz-Montagesystem · Inbetriebnahme 06/2025",
    placeholder: true,
  },
];

// ---------------------------------------------------------------------------
// 10. Förder-Programme (Stand 2026)
// ---------------------------------------------------------------------------

export const foerderProgramme = [
  {
    titel: "Nullsteuersatz § 12 Abs. 3 UStG",
    status:
      "Seit 2023 dauerhaft 0 % MwSt. auf PV-Anlagen, Speicher, Montage und Inbetriebnahme.",
  },
  {
    titel: "KfW 270 — Erneuerbare Energien Standard",
    status:
      "Zinsgünstiger Kredit für PV-Anlagen, Speicher und Montage — beantragen wir mit Ihnen.",
  },
  {
    titel: "BAFA / BEG EM — Wärmepumpen-Förderung",
    status:
      "Bis zu 70 % Zuschuss für Sanierungs-Wärmepumpen 2026 (Einkommensbonus + Klima-Bonus inkl.).",
  },
  {
    titel: "progres.NRW — Land NRW",
    status:
      "Landeszuschuss für Speicher, Wallbox-Anschluss und Wärmepumpen-Komponenten.",
  },
  {
    titel: "Steuerfreiheit Eigenverbrauch § 3 Nr. 72 EStG",
    status:
      "Einnahmen und Eigenverbrauch von PV-Anlagen bis 30 kWp dauerhaft einkommensteuerfrei.",
  },
];

// ---------------------------------------------------------------------------
// 11. Standortseiten-Plan (P1-Welle, Strategie-Brief §7.2)
// ---------------------------------------------------------------------------

export type Standortseite = {
  slug: string;
  city: string;
  kmFromMoers: number;
  einwohner: number;
  fokus: string[];
  headline: string;
  metaTitle: string;
  metaDescription: string;
};

export const standortseiten: Standortseite[] = [
  {
    slug: "moers",
    city: "Moers",
    kmFromMoers: 0,
    einwohner: 104000,
    fokus: ["photovoltaik", "stromspeicher", "wallbox", "waermepumpe", "e-check"],
    headline: "Photovoltaik in Moers — vom Elektro-Meisterbetrieb Solaris PV",
    metaTitle: "Photovoltaik Moers · PV-Anlage vom Meisterbetrieb · Solaris PV",
    metaDescription:
      "Solaris PV: Photovoltaik vom Elektro-Meisterbetrieb in Moers. Andreas Mellies plant jede Anlage persönlich. Festpreis nach Vor-Ort-Termin. ☎ 02841 / 816 37 27",
  },
  {
    slug: "neukirchen-vluyn",
    city: "Neukirchen-Vluyn",
    kmFromMoers: 5,
    einwohner: 27000,
    fokus: ["photovoltaik", "stromspeicher", "wallbox"],
    headline:
      "Photovoltaik in Neukirchen-Vluyn — Anlage vom Meisterbetrieb aus Moers",
    metaTitle:
      "Photovoltaik Neukirchen-Vluyn · vom Meisterbetrieb · Solaris PV Moers",
    metaDescription:
      "PV-Anlage in Neukirchen-Vluyn: persönliche Beratung vom Elektro-Meister Andreas Mellies aus Moers. 5 km Anfahrt, im Festpreis enthalten. ☎ 02841 / 816 37 27",
  },
  {
    slug: "kamp-lintfort",
    city: "Kamp-Lintfort",
    kmFromMoers: 12,
    einwohner: 38000,
    fokus: ["photovoltaik", "stromspeicher", "waermepumpe"],
    headline:
      "Photovoltaik in Kamp-Lintfort — Sektorenkopplung von Solaris PV",
    metaTitle:
      "Photovoltaik Kamp-Lintfort · PV + Wärmepumpe · Solaris PV Moers",
    metaDescription:
      "PV-Anlage und Wärmepumpe für Kamp-Lintfort: Sanierungs-Cluster mit hohem EFH-Bestand. Solaris PV plant Sektorenkopplung. ☎ 02841 / 816 37 27",
  },
  {
    slug: "rheinberg",
    city: "Rheinberg",
    kmFromMoers: 10,
    einwohner: 31000,
    fokus: ["photovoltaik", "stromspeicher"],
    headline: "Photovoltaik in Rheinberg — vom Meisterbetrieb am Niederrhein",
    metaTitle: "Photovoltaik Rheinberg · vom Meisterbetrieb · Solaris PV Moers",
    metaDescription:
      "Photovoltaik in Rheinberg: Solaris PV plant PV-Anlagen und Speicher für Privat und Landwirtschaft. ☎ 02841 / 816 37 27",
  },
  {
    slug: "voerde",
    city: "Voerde",
    kmFromMoers: 15,
    einwohner: 35000,
    fokus: ["photovoltaik", "stromspeicher", "wallbox"],
    headline: "Photovoltaik in Voerde — Solaris PV vom Niederrhein",
    metaTitle: "Photovoltaik Voerde · vom Meisterbetrieb · Solaris PV Moers",
    metaDescription:
      "PV-Anlage und Wallbox in Voerde: Anlage vom Elektro-Meister Andreas Mellies aus Moers. Festpreis nach Vor-Ort-Termin. ☎ 02841 / 816 37 27",
  },
  {
    slug: "niederrhein",
    city: "Niederrhein",
    kmFromMoers: 0,
    einwohner: 0,
    fokus: ["photovoltaik", "stromspeicher", "wallbox", "waermepumpe"],
    headline:
      "Photovoltaik am Niederrhein — Region-Hub für 30-km-Radius Moers",
    metaTitle:
      "Photovoltaik Niederrhein · Region-Übersicht · Solaris PV Moers",
    metaDescription:
      "Photovoltaik am gesamten Niederrhein: Moers, Neukirchen-Vluyn, Kamp-Lintfort, Rheinberg, Voerde. Solaris PV plant aus einer Hand. ☎ 02841 / 816 37 27",
  },
];

// ---------------------------------------------------------------------------
// 12. FAQ-Items (für FAQPage-Schema; Strategie-Brief §7.4 GEO-Pattern 2)
// ---------------------------------------------------------------------------
// ❓ Mellies muss diese vor Live-Gang einmal durchsehen (siehe _offene-fragen.md N4).

export const faqs = [
  {
    q: "Was kostet eine PV-Anlage für ein Einfamilienhaus in Moers 2026?",
    a: "Eine 10-kWp-PV-Anlage in Moers kostet 2026 rund 18.000 bis 24.000 € inklusive 10-kWh-Speicher und Montage — durch den Nullsteuersatz nach § 12 Abs. 3 UStG sind das gleichzeitig die Brutto-Preise. Konkrete Zahlen klären wir in einem 60-minütigen Vor-Ort-Termin (kostenlos).",
  },
  {
    q: "Wie lange dauert die Installation einer PV-Anlage?",
    a: "Vom Auftrag bis zur Inbetriebnahme dauert es bei Solaris PV typischerweise 6 bis 10 Wochen — die Materialbestellung der DC-Komponenten benötigt 4 bis 6 Wochen, die Montage selbst ist in 2 bis 3 Tagen erledigt, die Inbetriebnahme samt Marktstammdaten-Anmeldung folgt unmittelbar.",
  },
  {
    q: "Welche Förderung gibt es für eine PV-Anlage 2026?",
    a: "2026 gilt der dauerhafte Nullsteuersatz nach § 12 Abs. 3 UStG (0 % MwSt. auf Anlage, Speicher und Montage), die Steuerfreiheit des Eigenverbrauchs nach § 3 Nr. 72 EStG bis 30 kWp, der KfW-270-Kredit für die Finanzierung und progres.NRW als Landeszuschuss. Den passenden Förderweg legen wir mit Ihnen im Beratungstermin fest.",
  },
  {
    q: "Lohnt sich ein Stromspeicher für mein Einfamilienhaus?",
    a: "Bei einem 4-Personen-Haushalt mit 10-kWp-Anlage steigt die Eigenverbrauchsquote durch einen 10-kWh-Speicher von rund 30 % auf 60–75 % (HTW-Berlin Stromspeicher-Inspektion 2024). Bei aktuellen Strompreisen amortisiert sich der Speicher meist in 10–14 Jahren — Ihre konkrete Rechnung machen wir im Vor-Ort-Termin auf.",
  },
  {
    q: "Welche Anlagengröße brauche ich für meinen Stromverbrauch?",
    a: "Faustregel am Niederrhein: 1 kWp PV-Leistung erzeugt im Jahr rund 950–1.050 kWh Strom (DWD-Strahlungsdaten 1991–2020). Für einen Stromverbrauch von 4.500 kWh/Jahr braucht es typischerweise eine 8–10-kWp-Anlage plus Speicher, um auf 60–75 % Eigenverbrauchsquote zu kommen.",
  },
  {
    q: "Kann ich PV-Anlage und Wärmepumpe kombinieren?",
    a: "Ja — Sektorenkopplung ist 2026 das wirtschaftlichste Setup. Mit einem Energiemanager wie FENECON FEMS oder Huawei Smart-Energy-Controller laufen PV, Speicher, Wallbox und Wärmepumpe in einer Logik. Solaris PV plant alle Komponenten aus einer Hand.",
  },
  {
    q: "Übernehmen Sie die Anmeldung beim Netzbetreiber?",
    a: "Ja. Solaris PV erledigt die komplette Anmeldung: Netzanschluss-Anfrage beim örtlichen Netzbetreiber, Marktstammdatenregister-Eintrag, Inbetriebnahme-Protokoll und Übergabe-Dokumentation. Sie bekommen am Ende ein PDF-Bundle für Ihren Steuerberater.",
  },
  {
    q: "Welche Hersteller verbaut Solaris PV?",
    a: "Wir arbeiten mit 9 Herstellern: Meyer Burger und Jinko-Solar (Module), Huawei und RCT-Power (Wechselrichter), FENECON, RCT-Power, Huawei und EcoFlow (Speicher), ABB (Wallbox) und Lorenz (Montagesystem). Welche Kombination zu Ihrem Dach passt, hängt nicht von Provisionen ab — sondern davon, was funktioniert.",
  },
  {
    q: "Beraten Sie auch zu Notstrom-Lösungen?",
    a: "Ja. Hybrid-Wechselrichter mit DC-gekoppeltem Speicher (z. B. Huawei LUNA2000 oder FENECON Home) liefern bei Netzausfall automatisch Strom für die wichtigsten Verbraucher. Komplette Inselanlagen mit EcoFlow Delta Pro für abgelegene Standorte planen wir ebenfalls.",
  },
  {
    q: "In welchem Umkreis arbeitet Solaris PV?",
    a: "Hauptmarkt ist der 30-km-Radius um Moers: Moers, Neukirchen-Vluyn, Kamp-Lintfort, Rheinberg, Voerde, Duisburg, Krefeld, Dinslaken, Geldern, Xanten. Premium-Anfragen bedienen wir bis 60 km. Anfahrt ist im Festpreis enthalten.",
  },
];

export type StadtteilTag = string;
