"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

/**
 * Preparation checklist. Progress is stored per destination in localStorage so a
 * traveller can tick things off without creating an account.
 */
export default function Checklist({ slug, items }: { slug: string; items: { id: number; label: string }[] }) {
  const storageKey = `tripnest:checklist:${slug}`;
  const [checked, setChecked] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, loaded, storageKey]);

  const toggle = (id: number) =>
    setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div>
      <ul className="space-y-0">
        {items.map((item) => {
          const isChecked = checked.includes(item.id);
          return (
            <li key={item.id} className="border-b border-line last:border-0">
              <label className="flex cursor-pointer items-start gap-3 py-2.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item.id)}
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-forest/35 checked:border-forest checked:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  style={
                    isChecked
                      ? {
                          backgroundImage:
                            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.4'><path d='M3.5 8.5l3 3 6-6.5'/></svg>\")",
                          backgroundSize: "12px",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }
                      : undefined
                  }
                />
                <span
                  className={clsx(
                    "text-[0.88rem] leading-snug transition-colors",
                    isChecked ? "text-muted line-through" : "text-ink",
                  )}
                >
                  {item.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[0.7rem] text-muted" aria-live="polite">
        {checked.length} of {items.length} packed
      </p>
    </div>
  );
}
