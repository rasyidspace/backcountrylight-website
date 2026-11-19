"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function verifyStaffSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) {
    throw new Error("Akses ditolak. Operasi ini membutuhkan hak akses Admin atau Staf.");
  }
  return session;
}

export async function createProduct(formData: FormData) {
  try {
    await verifyStaffSession();
  } catch (err: any) {
    return { error: err.message };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const stock = parseInt(formData.get("stock") as string, 10);
  const categoryId = formData.get("categoryId") as string;
  const brandId = formData.get("brandId") as string;
  const image = formData.get("image") as string;
  const images = formData.getAll("images") as string[];
  const isFeatured = formData.get("isFeatured") === "on";
  
  const optionsRaw = formData.get("options") as string;
  const variantsRaw = formData.get("variants") as string;
  let options = [];
  let variants = [];
  if (optionsRaw) {
    try { options = JSON.parse(optionsRaw); } catch(e) {}
  }
  if (variantsRaw) {
    try { variants = JSON.parse(variantsRaw); } catch(e) {}
  }
  
  const rawSku = formData.get("sku") as string;
  const sku = rawSku?.trim() ? rawSku.trim() : null;

  const slug = name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "");

  if (!name || !price || !categoryId || !brandId || !image) {
    return { error: "Missing required fields" };
  }

  try {
    await prisma.product.create({
      data: {
        name,
        sku,
        slug,
        description,
        price,
        stock,
        categoryId,
        brandId,
        image,
        images,
        isFeatured,
        options: options.length > 0 ? {
          create: options.map((opt: any) => ({
            name: opt.name,
            values: opt.values,
          }))
        } : undefined,
        variants: variants.length > 0 ? {
          create: variants.map((v: any) => ({
            name: Object.values(v.options).join(" / "),
            sku: v.sku || null,
            price: v.price ? parseInt(v.price, 10) : null,
            stock: v.stock ? parseInt(v.stock, 10) : 0,
            options: v.options,
            imageUrl: v.imageUrl || null,
          }))
        } : undefined,
      },
    });
  } catch (error: any) {
    console.error("Create product error:", error);
    return { error: error.message || "Failed to create product." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    await verifyStaffSession();
  } catch (err: any) {
    return { error: err.message };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const stock = parseInt(formData.get("stock") as string, 10);
  const categoryId = formData.get("categoryId") as string;
  const brandId = formData.get("brandId") as string;
  const image = formData.get("image") as string;
  const images = formData.getAll("images") as string[];
  const isFeatured = formData.get("isFeatured") === "on";

  const optionsRaw = formData.get("options") as string;
  const variantsRaw = formData.get("variants") as string;
  let options: any[] = [];
  let variants: any[] = [];
  if (optionsRaw) {
    try { options = JSON.parse(optionsRaw); } catch(e) {}
  }
  if (variantsRaw) {
    try { variants = JSON.parse(variantsRaw); } catch(e) {}
  }

  const rawSku = formData.get("sku") as string;
  const sku = rawSku?.trim() ? rawSku.trim() : null;

  const slug = name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "");

  if (!name || isNaN(price) || !categoryId || !brandId) {
    return { error: "Missing required fields" };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Ambil semua varian lama yang ada di database untuk produk ini
      const existingVariants = await tx.productVariant.findMany({
        where: { productId: id },
        include: { _count: { select: { orderItems: true } } },
      });

      // Hapus opsi lama dan buat opsi baru
      await tx.productOption.deleteMany({
        where: { productId: id },
      });

      if (options.length > 0) {
        await tx.productOption.createMany({
          data: options.map((opt: any) => ({
            productId: id,
            name: opt.name,
            values: opt.values,
          })),
        });
      }

      // Helper untuk membandingkan semantik options (tidak bergantung pada urutan key)
      const areOptionsEqual = (
        optA: Record<string, any> | null | undefined,
        optB: Record<string, any> | null | undefined
      ) => {
        if (!optA || !optB) return optA === optB;
        const keysA = Object.keys(optA);
        const keysB = Object.keys(optB);
        if (keysA.length !== keysB.length) return false;
        return keysA.every((k) => optA[k] === optB[k]);
      };

      // Tentukan variant yang dipertahankan dan yang dihapus
      const incomingIds = new Set<string>();
      const variantsToUpdate: { existingId: string; variantData: any }[] = [];
      const variantsToCreate: any[] = [];

      for (const v of variants) {
        // Prioritas 1: Gunakan v.id jika ada dan valid pada existingVariants produk ini
        let matched = v.id ? existingVariants.find((ex) => ex.id === v.id) : undefined;

        // Prioritas 2 (Fallback): Jika v.id tidak ada, cocokkan berdasarkan kesetaraan semantik options
        if (!matched && v.options) {
          matched = existingVariants.find(
            (ex) => !incomingIds.has(ex.id) && areOptionsEqual(ex.options as any, v.options)
          );
        }

        if (matched) {
          incomingIds.add(matched.id);
          variantsToUpdate.push({
            existingId: matched.id,
            variantData: v,
          });
        } else {
          variantsToCreate.push(v);
        }
      }

      // Varian yang tidak ada di incoming payload adalah varian yang dihapus oleh admin
      const variantsToRemove = existingVariants.filter((ex) => !incomingIds.has(ex.id));
      for (const ex of variantsToRemove) {
        if (ex._count.orderItems > 0) {
          throw new Error(
            `Varian "${ex.name}" tidak dapat dihapus karena sudah memiliki riwayat transaksi/pesanan.`
          );
        }
      }

      if (variantsToRemove.length > 0) {
        await tx.productVariant.deleteMany({
          where: {
            id: { in: variantsToRemove.map((ex) => ex.id) },
          },
        });
      }

      // Update existing variants (mempertahankan variant.id yang sama)
      for (const { existingId, variantData: v } of variantsToUpdate) {
        const variantName = v.options && Object.keys(v.options).length > 0
          ? Object.values(v.options).join(" / ")
          : v.name || "Default Variant";

        await tx.productVariant.update({
          where: { id: existingId },
          data: {
            name: variantName,
            sku: v.sku?.trim() ? v.sku.trim() : null,
            price: v.price ? parseInt(v.price, 10) : null,
            stock: v.stock !== undefined && v.stock !== null && v.stock !== "" ? parseInt(v.stock, 10) : 0,
            options: v.options || {},
            imageUrl: v.imageUrl || null,
          },
        });
      }

      // Buat varian baru
      for (const v of variantsToCreate) {
        const variantName = v.options && Object.keys(v.options).length > 0
          ? Object.values(v.options).join(" / ")
          : v.name || "Default Variant";

        await tx.productVariant.create({
          data: {
            productId: id,
            name: variantName,
            sku: v.sku?.trim() ? v.sku.trim() : null,
            price: v.price ? parseInt(v.price, 10) : null,
            stock: v.stock !== undefined && v.stock !== null && v.stock !== "" ? parseInt(v.stock, 10) : 0,
            options: v.options || {},
            imageUrl: v.imageUrl || null,
          },
        });
      }

      // Update data utama produk
      const dataToUpdate: any = {
        name,
        sku,
        slug,
        description,
        price,
        stock,
        categoryId,
        brandId,
        isFeatured,
      };

      if (image) {
        dataToUpdate.image = image;
      }
      dataToUpdate.images = images;

      await tx.product.update({
        where: { id },
        data: dataToUpdate,
      });
    });
  } catch (error: any) {
    console.error("Update product error:", error);
    return { error: error.message || "Failed to update product." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  try {
    await verifyStaffSession();
  } catch (err: any) {
    return { error: err.message || "Akses ditolak. Operasi ini membutuhkan hak akses Admin atau Staf." };
  }

  if (!id || typeof id !== "string") {
    return { error: "ID produk tidak valid." };
  }

  try {
    // 1. Periksa apakah produk ada dan apakah sudah pernah dipesan
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            orderItems: true,
          },
        },
        variants: {
          select: {
            id: true,
            _count: {
              select: {
                orderItems: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return { error: "Produk tidak ditemukan." };
    }

    const hasProductOrders = product._count.orderItems > 0;
    const hasVariantOrders = product.variants.some((v) => v._count.orderItems > 0);

    if (hasProductOrders || hasVariantOrders) {
      return {
        error: "Produk tidak dapat dihapus karena sudah digunakan dalam pesanan.",
      };
    }

    // 2. Hapus secara atomic di dalam transaksi
    await prisma.$transaction(async (tx) => {
      // Hapus opsi produk
      await tx.productOption.deleteMany({
        where: { productId: id },
      });

      // Hapus varian produk
      await tx.productVariant.deleteMany({
        where: { productId: id },
      });

      // Hapus produk
      await tx.product.delete({
        where: { id },
      });
    });

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error: any) {
    console.error("Delete product error:", error);
    if (error.code === "P2003") {
      return { error: "Produk tidak dapat dihapus karena masih terkait dengan data lain." };
    }
    return { error: error.message || "Gagal menghapus produk." };
  }
}

export async function updateInlineStock(params: {
  productId: string;
  variantId?: string | null;
  stock: number;
}) {
  try {
    await verifyStaffSession();
  } catch (err: any) {
    return { error: err.message || "Unauthorized" };
  }

  const { productId, variantId, stock } = params;

  if (!productId || typeof productId !== "string") {
    return { error: "Product ID tidak valid." };
  }

  if (typeof stock !== "number" || isNaN(stock) || !Number.isInteger(stock) || stock < 0) {
    return { error: "Nilai stok harus berupa bilangan bulat positif atau 0." };
  }

  try {
    if (variantId) {
      if (typeof variantId !== "string") {
        return { error: "Variant ID tidak valid." };
      }

      // Pastikan varian ada dan milik produk ini
      const variant = await prisma.productVariant.findFirst({
        where: { id: variantId, productId },
      });

      if (!variant) {
        return { error: "Varian produk tidak ditemukan." };
      }

      const updatedVariant = await prisma.productVariant.update({
        where: { id: variantId },
        data: { stock },
      });

      revalidatePath("/admin/products");
      revalidatePath("/shop");
      return { success: true, stock: updatedVariant.stock };
    } else {
      // Pastikan produk ada
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { _count: { select: { variants: true } } },
      });

      if (!product) {
        return { error: "Produk tidak ditemukan." };
      }

      if (product._count.variants > 0) {
        return { error: "Produk memiliki varian. Stok harus diubah pada masing-masing varian." };
      }

      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: { stock },
      });

      revalidatePath("/admin/products");
      revalidatePath("/shop");
      return { success: true, stock: updatedProduct.stock };
    }
  } catch (error: any) {
    console.error("Inline stock update error:", error);
    return { error: error.message || "Gagal memperbarui stok." };
  }
}
