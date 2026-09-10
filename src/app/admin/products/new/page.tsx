import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Add Product</h1>
          <p className="text-muted-foreground mt-1">Add a new item with auto-compressed image.</p>
        </div>
        <Link href="/admin/products">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <ProductForm categories={categories} brands={brands} />
    </div>
  );
}
