"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-4 border-gray-200" : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-8 w-8 overflow-hidden">
            <Image
              src="/bcl-icon.svg"
              alt="BCL Camp Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className={cn(
            "font-serif text-2xl tracking-tight transition-colors duration-300",
            isScrolled ? "text-primary" : "text-white"
          )}>
            BCL Camp
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {["Home", "Equipment", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-secondary",
                isScrolled ? "text-primary/80" : "text-white/90"
              )}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant={isScrolled ? "primary" : "secondary"}
            size="sm"
            className="hidden md:inline-flex"
          >
            Browse Equipment
          </Button>
          
          {/* Mobile menu button could go here */}
          <button className="md:hidden p-2">
            <div className={cn(
              "w-6 h-0.5 mb-1.5 transition-colors",
              isScrolled ? "bg-primary" : "bg-white"
            )} />
            <div className={cn(
              "w-6 h-0.5 mb-1.5 transition-colors",
              isScrolled ? "bg-primary" : "bg-white"
            )} />
            <div className={cn(
              "w-6 h-0.5 transition-colors",
              isScrolled ? "bg-primary" : "bg-white"
            )} />
          </button>
        </div>
      </div>
    </header>
  );
}
