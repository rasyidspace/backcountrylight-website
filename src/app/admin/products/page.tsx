import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";

export default async function ProductsAdminPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      brand: true,
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-medium text-zinc-900 tracking-tight">Products</h1>
          <p className="text-zinc-500 mt-1">Manage your product catalog</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-zinc-200 text-zinc-900 font-medium h-9 px-4 hidden sm:flex">
            Import Products
          </Button>
          <Link href="/admin/products/new">
            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium h-9 px-4 flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      <AdminProductsTable products={products} />
    </div>
  );
}
