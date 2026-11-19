"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type FilterItem = { id: string; name: string; slug: string };

interface ProductFiltersProps {
  categories: FilterItem[];
  brands: FilterItem[];
}

function FilterContent({ categories, brands }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const currentBrand = searchParams.get("brand");

  const updateFilter = (key: "category" | "brand", slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValue = params.get(key);

    if (currentValue === slug) {
      params.delete(key);
    } else {
      params.set(key, slug);
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("brand");
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(currentCategory || currentBrand);

  return (
    <div className="space-y-8">
      {hasActiveFilters && (
        <div className="flex items-center justify-between pb-4 border-b">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Active Filters</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            Clear All
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div>
        <h3 className="font-heading font-medium mb-4 text-sm tracking-widest uppercase text-muted-foreground">Category</h3>
        <div className="space-y-3">
          {categories.map((cat) => {
            const isChecked = currentCategory === cat.slug;
            return (
              <div key={cat.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`cat-${cat.id}`}
                  checked={isChecked}
                  onChange={() => updateFilter("category", cat.slug)}
                  className="rounded border-gray-300 text-foreground focus:ring-foreground accent-foreground cursor-pointer"
                />
                <Label htmlFor={`cat-${cat.id}`} className="font-normal text-sm cursor-pointer select-none">
                  {cat.name}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-medium mb-4 text-sm tracking-widest uppercase text-muted-foreground">Brand</h3>
        <div className="space-y-3">
          {brands.map((brand) => {
            const isChecked = currentBrand === brand.slug;
            return (
              <div key={brand.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`brand-${brand.id}`}
                  checked={isChecked}
                  onChange={() => updateFilter("brand", brand.slug)}
                  className="rounded border-gray-300 text-foreground focus:ring-foreground accent-foreground cursor-pointer"
                />
                <Label htmlFor={`brand-${brand.id}`} className="font-normal text-sm cursor-pointer select-none">
                  {brand.name}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ProductFilters({ categories, brands }: ProductFiltersProps) {
  return (
    <>
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <FilterContent categories={categories} brands={brands} />
        </div>
      </div>
      
      <div className="lg:hidden mb-6 flex items-center justify-between">
        <Sheet>
          <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2 transition-colors">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader className="mb-6 text-left">
              <SheetTitle className="font-heading font-medium">Filters</SheetTitle>
            </SheetHeader>
            <FilterContent categories={categories} brands={brands} />
          </SheetContent>
        </Sheet>
        <span className="text-sm text-muted-foreground">Filter Results</span>
      </div>
    </>
  );
}
