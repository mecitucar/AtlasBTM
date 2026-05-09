"use client";

export function RedLineFill() {
  return (
    <div className="w-full h-[3px] bg-atlas-charcoal/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-atlas-red" />
    </div>
  );
}
