"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export type RoofSizeId = "small" | "medium" | "large" | "xlarge";

export type RoofSize = {
  id: RoofSizeId;
  label: string;
  exampleType: string;
  imageSrc: string;
  squareMeters: { min: number; max: number; default: number };
  estimatedKwp: { min: number; max: number };
};

export const ROOF_SIZES: RoofSize[] = [
  {
    id: "small",
    label: "Klein",
    exampleType: "Reihenhaus",
    imageSrc: "/images/calculator/roof-small.jpg",
    squareMeters: { min: 25, max: 35, default: 30 },
    estimatedKwp: { min: 5, max: 7 },
  },
  {
    id: "medium",
    label: "Mittel",
    exampleType: "Einfamilienhaus",
    imageSrc: "/images/calculator/roof-medium.jpg",
    squareMeters: { min: 40, max: 60, default: 50 },
    estimatedKwp: { min: 8, max: 10 },
  },
  {
    id: "large",
    label: "Groß",
    exampleType: "Großes EFH",
    imageSrc: "/images/calculator/roof-large.jpg",
    squareMeters: { min: 70, max: 100, default: 85 },
    estimatedKwp: { min: 12, max: 18 },
  },
  {
    id: "xlarge",
    label: "Sehr groß",
    exampleType: "Doppelhaus / MFH",
    imageSrc: "/images/calculator/roof-xlarge.jpg",
    squareMeters: { min: 110, max: 150, default: 130 },
    estimatedKwp: { min: 20, max: 27 },
  },
];

type Props = {
  value?: RoofSizeId;
  onChange: (size: RoofSize) => void;
};

export function RoofSizePicker({ value, onChange }: Props) {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 lg:grid-cols-2 lg:gap-6">
      {ROOF_SIZES.map((size) => {
        const isSelected = value === size.id;
        return (
          <button
            key={size.id}
            type="button"
            onClick={() => onChange(size)}
            aria-pressed={isSelected}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-xl border-2 bg-white text-left transition-all",
              "hover:-translate-y-0.5 hover:border-solaris-500 hover:shadow-md",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              isSelected
                ? "border-solaris-500 bg-solaris-50 shadow-md"
                : "border-slate-200",
            )}
          >
            {isSelected && (
              <div className="absolute right-2 top-2 z-10 rounded-full bg-primary p-1 text-primary-foreground">
                <Check className="h-4 w-4" aria-hidden="true" />
              </div>
            )}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={size.imageSrc}
                alt={`Beispiel ${size.exampleType} mit ca. ${size.squareMeters.default} m² Dachfläche`}
                fill
                quality={75}
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-3">
              <div className="text-sm font-bold text-foreground">
                {size.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {size.exampleType}
              </div>
              <div className="mt-2 text-xs">
                <span className="font-medium text-foreground">
                  ~{size.squareMeters.min}–{size.squareMeters.max} m²
                </span>
                <span className="text-muted-foreground"> · </span>
                <span className="font-medium text-solaris-700">
                  ~{size.estimatedKwp.min}–{size.estimatedKwp.max} kWp
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
