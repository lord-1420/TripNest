import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { getSession } from "@/lib/auth";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();
  return (
    <>
      <SiteHeader user={user} />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
