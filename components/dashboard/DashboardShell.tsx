"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import Logo, { LogoMark } from "@/components/brand/Logo";
import { initials } from "@/lib/format";
import { signOutAction } from "@/lib/actions/auth";
import type { SessionUser } from "@/lib/types";

const NAV: Record<string, { href: string; label: string; icon: string }[]> = {
  TRAVELLER: [
    { href: "/dashboard", label: "Overview", icon: "M3 10.5 12 3l9 7.5V21H3z" },
    { href: "/dashboard/saved", label: "Saved places", icon: "M6 3.8h12a1 1 0 0 1 1 1v15.4l-7-4.2-7 4.2V4.8a1 1 0 0 1 1-1Z" },
    { href: "/dashboard/trips", label: "My trips", icon: "M4 7h16v13H4zM8 7V4h8v3" },
    { href: "/destinations", label: "Discover", icon: "M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" },
  ],
  PROVIDER: [
    { href: "/dashboard/provider", label: "Listings", icon: "M3 10.5 12 3l9 7.5V21H3z" },
    { href: "/dashboard/provider/listings/new", label: "Add a property", icon: "M12 5v14M5 12h14" },
    { href: "/destinations", label: "Browse destinations", icon: "M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" },
  ],
  ADMIN: [
    { href: "/dashboard/admin", label: "Overview", icon: "M3 10.5 12 3l9 7.5V21H3z" },
    { href: "/dashboard/admin/destinations", label: "Destinations", icon: "M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" },
    { href: "/dashboard/admin/attractions", label: "Attractions", icon: "M4 18 9 6l5 12M6.5 13h5M14 18l3.5-8L21 18" },
    { href: "/dashboard/admin/accommodations", label: "Accommodation queue", icon: "M3 10.5 12 3l9 7.5V21H3z" },
    { href: "/dashboard/admin/users", label: "Users", icon: "M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20c.6-3.4 2.9-5 5.5-5s4.9 1.6 5.5 5M16 8.5a2.8 2.8 0 1 0 0-5.6M17 20c-.2-2.4-1-4-2.2-5" },
  ],
};

export default function DashboardShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = NAV[user.role] ?? NAV.TRAVELLER;

  const nav = (
    <nav aria-label="Dashboard" className="flex flex-col gap-1">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" && item.href !== "/dashboard/admin" && pathname.startsWith(`${item.href}/`));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={clsx(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.86rem] font-medium transition-colors",
              active ? "bg-ink text-white" : "text-muted hover:bg-sand hover:text-ink",
            )}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="shrink-0">
              <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-line bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[0.7rem] font-bold text-white">
            {initials(user.name)}
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="dash-nav"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink"
          >
            <span className="sr-only">Toggle dashboard menu</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[92rem]">
        {/* Sidebar */}
        <aside
          id="dash-nav"
          className={clsx(
            "fixed inset-y-0 left-0 z-40 w-[260px] shrink-0 border-r border-line bg-white px-4 py-6 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="hidden px-2 md:block">
            <Logo />
          </div>
          <div className="mb-6 mt-6 flex items-center gap-3 rounded-xl border border-line bg-cream-50 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-[0.72rem] font-bold text-white">
              {initials(user.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.84rem] font-semibold text-ink">{user.name}</p>
              <p className="truncate font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted">
                {user.role}
              </p>
            </div>
          </div>

          {nav}

          <div className="mt-6 border-t border-line pt-4">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-[0.82rem] text-muted transition hover:bg-sand hover:text-ink"
            >
              ← Back to site
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[0.82rem] text-muted transition hover:bg-sand hover:text-ink"
              >
                Sign out
              </button>
            </form>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
          />
        )}

        <main id="main" className="min-w-0 flex-1 px-4 py-8 md:px-8 md:py-10">
          {children}
        </main>
      </div>

      {/* Mobile home shortcut */}
      <div className="fixed bottom-3 right-3 z-20 md:hidden">
        <Link
          href="/"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white shadow-float"
          aria-label="TripNest home"
        >
          <LogoMark tone="light" size={20} />
        </Link>
      </div>
    </div>
  );
}
