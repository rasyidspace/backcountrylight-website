import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-lg font-heading font-semibold tracking-tight">
              BACKCOUNTRY LIGHT
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Premium outdoor retail and rental company specializing in ultralight equipment.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground">All Products</Link></li>
              <li><Link href="/shop?category=shelters" className="hover:text-foreground">Shelters</Link></li>
              <li><Link href="/shop?category=backpacks" className="hover:text-foreground">Backpacks</Link></li>
              <li><Link href="/shop?category=sleep-systems" className="hover:text-foreground">Sleep Systems</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-foreground">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-medium mb-4">Rental</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/rental" className="hover:text-foreground">All Equipment</Link></li>
              <li><Link href="/rental?packages=true" className="hover:text-foreground">Packages</Link></li>
              <li><Link href="/rental/guide" className="hover:text-foreground">Rental Guide</Link></li>
              <li><Link href="/rental/faq" className="hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
              <li><Link href="/journal" className="hover:text-foreground">Journal</Link></li>
              <li><Link href="/brands" className="hover:text-foreground">Brands</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Backcountry Light. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
