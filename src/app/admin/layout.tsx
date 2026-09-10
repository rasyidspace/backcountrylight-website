import { ReactNode } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard | Backcountry Light",
};

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between border-b bg-card p-4">
        <h1 className="text-lg font-heading font-bold">Admin Panel</h1>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" />}>
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
             <Sidebar isMobile role={session.user.role} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar role={session.user.role} />
      </div>
      
      <main className="flex-1 overflow-y-auto bg-muted/20">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
