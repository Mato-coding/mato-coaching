// Der Slug ist bewusst der Methodenname, kein Marketingname.
// Programmname wird erst nach der Pilotrunde entschieden.
export const PROGRAMS = {
  ifs: {
    slug: "ifs",
    title: "10 Wochen 1:1-Begleitung",
    areaCount: 5,
  },
} as const;

export type ProgramSlug = keyof typeof PROGRAMS;
