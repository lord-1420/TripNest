import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("/dashboard");
  return <DashboardShell user={user}>{children}</DashboardShell>;
}
