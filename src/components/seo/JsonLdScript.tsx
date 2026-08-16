// Gemeinsame Primitive für den script-type-application/ld+json-Boilerplate
// (Architektur-Audit 2.2/2.6, Refactoring-Auftrag 4). Der Schema-Inhalt
// bleibt beim jeweiligen Aufrufer, hier nur der wiederkehrende Rahmen.
export default function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
