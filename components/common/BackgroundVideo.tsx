"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundVideo({
  src,
  poster,
  overlayClassName,
  buttonClassName,
  desktopOnly = false,
  onEnded,
}: {
  src: string;
  poster: string;
  overlayClassName: string;
  buttonClassName?: string;
  desktopOnly?: boolean;
  onEnded?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [failedSource, setFailedSource] = useState<string>();

  useEffect(() => {
    const preference = window.matchMedia(
      desktopOnly
        ? "(prefers-reduced-motion: no-preference) and (min-width: 1024px)"
        : "(prefers-reduced-motion: no-preference)",
    );
    const sync = () => {
      setMotionAllowed(preference.matches);
      if (!preference.matches) setPlaying(false);
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, [desktopOnly]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().then(() => setAutoplay(true)).catch(() => {});
    } else {
      setAutoplay(false);
      video.pause();
    }
  }

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <video
          key={src}
          ref={videoRef}
          src={motionAllowed && failedSource !== src ? src : undefined}
          poster={poster}
          autoPlay={motionAllowed && autoplay}
          muted
          playsInline
          loop={!onEnded}
          preload="none"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            if (motionAllowed) setFailedSource(src);
          }}
          onEnded={onEnded}
          className="h-full w-full object-cover"
        />
        <div className={overlayClassName} />
      </div>
      {motionAllowed && failedSource !== src && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 ${buttonClassName ?? ""}`}
        >
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            {playing ? (
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            ) : (
              <path d="M6 4l15 8-15 8z" />
            )}
          </svg>
        </button>
      )}
    </>
  );
}
