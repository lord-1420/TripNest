import Link from "next/link";
import Badge from "@/components/ui/Badge";
import {
  setAttractionStatusAction,
  toggleAttractionFeaturedAction,
  toggleAttractionPublishedAction,
  toggleHiddenGemAction,
} from "@/lib/actions/admin";
import { requireRole } from "@/lib/auth";
import { listAttractions } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata = { title: "Attraction management" };

export default async function AdminAttractions() {
  await requireRole("ADMIN", "/dashboard/admin/attractions");
  const attractions = listAttractions({ perPage: 100, includeUnpublished: true }).items;

  return (
    <div>
      <header>
        <p className="eyebrow eyebrow-forest">Content</p>
        <h1 className="mt-2 display text-[clamp(1.8rem,2.6vw,2.3rem)] text-forest">Attractions</h1>
        <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-muted">
          The hidden-gem flag drives the editorial “Hidden gems in Ghana” section. Feature flags control the
          experiences shown on the homepage.
        </p>
      </header>

      <div className="mt-6 overflow-x-auto border border-line bg-white">
        <table className="w-full min-w-[900px] text-left text-[0.84rem]">
          <thead className="border-b border-line bg-cream-50 text-[0.64rem] uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Experience</th>
              <th className="px-4 py-3 font-semibold">Region</th>
              <th className="px-4 py-3 font-semibold">Destination</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Hidden gem</th>
              <th className="px-4 py-3 font-semibold">Featured</th>
              <th className="px-4 py-3 font-semibold">Published</th>
              <th className="px-4 py-3 font-semibold">Verified</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {attractions.map((a) => (
              <tr key={a.id} className="hover:bg-cream/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt="" className="h-9 w-12 object-cover" />
                    <Link href={`/experiences/${a.slug}`} className="font-medium text-forest hover:text-gold-600">
                      {a.name}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{a.region}</td>
                <td className="px-4 py-3 text-muted">{a.destination_name ?? "—"}</td>
                <td className="px-4 py-3">
                  <Badge tone={a.content_status === "VERIFIED" ? "success" : "gold"}>
                    {a.content_status === "VERIFIED" ? "Verified" : "Seed"}
                  </Badge>
                </td>
                {[
                  { action: toggleHiddenGemAction, field: "hiddenGem", value: a.hidden_gem, on: "Hidden gem ✓", off: "Mark gem" },
                  { action: toggleAttractionFeaturedAction, field: "featured", value: a.featured, on: "Featured ✓", off: "Feature" },
                  { action: toggleAttractionPublishedAction, field: "published", value: a.published, on: "Live", off: "Hidden" },
                ].map((toggle) => (
                  <td key={toggle.field} className="px-4 py-3">
                    <form action={toggle.action}>
                      <input type="hidden" name="id" value={a.id} />
                      <input type="hidden" name={toggle.field} value={toggle.value} />
                      <button
                        type="submit"
                        className={`text-[0.72rem] font-semibold ${toggle.value ? "text-forest" : "text-muted"}`}
                      >
                        {toggle.value ? toggle.on : toggle.off}
                      </button>
                    </form>
                  </td>
                ))}
                <td className="px-4 py-3">
                  <form action={setAttractionStatusAction}>
                    <input type="hidden" name="id" value={a.id} />
                    <input type="hidden" name="contentStatus" value={a.content_status === "VERIFIED" ? "SEED" : "VERIFIED"} />
                    <button type="submit" className="text-[0.72rem] font-semibold text-forest underline underline-offset-2">
                      {a.content_status === "VERIFIED" ? "Unverify" : "Verify"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
