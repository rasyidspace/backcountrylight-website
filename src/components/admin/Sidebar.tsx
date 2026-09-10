"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Tags, Package, LayoutList, LogOut, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: LayoutList },
  { name: "Brands", href: "/admin/brands", icon: Tags },
  { name: "Users", href: "/admin/users", icon: Users },
];

export function Sidebar({ isMobile, role = "ADMIN" }: { isMobile?: boolean; role?: string }) {
  const pathname = usePathname();

  const filteredNavigation = navigation.filter(item => {
    if (item.name === "Users" && role !== "ADMIN") return false;
    return true;
  });

  return (
    <div className={cn("flex h-full flex-col bg-card", isMobile ? "w-full" : "w-64 border-r border-border")}>
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link href="/admin" className="text-xl font-heading font-bold tracking-tight">
          Admin Panel
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                    "mr-3 flex-shrink-0 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-border p-4 space-y-2">
        <Link
          href="/"
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Store className="mr-3 h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-foreground" />
          Back to Store
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-destructive" />
          Logout
        </button>
      </div>
    </div>
  );
}
