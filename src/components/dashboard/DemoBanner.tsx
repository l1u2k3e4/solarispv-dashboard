import { Info } from "lucide-react";

export function DemoBanner() {
  return (
    <div
      role="note"
      className="flex items-center gap-2 border-b border-slate-200 bg-sternhoff-bg-light px-6 py-2 text-xs text-sternhoff-gray"
    >
      <Info className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      <span>
        Demo-Modus · 10 Mock-Leads · Aktionen wie „Senden“ oder
        Status-Änderungen werden nur im Browser gespeichert.
      </span>
    </div>
  );
}
