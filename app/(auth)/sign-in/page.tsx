import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import SmartImage from "@/components/common/SmartImage";
import Logo from "@/components/brand/Logo";
import { getSession, dashboardHome } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

const DEMO = [
  { role: "Traveller", email: "traveller@tripnest.gh" },
  { role: "Provider", email: "provider@tripnest.gh" },
  { role: "Admin", email: "admin@tripnest.gh" },
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
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-[#0e1412] lg:block">
        <SmartImage
          src="/images/editorial-culture.jpg"
          alt="Ghanaian chiefs on horseback at a festival"
          fill
          priority
          sizes="50vw"
          fallbackTone="light"
          className="object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <Logo tone="light" />
          <div>
            <p className="max-w-md font-sans text-[2rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
              Keep the places you love in one place, then plan around them.
            </p>
            <p className="mt-3 max-w-sm text-[0.9rem] leading-relaxed text-white/70">
              Save destinations and experiences, build a dated itinerary and track your budget in cedis.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 md:px-16 lg:py-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo tone="dark" />
          </div>
          <h1 className="font-sans text-[1.9rem] font-bold tracking-[-0.035em] text-ink">
            Welcome back
          </h1>
          <p className="mt-1.5 text-[0.9rem] text-muted">
            Sign in to access your saved places, trips and budgets.
          </p>
          <div className="mt-7">
            <AuthForm mode="sign-in" next={next} />
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-cream-50 p-4">
            <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-muted">
              Demo accounts
            </p>
            <ul className="mt-2.5 space-y-1.5 text-[0.78rem]">
              {DEMO.map((d) => (
                <li key={d.email} className="flex items-center justify-between gap-3">
                  <span className="text-muted">{d.role}</span>
                  <code className="font-mono text-[0.74rem] text-ink">{d.email}</code>
                </li>
              ))}
            </ul>
            <p className="mt-2.5 border-t border-line pt-2 text-[0.72rem] text-muted">
              Password: <code className="font-mono text-ink">tripnest123</code>
            </p>
          </div>

          <p className="mt-6 text-center text-[0.78rem] text-muted">
            <Link href="/" className="hover:text-ink">
              ← Back to TripNest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
