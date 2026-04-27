"use client";

import { useState } from "react";
import { Bot, Check, Pencil, Send, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import type { KiVorschlag, KiVorschlagTyp } from "@/lib/dashboard/types";

const TYP_LABEL: Record<KiVorschlagTyp, string> = {
  "kurz-mail": "Kurz-Mail",
  whatsapp: "WhatsApp-Antwort",
  "rueckruf-best": "Rückruf-Vorschlag",
};

const TYP_STYLE: Record<KiVorschlagTyp, string> = {
  "kurz-mail": "bg-sternhoff-primary/10 text-sternhoff-primary",
  whatsapp: "bg-[#128C7E]/10 text-[#128C7E]",
  "rueckruf-best": "bg-sternhoff-accent/10 text-sternhoff-accent",
};

type Props = {
  vorschlag: KiVorschlag;
  index: number;
  onSend: (text: string) => void;
  onDiscard: () => void;
  onEdit: (text: string) => void;
};

export function KIVorschlagCard({
  vorschlag,
  index,
  onSend,
  onDiscard,
  onEdit,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(vorschlag.text);

  const confidencePct = Math.round(vorschlag.confidence * 100);

  function handleSave() {
    onEdit(draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(vorschlag.text);
    setEditing(false);
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sternhoff-primary/10 text-sternhoff-primary">
            <Bot className="h-4 w-4" aria-hidden="true" />
          </span>
          <span
            className={cn(
              "inline-flex rounded-full px-2 py-0.5 text-xs font-bold",
              TYP_STYLE[vorschlag.typ]
            )}
          >
            KI-Vorschlag {index + 1} · {TYP_LABEL[vorschlag.typ]}
          </span>
        </div>
        <span
          className="text-xs font-semibold text-slate-500"
          aria-label={`Trefferwahrscheinlichkeit: ${confidencePct} Prozent`}
        >
          {confidencePct}% Trefferwahrscheinlichkeit
        </span>
      </header>

      {editing ? (
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={6}
          className="text-sm"
          aria-label="KI-Vorschlag bearbeiten"
        />
      ) : (
        <p className="whitespace-pre-line text-sm leading-relaxed text-sternhoff-text-dark">
          {vorschlag.text}
        </p>
      )}

      <footer className="mt-4 flex flex-wrap gap-2">
        {editing ? (
          <>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-sternhoff-primary px-3 text-xs font-bold text-white transition-colors hover:bg-sternhoff-primary-dark"
            >
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Speichern
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-slate-300 px-3 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Abbrechen
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onSend(vorschlag.text)}
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-sternhoff-primary px-3 text-xs font-bold text-white transition-colors hover:bg-sternhoff-primary-dark"
            >
              <Send className="h-3.5 w-3.5" aria-hidden="true" />
              Senden
            </button>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-slate-300 px-3 text-xs font-bold text-slate-700 transition-colors hover:border-sternhoff-primary hover:text-sternhoff-primary"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              Editieren
            </button>
            <button
              type="button"
              onClick={onDiscard}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-slate-300 px-3 text-xs font-bold text-slate-500 transition-colors hover:border-sternhoff-accent hover:text-sternhoff-accent"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Verwerfen
            </button>
          </>
        )}
      </footer>
    </article>
  );
}
