import Link from "next/link";
import clsx from "clsx";

export default function Pagination({
  page,
  pageCount,
  basePath,
  params,
}: {
  page: number;
  pageCount: number;
  basePath: string;
  params: Record<string, string | undefined>;
}) {
  if (pageCount <= 1) return null;

  const href = (p: number) => {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v && k !== "page") search.set(k, v);
    });
    if (p > 1) search.set("page", String(p));
    const qs = search.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pageCount || Math.abs(p - page) <= 1,
  );

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-6">
      <Link
        href={href(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={clsx(
          "text-sm font-semibold",
          page === 1 ? "pointer-events-none text-muted/50" : "text-forest hover:text-forest-500",
        )}
      >
        ← Previous
      </Link>
      <ul className="flex items-center gap-1.5">
        {pages.map((p, i) => (
          <li key={p} className="flex items-center gap-1.5">
            {i > 0 && p - pages[i - 1] > 1 && <span className="px-1 text-muted">…</span>}
            <Link
              href={href(p)}
              aria-current={p === page ? "page" : undefined}
              className={clsx(
                "flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-sm font-semibold transition",
                p === page ? "bg-forest text-white" : "text-forest hover:bg-forest/[0.08]",
              )}
            >
              {p}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={href(Math.min(pageCount, page + 1))}
        aria-disabled={page === pageCount}
        className={clsx(
          "text-sm font-semibold",
          page === pageCount ? "pointer-events-none text-muted/50" : "text-forest hover:text-forest-500",
        )}
      >
        Next →
      </Link>
    </nav>
  );
}
