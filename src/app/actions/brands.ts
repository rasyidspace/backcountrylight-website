"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBrand(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const slug = name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "");

  if (!name) return { error: "Name is required" };

  try {
    await prisma.brand.create({
      data: {
        name,
        slug,
        description,
      },
    });
  } catch (error) {
    return { error: "Brand with this name/slug may already exist." };
  }

  revalidatePath("/admin/brands");
  redirect("/admin/brands");
}

export async function updateBrand(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  
  if (!name) return { error: "Name is required" };

  const slug = name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "");

  try {
    await prisma.brand.update({
      where: { id },
      data: {
        name,
        slug,
        description,
      },
    });
  } catch (error) {
    return { error: "Brand with this name/slug may already exist." };
  }

  revalidatePath("/admin/brands");
  redirect("/admin/brands");
}

export async function deleteBrand(id: string) {
  try {
    await prisma.brand.delete({
      where: { id },
    });
    revalidatePath("/admin/brands");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete brand. It might be linked to products." };
  }
}
