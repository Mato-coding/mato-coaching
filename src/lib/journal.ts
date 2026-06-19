import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const JOURNAL_DIR = path.join(process.cwd(), "src/content/journal");

export type JournalMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
};

function readJournalFiles(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs.readdirSync(JOURNAL_DIR).filter((file) => file.endsWith(".mdx"));
}

function readMeta(file: string): JournalMeta {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(JOURNAL_DIR, file), "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    publishedAt: data.publishedAt as string,
  };
}

export function getJournalSlugs(): string[] {
  return readJournalFiles().map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllJournalEntries(): JournalMeta[] {
  return readJournalFiles()
    .map(readMeta)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getJournalEntryBySlug(
  slug: string
): { meta: JournalMeta; content: string } | null {
  const filePath = path.join(JOURNAL_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title as string,
      description: data.description as string,
      publishedAt: data.publishedAt as string,
    },
    content,
  };
}
