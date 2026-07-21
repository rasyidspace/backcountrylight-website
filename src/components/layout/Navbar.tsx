import Link from "next/link";
import { User, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { CartSidebar } from "@/components/layout/CartSidebar";
// HMR trigger

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-heading font-semibold tracking-tight">
              BACKCOUNTRY LIGHT
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/shop" className="transition-colors hover:text-foreground/80">Shop</Link>
            <Link href="/rental" className="transition-colors hover:text-foreground/80">Rental</Link>
            <Link href="/brands" className="transition-colors hover:text-foreground/80">Brands</Link>
            <Link href="/journal" className="transition-colors hover:text-foreground/80">Journal</Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">About</Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <SearchDialog />
            <Link href="/login">
              <Button variant="ghost" size="icon" aria-label="Login">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <CartSidebar />
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
