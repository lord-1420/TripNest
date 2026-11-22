import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import SmartImage from "@/components/common/SmartImage";
import { LogoMark } from "@/components/brand/Logo";
import { getSession, dashboardHome } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

const DEMO = [
  { role: "Traveller", email: "traveller@tripnest.gh" },
  { role: "Provider", email: "provider@tripnest.gh" },
  { role: "Administrator", email: "admin@tripnest.gh" },
];

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await getSession();
  if (user) redirect(dashboardHome(user.role));
  const { next } = await searchParams;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-forest lg:block">
        <SmartImage
          src="/images/editorial-culture.jpg"
          alt="Ghanaian chiefs on horseback at a festival"
          fill
          priority
          sizes="50vw"
          fallbackTone="light"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-forest/20" />
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <Link href="/" className="inline-flex items-center gap-2.5 text-cream">
            <LogoMark tone="light" size={30} />
            <span className="font-display text-[1.35rem]">TripNest</span>
          </Link>
          <div>
            <p className="eyebrow eyebrow-light">Discovery to itinerary</p>
            <p className="mt-3 max-w-sm font-display text-[2rem] leading-tight text-cream">
              Keep the places you love in one place, then plan around them.
            </p>
            <p className="mt-4 max-w-sm text-[0.86rem] leading-relaxed text-cream/60">
              Save destinations and experiences, build a dated itinerary and estimate the cost in cedis.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 md:px-16 lg:py-16">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-forest lg:hidden">
            <LogoMark size={26} />
            <span className="font-display text-[1.25rem]">TripNest</span>
          </Link>
          <h1 className="display text-[2.1rem] leading-tight text-forest">Welcome back.</h1>
          <p className="mt-2 text-[0.9rem] text-muted">
            Sign in to reach your saved places, trips and budgets.
          </p>
          <div className="mt-7">
            <AuthForm mode="sign-in" next={next} />
          </div>

          <div className="mt-8 border border-line bg-white/70 p-4">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">
              Development demo accounts
            </p>
            <ul className="mt-2 space-y-1 text-[0.78rem] text-ink/80">
              {DEMO.map((d) => (
                <li key={d.email} className="flex items-center justify-between gap-3">
                  <span className="text-muted">{d.role}</span>
                  <code className="text-[0.74rem] text-forest">{d.email}</code>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[0.72rem] text-muted">
              Password for all demo accounts: <code className="text-forest">tripnest123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
