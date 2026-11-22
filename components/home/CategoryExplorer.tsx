import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/common/SmartImage";
import type { Category } from "@/lib/types";

export default function CategoryExplorer({ categories }: { categories: Category[] }) {
  return (
    <section className="border-y border-forest bg-forest py-20 text-cream md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Follow your curiosity"
          title="Explore by interest"
          description="Nine ways into Ghana. Pick the kind of trip you want and see where it leads."
          tone="light"
          action={
            <Link href="/experiences" className="link-underline text-sm text-cream">
              All experiences <span aria-hidden>→</span>
            </Link>
          }
        />

        <div className="rail mt-9 -mx-[var(--gutter)] px-[var(--gutter)] md:mx-0 md:grid md:grid-cols-3 md:gap-3 md:overflow-visible md:px-0">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/destinations?category=${category.slug}`}
              className="group relative block w-[230px] overflow-hidden shadow-[0_20px_50px_-35px_rgba(0,0,0,.85)] md:w-auto"
            >
              <div className="media media-zoom media-shade aspect-[3/4] md:aspect-[4/5]">
                {category.image && (
                  <SmartImage
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.07]"
                  />
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <h3 className="font-display text-[1.18rem] leading-tight text-cream md:text-[1.35rem]">
                  {category.name}
                </h3>
                <p className="mt-2 hidden line-clamp-2 max-w-xs text-[0.76rem] leading-relaxed text-cream/70 transition-all duration-500 md:block md:translate-y-2 md:group-hover:translate-y-0">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-[0.76rem] text-muted md:hidden">Swipe to see all interests →</p>
      </div>
    </section>
  );
}
