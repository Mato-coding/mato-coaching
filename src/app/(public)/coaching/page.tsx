import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "1:1 Begleitung: zur Ruhe kommen, klar ausrichten | Lasse Klüver",
  description:
    "10 Wochen 1:1-Begleitung für Menschen mit innerer Unruhe, Anxiety oder Panikattacken. Somatic Breathwork und IFS, remote oder in Hamburg.",
  alternates: {
    canonical: absoluteUrl("/coaching"),
  },
  openGraph: {
    title: "1:1 Begleitung: zur Ruhe kommen, klar ausrichten | Lasse Klüver",
    description:
      "10 Wochen 1:1-Begleitung für Menschen mit innerer Unruhe, Anxiety oder Panikattacken. Somatic Breathwork und IFS, remote oder in Hamburg.",
    url: absoluteUrl("/coaching"),
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "1:1 Begleitung über zehn Wochen",
  serviceType: "Coaching und Somatic Breathwork",
  description:
    "10 Wochen 1:1-Begleitung für Menschen mit innerer Unruhe, Anxiety oder Panikattacken. Somatic Breathwork und IFS, remote oder in Hamburg.",
  provider: {
    "@type": "ProfessionalService",
    name: "Lasse Klüver",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "City",
    name: "Hamburg",
  },
  url: absoluteUrl("/coaching"),
  availableChannel: [
    {
      "@type": "ServiceChannel",
      serviceLocation: {
        "@type": "City",
        name: "Hamburg",
      },
    },
    {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/termin"),
    },
  ],
};

const bausteine = [
  {
    title: "Wöchentliche 1:1 Session.",
    body: "75 Minuten intensive Arbeit an dem, was zu deiner Anspannung und Erschöpfung führt, körperlich und in der Tiefe, individuell aufeinander aufbauend über zehn Wochen.",
  },
  {
    title: "Tägliche Praxis.",
    body: "Du bekommst umfangreiches und qualifiziertes Material für deine persönliche Praxis in der Zeit zwischen den Sessions, damit dein Nervensystem Regulation nicht nur vereinzelt erlebt, sondern als täglichen Normalzustand verinnerlicht.",
  },
  {
    title: "Klarer Rahmen.",
    body: "Fester Wochenrhythmus, definierter Zeitraum, ein Ansprechpartner. Struktur, die hält, statt zusätzlicher Komplexität.",
  },
];

export default function CoachingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Sektion 1: Hero */}
      <section className="bg-background px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <Eyebrow label="1:1 Begleitung" align="center" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-serif text-5xl md:text-6xl font-medium text-primary leading-[1.1] mb-8">
              Vom Funktionieren zurück ins Leben
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-primary/70 leading-relaxed mb-12 max-w-2xl mx-auto">
              Zehn Wochen intensive Einzelbegleitung für Menschen, die viel
              tragen. Damit dein Nervensystem wieder lernt zu regulieren, dein Schlaf
              sich erholt und du dein Leben wieder aktiv gestaltest, statt nur zu reagieren und es zu
              verwalten. Ich arbeite mit dir über das IFS Coaching an den echten Ursachen und tiefgehend somatisch, über den Körper und Atem. Remote oder in
              Hamburg.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/termin"
                className="w-full sm:w-auto bg-accent text-background px-8 py-4 rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                Erstgespräch vereinbaren
              </Link>
              <a
                href="#programm"
                className="w-full sm:w-auto border border-accent/25 text-accent px-8 py-4 rounded-md font-medium hover:border-accent/50 transition-colors"
              >
                So ist das Programm aufgebaut
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sektion 2: Resonanz */}
      <section className="bg-surface px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <Eyebrow label="Worum es geht" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-8">
              Der Motor läuft auf Hochtouren, dein Tank ist leer
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-5 max-w-[68ch]">
              <p className="text-primary/80 text-lg leading-relaxed">
                Nach außen funktioniert alles. Das Unternehmen läuft, der
                Kalender ist voll, die Verantwortung wächst. Innen sieht es
                anders aus: Die Anspannung geht nicht mehr weg, der Schlaf ist
                flach und unruhig, die Gedanken kreisen non-stop. Momente echter Ruhe sind selten
                geworden, echte Freude noch seltener. Manche kennen Anxiety, manche Panikattacken.
              </p>
              <p className="text-primary/80 text-lg leading-relaxed">
                Vielleicht kennst du das Gefühl, dein Leben nur noch zu verwalten statt
                es aktiv zu gestalten. Mehr Disziplin und noch ein
                Produktivitätssystem helfen nicht weiter. Alkohol, Medikamente und andere Ablenkungen schon lange nicht mehr. 
                Das echte Problem sitzt in einem Nervensystem, das
                verlernt hat herunterzufahren. Und das schon seit langer Zeit. Die Anspannung ist chronisch geworden, die Erschöpfung tief.
              </p>
              <p className="text-primary/80 text-lg leading-relaxed">
                Genau dort setzt diese Begleitung an. Nicht mit noch mehr
                Strategien im Kopf, noch mehr Arbeiten, noch mehr Leisten. Sondern über den Körper.
                Über den Atem. Darüber, das Gefühl von echter Sicherheit und Ruhe zu spüren. 
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sektion 3: Programm */}
      <section id="programm" className="bg-background px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <Eyebrow label="Das Programm" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-8">
              Zehn Wochen, ein klarer Rahmen
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-primary/80 text-lg leading-relaxed max-w-[68ch] mb-10">
              Wir arbeiten zehn Wochen lang eng zusammen. Jede Woche eine
              persönliche Session von etwa 75 Minuten, remote oder in Hamburg. Dazwischen trägt
              dich eine tägliche Praxis mit Audio- und Video-Material, das ich für dich
              vorbereitet habe. Kurz genug für volle Kalender, wirksam durch
              Wiederholung.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <ol className="space-y-8 max-w-[68ch]">
              {bausteine.map((baustein, i) => (
                <li key={i} className="flex gap-6">
                  <span
                    className="mt-[0.75em] h-px w-6 shrink-0 bg-umber"
                    aria-hidden="true"
                  />
                  <p className="text-primary/80 text-lg leading-relaxed">
                    <strong className="font-medium text-primary">
                      {baustein.title}
                    </strong>{" "}
                    {baustein.body}
                  </p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      {/* Sektion 4: Methode */}
      <section className="bg-surface px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <Eyebrow label="Die Methode" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-8">
              Über den Körper, nicht über den Kopf
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-5 max-w-[68ch]">
              <p className="text-primary/80 text-lg leading-relaxed">
                Somatic Breathwork gibt dir einen direkten Zugang zu deinem
                Nervensystem. Der Atem ist die einzige Funktion des autonomen
                Nervensystems, die du bewusst steuern kannst, und damit der
                wirksamste Hebel, um Anspannung zu regulieren statt sie zu
                managen.
              </p>
              <p className="text-primary/80 text-lg leading-relaxed">
                Die IFS-orientierte Prozessarbeit bringt Klarheit in das, was
                innen los ist: die Antreiber, die inneren Kritiker, die Anteile,
                die nie Pause machen. Nicht um sie wegzumachen, sondern um zu
                verstehen, wovor sie dich schützen wollen. Aus diesem Verstehen
                entsteht echte Ruhe, die bleibt.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8">
              <Link
                href="/breathwork"
                className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Wie Somatic Breathwork wirkt
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sektion 5: Wer dich begleitet */}
      <section className="bg-background px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-0">

            {/* Header: mobil zuoberst, auf Desktop oben in der Textspalte */}
            <div className="lg:col-start-2 lg:row-start-1 lg:self-end">
              <FadeIn delay={0.1}>
                <Eyebrow label="Über mich" />
              </FadeIn>

              <FadeIn delay={0.2}>
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] lg:mb-8">
                  Wer dich begleitet
                </h2>
              </FadeIn>
            </div>

            {/* Porträt */}
            <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2">
              <FadeIn>
                <div className="flex justify-center lg:justify-end">
                  <Image
                    src="/portrait-lasse-sw.jpg"
                    alt="Lasse Klüver — Somatic Breathwork & IFS-Coach"
                    width={600}
                    height={800}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="rounded-md object-cover"
                  />
                </div>
              </FadeIn>
            </div>

            {/* Fließtext */}
            <div className="lg:col-start-2 lg:row-start-2 lg:self-start">
              <FadeIn delay={0.3}>
                <div className="space-y-5">
                  <p className="text-primary/80 text-lg leading-relaxed">
                    Ich bin Lasse Klüver, zertifizierter Breathe to Heal Facilitator
                    nach Max Strom und zertifizierter IFS-informed Coach, ausgebildet
                    bei Coaches Rising, nach ICF anerkannt. Zu meinen Lehrern dort
                    zählten Richard Schwartz, der Begründer des IFS-Modells, sowie
                    Loch Kelly, Amanda Blake und Marcella Cox.
                  </p>
                  <p className="text-primary/80 text-lg leading-relaxed">
                    Seit drei Jahren arbeite ich mit Menschen in
                    Breathwork-Sessions, Workshops und Retreats in Deutschland, auf
                    Mallorca und Ibiza. Einzelbegleitung war Teil meiner
                    IFS-Ausbildung und begleitet mich seitdem in meinen Sessions, Retreats und im
                    persönlichen Umfeld. Dieses Programm in dieser Form biete ich
                    zum ersten Mal an. Deshalb starte ich mit einer Gründungsrunde
                    von vier Plätzen.
                  </p>
                  <p className="text-primary/80 text-lg leading-relaxed">
                    Davor: Fünfzehn Jahre Verantwortung in Konzernen und Start-ups,
                    sechs Jahre Selbstständigkeit. Ich kenne die Welt, aus der du
                    kommst, aus eigener Erfahrung. Und ich kenne den Punkt, an dem immer weiter
                    Funktionieren nicht mehr trägt.
                  </p>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* Sektion 6: Gründungsrunde */}
      <section className="bg-surface px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <Eyebrow label="Gründungsrunde" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-8">
              Vier Plätze, offene Konditionen
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-5 max-w-[68ch]">
              <p className="text-primary/80 text-lg leading-relaxed">
                Die Begleitung liegt regulär bei 3.900 €. In der
                Gründungsrunde liegt sie bei 2.900 €. Der Unterschied ist
                kein Rabatt, sondern ein Tausch: Ich bitte dich um ausführliches
                Feedback und die Erlaubnis, mit deinem Ergebnis zu arbeiten,
                anonymisiert oder maximal mit Vornamen.
              </p>
              <p className="text-primary/80 text-lg leading-relaxed">
                Einmalzahlung oder zwei Raten. Der Start ist flexibel, du
                beginnst, wenn ein Platz frei ist und der Zeitpunkt für dich
                stimmt.
              </p>
              <p className="text-primary/80 text-lg leading-relaxed">
                Nur vier Plätze deshalb, weil diese Arbeit Tiefe und volle Präsenz braucht und ich
                sie mit voller
                Aufmerksamkeit begleiten will.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sektion 7: So starten wir */}
      <section className="bg-background px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <Eyebrow label="Der erste Schritt" align="center" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-6">
              Ein Gespräch, keine Verkaufsshow
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-primary/80 text-lg leading-relaxed mb-4 max-w-[68ch] mx-auto">
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
            <Link
              href="/termin"
              className="inline-block bg-accent text-background px-8 py-4 rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              Erstgespräch vereinbaren
            </Link>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="mt-6 text-muted text-sm">
              Noch nicht bereit für ein Gespräch?{" "}
              <a
                href="/#audio"
                className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Starte mit dem kostenfreien Audio.
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Sektion 8: Abgrenzung */}
      <section className="bg-surface px-6 py-10 md:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-muted text-sm leading-relaxed">
            Diese Begleitung ist Persönlichkeitsentwicklung und
            Stressregulation. Sie ersetzt keine psychotherapeutische oder
            ärztliche Behandlung. Wenn du in einer akuten Krise bist, ist ein
            Erstgespräch trotzdem willkommen, dann klären wir gemeinsam, welche
            Unterstützung du jetzt wirklich brauchst.
          </p>
        </div>
      </section>
    </>
  );
}
