import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

export default function BreathworkResonance() {
  return (
    <section className="bg-surface px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Eyebrow label="Worum es geht" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-8">
            Wenn der Kopf nicht abschaltet
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-5 max-w-[68ch]">
            <p className="text-primary/80 text-lg leading-relaxed">
              Du bist nach außen leistungsfähig, verlässlich. Wirkst auf die meisten Menschen, als hättest du alles im Griff. 
              Aber in dir läuft etwas immer weiter, das nicht zur Ruhe kommt. Anspannung, die immer da ist. Die sich über den Tag
              aufbaut. Erschöpfung, die dich trotzdem nicht in einen erholsamen Schlaf finden lässt. Immer die Sensoren an. Eine Wachsamkeit, die nie ganz nachlässt.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Anxiety macht viele Menschen zu sehr guten "Funktionierern". Aber das kommt nicht aus Überzeugung, aus Leidenschaft und Freude. Es ist ein Nervensystem, das gelernt
              hat, dauerhaft in Alarmbereitschaft zu bleiben. Und es laugt dich aus.
              Der Atem ist einer der wenigen direkten Zugänge zu diesem System, bewusst steuerbar und zugleich tief mit dem
              deinem Nervensystem verbunden.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
