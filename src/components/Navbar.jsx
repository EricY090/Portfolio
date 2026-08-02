import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { fullName, navLinks, profile } from '../content';

/** Highlights the nav link whose section currently occupies the viewport. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      // Narrow the observed band to the upper-middle of the viewport so the
      // active link changes as a section reaches reading position, rather than
      // the moment its top edge appears.
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.1, 0.5, 1] }
    );

    ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const SECTION_IDS = navLinks.map((link) => link.id);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  // Collapse the mobile menu when the viewport crosses the desktop breakpoint,
  // so it cannot remain open behind the desktop nav after a resize.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const close = () => setMenuOpen(false);
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline/60 bg-canvas/80 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
        <a
          href="#top"
          className="rounded text-sm font-semibold tracking-tight text-heading transition-colors hover:text-accent"
        >
          {fullName}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`rounded text-sm font-medium transition-colors hover:text-accent ${
                  active === link.id ? 'text-accent' : 'text-muted'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resumeUrl}
              download
              className="rounded-lg border border-accent/50 px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-canvas"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="rounded-lg p-2 text-muted transition-colors hover:text-heading sm:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-hairline/60 bg-canvas sm:hidden">
          <ul className="container-page flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded px-1 py-3 text-base font-medium transition-colors hover:text-accent ${
                    active === link.id ? 'text-accent' : 'text-body'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeUrl}
                download
                onClick={() => setMenuOpen(false)}
                className="block rounded px-1 py-3 text-base font-medium text-accent"
              >
                Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
