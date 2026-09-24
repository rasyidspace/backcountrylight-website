import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [categories, brands, product] = await Promise.all([
    prisma.category.findMany({ select: { id: true, name: true } }),
    prisma.brand.findMany({ select: { id: true, name: true } }),
    prisma.product.findUnique({ where: { id } })
  ]);

  if (!product) {
    notFound();
  }

  // Map to ProductData format expected by the form
  const initialData = {
    ...product,
    description: product.description || ""
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/admin/products" className="p-2 -ml-2 hover:bg-zinc-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-zinc-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">Edit Product</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{product.name}</p>
        </div>
      </div>

      <ProductForm 
        categories={categories} 
        brands={brands} 
        initialData={initialData} 
      />
    </div>
  );
}
