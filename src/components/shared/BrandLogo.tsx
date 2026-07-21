"use client";

import Image from "next/image";
import { useState } from "react";

interface BrandLogoProps {
  name: string;
  filename: string;
  className?: string;
  noGrayscale?: boolean;
  noInvert?: boolean;
}

export function BrandLogo({ name, filename, className, noGrayscale = false, noInvert = false }: BrandLogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return <span className="text-xl font-heading font-bold">{name}</span>;
  }

  const grayscaleClass = noGrayscale ? "" : "grayscale hover:grayscale-0 group-hover:grayscale-0";
  const invertClass = noInvert ? "" : "invert";

  return (
    <div className={`relative h-16 w-32 sm:w-36 flex items-center justify-center transition-all duration-300 ${grayscaleClass} ${className || ""}`}>
      <Image
        src={`/images/brands/${filename}`}
        alt={name}
        fill
        className={`object-contain ${invertClass}`}
        onError={() => setError(true)}
      />
    </div>
  );
}
