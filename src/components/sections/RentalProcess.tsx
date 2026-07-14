"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Search, Calendar, MapPin, Tent, RefreshCw } from "lucide-react";

const steps = [
  {
    num: "1",
    title: "Browse",
    icon: Search,
  },
  {
    num: "2",
    title: "Reserve",
    icon: Calendar,
  },
  {
    num: "3",
    title: "Pickup",
    icon: MapPin,
  },
  {
    num: "4",
    title: "Enjoy",
    icon: Tent,
  },
  {
    num: "5",
    title: "Return",
    icon: RefreshCw,
  }
];

export function RentalProcess() {
  return (
    <section id="process" className="py-24 md:py-32 bg-secondary/10">
      <Container className="flex flex-col gap-20">
        <SectionHeader 
          title="The Rental Process"
          align="center"
        />

        <div className="relative">
          {/* Connecting Line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-primary/20 -z-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-background border border-primary/10 shadow-sm transition-transform duration-300 group-hover:-translate-y-2">
                    <Icon className="text-primary" size={32} strokeWidth={1} />
                    <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-serif">
                      {step.num}
                    </div>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-primary">{step.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
