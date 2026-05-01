import { Bot, Calculator, FileText, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeadKanal } from "@/lib/dashboard/types";

const LABEL: Record<LeadKanal, string> = {
  formular: "Kontaktformular",
  chatbot: "Chatbot",
  whatsapp: "WhatsApp",
  "roi-rechner": "ROI-Rechner",
};

type Props = {
  kanal: LeadKanal;
  className?: string;
  withLabel?: boolean;
};

export function KanalIcon({ kanal, className, withLabel = false }: Props) {
  const icon = (() => {
    switch (kanal) {
      case "formular":
        return (
          <FileText
            className={cn("h-4 w-4 text-navy-500", className)}
            aria-hidden="true"
          />
        );
      case "chatbot":
        return (
          <Bot
            className={cn("h-4 w-4 text-navy-500", className)}
            aria-hidden="true"
          />
        );
      case "whatsapp":
        return (
          <MessageCircle
            className={cn("h-4 w-4 text-[#128C7E]", className)}
            aria-hidden="true"
          />
        );
      case "roi-rechner":
        return (
          <Calculator
            className={cn("h-4 w-4 text-solaris-700", className)}
            aria-hidden="true"
          />
        );
    }
  })();

  if (!withLabel) {
    return (
      <span
        className="inline-flex items-center"
        aria-label={`Kanal: ${LABEL[kanal]}`}
      >
        {icon}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
      {icon}
      <span>{LABEL[kanal]}</span>
    </span>
  );
}

export function getKanalLabel(kanal: LeadKanal): string {
  return LABEL[kanal];
}
