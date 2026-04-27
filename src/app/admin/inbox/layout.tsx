import type { Metadata } from "next";
import { DashboardProvider } from "@/lib/dashboard/store";

export const metadata: Metadata = {
  title: "Lead-Inbox · Sternhoff",
  description:
    "Interne Lead-Inbox für Elektro Sternhoff – Demo-Modus mit Mock-Daten.",
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
