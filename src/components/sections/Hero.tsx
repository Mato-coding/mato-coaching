import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

// Hero bleibt bewusst außerhalb des Section-Primitives: min-h-[80vh],
// asymmetrisches pt/pb und die Flex-Zentrierung passen zu keiner der drei
// Section-size-Stufen und würden bei Erzwingen sichtbar vom Ist-Zustand
// abweichen. Eyebrow, Heading und Button kommen trotzdem aus den Primitives.
export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-6 pt-20 pb-16">
      <Container width="narrow" className="text-center">

        <Eyebrow
          label="Somatic Breathwork & Integration"
          align="center"
          className="hero-item"
        />

        <Heading
          variant="display"
          className="hero-item hero-d1 mb-8"
        >
          Wenn dauerhafte Anspannung deinen Alltag bestimmt.
        </Heading>

        <p className="hero-item hero-d2 text-xl md:text-2xl text-primary/70 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          Ich zeige dir einen Weg, auf dem du zur Ruhe kommst.
          <br />
          Finde aus dem Gedankenkarussell zurück in eine spürbare körperliche und emotionale Erholung.
        </p>

        <div className="hero-item hero-d3">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/termin" className="w-full sm:w-auto text-lg">
              Erstgespräch vereinbaren
            </Button>
            <Button href="/assessment" variant="secondary" className="w-full sm:w-auto text-lg">
              Zum Kurz-Assessment
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted">
            Das Assessment dauert nur ca. 3 Minuten.
          </p>
        </div>

      </Container>
    </section>
  );
}
