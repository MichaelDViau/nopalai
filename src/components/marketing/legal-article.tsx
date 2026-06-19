import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders long-form legal copy (privacy / terms) from a Markdown string.
 * Server-rendered so the full text ships in the initial HTML — good for SEO
 * and for users with JavaScript disabled. Styling comes from `.prose-legal`.
 */
export function LegalArticle({ content }: { content: string }) {
  return (
    <article className="prose-legal">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
