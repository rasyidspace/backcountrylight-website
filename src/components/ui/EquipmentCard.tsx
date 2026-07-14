"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "./Button";

interface EquipmentCardProps {
  name: string;
  price: string;
  description: string;
  imageSrc: string;
}

export function EquipmentCard({ name, price, description, imageSrc }: EquipmentCardProps) {
  return (
    <motion.div 
      className="group relative flex flex-col gap-4 overflow-hidden bg-white p-4 shadow-sm transition-all hover:shadow-md border border-gray-100"
      whileHover="hover"
      initial="initial"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-background">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Overlay and button that slide up on hover */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/80 to-transparent opacity-0 p-6 transition-opacity duration-300 group-hover:opacity-100"
        >
          <motion.div
            variants={{
              initial: { y: 20, opacity: 0 },
              hover: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
            }}
          >
            <Button variant="secondary" className="w-full">
              View Detail
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-1 px-2 pb-2">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-serif text-2xl text-primary">{name}</h3>
          <span className="text-accent text-sm whitespace-nowrap mt-2">{price} / day</span>
        </div>
        <p className="text-accent text-sm line-clamp-2 mt-1">{description}</p>
      </div>
    </motion.div>
  );
}
