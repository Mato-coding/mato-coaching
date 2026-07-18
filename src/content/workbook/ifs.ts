// Platzhalter-Config für das Programm "ifs".
// Bereich 0 und Bereich 1 tragen Dummy-Schritte, damit Renderer, Autosave
// und Fortschritt real testbar sind. Bereiche 2 bis 5 bleiben ohne Schritte.
// Echte Inhalte folgen in einem eigenen Auftrag (siehe workbook-konzept.md).

import type { WorkbookProgram } from "@/lib/workbook-types";

export const ifsProgram: WorkbookProgram = {
  slug: "ifs",
  title: "10 Wochen 1:1-Begleitung",
  areas: [
    {
      index: 0,
      slug: "einstieg",
      title: "Einstieg",
      description:
        "Ein kurzer Ankommen-Bereich, bevor es in die inhaltliche Arbeit geht.",
      steps: [
        {
          slug: "willkommen",
          title: "Willkommen im Workbook",
          blocks: [
            {
              id: "b0.s1.intro-1",
              type: "text",
              content:
                "Schön, dass du hier bist. Dieses Workbook begleitet dich zwischen euren Sessions. Nimm dir für jeden Schritt so viel Zeit, wie du brauchst. Es gibt hier kein richtig oder falsch.\n\nDeine Eingaben werden automatisch gespeichert, sobald du sie machst.",
            },
            {
              id: "b0.s1.stimmung-1",
              type: "scale",
              question: "Wie ist deine Stimmung gerade, in diesem Moment?",
              min: 1,
              max: 7,
              minLabel: "angespannt",
              maxLabel: "ruhig",
            },
            {
              id: "b0.s1.reflexion-1",
              type: "freetext",
              question: "Was bringt dich gerade hierher?",
              placeholder: "Schreib in ein paar Sätzen, was dich beschäftigt.",
              minHeight: 120,
            },
          ],
        },
        {
          slug: "erwartungen",
          title: "Deine Erwartungen",
          blocks: [
            {
              id: "b0.s2.intro-1",
              type: "text",
              content:
                "Jeder arbeitet anders mit einem Workbook. Es gibt keinen einzig richtigen Rhythmus.",
            },
            {
              id: "b0.s2.format-1",
              type: "choice",
              question: "Wie möchtest du zwischen den Sessions arbeiten?",
              options: [
                "Kurz und regelmäßig",
                "Selten, dafür ausführlich",
                "Ich probiere es einfach aus",
              ],
              multi: false,
            },
          ],
        },
      ],
    },
    {
      index: 1,
      slug: "anteile-und-selbst",
      title: "Lerne deine Anteile und dein Selbst kennen",
      steps: [
        {
          slug: "einfuehrung",
          title: "Einführung",
          blocks: [
            {
              id: "b1.s1.intro-1",
              type: "text",
              content:
                "In der IFS-Arbeit gehen wir davon aus, dass wir alle aus verschiedenen inneren Anteilen bestehen, und dass es einen ruhigen, klaren Kern in dir gibt, das Selbst.",
            },
            {
              id: "b1.s1.scale-1",
              type: "scale",
              question:
                "Wie vertraut ist dir der Gedanke, dass du aus verschiedenen inneren Anteilen bestehst?",
              min: 1,
              max: 7,
              minLabel: "ganz neu",
              maxLabel: "sehr vertraut",
            },
          ],
        },
        {
          slug: "erste-beobachtung",
          title: "Erste Beobachtung",
          blocks: [
            {
              id: "b1.s2.intro-1",
              type: "text",
              content:
                "Bevor wir tiefer einsteigen, lohnt sich ein erster Blick auf das, was gerade in dir aktiv ist.",
            },
            {
              id: "b1.s2.freetext-1",
              type: "freetext",
              question:
                "Welcher innere Anteil meldet sich bei dir gerade am deutlichsten?",
              placeholder: "Beschreib ihn mit eigenen Worten.",
              minHeight: 120,
            },
            {
              id: "b1.s2.choice-1",
              type: "choice",
              question: "Wie zeigt sich dieser Anteil bei dir?",
              options: [
                "Als Gedanke",
                "Als Körperempfindung",
                "Als Gefühl",
                "Als innere Stimme",
              ],
              multi: true,
            },
          ],
        },
        {
          slug: "reflexion",
          title: "Reflexion",
          blocks: [
            {
              id: "b1.s3.intro-1",
              type: "text",
              content:
                "Ein letzter Impuls für diesen Schritt, bevor ihr in der nächsten Session weiterarbeitet.",
            },
            {
              id: "b1.s3.freetext-1",
              type: "freetext",
              question:
                "Was würde sich verändern, wenn dieser Anteil sich gesehen fühlt?",
              placeholder: "Nimm dir hier ruhig etwas mehr Zeit.",
              minHeight: 140,
            },
          ],
        },
      ],
    },
    {
      index: 2,
      slug: "manager-anteile",
      title: "Würdige deine überarbeiteten Manager-Anteile",
      steps: [],
    },
    {
      index: 3,
      slug: "firefighter",
      title: "Schließe Freundschaft mit deinen aktivierten Firefightern",
      steps: [],
    },
    {
      index: 4,
      slug: "verbannte",
      title: "Nimm deine belasteten Verbannten an",
      steps: [],
    },
    {
      index: 5,
      slug: "selbstgefuehrtes-leben",
      title: "Erschließe dir ein selbstgeführtes Leben",
      steps: [],
    },
  ],
};
