import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | Backcountry Light",
  description: "Our philosophy, our mission, and the story behind Backcountry Light.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-muted flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <Image
          src="/tent/tc-philosophy-tenbi.webp"
          alt="Our Philosophy"
          fill
          priority
          className="object-cover object-center z-0"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="text-sm font-bold tracking-widest uppercase text-white/80 mb-4 block drop-shadow-sm">Our Story</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-white mb-6 drop-shadow-md">
            Purpose-built for the wild.
          </h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <p className="text-xl md:text-2xl font-heading font-medium leading-relaxed max-w-4xl mx-auto balance-text">
          &quot;We believe that the less you carry, the more you connect with your surroundings. Backcountry Light was founded on the simple idea that premium, ultralight gear shouldn&apos;t be a luxury reserved only for the elite few—it should be accessible to anyone seeking to move fast and light.&quot;
        </p>
        <div className="mt-12 w-16 h-[1px] bg-foreground mx-auto"></div>
      </section>

      {/* Philosophy Split */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-4 block">The Philosophy</span>
              <h2 className="text-4xl font-heading font-medium leading-tight mb-6">
                Curated exclusively for the dedicated minimalist.
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The outdoor industry is saturated with heavy, over-engineered gear designed for the mass market. We take a different approach. We obsessively test and curate equipment that prioritizes weight-to-performance ratios above all else.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Whether you&apos;re attempting a thru-hike of the PCT or a fast-and-light weekend mission in the local range, our retail and rental fleets exist to eliminate the barrier of heavy equipment.
              </p>
              <Button size="lg" className="rounded-none" render={<Link href="/shop" />}>
                Explore the Collection
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/5] w-full bg-muted overflow-hidden">
              <Image 
                src="/tent/tc-philosophy-diafort.webp" 
                alt="Minimalist camp setup" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-medium">Our Core Tenets</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left border-t border-b border-border/50 py-16">
          <div>
            <h3 className="font-heading font-medium text-xl mb-3">Leave No Trace</h3>
            <p className="text-muted-foreground">We advocate for minimal impact practices. Traveling light isn&apos;t just about comfort, it&apos;s about treading lightly on the earth.</p>
          </div>
          <div>
            <h3 className="text-xl font-heading font-medium mb-4">Accessibility through Rental</h3>
            <p className="text-muted-foreground leading-relaxed">Ultralight gear is expensive. We built our rental program to break down financial barriers and let you try top-tier equipment without the commitment.</p>
          </div>
          <div>
            <h3 className="text-xl font-heading font-medium mb-4">Environmental Stewardship</h3>
            <p className="text-muted-foreground leading-relaxed">We subscribe to Leave No Trace principles. Renting gear reduces consumption, and repairing quality items keeps them out of landfills.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 bg-foreground text-background text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-medium mb-6">Ready to lighten your load?</h2>
          <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto">
            Browse our curated shop or rent a complete ultralight setup for your next weekend trip.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-none bg-background text-foreground hover:bg-background/90 px-8 h-14" render={<Link href="/shop" />}>
              Shop Equipment
            </Button>
            <Button size="lg" variant="outline" className="rounded-none border-background/50 hover:bg-background hover:text-foreground px-8 h-14 transition-colors" render={<Link href="/rental" />}>
              Rent Packages
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
