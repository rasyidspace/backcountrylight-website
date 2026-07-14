"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "../layout/Container";

export function Philosophy() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          
          <div className="md:col-span-5 flex flex-col gap-8 order-2 md:order-1 mt-12 md:mt-0 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary tracking-tight leading-[1.1]">
                A Deeper Connection <br /> To The Outdoors.
              </h2>
              <div className="mt-8 space-y-6 text-accent text-lg font-light leading-relaxed">
                <p>
                  We believe that the best moments in life are spent outside, breathing fresh air and leaving the noise behind.
                </p>
                <p>
                  Our philosophy is simple: provide impeccable equipment that quietly supports your journey, allowing you to focus entirely on the experience.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-6 order-1 md:order-2">
            <motion.div 
              className="flex flex-col gap-4 md:gap-6 pt-12 md:pt-24"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/tent/tc-philosophy-diafort.webp"
                  alt="Camping lifestyle"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="relative aspect-square w-full overflow-hidden hidden md:block">
                <Image
                  src="/tent/tc-philosophy-wingfort.webp"
                  alt="Outdoor gear setup"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="relative aspect-[3/4] w-full h-full overflow-hidden"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <Image
                src="/tent/tc-philosophy-tenbi.webp"
                alt="Nature and equipment"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
