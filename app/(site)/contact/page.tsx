import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact TripNest about destination content, provider listings, corrections or partnerships.",
};

const CHANNELS = [
  {
    title: "General enquiries",
    email: "hello@tripnest.example",
    body: "Questions about the platform, the planner or the discovery tools.",
  },
  {
    title: "Corrections & editorial",
    email: "editorial@tripnest.example",
    body: "Something inaccurate in a guide? Tell us the destination and what needs fixing — we would rather be corrected than wrong.",
  },
  {
    title: "Providers",
    email: "providers@tripnest.example",
    body: "Listing a hostel, hotel or apartment, or updating details on an existing listing.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to TripNest"
        description="TripNest is developed in Kumasi. These addresses are routed to the development team for this build; provider enquiries about accommodation should always go directly to the property concerned."
      />

      <section className="shell py-14 md:py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {CHANNELS.map((c) => (
            <div key={c.title} className="border border-line bg-white p-6">
              <h2 className="font-display text-[1.25rem] text-forest">{c.title}</h2>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">{c.body}</p>
              <a
                href={`mailto:${c.email}`}
                className="mt-4 inline-flex text-[0.82rem] font-semibold text-forest underline decoration-line underline-offset-4 hover:text-gold-600"
              >
                {c.email}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="display text-display-md">Frequently asked</h2>
            <dl className="mt-5 divide-hair">
              {[
                {
                  q: "Can I book accommodation through TripNest?",
                  a: "No. TripNest does not take bookings or payments. Each listing links to the provider's phone, WhatsApp or email so you can confirm availability directly.",
                },
                {
                  q: "Why are prices shown if they are not bookable?",
                  a: "Nightly rates help you judge whether a place fits your budget. They are indicative and confirmed by the provider — treat them as a guide, not a quote.",
                },
                {
                  q: "How do I list a property?",
                  a: "Create a provider account, then use the provider dashboard to add the property. An administrator reviews it before it goes live.",
                },
                {
                  q: "Something in a guide is wrong.",
                  a: "Email editorial@tripnest.example with the destination, the section and the correction. Verified corrections are applied through the admin console.",
                },
              ].map((item) => (
                <div key={item.q} className="py-4">
                  <dt className="font-display text-[1.15rem] text-forest">{item.q}</dt>
                  <dd className="mt-1.5 text-[0.88rem] leading-relaxed text-muted">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="border border-line bg-cream-50 p-6">
            <h2 className="font-display text-xl text-forest">Where we are</h2>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
              TripNest is built and maintained in Kumasi, Ashanti Region, Ghana. We do not operate a walk-in
              office for travellers — accommodation and transport questions should go to the providers
              themselves.
            </p>
            <Link href="/about" className="mt-4 inline-flex link-underline text-sm">
              About TripNest <span aria-hidden>→</span>
            </Link>
            <div className="mt-6 border-t border-line pt-4">
              <p className="text-[0.72rem] uppercase tracking-[0.16em] text-muted">Response times</p>
              <p className="mt-1.5 text-[0.86rem] text-ink/80">
                This is a development build; email addresses use the reserved <code>.example</code> domain and
                do not accept mail. Production addresses are configured at deployment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
