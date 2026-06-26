import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import FadeIn from "@/components/ui/FadeIn";
import { getJournalEntryBySlug, getJournalSlugs } from "@/lib/journal";
import { mdxComponents } from "./mdx-components";
import { SITE_URL } from "@/lib/site";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);
  if (!entry) return {};

  return {
    title: entry.meta.title,
    description: entry.meta.description,
    alternates: {
      canonical: `/journal/${slug}`,
    },
    openGraph: {
      type: "article",
      title: entry.meta.title,
      description: entry.meta.description,
      url: `${baseUrl}/journal/${slug}`,
    },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);
  if (!entry) notFound();

  const { meta, content } = entry;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedAt,
    author: {
      "@type": "Person",
      name: "Lasse Klüver",
    },
    publisher: {
      "@type": "Organization",
      name: "Lasse Klüver",
    },
    mainEntityOfPage: `${baseUrl}/journal/${slug}`,
  };

  return (
    <article className="bg-background py-16 md:py-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-2xl w-full">
        <div className="mb-10">
          <Link
            href="/journal"
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            ← Zurück zum Journal
          </Link>
        </div>

        <FadeIn>
          <header className="mb-10">
            <span className="text-sm text-muted">
              {new Date(meta.publishedAt).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mt-3">
              {meta.title}
            </h1>
          </header>
        </FadeIn>

        <FadeIn delay={0.1}>
          <MDXRemote source={content} components={mdxComponents} />
        </FadeIn>
      </div>
    </article>
  );
}
