"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { searchStore } from "@/app/actions/search";
import { useDebounce } from "use-debounce";

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = React.useState<{ products: any[], brands: any[] }>({ products: [], brands: [] });
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!debouncedQuery) {
      setResults({ products: [], brands: [] });
      return;
    }
    
    setIsLoading(true);
    searchStore(debouncedQuery).then(data => {
      setResults(data);
      setIsLoading(false);
    });
  }, [debouncedQuery]);

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
        <Command className="rounded-lg border shadow-md bg-background overflow-hidden" shouldFilter={false}>
          <CommandInput 
            placeholder="Search gear, brands, or journal..." 
            className="h-14 font-medium" 
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="max-h-[60vh]">
            {isLoading && <div className="p-4 text-sm text-center text-muted-foreground">Searching...</div>}
            
            {!isLoading && results.products.length === 0 && results.brands.length === 0 && query && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            
            {!isLoading && results.products.length > 0 && (
              <CommandGroup heading="Products">
                {results.products.map(product => (
                  <CommandItem key={`product-${product.id}`} onSelect={() => handleSelect(`/shop/${product.slug}`)} className="py-3">
                    <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{product.name}</span>
                    <span className="ml-auto text-muted-foreground text-xs">{product.brand}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {!isLoading && results.brands.length > 0 && (
              <CommandGroup heading="Brands">
                {results.brands.map(brand => (
                  <CommandItem key={`brand-${brand.id}`} onSelect={() => handleSelect(`/brands`)} className="py-3">
                    <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{brand.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
