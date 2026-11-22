export default function Loading() {
  return (
    <div className="shell pb-16 pt-[calc(var(--header-h)+3rem)]">
      <div className="max-w-lg">
        <div className="skeleton h-3 w-28" />
        <div className="skeleton mt-4 h-12 w-full" />
        <div className="skeleton mt-3 h-4 w-3/4" />
      </div>
      <div className="skeleton mt-8 h-32 w-full" />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-line bg-white">
            <div className="skeleton aspect-[4/3] w-full" />
            <div className="p-5">
              <div className="skeleton h-2.5 w-20" />
              <div className="skeleton mt-3 h-6 w-3/5" />
              <div className="skeleton mt-3 h-3 w-full" />
              <div className="skeleton mt-2 h-3 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
