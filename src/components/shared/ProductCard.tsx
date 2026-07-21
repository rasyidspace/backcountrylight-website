"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  rentalPrice?: number;
  image: string;
  type: "buy" | "rent" | "both";
  href: string;
}

export function ProductCard({ name, brand, price, rentalPrice, image, type, href }: ProductCardProps) {
  return (
    <Link href={href} className="group flex flex-col gap-3">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {/* Real image to be added later */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40 font-mono text-xs z-0">
          [Image Placeholder]
        </div>
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105 z-10 opacity-0 data-[loaded=true]:opacity-100" 
          onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
          {type === "both" && (
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm hover:bg-background">Buy + Rent</Badge>
          )}
          {type === "buy" && (
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm hover:bg-background">Buy</Badge>
          )}
          {type === "rent" && (
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm hover:bg-background">Rent</Badge>
          )}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">{brand}</p>
        <h3 className="font-heading font-medium text-lg mt-1">{name}</h3>
        <div className="mt-2 flex items-center gap-4 text-sm font-medium">
          {type !== "rent" && <span>{formatRupiah(price)}</span>}
          {type !== "buy" && rentalPrice && (
            <span className={type === "both" ? "text-muted-foreground font-normal" : ""}>
              {formatRupiah(rentalPrice)} / day
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
