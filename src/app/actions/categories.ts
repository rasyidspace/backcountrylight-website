"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const slug = name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "");

  if (!name) return { error: "Name is required" };

  try {
    await prisma.category.create({
      data: {
        name,
        slug,
        description,
      },
    });
  } catch (error) {
    return { error: "Category with this name/slug may already exist." };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  
  if (!name) return { error: "Name is required" };

  // Only update slug if the name changes, or just always update it
  const slug = name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "");

  try {
    await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        description,
      },
    });
  } catch (error) {
    return { error: "Category with this name/slug may already exist." };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete category. It might be linked to products." };
  }
}
