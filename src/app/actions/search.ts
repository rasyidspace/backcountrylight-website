"use server";

import prisma from "@/lib/prisma";

export async function searchStore(query: string) {
  if (!query) return { products: [], brands: [] };

  const products = await prisma.product.findMany({
    where: {
      name: { contains: query, mode: "insensitive" }
    },
    include: { brand: true },
    take: 5
  });

  const brands = await prisma.brand.findMany({
    where: {
      name: { contains: query, mode: "insensitive" }
    },
    take: 4
  });

  return {
    products: products.map(p => ({ id: p.id, name: p.name, slug: p.slug, brand: p.brand.name })),
    brands: brands.map(b => ({ id: b.id, name: b.name, slug: b.slug }))
  };
}
