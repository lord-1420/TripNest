import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";
import {
  addItineraryEntryAction,
  deleteItineraryEntryAction,
  updateItineraryEntryAction,
} from "@/lib/actions/trips";
import { cedis, dayRange, formatShortDate, formatWeekday, formatTime, todayISO } from "@/lib/format";
import type { ItineraryEntry, Trip } from "@/lib/types";

interface EntryWithImage extends ItineraryEntry {
  attraction_slug?: string | null;
  attraction_image?: string | null;
}

/**
 * Chronological, date-grouped itinerary. Editing and deleting use native
 * <details> disclosure so the whole planner works without client JavaScript.
 */
export default function ItineraryTimeline({
  trip,
  entries,
  attractions,
}: {
  trip: Trip;
  entries: EntryWithImage[];
  attractions: { id: number; name: string }[];
}) {
  const dates: string[] =
    trip.start_date && trip.end_date && trip.end_date >= trip.start_date
      ? dayRange(trip.start_date, trip.end_date)
      : Array.from(new Set(entries.map((e) => e.entry_date))).sort();

  const groups: { date: string; entries: EntryWithImage[] }[] =
    dates.length > 0
      ? dates.map((date) => ({ date, entries: entries.filter((e) => e.entry_date === date) }))
      : [];

  const unscheduled = entries.filter((e) => !dates.includes(e.entry_date));

  return (
    <section className="border border-line bg-white">
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <p className="eyebrow eyebrow-forest">Itinerary</p>
          <h2 className="mt-1.5 font-display text-2xl text-forest">Day by day</h2>
        </div>
        <p className="text-[0.78rem] text-muted">
          {entries.length} {entries.length === 1 ? "stop" : "stops"} planned
        </p>
      </header>

      <div className="px-5 py-5">
        {entries.length === 0 && groups.length === 0 ? (
          <p className="text-[0.88rem] leading-relaxed text-muted">
            Nothing planned yet. Add a first stop below — a castle tour, a canopy walk or just the journey
            itself.
          </p>
        ) : null}

        <ol className="space-y-6">
          {groups.map((group, gi) => (
            <li key={group.date}>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-[0.7rem] font-bold text-cream">
                  {gi + 1}
                </span>
                <div>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted">
                    {formatWeekday(group.date)}
                  </p>
                  <h3 className="font-display text-[1.15rem] leading-tight text-forest">
                    {formatShortDate(group.date)}
                  </h3>
                </div>
                {group.entries.length === 0 && (
                  <span className="ml-auto text-[0.72rem] text-muted/70">Free day</span>
                )}
              </div>

              <div className="ml-4 mt-3 border-l border-line pl-5">
                {group.entries.length > 0 ? (
                  <ul className="space-y-2.5">
                    {group.entries.map((entry) => (
                      <li key={entry.id} className="border border-line bg-cream-50 p-3">
                        <div className="flex items-start gap-3">
                          {entry.attraction_image && (
                            <div className="relative h-12 w-16 shrink-0 overflow-hidden">
                              <SmartImage src={entry.attraction_image} alt="" fill sizes="64px" className="object-cover" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                              {entry.start_time && <span className="font-semibold text-forest">{formatTime(entry.start_time)}</span>}
                              {entry.attraction_slug ? (
                                <Link href={`/experiences/${entry.attraction_slug}`} className="hover:text-forest">
                                  {entry.attraction_slug.replace(/-/g, " ")}
                                </Link>
                              ) : (
                                <span>Custom stop</span>
                              )}
                            </div>
                            <p className="mt-1 font-display text-[1.08rem] leading-snug text-forest">{entry.title}</p>
                            {entry.notes && <p className="mt-1 text-[0.78rem] leading-relaxed text-muted">{entry.notes}</p>}
                          </div>
                          {entry.estimated_cost > 0 && (
                            <span className="shrink-0 text-[0.78rem] font-semibold text-forest/80">
                              {cedis(entry.estimated_cost)}
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex items-center gap-3 border-t border-line pt-2 text-[0.7rem]">
                          <details className="group">
                            <summary
                              className="cursor-pointer list-none font-semibold text-forest hover:text-gold-600"
                              aria-label={`Edit ${entry.title}`}
                            >
                              Edit
                            </summary>
                            <form action={updateItineraryEntryAction} className="mt-2 grid gap-2 border border-line bg-white p-3 sm:grid-cols-2">
                              <input type="hidden" name="tripId" value={trip.id} />
                              <input type="hidden" name="entryId" value={entry.id} />
                              <label className="text-[0.66rem] uppercase tracking-[0.12em] text-muted">
                                Title
                                <input name="title" defaultValue={entry.title} className="field mt-1" required />
                              </label>
                              <label className="text-[0.66rem] uppercase tracking-[0.12em] text-muted">
                                Date
                                <input type="date" name="entryDate" defaultValue={entry.entry_date} className="field mt-1" required />
                              </label>
                              <label className="text-[0.66rem] uppercase tracking-[0.12em] text-muted">
                                Start time
                                <input type="time" name="startTime" defaultValue={entry.start_time ?? ""} className="field mt-1" />
                              </label>
                              <label className="text-[0.66rem] uppercase tracking-[0.12em] text-muted">
                                Estimated cost (GH₵)
                                <input type="number" min="0" step="0.01" name="estimatedCost" defaultValue={entry.estimated_cost} className="field mt-1" />
                              </label>
                              <label className="text-[0.66rem] uppercase tracking-[0.12em] text-muted sm:col-span-2">
                                Notes
                                <textarea name="notes" defaultValue={entry.notes ?? ""} rows={2} className="field mt-1" />
                              </label>
                              <button type="submit" className="btn btn-primary btn-sm sm:col-span-2">Save changes</button>
                            </form>
                          </details>
                          <form action={deleteItineraryEntryAction}>
                            <input type="hidden" name="tripId" value={trip.id} />
                            <input type="hidden" name="entryId" value={entry.id} />
                            <button
                              type="submit"
                              className="font-semibold text-muted hover:text-[#8C3524]"
                              aria-label={`Delete ${entry.title} from the itinerary`}
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-1 text-[0.8rem] text-muted/80">Nothing planned for this day yet.</p>
                )}

                <details className="mt-2">
                  <summary className="cursor-pointer list-none text-[0.74rem] font-semibold text-forest hover:text-gold-600">
                    + Add a stop on {formatShortDate(group.date)}
                  </summary>
                  <form action={addItineraryEntryAction} className="mt-2 grid gap-2 border border-line bg-white p-3 sm:grid-cols-2">
                    <input type="hidden" name="tripId" value={trip.id} />
                    <input type="hidden" name="entryDate" value={group.date} />
                    <label className="text-[0.66rem] uppercase tracking-[0.12em] text-muted sm:col-span-2">
                      What are you doing?
                      <input name="title" required placeholder="Sunset at the harbour" className="field mt-1" />
                    </label>
                    <label className="text-[0.66rem] uppercase tracking-[0.12em] text-muted">
                      Start time
                      <input type="time" name="startTime" className="field mt-1" />
                    </label>
                    <label className="text-[0.66rem] uppercase tracking-[0.12em] text-muted">
                      Estimated cost (GH₵)
                      <input type="number" min="0" step="0.01" name="estimatedCost" placeholder="0" className="field mt-1" />
                    </label>
                    <label className="text-[0.66rem] uppercase tracking-[0.12em] text-muted sm:col-span-2">
                      Link an experience (optional)
                      <select name="attractionId" className="field mt-1">
                        <option value="">No linked experience</option>
                        {attractions.map((a) => (
                          <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="text-[0.66rem] uppercase tracking-[0.12em] text-muted sm:col-span-2">
                      Notes
                      <textarea name="notes" rows={2} className="field mt-1" placeholder="Book ahead, bring water…" />
                    </label>
                    <button type="submit" className="btn btn-primary btn-sm sm:col-span-2">Add stop</button>
                  </form>
                </details>
              </div>
            </li>
          ))}
        </ol>

        {unscheduled.length > 0 && (
          <div className="mt-6 border-t border-line pt-4">
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted">Not on a trip day</h3>
            <ul className="mt-2 space-y-1.5 text-[0.84rem] text-ink/80">
              {unscheduled.map((e) => (
                <li key={e.id}>
                  {formatShortDate(e.entry_date)} · {e.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Add stop for trips without dates */}
        {dates.length === 0 && (
          <form action={addItineraryEntryAction} className="mt-6 grid gap-2 border border-line bg-white p-3 sm:grid-cols-2">
            <input type="hidden" name="tripId" value={trip.id} />
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted sm:col-span-2">
              Add your first stop
            </p>
            <label className="text-[0.66rem] uppercase tracking-[0.12em] text-muted">
              Date
              <input type="date" name="entryDate" defaultValue={todayISO()} className="field mt-1" required />
            </label>
            <label className="text-[0.66rem] uppercase tracking-[0.12em] text-muted">
              Title
              <input name="title" required placeholder="Arrive in Cape Coast" className="field mt-1" />
            </label>
            <button type="submit" className="btn btn-primary btn-sm sm:col-span-2">Add stop</button>
          </form>
        )}
      </div>
    </section>
  );
}
