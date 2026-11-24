import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Logo from "@/components/brand/Logo";
import { getSession, dashboardHome } from "@/lib/auth";

export const metadata: Metadata = { title: "Create an account" };
export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  const user = await getSession();
  if (user) redirect(dashboardHome(user.role));

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      <div className="relative isolate hidden overflow-hidden bg-[#0e1412] lg:block">
        <BackgroundVideo
          src="/videos/accra-shore.mp4"
          poster="/videos/accra-shore.webp"
          overlayClassName="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25"
          buttonClassName="absolute right-12 top-12 z-10"
          desktopOnly
        />
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <Logo tone="light" />
          <div>
            <p className="max-w-md font-sans text-[2rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
              Plan Ghana with clarity, not spreadsheets.
            </p>
            <ul className="mt-5 space-y-2 text-[0.88rem] text-white/75">
              <li>Save destinations and experiences</li>
              <li>Build day-by-day itineraries</li>
              <li>Estimate costs in Ghana cedis</li>
              <li>List accommodation as a provider</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 md:px-16 lg:py-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo tone="dark" />
          </div>
          <h1 className="font-sans text-[1.9rem] font-bold tracking-[-0.035em] text-ink">
            Create an account
          </h1>
          <p className="mt-1.5 text-[0.9rem] text-muted">
            Free to use — save places and start building your Ghana itinerary.
          </p>
          <div className="mt-7">
            <AuthForm mode="sign-up" />
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
