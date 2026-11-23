export default function Loading() {
  return (
    <div className="shell pb-20 pt-[calc(var(--header-h)+2.5rem)]">
      <div className="h-4 w-28 rounded-full skeleton" />
      <div className="mt-3 h-10 w-72 max-w-full rounded-xl skeleton" />
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="h-64 rounded-2xl skeleton lg:col-span-2" />
        <div className="h-64 rounded-2xl skeleton" />
      </div>
    </div>
  );
}
