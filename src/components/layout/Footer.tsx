import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import {
  brand,
  kontakt,
  oeffnungszeiten,
  services,
  standorte,
} from "@/lib/demo-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-500 text-navy-100">
      <div className="container-wide py-14 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="white" withLink={false} className="h-10 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-navy-200">
              {brand.shortDescription}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Leistungen
            </h3>
            <ul className="space-y-2 text-sm text-navy-200">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    className="hover:text-solaris-300"
                    href={`/leistungen/${service.slug}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  className="hover:text-solaris-300"
                  href="/foerderung-photovoltaik-2026"
                >
                  Förderung 2026
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Bürostandort
            </h3>
            <div className="space-y-3 text-sm text-navy-200">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>
                  {standorte.hauptsitz.strasse}
                  <br />
                  {standorte.hauptsitz.plz} {standorte.hauptsitz.stadt}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>{oeffnungszeiten.buero}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a
                  className="hover:text-solaris-300"
                  href={kontakt.hauptsitz.telLink}
                >
                  {kontakt.hauptsitz.tel}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a className="hover:text-solaris-300" href={kontakt.emailLink}>
                  {kontakt.email}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Standorte am Niederrhein
            </h3>
            <ul className="space-y-2 text-sm text-navy-200">
              <li>
                <Link
                  className="hover:text-solaris-300"
                  href="/photovoltaik/moers"
                >
                  Photovoltaik Moers
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-solaris-300"
                  href="/photovoltaik/neukirchen-vluyn"
                >
                  Neukirchen-Vluyn
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-solaris-300"
                  href="/photovoltaik/kamp-lintfort"
                >
                  Kamp-Lintfort
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-solaris-300"
                  href="/photovoltaik/rheinberg"
                >
                  Rheinberg
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-solaris-300"
                  href="/photovoltaik/voerde"
                >
                  Voerde
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-solaris-300"
                  href="/photovoltaik/niederrhein"
                >
                  Niederrhein-Übersicht
                </Link>
              </li>
            </ul>

            <h3 className="mt-8 mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Rechtliches
            </h3>
            <ul className="space-y-2 text-sm text-navy-200">
              <li>
                <Link className="hover:text-solaris-300" href="/impressum">
                  Impressum
                </Link>
              </li>
              <li>
                <Link className="hover:text-solaris-300" href="/datenschutz">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-navy-700 pt-6 text-center text-xs text-navy-300 lg:flex lg:items-center lg:justify-between lg:text-left">
          <p>
            © {currentYear} {brand.legalName} · Inhaber {brand.owner} ·
            Elektro-Meisterbetrieb in Moers
          </p>
          <p className="mt-2 lg:mt-0">USt-IdNr. DE216715857</p>
        </div>
      </div>
    </footer>
  );
}
