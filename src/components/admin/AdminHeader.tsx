import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function AdminHeader() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const initials = session.user.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  return (
    <header className="flex items-center justify-end h-16 px-6 bg-white border-b border-zinc-200 shrink-0">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-zinc-900 leading-none">{session.user.name || "Admin"}</p>
          <p className="text-xs text-zinc-500 mt-1">{session.user.email}</p>
        </div>
        <div className="h-9 w-9 border border-zinc-200 rounded-full overflow-hidden bg-zinc-900 flex items-center justify-center shrink-0">
          {session.user.image ? (
            <img src={session.user.image} alt={session.user.name || "User Avatar"} className="h-full w-full object-cover" />
          ) : (
            <span className="text-white font-medium text-xs">{initials}</span>
          )}
        </div>
      </div>
    </header>
  );
}
