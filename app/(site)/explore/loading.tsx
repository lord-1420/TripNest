export default function Loading() {
  return (
    <div className="flex min-h-[calc(100svh-var(--header-h))] items-center justify-center bg-[#0b1210] pt-[var(--header-h)] text-white">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/65">
          Loading 3D Ghana Explorer…
        </p>
      </div>
    </div>
  );
}
