import Section from './Section';
import Reveal from './Reveal';
import LinkPreview from './LinkPreview';
import { spotlight } from '../spotlight';
import { projects } from '../content';

export default function Projects() {
  if (!projects?.length) return null;

  return (
    <Section id="projects" eyebrow="Projects" title="Some Full-Stack Projects I've Built">
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <article
              className="spotlight card-lift h-full rounded-xl border border-hairline bg-surface/60 p-6 hover:border-accent/40 sm:p-7"
              {...spotlight}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-semibold text-heading">{item.title}</h3>
                {item.period && (
                  <span className="text-sm font-medium tabular-nums text-muted">{item.period}</span>
                )}
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
    </Section>
  );
}
