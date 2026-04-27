import type { Metadata, Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

import { ChatProvider } from "@/lib/chat/store";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ChatLauncher } from "@/components/chat/ChatLauncher";
import { DemoBanner } from "@/components/layout/DemoBanner";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Elektro Sternhoff – Ihr Elektromeisterbetrieb in Bochum",
    template: "%s | Elektro Sternhoff Bochum",
  },
  description:
    "Elektromeisterbetrieb in Bochum – Elektroinstallation, Smart Home, Wallbox, PV und Notdienst. Hauptsitz Bessemerstraße 80 · Filiale Castrop-Rauxel.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.elektro-sternhoff.de"
  ),
};

export const viewport: Viewport = {
  themeColor: "#15387D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={sourceSans.variable}>
      <body className="bg-background font-sans text-sternhoff-text-dark antialiased">
        <DemoBanner />
        <ChatProvider>
          {children}
          <ChatLauncher />
          <ChatWidget />
        </ChatProvider>
      </body>
    </html>
  );
}
