import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Trash2, Shield, User, Search } from "lucide-react";
import { deleteUser } from "@/app/actions/users";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { UserRoleDropdown } from "@/components/admin/UserRoleDropdown";

export default async function UsersAdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { orders: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-medium text-zinc-900 tracking-tight">Users</h1>
          <p className="text-zinc-500 mt-1">Manage customers and admin accounts</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-md leading-5 bg-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm"
            placeholder="Search users by name or email..."
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <th className="px-6 py-4 cursor-pointer hover:text-zinc-800">USER <span className="text-[10px]">↑↓</span></th>
                <th className="px-6 py-4">ROLE</th>
                <th className="px-6 py-4 text-center cursor-pointer hover:text-zinc-800">ORDERS <span className="text-[10px]">↑↓</span></th>
                <th className="px-6 py-4 cursor-pointer hover:text-zinc-800">JOINED <span className="text-[10px]">↑↓</span></th>
                <th className="px-6 py-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-zinc-900">{user.name || "Unnamed"}</div>
                      <div className="text-zinc-500 text-xs">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${user.role === "ADMIN" ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-100 text-zinc-700 border-zinc-200"}`}>
                        {user.role === "ADMIN" ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-zinc-900">
                      {user._count.orders}
                    </td>
                    <td className="px-6 py-4 text-zinc-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <UserRoleDropdown userId={user.id} currentRole={user.role as any} />
                        
                        <form action={async () => {
                          "use server";
                          await deleteUser(user.id);
                        }}>
                          <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
