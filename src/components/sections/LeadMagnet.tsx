import FadeIn from "@/components/ui/FadeIn";
import LeadMagnetCTA from "@/components/sections/LeadMagnetCTA";

export default function LeadMagnet() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-umber" />
            <span className="text-sm uppercase tracking-widest text-umber">
              Kostenloses Audio
            </span>
          </div>

          <h2 className="font-display text-3xl leading-tight text-primary md:text-4xl">
            Ein erster Schritt zurück zur Ruhe
          </h2>

          <LeadMagnetCTA />
        </FadeIn>
      </div>
    </section>
  );
}
