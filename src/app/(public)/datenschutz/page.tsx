import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-background py-32 px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <div className="mb-12">
          <Link href="/" className="text-sm text-primary/60 hover:text-primary transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl text-primary font-medium mb-8">Datenschutzerklärung</h1>
        <div className="space-y-8 text-primary/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-primary mb-2">1. Datenschutz auf einen Blick</h2>
            <p>
              Allgemeine Hinweise: Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du diese Website besuchst.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-primary mb-2">2. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
              Lasse Klüver<br />
              Seesrein 9<br />
              22459 Hamburg<br /><br />
              E-Mail: lassekluever@gmail.com
            </p>
          </section>
          <section>
            <div className="bg-surface p-6 rounded-xl border border-primary/10 mt-8">
              <p className="text-sm text-primary/70">
                <strong>Wichtiger Hinweis vor dem Live-Gang:</strong> Dies ist eine Platzhalter-Struktur. Da du über Cal.com/Calendly und potenziell andere Dienste Daten verarbeitest, muss hier ein rechtssicherer Text eingefügt werden. Nutze dafür einen Generator wie eRecht24 und ersetze diesen gesamten Inhaltsblock durch das generierte HTML.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}