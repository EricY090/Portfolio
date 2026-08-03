import { Cloud, Code2, Database, Server, Sparkles, Wrench } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';
import { spotlight } from '../spotlight';
import { skills, skillsNote } from '../content';

// Resolves the `icon` string from content.js to a component. A new skill group
// using a different icon must have that icon imported above and added here.
const ICONS = { Code2, Wrench, Database, Server, Cloud };

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with">
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group, i) => {
          const Icon = ICONS[group.icon] ?? Code2;
          return (
            <Reveal key={group.group} delay={i * 0.08}>
              <div
                className="spotlight card-lift h-full rounded-xl border border-hairline bg-surface/60 p-6 hover:border-accent/40"
                {...spotlight}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold text-heading">{group.group}</h3>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Placed below the grid rather than as a cell within it, so the layout
          stays correct for any number of skill groups. As a grid cell it would
          be orphaned on odd counts. The dashed border distinguishes it from the
          solid-bordered group cards. */}
      {skillsNote && (
        <Reveal delay={skills.length * 0.08}>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-dashed border-accent/40 bg-accent/5 p-5">
            <span className="mt-0.5 shrink-0 text-accent">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-body">
              <span className="font-semibold text-heading">{skillsNote.lead}</span>{' '}
              {skillsNote.body}
            </p>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
