"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "@/components/brand/Logo";
import type { SessionUser } from "@/lib/types";
import { initials } from "@/lib/format";

const NAV = [
  { href: "/explore", label: "Explore" },
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
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
          transparent
            ? "border-b border-transparent bg-gradient-to-b from-ink/[0.45] via-ink/[0.15] to-transparent"
            : "border-b border-line bg-cream/95 backdrop-blur-md supports-[backdrop-filter]:bg-cream/[0.85]",
        )}
        style={{ height: "var(--header-h)" }}
      >
        <div className="shell flex h-full items-center justify-between gap-6">
          <div className="flex items-center gap-10">
            <Logo tone={transparent ? "light" : "dark"} />
            <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
              {NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "relative py-2 text-[0.875rem] font-medium transition-colors",
                      transparent ? "text-cream/90 hover:text-white" : "text-ink/80 hover:text-forest",
                      active && (transparent ? "text-white" : "text-forest"),
                    )}
                  >
                    {item.label}
                    <span
                      className={clsx(
                        "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300",
                        transparent ? "bg-gold" : "bg-forest",
                        active && "scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <>
                <Link
                  href={dashboardFor(user.role)}
                  className={clsx(
                    "flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-3.5 text-[0.82rem] font-semibold transition",
                    transparent
                      ? "border-cream/40 text-cream hover:bg-white/10"
                      : "border-line text-forest hover:border-forest/30 hover:bg-white",
                  )}
                >
                  <span
                    className={clsx(
                      "flex h-7 w-7 items-center justify-center rounded-full text-[0.68rem] font-bold",
                      transparent ? "bg-cream text-forest" : "bg-forest text-cream",
                    )}
                  >
                    {initials(user.name)}
                  </span>
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={clsx(
                    "px-3 py-2 text-[0.875rem] font-semibold transition-colors",
                    transparent ? "text-cream hover:text-white" : "text-forest hover:text-forest-500",
                  )}
                >
                  Sign In
                </Link>
                <Link href="/sign-up" className={clsx("btn btn-sm", transparent ? "btn-gold" : "btn-primary")}>
                  Get Started
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
              "relative z-50 flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden",
              open
                ? "border-forest/20 bg-white text-forest"
                : transparent
                  ? "border-cream/40 text-cream"
                  : "border-line bg-white/70 text-forest",
            )}
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-3.5 w-5">
              <span
                className={clsx(
                  "absolute left-0 block h-[1.5px] w-5 bg-current transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-1.5 block h-[1.5px] w-5 bg-current transition-all duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 block h-[1.5px] w-5 bg-current transition-all duration-300",
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
          "fixed inset-0 z-40 flex flex-col bg-cream px-6 pb-10 pt-[calc(var(--header-h)+1.5rem)] transition-all duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col divide-y divide-line border-y border-line">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between py-4 font-display text-2xl text-forest"
            >
              {item.label}
              <span aria-hidden className="text-gold">→</span>
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
          Discovering Ghana, then planning it — one place at a time.
        </p>
      </div>
    </>
  );
}
