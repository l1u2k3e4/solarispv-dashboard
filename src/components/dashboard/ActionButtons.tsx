import { Mail, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lead } from "@/lib/dashboard/types";
import {
  buildMailLink,
  buildTelLink,
  buildWhatsAppLink,
} from "@/lib/dashboard/utils";

type Props = {
  lead: Lead;
  className?: string;
};

const baseBtn =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sternhoff-primary focus-visible:ring-offset-2";

export function ActionButtons({ lead, className }: Props) {
  const tel = buildTelLink(lead.telefon);
  const mail = buildMailLink(lead.email, lead.anliegen);
  const wa = buildWhatsAppLink(lead.telefon, lead.name);

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <a
        href={tel}
        className={cn(
          baseBtn,
          "bg-sternhoff-primary text-white hover:bg-sternhoff-primary-dark"
        )}
        aria-label={`${lead.name} anrufen`}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        <span>Anrufen</span>
      </a>

      {mail ? (
        <a
          href={mail}
          className={cn(
            baseBtn,
            "border border-sternhoff-primary text-sternhoff-primary hover:bg-sternhoff-primary hover:text-white"
          )}
          aria-label={`Mail an ${lead.name} schreiben`}
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          <span>Mail</span>
        </a>
      ) : (
        <button
          type="button"
          disabled
          aria-label="Keine E-Mail-Adresse hinterlegt"
          className={cn(
            baseBtn,
            "cursor-not-allowed border border-slate-200 text-slate-400"
          )}
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          <span>Mail</span>
        </button>
      )}

      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className={cn(
          baseBtn,
          "border border-[#128C7E] text-[#128C7E] hover:bg-[#128C7E] hover:text-white"
        )}
        aria-label={`WhatsApp-Nachricht an ${lead.name}`}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
