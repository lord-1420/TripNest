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
      { href: "/explore", label: "3D Map explorer" },
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
    <footer className="border-t border-line bg-cream-50 text-ink">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.45fr_repeat(3,1fr)]">
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-xs text-[0.88rem] leading-relaxed text-muted">
              A minimal travel-discovery and trip-planning platform built around Ghana. Discover places,
              compare local stays in cedis, and build your itinerary.
            </p>
            <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted/80">
              Kumasi · Accra · Ghana
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-3.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink">
                {col.title}
              </h2>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-[0.88rem] text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[0.74rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} TripNest. Discovery and planning for travel in Ghana.</p>
          <p className="max-w-xl md:text-right">
            Photography via Wikimedia Commons — see{" "}
            <Link href="/credits" className="text-ink underline decoration-line underline-offset-2 hover:decoration-ink">
              credits
            </Link>
            . TripNest does not process online bookings or payments.
          </p>
        </div>
      </div>
    </footer>
  );
}
