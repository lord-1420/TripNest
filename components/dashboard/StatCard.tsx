import type { ReactNode } from "react";

export default function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="border border-line bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
        {icon && <span className="text-forest/40">{icon}</span>}
      </div>
      <p className="mt-2 font-display text-[1.8rem] leading-none text-forest">{value}</p>
      {hint && <p className="mt-1.5 text-[0.74rem] leading-snug text-muted">{hint}</p>}
    </div>
  );
}
