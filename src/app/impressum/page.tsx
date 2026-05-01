import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { brand, kontakt, standorte } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum von Solaris PV — Inhaber Andreas Mellies, Birkenstraße 12, 47447 Moers. Kontaktdaten, Umsatzsteuer-ID und rechtliche Pflichtangaben.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

export default function Impressum() {
  return (
    <>
      <Header />
      <main className="container-wide max-w-3xl py-16 lg:py-24">
        <article className="prose prose-slate max-w-none">
          <h1>Impressum</h1>

          <p className="lead">
            Angaben gemäß § 5 TMG.
          </p>

          <h2>Anbieter</h2>
          <p>
            {brand.legalName}
            <br />
            Inhaber: {brand.owner}
            <br />
            {standorte.sitz.strasse}
            <br />
            {standorte.sitz.plz} {standorte.sitz.stadt}
          </p>

          <h2>Bürostandort</h2>
          <p>
            {standorte.hauptsitz.strasse}
            <br />
            {standorte.hauptsitz.plz} {standorte.hauptsitz.stadt}
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon:{" "}
            <a href={kontakt.hauptsitz.telLink}>{kontakt.hauptsitz.tel}</a>
            <br />
            Telefax: {kontakt.hauptsitz.fax}
            <br />
            E-Mail: <a href={kontakt.emailLink}>{kontakt.email}</a>
          </p>

          <h2>Umsatzsteuer-Identifikationsnummer</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
            <br />
            <strong>DE216715857</strong>
          </p>

          <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <p>
            Berufsbezeichnung: <strong>Elektrotechniker-Handwerk</strong>
            <br />
            Verliehen in der Bundesrepublik Deutschland.
          </p>
          <p>
            Es gelten die Regelungen der Handwerksordnung (HwO), abrufbar unter{" "}
            <a
              href="https://www.gesetze-im-internet.de/hwo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              gesetze-im-internet.de/hwo
            </a>
            .
          </p>

          <h2>Aufsichtsbehörde / zuständige Kammer</h2>
          {/* ❓ TODO Mellies — verifizieren (vermutlich HWK Düsseldorf, Innung Niederrhein); siehe _offene-fragen.md B3 */}
          <p>
            Handwerkskammer Düsseldorf
            <br />
            Georg-Schulhoff-Platz 1, 40221 Düsseldorf
            <br />
            <a
              href="https://www.hwk-duesseldorf.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              hwk-duesseldorf.de
            </a>
          </p>
          <p>
            <em>
              Hinweis: Die exakte Innungs-Mitgliedschaft (Innung des Elektro- und
              Informationstechnischen Handwerks Niederrhein) wird vor Live-Gang
              bestätigt.
            </em>
          </p>

          <h2>Berufshaftpflichtversicherung</h2>
          {/* ⚠️ BLOCKER vor Live-Gang — Pflichtangabe nach § 5 TMG / § 11 DL-InfoV; siehe _offene-fragen.md B1 */}
          <p>
            <em>
              Die Angaben zur Berufshaftpflichtversicherung (Versicherer, Sitz,
              Geltungsbereich) werden vor Live-Gang ergänzt.
            </em>
          </p>

          <h2>Verbraucherstreitbeilegung</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
            vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2>Online-Streitbeilegung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit, die Sie unter{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
            >
              ec.europa.eu/consumers/odr
            </a>{" "}
            finden. Verbraucher haben die Möglichkeit, diese Plattform für die
            Beilegung ihrer Streitigkeiten zu nutzen.
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
