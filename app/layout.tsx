import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TopProgressBar from "@/components/site/TopProgressBar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
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
    <html lang="en" className={`${jakarta.variable} ${mono.variable}`}>
      <body className="bg-white text-ink antialiased selection:bg-forest/10 selection:text-forest">
        <Suspense fallback={null}>
          <TopProgressBar />
        </Suspense>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
