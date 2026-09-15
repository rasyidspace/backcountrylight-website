"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const stock = parseInt(formData.get("stock") as string, 10);
  const categoryId = formData.get("categoryId") as string;
  const brandId = formData.get("brandId") as string;
  const image = formData.get("image") as string;
  const images = formData.getAll("images") as string[];
  const isFeatured = formData.get("isFeatured") === "on";

  const slug = name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "");

  if (!name || !price || !categoryId || !brandId || !image) {
    return { error: "Missing required fields" };
  }

  try {
    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        categoryId,
        brandId,
        image,
        images,
        isFeatured,
      },
    });
  } catch (error) {
    return { error: "Failed to create product. Name might already exist." };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const stock = parseInt(formData.get("stock") as string, 10);
  const categoryId = formData.get("categoryId") as string;
  const brandId = formData.get("brandId") as string;
  const image = formData.get("image") as string;
  const images = formData.getAll("images") as string[];
  const isFeatured = formData.get("isFeatured") === "on";

  const slug = name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "");

  if (!name || !price || !categoryId || !brandId) {
    return { error: "Missing required fields" };
  }

  const dataToUpdate: any = {
    name,
    slug,
    description,
    price,
    stock,
    categoryId,
    brandId,
    isFeatured,
  };

  // Only update main image if a new one is provided
  if (image) {
    dataToUpdate.image = image;
  }

  // Always update images array (empty array means they were deleted)
  dataToUpdate.images = images;

  try {
    await prisma.product.update({
      where: { id },
      data: dataToUpdate,
    });
  } catch (error) {
    return { error: "Failed to update product. Name might already exist." };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete product." };
  }
}
