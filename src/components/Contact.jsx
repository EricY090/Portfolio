import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';
import { profile } from '../content';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

/** Copies an address and shows a transient "Copied" confirmation. */
function CopyEmailButton({ address }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  // Don't fire setState after unmount if the user scrolls away mid-timeout.
  useEffect(() => () => clearTimeout(timerRef.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API needs a secure context and can be blocked by permissions;
      // the mailto link beside this button remains the reliable path.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Email copied to clipboard' : `Copy ${address}`}
      className="inline-flex items-center gap-2 rounded-lg border border-hairline px-4 py-3 text-sm font-medium text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

const SOCIALS = [
  { href: profile.github, label: 'GitHub', Icon: GithubIcon },
  { href: profile.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
];

export default function Contact() {
  const [primary, ...alternates] = profile.emails;

  return (
    <Section id="contact" eyebrow="Contact" title="Let's talk" glow>
      <div className="max-w-5xl">
        <Reveal>
          <p className="text-lg leading-relaxed text-body">
            Open to software engineering roles and interesting problems. The fastest way to
            reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${primary.address}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-canvas transition-colors duration-200 hover:bg-accent-soft"
            >
              <Mail size={18} aria-hidden="true" />
              {primary.address}
            </a>
            <CopyEmailButton address={primary.address} />
          </div>

          {alternates.length > 0 && (
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
              <span>Also at</span>
              {alternates.map((entry, i) => (
                <span key={entry.address} className="flex items-center gap-2">
                  <a
                    href={`mailto:${entry.address}`}
                    className="rounded font-medium text-body underline decoration-hairline underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {entry.address}
                  </a>
                  {entry.label && <span className="text-muted">({entry.label})</span>}
                  {i < alternates.length - 1 && <span aria-hidden="true">·</span>}
                </span>
              ))}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap gap-4">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2.5 rounded-lg border border-hairline bg-surface/60 px-4 py-3 text-sm font-medium text-body transition-colors duration-200 hover:border-accent/60 hover:text-accent"
              >
                <Icon size={18} />
                {label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
