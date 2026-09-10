import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground mt-1">Update inventory item information.</p>
        </div>
        <Link href="/admin/products">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <ProductForm 
        categories={categories} 
        brands={brands} 
        initialData={initialData} 
      />
    </div>
  );
}
