import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

import { ChatProvider } from "@/lib/chat/store";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ChatLauncher } from "@/components/chat/ChatLauncher";
import { DemoBanner } from "@/components/layout/DemoBanner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Solaris PV – Photovoltaik aus Moers für den Niederrhein",
    template: "%s | Solaris PV Moers",
  },
  description:
    "Solaris PV – Ihr Photovoltaik-Partner aus Moers. Planung, Installation und Wartung von PV-Anlagen, Speichern und Wallboxen. Persönlich vom Inhaber Andreas Mellies.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.solarispv.de"
  ),
};

export const viewport: Viewport = {
  themeColor: "#f47603",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased">
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
