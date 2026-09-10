import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PackageX } from "lucide-react";

export const metadata = {
  title: "My Orders | Backcountry Light",
  description: "View your order history.",
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) return null;

  // Fetch orders from database (we will implement the actual creation later during Checkout phase)
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { product: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">View and track your recent orders.</p>
      </div>

      {orders.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center">
          <div className="bg-muted h-12 w-12 rounded-full flex items-center justify-center mb-4">
            <PackageX className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-medium mb-2">No orders yet</h2>
          <p className="text-muted-foreground text-sm max-w-sm mb-6">
            You haven't placed any orders yet. Start exploring our premium ultralight gear collection!
          </p>
          <Button render={<Link href="/shop" />}>
            Browse Shop
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6">
              <div className="flex flex-wrap gap-4 items-center justify-between border-b pb-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="font-medium text-sm font-mono">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-medium text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total</p>
                  <p className="font-medium text-sm">
                    Rp {order.totalAmount.toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="h-16 w-16 bg-muted rounded overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <p className="font-medium text-sm">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
