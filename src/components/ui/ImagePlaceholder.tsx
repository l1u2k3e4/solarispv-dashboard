import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

type AspectRatio = "16:9" | "4:5" | "1:1";

const ratioClasses: Record<AspectRatio, string> = {
  "16:9": "aspect-[16/9]",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
};

type Props = {
  label: string;
  aspectRatio?: AspectRatio;
  variant?: "subtle" | "branded";
  className?: string;
};

export function ImagePlaceholder({
  label,
  aspectRatio = "16:9",
  variant = "subtle",
  className,
}: Props) {
  const bg =
    variant === "branded"
      ? "bg-solaris-50 border-solaris-200 text-solaris-700"
      : "bg-gray-50 border-border text-muted-foreground";

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-lg border-2 border-dashed",
        ratioClasses[aspectRatio],
        bg,
        className
      )}
      role="img"
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <Camera className="h-8 w-8 opacity-60" aria-hidden="true" />
        <span className="text-sm font-bold">{label}</span>
      </div>
    </div>
  );
}
