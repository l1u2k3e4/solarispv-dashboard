import type { Metadata } from "next";
import { DashboardProvider } from "@/lib/dashboard/store";

export const metadata: Metadata = {
  title: "Lead-Inbox · Solaris PV",
  description:
    "Interne Lead-Inbox für Solaris PV – Demo-Modus mit Mock-Daten.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardProvider>{children}</DashboardProvider>;
}
