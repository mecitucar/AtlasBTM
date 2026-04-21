"use client";

type DividerVariant = "angle-down" | "angle-up" | "red-strip" | "dots";

interface Props {
  variant?: DividerVariant;
  fromColor?: string;
  toColor?: string;
}

export function SectionDivider({ variant = "angle-down", fromColor = "#FAFAFA", toColor = "#FFFFFF" }: Props) {
  if (variant === "red-strip") {
    return (
      <div className="relative z-10 flex items-center justify-center py-0">
        <div className="w-full h-[4px] bg-atlas-red" />
        <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-atlas-red flex items-center justify-center">
          <span className="font-[var(--font-heading)] font-black text-white text-lg">A</span>
        </div>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="flex items-center justify-center gap-2 py-8" style={{ backgroundColor: toColor }}>
        <div className="w-2 h-2 bg-atlas-red" />
        <div className="w-12 h-[2px] bg-atlas-red" />
        <div className="w-2 h-2 bg-atlas-red" />
      </div>
    );
  }

  if (variant === "angle-up") {
    return (
      <div className="relative h-16 lg:h-24 -mt-1" style={{ backgroundColor: toColor }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <polygon fill={fromColor} points="0,100 1440,100 1440,0" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative h-16 lg:h-24 -mb-1" style={{ backgroundColor: fromColor }}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute top-0 w-full h-full">
        <polygon fill={toColor} points="0,100 1440,0 1440,100" />
      </svg>
    </div>
  );
}
