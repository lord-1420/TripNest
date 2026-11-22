"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { toggleAttractionSave, toggleDestinationSave } from "@/lib/actions/saved";

/**
 * Save / unsave a destination or attraction. Optimistic, with a real server
 * action behind it; unauthenticated visitors are routed to sign-in by the action.
 */
export default function SaveButton({
  kind,
  id,
  initialSaved,
  nextPath,
  tone = "light",
  label = "Save",
  className,
}: {
  kind: "destination" | "attraction";
  id: number;
  initialSaved: boolean;
  nextPath: string;
  tone?: "light" | "dark";
  label?: string;
  className?: string;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onClick = () => {
    const next = !saved;
    setSaved(next);
    setError(null);
    startTransition(async () => {
      try {
        const res =
          kind === "destination"
            ? await toggleDestinationSave(id, nextPath)
            : await toggleAttractionSave(id, nextPath);
        if (typeof res.saved === "boolean") setSaved(res.saved);
        router.refresh();
      } catch {
        setSaved(!next);
        setError("Could not save that just now.");
      }
    });
  };

  return (
    <div className={clsx("inline-flex flex-col items-start gap-1", className)}>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        aria-pressed={saved}
        className={clsx(
          "btn btn-sm gap-2",
          saved
            ? "border-forest bg-forest text-cream hover:bg-forest-500"
            : tone === "dark"
              ? "btn-ghost-light"
              : "btn-outline",
        )}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
          <path d="M6 3.8h12a1 1 0 0 1 1 1v15.4l-7-4.2-7 4.2V4.8a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
        </svg>
        {saved ? "Saved" : label}
      </button>
      {error && <span className="text-[0.7rem] text-[#8C3524]">{error}</span>}
    </div>
  );
}
