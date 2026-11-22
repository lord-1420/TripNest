import Link from "next/link";
import Logo from "@/components/brand/Logo";

const columns = [
  {
    title: "Discover",
    links: [
      { href: "/destinations", label: "All destinations" },
      { href: "/destinations?category=beaches", label: "Beaches" },
      { href: "/destinations?category=heritage", label: "Heritage" },
      { href: "/experiences?hidden=1", label: "Hidden gems" },
      { href: "/explore", label: "Map explorer" },
    ],
  },
  {
    title: "Stay & plan",
    links: [
      { href: "/stays", label: "Find a stay" },
      { href: "/stays?type=HOSTEL", label: "Hostels" },
      { href: "/plan", label: "Plan a trip" },
      { href: "/dashboard/trips", label: "My trips" },
      { href: "/dashboard/saved", label: "Saved places" },
    ],
  },
  {
    title: "TripNest",
    links: [
      { href: "/about", label: "About TripNest" },
      { href: "/contact", label: "Contact" },
      { href: "/credits", label: "Photo credits" },
      { href: "/legal/terms", label: "Terms of use" },
      { href: "/legal/privacy", label: "Privacy" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-forest text-cream">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              A travel-discovery platform built around Ghana: find a place worth going to, understand
              it properly, and turn it into a plan you can actually follow.
            </p>
            <p className="mt-6 text-[0.7rem] uppercase tracking-[0.18em] text-cream/[0.45]">
              Kumasi · Accra · Ghana
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold-100/80">
                {col.title}
              </h2>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-cream/75 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/[0.15] pt-6 text-[0.72rem] text-cream/[0.55] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} TripNest. Discovery and planning for travel in Ghana.</p>
          <p className="max-w-xl md:text-right">
            Development build: destination, attraction and accommodation records are seed content
            awaiting editorial verification. Photography via Wikimedia Commons — see{" "}
            <Link href="/credits" className="underline decoration-cream/30 underline-offset-2 hover:text-cream">
              credits
            </Link>
            . TripNest does not take bookings or payments.
          </p>
        </div>
      </div>
    </footer>
  );
}
