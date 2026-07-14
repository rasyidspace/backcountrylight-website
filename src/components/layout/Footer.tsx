import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16 md:py-24 border-t border-primary/20">
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        <div className="md:col-span-1 flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <Image
                src="/bcl-icon.svg"
                alt="BCL Camp Logo"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <span className="font-serif text-2xl tracking-tight">BCL Camp</span>
          </Link>
          <p className="text-white/70 text-sm font-light max-w-xs leading-relaxed">
            Crafted for those who seek the outdoors. Premium equipment for your next adventure.
          </p>
        </div>

        <div className="md:col-span-1 flex flex-col gap-4">
          <h4 className="font-serif text-xl tracking-wide">Explore</h4>
          <nav className="flex flex-col gap-3">
            <Link href="#equipment" className="text-white/70 hover:text-secondary text-sm transition-colors">Equipment</Link>
            <Link href="#about" className="text-white/70 hover:text-secondary text-sm transition-colors">About Us</Link>
            <Link href="#process" className="text-white/70 hover:text-secondary text-sm transition-colors">How it Works</Link>
          </nav>
        </div>

        <div className="md:col-span-1 flex flex-col gap-4">
          <h4 className="font-serif text-xl tracking-wide">Connect</h4>
          <nav className="flex flex-col gap-3">
            <Link href="#" className="text-white/70 hover:text-secondary text-sm transition-colors">Contact</Link>
            <Link href="#" className="text-white/70 hover:text-secondary text-sm transition-colors">Instagram</Link>
            <Link href="#" className="text-white/70 hover:text-secondary text-sm transition-colors">Journal</Link>
          </nav>
        </div>

        <div className="md:col-span-1 flex flex-col gap-4">
          <h4 className="font-serif text-xl tracking-wide">Legal</h4>
          <nav className="flex flex-col gap-3">
            <Link href="#" className="text-white/70 hover:text-secondary text-sm transition-colors">Terms of Service</Link>
            <Link href="#" className="text-white/70 hover:text-secondary text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-white/70 hover:text-secondary text-sm transition-colors">Rental Agreement</Link>
          </nav>
        </div>
      </Container>
      
      <Container className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/50 text-xs">
          &copy; {new Date().getFullYear()} BCL Camp. All rights reserved.
        </p>
        <p className="text-white/50 text-xs">
          A Backcountry Light Company
        </p>
      </Container>
    </footer>
  );
}
