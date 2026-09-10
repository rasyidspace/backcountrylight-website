"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function addAddress(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const street = formData.get("street") as string;
  const city = formData.get("city") as string;
  const postalCode = formData.get("postalCode") as string;
  const setAsDefault = formData.get("isDefault") === "on";

  if (!firstName || !lastName || !street || !city || !postalCode) {
    return { error: "All fields are required" };
  }

  try {
    // If setting as default, unset other defaults first
    if (setAsDefault) {
      await prisma.address.updateMany({
        where: { userId: session.user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    // Check if this is their first address
    const existingAddressesCount = await prisma.address.count({
      where: { userId: session.user.id }
    });

    const isFirstAddress = existingAddressesCount === 0;

    await prisma.address.create({
      data: {
        userId: session.user.id,
        firstName,
        lastName,
        street,
        city,
        postalCode,
        isDefault: isFirstAddress ? true : setAsDefault,
      }
    });

    revalidatePath("/account/address");
    revalidatePath("/checkout");
    return { success: true };
  } catch (error) {
    console.error("Error adding address:", error);
    return { error: "Failed to add address" };
  }
}

export async function deleteAddress(addressId: string) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    // Verify ownership
    const address = await prisma.address.findUnique({
      where: { id: addressId }
    });

    if (!address || address.userId !== session.user.id) {
      return { error: "Address not found or unauthorized" };
    }

    await prisma.address.delete({
      where: { id: addressId }
    });

    // If we deleted the default, set another one as default if it exists
    if (address.isDefault) {
      const remainingAddress = await prisma.address.findFirst({
        where: { userId: session.user.id }
      });
      
      if (remainingAddress) {
        await prisma.address.update({
          where: { id: remainingAddress.id },
          data: { isDefault: true }
        });
      }
    }

    revalidatePath("/account/address");
    revalidatePath("/checkout");
    return { success: true };
  } catch (error) {
    console.error("Error deleting address:", error);
    return { error: "Failed to delete address" };
  }
}

export async function setDefaultAddress(addressId: string) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    // Verify ownership
    const address = await prisma.address.findUnique({
      where: { id: addressId }
    });

    if (!address || address.userId !== session.user.id) {
      return { error: "Address not found or unauthorized" };
    }

    // Unset current default
    await prisma.address.updateMany({
      where: { userId: session.user.id, isDefault: true },
      data: { isDefault: false },
    });

    // Set new default
    await prisma.address.update({
      where: { id: addressId },
      data: { isDefault: true }
    });

    revalidatePath("/account/address");
    revalidatePath("/checkout");
    return { success: true };
  } catch (error) {
    console.error("Error setting default address:", error);
    return { error: "Failed to set default address" };
  }
}
