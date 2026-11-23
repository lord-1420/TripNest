import Link from "next/link";
import clsx from "clsx";

interface LogoProps {
  className?: string;
  tone?: "dark" | "light";
  showWordmark?: boolean;
  href?: string | null;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: 24, md: 28, lg: 36 };

export function LogoMark({ tone = "dark", size = 28 }: { tone?: "dark" | "light"; size?: number }) {
  const primary = tone === "light" ? "#FFFFFF" : "#111111";
  const accent = tone === "light" ? "#F6E7C8" : "#D49B38";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      role="img"
      aria-label="TripNest mark"
      className="shrink-0"
      fill="none"
    >
      <circle cx="17" cy="14.5" r="4.5" fill={accent} />
      <path
        d="M4.6 16.4c2.4 7.1 6.9 11 12.4 11s10-3.9 12.4-11"
        stroke={primary}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M9.6 18.3c1.7 4 4.3 6.2 7.4 6.2s5.7-2.2 7.4-6.2"
        stroke={accent}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.9"
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
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <LogoMark tone={tone} size={sizes[size]} />
      {showWordmark && (
        <span
          className={clsx(
            "font-sans font-bold leading-none tracking-[-0.04em]",
            size === "lg" ? "text-[1.6rem]" : size === "sm" ? "text-[1.05rem]" : "text-[1.2rem]",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          TripNest
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
