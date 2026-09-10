import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { MapPin } from "lucide-react";
import { AddAddressForm } from "@/components/account/AddAddressForm";
import { AddressCard } from "@/components/account/AddressCard";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Address Book | Backcountry Light",
  description: "Manage your delivery addresses.",
};

export default async function AddressPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login?callbackUrl=/account/address");
  }

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: [
      { isDefault: 'desc' },
      { createdAt: 'desc' }
    ]
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-heading font-semibold tracking-tight">Address Book</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your delivery and billing addresses.</p>
        </div>
        <AddAddressForm />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.length === 0 ? (
          <div className="border border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center col-span-full">
            <div className="bg-muted h-12 w-12 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-medium mb-2">No addresses saved</h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              You haven't saved any delivery addresses yet. Add one to make checkout faster.
            </p>
            {/* We already have Add button on top, but can also trigger it from here if we extracted state. For now, it's fine. */}
          </div>
        ) : (
          addresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))
        )}
      </div>
    </div>
  );
}
