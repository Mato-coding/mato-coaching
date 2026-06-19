import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="font-serif text-2xl font-medium text-primary mt-12 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-serif text-xl font-medium text-primary mt-8 mb-3"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-lg leading-relaxed text-primary/90 mb-6" {...props} />
  ),
  ul: (props) => (
    <ul
      className="list-disc list-outside pl-5 text-lg leading-relaxed text-primary/90 mb-6 space-y-2"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-outside pl-5 text-lg leading-relaxed text-primary/90 mb-6 space-y-2"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-accent underline underline-offset-2 hover:opacity-80"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-medium text-primary" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-umber pl-5 italic text-primary/80 my-8"
      {...props}
    />
  ),
};
