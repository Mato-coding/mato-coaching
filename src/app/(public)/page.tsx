import Hero from "@/components/sections/Hero";
import Transformation from "@/components/sections/Transformation";
import Cause from "@/components/sections/Cause";
import Method from "@/components/sections/Method";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import LeadMagnet from "@/components/sections/LeadMagnet";

export const metadata = {
  title: "Breathwork & Coaching in Hamburg",
  description:
    "Somatic Breathwork und IFS-orientierte Begleitung in Hamburg und online. Finde bei innerer Unruhe, Anspannung, Anxiety und Erschöpfung zurück zur Ruhe.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Transformation />
      <Cause />
      <Method />
      <About />
      <CTA />
      <LeadMagnet />
    </>
  );
}
