# Architektur-Fahrplan und Entscheidungs-Register

> Stand: 04.09.2026. Ablageort: Repo-Root, über GitHub ins Projektwissen gesynct. Diese Datei ist die Quelle der Wahrheit für abgeschlossene Architektur-Entscheidungen und die nächsten Schwerpunkte. Bei jedem abgeschlossenen Auftrag mit aktualisieren. Die frühere Kopie im Claude-Projektwissen (claude/architektur-fahrplan.md) ist durch diese Datei ersetzt. Status SEO-3 ergänzt: Artikel 01 (Wim-Hof-Atmung) veröffentlicht.

## Status: Architektur-Serie abgeschlossen

Die fünfteilige Architektur-Refactoring-Serie (Aufträge 1 bis 5, August 2026) ist vollständig auf main gemergt und live auf www.lassekluever.de. Grundlage war architektur-audit.md (Audit vom 15.08.2026). Ergebnis: Alle Seiten stehen auf dem UI-Primitive-Baukasten, Tokens in globals.css sind die einzige Design-Quelle, Metadata und JSON-LD laufen über zentrale Helper, Lint ist komplett grün.

## Konventionen und Entscheidungen (verbindlich)

1. Section-Padding: drei Größen im Section-Primitive (compact = py-10 md:py-12, default = py-16 md:py-24, spacious = py-24 md:py-40).
2. Primitive-Satz: Section, Container, Eyebrow, Button, Heading (display, display-sub, section, emphasis), Card (default, large, compact), ListMark, StepList, JsonLdScript. UI-Muster nur über diese Bauteile, keine handgerollten Klassenketten.
3. Sektionen sind kontextfrei: Sie bringen Section-Wrapper und FadeIns selbst mit, Seiten sind reine Kompositionslisten. Neue Seiten folgen dem Muster sections/<seite>/*.tsx.
4. Tokens in globals.css sind die Quelle für Farben, Typo, Abstände, Breiten. Ungenutzte Tokens wurden entfernt (Liste in architektur-audit.md).
5. Textspalten: Container zentriert als äußerer Rahmen, linksbündige Textspalten über max-w-measure direkt am Element. Keine neuen Breitenbegrenzungen im Zuge von Struktur-Refactorings.
6. Ränder: Trennlinien und Kartenränder nur über das hairline-Token.
7. Metadata nur über buildMetadata() in lib/site.ts. Canonical-Altbug behoben (/assessment, /termin, /journal erbten das Startseiten-Canonical).
8. JSON-LD: globales ProfessionalService-Schema auf allen Seiten, Artikel zusätzlich BlogPosting (bewusst zwei Blöcke). Boilerplate nur über JsonLdScript.tsx.
9. Anchor-Konstanten in src/lib/anchors.ts. Inpage-IDs und interne #-Links nur darüber.
10. Journal: draft: true blendet Artikel aus Übersicht und Sitemap aus, Detailseite in Produktion notFound().
11. Typen: ResultActions und /api/assessment validieren gegen Cluster/ResultRoute.
12. Header ist Server-Komponente, Logo-Link in HeaderLogoLink.tsx (Client), Logos über next/image mit priority.
13. About auf /breathwork: vorerst die geteilte About.tsx der Startseite. Eigene Copy zurückgestellt (Entwurf vom 15.08. verworfen). /coaching hat eine eigene CoachingAbout.tsx.
14. E-Mail: hello@lassekluever.de auf Impressum und Datenschutz (Adresse existiert und wird empfangen).

## Dokumentierte Ausnahmen

- Hero.tsx (Startseite) bleibt außerhalb von Section (min-h-[80vh], asymmetrisches Padding).
- CTA.tsx behält seine max-w-2xl-Textspalte.
- CoachingAbout.tsx behält die literale max-w-6xl (1152px, Zwei-Spalten-Grid mit Bild).

## Nächster Schwerpunkt: SEO-Offensive

Befund (Search Console, 3 Monate, Stand 16.08.2026): Marken-Suchen ranken gut ("lasse klüver" Position 2,7). Die zwei relevanten Nicht-Marken-Queries ranken schlecht: "breathwork hamburg" Position ~94, "max strom breathe to heal" Position ~43. Impressionen jeweils minimal.

Diagnose: Die technische Basis ist seit Auftrag 4 sauber (Canonicals, Metadata, Schema, Sitemap). Die Schwächen liegen woanders: junge Domain mit kaum Backlinks, dünne interne Verlinkung (bewusst keine Header-Navigation, knapper Footer), Content-Tiefe für die Ziel-Queries, ungenutztes Potenzial im Google Business Profile. Erwartung ehrlich setzen: "breathwork hamburg" ist eine umkämpfte lokale Query gegen etablierte Studios, Wirkung zeigt sich über Monate. Autorität (Bewertungen, Links) wirkt hier stärker als weiterer Text. "max strom breathe to heal" ist realistischer kurzfristig gewinnbar, der Artikel existiert bereits und braucht Tiefe.

Maßnahmen, priorisiert:

1. SEO-1, Quick Wins ohne Code: Google Business Profile ausbauen (Kategorien, Leistungen, Beschreibung, Fotos, regelmäßige Beiträge, Verknüpfung mit www.lassekluever.de), systematisch Bewertungen von Klienten einsammeln, Backlinks aktivieren: The Shala (teacher-lasse-Seite verlinkt die Website? prüfen und bitten), weitere seriöse lokale Einträge und Verzeichnisse, Social-Profile (LinkedIn, Instagram) verlinken die Domain und kommen in sameAs im Schema.

Status SEO-1 (16.08.2026): Checkliste erstellt, Umsetzung läuft ohne Code durch Lasse. Die vollständige, abhakbare Checkliste liegt im Claude-Projektwissen als claude/seo-1-checkliste.md. Entscheidungen: Google Business Profile als Dienstleistungsunternehmen mit Einzugsgebiet Hamburg ohne sichtbare Adresse. GBP-Beschreibung, Leistungen und Q&A nach Ampel-Logik v2 formuliert (Erlebens-Nennungen grün, Disclaimer enthalten, keine Therapie-Kategorien). Bewertungen einzeln und stetig einsammeln, zuerst 1:1-Begleitungen, dann Gruppensession-Teilnehmer, keine Anreize, ab etwa 5 Bewertungen folgt AggregateRating als kleiner Code-Auftrag. Backlink-Befund: theshala.de/teacher-lasse existiert und verlinkt keine Website, Verlinkungsbitte an The Shala ist der wichtigste Einzellink. Weitere Kandidaten: weitere Studios (Namen offen), LinkedIn-Profil, Apple Business Connect, Bing Places, Anfrage bei Max Strom (kein öffentliches Facilitator-Verzeichnis vorhanden), Coaches Rising und ICF prüfen. Kein berufliches Instagram, Instagram bleibt im Ideen-Parkplatz. Offener Rest aus SEO-1 für spätere Code-Aufträge: sameAs im Schema ergänzen, sobald neue Profile stehen.

2. SEO-2, On-Page /breathwork für "breathwork hamburg": Title, H1, Copy und FAQ gezielt auf die Query prüfen und schärfen (im Rahmen der Copy-Regeln, keine Heilversprechen), lokalen Bezug stärken, areaServed im Schema, interne Links von Startseite und Journal-Artikeln auf /breathwork.
3. SEO-3, Max-Strom-Artikel ausbauen: der umfassendste deutschsprachige Artikel zu Breathe to Heal werden (Buch, Methode, Kernübungen, eigene Praxiserfahrung, Abgrenzung), Title und Description auf die Query, interne Verlinkung zu /breathwork. Perspektivisch Artikel-Cluster rund um Atemarbeit und Nervensystem mit Querverlinkung.

Status SEO-3 (04.09.2026): Artikel 01 (Wim-Hof-Atmung, /journal/wim-hof-atmung-nervensystem) veröffentlicht am 08.09.2026. Nächster Schritt: Ausbau des Max-Strom-Artikels (KW 38), danach wöchentlich nach claude/journal-keyword-plan.md im Claude-Projekt.

4. SEO-4, Struktur: Header-Navigation und ausführlicherer Footer (interne Verlinkung, auch Voraussetzung für Google-Sitelinks). Laut CLAUDE.md-Entscheidung erst nach /ifs, dieser Punkt verzahnt sich daher mit dem /ifs-Bau.

Nächster Auftrag: SEO-2, On-Page /breathwork, eigener Chat.

## Weitere nächste Schritte (Ideen-Parkplatz)

- /ifs als dritte Service-Seite auf Primitive-Basis (CLAUDE.md offene Aufgabe 2), danach die Navigations-Entscheidung (SEO-4).
- Design-Runde: Tokens und Varianten überarbeiten, Containerbreiten-Frage (max-w-2xl/6xl-Ausnahmen vs. Token-Breiten) als bewusste Entscheidung. Erst nach den SEO-Content-Aufträgen sinnvoll.
- Eigene Über-mich-Copy für /breathwork.
- Copy-Extraktion nach src/content nach dem assessment-config-Muster (optional, unpriorisiert).
- Offene Rest-Prüfung auf Produktion: Assessment durchklicken, Audio-Formular-Ränder, /journal, Tab-Titel von /coaching, /impressum, /datenschutz. Falls Input-Ränder zu kräftig wirken: eigenes Input-Token als kleiner Nachtrag.
- Branch-Hygiene: nur vollständig gemergte Branches löschen, feature/workbook und feature/assessment-v2 nie anfassen.

## Arbeitsweise (unverändert)

Strategie und Copy im Chat, Umsetzung über Claude-Code-Prompts, ein Auftrag pro Chat. Code-Aufträge auf eigenem Branch mit Vercel-Preview, Merge auf main erst nach Freigabe durch Lasse. Wissensdateien (CLAUDE.md, design-system.md, diese Datei) bei jedem Auftrag mit aktualisieren.
