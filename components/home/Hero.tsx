import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";

export default function Hero({
  counts,
}: {
  counts: { destinations: number; experiences: number; stays: number };
}) {
  return (
    <section className="relative isolate flex min-h-[min(880px,92svh)] flex-col justify-end overflow-hidden bg-forest">
      {/* Cinematic image layer */}
      <div className="absolute inset-0 -z-10">
        <SmartImage
          src="/images/editorial-hero.jpg"
          alt="Golden-hour light on a palm-lined beach on the Ghanaian coast"
          fill
          priority
          sizes="100vw"
          fallbackLabel="Ghanaian coastline"
          fallbackTone="light"
          className="object-cover object-[50%_62%] contrast-[1.08] saturate-[1.08] motion-safe:animate-scale-in motion-safe:will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/5 via-[45%] to-forest/[0.96]" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/[0.62] via-forest/15 to-transparent" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      </div>

      <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24">
        <div className="mb-5 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cream/75 motion-safe:animate-fade-in">
          <span className="h-px w-9 bg-gold-100" />
          A journey through Ghana
        </div>
        <div className="max-w-4xl">
          <p className="eyebrow eyebrow-light motion-safe:animate-fade-up">Your next adventure starts here</p>
          <h1 className="mt-5 display text-[clamp(3.4rem,8vw,7.4rem)] leading-[.9] tracking-[-.045em] text-cream motion-safe:animate-fade-up [animation-delay:80ms]">
            Find your place.
            <span className="mt-2 block text-cream/95">
              Discover your <em className="font-normal italic text-gold-100">journey.</em>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-cream/[0.85] motion-safe:animate-fade-up [animation-delay:160ms] md:text-[1.1rem]">
            Explore incredible destinations, find somewhere to stay and plan your next adventure across
            Ghana.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 motion-safe:animate-fade-up [animation-delay:240ms]">
            <Link href="/destinations" className="btn btn-gold btn-lg">
              Explore Destinations
            </Link>
            <Link href="/plan" className="btn btn-ghost-light btn-lg">
              Start Planning
            </Link>
          </div>
          <p className="mt-8 border-l border-gold-100/70 pl-3 text-[0.76rem] tracking-wide text-cream/80 motion-safe:animate-fade-in [animation-delay:400ms]">
            {counts.destinations} destinations · {counts.experiences} experiences · {counts.stays} places to
            stay — all across Ghana
          </p>
        </div>
      </div>
    </section>
  );
}
