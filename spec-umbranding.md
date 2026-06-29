# Spec: Umbranding sichtbare Markenebene (Lasse Klüver vorn, Mato dahinter)

Ziel: Sichtbare und such-relevante Markenstrings von "Mato Coaching" auf "Lasse Klüver"
umstellen. "Mato" bleibt nur im Footer als zweite Ebene und als JSON-LD alternateName.
Methoden-Naming für Mato kommt in einem separaten Task, hier NICHT einführen.

Quelle der Wahrheit: CLAUDE.md und design-system.md. Diese Spec setzt deren Entscheidung um.

WICHTIG: Sentence case, aktive Verben, keine Gedankenstriche im sichtbaren Text.
Diese Aufgabe ändert Strings und ein Schema-Feld, KEINE Fonts, KEIN Logo, KEIN OG-Bild.

---

## Schritt 0: Inventur (zuerst, nichts ändern)

Vorkommen mit Kontext auflisten, damit nichts durchrutscht:

    grep -rni "mato" src/

Erwartete Trefferorte laut Repo-Überblick:
- src/components/ui/Header.tsx        (Wortmarke)
- src/components/ui/Footer.tsx        (Copyright)
- src/app/layout.tsx                  (title default + template, OG siteName)
- src/app/(public)/layout.tsx         (Metadaten, ggf. OG)
- src/components/seo/JsonLd.tsx        (name)
- src/app/api/lead/route.ts           (Absendername, bleibt unveraendert, siehe unten)

Falls weitere Treffer auftauchen, vor dem Ersetzen kurz auflisten.

---

## Schritt 1: Ersetzen nach Tabelle

| Datei / Slot                         | Alt                          | Neu |
|--------------------------------------|------------------------------|-----|
| Header Wortmarke                     | Mato Coaching                | Lasse Klüver (+ Eyebrow, siehe Schritt 2) |
| Footer Copyright / Wortmarke         | Mato Coaching                | Lasse Klüver · Mato Coaching |
| layout.tsx title.default             | Mato Coaching                | Lasse Klüver · Somatic Breathwork und IFS-Coaching |
| layout.tsx title.template            | %s · Mato Coaching           | %s · Lasse Klüver |
| layout.tsx openGraph.siteName        | Mato Coaching                | Lasse Klüver |
| (public)/layout.tsx Metadaten        | Mato Coaching                | Lasse Klüver (Descriptor beibehalten) |
| JsonLd.tsx name                      | Mato Coaching                | Lasse Klüver |
| JsonLd.tsx alternateName             | (nicht vorhanden)            | "Mato Coaching"  NEU HINZUFÜGEN |

Regeln:
- title.default darf wegen Snippet-Laenge maximal etwa 60 Zeichen tragen. Der Vorschlag
  oben liegt knapp darüber, wenn nötig auf "Lasse Klüver · Somatic Breathwork & IFS" kürzen.
  & im Title ist erlaubt, das ist kein Fliesstext.
- founder in JsonLd.tsx ist bereits "Lasse Klüver", nur pruefen, nicht doppeln.
- Wenn name und founder dadurch identisch sind: korrekt so. ProfessionalService.name ist
  jetzt die Person, founder verweist auf dieselbe Person, sameAs LinkedIn bleibt.
- api/lead/route.ts Absender "Lasse Klüver · Mato Coaching" BLEIBT unveraendert. Er passt
  jetzt exakt zum Footer. Nicht anfassen.

---

## Schritt 2: Header-Wortmarke mit Eyebrow

Header zeigt statt eines Logo-Worts jetzt:

Zeile 1: "Lasse Klüver" in der Display-Schrift (font-serif), Gewicht 500.
Zeile 2: Eyebrow "Somatic Breathwork · IFS Coaching"

Eyebrow-Stil exakt nach design-system.md Abschnitt 2:
- font-sans (Body/UI), Gewicht 500
- text-transform: uppercase
- font-size 0.8125rem
- letter-spacing 0.12em
- Farbe --color-muted für den Text
- davor ein kurzer Umber-Hairline-Strich (--color-umber), das Signature-Detail.
  Umsetzung wie bei den bestehenden Section-Eyebrows, vorhandenes Muster wiederverwenden,
  nicht neu erfinden. Falls eine Eyebrow-Komponente existiert, diese nutzen.

Verlinkung: Der gesamte Wortmarken-Block bleibt Link auf "/". Eyebrow ist Teil des Links
oder dekorativ daneben, Hauptsache der Tastatur-Fokus bleibt sichtbar und klar.

Mobil: Auf sehr schmalen Viewports darf die Eyebrow ausgeblendet werden, wenn der Header
sonst drängt. Setze sie auf "hidden sm:block" oder aequivalent. Zeile 1 bleibt immer sichtbar.
Wenn der Header auf Mobil genug Platz hat, Eyebrow sichtbar lassen, Designentscheidung beim Bauen.

ARIA: Falls der Link bisher ein aria-label "Mato Coaching" trug, auf "Lasse Klüver, zur Startseite"
oder "Lasse Klüver" aktualisieren.

---

## Schritt 3: Doku widerspruchsfrei halten

Zwei kleine Edits, damit Quelle der Wahrheit zur Realitaet passt:

1. CLAUDE.md, Abschnitt "Marke (in Umstellung)": Eine Zeile ergaenzen:
   "Footer fuehrt bewusst 'Lasse Klüver · Mato Coaching' (Lasse vorn, Mato als zweite Ebene).
    JSON-LD nutzt alternateName 'Mato Coaching'. Header zeigt 'Lasse Klüver' plus Umber-Eyebrow
    'Somatic Breathwork · IFS Coaching'."
   Den Satz "Aktuell zeigt die Seite noch 'Mato Coaching'" entfernen oder auf erledigt setzen.

2. CLAUDE.md, "Offene Aufgaben" Punkt 2 (Inhaltliche Marken-Umstellung): als erledigt markieren,
   mit Hinweis dass Mato-Methoden-Naming noch offen ist (separater Task).

design-system.md braucht hier keine Aenderung (Schriften sind ein eigener Task).

---

## Schritt 4: Verifizieren

- grep -rni "mato coaching" src/  liefert nur noch den Footer-String und den
  api/lead Absender. Sonst leer.
- grep -rni "mato" src/  liefert zusaetzlich nur den JSON-LD alternateName. Kein weiterer Rest.
- Build gruen: npm run build
- Manuell pruefen:
  - Browser-Tab Startseite zeigt "Lasse Klüver · ..."
  - Eine Unterseite (z.B. /journal) zeigt "... · Lasse Klüver"
  - Header rendert "Lasse Klüver" plus Eyebrow, Fokus sichtbar, Link geht auf /
  - Footer zeigt "Lasse Klüver · Mato Coaching"
  - Seitenquelltext JSON-LD: name "Lasse Klüver", alternateName "Mato Coaching",
    founder "Lasse Klüver"
  - OG-Tags (og:site_name, og:title) zeigen Lasse Klüver

---

## Commit

Ein Branch, ein zusammenhaengender Commit, z.B.:
  "Umbranding: Lasse Klüver vorn, Mato als zweite Ebene in Footer und JSON-LD"

Bewusst NICHT in diesem Task: Mato-Methoden-Naming, Schriftwechsel, Logo/icon.svg, OG-Bild.
