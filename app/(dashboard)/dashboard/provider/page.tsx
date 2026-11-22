import Link from "next/link";
import { redirect } from "next/navigation";
import StatCard from "@/components/dashboard/StatCard";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { requireUser } from "@/lib/auth";
import { providerStays } from "@/lib/queries";
import { cedis } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = { title: "Provider dashboard" };

const STATUS_TONE = { PENDING: "gold", APPROVED: "success", REJECTED: "danger" } as const;

export default async function ProviderDashboard() {
  const user = await requireUser("/dashboard/provider");
  if (user.role !== "PROVIDER" && user.role !== "ADMIN") redirect("/dashboard");

  const listings = providerStays(user.id);
  const pending = listings.filter((l) => l.status === "PENDING").length;
  const approved = listings.filter((l) => l.status === "APPROVED").length;
  const rejected = listings.filter((l) => l.status === "REJECTED").length;

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow eyebrow-forest">Provider workspace</p>
          <h1 className="mt-2 display text-[clamp(1.9rem,3vw,2.6rem)] text-forest">Your listings</h1>
          <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-muted">
            Submit a property and an administrator reviews it before it appears on the public site. You can
            update details at any time — edits return a listing to the review queue.
          </p>
        </div>
        <Link href="/dashboard/provider/listings/new" className="btn btn-primary btn-sm">Add a property</Link>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Listings" value={listings.length} hint="All properties you own" />
        <StatCard label="In review" value={pending} hint="Waiting on an administrator" />
        <StatCard label="Live" value={approved} hint="Visible on TripNest" />
        <StatCard label="Needs changes" value={rejected} hint="Rejected — update and resubmit" />
      </div>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-forest">Property management</h2>
        <div className="mt-3">
          {listings.length === 0 ? (
            <EmptyState
              title="No listings yet"
              description="Add your first hostel, hotel or apartment. You will need a name, a nightly price and a description."
              action={<Link href="/dashboard/provider/listings/new" className="btn btn-primary btn-sm">Add a property</Link>}
            />
          ) : (
            <ul className="divide-y divide-line border border-line bg-white">
              {listings.map((l) => (
                <li key={l.id} className="flex flex-wrap items-start gap-4 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.image} alt="" className="h-20 w-28 shrink-0 object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={STATUS_TONE[l.status]}>{l.status}</Badge>
                      <Badge tone="muted">{l.type}</Badge>
                      {l.status === "APPROVED" && !l.published && <Badge tone="outline">Unpublished</Badge>}
                    </div>
                    <h3 className="mt-1.5 font-display text-[1.2rem] leading-tight text-forest">{l.name}</h3>
                    <p className="text-[0.78rem] text-muted">
                      {l.area} · {l.destination_name} · {cedis(l.price_per_night)} / night
                    </p>
                    <p className="mt-1 line-clamp-1 text-[0.78rem] text-muted">{l.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {l.status === "APPROVED" ? (
                      <Link href={`/stays/${l.slug}`} className="text-[0.76rem] font-semibold text-forest hover:text-gold-600">
                        View public page →
                      </Link>
                    ) : (
                      <span className="text-[0.72rem] text-muted">
                        {l.status === "PENDING" ? "Awaiting review" : "Update to resubmit"}
                      </span>
                    )}
                    <Link href={`/dashboard/provider/listings/new?edit=${l.id}`} className="text-[0.72rem] text-muted underline underline-offset-2 hover:text-forest">
                      Edit details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mt-8 border border-line bg-cream-50 p-5">
        <h2 className="font-display text-xl text-forest">How approval works</h2>
        <ol className="mt-3 space-y-2 text-[0.85rem] leading-relaxed text-muted">
          <li><span className="font-semibold text-forest">1. Submit</span> — add the property details, price and amenities.</li>
          <li><span className="font-semibold text-forest">2. Review</span> — an administrator checks the listing for accuracy.</li>
          <li><span className="font-semibold text-forest">3. Publish</span> — approved listings appear in search and on destination pages.</li>
          <li><span className="font-semibold text-forest">4. Enquiries</span> — travellers contact you directly. TripNest takes no commission or payment.</li>
        </ol>
      </section>
    </div>
  );
}
