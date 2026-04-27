"use client";

import { useState, type FormEvent } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toast } from "@/components/ui/Toast";
import { foerderProgramme } from "@/lib/demo-data";

type FormState = {
  name: string;
  telefon: string;
  massnahme: string;
  dsgvo: boolean;
};

export function FoerderBeratung() {
  const [form, setForm] = useState<FormState>({
    name: "",
    telefon: "",
    massnahme: "",
    dsgvo: false,
  });
  const [toastOpen, setToastOpen] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.dsgvo) return;
    setToastOpen(true);
    setForm({ name: "", telefon: "", massnahme: "", dsgvo: false });
  }

  return (
    <section
      id="foerderberatung"
      className="bg-sternhoff-bg-light py-16 lg:py-24"
    >
      <div className="container-wide">
        <div className="mb-10 max-w-2xl lg:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sternhoff-accent">
            Förder-Beratung
          </p>
          <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
            Holen Sie sich Ihre Förderung – wir kennen die aktuellen Programme.
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="space-y-4 lg:col-span-2">
            {foerderProgramme.map((p) => (
              <div
                key={p.titel}
                className="flex items-start gap-3 rounded-lg border border-sternhoff-primary/15 bg-white p-5"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-sternhoff-primary/10 text-sternhoff-primary">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-bold text-sternhoff-text-dark">{p.titel}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.status}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:col-span-3"
            noValidate
          >
            <p className="text-lg font-bold text-sternhoff-text-dark">
              Kostenlose Erst-Beratung anfordern
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Wir melden uns innerhalb eines Werktags zurück.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="fb-name">Name</Label>
                <Input
                  id="fb-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="fb-telefon">Telefon</Label>
                <Input
                  id="fb-telefon"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={form.telefon}
                  onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="fb-massnahme">Maßnahme</Label>
                <Select
                  value={form.massnahme}
                  onValueChange={(v) => setForm({ ...form, massnahme: v })}
                >
                  <SelectTrigger id="fb-massnahme" className="mt-2">
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wallbox">Wallbox</SelectItem>
                    <SelectItem value="pv">Photovoltaik</SelectItem>
                    <SelectItem value="waermepumpe">Wärmepumpe</SelectItem>
                    <SelectItem value="sonstiges">Sonstiges</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <label className="mt-5 flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                required
                checked={form.dsgvo}
                onChange={(e) => setForm({ ...form, dsgvo: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-input text-sternhoff-primary focus:ring-2 focus:ring-sternhoff-primary"
              />
              <span>
                Ich willige ein, dass Elektro Sternhoff meine Daten zur
                Bearbeitung meiner Anfrage verarbeitet (Datenschutz-Erklärung).
              </span>
            </label>

            <Button type="submit" variant="accent" size="lg" className="mt-6 w-full sm:w-auto">
              Beratung anfordern
            </Button>

            <p className="mt-4 text-xs text-muted-foreground">
              Demo-Hinweis: Im Live-Betrieb wird die Anfrage an Sternhoff gesendet.
            </p>
          </form>
        </div>
      </div>

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message="Demo: Im Live-Betrieb wird die Anfrage an Sternhoff gesendet."
      />
    </section>
  );
}
