"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "@/components/brand/Logo";
import type { SessionUser } from "@/lib/types";
import { initials } from "@/lib/format";

const NAV = [
  { href: "/explore", label: "Explore 3D" },
  { href: "/destinations", label: "Destinations" },
  { href: "/stays", label: "Stays" },
  { href: "/experiences", label: "Experiences" },
  { href: "/plan", label: "Plan a Trip" },
];

const dashboardFor = (role: SessionUser["role"]) =>
  role === "ADMIN" ? "/dashboard/admin" : role === "PROVIDER" ? "/dashboard/provider" : "/dashboard";

export default function SiteHeader({
  user,
  overlay,
}: {
  user: SessionUser | null;
  overlay?: boolean;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const shouldOverlay = overlay ?? pathname === "/";
  const transparent = shouldOverlay && !scrolled && !open;

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          transparent
            ? "border-b border-white/[0.08] bg-black/20 backdrop-blur-md"
            : "border-b border-line/90 bg-white/90 backdrop-blur-xl",
        )}
        style={{ height: "var(--header-h)" }}
      >
        <div className="shell flex h-full items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Logo tone={transparent ? "light" : "dark"} />
            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "rounded-full px-3.5 py-2 text-[0.86rem] font-medium transition-colors",
                      transparent
                        ? active
                          ? "bg-white/15 text-white"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                        : active
                          ? "bg-sand text-ink"
                          : "text-muted hover:bg-sand/70 hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden items-center gap-2.5 lg:flex">
            {user ? (
              <Link
                href={dashboardFor(user.role)}
                className={clsx(
                  "flex items-center gap-2 rounded-full border py-1 pl-1 pr-3.5 text-[0.82rem] font-semibold transition",
                  transparent
                    ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
                    : "border-line bg-white text-ink hover:border-ink/25 hover:bg-cream-50",
                )}
              >
                <span
                  className={clsx(
                    "flex h-7 w-7 items-center justify-center rounded-full text-[0.68rem] font-bold",
                    transparent ? "bg-white text-ink" : "bg-ink text-white",
                  )}
                >
                  {initials(user.name)}
                </span>
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={clsx(
                    "rounded-full px-3.5 py-2 text-[0.85rem] font-medium transition-colors",
                    transparent ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-ink/80 hover:bg-sand hover:text-ink",
                  )}
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className={clsx(
                    "rounded-full px-4 py-2 text-[0.84rem] font-semibold transition",
                    transparent
                      ? "bg-white text-ink hover:bg-white/90"
                      : "bg-ink text-white hover:bg-ink/85",
                  )}
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={clsx(
              "relative z-50 flex h-10 w-10 items-center justify-center rounded-full border transition lg:hidden",
              open
                ? "border-line bg-white text-ink"
                : transparent
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-line bg-white text-ink",
            )}
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-3.5 w-4">
              <span
                className={clsx(
                  "absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-1.5 block h-[1.5px] w-4 bg-current transition-all duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={clsx(
          "fixed inset-0 z-40 flex flex-col bg-white px-6 pb-10 pt-[calc(var(--header-h)+1.5rem)] transition-all duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col divide-y divide-line border-y border-line">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between py-4 text-xl font-semibold tracking-tight text-ink"
            >
              {item.label}
              <span aria-hidden className="text-muted">→</span>
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          {user ? (
            <>
              <Link href={dashboardFor(user.role)} className="btn btn-primary">
                Go to dashboard
              </Link>
              <p className="text-center text-xs text-muted">
                Signed in as {user.name} · {user.email}
              </p>
            </>
          ) : (
            <>
              <Link href="/sign-up" className="btn btn-primary">
                Get started
              </Link>
              <Link href="/sign-in" className="btn btn-outline">
                Sign in
              </Link>
            </>
          )}
        </div>
        <p className="mt-auto pt-8 text-xs text-muted">
          Discover Ghana, then plan it — one place at a time.
        </p>
      </div>
    </>
  );
}
