"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES, BRANDS } from "@/lib/mockData";
import { Label } from "@/components/ui/label";

function FilterContent() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading font-medium mb-4 text-sm tracking-widest uppercase text-muted-foreground">Category</h3>
        <div className="space-y-3">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <input type="checkbox" id={`cat-${cat}`} className="rounded border-gray-300 text-foreground focus:ring-foreground accent-foreground" />
              <Label htmlFor={`cat-${cat}`} className="font-normal text-sm">{cat}</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-heading font-medium mb-4 text-sm tracking-widest uppercase text-muted-foreground">Brand</h3>
        <div className="space-y-3">
          {BRANDS.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <input type="checkbox" id={`brand-${brand}`} className="rounded border-gray-300 text-foreground focus:ring-foreground accent-foreground" />
              <Label htmlFor={`brand-${brand}`} className="font-normal text-sm">{brand}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductFilters() {
  return (
    <>
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <FilterContent />
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
            <FilterContent />
          </SheetContent>
        </Sheet>
        <span className="text-sm text-muted-foreground">6 Results</span>
      </div>
    </>
  );
}
