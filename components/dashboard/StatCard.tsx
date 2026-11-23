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
    <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.1em] text-muted">{label}</p>
        {icon && <span className="text-muted">{icon}</span>}
      </div>
      <p className="mt-2 font-sans text-[1.75rem] font-bold leading-none tracking-[-0.03em] text-ink">{value}</p>
      {hint && <p className="mt-1.5 text-[0.76rem] leading-snug text-muted">{hint}</p>}
    </div>
  );
}
