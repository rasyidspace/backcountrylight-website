import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Footer() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  const priorityCategorySlugs = ["shelters", "backpacks", "sleep-systems", "accessories", "cooking"];
  const displayCategories = priorityCategorySlugs
    .map(slug => categories.find(c => c.slug === slug))
    .filter((c): c is typeof categories[number] => Boolean(c));

  if (displayCategories.length < 4) {
    for (const cat of categories) {
      if (!displayCategories.some(c => c.id === cat.id)) {
        displayCategories.push(cat);
        if (displayCategories.length >= 4) break;
      }
    }
  }

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-lg font-heading font-semibold tracking-tight">
              BACKCOUNTRY LIGHT
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Premium outdoor retail company specializing in ultralight equipment.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground">All Products</Link></li>
              {displayCategories.map(cat => (
                <li key={cat.id}>
                  <Link href={`/shop?category=${encodeURIComponent(cat.slug)}`} className="hover:text-foreground">
                    {cat.name}
                  </Link>
                </li>
              ))}
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
