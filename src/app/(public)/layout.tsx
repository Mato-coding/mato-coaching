import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import JsonLd from "@/components/seo/JsonLd";

// Kein eigener metadata-Export mehr: metadataBase, Title-Template und
// Beschreibung leben nur noch im Root-Layout (src/app/layout.tsx), Seiten
// setzen ihre eigene Metadata (inkl. canonical/openGraph) über
// buildMetadata() in src/lib/site.ts. Vorher war dieser Export byte-identisch
// zum Root-Layout dupliziert (Architektur-Audit 2.6).

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd />
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}