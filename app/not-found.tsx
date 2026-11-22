import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <LogoMark size={40} />
      <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted">404 — off the trail</p>
      <h1 className="mt-3 display text-[clamp(2rem,5vw,3.4rem)] text-forest">
        This path doesn&apos;t go anywhere.
      </h1>
      <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
        The page you were looking for has moved or never existed. The rest of Ghana is still here.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/destinations" className="btn btn-primary">Explore destinations</Link>
        <Link href="/" className="btn btn-outline">Back to home</Link>
      </div>
    </main>
  );
}
