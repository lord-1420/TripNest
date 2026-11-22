import { addBudgetEntryAction, deleteBudgetEntryAction } from "@/lib/actions/trips";
import { cedis, round2 } from "@/lib/format";
import type { BudgetEntry } from "@/lib/types";

const CATEGORIES = [
  { key: "ACCOMMODATION", label: "Accommodation", color: "#173F35" },
  { key: "FOOD", label: "Food & drink", color: "#2F6957" },
  { key: "TRANSPORT", label: "Transport", color: "#C99A45" },
  { key: "ACTIVITIES", label: "Activities", color: "#7E8F82" },
  { key: "OTHER", label: "Other", color: "#D8D3C4" },
] as const;

/**
 * Budget summary: category totals, proportional bar, per-entry list and the
 * itinerary's own stop estimates. All arithmetic is rounded to 2dp so the
 * totals always reconcile.
 */
export default function BudgetOverview({
  tripId,
  entries,
  itineraryTotal,
  itineraryCount,
  travellers,
}: {
  tripId: number;
  entries: BudgetEntry[];
  itineraryTotal: number;
  itineraryCount: number;
  travellers: number;
}) {
  const byCategory = CATEGORIES.map((c) => ({
    ...c,
    total: round2(entries.filter((e) => e.category === c.key).reduce((s, e) => s + e.amount, 0)),
  }));
  const budgetTotal = round2(byCategory.reduce((s, c) => s + c.total, 0));
  const grandTotal = round2(budgetTotal + round2(itineraryTotal));
  const max = Math.max(...byCategory.map((c) => c.total), 1);

  return (
    <section className="border border-line bg-white">
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <p className="eyebrow eyebrow-forest">Budget</p>
          <h2 className="mt-1.5 font-display text-2xl text-forest">Estimated costs</h2>
        </div>
        <div className="text-right">
          <p className="text-[0.64rem] uppercase tracking-[0.16em] text-muted">Total estimate</p>
          <p className="font-display text-[1.9rem] leading-none text-forest">{cedis(grandTotal)}</p>
          <p className="mt-1 text-[0.7rem] text-muted">
            {travellers > 1 ? `${cedis(round2(grandTotal / travellers))} per traveller` : "for one traveller"}
          </p>
        </div>
      </header>

      <div className="px-5 py-5">
        {/* Proportional bar */}
        <div className="flex h-2.5 overflow-hidden rounded-full bg-cream-200" role="img" aria-label="Budget split by category">
          {byCategory.map((c) =>
            c.total > 0 ? (
              <span
                key={c.key}
                style={{ width: `${(c.total / (budgetTotal || 1)) * 100}%`, backgroundColor: c.color }}
                title={`${c.label}: ${cedis(c.total)}`}
              />
            ) : null,
          )}
        </div>

        {/* Category rows */}
        <dl className="mt-5 space-y-3">
          {byCategory.map((c) => (
            <div key={c.key}>
              <div className="flex items-center justify-between gap-3 text-[0.82rem]">
                <dt className="flex items-center gap-2 text-ink/80">
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.label}
                </dt>
                <dd className="font-semibold text-forest">{cedis(c.total)}</dd>
              </div>
              <div className="mt-1.5 h-1 bg-cream-200">
                <span
                  className="block h-full"
                  style={{ width: `${(c.total / max) * 100}%`, backgroundColor: c.color }}
                />
              </div>
            </div>
          ))}
        </dl>

        {itineraryTotal > 0 && (
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-[0.82rem]">
            <span className="text-ink/80">
              Itinerary stop estimates
              <span className="ml-1.5 text-[0.72rem] text-muted">({itineraryCount} stops)</span>
            </span>
            <span className="font-semibold text-forest">{cedis(round2(itineraryTotal))}</span>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="text-[0.72rem] uppercase tracking-[0.14em] text-muted">Budget entries</span>
          <span className="font-semibold text-forest">{cedis(budgetTotal)}</span>
        </div>

        {/* Entries */}
        {entries.length > 0 ? (
          <ul className="mt-4 divide-y divide-line border-t border-line">
            {entries.map((entry) => (
              <li key={entry.id} className="flex items-start justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[0.84rem] font-medium text-forest">{entry.label}</p>
                  <p className="text-[0.7rem] text-muted">
                    {CATEGORIES.find((c) => c.key === entry.category)?.label}
                    {entry.notes ? ` · ${entry.notes}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-[0.84rem] font-semibold text-forest">{cedis(entry.amount)}</span>
                  <form action={deleteBudgetEntryAction}>
                    <input type="hidden" name="tripId" value={tripId} />
                    <input type="hidden" name="entryId" value={entry.id} />
                    <button
                      type="submit"
                      className="text-[0.68rem] text-muted underline underline-offset-2 hover:text-[#8C3524]"
                      aria-label={`Remove ${entry.label} from the budget`}
                    >
                      remove
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 border-t border-line pt-4 text-[0.8rem] text-muted">
            No budget entries yet. Add your biggest costs first — accommodation and transport usually set the
            scale.
          </p>
        )}

        {/* Add form */}
        <form action={addBudgetEntryAction} className="mt-5 border-t border-line pt-4">
          <input type="hidden" name="tripId" value={tripId} />
          <p className="mb-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">Add an expense</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <label htmlFor="budget-label" className="field-label">Label</label>
              <input id="budget-label" name="label" required placeholder="Guesthouse, 3 nights" className="field" />
            </div>
            <div>
              <label htmlFor="budget-category" className="field-label">Category</label>
              <select id="budget-category" name="category" className="field">
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="budget-amount" className="field-label">Amount (GH₵)</label>
              <input id="budget-amount" name="amount" type="number" min="0" step="0.01" required placeholder="450" className="field" />
            </div>
            <div>
              <label htmlFor="budget-notes" className="field-label">Note (optional)</label>
              <input id="budget-notes" name="notes" placeholder="Paid on arrival" className="field" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-sm mt-3">Add to budget</button>
        </form>
      </div>
    </section>
  );
}
