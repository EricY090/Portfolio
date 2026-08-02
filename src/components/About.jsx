import Section from './Section';
import Reveal from './Reveal';
import { about } from '../content';

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Who I am">
      <div className="max-w-3xl space-y-6">
        {about.map((paragraph, i) => (
          <Reveal key={paragraph.slice(0, 32)} delay={i * 0.08}>
            <p className="text-lg leading-relaxed text-body">{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
