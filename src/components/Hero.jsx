import { useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { fullName, profile } from '../content';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

/** Mount-time fade-up. Above the fold, so no scroll trigger is needed. */
function Stagger({ children, delay, reduceMotion, className }) {
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Fall back to the text-only hero if the image fails to load, so a missing
  // or renamed file never renders as a broken-image icon.
  const [showPhoto, setShowPhoto] = useState(Boolean(profile.photo?.src));

  return (
    // Height is driven by content rather than the viewport. Pinning to viewport
    // height and centring would distribute the leftover space above and below
    // the content, inflating the gaps to the navbar and the next section.
    <section id="top" className="relative overflow-hidden">
      {/* Decorative layers, hence aria-hidden. Glow first, dot grid over it;
          both sit behind the content. Both are defined in index.css. */}
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="container-page pb-14 pt-8 sm:pb-16 sm:pt-12">
        {/* Column-reverse puts the photo above the text on mobile, and to the
            right of it from lg up. */}
        <div className="flex flex-col-reverse items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="min-w-0 flex-1">
            <Stagger delay={0} reduceMotion={reduceMotion}>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                {profile.tagline}
              </p>
            </Stagger>

            <Stagger delay={0.1} reduceMotion={reduceMotion}>
              <h1 className="mt-3 text-5xl font-bold tracking-tight text-heading sm:text-6xl lg:text-7xl">
                {fullName}
              </h1>
            </Stagger>

            <Stagger delay={0.2} reduceMotion={reduceMotion}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body sm:text-xl">
                {profile.pitch}
              </p>
            </Stagger>

            <Stagger delay={0.3} reduceMotion={reduceMotion}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-canvas transition-colors duration-200 hover:bg-accent-soft"
                >
                  <Download size={18} aria-hidden="true" />
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-lg border border-hairline px-5 py-3 text-sm font-semibold text-heading transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  Get in Touch
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </Stagger>

            <Stagger delay={0.4} reduceMotion={reduceMotion}>
              <div className="mt-8 flex items-center gap-5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile"
                  className="rounded text-muted transition-colors hover:text-accent"
                >
                  <GithubIcon size={22} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile"
                  className="rounded text-muted transition-colors hover:text-accent"
                >
                  <LinkedinIcon size={22} />
                </a>
              </div>
            </Stagger>
          </div>

          {showPhoto && (
            <Stagger delay={0.15} reduceMotion={reduceMotion} className="shrink-0">
              <img
                src={profile.photo.src}
                alt={profile.photo.alt}
                width={288}
                height={288}
                onError={() => setShowPhoto(false)}
                className="h-32 w-32 rounded-2xl object-cover ring-1 ring-hairline sm:h-40 sm:w-40 lg:h-72 lg:w-72"
              />
            </Stagger>
          )}
        </div>
      </div>
    </section>
  );
}
