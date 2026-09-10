"use client";

import { Button } from "@/components/ui/button";
import { deleteAddress, setDefaultAddress } from "@/app/actions/address";
import { toast } from "sonner";
import { MapPin, Trash2, CheckCircle } from "lucide-react";
import { useState } from "react";

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export function AddressCard({ address }: { address: Address }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSettingDefault, setIsSettingDefault] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this address?")) {
      setIsDeleting(true);
      const result = await deleteAddress(address.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Address deleted");
      }
      setIsDeleting(false);
    }
  };

  const handleSetDefault = async () => {
    setIsSettingDefault(true);
    const result = await setDefaultAddress(address.id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Default address updated");
    }
    setIsSettingDefault(false);
  };

  return (
    <div className={`border rounded-lg p-6 relative ${address.isDefault ? 'border-primary' : 'border-border'}`}>
      {address.isDefault && (
        <span className="absolute -top-3 left-4 bg-primary text-primary-foreground px-2 py-0.5 text-xs font-medium rounded-full flex items-center">
          <CheckCircle className="mr-1 h-3 w-3" />
          Default
        </span>
      )}
      
      <div className="flex items-start gap-3 mt-1">
        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium">{address.firstName} {address.lastName}</h3>
          <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
            <p>{address.street}</p>
            <p>{address.city}, {address.postalCode}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex gap-2">
        {!address.isDefault && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSetDefault}
            disabled={isSettingDefault}
          >
            {isSettingDefault ? "Setting..." : "Set as Default"}
          </Button>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
}
