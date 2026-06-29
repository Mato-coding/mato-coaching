import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

const faqs = [
  {
    question: "Wie lange dauert eine Sitzung?",
    /* TODO Dauer: Dauer für 1:1 und Gruppe eintragen */
    answer: "In der Regel dauert eine Sitzung 60-90 Minuten. Vereinzelt auch bis zu 120 Minuten. In Einzelsitzungen arbeiten wir ganz in deinem Tempo und können individuell auf deine Bedürfnisse und Zeit eingehen.",
  },
  {
    question: "Finden die Sitzungen in Hamburg oder online statt?",
    /* TODO Gruppen-Ort prüfen: Falls Gruppen auch online laufen, Antwort anpassen */
    answer:
      "Beides. Einzelsitzungen sind vor Ort und online möglich, Gruppen finden in Hamburg in verschiedenen Räumen und Studios statt.",
  },
  {
    question: "Brauche ich Erfahrung mit Atemarbeit?",
    answer: "Das ist nicht notwendig. Ich führe dich durch jeden Schritt und achte darauf, dass du dich bei allem sicher fühlst.",
  },
  {
    question: "Ist Breathwork sicher?",
    answer:
      "Alle Techniken die ich anwende, sind absolut sicher. Es gibt auch Breathwork-Techniken, die körperlich und emotional sehr intensiv sind und manche Menschen überfordern können. Diese wende ich aber in normalen Sitzungen nicht an, sondern nur in explizit dafür vorgesehenen Formaten in sicherem, kontrolliertem Rahmen. Im Erstgespräch klären wir immer vorab gesundheitliche Themen, bei denen Vorsicht geboten ist.",
  },
  {
    question: "Wie oft sollte ich kommen?",
    answer:
      "Schon eine einzige Sitzung führt in der Regel zu einer deutlichen Entspannung und größerer Ruhe. Und zu tieferem und erholsamem Schlaf. Für tiefere und nachhaltige Veränderung begleite ich dich über mehrere Sitzungen hinweg.",
  },
  {
    question: "Was kostet es?",
    answer:
      "Umfang und Investition sind recht individuell. Eine längere Begleitungbesprechen wir im Erstgespräch, passend zu dem, was du brauchst. Wenn du die Methode ohne große Hürde kennenlernen möchtest, kannst du auch in eine meiner öffentlichen Klassen kommen. Hier liegt der Preis für eine Schnupperstunde ca. bei 15€, je nach Studion und Rahmen.",
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
