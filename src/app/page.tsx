import type { Metadata } from "next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyButtons } from "@/components/layout/MobileStickyButtons";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { SoEinfachGehtSolaris } from "@/components/sections/SoEinfachGehtSolaris";
import { LokalePraesenz } from "@/components/sections/LokalePraesenz";
import { InhaberStatement } from "@/components/sections/InhaberStatement";
import { FoerderBeratung } from "@/components/sections/FoerderBeratung";
import { ROITeaser } from "@/components/sections/ROITeaser";
import { NotdienstBlock } from "@/components/sections/NotdienstBlock";

export const metadata: Metadata = {
  title:
    "Photovoltaik Moers · PV-Anlage vom Elektro-Meisterbetrieb · Solaris PV",
  description:
    "Solaris PV: Photovoltaik, Speicher, Wallbox & Wärmepumpe vom Elektro-Meisterbetrieb in Moers. Andreas Mellies plant jede Anlage persönlich. Festpreis nach Vor-Ort-Termin. ☎ 02841 / 816 37 27",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Photovoltaik Moers · PV-Anlage vom Elektro-Meisterbetrieb · Solaris PV",
    description:
      "PV-Anlage, Speicher und Wallbox aus einer Hand. Elektro-Meisterbetrieb in Moers — Andreas Mellies persönlich.",
    url: "/",
    images: ["/og-image.png"],
    locale: "de_DE",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">
        <HeroSection />
        <TrustBar />
        <ServiceGrid />
        <SoEinfachGehtSolaris />
        <LokalePraesenz />
        <InhaberStatement />
        <FoerderBeratung />
        <ROITeaser />
        <NotdienstBlock />
      </main>
      <Footer />
      <MobileStickyButtons />
    </>
  );
}
