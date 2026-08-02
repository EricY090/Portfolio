import { Coffee, GraduationCap, Users } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';
import LinkPreview from './LinkPreview';
import { spotlight } from '../spotlight';
import { now } from '../content';

/** Small pulse-dot pill: 'In progress', 'Planned', 'In review'. */
function StatusBadge({ status }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
      {status}
    </span>
  );
}

/** Card shell shared by the coursework / involvement / off-the-clock blocks. */
function Panel({ icon: Icon, title, children, className = '' }) {
  return (
    <div
      className={`spotlight card-lift h-full rounded-xl border border-hairline bg-surface/60 p-6 hover:border-accent/40 ${className}`}
      {...spotlight}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon size={18} aria-hidden="true" />
        </span>
        <h3 className="text-base font-semibold text-heading">{title}</h3>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export default function Now() {
  // Rendering nothing is a supported state: the section is retired by clearing
  // its data rather than by deleting the component.
  if (!now) return null;

  const { items, courses, involvement, offTheClock } = now;
  const hasSideBlocks = involvement?.length > 0 || offTheClock?.length > 0;
  if (!items?.length && !courses && !hasSideBlocks) return null;

  return (
    <Section id="now" eyebrow={now.eyebrow} title={now.title}>
      {now.intro && (
        <Reveal>
          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-body">{now.intro}</p>
        </Reveal>
      )}

      {/* These entries are concurrent rather than sequential, so the timeline
          rail used by Experience is intentionally omitted. Card styling is
          otherwise shared. */}
      <div className="space-y-6">
        {items?.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <article
              className="spotlight card-lift rounded-xl border border-hairline bg-surface/60 p-6 hover:border-accent/40 sm:p-7"
              {...spotlight}
            >
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <h3 className="text-xl font-semibold text-heading">{item.title}</h3>
                {item.status && <StatusBadge status={item.status} />}
              </div>

              <p className="mt-3 leading-relaxed text-body">{item.description}</p>

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
            </article>
          </Reveal>
        ))}
      </div>

      {courses?.items?.length > 0 && (
        <Reveal delay={0.08}>
          <div className="mt-6">
            <Panel icon={GraduationCap} title={`${courses.term} coursework`}>
              <ul className="flex flex-wrap gap-2">
                {courses.items.map((course) => (
                  <li key={course.code} className="chip gap-2">
                    <span className="font-mono text-xs font-semibold text-accent">
                      {course.code}
                    </span>
                    <span>{course.name}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </Reveal>
      )}

      {hasSideBlocks && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {involvement?.length > 0 && (
            <Reveal delay={0.16}>
              <Panel icon={Users} title="On campus">
                <ul className="space-y-3">
                  {involvement.map((entry) => (
                    <li
                      key={entry.name}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                    >
                      <span className="text-body">{entry.name}</span>
                      {entry.role && (
                        <span className="text-sm text-muted">{entry.role}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>
          )}

          {offTheClock?.length > 0 && (
            <Reveal delay={0.24}>
              <Panel icon={Coffee} title="Off the clock">
                <ul className="space-y-2.5">
                  {offTheClock.map((line) => (
                    <li key={line} className="flex gap-3 text-body">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                      />
                      <span className="leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>
          )}
        </div>
      )}
    </Section>
  );
}
