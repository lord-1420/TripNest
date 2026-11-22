import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const MODULES = [
  {
    title: "Best times to visit",
    body: "Ghana's dry season runs roughly November to March in the south, with the heaviest rains between May and July. The north is hottest before the rains arrive.",
    link: { href: "/destinations?category=nature", label: "See seasonal destinations" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Getting around",
    body: "Intercity buses and shared trotros cover the country cheaply. For parks and villages a hired driver for the day is usually the practical choice.",
    link: { href: "/explore", label: "Open the map explorer" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Money & connectivity",
    body: "Mobile money is widely used and cards work in hotels and larger restaurants. Carry cedis for markets, transport and smaller towns.",
    link: { href: "/about#practical", label: "Read the practical guide" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18M7 15h3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Health & preparation",
    body: "Check malaria advice for the regions you plan to visit, drink bottled or filtered water, and carry a small first-aid kit with rehydration salts.",
    link: { href: "/destinations", label: "Plan around a destination" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M12 3.5 20 7v5.5c0 4.4-3.3 7.4-8 8.9-4.7-1.5-8-4.5-8-8.9V7l8-3.5Z" strokeLinejoin="round" />
        <path d="M9 12h6M12 9v6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function TravelSmarter() {
  return (
    <section className="border-t border-line bg-sand py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Practical, not promotional"
          title="Travel smarter. Explore with confidence."
          description="The information first-time travellers actually need — before and during the trip."
        />
        <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m) => (
            <div key={m.title} className="group flex flex-col bg-white p-6 transition-colors duration-500 hover:bg-cream-50">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/[0.15] text-forest transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-forest">
                {m.icon}
              </span>
              <h3 className="mt-4 font-display text-[1.2rem] leading-tight text-forest">{m.title}</h3>
              <p className="mt-2 flex-1 text-[0.85rem] leading-relaxed text-muted">{m.body}</p>
              <Link href={m.link.href} className="mt-4 text-[0.78rem] font-semibold text-forest hover:text-gold-600">
                {m.link.label} <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[0.72rem] leading-relaxed text-muted">
          General guidance only. Seasonal conditions, transport and prices change — always confirm current
          details with local providers, and check your own government's travel advice before you go.
        </p>
      </div>
    </section>
  );
}
