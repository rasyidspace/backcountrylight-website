"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { CheckCircle2, Droplets, Wallet, ShieldCheck, CalendarCheck, Compass } from "lucide-react";

const reasons = [
  {
    title: "Premium Equipment",
    description: "Access the highest quality gear from trusted outdoor brands.",
    icon: CheckCircle2,
  },
  {
    title: "Professionally Cleaned",
    description: "Every item is rigorously inspected and sanitized after each use.",
    icon: Droplets,
  },
  {
    title: "Affordable Rental",
    description: "Experience luxury gear without the heavy investment of ownership.",
    icon: Wallet,
  },
  {
    title: "Reliable Service",
    description: "Count on us for punctual pickups, clear communication, and support.",
    icon: ShieldCheck,
  },
  {
    title: "Easy Reservation",
    description: "Streamlined booking process so you can focus on the journey.",
    icon: CalendarCheck,
  },
  {
    title: "Outdoor Experts",
    description: "Advice and recommendations from passionate outdoor professionals.",
    icon: Compass,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-primary text-white">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
          <SectionHeader 
            title="Why Choose BCL Camp"
            description="We believe your time in nature should be uncompromising. We handle the logistics so you can embrace the experience."
            className="text-white [&_h2]:text-white [&_p]:text-white/80"
          />
        </div>
        
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-secondary">
                    <Icon strokeWidth={1.5} size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl tracking-wide text-white mb-2">{reason.title}</h3>
                    <p className="text-white/70 font-light leading-relaxed">{reason.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
