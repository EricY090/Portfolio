import Reveal from './Reveal';

/**
 * Shared shell for every content section: the centred column, consistent
 * vertical rhythm, the scroll-anchor offset that keeps headings clear of the
 * sticky navbar, and the accent eyebrow + title treatment.
 */
export default function Section({ id, eyebrow, title, children, className = '', glow = false }) {
  return (
    // Vertical rhythm for the whole page is tuned here: the gap between two
    // sections is this padding doubled.
    <section id={id} className={`relative scroll-mt-20 py-12 sm:py-16 ${className}`}>
      {/* Opt-in accent wash, used to bookend the page at Contact. */}
      {glow && (
        <div aria-hidden="true" className="section-glow pointer-events-none absolute inset-0 -z-10" />
      )}

      <div className="container-page">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {title}
          </h2>
          <div className="mt-5 h-px w-16 bg-accent/60" />
        </Reveal>

        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
