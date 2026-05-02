// Solaris PV — Hersteller-Partner (Datenquelle für `/partner`-Seite)
// ----------------------------------------------------------------------------
// Quelle: `demo-data.ts.hersteller` (9 Einträge — alle aus solarispv.de-Scrape
// `analyse/01-scraping/partners-and-trust.json` bestätigt) + Lizenz-Review in
// `assets/solaris-pv-raw/_license-review.md`.
//
// Lizenz-Hinweis: Hersteller-Logos sind geschützte Markenzeichen. Sie werden
// hier ausschließlich als Produkt-Erwähnung im Kontext "Wir verbauen Module
// von …" geführt. Mellies hat die 9 Hersteller bereits auf der alten Site
// (TYPO3-Build) selbst gezeigt; die konservative Lizenz-Lage ist damit
// abgedeckt. Erweiterungen NUR nach Mellies-Rücksprache (siehe
// `_offene-fragen.md` §B P15-Partner-Page).

export type Partner = {
  slug: string;
  name: string;
  logo: string;
  category: "Module" | "Wechselrichter" | "Speicher" | "Wallbox" | "Wärmepumpe" | "Mehreres";
  origin: string;
  partnerStatus?: string;
  warranty?: string;
  highlight: string;
  whySolaris: string;
  externalUrl?: string;
};

export const partners: Partner[] = [
  {
    slug: "fenecon",
    name: "FENECON",
    logo: "/images/partner/fenecon.png",
    category: "Speicher",
    origin: "Deutschland · Feldkirchen",
    highlight:
      "Energiemanager FEMS koppelt PV, Speicher, Wärmepumpe und Wallbox in einer Logik.",
    whySolaris:
      "Wir setzen FENECON, wenn Sektorenkopplung mit Wärmepumpe und Wallbox aus einer Hand laufen soll. Der FEMS-Manager nimmt uns die Eigenverbrauchs-Optimierung ab — ohne Bastel-Lösungen.",
    externalUrl: "https://fenecon.de",
  },
  {
    slug: "meyer-burger",
    name: "Meyer Burger",
    logo: "/images/partner/meyer-burger.png",
    category: "Module",
    origin: "Deutschland · Hohenstein-Ernstthal",
    warranty: "30 Jahre Produktgarantie",
    highlight:
      "Premium-Module Made in Germany mit Heterojunction-Zellen und 30 Jahren Produktgarantie.",
    whySolaris:
      "Unsere erste Wahl, wenn maximale Lebensdauer und deutsche Fertigung Pflicht sind. Wer die Anlage 30 Jahre auf dem Dach haben will, bekommt hier Substanz statt Marketing.",
    externalUrl: "https://www.meyerburger.com",
  },
  {
    slug: "huawei",
    name: "Huawei",
    logo: "/images/partner/huawei.jpg",
    category: "Wechselrichter",
    origin: "China · Shenzhen",
    highlight:
      "Hybrid-Wechselrichter LUNA2000 mit DC-gekoppeltem Speicher — solides Mittelsegment.",
    whySolaris:
      "Wir verbauen Huawei, wenn Sie ein gutes Preis-/Leistungs-Verhältnis im Mittelsegment suchen. Hybrid-Wechselrichter und Speicher sind sauber aufeinander abgestimmt — wenig Schnittstellen-Stress.",
    externalUrl: "https://solar.huawei.com",
  },
  {
    slug: "rct-power",
    name: "RCT Power",
    logo: "/images/partner/rct-power.jpg",
    category: "Mehreres",
    origin: "Deutschland · Hechingen",
    highlight:
      "Sehr deutsche Speicher- und Wechselrichter-Systeme mit langer Hersteller-Garantie.",
    whySolaris:
      "Wenn lange Hersteller-Garantie wichtiger ist als der niedrigste Anschaffungspreis, ist RCT unsere Empfehlung. Service ist deutschsprachig, Reaktion schnell — wir merken das im Wartungsfall sofort.",
    externalUrl: "https://www.rct-power.com",
  },
  {
    slug: "jinko-solar",
    name: "JinkoSolar",
    logo: "/images/partner/jinko-solar.svg",
    category: "Module",
    origin: "China · Shanghai",
    highlight:
      "Volumen-Module mit weltweit führender Tier-1-Bilanz und stabilem Preis-/Leistungs-Verhältnis.",
    whySolaris:
      "Wir wählen Jinko, wenn Wirtschaftlichkeit vor Premium-Optik steht. Bewährte Module, gute Liefersicherheit — die richtige Antwort, wenn das Budget enger ist und das Dach trotzdem voll werden soll.",
    externalUrl: "https://www.jinkosolar.com",
  },
  {
    slug: "hyundai",
    name: "Hyundai",
    logo: "/images/partner/hyundai.png",
    category: "Module",
    origin: "Südkorea · Seoul",
    highlight:
      "Solide Mittelklasse-Module mit langer Hersteller-Garantie aus dem Hyundai-Konzernverbund.",
    whySolaris:
      "Hyundai-Module sind unsere Mittelklasse-Empfehlung, wenn Markenherkunft und langfristige Verfügbarkeit von Ersatzteilen mitzählen. Das ist kein No-Name-Modul mit Risiko in 10 Jahren.",
    externalUrl: "https://www.hyundai-es.com",
  },
  {
    slug: "ecoflow",
    name: "EcoFlow",
    logo: "/images/partner/ecoflow.png",
    category: "Mehreres",
    origin: "China · Shenzhen",
    highlight:
      "Notstrom- und Inselanlagen-Setups bis hin zur Delta Pro Ultra für komplette Hausversorgung.",
    whySolaris:
      "Wir verbauen EcoFlow für Notstrom- und Stand-Alone-Lösungen, gerne auch nachrüstbar zur bestehenden Anlage. Wenn der Stromausfall im Mittelpunkt steht, ist das die pragmatische Lösung.",
    externalUrl: "https://de.ecoflow.com",
  },
  {
    slug: "abb",
    name: "ABB",
    logo: "/images/partner/abb.png",
    category: "Wallbox",
    origin: "Schweiz · Zürich",
    highlight:
      "Wallboxen und Schaltgeräte mit Lastmanagement für Mehrparteien-Häuser und Firmen-Setups.",
    whySolaris:
      "Sobald mehrere Ladepunkte oder eine Firmen-Flotte ins Spiel kommen, greifen wir zu ABB. Lastmanagement und Schaltgeräte aus einer Hand — Industrie-Qualität, die im Gewerbe-Setup zählt.",
    externalUrl: "https://new.abb.com",
  },
  {
    slug: "lorenz",
    name: "Lorenz Montagesysteme",
    logo: "/images/partner/lorenz.png",
    category: "Mehreres",
    origin: "Deutschland · Hambühren",
    highlight:
      "Robuste, statisch geprüfte Aufständerungen für jede Dach- und Flachdach-Situation.",
    whySolaris:
      "Lorenz ist unser Standard für die Unterkonstruktion. Statisch geprüft, deutsche Fertigung, passt auf jedes Dach — vom Reihenhaus-Pfannendach bis zur Flachdach-Ostwest-Anlage.",
    externalUrl: "https://www.lorenz-montagesysteme.de",
  },
];
