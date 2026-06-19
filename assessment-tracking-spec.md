# Bau-Auftrag: Lead-Kontext und Assessment-Tracking

Für Claude Code. Lies vorab CLAUDE.md. Datenschutz-Grundsatz: maßvoll erfassen, KEINE IP-Adresse speichern.

## Voraussetzung
Das SQL aus `supabase-migration.sql` wurde im Supabase SQL Editor ausgeführt:
- neue Tabelle `public.assessment_submissions` (id, created_at, cluster, result_route, answers jsonb), RLS an, keine Public-Policy
- `public.leads` um `page_path`, `referrer`, `assessment_cluster`, `assessment_result` erweitert (`source` existiert bereits)
- `public.leads` zusätzlich um `email_status text default 'pending'` erweitert

## 1. Lead-Route erweitern (`src/app/api/lead/route.ts`)
- Body zusätzlich akzeptieren: `source` (string), `pagePath` (string), `referrer` (string), `assessmentCluster` (string | null), `assessmentResult` (string | null).
- Beim Insert in `leads` speichern: `source` (Fallback "lead_magnet"), `page_path`, `referrer`, `assessment_cluster`, `assessment_result`.
- Den User-Agent aus `request.headers.get("user-agent")` lesen, NICHT speichern, nur in der Benachrichtigungsmail ausgeben.
- Benachrichtigungsmail an Lasse erweitern um: Quelle, Seitenpfad, Referrer, Assessment-Kontext (Cluster und Ergebnis, falls vorhanden), Gerät/Browser (User-Agent), Zeitpunkt. Assessment-Block nur zeigen, wenn vorhanden.

## 2. Neue Assessment-Route (`src/app/api/assessment/route.ts`)
- POST. Body: `cluster` (string), `route` (string), `answers` (beliebiges JSON, z. B. die gesammelten Tags oder die gewählten Optionen je Frage).
- In `assessment_submissions` einfügen: `cluster`, `result_route: route`, `answers`.
- KEINE E-Mail versenden (anonyme Abschlüsse werden nur gespeichert).
- Fehler von Supabase prüfen und loggen, wie in der Lead-Route. Bei Erfolg `{ ok: true }`.

## 3. LeadMagnetForm (`src/components/forms/LeadMagnetForm.tsx`)
- Neue optionale Props: `source` (default "lead_magnet"), `assessmentCluster` (string | null), `assessmentResult` (string | null).
- Beim Absenden zusätzlich mitschicken: `source`, `pagePath: window.location.pathname`, `referrer: document.referrer`, `assessmentCluster`, `assessmentResult`.
- Bestehendes Verhalten (autoFocus, Scroll-to-Section bei Erfolg) unverändert lassen.

## 4. Startseiten-Sektion (`src/components/sections/LeadMagnet.tsx`)
- `<LeadMagnetForm source="startseite" />`.

## 5. ResultActions (`src/components/forms/ResultActions.tsx`)
- Neue Props annehmen: `cluster` (string), `result` (string), zusätzlich zu den bestehenden (`ctaHref`, `ctaLabel`, `onRestart`).
- Audio-Formular: `<LeadMagnetForm autoFocus source="assessment" assessmentCluster={cluster} assessmentResult={result} />`.
- Erstgespräch-Link: Wenn `ctaHref` auf `/termin` zeigt, Cluster und Ergebnis als Query anhängen, z. B. `/termin?cluster=<cluster>&result=<result>`. Bei anderen Zielen (z. B. `/`) unverändert lassen.

## 6. AssessmentForm (`src/components/forms/AssessmentForm.tsx`)
- Sobald das Ergebnis feststeht (`done && cluster`), genau EINMAL `POST /api/assessment` mit `{ cluster, route, answers }` senden. Doppel-Senden über ein `useRef`-Flag verhindern (z. B. bei Re-Renders). Fehler still ins Console-Log, das Ergebnis dem Nutzer immer anzeigen.
- An `ResultActions` zusätzlich `cluster={cluster}` und `result={route}` übergeben.

## 7. Cal-Embed (`src/app/(public)/termin/CalEmbed.tsx`)
- `cluster` und `result` aus den URL-Suchparametern lesen (Client-Komponente, `useSearchParams`).
- Falls vorhanden, dem Cal.com-Embed über die `config`-Prop mitgeben: eine menschenlesbare Notiz (z. B. `notes: "Assessment: Cluster <cluster>, Ergebnis <result>"`) und zusätzlich strukturiert als `metadata: { cluster, result }`.
- WICHTIG: Die genauen Feldnamen der Prefill-/Config-API von `@calcom/embed-react` gegen die aktuelle Cal.com-Doku verifizieren, bevor du sie fest einbaust. Ziel ist, dass die Info in der Buchungsbestätigung an den Gastgeber sichtbar ist.
- Hinweis: Eine Verknüpfung der Buchung mit Supabase ist NICHT Teil dieses Auftrags (bräuchte einen Cal.com-Webhook). Nur Prefill.

## 8. Doku
- In CLAUDE.md das erweiterte `leads`-Schema, die neue Tabelle `assessment_submissions` und die Route `/api/assessment` ergänzen.

## Datenschutz
- Keine IP-Adresse speichern. User-Agent nur in der Mail, nicht in der Datenbank.
- Die Datenschutzerklärung muss die gespeicherten Felder (Quelle, Seitenpfad, Referrer, Assessment-Ergebnis) und die Verarbeitung abdecken. Diesen Punkt dem Inhaber als To-do nennen, nicht selbst Rechtstexte erfinden.
