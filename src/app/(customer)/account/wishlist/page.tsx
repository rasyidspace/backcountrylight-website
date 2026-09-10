import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeartCrack } from "lucide-react";

export const metadata = {
  title: "Wishlist | Backcountry Light",
  description: "View your saved items.",
};

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold tracking-tight">Wishlist</h1>
        <p className="text-muted-foreground text-sm mt-1">Items you've saved for later.</p>
      </div>

      <div className="border border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center">
        <div className="bg-muted h-12 w-12 rounded-full flex items-center justify-center mb-4">
          <HeartCrack className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-medium mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground text-sm max-w-sm mb-6">
          You haven't saved any items to your wishlist yet. Click the heart icon on products you like!
        </p>
        <Button render={<Link href="/shop" />}>
          Discover Products
        </Button>
      </div>
    </div>
  );
}
