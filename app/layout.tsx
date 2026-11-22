import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "cesium/Build/Cesium/Widgets/widgets.css";

const display = localFont({
  src: [
    { path: "../public/fonts/dm-serif-display-normal-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/dm-serif-display-italic-400-latin.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const sans = localFont({
  src: [
    { path: "../public/fonts/manrope-normal-200_800-latin.woff2", weight: "200 800", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "TripNest — Discover Ghana, plan the journey",
    template: "%s · TripNest",
  },
  description:
    "Explore Ghanaian destinations, hidden gems and places to stay, then turn them into a trip with an itinerary and a budget. TripNest is where discovering Ghana becomes planning an unforgettable journey.",
  keywords: ["Ghana travel", "Ghana destinations", "TripNest", "Ghana itinerary", "Ghana accommodation"],
  openGraph: {
    title: "TripNest — Discover Ghana, plan the journey",
    description:
      "Destinations, hidden gems, stays and trip planning for travel across Ghana.",
    type: "website",
    images: ["/images/editorial-hero.jpg"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
