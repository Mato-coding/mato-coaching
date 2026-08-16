import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const JOURNAL_DIR = path.join(process.cwd(), "src/content/journal");

export type JournalMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  excerpt?: string;
  coverImage?: string;
  tags: string[];
  draft: boolean;
};

function readJournalFiles(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs.readdirSync(JOURNAL_DIR).filter((file) => file.endsWith(".mdx"));
}

function buildMeta(slug: string, data: Record<string, unknown>): JournalMeta {
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    publishedAt: data.publishedAt as string,
    updatedAt: data.updatedAt as string | undefined,
    excerpt: data.excerpt as string | undefined,
    coverImage: data.coverImage as string | undefined,
    tags: (data.tags as string[] | undefined) ?? [],
    draft: Boolean(data.draft),
  };
}

function readMeta(file: string): JournalMeta {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(JOURNAL_DIR, file), "utf8");
  const { data } = matter(raw);
  return buildMeta(slug, data);
}

// Nur veröffentlichte Artikel (draft: false bzw. nicht gesetzt). Speist sowohl
// die /journal-Übersicht als auch getJournalSlugs (Sitemap, generateStaticParams):
// ein draft-Artikel taucht dadurch an keiner dieser Stellen auf.
export function getAllJournalEntries(): JournalMeta[] {
  return readJournalFiles()
    .map(readMeta)
    .filter((entry) => !entry.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getJournalSlugs(): string[] {
  return getAllJournalEntries().map((entry) => entry.slug);
}

export function getJournalEntryBySlug(
  slug: string
): { meta: JournalMeta; content: string } | null {
  const filePath = path.join(JOURNAL_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = buildMeta(slug, data);

  // draft-Artikel bleiben in Produktion unerreichbar (Aufrufer reagiert mit
  // notFound()), sind aber lokal bzw. in Preview-Deployments weiter über
  // die direkte URL ansehbar.
  if (meta.draft && process.env.NODE_ENV === "production") return null;

  return { meta, content };
}
