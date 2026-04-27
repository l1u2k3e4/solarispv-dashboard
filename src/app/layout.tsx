import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Elektro Sternhoff – Elektromeisterbetrieb in Bochum",
    template: "%s | Elektro Sternhoff",
  },
  description:
    "Elektro Sternhoff GmbH: Meisterbetrieb für Elektroinstallation, Smart Home, Wallbox und PV in Bochum (Bessemerstr. 80) und Castrop-Rauxel (Filiale).",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.elektro-sternhoff.de"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={cn(inter.variable, plusJakartaSans.variable)}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
