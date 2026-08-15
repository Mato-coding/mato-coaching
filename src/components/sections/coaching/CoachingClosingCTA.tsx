import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { AUDIO_ANCHOR } from "@/lib/anchors";

export default function CoachingClosingCTA() {
  return (
    <Section className="bg-background">
      {/*
        Bewusst kein Container-Primitive: diese Textspalte ist max-w-2xl
        (672px), keine der drei Container-Breiten (prose/narrow/default)
        trifft diesen Wert, siehe CTA.tsx.
      */}
      <div className="mx-auto max-w-2xl text-center">
        <FadeIn>
          <Eyebrow label="Der erste Schritt" align="center" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-6">
            Ein Gespräch, keine Verkaufsshow
          </Heading>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-primary/80 text-lg leading-relaxed mb-4 max-w-measure mx-auto">
            Am Anfang steht ein kostenfreies Erstgespräch. Wir schauen
            gemeinsam, wo du stehst, was du brauchst und ob diese Begleitung
            das Richtige dafür ist. Du lernst meine Arbeitsweise kennen, ich
            deine Situation. Am Ende weißt du, ob du starten willst, und ich,
            ob ich dich aufnehmen kann.
          </p>
          <p className="text-sm text-muted mb-10">
            Das Erstgespräch dauert etwa 45 Minuten.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Button href="/termin" className="inline-block">
            Erstgespräch vereinbaren
          </Button>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-6 text-muted text-sm">
            Noch nicht bereit für ein Gespräch?{" "}
            <a
              href={`/#${AUDIO_ANCHOR}`}
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Starte mit dem kostenfreien Audio.
            </a>
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}
