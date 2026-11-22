import Badge from "@/components/ui/Badge";
import { setUserRoleAction } from "@/lib/actions/admin";
import { requireRole } from "@/lib/auth";
import { allUsers } from "@/lib/queries";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = { title: "User management" };

export default async function AdminUsers() {
  const me = await requireRole("ADMIN", "/dashboard/admin/users");
  const users = allUsers();

  return (
    <div>
      <header>
        <p className="eyebrow eyebrow-forest">Accounts</p>
        <h1 className="mt-2 display text-[clamp(1.8rem,2.6vw,2.3rem)] text-forest">Users &amp; roles</h1>
        <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-muted">
          Roles control what a dashboard can do: travellers plan trips, providers manage listings,
          administrators review content. You cannot demote your own account.
        </p>
      </header>

      <div className="mt-6 overflow-x-auto border border-line bg-white">
        <table className="w-full min-w-[720px] text-left text-[0.84rem]">
          <thead className="border-b border-line bg-cream-50 text-[0.64rem] uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Joined</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Change role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-cream/40">
                <td className="px-4 py-3 font-medium text-forest">{u.name}</td>
                <td className="px-4 py-3 text-muted">{u.email}</td>
                <td className="px-4 py-3 text-muted">{formatDate(u.created_at.slice(0, 10))}</td>
                <td className="px-4 py-3">
                  <Badge tone={u.role === "ADMIN" ? "forest" : u.role === "PROVIDER" ? "gold" : "muted"}>{u.role}</Badge>
                </td>
                <td className="px-4 py-3">
                  <form action={setUserRoleAction} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={u.id} />
                    <select
                      name="role"
                      defaultValue={u.role}
                      className="field h-[34px] w-auto py-0 text-[0.78rem]"
                      disabled={u.id === me.id}
                      aria-label={`Role for ${u.name}`}
                    >
                      <option value="TRAVELLER">Traveller</option>
                      <option value="PROVIDER">Provider</option>
                      <option value="ADMIN">Administrator</option>
                    </select>
                    <button
                      type="submit"
                      disabled={u.id === me.id}
                      className="text-[0.74rem] font-semibold text-forest underline underline-offset-2 disabled:text-muted/50"
                    >
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
