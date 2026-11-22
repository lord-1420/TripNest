"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

/**
 * Sticky in-page contents menu for long editorial pages. Highlights the section
 * currently in view and scrolls horizontally on small screens.
 */
export default function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: [0, 0.2, 1] },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[var(--header-h)] z-30 border-b border-line bg-cream/95 backdrop-blur-sm"
    >
      <div className="shell">
        <ul className="no-scrollbar flex gap-1 overflow-x-auto py-2.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={clsx(
                  "inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition-colors",
                  active === item.id
                    ? "bg-forest text-cream"
                    : "text-muted hover:bg-cream-200 hover:text-forest",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
