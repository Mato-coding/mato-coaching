import Link from "next/link";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background py-32 px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <div className="mb-12">
          <Link href="/" className="text-sm text-primary/60 hover:text-primary transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl text-primary font-medium mb-8">Impressum</h1>
        <div className="space-y-6 text-primary/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-primary mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              Lasse Klüver<br />
              Seesrein 9<br />
              22459 Hamburg
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-primary mb-2">Kontakt</h2>
            <p>
              Telefon: +49 179 237 88 95<br />
              E-Mail: lassekluever@gmail.com
            </p>
          </section>
          <section>
            <p className="text-sm">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Lasse Klüver
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}