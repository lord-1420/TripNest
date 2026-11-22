"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { ExplorerLocation } from "./explorer-types";

export interface DestinationGlobeHandle {
  focus: (location: ExplorerLocation) => void;
  overview: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

interface Props {
  ionToken: string;
  locations: ExplorerLocation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onReady: () => void;
  onError: (message: string) => void;
}

const WEST_AFRICA = [-1.1, 8.1] as const;
const DEG = Math.PI / 180;

function fly(viewer: any, Cesium: any, destination: [number, number, number], duration: number) {
  if (!viewer || viewer.isDestroyed()) return Promise.resolve();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [longitude, latitude, range] = destination;
  const target = Cesium.Cartesian3.fromDegrees(longitude, latitude, 0);
  return new Promise<void>((resolve) => {
    viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(target, 1), {
      offset: new Cesium.HeadingPitchRange(0, -68 * DEG, range),
      duration: reducedMotion ? 0.12 : duration,
      complete: resolve,
      cancel: resolve,
    });
  });
}

const DestinationGlobe = forwardRef<DestinationGlobeHandle, Props>(function DestinationGlobe(
  { ionToken, locations, selectedId, onSelect, onHover, onReady, onError },
  forwardedRef,
) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<any>(null);
  const CesiumRef = useRef<any>(null);
  const markerEntitiesRef = useRef<Record<string, { pin: any; halo: any }>>({});
  const onSelectRef = useRef(onSelect);
  const onHoverRef = useRef(onHover);
  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);
  const [viewerReady, setViewerReady] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  onSelectRef.current = onSelect;
  onHoverRef.current = onHover;
  onReadyRef.current = onReady;
  onErrorRef.current = onError;

  const focus = useCallback((location: ExplorerLocation) => {
    const viewer = viewerRef.current;
    const Cesium = CesiumRef.current;
    if (!viewer || !Cesium) return;
    void fly(viewer, Cesium, [location.lng, location.lat, 115_000], 1.8);
  }, []);

  const overview = useCallback(() => {
    const viewer = viewerRef.current;
    const Cesium = CesiumRef.current;
    if (!viewer || !Cesium) return;
    void fly(viewer, Cesium, [WEST_AFRICA[0], WEST_AFRICA[1], 1_900_000], 1.7);
  }, []);

  const zoomIn = useCallback(() => viewerRef.current?.camera.zoomIn(65_000), []);
  const zoomOut = useCallback(() => viewerRef.current?.camera.zoomOut(65_000), []);

  useImperativeHandle(forwardedRef, () => ({ focus, overview, zoomIn, zoomOut }), [focus, overview, zoomIn, zoomOut]);

  useEffect(() => {
    let cancelled = false;
    let viewer: any = null;
    let handler: any = null;
    let resizeViewer: (() => void) | null = null;

    async function initialise() {
      if (!ionToken) {
        onErrorRef.current("Add NEXT_PUBLIC_CESIUM_ION_TOKEN to enable the 3D globe.");
        return;
      }
      try {
        (window as Window & { CESIUM_BASE_URL?: string }).CESIUM_BASE_URL = "/cesium/";
        const Cesium = await import("cesium");
        if (cancelled || !hostRef.current) return;
        CesiumRef.current = Cesium;
        Cesium.Ion.defaultAccessToken = ionToken;

        // Request Cesium ion imagery before creating the viewer so invalid tokens
        // fail into the visible, real OpenStreetMap fallback instead of a blank globe.
        const imagery = await Cesium.IonImageryProvider.fromAssetId(2);
        if (cancelled || !hostRef.current) return;

        viewer = new Cesium.Viewer(hostRef.current, {
          baseLayer: false,
          terrain: Cesium.Terrain.fromWorldTerrain({ requestVertexNormals: true }),
          animation: false,
          timeline: false,
          baseLayerPicker: false,
          geocoder: false,
          homeButton: false,
          sceneModePicker: false,
          navigationHelpButton: false,
          fullscreenButton: false,
          selectionIndicator: false,
          infoBox: false,
          requestRenderMode: true,
          maximumRenderTimeChange: Infinity,
          shouldAnimate: false,
        });
        viewer.imageryLayers.addImageryProvider(imagery);
        viewer.scene.backgroundColor = Cesium.Color.fromCssColorString("#071714");
        viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString("#1c3f35");
        // Keep satellite imagery evenly readable at the Ghana overview. Cesium's
        // physical night shading can otherwise put West Africa in deep shadow.
        viewer.scene.globe.enableLighting = false;
        viewer.scene.globe.showGroundAtmosphere = true;
        viewer.scene.skyAtmosphere.show = true;
        viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString("#345b4c");
        viewer.scene.globe.depthTestAgainstTerrain = true;

        // Fine graticule linework gives the globe a readable cartographic frame
        // without competing with the highlighted Ghana destinations.
        const gridColor = Cesium.Color.fromCssColorString("#e7e0d0").withAlpha(0.34);
        const accentColor = Cesium.Color.fromCssColorString("#edc879").withAlpha(0.62);
        for (let latitude = -75; latitude <= 75; latitude += 15) {
          const coordinates: number[] = [];
          for (let longitude = -180; longitude <= 180; longitude += 3) {
            coordinates.push(longitude, latitude);
          }
          viewer.entities.add({
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArray(coordinates),
              width: latitude === 0 ? 1.7 : 1,
              material: latitude === 0 ? accentColor : gridColor,
              arcType: Cesium.ArcType.GEODESIC,
            },
          });
        }
        for (let longitude = -180; longitude < 180; longitude += 15) {
          const coordinates: number[] = [];
          for (let latitude = -80; latitude <= 80; latitude += 3) {
            coordinates.push(longitude, latitude);
          }
          viewer.entities.add({
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArray(coordinates),
              width: longitude === 0 ? 1.6 : 1,
              material: longitude === 0 ? accentColor : gridColor,
              arcType: Cesium.ArcType.GEODESIC,
            },
          });
        }

        // Natural Earth country and regional outlines give the West Africa view
        // a recognizable shape and keep terrain readable at the Ghana zoom level.
        const [ghanaOutline, ghanaRegions] = await Promise.all([
          Cesium.GeoJsonDataSource.load("/geo/ghana-boundary.geojson", {
            clampToGround: true,
            stroke: Cesium.Color.fromCssColorString("#f4ca76"),
            strokeWidth: 5,
            fill: Cesium.Color.fromCssColorString("#c99a45").withAlpha(0.035),
          }),
          Cesium.GeoJsonDataSource.load("/geo/ghana-regions.geojson", {
            clampToGround: true,
            stroke: Cesium.Color.fromCssColorString("#fff2d5").withAlpha(0.92),
            strokeWidth: 2,
            fill: Cesium.Color.fromCssColorString("#d6c9a8").withAlpha(0.018),
          }),
        ]);
        if (cancelled) return;
        await viewer.dataSources.add(ghanaRegions);
        await viewer.dataSources.add(ghanaOutline);

        resizeViewer = () => {
          const compact = window.matchMedia("(max-width: 767px)").matches;
          viewer.resolutionScale = Math.min(window.devicePixelRatio || 1, compact ? 1.1 : 1.5);
          viewer.scene.globe.maximumScreenSpaceError = compact ? 3 : 2.2;
          viewer.scene.requestRender();
        };
        resizeViewer();
        window.addEventListener("resize", resizeViewer, { passive: true });
        viewer.scene.screenSpaceCameraController.minimumZoomDistance = 35_000;
        viewer.scene.screenSpaceCameraController.maximumZoomDistance = 24_000_000;
        viewer.entities.add({
          id: "ghana-country-label",
          position: Cesium.Cartesian3.fromDegrees(-1.2, 7.9, 72_000),
          label: {
            text: "GHANA",
            font: "700 18px Manrope, sans-serif",
            fillColor: Cesium.Color.fromCssColorString("#f1e4cb"),
            outlineColor: Cesium.Color.fromCssColorString("#10231f"),
            outlineWidth: 4,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            show: true,
            scaleByDistance: new Cesium.NearFarScalar(750_000, 1, 5_000_000, 0),
          },
        });
        viewerRef.current = viewer;

        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction((event: { position: any }) => {
          const picked = viewer.scene.pick(event.position);
          const rawId = picked?.id?.id;
          const id = typeof rawId === "string" ? rawId.replace(/-halo$/, "") : null;
          const locationId = locations.some((item) => `${item.kind}-${item.slug}` === id) ? id : null;
          setHoveredId(locationId);
          onHoverRef.current(locationId);
          viewer.scene.canvas.style.cursor = locationId ? "pointer" : "grab";
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.setInputAction((event: { position: any }) => {
          const picked = viewer.scene.pick(event.position);
          const rawId = picked?.id?.id;
          const id = typeof rawId === "string" ? rawId.replace(/-halo$/, "") : null;
          if (id && locations.some((item) => `${item.kind}-${item.slug}` === id)) {
            onSelectRef.current(id);
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // The flight is a short opening sequence, then the controls are fully manual.
        await fly(viewer, Cesium, [-7, 9, 13_500_000], 2.2);
        if (cancelled) return;
        await fly(viewer, Cesium, [-2, 8, 5_200_000], 1.8);
        if (cancelled) return;
        await fly(viewer, Cesium, [WEST_AFRICA[0], WEST_AFRICA[1], 1_900_000], 1.8);
        if (cancelled) return;
        setViewerReady(true);
        onReadyRef.current();
      } catch (error) {
        if (cancelled) return;
        const message = error instanceof Error ? error.message : "Cesium ion could not load map imagery.";
        onErrorRef.current(`The 3D globe could not load. ${message}`);
      }
    }

    void initialise();
    return () => {
      cancelled = true;
      if (resizeViewer) window.removeEventListener("resize", resizeViewer);
      if (handler && !handler.isDestroyed()) handler.destroy();
      if (viewer && !viewer.isDestroyed()) viewer.destroy();
      viewerRef.current = null;
      CesiumRef.current = null;
      markerEntitiesRef.current = {};
    };
    // The points are applied in a separate effect; the viewer is created only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ionToken]);

  useEffect(() => {
    const viewer = viewerRef.current;
    const Cesium = CesiumRef.current;
    if (!viewerReady || !viewer || !Cesium) return;

    Object.values(markerEntitiesRef.current).forEach(({ pin, halo }) => {
      viewer.entities.remove(pin);
      viewer.entities.remove(halo);
    });
    const entities: Record<string, { pin: any; halo: any }> = {};

    for (const location of locations) {
      const id = `${location.kind}-${location.slug}`;
      const position = Cesium.Cartesian3.fromDegrees(location.lng, location.lat, 220);
      const halo = viewer.entities.add({
        id: `${id}-halo`,
        position,
        point: {
          pixelSize: 18,
          color: Cesium.Color.fromCssColorString("#c99a45").withAlpha(0.16),
          outlineWidth: 0,
        },
      });
      const pin = viewer.entities.add({
        id,
        name: location.name,
        position,
        properties: { explorerId: id },
        point: {
          pixelSize: 9,
          color: location.kind === "destination"
            ? Cesium.Color.fromCssColorString("#c99a45")
            : Cesium.Color.fromCssColorString("#f1e4cb"),
          outlineColor: Cesium.Color.fromCssColorString("#fbfaf5"),
          outlineWidth: 1.5,
          scaleByDistance: new Cesium.NearFarScalar(250_000, 1.2, 8_000_000, 0.6),
        },
        label: {
          text: location.name,
          font: "600 13px Manrope, sans-serif",
          fillColor: Cesium.Color.fromCssColorString("#fbfaf5"),
          outlineColor: Cesium.Color.fromCssColorString("#102820"),
          outlineWidth: 3,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cesium.Cartesian2(0, -25),
          show: false,
          scaleByDistance: new Cesium.NearFarScalar(200_000, 1, 3_500_000, 0),
        },
      });
      entities[id] = { pin, halo };
    }
    markerEntitiesRef.current = entities;
    viewer.scene.requestRender();
  }, [locations, viewerReady]);

  useEffect(() => {
    const viewer = viewerRef.current;
    const Cesium = CesiumRef.current;
    if (!viewerReady || !viewer || !Cesium) return;
    const activeId = selectedId ?? hoveredId;
    for (const [id, { pin, halo }] of Object.entries(markerEntitiesRef.current)) {
      const active = id === selectedId || id === hoveredId;
      if (pin.point) {
        pin.point.pixelSize = active ? 15 : 9;
        pin.label.show = active;
      }
      if (halo.point) {
        halo.point.pixelSize = active ? 28 : 16;
        halo.point.color = Cesium.Color.fromCssColorString("#c99a45").withAlpha(active ? 0.32 : 0.18);
      }
    }
    viewer.scene.requestRender();
    if (!activeId) return;

    // Animate only the selected/hovered halo and request frames only while it pulses.
    const started = performance.now();
    let frame = 0;
    const activeHalo = markerEntitiesRef.current[activeId]?.halo;
    const pulse = (now: number) => {
      if (!activeHalo?.point || viewer.isDestroyed() || document.hidden) return;
      const wave = (1 + Math.sin((now - started) / 330)) / 2;
      activeHalo.point.pixelSize = 25 + wave * 9;
      activeHalo.point.color = Cesium.Color.fromCssColorString("#c99a45").withAlpha(0.2 + wave * 0.22);
      viewer.scene.requestRender();
      frame = window.requestAnimationFrame(pulse);
    };
    frame = window.requestAnimationFrame(pulse);
    return () => window.cancelAnimationFrame(frame);
  }, [hoveredId, selectedId, viewerReady]);

  return (
    <div ref={hostRef} className="absolute inset-0 h-full w-full overflow-hidden" aria-label="Interactive 3D globe of Ghana" />
  );
});

export default DestinationGlobe;
