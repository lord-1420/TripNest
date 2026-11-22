import Link from "next/link";
import clsx from "clsx";

interface LogoProps {
  className?: string;
  tone?: "dark" | "light";
  showWordmark?: boolean;
  href?: string | null;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: 26, md: 32, lg: 40 };

/**
 * TripNest brand mark: a route ring with a nest cradle and a golden egg/dot.
 * The mark is intentionally simple so it works as a favicon and as a header lockup.
 */
export function LogoMark({ tone = "dark", size = 32 }: { tone?: "dark" | "light"; size?: number }) {
  const primary = tone === "light" ? "#F7F4EC" : "#173F35";
  const gold = tone === "light" ? "#E2C99A" : "#C99A45";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      role="img"
      aria-label="TripNest symbol — a nest cradling a golden egg"
      className="shrink-0"
      fill="none"
    >
      {/* egg */}
      <circle cx="17" cy="14.6" r="4.7" fill={gold} />
      {/* outer nest wall */}
      <path
        d="M4.4 16.4c2.5 7.3 7 11.2 12.6 11.2s10.1-3.9 12.6-11.2"
        stroke={primary}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* inner weave */}
      <path
        d="M9.4 18.3c1.8 4.2 4.5 6.4 7.6 6.4s5.8-2.2 7.6-6.4"
        stroke={gold}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

export default function Logo({
  className,
  tone = "dark",
  showWordmark = true,
  href = "/",
  size = "md",
}: LogoProps) {
  const content = (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} size={sizes[size]} />
      {showWordmark && (
        <span
          className={clsx(
            "font-display leading-none tracking-[-0.02em]",
            size === "lg" ? "text-[1.9rem]" : size === "sm" ? "text-[1.15rem]" : "text-[1.4rem]",
            tone === "light" ? "text-cream" : "text-forest",
          )}
        >
          Trip<span className={tone === "light" ? "text-gold-100" : "text-forest-500"}>Nest</span>
        </span>
      )}
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="TripNest home" className="inline-flex items-center">
      {content}
    </Link>
  );
}
