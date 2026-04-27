import type { LucideIcon } from "lucide-react";
import {
  Zap,
  Home,
  Plug,
  ShieldCheck,
  Bell,
  Siren,
  Building2,
  Wrench,
  CheckCircle2,
} from "lucide-react";

export const kontakt = {
  hauptsitz: {
    label: "Hauptsitz Bochum",
    tel: "0234 92339560",
    telLink: "tel:+4923492339560",
  },
  filiale: {
    label: "Filiale Castrop-Rauxel",
    tel: "02305 5488875",
    telLink: "tel:+4923055488875",
  },
  whatsapp: {
    number: "+4923492339560",
    link: "https://wa.me/4923492339560",
  },
  email: "info@elektro-sternhoff.de",
  emailLink: "mailto:info@elektro-sternhoff.de",
};

export const standorte = {
  hauptsitz: {
    name: "Bochum",
    strasse: "Bessemerstr. 80",
    plz: "44793",
    stadt: "Bochum",
    rolle: "Hauptsitz",
  },
  filiale: {
    name: "Castrop-Rauxel",
    strasse: "Gerther Str. 37",
    plz: "44577",
    stadt: "Castrop-Rauxel",
    rolle: "Filiale",
  },
};

export const oeffnungszeiten = {
  buero: "Mo–Fr 7:30–17:00 Uhr",
  notdienstZeiten: "Mo–Fr 7:00–23:00 Uhr",
  notdienstWochenende: "Wochenende nach Vereinbarung",
};

export const stadtteile = [
  "Mitte",
  "Wattenscheid",
  "Riemke",
  "Hofstede",
  "Linden",
  "Querenburg",
  "Weitmar",
];

export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
  highlight?: boolean;
};

export const services: Service[] = [
  {
    slug: "elektroinstallation",
    name: "Elektroinstallation & Sanierung",
    icon: Zap,
    description:
      "Vom Sicherungskasten bis zur kompletten Hausinstallation – Altbau und Neubau, mit Festpreis nach Vor-Ort-Termin.",
  },
  {
    slug: "smart-home",
    name: "Smart Home / KNX",
    icon: Home,
    description:
      "Licht, Heizung, Beschattung und Sicherheit zentral gesteuert – mit KNX, Loxone oder Smart-Home-Bus-Lösung.",
  },
  {
    slug: "wallbox-pv",
    name: "Wallbox & PV-Anlagen",
    icon: Plug,
    description:
      "E-Auto-Ladestation und Photovoltaik aus einer Hand – inklusive Förder-Beratung (KfW · BAFA · NRW).",
  },
  {
    slug: "e-check",
    name: "E-Check & Prüfung",
    icon: ShieldCheck,
    description:
      "Versicherungs-relevanter E-Check, DGUV V3 für Gewerbe, Prüfprotokoll mit Plakette inklusive.",
  },
  {
    slug: "sprechanlagen",
    name: "Sprechanlagen",
    icon: Bell,
    description:
      "Audio- und Video-Türsprechanlagen – modernisieren oder neu installieren, auch im Mehrfamilienhaus.",
  },
  {
    slug: "notdienst",
    name: "Notdienst",
    icon: Siren,
    description:
      "Stromausfall, Kurzschluss, Sicherung fliegt? Mo–Fr 7:00–23:00 Uhr für Bochum und Castrop-Rauxel.",
    highlight: true,
  },
];

export type StadtteilTag = string;

export const trustBadges = [
  { icon: ShieldCheck, label: "Meisterbetrieb" },
  { icon: Building2, label: "Innung Bochum-Hattingen" },
  { icon: Wrench, label: "~20 Mitarbeiter" },
  { icon: CheckCircle2, label: "Bochum + Castrop-Rauxel" },
];

export const referenzen = [
  {
    titel: "MFH-Sanierung 12 WE",
    ort: "Bochum-Riemke",
    leistung: "Komplett-Sanierung Strangleitungen + Sicherungskästen",
  },
  {
    titel: "Hausverwaltung Wattenscheid",
    ort: "Bochum-Wattenscheid",
    leistung: "Rahmenvertrag Wartung + DGUV V3 für 28 Objekte",
  },
  {
    titel: "Wallbox-Park Bürogebäude",
    ort: "Bochum-Hofstede",
    leistung: "8x 22-kW-Wallbox inkl. Lastmanagement",
  },
];

export const foerderProgramme = [
  {
    titel: "KfW Wallbox 442",
    status: "Aktuell ausgelaufen – wir informieren über Nachfolge-Programme",
  },
  {
    titel: "BAFA Wärmepumpe",
    status: "Bis zu 70 % Bonus für E-Installationsanteil möglich",
  },
  {
    titel: "NRW PV-Förderung",
    status: "progres.nrw fördert Speicher und Wallbox-Anschluss",
  },
];
