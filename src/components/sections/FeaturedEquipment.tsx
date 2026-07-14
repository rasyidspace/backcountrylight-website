"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { EquipmentCard } from "../ui/EquipmentCard";

const featuredProducts = [
  {
    name: "Diafort",
    price: "$45",
    description: "Spacious premium shelter designed for maximum comfort and durability in versatile weather conditions.",
    imageSrc: "/tent/tc-product-diafort.webp",
  },
  {
    name: "Tenbi",
    price: "$35",
    description: "Lightweight and elegant setup, perfect for minimalist campers seeking uncompromised quality.",
    imageSrc: "/tent/tc-product-tenbi.webp",
  },
  {
    name: "Wingfort",
    price: "$55",
    description: "An architectural marvel providing expansive shade and robust protection for group adventures.",
    imageSrc: "/tent/tc-product-wingfort.webp",
  },
  {
    name: "Ognis Dome",
    price: "$65",
    description: "The ultimate expedition dome tent. Unrivaled stability and breathtaking panoramic views.",
    imageSrc: "/tent/tc-product-ognis-dome.webp",
  }
];

export function FeaturedEquipment() {
  return (
    <section id="equipment" className="py-24 md:py-32 bg-background">
      <Container className="flex flex-col gap-16">
        <SectionHeader 
          title="Featured Equipment"
          align="center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            >
              <EquipmentCard {...product} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
