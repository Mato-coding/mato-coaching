export const metadata = {
  title: "Breathwork & Coaching in Hamburg",
  description:
    "Somatic Breathwork und IFS-orientierte Begleitung in Hamburg und online. Finde bei innerer Unruhe, Anspannung und Erschöpfung zurück zur Ruhe.",
};
import Hero from "@/components/sections/Hero";
import Transformation from "@/components/sections/Transformation";
import Cause from "@/components/sections/Cause";
import Method from "@/components/sections/Method";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import FadeIn from "@/components/ui/FadeIn";

export default function Home() {
  return (
    <>
      <FadeIn>
        <Hero />
      </FadeIn>
      <FadeIn delay={0.2}>
        <Transformation />
      </FadeIn>
      <FadeIn delay={0.2}>
        <Cause />
      </FadeIn>
      <FadeIn delay={0.2}>
        <Method />
      </FadeIn>
      <FadeIn delay={0.2}>
        <About />
      </FadeIn>
      <FadeIn delay={0.2}>
        <CTA />
      </FadeIn>
    </>
  );
}