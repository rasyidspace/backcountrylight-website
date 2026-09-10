"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete user." };
  }
}

export async function updateUserRole(id: string, newRole: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: { role: newRole as "USER" | "ADMIN" | "STAFF" },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update role." };
  }
}
