# Workbook-Konzept: Digitales IFS-Workbook

> Stand: 17.07.2026 (Mitgliederbereich auf gemeinsames Header/Footer-Layout umgestellt). Quelle der Wahrheit für das Feature "Digitales Workbook". Bei Aufgaben zu diesem Feature diese Datei vollständig lesen. Konfliktregel: CLAUDE.md für Projekt- und Technikstand, design-system.md für Gestaltung, profil-lasse.md für Person und Angebot, diese Datei für das Workbook-Feature.

## 1. Zweck und Status

Interaktives digitales IFS-Workbook für Klienten der 1:1-Begleitung. Eigenentwicklung auf dem bestehenden Stack (Next.js, Supabase, Vercel), kein Plattform-Einkauf (Kajabi u.ä. bewusst verworfen: Blocktypen nicht abbildbar, Daten im Silo, Design-Bruch, laufende Kosten).

Alle Inhalte sind Eigenkreationen in Lasses Sprache. Keine Übernahme von Texten, Übungsformulierungen oder Strukturen aus fremden Workbooks (Urheberrecht). Die IFS-Methodik selbst (Parts, Self, Manager, Firefighter, Exiles, 6 F's) ist frei nutzbar.

Status: Konzept steht, Umsetzung startet mit Auftrag 1 (siehe Abschnitt 12).

## 2. Branch-Regel (verbindlich)

Das gesamte Feature entsteht auf dem Branch `feature/workbook`. Kein Workbook-Code auf `main`, bis der MVP steht und explizit gemergt wird. Jeder Claude-Code-Prompt zu diesem Feature endet mit Commit und Push auf `origin feature/workbook`, nie auf main. Die Website läuft parallel auf main weiter.

## 3. Inhaltliche Struktur

Fünf Bereiche, sequenziell aufgebaut:

1. Lerne deine Anteile und dein Selbst kennen
2. Würdige deine überarbeiteten Manager-Anteile
3. Schließe Freundschaft mit deinen aktivierten Firefightern
4. Nimm deine belasteten Verbannten an
5. Erschließe dir ein selbstgeführtes Leben

Hierarchie: **Bereich → Schritt → Block**. Ein Bereich enthält mehrere Schritte (je eine Seite oder Sektion). Ein Schritt besteht aus einer geordneten Liste von Blöcken. Medien-Blöcke (Audio, Video) sind keine eigenen Schritte, sondern frei zwischen anderen Blöcken platzierbar (z.B. Erklärvideo vor einer Tabelle, Meditations-Audio am Schluss).

Typische Schritt-Inhalte: Einführung, Self-Assessment, Meditation, Bestandsaufnahme, Reflexion, Inspirationstext, Visualisierungsimpuls.

## 4. Freischaltlogik

- Bereiche sequenziell: Bereich n+1 öffnet nach Abschluss von Bereich n.
- Innerhalb eines Bereichs freie Bewegung zwischen den Schritten.
- Manuelle Freischaltung pro Klient durch Lasse möglich (Steuerung passend zum Sessionstand).

## 5. Inhalte als Konfiguration

Inhalte leben getrennt vom Code als typisierte Config-Dateien (Muster wie `assessment-config.ts`):

- `src/content/workbook/bereich-1.ts` bis `bereich-5.ts` (bzw. gemeinsamer Index).
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

- `workbook_responses`: id, client_id (uuid, Supabase Auth User-ID), **program** (text), block_id (stabiler String aus der Config, z.B. `b1.s2.reflexion-1`), value (jsonb), created_at, updated_at. Unique-Constraint auf (client_id, program, block_id). Upsert pro dieses Tripel. Ein Schema für alle Blocktypen.
- `workbook_access`: client_id (uuid), **program** (text), unlocked_areas (int[]), updated_at. Primary Key (client_id, program). Für manuelle Freischaltung pro Klient und Programm durch Lasse im Dashboard.
- Block-IDs sind stabil und werden nie umbenannt, sonst verwaisen Antworten. Neue Blöcke bekommen neue IDs.
- RLS an, kein Public-Zugriff. Klienten: select/insert/update eigene Zeilen in workbook_responses, select eigene Zeile in workbook_access. Keine Delete-Policy. Freischaltung nur über Service-Role.
- Autosave: Speichern bei Eingabe (debounced), kein expliziter Speichern-Button als einzige Option.

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
1. Fundament: Branch, Routen-Segment, Supabase-Tabellen mit RLS, Auth mit OTP-Code (kein Magic-Link-Klick, Mail-Scanner-robust), leere Bereichsübersicht.
2. Block-Renderer-Grundgerüst plus Blocktypen `text`, `freetext`, `scale`, `choice` mit Autosave.
3. Blocktypen `table`, `wordlist`, `audio` (inkl. Storage-Anbindung und Player).
4. Blocktyp `bodymap` (eigener Auftrag, aufwendigster Block).
5. Blocktyp `video` (Vimeo-Embed im Seitendesign).
6. Freischaltlogik und Fortschrittsanzeige.
7. Inhalte Bereich 1 (Config-Datei aus dem Strategie-Chat).

**Stufe 2 (nach Pilotstart):** `cloze`, `association`, Foto-Upload für `visual`, Coach-Ansicht (mit Einwilligungskonzept), Verlaufsdarstellung Bodymap.

**Stufe 3 (nach Pilotrunde):** Standalone-Verkauf mit Stripe, ggf. Bunny Stream.

Inhalte entstehen rollierend: Bereich 1 und 2 reichen für den Pilotstart.

## 13. Workflow pro Bereich (Erinnerung)

1. Inhalte im Claude.ai-Chat ausarbeiten (Schritte, Blöcke, Texte).
2. Ergebnis ist eine fertige Config-Datei plus Claude-Code-Prompt.
3. Audios/Videos produziert Lasse, Pfade/IDs in die Config.
4. Selbst durchlaufen, Korrekturen direkt in VS Code, commit auf den Feature-Branch.
