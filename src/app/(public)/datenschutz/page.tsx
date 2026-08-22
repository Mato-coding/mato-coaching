import Link from "next/link";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import { buildMetadata } from "@/lib/site";

export const metadata = buildMetadata({
  path: "/datenschutz",
  title: "Datenschutzerklärung",
  description:
    "Somatic Breathwork, Coaching und IFS-orientierte Prozessbegleitung in Hamburg und online. Begleitung bei innerer Unruhe, Anspannung und Erschöpfung.",
});

export default function DatenschutzPage() {
  return (
    <Section
      size="default"
      className="min-h-screen bg-background flex flex-col items-center"
    >
      <div className="max-w-3xl w-full">
        <div className="mb-12">
          <Link href="/" className="text-sm text-primary/60 hover:text-primary transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
        <Heading variant="section" as="h1" className="mb-8">Datenschutzerklärung</Heading>
        <div className="space-y-8 text-primary/80 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-medium text-primary mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-lg font-medium text-primary mb-2 mt-4">Allgemeine Hinweise</h3>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>
            <h3 className="text-lg font-medium text-primary mb-2 mt-4">Datenerfassung auf dieser Website</h3>
            <p>
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
            </p>
            <p className="mt-4">
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular oder bei der Terminbuchung eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3 className="text-lg font-medium text-primary mb-2 mt-4">Hinweis zur verantwortlichen Stelle</h3>
            <p className="mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
              Lasse Klüver<br />
              Seesrein 9<br />
              22459 Hamburg<br /><br />
              Telefon: +49 179 237 88 95<br />
              E-Mail: hello@lassekluever.de
            </p>
            <p>
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>

            <h3 className="text-lg font-medium text-primary mb-2 mt-4">Speicherdauer</h3>
            <p className="mb-4">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>

            <h3 className="text-lg font-medium text-primary mb-2 mt-4">SSL- bzw. TLS-Verschlüsselung</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mb-4">3. Datenerfassung auf dieser Website</h2>
            <h3 className="text-lg font-medium text-primary mb-2 mt-4">Hosting und Server-Log-Dateien</h3>
            <p className="mb-4">
              Wir hosten unsere Website bei Vercel. Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
            </p>
            <p className="mb-4">
              Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adressen. Die Nutzung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung und Bereitstellung unserer Website. Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mb-4">4. Plugins und Tools</h2>
            <h3 className="text-lg font-medium text-primary mb-2 mt-4">Terminbuchung über Cal.com</h3>
            <p className="mb-4">
              Für die Online-Terminbuchung nutzen wir den Dienst Cal.com. Anbieter ist die Cal.com, Inc., 548 Market St, San Francisco, CA 94104, USA.
            </p>
            <p className="mb-4">
              Wenn Sie einen Termin über unsere Website buchen, werden die von Ihnen eingegebenen Daten (insbesondere Name und E-Mail-Adresse) sowie das gewählte Datum und die Uhrzeit an die Server von Cal.com übertragen und dort gespeichert. Diese Daten werden ausschließlich zur Organisation und Verwaltung der Termine verarbeitet.
            </p>
            <p>
              Die Nutzung von Cal.com erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Buchung mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an einer effektiven Terminorganisation (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mb-4">5. Feedback-Formular</h2>
            <p className="mb-4">
              Unter /feedback können Teilnehmerinnen und Teilnehmer nach einer Klasse, einem Workshop oder einer Einzelsitzung eine Rückmeldung zu ihrer Erfahrung geben. Der Zugang erfolgt über einen QR-Code, der direkt in der jeweiligen Klasse, dem Workshop oder der Sitzung ausgehängt bzw. gezeigt wird. Zweck der Verarbeitung ist die Qualitätsrückmeldung zu unseren Angeboten.
            </p>
            <p className="mb-4">
              Gespeichert werden das besuchte Format, die abgegebene Bewertung, die gewählten Beschreibungsworte, die frei formulierten Antworten, optional Name und E-Mail-Adresse, die abgegebenen Einwilligungen, eine Herkunftskennung des jeweiligen QR-Codes (z. B. welche Klasse oder welcher Kurstag) sowie der Seitenpfad des Aufrufs. Keine IP-Adresse, kein Gerät oder Browser wird gespeichert.
            </p>
            <p className="mb-4">
              Rechtsgrundlage ist bei Angabe von Name und E-Mail-Adresse Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), im Übrigen unser berechtigtes Interesse an einer ehrlichen Qualitätsrückmeldung zu unseren Angeboten (Art. 6 Abs. 1 lit. f DSGVO). Wenn Sie zusätzlich einwilligen, dass Ihre Worte anonym als Teilnehmerstimme auf dieser Website gezeigt werden dürfen, geschieht auch das ausschließlich anonym, ohne Namen oder sonstige identifizierende Angaben, und nur auf Grundlage dieser gesonderten Einwilligung.
            </p>
            <p className="mb-4">
              Die Daten werden 24 Monate gespeichert und danach gelöscht oder anonymisiert. Für den Versand der internen Benachrichtigung bei neuem Feedback nutzen wir Resend, für die Speicherung Supabase, beide als Auftragsverarbeiter im Sinne von Art. 28 DSGVO.
            </p>
            <p>
              Sie können eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, formlos per E-Mail an hello@lassekluever.de.
            </p>
          </section>

        </div>
      </div>
    </Section>
  );
}