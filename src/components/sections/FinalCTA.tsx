"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

export function FinalCTA() {
  return (
    <section className="relative py-32 bg-primary overflow-hidden">
      {/* Subtle Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-center"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-white tracking-tight leading-tight">
            Ready For Your <br className="hidden sm:block" /> Next Adventure?
          </h2>
          
          <p className="mt-8 text-white/80 text-lg md:text-xl font-light max-w-xl leading-relaxed">
            Equip yourself with the finest gear and step into the wild with confidence. Your journey starts here.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
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
