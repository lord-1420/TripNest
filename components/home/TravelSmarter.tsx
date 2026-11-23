import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const MODULES = [
  {
    title: "Best times to visit",
    body: "Dry season runs roughly November to March in the south, with heavier rains May–July. The north is hottest before the rains arrive.",
    link: { href: "/destinations?category=nature", label: "Seasonal destinations" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Getting around",
    body: "Intercity buses and trotros cover Ghana affordably. For national parks and remote villages, hiring a driver for the day is usually best.",
    link: { href: "/explore", label: "Open 3D map" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
        <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Money & connectivity",
    body: "Mobile Money (MoMo) is everywhere and cards work in hotels and larger spots. Carry cash cedis for markets and local transport.",
    link: { href: "/about#practical", label: "Practical guide" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18M7 15h3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Health & preparation",
    body: "Check malaria guidance for your regions, stick to bottled or filtered water, and pack basic rehydration salts and sunscreen.",
    link: { href: "/destinations", label: "Explore destinations" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
        <path d="M12 3.5 20 7v5.5c0 4.4-3.3 7.4-8 8.9-4.7-1.5-8-4.5-8-8.9V7l8-3.5Z" strokeLinejoin="round" />
        <path d="M9 12h6M12 9v6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function TravelSmarter() {
  return (
    <section className="border-t border-line bg-cream-50 py-20 md:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Travel essentials"
          title="Travel smarter in Ghana."
          description="Practical local guidance for first-time visitors, students, and solo travellers."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m) => (
            <div
              key={m.title}
              className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition hover:border-ink/20 hover:shadow-card"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand text-ink transition-colors group-hover:bg-ink group-hover:text-white">
                {m.icon}
              </span>
              <h3 className="mt-4 font-sans text-[1.04rem] font-semibold tracking-[-0.02em] text-ink">
                {m.title}
              </h3>
              <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-muted">{m.body}</p>
              <Link
                href={m.link.href}
                className="mt-4 inline-flex items-center gap-1 text-[0.8rem] font-semibold text-ink transition hover:text-forest"
              >
                {m.link.label} <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
