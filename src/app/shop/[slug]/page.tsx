import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ProductGallery } from "@/components/shared/ProductGallery";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/shared/AddToCartButton";

import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default async function ShopProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { brand: true, category: true }
  });

  if (!product) {
    notFound();
  }

  // Create an array of mock images based on the single image for the gallery
  const images = [product.image, product.image, product.image, product.image];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-24">
      {/* Breadcrumb simple */}
      <div className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Left: Gallery */}
        <div className="w-full">
          <ProductGallery images={images} />
        </div>

        <div className="flex flex-col pt-4">
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">{product.brand.name}</p>
          <h1 className="text-3xl md:text-4xl font-heading font-medium tracking-tight mb-4">{product.name}</h1>
          
          <div className="text-2xl font-medium mb-6">
            {formatRupiah(product.price)}
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            {product.description}
          </p>

          <div className="space-y-4 mb-10">
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                stock: product.stock,
              }} 
            />
          </div>

          <Accordion className="w-full" defaultValue={["shipping"]}>
            <AccordionItem value="shipping">
              <AccordionTrigger className="font-heading text-lg">Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground pt-2">
                  Free standard shipping on all orders over $99. We offer a 30-day return policy for unused gear in its original packaging.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
