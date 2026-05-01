import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photovoltaik für Hausverwaltungen am Niederrhein · Solaris PV",
  description:
    "Mieterstrom, Wallbox-Park, PV-Großanlagen und E-Check für Mehrfamilienhäuser. Solaris PV arbeitet vom Bürostandort Moers für Hausverwaltungen am Niederrhein.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
