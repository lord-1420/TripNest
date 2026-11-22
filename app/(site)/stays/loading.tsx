export default function Loading() {
  return (
    <div className="shell pb-16 pt-[calc(var(--header-h)+3rem)]">
      <div className="skeleton h-3 w-24" />
      <div className="skeleton mt-4 h-12 w-2/3" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="skeleton h-[420px] w-full" />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-line bg-white">
              <div className="skeleton aspect-[4/3] w-full" />
              <div className="p-5">
                <div className="skeleton h-2.5 w-24" />
                <div className="skeleton mt-3 h-5 w-3/5" />
                <div className="skeleton mt-2 h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
