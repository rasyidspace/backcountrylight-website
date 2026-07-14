"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section id="hero" className="relative flex h-screen min-h-[600px] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/tent/tc-hero-lifestyle.webp"
          alt="Premium Camping Lifestyle"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30 transition-opacity" />
      </div>

      <Container className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="font-serif text-5xl tracking-tight text-white md:text-7xl lg:text-8xl">
            Premium Camping Gear <br className="hidden md:block" />
            Ready For Every Adventure.
          </h1>
          
          <p className="mt-6 text-lg font-light text-white/90 md:mt-8 md:text-xl max-w-2xl mx-auto">
            Experience the outdoors without compromise. Expertly maintained, high-performance equipment available for your next journey.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12">
            <Button size="lg" className="w-full sm:w-auto">
              Browse Equipment
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary">
              Contact Us
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
