import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";

export const metadata: Metadata = { title: "Terms of use" };

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of use"
        description="Plain-language terms for using TripNest. This development build is provided for evaluation and is not a commercial booking service."
      />
      <section className="shell prose-editorial body-copy max-w-3xl py-12 md:py-16">
        <h2 className="display text-display-sm mb-3">1. What TripNest is</h2>
        <p>
          TripNest is a travel discovery and planning platform focused on Ghana. It publishes editorial
          destination guides, attraction records and accommodation listings submitted by providers, and it
          offers tools for saving places, building itineraries and estimating costs.
        </p>
        <h2 className="display text-display-sm mb-3 mt-8">2. What TripNest is not</h2>
        <p>
          TripNest is not a travel agent, tour operator or booking platform. We do not take payments, hold
          reservations or guarantee availability, prices or opening hours. An enquiry sent to a provider is
          not a confirmed booking. Any agreement you reach with a provider is between you and them.
        </p>
        <h2 className="display text-display-sm mb-3 mt-8">3. Content accuracy</h2>
        <p>
          Destination and attraction content in this build is seed content awaiting editorial verification.
          Travel information changes — seasonal conditions, transport, fees and access can all vary. Always
          confirm current details locally before you travel, and check your own government&apos;s travel advice.
        </p>
        <h2 className="display text-display-sm mb-3 mt-8">4. Accounts</h2>
        <p>
          You are responsible for the accuracy of information you submit and for keeping your account
          credentials secure. Provider accounts must only submit listings for properties they are authorised
          to represent. Administrators may reject, unpublish or remove content that is inaccurate or
          misleading.
        </p>
        <h2 className="display text-display-sm mb-3 mt-8">5. Acceptable use</h2>
        <p>
          Do not scrape the platform at volume, attempt to access accounts or administrative functions you are
          not authorised to use, or submit content that is unlawful, misleading or infringes someone
          else&apos;s rights. Photography on TripNest is licensed to its authors — see{" "}
          <Link href="/credits" className="underline decoration-line underline-offset-2">credits</Link> — and
          may not be reused without respecting those licences.
        </p>
        <h2 className="display text-display-sm mb-3 mt-8">6. Estimates and budgets</h2>
        <p>
          Budget figures are your own estimates entered into the planner. TripNest performs the arithmetic but
          does not validate costs. They are planning aids, not financial advice or quotations.
        </p>
        <h2 className="display text-display-sm mb-3 mt-8">7. Changes</h2>
        <p>
          These terms may be updated as the platform develops. Continued use after an update means you accept
          the revised terms. This document is a template for a development build and is not legal advice.
        </p>
        <p className="mt-8 text-[0.78rem] text-muted">Last updated: {new Date().getFullYear()}.</p>
      </section>
    </>
  );
}
