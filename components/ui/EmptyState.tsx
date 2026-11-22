import type { ReactNode } from "react";
import { LogoMark } from "@/components/brand/Logo";

export default function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-line bg-white/60 px-6 py-16 text-center">
      <div className="mb-4 opacity-70">{icon ?? <LogoMark size={30} />}</div>
      <h3 className="font-display text-xl text-forest">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
