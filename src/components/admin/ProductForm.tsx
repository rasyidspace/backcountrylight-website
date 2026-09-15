"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct, createProduct } from "@/app/actions/products";
import imageCompression from "browser-image-compression";
import { X } from "lucide-react";

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
  images?: string[];
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
  
  // Detailed Images State
  const [detailedFiles, setDetailedFiles] = useState<File[]>([]);
  const [detailedPreviews, setDetailedPreviews] = useState<string[]>([]);
  const [existingDetailedImages, setExistingDetailedImages] = useState<string[]>(initialData?.images || []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDetailedFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const newFiles = Array.from(e.target.files);
    const totalImages = existingDetailedImages.length + detailedFiles.length + newFiles.length;
    
    if (totalImages > 5) {
      setError("You can only have up to 5 detailed images in total.");
      return;
    }
    
    setError("");
    const previews = newFiles.map(f => URL.createObjectURL(f));
    setDetailedFiles(prev => [...prev, ...newFiles]);
    setDetailedPreviews(prev => [...prev, ...previews]);
  };

  const removeDetailedFile = (index: number) => {
    setDetailedFiles(prev => prev.filter((_, i) => i !== index));
    setDetailedPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const removeExistingDetailedImage = (index: number) => {
    setExistingDetailedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      
      const options = {
        maxSizeMB: 0.5, // 500KB
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };

      // 1. Upload main image
      if (file) {
        const compressedFile = await imageCompression(file, options);
        const uploadData = new FormData();
        uploadData.append("file", compressedFile, compressedFile.name);
        
        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
        
        if (!uploadRes.ok) {
          const errorData = await uploadRes.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to upload image (Status: ${uploadRes.status})`);
        }
        
        const { url } = await uploadRes.json();
        formData.append("image", url);
      } else if (!initialData) {
        throw new Error("Please select a main image to upload.");
      }

      // 2. Upload new detailed images sequentially
      const newUrls: string[] = [];
      for (const detailedFile of detailedFiles) {
        const compressed = await imageCompression(detailedFile, options);
        const uploadData = new FormData();
        uploadData.append("file", compressed, compressed.name);
        
        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
        if (!uploadRes.ok) {
          throw new Error("Failed to upload one of the detailed images.");
        }
        
        const { url } = await uploadRes.json();
        newUrls.push(url);
      }

      // Append all existing and new detailed images to FormData
      existingDetailedImages.forEach(url => formData.append("images", url));
      newUrls.forEach(url => formData.append("images", url));

      // 3. Call Server Action
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

        {/* Main Image */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="file">Product Main Image (Thumbnail) {!initialData && <span className="text-destructive">*</span>}</Label>
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
            {initialData ? "Leave empty to keep existing main image. " : ""}
            Image will be automatically compressed before uploading.
          </p>
          
          {preview && (
            <div className="mt-4 w-40 h-40 relative rounded-md border overflow-hidden">
              <img src={preview} alt="Main Preview" className="object-cover w-full h-full" />
            </div>
          )}
        </div>

        {/* Detailed Images */}
        <div className="space-y-2 md:col-span-2 pt-4 border-t">
          <Label htmlFor="detailedFiles">Detailed Images (Max 5)</Label>
          <Input 
            id="detailedFiles" 
            type="file" 
            multiple
            accept="image/*" 
            onChange={handleDetailedFileChange} 
            disabled={isSubmitting || existingDetailedImages.length + detailedFiles.length >= 5}
            className="cursor-pointer"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Upload up to 5 additional images for the product gallery.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            {/* Existing Detailed Images */}
            {existingDetailedImages.map((url, i) => (
              <div key={`existing-${i}`} className="w-24 h-24 relative rounded-md border overflow-hidden group">
                <img src={url} alt={`Existing Detailed ${i}`} className="object-cover w-full h-full" />
                <button 
                  type="button" 
                  onClick={() => removeExistingDetailedImage(i)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            {/* New Detailed Images */}
            {detailedPreviews.map((url, i) => (
              <div key={`new-${i}`} className="w-24 h-24 relative rounded-md border overflow-hidden group border-primary/50">
                <img src={url} alt={`New Detailed ${i}`} className="object-cover w-full h-full opacity-70" />
                <button 
                  type="button" 
                  onClick={() => removeDetailedFile(i)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 md:col-span-2 pt-4 border-t">
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

      <div className="pt-4 border-t border-border mt-6">
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : (initialData ? "Save Changes" : "Save Product")}
        </Button>
      </div>
    </form>
  );
}
