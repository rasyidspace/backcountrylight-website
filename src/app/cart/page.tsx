import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, type Product } from "@/lib/mockData";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, Info } from "lucide-react";

export const metadata = {
  title: "Your Cart | Backcountry Light",
  description: "Review your ultralight gear before checkout.",
};

type BaseCartItem = Product & {
  quantity: number;
};

type RetailCartItem = BaseCartItem & {
  cartType: "buy";
};

type RentalCartItem = BaseCartItem & {
  cartType: "rent";
  rentalDays: number;
};

type CartItem = RetailCartItem | RentalCartItem;

export default function CartPage() {
  // Use mock products for cart demonstration
  const cartItems: CartItem[] = [
    { ...PRODUCTS[0], quantity: 1, cartType: "buy" } as RetailCartItem,
    { ...PRODUCTS[2], quantity: 1, cartType: "rent", rentalDays: 3 } as RentalCartItem,
  ];

  const subtotal = cartItems.reduce((acc, item) => {
    if (item.cartType === "rent") {
      return acc + (item.rentalPrice || 0) * item.rentalDays * item.quantity;
    }
    return acc + item.price * item.quantity;
  }, 0);

  const shipping = 50000; // Flat rate shipping for example
  const tax = subtotal * 0.11; // 11% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-muted/20 py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-heading font-medium tracking-tight mb-10">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-background border border-border">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b text-sm font-medium tracking-widest uppercase text-muted-foreground">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-border">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 items-center">
                    {/* Product Info */}
                    <div className="col-span-1 md:col-span-6 flex gap-4">
                      <div className="relative h-24 w-24 bg-muted flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">{item.brand}</span>
                        <Link href={`/${item.cartType === 'rent' ? 'rental' : 'shop'}/${item.slug}`} className="font-heading font-medium text-lg hover:underline underline-offset-4 mb-2">
                          {item.name}
                        </Link>
                        {item.cartType === "rent" ? (
                          <div className="text-sm bg-secondary text-secondary-foreground inline-flex items-center px-2 py-1 rounded-sm self-start gap-1">
                            <Info className="h-3 w-3" />
                            Rental: {item.rentalDays} Days
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Retail Purchase</span>
                        )}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-3 flex items-center md:justify-center gap-4">
                      <div className="flex items-center border border-border">
                        <button className="p-2 hover:bg-muted transition-colors"><Minus className="h-4 w-4" /></button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button className="p-2 hover:bg-muted transition-colors"><Plus className="h-4 w-4" /></button>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="col-span-1 md:col-span-3 flex items-center justify-between md:flex-col md:items-end md:justify-center gap-4">
                      <span className="font-medium text-lg">
                        {formatRupiah(item.cartType === "rent" ? (item.rentalPrice || 0) * item.rentalDays * item.quantity : item.price * item.quantity)}
                      </span>
                      <button className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1">
                        <Trash2 className="h-4 w-4" />
                        <span className="md:hidden">Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <Link href="/shop" className="font-medium hover:underline underline-offset-4">
                &larr; Continue Shopping
              </Link>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 bg-background border border-border p-6 md:p-8 sticky top-24">
            <h2 className="text-xl font-heading font-medium mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Shipping</span>
                <span className="font-medium">{formatRupiah(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (11%)</span>
                <span className="font-medium">{formatRupiah(tax)}</span>
              </div>
            </div>
            
            <div className="border-t border-border pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-heading font-medium text-lg">Total</span>
                <span className="font-medium text-2xl">{formatRupiah(total)}</span>
              </div>
            </div>
            
            <Button size="lg" className="w-full rounded-none h-14 text-base" render={<Link href="/checkout" />}>
              Proceed to Checkout
            </Button>
            
            <div className="mt-6 text-center text-xs text-muted-foreground flex flex-col gap-2">
              <p>Secure checkout powered by Midtrans.</p>
              <p>Shipping and taxes calculated at checkout.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
