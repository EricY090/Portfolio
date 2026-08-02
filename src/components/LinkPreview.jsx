import { ArrowUpRight, FileText } from 'lucide-react';

/**
 * A LinkedIn-style link "unfurl" card.
 *
 * Real unfurls are produced server-side: the host fetches the URL and reads its
 * Open Graph tags. This site is static and the browser can't fetch a third-party
 * origin anyway (CORS), so the metadata is authored in content.js instead. The
 * upside is that the card paints immediately with no request, no spinner, and
 * no failure state.
 *
 * Expected shape: { source, title, description, url }
 */
export default function LinkPreview({ link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex gap-4 rounded-lg border border-hairline bg-canvas/40 p-4 transition-colors duration-200 hover:border-accent/60"
    >
      {/* Stand-in for the thumbnail a real unfurl would carry. */}
      <span
        aria-hidden="true"
        className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent sm:flex"
      >
        <FileText size={22} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted">
          {link.source}
          <ArrowUpRight
            size={13}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>

        <span className="mt-1.5 block font-semibold leading-snug text-heading transition-colors duration-200 group-hover:text-accent">
          {link.title}
        </span>

        {link.description && (
          <span className="mt-1.5 block text-sm leading-relaxed text-muted">
            {link.description}
          </span>
        )}
      </span>
    </a>
  );
}
