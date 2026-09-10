import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { createBrand } from "@/app/actions/brands";

export default function NewBrandPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Add Brand</h1>
          <p className="text-muted-foreground mt-1">Create a new product brand.</p>
        </div>
        <Link href="/admin/brands">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <form action={async (formData) => { "use server"; await createBrand(formData); }} className="space-y-6 bg-card p-6 rounded-xl border">
        <div className="space-y-2">
          <Label htmlFor="name">Brand Name <span className="text-destructive">*</span></Label>
          <Input id="name" name="name" required placeholder="e.g. Durston Gear" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            placeholder="Brief description of this brand..." 
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full">
          Save Brand
        </Button>
      </form>
    </div>
  );
}
