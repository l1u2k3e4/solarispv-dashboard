import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

import { kontakt, standorte } from "@/lib/demo-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sternhoff-primary text-white">
      <div className="container-wide py-14 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logo-sternhoff.png"
              alt="Elektro Sternhoff"
              width={200}
              height={44}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Elektromeisterbetrieb in Bochum. Seit Jahrzehnten zuverlässig vor Ort
              – mit Filiale in Castrop-Rauxel.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Leistungen
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link className="hover:text-white" href="/#leistungen">Elektroinstallation</Link></li>
              <li><Link className="hover:text-white" href="/#leistungen">Smart Home / KNX</Link></li>
              <li><Link className="hover:text-white" href="/#leistungen">Wallbox & PV</Link></li>
              <li><Link className="hover:text-white" href="/#leistungen">E-Check</Link></li>
              <li><Link className="hover:text-white" href="/notdienst">Notdienst</Link></li>
              <li><Link className="hover:text-white" href="/b2b/hausverwaltungen">Für Hausverwaltungen</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Standorte
            </h3>
            <div className="space-y-5 text-sm text-white/80">
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
                  <a className="hover:text-white" href={kontakt.hauptsitz.telLink}>
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
                  <a className="hover:text-white" href={kontakt.filiale.telLink}>
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
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a className="hover:text-white" href={kontakt.hauptsitz.telLink}>
                  {kontakt.hauptsitz.tel}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a className="hover:text-white" href={kontakt.emailLink}>
                  {kontakt.email}
                </a>
              </li>
            </ul>
            <h3 className="mt-8 mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Rechtliches
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link className="hover:text-white" href="/impressum">Impressum</Link></li>
              <li><Link className="hover:text-white" href="/datenschutz">Datenschutz</Link></li>
              <li><Link className="hover:text-white" href="/agb">AGB</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-6 text-center text-xs text-white/60 lg:flex lg:items-center lg:justify-between lg:text-left">
          <p>© {currentYear} Elektro Sternhoff GmbH · Meisterbetrieb · HRB-28124, Amtsgericht Dortmund</p>
          <p className="mt-2 lg:mt-0">Innung Bochum-Hattingen · HWK Münster</p>
        </div>
      </div>
    </footer>
  );
}
