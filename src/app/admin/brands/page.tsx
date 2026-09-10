import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { deleteBrand } from "@/app/actions/brands";

export default async function BrandsAdminPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Brands</h1>
          <p className="text-muted-foreground mt-1">Manage your product brands.</p>
        </div>
        <Link href="/admin/brands/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Brand
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border bg-card overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Slug</th>
              <th className="px-6 py-4 font-medium text-center">Products</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {brands.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  No brands found. Create one to get started.
                </td>
              </tr>
            ) : (
              brands.map((brand) => (
                <tr key={brand.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{brand.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{brand.slug}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-bold">
                      {brand._count.products}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/brands/${brand.id}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteBrand(brand.id);
                      }}>
                        <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
