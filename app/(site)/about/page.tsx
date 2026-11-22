import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import { publicStats } from "@/lib/queries";

export const metadata: Metadata = {
  title: "About TripNest",
  description:
    "TripNest is a Ghana-focused travel discovery and planning platform: editorial destination guides, real attractions, published accommodation and a trip planner with budgets in cedis.",
};
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const stats = publicStats();

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            A Ghana-first travel platform,
            <span className="block italic text-forest-500">built for ordinary travellers.</span>
          </>
        }
        description="TripNest exists because planning a trip in Ghana usually means stitching together screenshots, word-of-mouth and half-finished notes. This is an attempt to do it properly in one place."
      />

      <section className="shell py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="prose-editorial body-copy">
            <h2 className="display text-display-md not-prose mb-4">Why we built it</h2>
            <p>
              Ghana has extraordinary places: castles that carry the weight of the Atlantic world, rainforest
              canopies, crater lakes, stilt villages, northern savannah and a coastline that runs for hundreds
              of kilometres. Most of it is badly served by generic travel sites, which either ignore the
              country or reduce it to a handful of stops.
            </p>
            <p>
              TripNest treats Ghanaian destinations as worth a proper guide: what the place is, why it matters,
              what you can do there, when to go, where to stay and what to think about before you arrive. Then
              it gives you tools to turn that reading into an actual plan.
            </p>
            <h2 className="display text-display-md not-prose mb-4 mt-10">What is in the platform</h2>
            <p>
              {stats.destinations} published destination guides, {stats.experiences} attractions and
              experiences — including {stats.hiddenGems} flagged as hidden gems — and {stats.stays} published
              accommodation listings. All of it is stored in the application database and searchable, not
              hard-coded into the pages.
            </p>
            <p>
              Travellers get saved places, dated itineraries with per-stop estimates and a budget summary in
              Ghana cedis. Providers submit listings which administrators review before publication.
            </p>
          </div>

          <aside>
            <div className="border border-line bg-white p-5">
              <h2 className="font-display text-xl text-forest">By the numbers</h2>
              <dl className="mt-4 divide-hair text-[0.86rem]">
                {[
                  ["Destination guides", stats.destinations],
                  ["Experiences", stats.experiences],
                  ["Hidden gems", stats.hiddenGems],
                  ["Published stays", stats.stays],
                  ["Regions covered", 8],
                ].map(([label, value]) => (
                  <div key={String(label)} className="flex items-center justify-between py-2.5">
                    <dt className="text-muted">{label}</dt>
                    <dd className="font-display text-lg text-forest">{value as number}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div id="practical" className="mt-4 scroll-mt-28 border border-line bg-cream-50 p-5">
              <h2 className="font-display text-xl text-forest">Practical notes, honestly</h2>
              <ul className="mt-3 space-y-2 text-[0.84rem] leading-relaxed text-muted">
                <li>· Seasonal guidance is general, not a forecast.</li>
                <li>· Fares, timetables and entry fees are not published as facts.</li>
                <li>· Accommodation prices are indicative and confirmed by providers.</li>
                <li>· Some listing photographs are labelled area illustrations.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-line bg-sand py-14 md:py-16">
        <div className="shell">
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {[
              {
                title: "Editorial, not promotional",
                body: "Guides are written to explain a place and its context. A destination is never described as hidden or undiscovered unless the story supports it.",
              },
              {
                title: "Accessible by default",
                body: "Contrast-checked colour, keyboard navigation, real form labels, reduced-motion support and layouts that hold together on a phone.",
              },
              {
                title: "Honest about data",
                body: "Content is flagged as seed or verified. Photography is licensed and credited. Nothing pretends to be a live booking system.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-white p-6">
                <h3 className="font-display text-[1.25rem] text-forest">{v.title}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-forest">Editorial status</p>
            <h2 className="mt-2 display text-display-md">How content is verified</h2>
            <p className="mt-4 text-[0.94rem] leading-relaxed text-ink/80">
              Every destination, attraction and listing carries a content status. Records in this build are
              marked <strong>SEED</strong>: written for development and awaiting editorial review. In the admin
              console an editor can verify a record, feature it, flag it as a hidden gem or unpublish it.
            </p>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-ink/80">
              Coordinates come from OpenStreetMap. Photography comes from Wikimedia Commons under the licences
              shown on the{" "}
              <Link href="/credits" className="underline decoration-line underline-offset-2 hover:text-forest">
                credits page
              </Link>
              , which lists every image used.
            </p>
          </div>
          <div>
            <p className="eyebrow eyebrow-forest">Extend it</p>
            <h2 className="mt-2 display text-display-md">Built to be maintained</h2>
            <p className="mt-4 text-[0.94rem] leading-relaxed text-ink/80">
              Destinations, attractions, categories, amenities, editorial tips and checklists are all database
              records. Publication, featured status and hidden-gem selection are editorial controls — not code
              changes.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/destinations" className="btn btn-outline btn-sm">Browse destinations</Link>
              <Link href="/contact" className="btn btn-outline btn-sm">Get in touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
