"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stadtteile } from "@/lib/demo-data";
import type { Lead, LeadKanal, LeadStatus } from "@/lib/dashboard/types";
import {
  isThisWeek,
  isToday,
  isYesterday,
  relativeTime,
  sortByEingangszeitDesc,
} from "@/lib/dashboard/utils";
import { StatusBadge } from "./StatusBadge";
import { KanalIcon } from "./KanalIcon";

export type LeadListTab = "alle" | LeadStatus;

type Props = {
  leads: Lead[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  activeTab: LeadListTab;
  onTabChange: (tab: LeadListTab) => void;
  className?: string;
};

type DatumFilter = "alle" | "heute" | "gestern" | "woche";
type KanalFilter = "alle" | LeadKanal;

const TAB_LABEL: Record<LeadListTab, string> = {
  alle: "Alle",
  neu: "Neu",
  "in-bearbeitung": "In Bearbeitung",
  abgeschlossen: "Abgeschlossen",
};

const TABS: LeadListTab[] = ["alle", "neu", "in-bearbeitung", "abgeschlossen"];

const KANAL_OPTIONS: { value: KanalFilter; label: string }[] = [
  { value: "alle", label: "Alle Kanäle" },
  { value: "formular", label: "Formular" },
  { value: "chatbot", label: "Chatbot" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "roi-rechner", label: "ROI-Rechner" },
];

const DATUM_OPTIONS: { value: DatumFilter; label: string }[] = [
  { value: "alle", label: "Alle Tage" },
  { value: "heute", label: "Heute" },
  { value: "gestern", label: "Gestern" },
  { value: "woche", label: "Diese Woche" },
];

export function LeadList({
  leads,
  selectedId,
  onSelect,
  activeTab,
  onTabChange,
  className,
}: Props) {
  const [query, setQuery] = useState("");
  const [kanalFilter, setKanalFilter] = useState<KanalFilter>("alle");
  const [stadtteilFilter, setStadtteilFilter] = useState<string>("alle");
  const [datumFilter, setDatumFilter] = useState<DatumFilter>("alle");

  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const counts = useMemo(() => {
    return {
      alle: leads.length,
      neu: leads.filter((l) => l.status === "neu").length,
      "in-bearbeitung": leads.filter((l) => l.status === "in-bearbeitung")
        .length,
      abgeschlossen: leads.filter((l) => l.status === "abgeschlossen").length,
    } satisfies Record<LeadListTab, number>;
  }, [leads]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortByEingangszeitDesc(
      leads.filter((lead) => {
        if (activeTab !== "alle" && lead.status !== activeTab) return false;
        if (kanalFilter !== "alle" && lead.kanal !== kanalFilter) return false;
        if (
          stadtteilFilter !== "alle" &&
          (lead.stadtteil ?? "") !== stadtteilFilter
        )
          return false;
        if (datumFilter !== "alle") {
          if (datumFilter === "heute" && !isToday(lead.eingangszeit))
            return false;
          if (datumFilter === "gestern" && !isYesterday(lead.eingangszeit))
            return false;
          if (datumFilter === "woche" && !isThisWeek(lead.eingangszeit))
            return false;
        }
        if (q) {
          const haystack = `${lead.name} ${lead.anliegen}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
    );
  }, [leads, activeTab, kanalFilter, stadtteilFilter, datumFilter, query]);

  return (
    <div className={cn("flex h-full flex-col bg-white", className)}>
      <div className="flex-shrink-0 space-y-3 border-b border-slate-200 p-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Suche nach Name oder Anliegen..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 pl-9 text-sm"
            aria-label="Leads durchsuchen"
          />
        </div>

        <div
          role="tablist"
          aria-label="Lead-Status filtern"
          className="flex flex-wrap gap-1 rounded-md bg-slate-100 p-1"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab)}
                className={cn(
                  "flex-1 rounded px-2 py-1.5 text-xs font-bold transition-colors",
                  isActive
                    ? "bg-white text-sternhoff-primary shadow-sm"
                    : "text-slate-600 hover:text-sternhoff-primary"
                )}
              >
                {TAB_LABEL[tab]} ({counts[tab]})
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Select
            value={kanalFilter}
            onValueChange={(v) => setKanalFilter(v as KanalFilter)}
          >
            <SelectTrigger className="h-9 text-xs" aria-label="Kanal-Filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {KANAL_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-xs">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={stadtteilFilter}
            onValueChange={(v) => setStadtteilFilter(v)}
          >
            <SelectTrigger
              className="h-9 text-xs"
              aria-label="Stadtteil-Filter"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alle" className="text-xs">
                Alle Stadtteile
              </SelectItem>
              {stadtteile.map((s) => (
                <SelectItem key={s} value={s} className="text-xs">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={datumFilter}
            onValueChange={(v) => setDatumFilter(v as DatumFilter)}
          >
            <SelectTrigger className="h-9 text-xs" aria-label="Datums-Filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATUM_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-xs">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-sternhoff-bg-light p-6 text-center text-sm text-slate-500">
            Keine Leads passen zu deinen Filtern.
          </div>
        ) : (
          <ul className="space-y-2">
            {filtered.map((lead) => {
              const isSelected = selectedId === lead.id;
              return (
                <li key={lead.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(lead.id)}
                    className={cn(
                      "w-full rounded-lg border p-4 text-left transition-all",
                      "hover:border-sternhoff-primary hover:shadow-sm",
                      isSelected
                        ? "border-sternhoff-primary bg-sternhoff-primary/5"
                        : "border-slate-200 bg-white"
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <StatusBadge status={lead.status} />
                      <span className="text-slate-500">
                        {now ? relativeTime(lead.eingangszeit, now) : "…"}
                      </span>
                      <KanalIcon kanal={lead.kanal} />
                    </div>
                    <div
                      className={cn(
                        "mt-2 truncate font-bold text-sternhoff-text-dark",
                        lead.status === "neu" && "font-extrabold"
                      )}
                    >
                      {lead.name}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-sm text-slate-600">
                      {lead.anliegen}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-sternhoff-primary">
                        {lead.telefon}
                      </span>
                      {lead.stadtteil && (
                        <span className="text-slate-500">
                          {lead.stadtteil}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
