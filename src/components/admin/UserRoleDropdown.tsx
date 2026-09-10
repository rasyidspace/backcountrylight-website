"use client";

import { useState, useTransition } from "react";
import * as DropdownMenu from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Loader2 } from "lucide-react";
import { updateUserRole } from "@/app/actions/users";
import { toast } from "sonner";

interface UserRoleDropdownProps {
  userId: string;
  currentRole: "USER" | "ADMIN" | "STAFF";
}

export function UserRoleDropdown({ userId, currentRole }: UserRoleDropdownProps) {
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (newRole: "USER" | "ADMIN" | "STAFF") => {
    if (newRole === currentRole) return;
    
    startTransition(async () => {
      const result = await updateUserRole(userId, newRole);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(`Role updated to ${newRole}`);
      }
    });
  };

  return (
    <DropdownMenu.DropdownMenu>
      <DropdownMenu.DropdownMenuTrigger render={<Button variant="outline" size="sm" className="h-8 text-xs gap-1" disabled={isPending} />}>
        {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : currentRole}
        <ChevronDown className="h-3 w-3" />
      </DropdownMenu.DropdownMenuTrigger>
      <DropdownMenu.DropdownMenuContent align="end" className="w-32">
        <DropdownMenu.DropdownMenuItem onClick={() => handleRoleChange("USER")}>
          User
        </DropdownMenu.DropdownMenuItem>
        <DropdownMenu.DropdownMenuItem onClick={() => handleRoleChange("STAFF")}>
          Staff
        </DropdownMenu.DropdownMenuItem>
        <DropdownMenu.DropdownMenuItem onClick={() => handleRoleChange("ADMIN")}>
          Admin
        </DropdownMenu.DropdownMenuItem>
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.DropdownMenu>
  );
}
