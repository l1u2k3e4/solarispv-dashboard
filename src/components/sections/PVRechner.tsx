"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Sun,
  TrendingUp,
  Coins,
  CalendarClock,
  Wallet,
  ArrowRight,
  Lightbulb,
  Info,
  type LucideIcon,
} from "lucide-react";

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
import { Card, CardContent } from "@/components/ui/card";
import {
  ROOF_SIZES,
  RoofSizePicker,
  type RoofSize,
  type RoofSizeId,
} from "@/components/calculator/RoofSizePicker";
import {
  PV_CONSTANTS_2026,
  getInvestitionProKwp,
} from "@/lib/calculator/pv-constants";
import { cn } from "@/lib/utils";

type FormState = {
  stromverbrauch: number;
  dachflaeche: number;
  standort: "bochum" | "castrop" | "ruhrgebiet";
  eigenverbrauchQuote: number;
};

type InputMode = "visual" | "manual";

function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number, fractionDigits = 0) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

const DEFAULT_VISUAL_SIZE = ROOF_SIZES[0];

export function PVRechner() {
  const [inputMode, setInputMode] = useState<InputMode>("visual");
  const [selectedRoofSize, setSelectedRoofSize] = useState<
    RoofSizeId | undefined
  >(DEFAULT_VISUAL_SIZE.id);
  const [form, setForm] = useState<FormState>({
    stromverbrauch: 4500,
    dachflaeche: DEFAULT_VISUAL_SIZE.squareMeters.default,
    standort: "bochum",
    eigenverbrauchQuote: 50,
  });

  function handleRoofSizeChange(size: RoofSize) {
    setSelectedRoofSize(size.id);
    setForm((prev) => ({ ...prev, dachflaeche: size.squareMeters.default }));
  }

  function handleSwitchToManual() {
    setInputMode("manual");
  }

  function handleSwitchToVisual() {
    setInputMode("visual");
    if (!selectedRoofSize) {
      setSelectedRoofSize(DEFAULT_VISUAL_SIZE.id);
      setForm((prev) => ({
        ...prev,
        dachflaeche: DEFAULT_VISUAL_SIZE.squareMeters.default,
      }));
    }
  }

  const result = useMemo(() => {
    const kWp = form.dachflaeche * PV_CONSTANTS_2026.kwpProQuadratmeter;
    const jahresertrag = kWp * PV_CONSTANTS_2026.jahresertragProKwp;
    const eigenverbrauch = jahresertrag * (form.eigenverbrauchQuote / 100);
    const einspeisung = jahresertrag - eigenverbrauch;

    const ersparnisEigenverbrauch =
      eigenverbrauch * PV_CONSTANTS_2026.strompreisEigenverbrauch;
    const ersparnisEinspeisung =
      einspeisung *
      PV_CONSTANTS_2026.einspeiseverguetung.teileinspeisungBis10kWp;
    const ersparnis = ersparnisEigenverbrauch + ersparnisEinspeisung;

    const investitionProKwp = getInvestitionProKwp(kWp);
    const investition = kWp * investitionProKwp;
    const amortisation = ersparnis > 0 ? investition / ersparnis : 0;
    const gewinn20 = ersparnis * 20 - investition;
    return {
      kWp,
      jahresertrag,
      eigenverbrauch,
      einspeisung,
      ersparnis,
      investition,
      investitionProKwp,
      amortisation,
      gewinn20,
    };
  }, [form]);

  const activeRoofSize = ROOF_SIZES.find((s) => s.id === selectedRoofSize);
  const showVisualDisclaimer =
    inputMode === "visual" && activeRoofSize !== undefined;

  return (
    <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
      <Card className="lg:col-span-2">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-xl leading-tight">Ihre Eckdaten</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Passen Sie die Werte an – das Ergebnis aktualisiert sich live.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <Label htmlFor="stromverbrauch">Stromverbrauch pro Jahr (kWh)</Label>
              <Input
                id="stromverbrauch"
                type="number"
                inputMode="numeric"
                min={1000}
                max={20000}
                step={100}
                value={form.stromverbrauch}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stromverbrauch: Number(e.target.value) || 0,
                  })
                }
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Richtwert für 4-Personen-Haushalt: 4.000–5.000 kWh.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="dachflaeche">Dachfläche</Label>
                <div
                  role="tablist"
                  aria-label="Eingabemodus für Dachfläche"
                  className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={inputMode === "visual"}
                    onClick={handleSwitchToVisual}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-semibold transition",
                      inputMode === "visual"
                        ? "bg-white text-sternhoff-primary shadow-sm"
                        : "text-muted-foreground hover:text-sternhoff-text-dark",
                    )}
                  >
                    Über mein Haus schätzen
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={inputMode === "manual"}
                    onClick={handleSwitchToManual}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-semibold transition",
                      inputMode === "manual"
                        ? "bg-white text-sternhoff-primary shadow-sm"
                        : "text-muted-foreground hover:text-sternhoff-text-dark",
                    )}
                  >
                    Quadratmeter eingeben
                  </button>
                </div>
              </div>

              {inputMode === "visual" ? (
                <div className="mt-3">
                  <RoofSizePicker
                    value={selectedRoofSize}
                    onChange={handleRoofSizeChange}
                  />
                  {activeRoofSize && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Gewähltes Beispiel: <span className="font-medium text-sternhoff-text-dark">{activeRoofSize.exampleType}</span> · ca. {activeRoofSize.squareMeters.default} m².
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <Input
                    id="dachflaeche"
                    type="number"
                    inputMode="numeric"
                    min={5}
                    max={300}
                    step={1}
                    value={form.dachflaeche}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        dachflaeche: Number(e.target.value) || 0,
                      });
                      setSelectedRoofSize(undefined);
                    }}
                    className="mt-2"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Faustformel: ca. 5,5 m² pro kWp.
                  </p>
                </>
              )}
            </div>

            <div>
              <Label htmlFor="standort">Standort</Label>
              <Select
                value={form.standort}
                onValueChange={(v) =>
                  setForm({ ...form, standort: v as FormState["standort"] })
                }
              >
                <SelectTrigger id="standort" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bochum">Bochum</SelectItem>
                  <SelectItem value="castrop">Castrop-Rauxel</SelectItem>
                  <SelectItem value="ruhrgebiet">
                    Sonstiges Ruhrgebiet
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="eigenverbrauch">
                Eigenverbrauchs-Quote: {form.eigenverbrauchQuote} %
              </Label>
              <input
                id="eigenverbrauch"
                type="range"
                min={30}
                max={80}
                step={5}
                value={form.eigenverbrauchQuote}
                onChange={(e) =>
                  setForm({
                    ...form,
                    eigenverbrauchQuote: Number(e.target.value),
                  })
                }
                className="mt-3 w-full accent-sternhoff-primary"
                aria-valuenow={form.eigenverbrauchQuote}
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>30 %</span>
                <span>80 %</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-5 lg:col-span-3">
        <Card className="bg-sternhoff-primary text-white">
          <CardContent className="p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              Ihre Schätzung
            </p>
            <h2 className="mt-2 text-2xl leading-tight sm:text-3xl">
              Empfohlene Anlagengröße:{" "}
              <span className="text-sternhoff-accent">
                {formatNumber(result.kWp, 1)} kWp
              </span>
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ResultTile
                icon={Sun}
                label="Jahresertrag"
                value={`${formatNumber(result.jahresertrag)} kWh`}
              />
              <ResultTile
                icon={Coins}
                label="Jährliche Ersparnis"
                value={formatEuro(result.ersparnis)}
              />
              <ResultTile
                icon={CalendarClock}
                label="Amortisation"
                value={
                  result.amortisation > 0
                    ? `${formatNumber(result.amortisation, 1)} Jahre`
                    : "—"
                }
              />
              <ResultTile
                icon={TrendingUp}
                label="20-Jahres-Gewinn"
                value={formatEuro(result.gewinn20)}
              />
            </div>

            {showVisualDisclaimer && activeRoofSize && (
              <div className="mt-6 flex items-start gap-3 rounded-lg bg-white/10 p-4 text-sm">
                <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <p className="text-white/90">
                  Berechnung basiert auf einer geschätzten Dachfläche
                  (gewähltes Beispiel: <span className="font-bold">{activeRoofSize.exampleType}</span>,
                  ~{activeRoofSize.squareMeters.default} m²). Für eine genaue
                  Auslegung empfehlen wir die kostenlose Vor-Ort-Begehung.
                </p>
              </div>
            )}

            <div className="mt-4 flex items-start gap-3 rounded-lg bg-white/10 p-4 text-sm">
              <Wallet className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <p className="text-white/90">
                Geschätzte Investition:{" "}
                <span className="font-bold">{formatEuro(result.investition)}</span>{" "}
                · Erfahrungswert Anlagen Ihrer Größenklasse: ~
                <span className="font-bold">
                  {formatNumber(result.investitionProKwp)} €/kWp
                </span>{" "}
                schlüsselfertig.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-base font-bold text-sternhoff-text-dark">
              Förderung &amp; Steuern (Stand April 2026)
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-sternhoff-text-dark">
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-0.5 font-bold text-sternhoff-primary">✓</span>
                <span>
                  <strong>0 % Umsatzsteuer</strong> auf Anschaffung (Nullsteuersatz für PV ≤ 30 kWp)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-0.5 font-bold text-sternhoff-primary">✓</span>
                <span>
                  <strong>Einkommensteuer-Befreiung</strong> auf Erträge (für PV ≤ 30 kWp)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-0.5 font-bold text-sternhoff-primary">✓</span>
                <span>
                  <strong>KfW-Kredit 270</strong> verfügbar — bis 100 % Finanzierung ab{" "}
                  {formatNumber(PV_CONSTANTS_2026.foerderung.kfw270ZinssatzAb, 2).replace(
                    ".",
                    ",",
                  )}{" "}
                  % Zinssatz (kein Zuschuss, sondern Kredit).
                </span>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Hinweis: NRW gewährt 2026 keine Zuschüsse mehr für klassische
              EFH-Dachanlagen. Stadt Bochum hat aktuell kein eigenes
              PV-Programm — Quartiersförderungen nur für Mieterstrom / MFH-Speicher.
              Modul-Preise können seit April 2026 leicht steigen (China-Exportsteuer + Silberkosten).
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-sternhoff-accent/40 bg-sternhoff-accent/5">
          <CardContent className="p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-base font-bold text-sternhoff-accent">
              <Info className="h-4 w-4" aria-hidden="true" />
              Wichtig: Das ist ein Richtwert
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-sternhoff-text-dark">
              Diese Berechnung basiert auf Branchen-Mittelwerten für das Ruhrgebiet (Stand April 2026).
              Ihre tatsächlichen Zahlen können je nach Dachausrichtung, Verschattung, Modulwahl,
              Eigenverbrauchsverhalten und individueller Tarifsituation deutlich abweichen.
            </p>
            <p className="mt-3 text-sm font-semibold text-sternhoff-text-dark">
              Verbindliche Aussagen erst nach kostenloser Vor-Ort-Begehung durch unseren Meister.
            </p>
            <Button asChild variant="accent" size="lg" className="mt-6 w-full sm:w-auto">
              <Link href="/#foerderberatung">
                Jetzt kostenlose Beratung buchen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ResultTile({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </span>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
