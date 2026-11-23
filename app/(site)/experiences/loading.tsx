export default function Loading() {
  return (
    <div className="shell pb-20 pt-[calc(var(--header-h)+2.5rem)]">
      <div className="h-4 w-28 rounded-full skeleton" />
      <div className="mt-3 h-10 w-80 max-w-full rounded-xl skeleton" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[4/3] rounded-2xl skeleton" />
            <div className="h-4 w-2/3 rounded-md skeleton" />
            <div className="h-3.5 w-1/2 rounded-md skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}
