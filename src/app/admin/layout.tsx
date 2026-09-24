import { ReactNode } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard | Backcountry Light",
};

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden flex-col md:flex-row font-sans">
      {/* Mobile Header & Trigger */}
      <div className="md:hidden flex items-center justify-between border-b bg-white p-4 shrink-0">
        <h1 className="text-lg font-medium flex items-center gap-2">
          Backcountrylight <span className="text-sm font-normal text-zinc-500">Retail</span>
        </h1>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" />}>
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>Access admin pages</SheetDescription>
            </SheetHeader>
            <Sidebar isMobile role={session.user.role} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0 h-full">
        <Sidebar role={session.user.role} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="hidden md:block">
          <AdminHeader />
        </div>
        <main className="flex-1 overflow-y-auto bg-zinc-50 p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
