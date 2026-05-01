import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { kontakt, standorte } from "@/lib/demo-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-500 text-navy-100">
      <div className="container-wide py-14 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="white" withLink={false} className="h-10 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-navy-200">
              Elektromeisterbetrieb in Bochum. Seit Jahrzehnten zuverlässig vor Ort
              – mit Filiale in Castrop-Rauxel.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Leistungen
            </h3>
            <ul className="space-y-2 text-sm text-navy-200">
              <li><Link className="hover:text-solaris-300" href="/#leistungen">Elektroinstallation</Link></li>
              <li><Link className="hover:text-solaris-300" href="/#leistungen">Smart Home / KNX</Link></li>
              <li><Link className="hover:text-solaris-300" href="/#leistungen">Wallbox & PV</Link></li>
              <li><Link className="hover:text-solaris-300" href="/#leistungen">E-Check</Link></li>
              <li><Link className="hover:text-solaris-300" href="/notdienst">Notdienst</Link></li>
              <li><Link className="hover:text-solaris-300" href="/b2b/hausverwaltungen">Für Hausverwaltungen</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Standorte
            </h3>
            <div className="space-y-5 text-sm text-navy-200">
              <div>
                <p className="font-bold text-white">{standorte.hauptsitz.rolle} {standorte.hauptsitz.name}</p>
                <p className="mt-1 flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>
                    {standorte.hauptsitz.strasse}<br />
                    {standorte.hauptsitz.plz} {standorte.hauptsitz.stadt}
                  </span>
                </p>
                <p className="mt-2">
                  <a className="hover:text-solaris-300" href={kontakt.hauptsitz.telLink}>
                    {kontakt.hauptsitz.tel}
                  </a>
                </p>
              </div>
              <div>
                <p className="font-bold text-white">{standorte.filiale.rolle} {standorte.filiale.name}</p>
                <p className="mt-1 flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>
                    {standorte.filiale.strasse}<br />
                    {standorte.filiale.plz} {standorte.filiale.stadt}
                  </span>
                </p>
                <p className="mt-2">
                  <a className="hover:text-solaris-300" href={kontakt.filiale.telLink}>
                    {kontakt.filiale.tel}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Kontakt
            </h3>
            <ul className="space-y-3 text-sm text-navy-200">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a className="hover:text-solaris-300" href={kontakt.hauptsitz.telLink}>
                  {kontakt.hauptsitz.tel}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a className="hover:text-solaris-300" href={kontakt.emailLink}>
                  {kontakt.email}
                </a>
              </li>
            </ul>
            <h3 className="mt-8 mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Rechtliches
            </h3>
            <ul className="space-y-2 text-sm text-navy-200">
              <li><Link className="hover:text-solaris-300" href="/impressum">Impressum</Link></li>
              <li><Link className="hover:text-solaris-300" href="/datenschutz">Datenschutz</Link></li>
              <li><Link className="hover:text-solaris-300" href="/agb">AGB</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-navy-700 pt-6 text-center text-xs text-navy-300 lg:flex lg:items-center lg:justify-between lg:text-left">
          <p>© {currentYear} Elektro Sternhoff GmbH · Meisterbetrieb · HRB-28124, Amtsgericht Dortmund</p>
          <p className="mt-2 lg:mt-0">Innung Bochum-Hattingen · HWK Münster</p>
        </div>
      </div>
    </footer>
  );
}
