"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown, Coffee, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import type { Lead, LeadStatus } from "@/lib/dashboard/types";
import {
  formatEingangszeit,
  formatEuro,
  formatKwp,
  formatYears,
} from "@/lib/dashboard/utils";
import { StatusBadge } from "./StatusBadge";
import { KanalIcon, getKanalLabel } from "./KanalIcon";
import { ActionButtons } from "./ActionButtons";
import { KIVorschlagCard } from "./KIVorschlagCard";

type Props = {
  lead: Lead | null;
  onStatusChange: (status: LeadStatus) => void;
  onNotizenChange: (notizen: string) => void;
  onDiscardKi: (vorschlagIndex: number) => void;
  onEditKi: (vorschlagIndex: number, text: string) => void;
  onSendKi: (text: string) => void;
  onBack?: () => void;
  showBack?: boolean;
  className?: string;
};

const STATUS_ORDER: LeadStatus[] = ["neu", "in-bearbeitung", "abgeschlossen"];
const STATUS_LABEL: Record<LeadStatus, string> = {
  neu: "Neu",
  "in-bearbeitung": "In Bearbeitung",
  abgeschlossen: "Abgeschlossen",
};

export function LeadDetail({
  lead,
  onStatusChange,
  onNotizenChange,
  onDiscardKi,
  onEditKi,
  onSendKi,
  onBack,
  showBack = false,
  className,
}: Props) {
  if (!lead) {
    return (
      <div
        className={cn(
          "flex h-full items-center justify-center bg-gray-50 p-8",
          className
        )}
      >
        <div className="max-w-sm rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <Coffee
            className="mx-auto h-10 w-10 text-navy-500"
            aria-hidden="true"
          />
          <h2 className="mt-4 text-lg font-bold text-foreground">
            Wähle einen Lead aus der Liste
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            …oder atme erstmal durch ☕
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-y-auto bg-gray-50",
        className
      )}
    >
      <DetailHeader
        lead={lead}
        showBack={showBack}
        onBack={onBack}
        onStatusChange={onStatusChange}
      />

      <div className="space-y-6 p-6">
        <AnliegenBlock lead={lead} />

        {lead.chatVerlauf && lead.chatVerlauf.length > 0 && (
          <ChatVerlaufBlock turns={lead.chatVerlauf} />
        )}

        {lead.pvBerechnung && (
          <PvBerechnungBlock pv={lead.pvBerechnung} />
        )}

        {lead.kiVorschlaege && lead.kiVorschlaege.length > 0 && (
          <section aria-labelledby="ki-heading" className="space-y-3">
            <h3
              id="ki-heading"
              className="text-sm font-bold uppercase tracking-wide text-gray-500"
            >
              KI-Antwort-Vorschläge
            </h3>
            <div className="space-y-3">
              {lead.kiVorschlaege.map((v, idx) => (
                <KIVorschlagCard
                  key={`${lead.id}-${idx}-${v.typ}`}
                  vorschlag={v}
                  index={idx}
                  onSend={onSendKi}
                  onDiscard={() => onDiscardKi(idx)}
                  onEdit={(text) => onEditKi(idx, text)}
                />
              ))}
            </div>
          </section>
        )}

        <NotizenBlock
          leadId={lead.id}
          initialNotizen={lead.notizen ?? ""}
          onSave={onNotizenChange}
        />
      </div>
    </div>
  );
}

function DetailHeader({
  lead,
  showBack,
  onBack,
  onStatusChange,
}: {
  lead: Lead;
  showBack: boolean;
  onBack?: () => void;
  onStatusChange: (status: LeadStatus) => void;
}) {
  return (
    <header className="sticky top-0 z-10 flex-shrink-0 border-b border-slate-200 bg-white px-6 py-4">
      {showBack && onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-navy-500 hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Zurück zur Liste
        </button>
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-xl font-bold text-foreground">
              {lead.name}
            </h2>
            <StatusBadge status={lead.status} />
            <KanalIcon kanal={lead.kanal} withLabel />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Eingegangen am {formatEingangszeit(lead.eingangszeit)}
            {lead.stadtteil && <> · Moers-{lead.stadtteil}</>}
            {lead.adresse && <> · {lead.adresse}</>}
          </p>
        </div>

        <ActionButtons lead={lead} />
      </div>

      <div
        role="group"
        aria-label="Status setzen"
        className="mt-4 flex flex-wrap gap-2"
      >
        {STATUS_ORDER.map((s) => {
          const isActive = lead.status === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => onStatusChange(s)}
              aria-pressed={isActive}
              className={cn(
                "h-9 rounded-md px-3 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "bg-navy-500 text-white"
                  : "border border-slate-300 text-slate-700 hover:border-navy-500 hover:text-navy-500"
              )}
            >
              {STATUS_LABEL[s]}
            </button>
          );
        })}
      </div>
    </header>
  );
}

function AnliegenBlock({ lead }: { lead: Lead }) {
  return (
    <section aria-labelledby="anliegen-heading">
      <h3
        id="anliegen-heading"
        className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-500"
      >
        Anliegen ({getKanalLabel(lead.kanal)})
      </h3>
      <blockquote className="rounded-md border-l-4 border-navy-500 bg-gray-50 p-4 text-sm leading-relaxed text-foreground shadow-sm">
        „{lead.anliegen}“
      </blockquote>
      <dl className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
        <div>
          <dt className="font-bold uppercase tracking-wide text-gray-500">
            Telefon
          </dt>
          <dd className="text-sm text-navy-500">{lead.telefon}</dd>
        </div>
        {lead.email && (
          <div className="min-w-0">
            <dt className="font-bold uppercase tracking-wide text-gray-500">
              E-Mail
            </dt>
            <dd className="truncate text-sm text-navy-500">
              {lead.email}
            </dd>
          </div>
        )}
        {lead.stadtteil && (
          <div>
            <dt className="font-bold uppercase tracking-wide text-gray-500">
              Stadtteil
            </dt>
            <dd className="text-sm text-foreground">
              Moers-{lead.stadtteil}
            </dd>
          </div>
        )}
      </dl>
    </section>
  );
}

function ChatVerlaufBlock({
  turns,
}: {
  turns: { user: string; bot: string }[];
}) {
  return (
    <details className="group rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold text-foreground">
        <MessageSquare
          className="h-4 w-4 text-navy-500"
          aria-hidden="true"
        />
        <span>Chat-Verlauf ({turns.length} Nachrichten-Paare)</span>
        <ChevronDown
          className="ml-auto h-4 w-4 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <ol className="mt-4 space-y-3">
        {turns.map((turn, idx) => (
          <li key={idx} className="space-y-2">
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-navy-500 px-3 py-2 text-sm leading-relaxed text-white">
                {turn.user}
              </p>
            </div>
            <div className="flex justify-start">
              <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-gray-50 px-3 py-2 text-sm leading-relaxed text-foreground">
                {turn.bot}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </details>
  );
}

function PvBerechnungBlock({
  pv,
}: {
  pv: NonNullable<Lead["pvBerechnung"]>;
}) {
  const tiles = [
    { label: "Anlagengröße", value: formatKwp(pv.kwp) },
    { label: "Investition", value: formatEuro(pv.investition) },
    { label: "Ersparnis / Jahr", value: formatEuro(pv.ersparnisJahr) },
    { label: "Amortisation", value: formatYears(pv.amortisationJahre) },
  ];

  return (
    <section aria-labelledby="pv-heading">
      <h3
        id="pv-heading"
        className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-500"
      >
        PV-Berechnung aus dem ROI-Rechner
      </h3>
      <div className="grid grid-cols-2 gap-2 rounded-md border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-4">
        {tiles.map((t) => (
          <div
            key={t.label}
            className="rounded-md bg-gray-50 p-3 text-center"
          >
            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
              {t.label}
            </div>
            <div className="mt-1 text-base font-bold text-navy-500">
              {t.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NotizenBlock({
  leadId,
  initialNotizen,
  onSave,
}: {
  leadId: string;
  initialNotizen: string;
  onSave: (text: string) => void;
}) {
  const [value, setValue] = useState(initialNotizen);

  // Sync wenn Lead wechselt
  useEffect(() => {
    setValue(initialNotizen);
  }, [leadId, initialNotizen]);

  function handleBlur() {
    if (value !== initialNotizen) onSave(value);
  }

  return (
    <section aria-labelledby="notizen-heading">
      <h3
        id="notizen-heading"
        className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-500"
      >
        Notizen
      </h3>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        placeholder="Interne Notizen, Termin-Vereinbarungen, Rückruf-Hinweise…"
        rows={4}
        className="text-sm"
      />
      <p className="mt-1 text-xs text-slate-500">
        Wird automatisch im Browser gespeichert (Demo).
      </p>
    </section>
  );
}
