"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct, createProduct } from "@/app/actions/products";
import imageCompression from "browser-image-compression";

type Category = { id: string; name: string };
type Brand = { id: string; name: string };
type ProductData = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  brandId: string;
  image: string;
  isFeatured: boolean;
};

interface ProductFormProps {
  categories: Category[];
  brands: Brand[];
  initialData?: ProductData;
}

export function ProductForm({ categories, brands, initialData }: ProductFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      
      // 1. If a file is selected, compress and upload it
      if (file) {
        // Compress Image
        const options = {
          maxSizeMB: 0.5, // 500KB
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        
        // Upload to our API
        const uploadData = new FormData();
        uploadData.append("file", compressedFile, compressedFile.name);
        
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        
        if (!uploadRes.ok) {
          const errorData = await uploadRes.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to upload image (Status: ${uploadRes.status})`);
        }
        
        const { url } = await uploadRes.json();
        
        // Append the resulting URL to the form data
        formData.append("image", url);
      } else if (!initialData) {
        throw new Error("Please select an image to upload.");
      }

      // 2. Call Server Action
      let result;
      if (initialData) {
        result = await updateProduct(initialData.id, formData);
      } else {
        result = await createProduct(formData);
      }
      
      if (result?.error) {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border">
      {error && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm border border-destructive/20">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="name">Product Name <span className="text-destructive">*</span></Label>
          <Input id="name" name="name" required defaultValue={initialData?.name} placeholder="e.g. X-Mid Pro 2" disabled={isSubmitting} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (IDR) <span className="text-destructive">*</span></Label>
          <Input id="price" name="price" type="number" required min="0" defaultValue={initialData?.price} placeholder="e.g. 15000000" disabled={isSubmitting} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock Quantity <span className="text-destructive">*</span></Label>
          <Input id="stock" name="stock" type="number" required min="0" defaultValue={initialData?.stock ?? 10} disabled={isSubmitting} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoryId">Category <span className="text-destructive">*</span></Label>
          <select 
            id="categoryId" 
            name="categoryId" 
            required 
            defaultValue={initialData?.categoryId || ""}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select a category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brandId">Brand <span className="text-destructive">*</span></Label>
          <select 
            id="brandId" 
            name="brandId" 
            required 
            defaultValue={initialData?.brandId || ""}
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select a brand</option>
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="file">Product Image {!initialData && <span className="text-destructive">*</span>}</Label>
          <Input 
            id="file" 
            type="file" 
            accept="image/*" 
            required={!initialData} 
            onChange={handleFileChange} 
            disabled={isSubmitting}
            className="cursor-pointer"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {initialData ? "Leave empty to keep existing image. " : ""}
            Image will be automatically compressed before uploading.
          </p>
          
          {preview && (
            <div className="mt-4 w-40 h-40 relative rounded-md border overflow-hidden">
              <img src={preview} alt="Preview" className="object-cover w-full h-full" />
            </div>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
          <Textarea 
            id="description" 
            name="description" 
            required
            defaultValue={initialData?.description || ""}
            disabled={isSubmitting}
            placeholder="Detailed product description..." 
            className="min-h-[150px]"
          />
        </div>

        <div className="space-y-2 md:col-span-2 flex items-center gap-2">
          <input 
            type="checkbox" 
            id="isFeatured" 
            name="isFeatured" 
            defaultChecked={initialData?.isFeatured}
            className="h-4 w-4 rounded border-gray-300" 
            disabled={isSubmitting} 
          />
          <Label htmlFor="isFeatured" className="font-normal cursor-pointer">Feature this product on the homepage</Label>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : (initialData ? "Save Changes" : "Save Product")}
        </Button>
      </div>
    </form>
  );
}
