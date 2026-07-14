import { Hero } from "@/components/sections/Hero";
import { EquipmentCollection } from "@/components/sections/EquipmentCollection";
import { FeaturedEquipment } from "@/components/sections/FeaturedEquipment";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Philosophy } from "@/components/sections/Philosophy";
import { RentalProcess } from "@/components/sections/RentalProcess";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <EquipmentCollection />
      <FeaturedEquipment />
      <WhyChooseUs />
      <Philosophy />
      <RentalProcess />
      <FinalCTA />
    </>
  );
}
