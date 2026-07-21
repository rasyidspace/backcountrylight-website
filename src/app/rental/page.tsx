import { ProductFilters } from "@/components/shared/ProductFilters";
import { ProductCard } from "@/components/shared/ProductCard";
import { PRODUCTS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Rental Gear | Backcountry Light",
  description: "Rent premium ultralight outdoor gear for your next adventure.",
};

export default function RentalPage() {
  const rentalProducts = PRODUCTS.filter(p => p.type === "rent" || p.type === "both");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-24">
      <div className="mb-12">
        <div className="inline-flex mb-4">
          <span className="bg-muted px-3 py-1 text-xs font-medium tracking-widest uppercase">Rental Service</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-4">Rent Gear</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Experience the best ultralight equipment without the commitment. Rent a la carte or choose a complete package.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <ProductFilters />
        
        <div className="flex-1">
          <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b">
            <span className="text-sm text-muted-foreground">{rentalProducts.length} Results</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm border-none bg-transparent outline-none font-medium text-foreground cursor-pointer">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
            {rentalProducts.map((product) => (
              <ProductCard key={product.id} {...product} href={`/rental/${product.slug}`} type="rent" />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" className="px-12 rounded-none">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
