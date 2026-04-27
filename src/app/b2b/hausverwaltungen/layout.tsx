import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elektrohandwerk für Hausverwaltungen im Ruhrgebiet",
  description:
    "Rahmenverträge, E-Check, 24/7-Notfall-SLA und Festpreise je MFH. Elektro Sternhoff arbeitet aus Bochum + Castrop-Rauxel für Hausverwaltungen.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
