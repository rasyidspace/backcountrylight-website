"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrder } from "@/app/actions/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export function CheckoutForm({ 
  addresses, 
  email 
}: { 
  addresses: Address[], 
  email: string 
}) {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find(a => a.isDefault)?.id || addresses[0]?.id || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);
  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 25000 : 0; // Flat 25k shipping
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!selectedAddressId) {
      toast.error("Please select a shipping address");
      return;
    }

    setIsSubmitting(true);
    
    const result = await createOrder({
      addressId: selectedAddressId,
      items: items.map(item => ({ id: item.id, quantity: item.quantity, price: item.price })),
      totalAmount: total
    });

    if (result.error) {
      toast.error(result.error);
      setIsSubmitting(false);
    } else {
      toast.success("Order placed successfully!");
      clearCart();
      router.push(`/account`);
    }
  };

  if (!isHydrated) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 space-y-10">
        
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-heading font-medium mb-4">Contact Information</h2>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} disabled className="bg-muted/50 text-muted-foreground" />
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-heading font-medium">Shipping Address</h2>
            {addresses.length > 0 && (
              <Link href="/account/address" className="text-sm text-primary hover:underline">
                Manage Addresses
              </Link>
            )}
          </div>
          
          {addresses.length === 0 ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 flex gap-3 text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-medium text-sm">No address found</p>
                <p className="text-sm mt-1 mb-3">You must add a shipping address before you can checkout.</p>
                <Button size="sm" render={<Link href="/account/address" />}>
                  Add Address in Profile
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Address</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedAddressId}
                  onChange={(e) => setSelectedAddressId(e.target.value)}
                >
                  {addresses.map(addr => (
                    <option key={addr.id} value={addr.id}>
                      {addr.firstName} {addr.lastName} - {addr.street}, {addr.city}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Preview of selected address */}
              {selectedAddress && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input value={selectedAddress.firstName} disabled className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input value={selectedAddress.lastName} disabled className="bg-muted/30" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Address</Label>
                    <Input value={selectedAddress.street} disabled className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input value={selectedAddress.city} disabled className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Postal Code</Label>
                    <Input value={selectedAddress.postalCode} disabled className="bg-muted/30" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="bg-muted/30 border rounded-lg p-6 sticky top-24">
          <h2 className="text-xl font-heading font-medium mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{item.quantity}x</span>
                  <span className="line-clamp-1">{item.name}</span>
                </div>
                <span className="font-medium shrink-0">{formatRupiah(item.price * item.quantity)}</span>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-4">No items in cart</p>
            )}
          </div>
          
          <div className="space-y-3 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatRupiah(shipping)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-3 border-t">
              <span>Total</span>
              <span>{formatRupiah(total)}</span>
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              size="lg" 
              className="w-full h-14 text-base"
              onClick={handlePlaceOrder}
              disabled={isSubmitting || items.length === 0 || addresses.length === 0}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              By placing your order you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
