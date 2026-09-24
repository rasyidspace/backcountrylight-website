import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

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
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-medium text-zinc-900 tracking-tight">Brands</h1>
          <p className="text-zinc-500 mt-1">Manage your product brands</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/brands/new">
            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium h-9 px-4 flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Brand
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-md leading-5 bg-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm"
            placeholder="Search brands..."
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <th className="px-6 py-4 cursor-pointer hover:text-zinc-800">NAME <span className="text-[10px]">↑↓</span></th>
                <th className="px-6 py-4">SLUG</th>
                <th className="px-6 py-4 text-center cursor-pointer hover:text-zinc-800">PRODUCTS <span className="text-[10px]">↑↓</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {brands.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-zinc-500">
                    No brands found. Create one to get started.
                  </td>
                </tr>
              ) : (
                brands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <Link href={`/admin/brands/${brand.id}/edit`} className="font-medium text-zinc-900 hover:underline">
                        {brand.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-zinc-500">
                      {brand.slug}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center bg-zinc-100 text-zinc-700 px-2.5 py-0.5 rounded-full text-xs font-medium border border-zinc-200">
                        {brand._count.products}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
