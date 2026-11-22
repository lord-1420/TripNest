import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import SmartImage from "@/components/common/SmartImage";
import { LogoMark } from "@/components/brand/Logo";
import { getSession, dashboardHome } from "@/lib/auth";

export const metadata: Metadata = { title: "Create an account" };
export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  const user = await getSession();
  if (user) redirect(dashboardHome(user.role));

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-forest lg:block">
        <SmartImage
          src="/images/dest-ada-foah.jpg"
          alt="Palms standing in still water at the Volta estuary"
          fill
          priority
          sizes="50vw"
          fallbackTone="light"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/45 to-forest/15" />
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <Link href="/" className="inline-flex items-center gap-2.5 text-cream">
            <LogoMark tone="light" size={30} />
            <span className="font-display text-[1.35rem]">TripNest</span>
          </Link>
          <div>
            <p className="eyebrow eyebrow-light">Free to use</p>
            <p className="mt-3 max-w-sm font-display text-[2rem] leading-tight text-cream">
              Discovering Ghana becomes planning an unforgettable journey.
            </p>
            <ul className="mt-6 space-y-2 text-[0.86rem] text-cream/70">
              <li>· Save destinations and experiences</li>
              <li>· Build day-by-day itineraries</li>
              <li>· Estimate costs in Ghana cedis</li>
              <li>· List accommodation as a provider</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 md:px-16 lg:py-16">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-forest lg:hidden">
            <LogoMark size={26} />
            <span className="font-display text-[1.25rem]">TripNest</span>
          </Link>
          <h1 className="display text-[2.1rem] leading-tight text-forest">Start your journey.</h1>
          <p className="mt-2 text-[0.9rem] text-muted">
            Create a free account to save places and start planning.
          </p>
          <div className="mt-7">
            <AuthForm mode="sign-up" />
          </div>
        </div>
      </div>
    </div>
  );
}
