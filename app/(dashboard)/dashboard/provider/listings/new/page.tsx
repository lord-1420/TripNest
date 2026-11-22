import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createListingAction } from "@/lib/actions/provider";
import { listDestinations, listAmenities, getAccommodation } from "@/lib/queries";
import { cedis } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = { title: "Add a property" };

export default async function NewListingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; edit?: string }>;
}) {
  const user = await requireUser("/dashboard/provider/listings/new");
  if (user.role !== "PROVIDER" && user.role !== "ADMIN") redirect("/dashboard");
  const { error, edit } = await searchParams;

  const destinations = listDestinations({ perPage: 50, sort: "az" }).items;
  const amenityList = listAmenities();
  const editing = edit ? getAccommodation(edit) : undefined;

  return (
    <div className="max-w-3xl">
      <header>
        <p className="eyebrow eyebrow-forest">Provider workspace</p>
        <h1 className="mt-2 display text-[clamp(1.9rem,3vw,2.6rem)] text-forest">
          {editing ? "Update your listing" : "Add a property"}
        </h1>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
          Listings are reviewed by an administrator before they go live. Use contact details travellers can
          actually reach — TripNest does not take bookings.
        </p>
      </header>

      {error && (
        <p role="alert" className="mt-5 border border-[#F0CFC7] bg-[#FBEAE6] px-3 py-2 text-[0.82rem] text-[#8C3524]">
          {error === "destination" ? "Please choose a valid destination." : "Please complete the required fields."}
        </p>
      )}

      {editing ? (
        <div className="mt-6 border border-line bg-white p-5">
          <p className="text-[0.85rem] text-muted">
            Editing <span className="font-semibold text-forest">{editing.name}</span> — currently{" "}
            <span className="font-semibold text-forest">{editing.status.toLowerCase()}</span> at{" "}
            {cedis(editing.price_per_night)} per night.
          </p>
          <p className="mt-2 text-[0.78rem] text-muted">
            Full editing uses the same fields below. For this development build, submit the form to re-queue
            the listing for review with the new values.
          </p>
        </div>
      ) : null}

      <form action={createListingAction} className="mt-6 border border-line bg-white p-5 md:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="field-label">Property name</span>
            <input name="name" required defaultValue={editing?.name} placeholder="Osu Garden Lodge" className="field" />
          </label>
          <label>
            <span className="field-label">Destination</span>
            <select name="destinationId" required defaultValue={editing?.destination_id ?? ""} className="field">
              <option value="">Choose a destination</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{d.name} — {d.region}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="field-label">Type</span>
            <select name="type" defaultValue={editing?.type ?? "HOTEL"} className="field">
              <option value="HOTEL">Hotel</option>
              <option value="HOSTEL">Hostel</option>
              <option value="APARTMENT">Apartment</option>
            </select>
          </label>
          <label>
            <span className="field-label">Nightly price (GH₵)</span>
            <input type="number" min={0} step={1} name="price" required defaultValue={editing?.price_per_night} placeholder="350" className="field" />
          </label>
          <label>
            <span className="field-label">Area / neighbourhood</span>
            <input name="area" defaultValue={editing?.area ?? ""} placeholder="Osu, Accra" className="field" />
          </label>
          <label className="sm:col-span-2">
            <span className="field-label">Address</span>
            <input name="address" defaultValue={editing?.address ?? ""} placeholder="Street, landmark" className="field" />
          </label>
          <label className="sm:col-span-2">
            <span className="field-label">Description</span>
            <textarea name="description" rows={4} required defaultValue={editing?.description} placeholder="What makes this place a good base? Rooms, atmosphere, location." className="field" />
          </label>
          <label>
            <span className="field-label">Phone</span>
            <input name="phone" defaultValue={editing?.phone ?? ""} placeholder="+233 …" className="field" />
          </label>
          <label>
            <span className="field-label">WhatsApp</span>
            <input name="whatsapp" defaultValue={editing?.whatsapp ?? ""} placeholder="+233 …" className="field" />
          </label>
          <label className="sm:col-span-2">
            <span className="field-label">Email</span>
            <input type="email" name="email" defaultValue={editing?.email ?? ""} placeholder="stay@yourbusiness.com" className="field" />
          </label>
        </div>

        <fieldset className="mt-5 border-t border-line pt-4">
          <legend className="field-label">Amenities</legend>
          <div className="flex flex-wrap gap-2">
            {amenityList.map((a) => (
              <label
                key={a.slug}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[0.78rem] text-forest has-[:checked]:border-forest has-[:checked]:bg-forest has-[:checked]:text-cream"
              >
                <input
                  type="checkbox"
                  name="amenities"
                  value={a.slug}
                  defaultChecked={editing?.amenities?.includes(a.name)}
                  className="sr-only"
                />
                {a.name}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="submit" className="btn btn-primary">Submit for review</button>
          <Link href="/dashboard/provider" className="btn btn-outline">Cancel</Link>
        </div>
        <p className="mt-3 text-[0.72rem] text-muted">
          By submitting you confirm the details are accurate and that you are authorised to list the property.
        </p>
      </form>
    </div>
  );
}
