import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";

export default function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <div className="absolute inset-0 -z-10">
        <SmartImage
          src="/images/editorial-forest.jpg"
          alt="Forested hills in Ghana at dusk"
          fill
          sizes="100vw"
          fallbackTone="light"
          className="object-cover object-center contrast-[1.08] saturate-[1.08] transition-transform duration-[1800ms] ease-editorial motion-safe:animate-scale-in"
        />
        <div className="absolute inset-0 bg-forest/[0.76]" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-forest/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/50 via-transparent to-forest/50" />
      </div>

      <div className="shell py-28 text-center md:py-40">
        <p className="eyebrow eyebrow-light">Ready when you are</p>
        <h2 className="mx-auto mt-4 max-w-3xl display text-display-lg text-cream">
          Your next Ghanaian adventure is waiting.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-cream/75">
          Start exploring, find somewhere to stay and turn your travel ideas into a plan.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/destinations" className="btn btn-gold btn-lg">
            Explore Ghana
          </Link>
          <Link href="/dashboard/trips/new" className="btn btn-ghost-light btn-lg">
            Plan a trip
          </Link>
        </div>
        <div className="mx-auto mt-12 flex max-w-md items-center gap-4">
          <span className="h-px flex-1 bg-cream/20" />
          <span className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/50">TripNest</span>
          <span className="h-px flex-1 bg-cream/20" />
        </div>
      </div>
    </section>
  );
}
