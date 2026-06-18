import FadeIn from "@/components/ui/FadeIn";
import LeadMagnetForm from "@/components/forms/LeadMagnetForm";

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

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Ein geführtes Breathwork-Audio, das dir in wenigen Minuten hilft,
            dein Nervensystem zu beruhigen. Du kannst es jederzeit nutzen, wenn
            die innere Anspannung größer wird. Trag dich ein, und du bekommst es
            direkt per E-Mail.
          </p>

          <div className="mt-10 max-w-md">
            <LeadMagnetForm />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
