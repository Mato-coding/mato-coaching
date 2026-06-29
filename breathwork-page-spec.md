# Spec: Service-Seite /breathwork

Pilot für die Service-Seiten. Muster, Schema und interne Verlinkung, die hier
entstehen, werden später 1:1 für /coaching und /ifs wiederverwendet. Bau die
Seite so, dass die Sektionsstruktur als Vorlage taugt.

Quelle der Wahrheit bleiben CLAUDE.md und design-system.md. Bei Widerspruch
gewinnen diese beiden, nicht diese Spec.

---

## Ziel

Eine ruhige, conversion-orientierte Landingpage für Somatic Breathwork in
Hamburg und online. Zwei Jobs zugleich: Suchintention bedienen
(„somatic breathwork hamburg") und zum kostenfreien Erstgespräch führen.
Anmutung Quiet Luxury, Atem-Rhythmus, ein Akzent über den Umber-Eyebrow-Strich.

---

## Zielpfade im Repo

- Neu: `src/app/(public)/breathwork/page.tsx` (Server-Komponente, analog zu
  `assessment/page.tsx`)
- Ggf. neu: `src/components/sections/breathwork/` für seitenspezifische
  Sektionen, falls du sie aus `page.tsx` auslagerst. Kleine, klar benannte
  Komponenten, die als Muster für /coaching und /ifs dienen.
- Ändern: `src/app/sitemap.ts` (Eintrag /breathwork ergänzen)
- Wiederverwenden: `src/components/ui/FadeIn.tsx`, die bestehende Button-/CTA-
  Konvention von `/termin`, `LeadMagnetCTA`, und falls vorhanden eine
  Eyebrow-Komponente. Existiert noch keine Eyebrow-Komponente, bau eine kleine
  wiederverwendbare (`src/components/ui/Eyebrow.tsx`) mit dem Umber-Hairline-
  Detail aus design-system.md, da sie auf allen Service-Seiten gebraucht wird.

---

## Technische Vorgaben

- Server-Komponente für `page.tsx`, damit Per-Page-Metadaten und JSON-LD dort
  liegen. Interaktive Teile (FadeIn etc.) bleiben Client-Komponenten.
- Tokens, Schriften, Spacing ausschließlich aus globals.css (@theme) und
  design-system.md. Keine Hex-Werte hart im Code.
- Section-Padding `py-16 md:py-24`. Content-Container max. ~1140px, Textspalten
  max. ~68ch. Buttons `rounded-md`, keine Schatten.
- Eyebrow = Uppercase-Label mit Umber-Hairline, `letter-spacing: 0.12em`.
- FadeIn sparsam, dezent, einmalig. `prefers-reduced-motion` respektieren.
- Primär-CTA: Fläche navy, Text paper. Sekundär-CTA: Outline navy.
- Stil zwingend: deutsch, sentence case, aktive Verben, keine Floskeln,
  KEINE Gedankenstriche. Keine Heilversprechen, Diagnosen oder
  Behandlungszusagen. Framing nur als Nervensystem- und Stressregulation.

---

## Seitenstruktur und Copy

Reihenfolge von oben nach unten. Jede Sektion ein eigener Abschnitt mit
großzügigem vertikalem Rhythmus.

### 1. Hero

- Eyebrow: `SOMATIC BREATHWORK · HAMBURG UND ONLINE`
- H1: `Ruhe, die im Atem beginnt`
  - Alternative als Kommentar danebenlegen, falls Lasse tauschen will:
    `Somatic Breathwork für ein ruhigeres Nervensystem`
  - Entscheidung: ruhige H1 für den Markenton, Keyword trägt Eyebrow + erste H2
    + Title. Beide werden von Google gelesen.
- Subline: `Begleitete Atemsitzungen für Menschen, die nach außen funktionieren
  und innen keine Ruhe finden. Einzeln oder in der Gruppe, in Hamburg und
  online.`
- CTA primär: `Erstgespräch vereinbaren` → `/termin`
- CTA sekundär: `Audio-Reset kostenlos anhören` → scrollt zur LeadMagnet-Sektion
  oder verlinkt zum Lead-Magneten

### 2. Resonanz

- Eyebrow: `WORUM ES GEHT`
- H2: `Wenn der Kopf nicht abschaltet`
- Absatz 1: `Du bist leistungsfähig, verlässlich, im Außen ruhig. Innen läuft
  etwas weiter, das nicht zur Ruhe kommt. Anspannung, die sich über den Tag
  aufbaut. Schlaf, der nicht trägt. Eine Wachsamkeit, die nie ganz nachlässt.`
- Absatz 2: `Das ist keine Charakterfrage. Es ist ein Nervensystem, das gelernt
  hat, dauerhaft in Bereitschaft zu bleiben. Der Atem ist einer der wenigen
  direkten Zugänge zu diesem System, bewusst steuerbar und zugleich tief mit dem
  Unwillkürlichen verbunden.`

### 3. Was Somatic Breathwork ist

- Eyebrow: `DIE METHODE`
- H2: `Was Somatic Breathwork ist`
- Absatz 1: `Somatic Breathwork nutzt eine bewusst geführte Atmung, um den
  Körper aus der Daueranspannung in einen regulierten Zustand zu begleiten.
  Statt über das Denken zu arbeiten, setzt die Methode am Körper an, dort, wo
  sich Stress tatsächlich hält.`
- Absatz 2: `In einer Sitzung führt dich eine bestimmte Atemweise in einen
  Zustand, in dem Festgehaltenes spürbar und veränderbar wird. Viele Menschen
  beschreiben danach eine Klarheit und Weite, die sie aus dem Alltag nicht
  kennen.`
- Link (Textlink, dezent): `Mehr über die Methode im Journal` →
  `/journal/was-ist-somatic-breathwork`

### 4. Wie eine Sitzung abläuft

- Eyebrow: `ABLAUF`
- H2: `Wie eine Sitzung abläuft`
- Drei Schritte (als ruhige Folge, nicht als grelle Cards):
  - `Ankommen. Wir klären kurz, wie es dir geht und worauf wir achten. Du
    liegst bequem, nichts musst du können oder vorbereiten.`
  - `Atmen. Über etwa {{DAUER_1ZU1}} führe ich dich durch die Atemarbeit. Musik
    trägt den Prozess, ich bleibe die ganze Zeit an deiner Seite.`
  - `Nachklang. Am Ende kommst du in Stille an und wir geben dem Erlebten Raum.
    Was auftaucht, ordnen wir gemeinsam ein.`
- Abschlusssatz: `Einzeln arbeiten wir ganz in deinem Tempo. In der Gruppe trägt
  zusätzlich die gemeinsame Erfahrung.`

> PLATZHALTER `{{DAUER_1ZU1}}`: Sitzungsdauer 1:1 eintragen, z.B. „90 Minuten".
> Als gut sichtbares `{/* TODO Dauer */}` im Code markieren.

### 5. Für wen es passt

- Eyebrow: `PASSUNG`
- H2: `Für wen diese Arbeit passt`
- Absatz 1: `Diese Arbeit passt für dich, wenn du im Leben funktionierst und
  trotzdem spürst, dass etwas nicht zur Ruhe kommt. Wenn du bereit bist, dem
  Körper zuzuhören, statt nur über das Problem nachzudenken.`
- Absatz 2 (Sicherheit, dezent, nicht alarmierend): `Aus Sorgfalt arbeite ich
  nicht mit allem. Bei bestimmten gesundheitlichen Themen, etwa Herz-Kreislauf-
  Erkrankungen, Epilepsie, einer Schwangerschaft oder akuten psychischen
  Belastungen, brauchen wir vorab eine ärztliche Abklärung oder einen anderen
  Weg. Im Erstgespräch klären wir das ehrlich.`

### 6. Über Lasse

- Eyebrow: `BEGLEITUNG`
- H2: `Wer dich begleitet`
- Body: PLATZHALTER. Lasse liefert Ausbildung, Erfahrung, eigener Weg zur
  Methode nach. Setz einen klar markierten Platzhaltertext und
  `{/* TODO Über-Lasse: Ausbildung, Erfahrung, eigener Weg */}`, damit er leicht
  zu finden ist. Halte die Sektion vom Layout her fertig (Spalte oder Bild plus
  Text), nur der Fließtext fehlt.

### 7. FAQ

Ruhige Frage-Antwort-Liste, kein lautes Accordion nötig, dezent reicht.

- `Wie lange dauert eine Sitzung?` → `{{DAUER_FAQ}}`
  > PLATZHALTER: Dauer für 1:1 und Gruppe. Gleiches TODO wie oben.
- `Finden die Sitzungen in Hamburg oder online statt?` → `Beides. Einzelsitzungen
  sind vor Ort und online möglich, Gruppen finden in Hamburg statt.`
  > ANNAHME: Gruppen nur vor Ort. Falls Gruppen auch online laufen, Satz
  > anpassen. Als `{/* TODO Gruppen-Ort prüfen */}` markieren.
- `Brauche ich Erfahrung mit Atemarbeit?` → `Nein. Ich führe dich durch jeden
  Schritt.`
- `Ist Breathwork sicher?` → `Bei guter Vorbereitung ja. Im Erstgespräch klären
  wir vorab gesundheitliche Themen, bei denen Vorsicht geboten ist.`
- `Wie oft sollte ich kommen?` → `Eine einzelne Sitzung steht für sich. Für
  tiefere Veränderung begleite ich dich über mehrere Sitzungen hinweg.`
- `Was kostet es?` → `Umfang und Investition besprechen wir im Erstgespräch,
  passend zu dem, was du brauchst.`

### 8. LeadMagnet (Audio)

Bestehende `LeadMagnetCTA` einbinden, `source="breathwork"`. Dient als
zweiter, niedrigschwelliger Conversion-Pfad neben dem Erstgespräch. Platzierung
zwischen FAQ und Abschluss-CTA. Bestehende Komponente und Logik nicht
verändern.

### 9. Abschluss-CTA

- Eyebrow: `NÄCHSTER SCHRITT`
- H2: `Ein ruhiges Gespräch zum Anfang`
- Body: `Wir klären in Ruhe, was du brauchst und ob die Arbeit zu dir passt.
  Kostenfrei und unverbindlich.`
- CTA: `Erstgespräch vereinbaren` → `/termin`

---

## Metadaten (in page.tsx, Server-Komponente)

- `title`: `Somatic Breathwork in Hamburg und online`
  - Prüfen, ob das Title-Template aus `layout.tsx` „Lasse Klüver" automatisch
    anhängt. Falls ja, keinen Namen doppeln. Falls nein, Template-Ergebnis
    so wählen, dass Lasse vorn oder hinten sauber steht, ohne „Mato Coaching by
    Lasse Klüver".
- `description`: `Begleitete Atemarbeit zur Stressregulation, einzeln oder in
  der Gruppe, in Hamburg und online. Erstgespräch kostenfrei und unverbindlich.`
- `alternates.canonical`: `absoluteUrl('/breathwork')` aus `src/lib/site.ts`
- OpenGraph: title, description, `url = absoluteUrl('/breathwork')`, Bild wie in
  der bestehenden OG-Konvention. Falls noch kein Seiten-OG-Bild existiert, das
  Default-OG nutzen, kein neues erfinden.

---

## Service-Schema (JSON-LD)

Über die bestehende `JsonLd`-Konvention rendern, nicht neu erfinden. Struktur:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Somatic Breathwork",
  "serviceType": "Somatic Breathwork",
  "description": "Begleitete Atemarbeit zur Stressregulation, einzeln oder in der Gruppe, in Hamburg und online.",
  "provider": { "@id": "<bestehende @id des ProfessionalService aus JsonLd.tsx>" },
  "areaServed": { "@type": "City", "name": "Hamburg" },
  "url": "https://www.lassekluever.de/breathwork",
  "availableChannel": [
    { "@type": "ServiceChannel", "serviceLocation": { "@type": "City", "name": "Hamburg" } },
    { "@type": "ServiceChannel", "serviceUrl": "https://www.lassekluever.de/termin" }
  ]
}
```

- `provider` per `@id` auf den bestehenden ProfessionalService-Knoten
  referenzieren, falls dieser eine `@id` hat. Sonst provider inline mit `name`
  „Lasse Klüver" und `url` der Startseite.
- Alle URLs über `absoluteUrl`, nicht hart kodieren.
- KEINE `offers` und KEIN Preis im Markup.

---

## Sitemap

`/breathwork` in `src/app/sitemap.ts` ergänzen. `lastModified` setzen,
`changeFrequency` und `priority` analog zu den bestehenden statischen Seiten.

---

## Interne Verlinkung

- Auf der Seite: Link zum Journal-Artikel `was-ist-somatic-breathwork`
  (Sektion 3), CTAs zu `/termin`, LeadMagnetCTA mit `source="breathwork"`.
- Optional, gern in einem Folgecommit: in der `Method`-Sektion der Startseite
  einen Link auf `/breathwork` setzen, damit die Service-Seite intern erreichbar
  ist. Nicht zwingend Teil dieser Aufgabe, aber sinnvoll.

---

## Done-Checkliste

- [ ] `/breathwork` rendert, responsive bis mobil, sichtbarer Tastatur-Fokus
- [ ] Alle Sektionen in der vorgegebenen Reihenfolge, Atem-Rhythmus im Spacing
- [ ] Eyebrows mit Umber-Hairline, CTAs in den korrekten Farben
- [ ] FadeIn dezent und einmalig, `prefers-reduced-motion` respektiert
- [ ] Metadaten gesetzt, canonical auf `absoluteUrl('/breathwork')`
- [ ] Service-JSON-LD im DOM, valide, kein Preis, provider korrekt referenziert
- [ ] Sitemap enthält `/breathwork`
- [ ] LeadMagnetCTA mit `source="breathwork"` eingebunden, Logik unverändert
- [ ] Journal-Link und /termin-CTAs funktionieren
- [ ] Platzhalter `{{DAUER_1ZU1}}`, `{{DAUER_FAQ}}`, Über-Lasse-Body und der
      Gruppen-Ort-Check als sichtbare `TODO`-Kommentare im Code markiert
- [ ] `grep` auf mato-coaching.de in den neuen Dateien leer
- [ ] Keine Gedankenstriche im sichtbaren Text, sentence case eingehalten
- [ ] Build grün

---

## Commit

Eigener Branch, häufig committen. Vorschlag:
`feat(breathwork): service landing page mit service-schema und sitemap-eintrag`
