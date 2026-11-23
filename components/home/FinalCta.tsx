import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";

export default function FinalCta() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="shell">
        <div className="relative isolate overflow-hidden rounded-3xl bg-[#0e1412] px-6 py-20 text-center md:px-12 md:py-28">
          <div className="absolute inset-0 -z-10">
            <SmartImage
              src="/images/editorial-forest.jpg"
              alt="Forested hills in Ghana at dusk"
              fill
              sizes="100vw"
              fallbackTone="light"
              className="object-cover object-center opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
          </div>

          <p className="eyebrow eyebrow-light">Start your journey</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-sans text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-white">
            Your next Ghana trip, planned cleanly.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[0.98rem] leading-relaxed text-white/75">
            Explore destinations in 3D, compare local stays in cedis, and build your itinerary in minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/explore" className="btn btn-gold btn-lg">
              Open 3D Explorer
            </Link>
            <Link href="/dashboard/trips/new" className="btn btn-ghost-light btn-lg">
              Plan a trip
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
