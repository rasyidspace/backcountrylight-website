import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/mockData";
import { formatRupiah } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const cartItems = [PRODUCTS[0], PRODUCTS[1]];
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shipping = 25000;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-24">
      <h1 className="text-3xl md:text-4xl font-heading font-medium tracking-tight mb-12 text-center md:text-left">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left: Form */}
        <div className="flex-1 space-y-12">
          {/* Contact */}
          <section>
            <h2 className="text-xl font-heading font-medium mb-6 pb-2 border-b">Contact Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="text-xl font-heading font-medium mb-6 pb-2 border-b">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                <Input id="apartment" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal-code">Postal Code</Label>
                <Input id="postal-code" />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-xl font-heading font-medium mb-6 pb-2 border-b">Payment</h2>
            <div className="space-y-4 bg-muted/30 p-6 border border-border">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiration Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-muted/30 p-6 border border-border sticky top-24">
            <h2 className="text-xl font-heading font-medium mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-muted flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                  </div>
                  <div className="font-medium text-sm">
                    {formatRupiah(item.price)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-4 border-t border-border text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{formatRupiah(shipping)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end py-4 border-t border-border font-medium">
              <span>Total</span>
              <span className="text-2xl">{formatRupiah(total)}</span>
            </div>

            <Button size="lg" className="w-full rounded-none h-14 text-base mt-6">
              Place Order
            </Button>
            
            <p className="text-xs text-muted-foreground text-center mt-4">
              By placing your order you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
