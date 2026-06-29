import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

const faqs = [
  {
    question: "Wie lange dauert eine Sitzung?",
    /* TODO Dauer: Dauer für 1:1 und Gruppe eintragen */
    answer: "{{DAUER_FAQ}}",
  },
  {
    question: "Finden die Sitzungen in Hamburg oder online statt?",
    /* TODO Gruppen-Ort prüfen: Falls Gruppen auch online laufen, Antwort anpassen */
    answer:
      "Beides. Einzelsitzungen sind vor Ort und online möglich, Gruppen finden in Hamburg statt.",
  },
  {
    question: "Brauche ich Erfahrung mit Atemarbeit?",
    answer: "Nein. Ich führe dich durch jeden Schritt.",
  },
  {
    question: "Ist Breathwork sicher?",
    answer:
      "Bei guter Vorbereitung ja. Im Erstgespräch klären wir vorab gesundheitliche Themen, bei denen Vorsicht geboten ist.",
  },
  {
    question: "Wie oft sollte ich kommen?",
    answer:
      "Eine einzelne Sitzung steht für sich. Für tiefere Veränderung begleite ich dich über mehrere Sitzungen hinweg.",
  },
  {
    question: "Was kostet es?",
    answer:
      "Umfang und Investition besprechen wir im Erstgespräch, passend zu dem, was du brauchst.",
  },
];

export default function BreathworkFAQ() {
  return (
    <section className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Eyebrow label="Fragen" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-10">
            Häufige Fragen
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <dl className="space-y-8 max-w-[68ch]">
            {faqs.map((faq, i) => (
              <div key={i} className="border-t border-hairline pt-6">
                <dt className="font-medium text-primary text-lg mb-2">
                  {faq.question}
                </dt>
                <dd className="text-primary/70 text-base leading-relaxed">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
