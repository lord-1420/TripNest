"use client";

import { useState } from "react";
import SmartImage from "@/components/common/SmartImage";
import clsx from "clsx";

interface GalleryImage {
  url: string;
  alt: string;
  caption?: string | null;
  credit?: string | null;
}

/**
 * Lead image + thumbnail strip. Keyboard accessible; the lead image is a button
 * that opens a larger lightbox-style view.
 */
export default function ImageGallery({ images, label }: { images: GalleryImage[]; label: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  if (images.length === 0) return null;
  const current = images[active];

  return (
    <div>
      <button
        type="button"
        onClick={() => setZoom(true)}
        className="group relative block w-full overflow-hidden bg-cream-200"
        aria-label={`Open larger view of ${current.alt}`}
      >
        <div className="relative aspect-[16/10]">
          <SmartImage
            src={current.url}
            alt={current.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 62vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
        <span className="absolute bottom-3 right-3 rounded-full bg-ink/60 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.12em] text-cream backdrop-blur">
          Expand
        </span>
      </button>

      {current.caption && (
        <p className="mt-2.5 text-[0.76rem] text-muted">
          {current.caption}
          {current.credit ? ` · Photo: ${current.credit}` : ""}
        </p>
      )}

      {images.length > 1 && (
        /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label={`${label} gallery`}>
          {images.map((img, i) => (
            <button
              key={img.url + i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={img.alt}
              onClick={() => setActive(i)}
              className={clsx(
                "relative h-16 w-24 shrink-0 overflow-hidden border-2 transition",
                i === active ? "border-forest" : "border-transparent opacity-75 hover:opacity-100",
              )}
            >
              <SmartImage src={img.url} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4 bg-ink/95 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} — enlarged photo`}
          onClick={() => setZoom(false)}
          onKeyDown={(e) => e.key === "Escape" && setZoom(false)}
        >
          <div className="relative max-h-[80vh] w-full max-w-5xl" style={{ aspectRatio: "16 / 10" }}>
            <SmartImage src={current.url} alt={current.alt} fill sizes="90vw" className="object-contain" />
          </div>
          <p className="text-center text-xs text-cream/70">{current.caption ?? current.alt}</p>
          <button type="button" onClick={() => setZoom(false)} className="btn btn-ghost-light btn-sm">
            Close
          </button>
        </div>
      )}
    </div>
  );
}
