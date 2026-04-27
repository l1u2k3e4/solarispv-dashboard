import { Phone, MessageCircle } from "lucide-react";
import { kontakt } from "@/lib/demo-data";

export function StickyMobileFooter() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-2 border-t border-border bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.06)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={kontakt.hauptsitz.telLink}
        className="flex h-14 items-center justify-center gap-2 bg-sternhoff-primary text-sm font-bold text-white transition-colors hover:bg-sternhoff-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
        aria-label={`Anrufen ${kontakt.hauptsitz.tel}`}
      >
        <Phone className="h-4 w-4" />
        Anrufen
      </a>
      <a
        href={kontakt.whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 items-center justify-center gap-2 bg-[#128C7E] text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
        aria-label="WhatsApp schreiben"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
    </div>
  );
}
