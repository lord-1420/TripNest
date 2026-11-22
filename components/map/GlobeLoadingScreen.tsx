"use client";

export default function GlobeLoadingScreen({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#071714]/90 backdrop-blur-sm">
      <div className="max-w-xs px-6 text-center text-cream">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/35 bg-gold/[0.08]">
          <span className="tn-globe-loader block h-9 w-9 rounded-full border border-gold/80 border-r-transparent" />
        </div>
        <p className="eyebrow eyebrow-light mt-6">TripNest Atlas</p>
        <p className="mt-2 font-display text-2xl">Preparing your journey</p>
        <p className="mt-2 text-sm text-cream/65">{label}</p>
        <div className="mx-auto mt-5 h-px w-36 overflow-hidden bg-cream/15">
          <span className="tn-loading-line block h-full w-1/3 bg-gold" />
        </div>
      </div>
    </div>
  );
}
