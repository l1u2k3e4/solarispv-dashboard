import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/lib/dashboard/types";

const LABEL: Record<LeadStatus, string> = {
  neu: "Neu",
  "in-bearbeitung": "In Bearbeitung",
  abgeschlossen: "Abgeschlossen",
};

const STYLE: Record<LeadStatus, string> = {
  neu: "bg-blue-100 text-blue-800",
  "in-bearbeitung": "bg-orange-100 text-orange-800",
  abgeschlossen: "bg-slate-100 text-slate-600",
};

type Props = {
  status: LeadStatus;
  className?: string;
};

export function StatusBadge({ status, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wide",
        STYLE[status],
        className
      )}
    >
      {status === "neu" && (
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-green-500"
        />
      )}
      {status === "abgeschlossen" && (
        <Check className="h-3 w-3" aria-hidden="true" />
      )}
      <span>{LABEL[status]}</span>
    </span>
  );
}
