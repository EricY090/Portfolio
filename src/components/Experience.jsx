import { Download } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';
import LinkPreview from './LinkPreview';
import { spotlight } from '../spotlight';
import { experience, profile } from '../content';

function Entry({ item }) {
  return (
    <article className="relative pl-8 sm:pl-10">
      {/* Timeline rail + node. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-canvas"
      />

      <div
        className="spotlight card-lift rounded-xl border border-hairline bg-surface/60 p-6 hover:border-accent/40 sm:p-7"
        {...spotlight}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-xl font-semibold text-heading">{item.role}</h3>
          {item.period && (
            <span className="text-sm font-medium tabular-nums text-muted">{item.period}</span>
          )}
        </div>
        <p className="mt-1 text-base font-medium text-accent">{item.org}</p>

        <ul className="mt-4 space-y-2.5">
          {item.highlights.map((point) => (
            <li key={point} className="flex gap-3 text-body">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        {item.links?.length > 0 && (
          <div className="mt-5 space-y-3">
            {item.links.map((link) => (
              <LinkPreview key={link.url} link={link} />
            ))}
          </div>
        )}

        {item.stack?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <div className="relative space-y-8">
        {/* The vertical rail behind the timeline nodes. */}
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-0 top-4 w-px bg-gradient-to-b from-accent/50 via-hairline to-transparent"
        />
        {experience.map((item, i) => (
          <Reveal key={`${item.org}-${item.role}`} delay={i * 0.08}>
            <Entry item={item} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 flex justify-center">
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-canvas transition-colors duration-200 hover:bg-accent-soft"
          >
            <Download size={18} aria-hidden="true" />
            Download Full Resume (PDF)
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
