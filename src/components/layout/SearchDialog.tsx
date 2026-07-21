"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { PRODUCTS, BRANDS } from "@/lib/mockData";

import { useRouter } from "next/navigation";

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleSelect = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center rounded-md h-9 w-9 hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Search">
        <Search className="h-5 w-5" />
      </DialogTrigger>
      <DialogContent className="p-0 border-0 max-w-2xl bg-transparent shadow-none">
        <Command className="rounded-lg border shadow-md bg-background overflow-hidden">
          <CommandInput placeholder="Search gear, brands, or journal..." className="h-14 font-medium" />
          <CommandList className="max-h-[60vh]">
            <CommandEmpty>No results found.</CommandEmpty>
            
            <CommandGroup heading="Products (Buy)">
              {PRODUCTS.filter(p => p.type !== 'rent').slice(0, 3).map(product => (
                <CommandItem key={`buy-${product.id}`} onSelect={() => handleSelect(`/shop/${product.slug}`)} className="py-3">
                  <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{product.name}</span>
                  <span className="ml-auto text-muted-foreground text-xs">{product.brand}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            
            <CommandGroup heading="Rental Equipment">
              {PRODUCTS.filter(p => p.type !== 'buy').slice(0, 3).map(product => (
                <CommandItem key={`rent-${product.id}`} onSelect={() => handleSelect(`/rental/${product.slug}`)} className="py-3">
                  <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{product.name}</span>
                  <span className="ml-auto text-muted-foreground text-xs">Rental</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="Brands">
              {BRANDS.slice(0, 4).map(brand => (
                <CommandItem key={`brand-${brand}`} onSelect={() => handleSelect(`/brands`)} className="py-3">
                  <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{brand}</span>
                </CommandItem>
              ))}
            </CommandGroup>

          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
