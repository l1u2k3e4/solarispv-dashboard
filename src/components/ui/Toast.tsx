"use client";

import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  message: string;
  onClose: () => void;
  variant?: "success" | "info";
};

export function Toast({ open, message, onClose, variant = "success" }: Props) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-lg border bg-white px-5 py-4 shadow-xl",
        "lg:bottom-8",
        "max-w-[90vw] sm:max-w-md"
      )}
    >
      <div className="flex items-start gap-3">
        <CheckCircle2
          className={cn(
            "h-6 w-6 flex-shrink-0",
            variant === "success" && "text-solaris-700"
          )}
          aria-hidden="true"
        />
        <p className="flex-1 text-sm leading-relaxed text-foreground">
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Hinweis schließen"
          className="flex-shrink-0 rounded p-1 text-gray-500 transition-colors hover:bg-gray-50"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
