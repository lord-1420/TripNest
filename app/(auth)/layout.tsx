import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="min-h-screen bg-cream">
      {children}
      <Link
        href="/"
        className="fixed bottom-4 left-4 z-40 rounded-full border border-line bg-cream/90 px-4 py-2 text-[0.78rem] font-semibold text-forest shadow-soft backdrop-blur transition hover:border-forest/30 lg:hidden"
      >
        ← Back to TripNest
      </Link>
    </main>
  );
}
