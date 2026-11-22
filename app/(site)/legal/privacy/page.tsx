import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        description="What TripNest stores, why, and how you can remove it. Written to match what the application actually does."
      />
      <section className="shell prose-editorial body-copy max-w-3xl py-12 md:py-16">
        <h2 className="display text-display-sm mb-3">What we store</h2>
        <p>
          If you create an account we store your name, email address and a securely hashed password. Signing in
          sets a single httpOnly session cookie containing a signed token — no tracking cookies and no
          third-party analytics scripts in this build.
        </p>
        <h2 className="display text-display-sm mb-3 mt-8">Your trips and saved places</h2>
        <p>
          Saved destinations, saved experiences, trips, itinerary entries and budget entries are stored against
          your account so they persist between devices. They are visible only to you, except to administrators
          for platform maintenance such as aggregated statistics.
        </p>
        <h2 className="display text-display-sm mb-3 mt-8">Provider listings</h2>
        <p>
          If you register as a provider, the listing details and contact information you submit are shown
          publicly once an administrator approves the listing. Do not submit contact details you do not want
          published.
        </p>
        <h2 className="display text-display-sm mb-3 mt-8">Device storage</h2>
        <p>
          Destination packing checklists are stored in your browser&apos;s local storage so you can tick items
          off without an account. That data never leaves your device and clears when you clear site data.
        </p>
        <h2 className="display text-display-sm mb-3 mt-8">Maps</h2>
        <p>
          Maps are rendered with Leaflet using OpenStreetMap tiles. When a map loads, your browser requests
          tiles from OpenStreetMap&apos;s servers, which will see your IP address as part of that request.
        </p>
        <h2 className="display text-display-sm mb-3 mt-8">Your choices</h2>
        <p>
          You can delete a trip at any time from the trip planner. To remove your account and its data, contact{" "}
          <a href="mailto:hello@tripnest.example" className="underline decoration-line underline-offset-2">
            hello@tripnest.example
          </a>
          . In production, deletion requests are actioned by an administrator through the user management
          console.
        </p>
        <h2 className="display text-display-sm mb-3 mt-8">Contact</h2>
        <p>
          Questions about this policy can go to{" "}
          <Link href="/contact" className="underline decoration-line underline-offset-2">the contact page</Link>.
          This document is a template for a development build and is not legal advice.
        </p>
      </section>
    </>
  );
}
