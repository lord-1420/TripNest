import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { setStayStatusAction, setStayContentStatusAction, toggleStayPublishedAction } from "@/lib/actions/admin";
import { requireRole } from "@/lib/auth";
import { pendingStays } from "@/lib/queries";
import { cedis } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = { title: "Accommodation approvals" };

const TONE = { PENDING: "gold", APPROVED: "success", REJECTED: "danger" } as const;

export default async function AdminAccommodations() {
  await requireRole("ADMIN", "/dashboard/admin/accommodations");
  const stays = pendingStays();
  const counts = {
    pending: stays.filter((s) => s.status === "PENDING").length,
    approved: stays.filter((s) => s.status === "APPROVED").length,
    rejected: stays.filter((s) => s.status === "REJECTED").length,
  };

  return (
    <div>
      <header>
        <p className="eyebrow eyebrow-forest">Approvals</p>
        <h1 className="mt-2 display text-[clamp(1.8rem,2.6vw,2.3rem)] text-forest">Accommodation queue</h1>
        <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-muted">
          {counts.pending} awaiting review · {counts.approved} live · {counts.rejected} rejected. Approving a
          listing publishes it to search and destination pages.
        </p>
      </header>

      <ul className="mt-6 space-y-4">
        {stays.map((stay) => (
          <li key={stay.id} id={`stay-${stay.id}`} className="border border-line bg-white">
            <div className="flex flex-wrap items-start gap-4 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={stay.image} alt="" className="h-24 w-32 shrink-0 object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={TONE[stay.status]}>{stay.status}</Badge>
                  <Badge tone="muted">{stay.type}</Badge>
                  <Badge tone={stay.content_status === "VERIFIED" ? "success" : "gold"}>
                    {stay.content_status === "VERIFIED" ? "Verified content" : "Seed content"}
                  </Badge>
                  {stay.published ? <Badge tone="outline">Published</Badge> : null}
                </div>
                <h2 className="mt-1.5 font-display text-[1.3rem] leading-tight text-forest">{stay.name}</h2>
                <p className="text-[0.78rem] text-muted">
                  {stay.area} · {stay.destination_name} · {cedis(stay.price_per_night)} / night ·{" "}
                  {stay.amenities?.length ?? 0} amenities
                </p>
                <p className="mt-1 max-w-2xl text-[0.8rem] leading-relaxed text-muted">{stay.description}</p>
                <p className="mt-1 text-[0.72rem] text-muted/80">
                  Contact: {stay.phone ?? "no phone"} · {stay.whatsapp ?? "no WhatsApp"} · {stay.email ?? "no email"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <form action={setStayStatusAction} className="flex gap-2">
                  <input type="hidden" name="id" value={stay.id} />
                  <button
                    type="submit"
                    name="status"
                    value="APPROVED"
                    className="btn btn-primary btn-sm"
                    disabled={stay.status === "APPROVED"}
                  >
                    Approve
                  </button>
                  <button
                    type="submit"
                    name="status"
                    value="REJECTED"
                    className="btn btn-outline btn-sm"
                    disabled={stay.status === "REJECTED"}
                  >
                    Reject
                  </button>
                </form>
                <div className="flex flex-wrap items-center gap-3 text-[0.72rem]">
                  <form action={toggleStayPublishedAction}>
                    <input type="hidden" name="id" value={stay.id} />
                    <input type="hidden" name="published" value={stay.published} />
                    <button type="submit" className="font-semibold text-forest underline underline-offset-2">
                      {stay.published ? "Unpublish" : "Publish"}
                    </button>
                  </form>
                  <form action={setStayContentStatusAction}>
                    <input type="hidden" name="id" value={stay.id} />
                    <input type="hidden" name="contentStatus" value={stay.content_status === "VERIFIED" ? "SEED" : "VERIFIED"} />
                    <button type="submit" className="font-semibold text-forest underline underline-offset-2">
                      {stay.content_status === "VERIFIED" ? "Unverify" : "Verify"}
                    </button>
                  </form>
                  {stay.status === "APPROVED" && (
                    <Link href={`/stays/${stay.slug}`} className="font-semibold text-forest underline underline-offset-2">
                      View
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
        {stays.length === 0 && (
          <li className="border border-dashed border-line bg-white p-8 text-center text-sm text-muted">
            No accommodation listings yet.
          </li>
        )}
      </ul>
    </div>
  );
}
