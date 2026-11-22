"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import clsx from "clsx";

export interface MapPoint {
  id: string;
  name: string;
  sublabel?: string;
  lat: number;
  lng: number;
  href?: string;
  kind: "destination" | "attraction";
  approximate?: boolean;
}

/**
 * Leaflet + OpenStreetMap map. Loaded on the client only so nothing about the
 * map touches the server render. Markers use a custom divIcon (no external
 * marker images), and every marker keeps its real OSM-sourced coordinates.
 */
export default function LeafletMap({
  points,
  center,
  zoom = 7,
  height = "460px",
  selectedId,
  onSelect,
  className,
  interactive = true,
}: {
  points: MapPoint[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  className?: string;
  interactive?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const [ready, setReady] = useState(false);

  // Init once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: center ?? [7.95, -1.03],
        zoom,
        scrollWheelZoom: false,
        zoomControl: interactive,
        attributionControl: true,
        dragging: interactive,
        doubleClickZoom: interactive,
        keyboard: interactive,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapRef.current = map;
      setReady(true);
    })();
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = {};
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render markers
  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      const map = mapRef.current;
      if (!map || cancelled) return;

      Object.values(markersRef.current).forEach((m: any) => m.remove());
      markersRef.current = {};

      points.forEach((p) => {
        const isDestination = p.kind === "destination";
        const html = `
          <span class="tn-pin ${isDestination ? "tn-pin-dest" : "tn-pin-attr"}">
            <span class="tn-pin-dot"></span>
          </span>`;
        const icon = L.divIcon({
          html,
          className: "tn-pin-wrap",
          iconSize: isDestination ? [22, 22] : [16, 16],
          iconAnchor: isDestination ? [11, 11] : [8, 8],
        });
        const marker = L.marker([p.lat, p.lng], { icon, title: p.name, alt: p.name }).addTo(map);
        const popupHtml = `
          <div style="font-family:var(--font-sans, sans-serif);min-width:180px">
            <p style="margin:0 0 2px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#73776F">
              ${p.kind === "destination" ? p.sublabel ?? "Destination" : "Experience"}
            </p>
            <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:16px;color:#173F35">${p.name}</p>
            ${p.href ? `<a href="${p.href}" style="font-size:12px;font-weight:600;color:#173F35;text-decoration:underline">View details →</a>` : ""}
          </div>`;
        marker.bindPopup(popupHtml);
        marker.on("click", () => onSelect?.(p.id));
        markersRef.current[p.id] = marker;
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [points, ready, onSelect]);

  // Fly to selection
  useEffect(() => {
    if (!ready || !selectedId) return;
    const map = mapRef.current;
    const marker = markersRef.current[selectedId];
    const point = points.find((p) => p.id === selectedId);
    if (map && point) {
      map.flyTo([point.lat, point.lng], Math.max(map.getZoom(), 10), { duration: 0.8 });
      if (marker) marker.openPopup();
    }
  }, [selectedId, ready, points]);

  return (
    <div className={clsx("relative overflow-hidden border border-line bg-cream-200", className)}>
      <div ref={containerRef} style={{ height }} role="application" aria-label="Map of Ghanaian destinations and experiences" />
      {!ready && <div className="skeleton absolute inset-0" aria-hidden />}
      <style jsx global>{`
        .tn-pin-wrap {
          background: transparent;
          border: 0;
        }
        .tn-pin {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          box-shadow: 0 2px 10px rgba(23, 63, 53, 0.4);
          border: 2px solid #f7f4ec;
          transition: transform 0.2s ease;
        }
        .tn-pin:hover {
          transform: scale(1.15);
        }
        .tn-pin-dest {
          width: 22px;
          height: 22px;
          background: #173f35;
        }
        .tn-pin-attr {
          width: 16px;
          height: 16px;
          background: #c99a45;
        }
        .tn-pin-dot {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: #f7f4ec;
        }
        .leaflet-container {
          font-family: var(--font-sans, sans-serif);
          background: #eae6db;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 4px;
          box-shadow: 0 18px 40px -24px rgba(23, 63, 53, 0.65);
        }
        .leaflet-popup-content {
          margin: 10px 12px;
        }
        .leaflet-control-attribution {
          font-size: 9px !important;
          background: rgba(247, 244, 236, 0.9) !important;
        }
      `}</style>
    </div>
  );
}
