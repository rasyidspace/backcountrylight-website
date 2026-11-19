import Link from "next/link";
import Image from "next/image";
import { User, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { CartSidebar } from "@/components/layout/CartSidebar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";

export default async function Navbar() {
  const [session, categories] = await Promise.all([
    getServerSession(authOptions),
    prisma.category.findMany({ orderBy: { name: 'asc' } })
  ]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/bcl-icon.svg" alt="Backcountry Light" width={32} height={32} className="md:hidden" />
              <span className="hidden md:block text-xl font-heading font-semibold tracking-tight">
                BACKCOUNTRY LIGHT
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <div className="flex items-center">
              <Link href="/shop" className="transition-colors hover:text-foreground/80">
                Shop
              </Link>
              {categories.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger render={
                    <button className="p-1 hover:text-foreground/80 transition-colors cursor-pointer text-muted-foreground focus:outline-none" aria-label="Shop categories dropdown">
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  } />
                  <DropdownMenuContent align="start" className="w-48 py-1">
                    <DropdownMenuItem render={<Link href="/shop" className="font-medium" />}>
                      All Products
                    </DropdownMenuItem>
                    {categories.map((cat) => (
                      <DropdownMenuItem key={cat.id} render={<Link href={`/shop?category=${encodeURIComponent(cat.slug)}`} />}>
                        {cat.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <Link href="/brands" className="transition-colors hover:text-foreground/80">Brands</Link>
            <Link href="/journal" className="transition-colors hover:text-foreground/80">Journal</Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">About</Link>
          </nav>
          
          <div className="flex items-center gap-0 md:gap-2">
            <SearchDialog />
            <CartSidebar />
            <ProfileDropdown session={session} />
            <Sheet>
              <SheetTrigger render={
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu" />
              }>
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-[300px] p-6">
                <SheetHeader className="text-left border-b pb-4 mb-4">
                  <SheetTitle className="font-heading font-black tracking-tight text-xl">
                    BACKCOUNTRY LIGHT
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 text-lg font-medium mt-4">
                  <div className="flex flex-col gap-2">
                    <SheetClose nativeButton={false} render={<Link href="/shop" className="transition-colors hover:text-foreground/80 text-left font-semibold" />}>
                      Shop
                    </SheetClose>
                    <div className="pl-3 flex flex-col gap-2 border-l text-sm font-normal text-muted-foreground mt-1">
                      {categories.map((cat) => (
                        <SheetClose key={cat.id} nativeButton={false} render={
                          <Link href={`/shop?category=${encodeURIComponent(cat.slug)}`} className="hover:text-foreground">
                            {cat.name}
                          </Link>
                        } />
                      ))}
                    </div>
                  </div>
                  <SheetClose nativeButton={false} render={<Link href="/brands" className="transition-colors hover:text-foreground/80 text-left" />}>
                    Brands
                  </SheetClose>
                  <SheetClose nativeButton={false} render={<Link href="/journal" className="transition-colors hover:text-foreground/80 text-left" />}>
                    Journal
                  </SheetClose>
                  <SheetClose nativeButton={false} render={<Link href="/about" className="transition-colors hover:text-foreground/80 text-left" />}>
                    About
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
