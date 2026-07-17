# Workbook-Konzept: Digitales IFS-Workbook

> Stand: 17.07.2026 (Auftrag 1 abgeschlossen, Konzept auf Programm-Bereich-Schritt-Block-Hierarchie erweitert). Quelle der Wahrheit für das Feature "Digitales Workbook". Bei Aufgaben zu diesem Feature diese Datei vollständig lesen. Konfliktregel: CLAUDE.md für Projekt- und Technikstand, design-system.md für Gestaltung, profil-lasse.md für Person und Angebot, diese Datei für das Workbook-Feature.

## 1. Zweck und Status

Interaktives digitales IFS-Workbook für Klienten der 1:1-Begleitung. Eigenentwicklung auf dem bestehenden Stack (Next.js, Supabase, Vercel), kein Plattform-Einkauf (Kajabi u.ä. bewusst verworfen: Blocktypen nicht abbildbar, Daten im Silo, Design-Bruch, laufende Kosten).

Alle Inhalte sind Eigenkreationen in Lasses Sprache. Keine Übernahme von Texten, Übungsformulierungen oder Strukturen aus fremden Workbooks (Urheberrecht). Die IFS-Methodik selbst (Parts, Self, Manager, Firefighter, Exiles, 6 F's) ist frei nutzbar.

Status: Auftrag 1 (Fundament) ist umgesetzt. Es existieren: ein geschützter Bereich unter /programme mit Programmliste, /programme/ifs mit Bereichsübersicht, Auth per E-Mail-Code über Supabase (bewusste Entscheidung statt Magic Link, weil robuster gegenüber Mail-Clients), ein gemeinsamer Header mit drei Zuständen je nach Login-Status, ein gemeinsamer Footer, Middleware mit Session-Refresh sowie die Tabellen workbook_responses und workbook_access mit RLS. Klienten-Anlage erfolgt manuell in Supabase. Nächster Schritt ist Auftrag 2 (siehe Abschnitt 12).

## 2. Branch-Regel (verbindlich)

Das gesamte Feature entsteht auf dem Branch `feature/workbook`. Kein Workbook-Code auf `main`, bis der MVP steht und explizit gemergt wird. Jeder Claude-Code-Prompt zu diesem Feature endet mit Commit und Push auf `origin feature/workbook`, nie auf main. Die Website läuft parallel auf main weiter.

## 3. Inhaltliche Struktur

Hierarchie: **Programm → Bereich → Schritt → Block**. URL-Struktur: /programme/[programm-slug]/[bereich-slug]/[schritt-slug]. Das erste Programm hat den Slug ifs.

Die Anzahl der Bereiche ist eine Eigenschaft der jeweiligen Programm-Config, keine Systemregel. Kein Code darf eine feste Bereichszahl annehmen, Iteration, Fortschritt und Sperrlogik leiten sich aus der Config ab.

Jedes Programm hat einen Introbereich als Bereich 0 mit dem Slug einstieg. Er ist immer freigeschaltet, sobald der Klient für das Programm freigeschaltet ist (siehe Abschnitt 4).

Das Programm ifs hat den Einstiegsbereich plus fünf inhaltliche Bereiche, sequenziell aufgebaut:

1. Lerne deine Anteile und dein Selbst kennen
2. Würdige deine überarbeiteten Manager-Anteile
3. Schließe Freundschaft mit deinen aktivierten Firefightern
4. Nimm deine belasteten Verbannten an
5. Erschließe dir ein selbstgeführtes Leben

Ein Bereich enthält mehrere Schritte (je eine Seite oder Sektion). Ein Schritt besteht aus einer geordneten Liste von Blöcken. Medien-Blöcke (Audio, Video) sind keine eigenen Schritte, sondern frei zwischen anderen Blöcken platzierbar (z.B. Erklärvideo vor einer Tabelle, Meditations-Audio am Schluss).

Typische Schritt-Inhalte: Einführung, Self-Assessment, Meditation, Bestandsaufnahme, Reflexion, Inspirationstext, Visualisierungsimpuls.

## 4. Freischaltlogik

- Bereiche sequenziell: Bereich n+1 öffnet nach Abschluss von Bereich n.
- Innerhalb eines Bereichs freie Bewegung zwischen den Schritten.
- Manuelle Freischaltung pro Klient durch Lasse möglich (Steuerung passend zum Sessionstand).
- Freischaltung läuft auf Bereichsebene über `workbook_access.unlocked_areas` (Int-Array). Das Array steuert nur Bereiche ab 1.
- Bereich 0 (Einstieg) ist implizit offen, sobald eine `workbook_access`-Zeile für das Programm existiert (Variante A, dokumentierte Regel im Code statt manueller Datenpflege). Existiert keine Zeile, gibt es keinen Zugriff auf das Programm.

## 5. Inhalte als Konfiguration

Inhalte leben getrennt vom Code als typisierte Config-Dateien (Muster wie `assessment-config.ts`):

- `src/content/workbook/<programm-slug>/bereich-0-einstieg.ts` plus `bereich-1.ts` bis `bereich-n.ts` je nach Programm (bzw. gemeinsamer Index pro Programm).
- Jede Datei definiert Schritte und Blöcke deklarativ. Textänderungen erfordern keine Code-Aufgabe.
- TypeScript-Typen für alle Blocktypen in `src/lib/workbook-types.ts` (o.ä.), damit Configs beim Build validiert werden.

## 6. Block-Typen

| Typ | Inhalt (Config) | Antwortdaten (value) |
|---|---|---|
| `text` | Markdown/JSX-Inhalt | keine |
| `audio` | Storage-Pfad, Titel, Dauer, Begleittext | optional `{ listened: boolean }` |
| `video` | Vimeo-ID, Titel, Begleittext | optional `{ watched: boolean }` |
| `choice` | Frage, Optionen, single/multi | Auswahl-Array |
| `freetext` | Frage, Placeholder, optional Mindesthöhe | `{ text }` |
| `scale` | Frage, Min/Max, Endpunkt-Labels | `{ value: number }` |
| `table` | Spaltendefinition, Startzeilen, Zeilen ergänzbar | Zeilen-Array |
| `wordlist` | vorgegebene Wörter, eigene ergänzbar, Auswahlmodus | gewählte plus eigene Wörter |
| `association` | Stimulus-Begriffe | Textpaare |
| `cloze` | Text mit Lücken | Lückenwerte |
| `bodymap` | Variante (siehe 7) | markierte Regionen mit Qualität/Intensität und Notiz |
| `visual` | Impulstext | MVP: Freitext-Beschreibung; später Foto-Upload |

Alle Antworten in einer Tabelle, ein Schema für alle Typen (siehe 9). Neue Blocktypen sind dadurch günstig ergänzbar.

## 7. Bodymap-Spezifikation

- Keine Freihand-Zeichnung. SVG-Silhouette mit anklickbaren Regionen (Kopf, Hals, Schultern, Brust, Bauch, Rücken oben/unten, Arme, Hände, Becken, Beine, Füße).
- Pro Region wählbar: Qualität (z.B. Enge, Wärme, Druck, Taubheit, Kribbeln, Weite) und/oder Intensität, plus optionale Notiz.
- Vier Varianten: Ganzkörper front, Ganzkörper Rückseite, Oberkörper mit Kopf front, Oberkörper mit Kopf Rückseite. Die Config wählt die Variante.
- Daten sind strukturiert und über Wochen vergleichbar (Verlaufsdarstellung ist spätere Ausbaustufe).
- Gestaltung ruhig, im Design-System (Hairlines, Umber sparsam als Markierungsakzent prüfen).

## 8. Medien-Hosting

- **Audio:** Supabase Storage, Auslieferung über signierte URLs nur für eingeloggte Klienten. Eigener Player im Seitendesign, kein Browser-Standardplayer.
- **Video:** Vimeo (Player ohne Fremdbranding, Domain-Beschränkung auf lassekluever.de). In der Config steht nur die Vimeo-ID. Bunny Stream als spätere Option bei wachsender Videomenge. Kein Selbst-Hosting von Videos über 2 bis 3 Minuten, kein YouTube.
- Workflow: Datei hochladen (Supabase bzw. Vimeo), Pfad/ID in die Config eintragen.

## 9. Datenmodell (Supabase)

Migration: `supabase/migrations/20260717000000_workbook_foundation.sql`.

- `workbook_responses`: id (uuid), client_id (uuid, Supabase Auth User-ID), program (text), block_id (text, stabiler String aus der Config, z.B. `b1.s2.reflexion-1`), value (jsonb), created_at, updated_at. Unique-Constraint auf (client_id, program, block_id). Upsert pro dieses Tripel. Ein Schema für alle Blocktypen.
- `workbook_access`: client_id (uuid), program (text), unlocked_areas (int-Array), updated_at. Primary Key (client_id, program). Für manuelle Freischaltung pro Klient und Programm durch Lasse im Dashboard.
- Block-IDs müssen nur innerhalb eines Programms eindeutig sein, weil program eine eigene Spalte ist. Kein Programm-Präfix in der ID. Muster bleibt `b1.s2.reflexion-1`, für den Einstiegsbereich `b0.s1....`. IDs sind stabil und werden nie umbenannt, sonst verwaisen Antworten. Neue Blöcke bekommen neue IDs.
- RLS an, kein Public-Zugriff. Klienten: select/insert/update eigene Zeilen in workbook_responses, select eigene Zeile in workbook_access. Keine Delete-Policy. Freischaltung nur über Service-Role.
- Autosave: Speichern bei Eingabe (debounced), kein expliziter Speichern-Button als einzige Option.

### Fortschrittsdefinition

- Ein Block zählt als beantwortet, wenn ein Wert in workbook_responses liegt. Reine text-Blöcke zählen nicht, sie haben keinen Wert.
- Schrittfortschritt = beantwortete Blöcke durch zählende Blöcke. Ein Schritt ist abgeschlossen, wenn alle zählenden Blöcke beantwortet sind.
- Bereichsfortschritt = abgeschlossene Schritte durch Gesamtschritte.
- Fortschrittsbalken auf Bereichs- und Schrittebene, Umber-Muster analog AssessmentForm.
- Offen (Entscheidung bei Auftrag 3): Marker für Schritte ohne zählende Blöcke, z.B. ein listened-Flag beim Audio oder ein Gelesen-Marker, damit solche Schritte abschließbar sind.

## 10. Auth und Datenschutz

- Login über Supabase Auth mit OTP-Code-Eingabe (kein Passwort, kein Link-Klick). Zugang nur für aktive Klienten, Anlage manuell durch Lasse (Supabase Dashboard, "Invite by email"). Self-Signup ist in den Auth-Settings deaktiviert.
- Technische Begründung für OTP statt Magic-Link-Klick: PKCE-Magic-Links werden von Mail-Scannern (z.B. Gmail Safe Browsing) vorab aufgerufen und dadurch verbraucht, bevor die Person selbst klickt. Der 6-stellige Code, den Supabase in derselben Mail mitschickt, ist davon nicht betroffen.
- Flow: Schritt 1 E-Mail eingeben, `signInWithOtp` mit `shouldCreateUser: false` aufrufen. Schritt 2 Code eingeben, `verifyOtp` mit `type: "email"` aufrufen. Bei Erfolg Redirect auf `/programme` (oder auf `?next=`-Parameter). `/auth/callback` bleibt für Rückwärtskompatibilität bestehen, wird im normalen Flow nicht mehr angesteuert.
- Klienten-Reflexionen sind sensible Daten (Gesundheitsbezug). Vor Livegang mit echten Klienten: eigener Datenschutz-Absatz, explizite Einwilligung, Entscheidung und Transparenz darüber, ob Lasse Einträge einsehen kann. Coach-Ansicht ist Ausbaustufe 2 und nur mit expliziter Einwilligung.

**Entschiedene Routen-Struktur (Auftrag 1):**
- Geschützter Hub: `/programme` (Route Group `(members)`, teilt Header und Footer mit der öffentlichen Website)
- Login: `/programme/login` (öffentlich, aber noindex)
- Erstes Programm: `/programme/ifs`
- Auth-Callback: `/auth/callback` (Code-Exchange, bleibt für Kompatibilität, wird im normalen Flow nicht mehr genutzt)
- Mehrprogrammfähig: weitere Programme als `/programme/<slug>`, gesteuert über `PROGRAMS` in `src/lib/workbook-programs.ts`
- Nicht in Sitemap. `robots: noindex, nofollow` im Members-Layout. `/programme/` und `/auth/` in robots.ts disallowed.

## 11. Design und Ton

Layout-Entscheidung (17.07.2026, ersetzt das frühere reduzierte Eigenlayout): Der Mitgliederbereich nutzt denselben Header und Footer wie die öffentliche Website. Ein Header, drei Zustände: nicht eingeloggt zeigt den Erstgespräch-CTA, eingeloggt außerhalb von /programme zeigt den CTA "Mein Programm", eingeloggt innerhalb von /programme zeigt einen leisen Abmelden-Textlink. Der Auth-Status wird clientseitig im Header-Slot geprüft (HeaderAuthSlot), damit die öffentlichen Seiten statisch bleiben. Die Session lebt in Cookies und gilt domainweit, eingeloggte Klienten können die gesamte Website nutzen, ohne den Status zu verlieren. Der Footer ist überall identisch und ohne Auth-Logik. Die Route des geschützten Bereichs ist entschieden: /programme.

- design-system.md gilt vollständig: Tokens aus globals.css, Cormorant/Hanken Grotesk, Atem-Rhythmus, FadeIn wiederverwenden, Motion leise.
- Copy-Regeln aus CLAUDE.md gelten auch im Workbook (Ampel-Logik, sentence case, aktive Verben, keine Gedankenstriche, keine Heilversprechen).
- Interaktionselemente folgen den bestehenden Formular-Mustern (LeadMagnetForm, AssessmentForm) in Anmutung und Fokus-Verhalten.
- Mobile first denken: Klienten füllen zwischen Sessions am Handy aus.

## 12. Ausbaustufen und Auftragsfahrplan

**MVP (Pilotrunde):**
1. ~~Fundament~~ (erledigt): Branch, Routen-Segment, Supabase-Tabellen mit RLS, Auth mit OTP-Code (kein Magic-Link-Klick, Mail-Scanner-robust), leere Bereichsübersicht.
2. Block-Renderer mit diesem festen Zuschnitt:
   - `workbook-types.ts` mit Typen für alle 12 Blocktypen plus Struktur Programm (variable Bereichsliste, Bereich 0 = Einstieg), Schritte, Blöcke.
   - Dummy-Config für ifs: Einstieg plus zwei bis drei Test-Schritte, klar als Platzhalter markiert.
   - Routen /programme/ifs/[bereich-slug] (Schrittliste) und /programme/ifs/[bereich-slug]/[schritt-slug] (Block-Renderer), aufbauend auf der bestehenden Übersicht.
   - Renderer für `text`, `freetext`, `scale`, `choice` mit debounced Autosave (Upsert über client_id, program, block_id), dezenter Speicher-Status.
   - Sperrlogik lesend nach unlocked_areas, Einstieg immer offen bei vorhandener Zeile.
   - Fortschrittsbalken auf beiden Ebenen nach der Fortschrittsdefinition (Abschnitt 9), Umber-Muster aus AssessmentForm wiederverwenden oder als gemeinsame Komponente extrahieren.
   - Nicht enthalten: Freischalt-Schreiblogik (Auftrag 6), Audio, Video, Bodymap, echte Inhalte.
3. Blocktypen `table`, `wordlist`, `audio` (inkl. Storage-Anbindung und Player).
4. Blocktyp `bodymap` (eigener Auftrag, aufwendigster Block).
5. Blocktyp `video` (Vimeo-Embed im Seitendesign).
6. Freischalt-Schreiblogik (Klienten-Freischaltung durch Lasse, Dashboard oder Admin-Aktion).
7. Inhalte Bereich 1 (Config-Datei aus dem Strategie-Chat).

**Stufe 2 (nach Pilotstart):** `cloze`, `association`, Foto-Upload für `visual`, Coach-Ansicht (mit Einwilligungskonzept), Verlaufsdarstellung Bodymap.

**Stufe 3 (nach Pilotrunde):** Standalone-Verkauf mit Stripe, ggf. Bunny Stream.

Inhalte entstehen rollierend: Bereich 1 und 2 reichen für den Pilotstart.

## 13. Workflow pro Bereich (Erinnerung)

1. Inhalte im Claude.ai-Chat ausarbeiten (Schritte, Blöcke, Texte).
2. Ergebnis ist eine fertige Config-Datei plus Claude-Code-Prompt.
3. Audios/Videos produziert Lasse, Pfade/IDs in die Config.
4. Selbst durchlaufen, Korrekturen direkt in VS Code, commit auf den Feature-Branch.
