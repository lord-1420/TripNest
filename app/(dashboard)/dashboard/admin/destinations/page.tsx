import Link from "next/link";
import Badge from "@/components/ui/Badge";
import {
  setDestinationStatusAction,
  toggleDestinationFeaturedAction,
  toggleDestinationPublishedAction,
} from "@/lib/actions/admin";
import { requireRole } from "@/lib/auth";
import { listDestinations } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata = { title: "Destination management" };

export default async function AdminDestinations() {
  await requireRole("ADMIN", "/dashboard/admin/destinations");
  const destinations = listDestinations({ perPage: 100, includeUnpublished: true, sort: "az" }).items;

  return (
    <div>
      <header>
        <p className="eyebrow eyebrow-forest">Content</p>
        <h1 className="mt-2 display text-[clamp(1.8rem,2.6vw,2.3rem)] text-forest">Destinations</h1>
        <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-muted">
          Feature a destination to place it in the homepage rotation, unpublish to hide it from public pages,
          and mark content as verified once an editor has checked the details.
        </p>
      </header>

      <div className="mt-6 overflow-x-auto border border-line bg-white">
        <table className="w-full min-w-[860px] text-left text-[0.84rem]">
          <thead className="border-b border-line bg-cream-50 text-[0.64rem] uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Destination</th>
              <th className="px-4 py-3 font-semibold">Region</th>
              <th className="px-4 py-3 font-semibold">Experiences</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Featured</th>
              <th className="px-4 py-3 font-semibold">Published</th>
              <th className="px-4 py-3 font-semibold">Verified</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {destinations.map((d) => (
              <tr key={d.id} className="align-middle hover:bg-cream/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.hero_image} alt="" className="h-9 w-12 object-cover" />
                    <span className="font-medium text-forest">{d.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{d.region}</td>
                <td className="px-4 py-3 text-muted">{d.attraction_count ?? 0}</td>
                <td className="px-4 py-3">
                  <Badge tone={d.content_status === "VERIFIED" ? "success" : "gold"}>
                    {d.content_status === "VERIFIED" ? "Verified" : "Seed"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <form action={toggleDestinationFeaturedAction}>
                    <input type="hidden" name="id" value={d.id} />
                    <input type="hidden" name="featured" value={d.featured} />
                    <button type="submit" className={`text-[0.74rem] font-semibold ${d.featured ? "text-forest" : "text-muted"}`}>
                      {d.featured ? "Featured ✓" : "Feature"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <form action={toggleDestinationPublishedAction}>
                    <input type="hidden" name="id" value={d.id} />
                    <input type="hidden" name="published" value={d.published} />
                    <button type="submit" className={`text-[0.74rem] font-semibold ${d.published ? "text-forest" : "text-[#8C3524]"}`}>
                      {d.published ? "Live" : "Hidden"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <form action={setDestinationStatusAction}>
                    <input type="hidden" name="id" value={d.id} />
                    <input type="hidden" name="contentStatus" value={d.content_status === "VERIFIED" ? "SEED" : "VERIFIED"} />
                    <button type="submit" className="text-[0.74rem] font-semibold text-forest underline underline-offset-2">
                      {d.content_status === "VERIFIED" ? "Unverify" : "Verify"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/destinations/${d.slug}`} className="text-[0.74rem] font-semibold text-forest hover:text-gold-600">
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
