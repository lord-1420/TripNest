import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import Badge from "@/components/ui/Badge";
import { requireRole } from "@/lib/auth";
import { adminStats, pendingStays, allUsers } from "@/lib/queries";
import { cedis } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin overview" };

export default async function AdminHome() {
  await requireRole("ADMIN", "/dashboard/admin");
  const stats = adminStats();
  const queue = pendingStays();
  const users = allUsers();

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow eyebrow-forest">Administration</p>
          <h1 className="mt-2 display text-[clamp(1.9rem,3vw,2.6rem)] text-forest">Platform overview</h1>
          <p className="mt-2 text-[0.92rem] text-muted">
            Content, listing approvals and accounts. Every seed record is flagged until an editor verifies it.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/admin/accommodations" className="btn btn-primary btn-sm">
            Review queue ({stats.pendingStays})
          </Link>
          <Link href="/dashboard/admin/destinations" className="btn btn-outline btn-sm">Manage content</Link>
        </div>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Destinations" value={stats.destinations} hint={`${stats.publishedDestinations} published`} />
        <StatCard label="Attractions" value={stats.attractions} hint={`${stats.hiddenGems} hidden gems`} />
        <StatCard label="Accommodation" value={stats.accommodations} hint={`${stats.approvedStays} live · ${stats.pendingStays} pending`} />
        <StatCard label="Accounts" value={stats.travellers + stats.providers} hint={`${stats.travellers} travellers · ${stats.providers} providers`} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Trips created" value={stats.trips} hint="Across all travellers" />
        <StatCard label="Saved places" value={stats.savedPlaces} hint="Destinations + experiences" />
        <StatCard label="Pending reviews" value={stats.pendingStays} hint="Accommodation listings awaiting a decision" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-2xl text-forest">Approval queue</h2>
            <Link href="/dashboard/admin/accommodations" className="text-[0.76rem] font-semibold text-forest hover:text-gold-600">
              Open queue →
            </Link>
          </div>
          <ul className="divide-y divide-line border border-line bg-white">
            {queue.slice(0, 5).map((stay) => (
              <li key={stay.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <Badge tone={stay.status === "PENDING" ? "gold" : stay.status === "APPROVED" ? "success" : "danger"}>
                  {stay.status}
                </Badge>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.88rem] font-semibold text-forest">{stay.name}</p>
                  <p className="truncate text-[0.72rem] text-muted">
                    {stay.destination_name} · {cedis(stay.price_per_night)} / night · {stay.area}
                  </p>
                </div>
                <Link href={`/dashboard/admin/accommodations#stay-${stay.id}`} className="text-[0.74rem] font-semibold text-forest hover:text-gold-600">
                  Review →
                </Link>
              </li>
            ))}
            {queue.length === 0 && <li className="px-4 py-6 text-sm text-muted">Nothing in the queue.</li>}
          </ul>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-2xl text-forest">Newest accounts</h2>
            <Link href="/dashboard/admin/users" className="text-[0.76rem] font-semibold text-forest hover:text-gold-600">
              All users →
            </Link>
          </div>
          <ul className="divide-y divide-line border border-line bg-white">
            {users.slice(0, 6).map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-[0.85rem] font-medium text-forest">{u.name}</p>
                  <p className="truncate text-[0.72rem] text-muted">{u.email}</p>
                </div>
                <Badge tone={u.role === "ADMIN" ? "forest" : u.role === "PROVIDER" ? "gold" : "muted"}>{u.role}</Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8 border border-line bg-cream-50 p-5">
        <h2 className="font-display text-xl text-forest">Content integrity</h2>
        <p className="mt-2 max-w-3xl text-[0.85rem] leading-relaxed text-muted">
          Seeded destinations and attractions are marked <code className="text-forest">SEED</code> until an
          editor verifies the facts. Featured destinations, hidden-gem flags and publication status are
          editorial controls — use them to curate what travellers see on the homepage rather than editing
          code.
        </p>
      </section>
    </div>
  );
}
