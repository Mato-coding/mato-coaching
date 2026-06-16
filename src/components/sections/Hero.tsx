import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center bg-background px-6">
      <div className="max-w-3xl mx-auto text-center mt-16 md:mt-0">
        
        {/* Dachzeile zur sofortigen inhaltlichen Einordnung */}
        <div className="text-sm font-medium tracking-widest uppercase text-accent mb-6">
          Somatic Breathwork & Integration
        </div>
        
        {/* Hauptaussage: Adressiert das Symptom direkt und ohne visuelle Konkurrenz */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-primary leading-[1.1] mb-8 tracking-tight">
          Wenn ständige Anspannung den Alltag übernimmt.
        </h1>
        
        {/* Subline: Bietet die Lösung und methodische Ausrichtung */}
        <p className="text-xl md:text-2xl text-primary/70 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          Ein unaufgeregter Raum, um das Nervensystem zu entladen. Finde aus dem Gedankenkarussell zurück in die körperliche Erdung.
        </p>
        
        {/* Call-to-Action Logik: Primär (direkt) vs. Sekundär (explorativ) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/termin"
            className="w-full sm:w-auto bg-accent text-background px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
          >
            Erstgespräch vereinbaren
          </Link>
          <Link
            href="/assessment"
            className="w-full sm:w-auto bg-surface text-primary border border-primary/10 px-8 py-4 rounded-full text-lg font-medium hover:border-primary/30 transition-all shadow-sm"
          >
            Zum Kurz-Assessment
          </Link>
        </div>

      </div>
    </section>
  );
}