"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Search, Check, X, Loader2, Layers } from "lucide-react";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { formatRupiah } from "@/lib/utils";
import { updateInlineStock } from "@/app/actions/products";
import { toast } from "sonner";

interface AdminProductVariant {
  id: string;
  name: string;
  sku: string | null;
  stock: number;
  options: any;
}

interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  image: string;
  price: number;
  stock: number;
  brand: { id: string; name: string };
  category: { id: string; name: string };
  variants?: AdminProductVariant[];
}

interface AdminProductsTableProps {
  products: AdminProduct[];
}

function InlineStockEditor({
  initialStock,
  productId,
  variantId,
  label,
  onSuccess,
}: {
  initialStock: number;
  productId: string;
  variantId?: string;
  label?: string;
  onSuccess?: (newStock: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [stockValue, setStockValue] = useState(initialStock.toString());
  const [currentStock, setCurrentStock] = useState(initialStock);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartEditing = () => {
    setStockValue(currentStock.toString());
    setIsEditing(true);
  };

  const handleCancel = () => {
    setStockValue(currentStock.toString());
    setIsEditing(false);
  };

  const handleSave = async () => {
    const trimmed = stockValue.trim();
    if (trimmed === "" || !/^\d+$/.test(trimmed)) {
      toast.error("Stok harus berupa bilangan bulat positif atau 0.");
      return;
    }

    const parsed = parseInt(trimmed, 10);
    if (isNaN(parsed) || parsed < 0) {
      toast.error("Stok tidak valid.");
      return;
    }

    if (parsed === currentStock) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    const result = await updateInlineStock({
      productId,
      variantId: variantId || null,
      stock: parsed,
    });
    setIsLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      const updatedVal = result.stock !== undefined ? result.stock : parsed;
      setCurrentStock(updatedVal);
      setIsEditing(false);
      toast.success(
        label
          ? `Stok ${label} berhasil diubah ke ${updatedVal}`
          : `Stok berhasil diubah ke ${updatedVal}`
      );
      if (onSuccess) onSuccess(updatedVal);
    }
  };

  const isLowStock = currentStock > 0 && currentStock <= 5;
  const isOutOfStock = currentStock === 0;

  if (isEditing) {
    return (
      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
        <input
          type="number"
          min="0"
          step="1"
          disabled={isLoading}
          value={stockValue}
          onChange={(e) => setStockValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSave();
            } else if (e.key === "Escape") {
              handleCancel();
            }
          }}
          autoFocus
          className="w-16 h-7 px-2 py-0.5 text-xs font-semibold rounded border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
        />
        <button
          type="button"
          disabled={isLoading}
          onClick={handleSave}
          aria-label="Save stock"
          className="h-7 w-7 inline-flex items-center justify-center rounded bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-50 transition-colors"
        >
          {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={handleCancel}
          aria-label="Cancel editing"
          className="h-7 w-7 inline-flex items-center justify-center rounded border border-zinc-200 text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 group/stock">
      <span
        className={`font-semibold ${
          isOutOfStock || isLowStock ? "text-red-500" : "text-zinc-900"
        }`}
      >
        {currentStock}
      </span>
      <button
        type="button"
        onClick={handleStartEditing}
        className="text-[11px] font-medium text-zinc-400 group-hover/stock:text-zinc-700 hover:underline px-1 py-0.5 rounded hover:bg-zinc-100 transition-colors cursor-pointer"
        title="Klik untuk mengubah stok langsung"
      >
        Edit
      </button>
    </div>
  );
}

export function AdminProductsTable({ products: initialProducts }: AdminProductsTableProps) {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expandedProductIds, setExpandedProductIds] = useState<Set<string>>(new Set());

  useMemo(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const toggleExpand = (productId: string) => {
    setExpandedProductIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleProductDeleteSuccess = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleProductStockSuccess = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  };

  const handleVariantStockSuccess = (
    productId: string,
    variantId: string,
    newStock: number
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId || !p.variants) return p;
        const updatedVariants = p.variants.map((v) =>
          v.id === variantId ? { ...v, stock: newStock } : v
        );
        const totalVariantStock = updatedVariants.reduce((sum, v) => sum + v.stock, 0);
        return {
          ...p,
          stock: totalVariantStock,
          variants: updatedVariants,
        };
      })
    );
  };

  const brands = useMemo(
    () =>
      Array.from(
        new Map(products.map((product) => [product.brand.id, product.brand])).values()
      ).sort((a, b) => a.name.localeCompare(b.name)),
    [products]
  );
  const categories = useMemo(
    () =>
      Array.from(
        new Map(products.map((product) => [product.category.id, product.category])).values()
      ).sort((a, b) => a.name.localeCompare(b.name)),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        [product.name, product.sku, product.slug].some((value) =>
          value?.toLocaleLowerCase().includes(query)
        ) ||
        product.variants?.some((v) =>
          [v.name, v.sku].some((val) => val?.toLocaleLowerCase().includes(query))
        );
      const matchesBrand = !selectedBrand || product.brand.id === selectedBrand;
      const matchesCategory = !selectedCategory || product.category.id === selectedCategory;

      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [products, searchQuery, selectedBrand, selectedCategory]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-400" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-md leading-5 bg-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm"
            placeholder="Search by title, SKU, or slug..."
            aria-label="Search products by name, SKU, or slug"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedBrand}
              onChange={(event) => setSelectedBrand(event.target.value)}
              aria-label="Filter products by brand"
              className="block w-full pl-3 pr-10 py-2 text-base border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm rounded-md appearance-none bg-white"
            >
              <option value="">All brands</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              aria-label="Filter products by category"
              className="block w-full pl-3 pr-10 py-2 text-base border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm rounded-md appearance-none bg-white"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-50/75">
                <th className="px-6 py-4 flex items-center gap-1">PRODUCT</th>
                <th className="px-6 py-4 hidden md:table-cell">SKU</th>
                <th className="px-6 py-4 hidden lg:table-cell">BRAND</th>
                <th className="px-6 py-4 hidden sm:table-cell">CATEGORY</th>
                <th className="px-6 py-4">PRICE</th>
                <th className="px-6 py-4">STOCK</th>
                <th className="px-6 py-4 text-center">STATUS</th>
                <th className="px-6 py-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-zinc-500">
                    {products.length === 0
                      ? "No products found. Create one to get started."
                      : "No products match your search or filters."}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const hasVariants = Boolean(product.variants && product.variants.length > 0);
                  const isExpanded = expandedProductIds.has(product.id);
                  
                  const effectiveStock = hasVariants
                    ? product.variants!.reduce((acc, v) => acc + v.stock, 0)
                    : product.stock;
                  const isLowStock = effectiveStock > 0 && effectiveStock <= 5;
                  const isOutOfStock = effectiveStock === 0;

                  return (
                    <React.Fragment key={product.id}>
                      <tr className="hover:bg-zinc-50/60 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {hasVariants ? (
                              <button
                                type="button"
                                onClick={() => toggleExpand(product.id)}
                                aria-label={isExpanded ? "Collapse variants" : "Expand variants"}
                                className="p-1 -ml-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded transition-colors"
                              >
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </button>
                            ) : (
                              <div className="w-4" />
                            )}
                            <div className="relative h-10 w-10 rounded-md bg-zinc-100 overflow-hidden flex-shrink-0 border border-zinc-200/50">
                              {product.image && (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              )}
                            </div>
                            <div>
                              <Link
                                href={`/admin/products/${product.id}/edit`}
                                className="font-medium text-zinc-900 hover:underline"
                              >
                                {product.name}
                              </Link>
                              {hasVariants && (
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-600">
                                    <Layers className="h-3 w-3" />
                                    {product.variants!.length} variants
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => toggleExpand(product.id)}
                                    className="text-[11px] text-zinc-500 hover:text-zinc-900 underline cursor-pointer"
                                  >
                                    {isExpanded ? "Hide" : "Manage"}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-zinc-500 hidden md:table-cell">
                          {product.sku || "-"}
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
                        <td className="px-6 py-4">
                          {hasVariants ? (
                            <div className="space-y-0.5">
                              <span
                                className={`font-semibold ${
                                  isOutOfStock || isLowStock ? "text-red-500" : "text-zinc-900"
                                }`}
                              >
                                {effectiveStock}
                              </span>
                              <span className="block text-[11px] text-zinc-400">Total</span>
                            </div>
                          ) : (
                            <InlineStockEditor
                              initialStock={product.stock}
                              productId={product.id}
                              onSuccess={(newStock) => handleProductStockSuccess(product.id, newStock)}
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                              isOutOfStock
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-green-50 text-emerald-700 border-emerald-200"
                            }`}
                          >
                            {isOutOfStock ? "Out of Stock" : "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DeleteProductButton
                            id={product.id}
                            onSuccess={() => handleProductDeleteSuccess(product.id)}
                          />
                        </td>
                      </tr>

                      {/* Expandable Variants Rows */}
                      {hasVariants && isExpanded && (
                        <tr className="bg-zinc-50/80">
                          <td colSpan={8} className="px-6 py-3">
                            <div className="border border-zinc-200 rounded-md bg-white overflow-hidden shadow-xs ml-7">
                              <div className="bg-zinc-100/60 px-4 py-2 border-b border-zinc-200 text-xs font-semibold text-zinc-600 flex items-center justify-between">
                                <span>Variants for {product.name}</span>
                                <span className="text-[11px] text-zinc-400 font-normal">
                                  Click &apos;Edit&apos; on any variant to update stock directly
                                </span>
                              </div>
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="border-b border-zinc-100 text-zinc-400 uppercase tracking-wider text-[10px]">
                                    <th className="px-4 py-2 text-left font-medium">Variant Combination</th>
                                    <th className="px-4 py-2 text-left font-medium">Variant SKU</th>
                                    <th className="px-4 py-2 text-left font-medium">Stock</th>
                                    <th className="px-4 py-2 text-right font-medium">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                  {product.variants!.map((variant) => {
                                    const isVarOutOfStock = variant.stock === 0;
                                    const isVarLowStock = variant.stock > 0 && variant.stock <= 5;
                                    return (
                                      <tr key={variant.id} className="hover:bg-zinc-50/50">
                                        <td className="px-4 py-2.5 font-medium text-zinc-800">
                                          <div className="flex items-center gap-1.5 flex-wrap">
                                            {variant.options &&
                                            typeof variant.options === "object" &&
                                            Object.keys(variant.options).length > 0 ? (
                                              Object.entries(variant.options).map(([k, val]) => (
                                                <span
                                                  key={k}
                                                  className="inline-flex items-center bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded text-[11px] border border-zinc-200/70"
                                                >
                                                  <span className="text-zinc-400 mr-1">{k}:</span>
                                                  {String(val)}
                                                </span>
                                              ))
                                            ) : (
                                              <span>{variant.name}</span>
                                            )}
                                          </div>
                                        </td>
                                        <td className="px-4 py-2.5 text-zinc-500 font-mono text-[11px]">
                                          {variant.sku || "-"}
                                        </td>
                                        <td className="px-4 py-2.5">
                                          <InlineStockEditor
                                            initialStock={variant.stock}
                                            productId={product.id}
                                            variantId={variant.id}
                                            label={variant.name}
                                            onSuccess={(newStock) =>
                                              handleVariantStockSuccess(product.id, variant.id, newStock)
                                            }
                                          />
                                        </td>
                                        <td className="px-4 py-2.5 text-right">
                                          <span
                                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${
                                              isVarOutOfStock
                                                ? "bg-red-50 text-red-700 border-red-200"
                                                : isVarLowStock
                                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                                : "bg-green-50 text-emerald-700 border-emerald-200"
                                            }`}
                                          >
                                            {isVarOutOfStock
                                              ? "Out of Stock"
                                              : isVarLowStock
                                              ? "Low Stock"
                                              : "In Stock"}
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
