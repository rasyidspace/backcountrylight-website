import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Search, ChevronDown } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

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

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-md leading-5 bg-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm"
            placeholder="Search by title, SKU, or slug..."
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select className="block w-full pl-3 pr-10 py-2 text-base border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm rounded-md appearance-none bg-white">
              <option>all</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <div className="relative hidden sm:block">
            <select className="block w-full pl-3 pr-10 py-2 text-base border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm rounded-md appearance-none bg-white">
              <option>all</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <th className="px-6 py-4 flex items-center gap-1 cursor-pointer hover:text-zinc-800">PRODUCT <span className="text-[10px]">↑↓</span></th>
                <th className="px-6 py-4 hidden md:table-cell cursor-pointer hover:text-zinc-800">SKU <span className="text-[10px]">↑↓</span></th>
                <th className="px-6 py-4 hidden lg:table-cell">BRAND</th>
                <th className="px-6 py-4 hidden sm:table-cell">CATEGORY</th>
                <th className="px-6 py-4 cursor-pointer hover:text-zinc-800">PRICE <span className="text-[10px]">↑↓</span></th>
                <th className="px-6 py-4 cursor-pointer hover:text-zinc-800">STOCK <span className="text-[10px]">↑↓</span></th>
                <th className="px-6 py-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-zinc-500">
                    No products found. Create one to get started.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const isLowStock = product.stock > 0 && product.stock <= 5;
                  const isOutOfStock = product.stock === 0;
                  const displaySku = product.sku || "-";

                  return (
                    <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-10 w-10 rounded-md bg-zinc-100 overflow-hidden flex-shrink-0 border border-zinc-200/50">
                            {product.image && (
                              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40px" />
                            )}
                          </div>
                          <Link href={`/admin/products/${product.id}/edit`} className="font-medium text-zinc-900 hover:underline">
                            {product.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-500 hidden md:table-cell">
                        {displaySku}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 hidden lg:table-cell">
                        {product.brand.name.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 hidden sm:table-cell">
                        {product.category.name}
                      </td>
                      <td className="px-6 py-4 font-medium text-zinc-900">
                        {formatRupiah(product.price)}
                      </td>
                      <td className={`px-6 py-4 font-medium ${isOutOfStock || isLowStock ? 'text-red-500' : 'text-zinc-900'}`}>
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                          isOutOfStock 
                            ? "bg-red-50 text-red-700 border-red-200" 
                            : "bg-green-50 text-emerald-700 border-emerald-200"
                        }`}>
                          {isOutOfStock ? "Out of Stock" : "Active"}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
