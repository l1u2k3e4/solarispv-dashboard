import type { Metadata } from "next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyButtons } from "@/components/layout/MobileStickyButtons";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { LokalePraesenz } from "@/components/sections/LokalePraesenz";
import { InhaberStatement } from "@/components/sections/InhaberStatement";
import { FoerderBeratung } from "@/components/sections/FoerderBeratung";
import { ROITeaser } from "@/components/sections/ROITeaser";
import { NotdienstBlock } from "@/components/sections/NotdienstBlock";

export const metadata: Metadata = {
  title: "Elektromeister in Bochum – Sternhoff GmbH",
  description:
    "Elektroinstallation, Smart Home, Wallbox & PV vom Bochumer Meisterbetrieb. Hauptsitz Bessemerstr. 80, Filiale Castrop-Rauxel. Notdienst Mo–Fr.",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">
        <HeroSection />
        <TrustBar />
        <ServiceGrid />
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
