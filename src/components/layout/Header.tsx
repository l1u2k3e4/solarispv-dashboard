"use client";

import Link from "next/link";
import { Phone, Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { kontakt } from "@/lib/demo-data";

const navItems = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/notdienst", label: "Notdienst" },
  { href: "/b2b/hausverwaltungen", label: "B2B" },
  { href: "/rechner/photovoltaik", label: "PV-Rechner" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-wide flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo className="h-9 w-auto lg:h-11" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-bold text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="default" size="default" className="hidden md:inline-flex">
            <a href={kontakt.hauptsitz.telLink} aria-label={`Anrufen ${kontakt.hauptsitz.tel}`}>
              <Phone className="h-4 w-4" />
              {kontakt.hauptsitz.tel}
            </a>
          </Button>
          <a
            href={kontakt.hauptsitz.telLink}
            aria-label="Anrufen"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground md:hidden"
          >
            <Phone className="h-5 w-5" />
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-solaris-50 lg:hidden"
                aria-label="Menü öffnen"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[360px]">
              <SheetTitle className="mb-6">Menü</SheetTitle>
              <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-md px-3 py-3 text-base font-bold text-foreground transition-colors hover:bg-solaris-50 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-8 space-y-3 border-t border-border pt-6">
                <Button asChild variant="default" size="lg" className="w-full">
                  <a href={kontakt.hauptsitz.telLink}>
                    <Phone className="h-4 w-4" />
                    {kontakt.hauptsitz.tel}
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href={kontakt.whatsapp.link} target="_blank" rel="noopener noreferrer">
                    WhatsApp schreiben
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
