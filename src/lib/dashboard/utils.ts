import type { Lead } from "./types";

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export function relativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso).getTime();
  const diff = now.getTime() - then;

  if (diff < 0) return "gerade eben";
  if (diff < MIN) return "gerade eben";
  if (diff < HOUR) {
    const m = Math.floor(diff / MIN);
    return `vor ${m} Min.`;
  }
  if (diff < DAY) {
    const h = Math.floor(diff / HOUR);
    return `vor ${h} Std.`;
  }

  const days = Math.floor(diff / DAY);
  if (days === 1) return "gestern";
  if (days < 7) return `vor ${days} Tagen`;
  if (days < 14) return "letzte Woche";
  return `vor ${Math.floor(days / 7)} Wochen`;
}

export function formatEingangszeit(iso: string): string {
  const date = new Date(iso);
  const datum = date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const zeit = date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datum} um ${zeit} Uhr`;
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatKwp(value: number): string {
  return `${value.toLocaleString("de-DE", { maximumFractionDigits: 1 })} kWp`;
}

export function formatYears(value: number): string {
  return `${value.toLocaleString("de-DE", { maximumFractionDigits: 1 })} Jahre`;
}

export function sortByEingangszeitDesc(leads: Lead[]): Lead[] {
  return [...leads].sort(
    (a, b) =>
      new Date(b.eingangszeit).getTime() - new Date(a.eingangszeit).getTime()
  );
}

export function isToday(iso: string, now: Date = new Date()): boolean {
  const date = new Date(iso);
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export function isYesterday(iso: string, now: Date = new Date()): boolean {
  const date = new Date(iso);
  const y = new Date(now);
  y.setDate(now.getDate() - 1);
  return (
    date.getFullYear() === y.getFullYear() &&
    date.getMonth() === y.getMonth() &&
    date.getDate() === y.getDate()
  );
}

export function isThisWeek(iso: string, now: Date = new Date()): boolean {
  const date = new Date(iso);
  const diff = now.getTime() - date.getTime();
  return diff >= 0 && diff < 7 * DAY;
}

export function digitsOnly(input: string): string {
  return input.replace(/\D+/g, "");
}

export function buildWhatsAppLink(telefon: string, name: string): string {
  const digits = digitsOnly(telefon);
  // 0234... -> 4923... (DE)
  const intl = digits.startsWith("0") ? `49${digits.slice(1)}` : digits;
  const greeting = `Guten Tag${name ? " " + name.split(" ").slice(-1)[0] : ""}, hier Tina von Elektro Sternhoff. Vielen Dank für Ihre Anfrage – wie kann ich Ihnen weiterhelfen?`;
  return `https://wa.me/${intl}?text=${encodeURIComponent(greeting)}`;
}

export function buildMailLink(
  email: string | undefined,
  anliegen: string
): string | null {
  if (!email) return null;
  const subject = "Ihre Anfrage bei Elektro Sternhoff";
  const body = `Guten Tag,\n\nvielen Dank für Ihre Anfrage:\n\n„${anliegen}"\n\nWir melden uns kurzfristig bei Ihnen.\n\nFreundliche Grüße\nTina · Elektro Sternhoff GmbH\n0234 92339560`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildTelLink(telefon: string): string {
  const digits = digitsOnly(telefon);
  const intl = digits.startsWith("0") ? `+49${digits.slice(1)}` : `+${digits}`;
  return `tel:${intl}`;
}
