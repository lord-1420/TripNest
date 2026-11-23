"use client";

export default function GlobeLoadingScreen({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0b1210]/90 backdrop-blur-sm">
      <div className="max-w-xs px-6 text-center text-white">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5">
          <span className="tn-globe-loader block h-6 w-6 rounded-full border-2 border-white/80 border-r-transparent" />
        </div>
        <p className="mt-5 font-sans text-lg font-semibold tracking-tight text-white">
          Loading 3D Ghana
        </p>
        <p className="mt-1.5 text-[0.82rem] text-white/65">{label}</p>
        <div className="mx-auto mt-5 h-0.5 w-32 overflow-hidden rounded-full bg-white/15">
          <span className="tn-loading-line block h-full w-1/3 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
