"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function CartSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 w-9 transition-colors" aria-label="Cart">
        <ShoppingCart className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md border-l border-border bg-background">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="font-heading font-medium text-2xl">Your Cart</SheetTitle>
        </SheetHeader>
        
        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground/20 mb-2" strokeWidth={1} />
          <h3 className="text-xl font-heading font-medium">Your cart is empty</h3>
          <p className="text-muted-foreground text-sm max-w-[250px]">
            Looks like you haven't added any ultralight gear to your cart yet.
          </p>
          <Button variant="outline" className="mt-4 rounded-none" render={<Link href="/shop" />}>
            Start Shopping
          </Button>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-border mt-auto">
          <Button size="lg" className="w-full rounded-none h-14 text-base bg-foreground text-background hover:bg-foreground/90" render={<Link href="/cart" />}>
            Go to Cart
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
