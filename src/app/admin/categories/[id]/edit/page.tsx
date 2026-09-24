import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { updateCategory } from "@/app/actions/categories";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const category = await prisma.category.findUnique({
    where: { id }
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Edit Category</h1>
          <p className="text-muted-foreground mt-1">Update product category information.</p>
        </div>
        <Link href="/admin/categories">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <form action={async (formData) => { "use server"; await updateCategory(id, formData); }} className="space-y-6 bg-card p-6 rounded-xl border">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name <span className="text-destructive">*</span></Label>
          <Input id="name" name="name" required defaultValue={category.name} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            defaultValue={category.description || ""} 
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
