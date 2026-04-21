"use client";

export function LogoWatermark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none select-none opacity-[0.03] ${className}`}
      aria-hidden="true"
    >
      <span className="font-[var(--font-heading)] font-black text-[400px] lg:text-[600px] text-current leading-none block">
        A
      </span>
    </div>
  );
}
