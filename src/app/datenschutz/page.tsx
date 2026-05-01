import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { brand, kontakt, standorte } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von Solaris PV — Inhaber Andreas Mellies, Moers. Informationen zur Verarbeitung personenbezogener Daten nach DSGVO und BDSG.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
};

export default function Datenschutz() {
  return (
    <>
      <Header />
      <main className="container-wide max-w-3xl py-16 lg:py-24">
        <article className="prose prose-slate max-w-none">
          <h1>Datenschutzerklärung</h1>

          {/* ⚠️ BLOCKER vor Live-Gang — diese DS muss vor dem Launch um Cookie-Banner, Calendly,
              Resend, Sanity, Vercel, ggf. n8n/Pinecone/WhatsApp erweitert werden.
              Siehe _offene-fragen.md B4. Der Text unten basiert auf der Dr.-Schwenke-Vorlage
              der alten Site (Stand 8. November 2023) und wird vor Live-Gang neu generiert. */}

          <h2>Präambel</h2>
          <p>
            Mit der folgenden Datenschutzerklärung möchten wir Sie darüber
            aufklären, welche Arten Ihrer personenbezogenen Daten (nachfolgend
            auch kurz als „Daten“ bezeichnet) wir zu welchen Zwecken und in
            welchem Umfang verarbeiten. Die Datenschutzerklärung gilt für alle
            von uns durchgeführten Verarbeitungen personenbezogener Daten,
            sowohl im Rahmen der Erbringung unserer Leistungen als auch
            insbesondere auf unseren Webseiten.
          </p>
          <p>
            <strong>Stand:</strong> 1. Mai 2026 (Übergangs-Stand;
            Aktualisierung vor Live-Gang erforderlich)
          </p>

          <h2>Verantwortlicher</h2>
          <p>
            {brand.legalName}
            <br />
            Inhaber: {brand.owner}
            <br />
            {standorte.sitz.strasse}
            <br />
            {standorte.sitz.plz} {standorte.sitz.stadt}
          </p>
          <p>
            E-Mail: <a href={kontakt.emailLink}>{kontakt.email}</a>
            <br />
            Telefon:{" "}
            <a href={kontakt.hauptsitz.telLink}>{kontakt.hauptsitz.tel}</a>
            <br />
            Impressum:{" "}
            <a href="/impressum">/impressum</a>
          </p>

          <h2>Übersicht der Verarbeitungen</h2>
          <h3>Arten der verarbeiteten Daten</h3>
          <ul>
            <li>Kontaktdaten</li>
            <li>Inhaltsdaten</li>
            <li>Nutzungsdaten</li>
            <li>Meta-, Kommunikations- und Verfahrensdaten</li>
          </ul>

          <h3>Kategorien betroffener Personen</h3>
          <ul>
            <li>Kommunikationspartner</li>
            <li>Nutzer</li>
          </ul>

          <h3>Zwecke der Verarbeitung</h3>
          <ul>
            <li>Kontaktanfragen und Kommunikation</li>
            <li>Sicherheitsmaßnahmen</li>
            <li>Verwaltung und Beantwortung von Anfragen</li>
            <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit</li>
            <li>Informationstechnische Infrastruktur</li>
          </ul>

          <h2>Maßgebliche Rechtsgrundlagen</h2>
          <p>
            Maßgebliche Rechtsgrundlagen nach der DSGVO:
          </p>
          <ul>
            <li>
              <strong>
                Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1
                S. 1 lit. b DSGVO)
              </strong>{" "}
              — Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen
              Vertragspartei die betroffene Person ist, oder zur Durchführung
              vorvertraglicher Maßnahmen erforderlich.
            </li>
            <li>
              <strong>
                Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f DSGVO)
              </strong>{" "}
              — Die Verarbeitung ist zur Wahrung der berechtigten Interessen
              des Verantwortlichen oder eines Dritten erforderlich, sofern
              nicht die Interessen oder Grundrechte und Grundfreiheiten der
              betroffenen Person überwiegen.
            </li>
          </ul>
          <p>
            Zusätzlich zu den Datenschutzregelungen der DSGVO gelten nationale
            Regelungen zum Datenschutz in Deutschland — insbesondere das
            Bundesdatenschutzgesetz (BDSG).
          </p>

          <h2>Sicherheitsmaßnahmen</h2>
          <p>
            Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter
            Berücksichtigung des Stands der Technik geeignete technische und
            organisatorische Maßnahmen, um ein dem Risiko angemessenes
            Schutzniveau zu gewährleisten. Dazu gehört insbesondere die
            TLS/SSL-Verschlüsselung (HTTPS) der Datenübermittlung zwischen
            Ihrem Browser und unserer Website.
          </p>

          <h2>Bereitstellung des Onlineangebotes und Webhosting</h2>
          <p>
            Für die Bereitstellung unseres Onlineangebotes nutzen wir
            Speicherplatz und Rechenkapazität, die wir von einem Webhoster
            beziehen. Der Zugriff auf unser Onlineangebot wird in Form von
            Server-Logfiles protokolliert (IP-Adresse, Datum/Uhrzeit, abgerufene
            URL, Browser, Betriebssystem). Logfile-Informationen werden für die
            Dauer von maximal 30 Tagen gespeichert.
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Berechtigte Interessen
            (Art. 6 Abs. 1 S. 1 lit. f DSGVO).
          </p>

          <h2>Kontakt- und Anfragenverwaltung</h2>
          <p>
            Bei der Kontaktaufnahme mit uns (per Post, Kontaktformular, E-Mail,
            Telefon oder via soziale Medien) sowie im Rahmen bestehender Nutzer-
            und Geschäftsbeziehungen werden die Angaben der anfragenden Personen
            verarbeitet, soweit dies zur Beantwortung der Kontaktanfragen und
            etwaiger angefragter Maßnahmen erforderlich ist.
          </p>
          <p>
            <strong>Rechtsgrundlagen:</strong> Vertragserfüllung und
            vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b DSGVO),
            Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f DSGVO).
          </p>

          <h2>Rechte der betroffenen Personen</h2>
          <p>
            Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu,
            die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:
          </p>
          <ul>
            <li>
              <strong>Widerspruchsrecht:</strong> Sie haben das Recht, aus
              Gründen, die sich aus Ihrer besonderen Situation ergeben,
              jederzeit gegen die Verarbeitung der Sie betreffenden
              personenbezogenen Daten Widerspruch einzulegen.
            </li>
            <li>
              <strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben
              das Recht, erteilte Einwilligungen jederzeit zu widerrufen.
            </li>
            <li>
              <strong>Auskunftsrecht:</strong> Sie haben das Recht, eine
              Bestätigung darüber zu verlangen, ob betreffende Daten
              verarbeitet werden, und auf Auskunft über diese Daten.
            </li>
            <li>
              <strong>Recht auf Berichtigung:</strong> Sie haben das Recht, die
              Berichtigung unrichtiger Daten oder die Vervollständigung der Sie
              betreffenden Daten zu verlangen.
            </li>
            <li>
              <strong>
                Recht auf Löschung und Einschränkung der Verarbeitung:
              </strong>{" "}
              Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht,
              Löschung oder Einschränkung der Verarbeitung zu verlangen.
            </li>
            <li>
              <strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das
              Recht, die Sie betreffenden Daten in einem strukturierten,
              gängigen und maschinenlesbaren Format zu erhalten oder deren
              Übermittlung an einen anderen Verantwortlichen zu fordern.
            </li>
            <li>
              <strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben das
              Recht auf Beschwerde bei einer Aufsichtsbehörde, wenn Sie der
              Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten
              gegen die Vorgaben der DSGVO verstößt.
            </li>
          </ul>

          <h2>Löschung von Daten</h2>
          <p>
            Die von uns verarbeiteten Daten werden nach Maßgabe der
            gesetzlichen Vorgaben gelöscht, sobald deren zur Verarbeitung
            erlaubten Einwilligungen widerrufen werden oder sonstige
            Erlaubnisse entfallen.
          </p>

          <h2>Änderung und Aktualisierung der Datenschutzerklärung</h2>
          <p>
            Wir bitten Sie, sich regelmäßig über den Inhalt unserer
            Datenschutzerklärung zu informieren. Wir passen die
            Datenschutzerklärung an, sobald die Änderungen der von uns
            durchgeführten Datenverarbeitungen dies erforderlich machen.
          </p>

          <hr />
          <p className="text-sm text-muted-foreground">
            Vorlage in Anlehnung an datenschutz-generator.de (Dr. Thomas
            Schwenke). Vor Live-Gang wird die Datenschutzerklärung um
            Tools/Dienste erweitert, die im neuen Stack zum Einsatz kommen
            (Cookie-Banner, Calendly/Cal.com, Resend, Sanity, Vercel,
            ggf. n8n und Chatbot).
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
