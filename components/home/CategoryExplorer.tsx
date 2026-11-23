import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/common/SmartImage";
import type { Category } from "@/lib/types";

export default function CategoryExplorer({ categories }: { categories: Category[] }) {
  return (
    <section className="border-b border-line bg-cream-50 py-16 md:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Travel by vibe"
          title="How do you want to experience Ghana?"
          description="Pick a mood or travel goal — from coastal retreats and heritage routes to rainforest trails."
          action={
            <Link
              href="/experiences"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-[0.82rem] font-semibold text-ink transition hover:border-ink/30 hover:bg-sand"
            >
              All experiences <span aria-hidden>→</span>
            </Link>
          }
        />

        <div className="rail mt-8 -mx-[var(--gutter)] px-[var(--gutter)] md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-5">
          {categories.slice(0, 5).map((category) => (
            <Link
              key={category.slug}
              href={`/destinations?category=${category.slug}`}
              className="group block w-[220px] md:w-auto"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
                {category.image && (
                  <SmartImage
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 220px, 20vw"
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.05]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-sans text-[1.05rem] font-semibold tracking-[-0.02em] text-white">
                    {category.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[0.75rem] leading-snug text-white/75">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {categories.length > 5 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              More vibes
            </span>
            {categories.slice(5).map((c) => (
              <Link
                key={c.slug}
                href={`/destinations?category=${c.slug}`}
                className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.8rem] font-medium text-ink transition hover:border-ink/30 hover:bg-sand"
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
