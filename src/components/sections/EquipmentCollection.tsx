"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";

export function EquipmentCollection() {
  return (
    <section id="collection" className="py-24 md:py-32 overflow-hidden bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start gap-8"
          >
            <SectionHeader 
              title="Everything You Need For The Outdoors."
              align="left"
            />
            <p className="text-accent text-lg md:text-xl font-light leading-relaxed max-w-md">
              We curate only the finest outdoor equipment, ensuring your time in nature is comfortable, safe, and memorable. From premium shelters to essential accessories, our rental collection is meticulously maintained and ready for your adventure.
            </p>
            <Button size="lg" className="mt-4">
              Explore Collection
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative h-[600px] w-full"
          >
            <Image
              src="/tent/tc-collection-shelters.jpg"
              alt="Shelter Collection"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
