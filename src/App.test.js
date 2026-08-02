import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
import {
  about,
  experience,
  fullName,
  navLinks,
  now,
  primaryEmail,
  profile,
  skills,
  skillsNote,
} from './content';

/**
 * Smoke tests: every section renders and stays wired to content.js. These exist
 * so that editing content.js can't silently blank out part of the page.
 */

describe('portfolio page', () => {
  test('renders the hero with name, tagline and pitch', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: fullName })).toBeInTheDocument();
    expect(screen.getByText(profile.tagline)).toBeInTheDocument();
    expect(screen.getAllByText(profile.pitch).length).toBeGreaterThan(0);
  });

  test('renders every nav link as an in-page anchor to a real section', () => {
    const { container } = render(<App />);
    const nav = screen.getByRole('navigation', { name: 'Main' });

    navLinks.forEach(({ id, label }) => {
      const link = within(nav).getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', `#${id}`);
      // The anchor target must actually exist, or smooth-scroll goes nowhere.
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    });
  });

  test('renders both about paragraphs', () => {
    render(<App />);
    about.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  test('renders every experience entry with its highlights', () => {
    render(<App />);
    experience.forEach((job) => {
      expect(screen.getByRole('heading', { name: job.role })).toBeInTheDocument();
      job.highlights.forEach((point) => {
        expect(screen.getByText(point)).toBeInTheDocument();
      });
    });
  });

  test('renders every skill group and chip', () => {
    render(<App />);
    skills.forEach((group) => {
      expect(screen.getByRole('heading', { name: group.group })).toBeInTheDocument();
      group.items.forEach((item) => {
        expect(screen.getAllByText(item).length).toBeGreaterThan(0);
      });
    });
  });

  test('renders a mailto link for every configured email', () => {
    const { container } = render(<App />);
    profile.emails.forEach(({ address }) => {
      expect(container.querySelector(`a[href="mailto:${address}"]`)).toBeInTheDocument();
    });
  });

  test('the first email is the primary one and gets the copy button', () => {
    render(<App />);
    expect(primaryEmail).toBe(profile.emails[0].address);
    expect(screen.getByRole('button', { name: `Copy ${primaryEmail}` })).toBeInTheDocument();
  });

  test('wires social links to the configured destinations', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', profile.github);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      profile.linkedin
    );
  });

  // Skipped rather than failed when no photo is configured: a text-only hero is
  // a supported configuration, not a regression.
  const photoTest = profile.photo?.src ? test : test.skip;
  photoTest('renders the hero photo from the configured path', () => {
    render(<App />);
    const photo = screen.getByAltText(profile.photo.alt);
    expect(photo).toHaveAttribute('src', profile.photo.src);
  });

  const nowTest = now?.items?.length ? test : test.skip;
  nowTest('renders every item in the Now section with its status', () => {
    render(<App />);
    now.items.forEach((item) => {
      expect(screen.getByRole('heading', { name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      if (item.status) {
        expect(screen.getAllByText(item.status).length).toBeGreaterThan(0);
      }
    });
  });

  // Every optional block of `now` gets asserted, so adding a field to content.js
  // without wiring it into Now.jsx fails loudly instead of silently vanishing.
  const coursesTest = now?.courses?.items?.length ? test : test.skip;
  coursesTest('renders the coursework block', () => {
    render(<App />);
    now.courses.items.forEach((course) => {
      expect(screen.getByText(course.code)).toBeInTheDocument();
      expect(screen.getByText(course.name)).toBeInTheDocument();
    });
  });

  const involvementTest = now?.involvement?.length ? test : test.skip;
  involvementTest('renders campus involvement', () => {
    render(<App />);
    now.involvement.forEach((entry) => {
      expect(screen.getByText(entry.name)).toBeInTheDocument();
    });
  });

  const offClockTest = now?.offTheClock?.length ? test : test.skip;
  offClockTest('renders the off-the-clock lines', () => {
    render(<App />);
    now.offTheClock.forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });
  });

  const noteTest = skillsNote ? test : test.skip;
  noteTest('renders the closing note under the skills grid', () => {
    render(<App />);
    expect(screen.getByText(skillsNote.lead)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(skillsNote.body.slice(0, 30)))).toBeInTheDocument();
  });

  test('renders a preview card for every link attached to an experience entry', () => {
    const { container } = render(<App />);
    const links = experience.flatMap((job) => job.links ?? []);
    expect(links.length).toBeGreaterThan(0);

    links.forEach((link) => {
      const card = container.querySelector(`a[href="${link.url}"]`);
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(link.title);
      expect(card).toHaveTextContent(link.source);
      // External links must not leak the referrer or grant window.opener.
      expect(card).toHaveAttribute('target', '_blank');
      expect(card).toHaveAttribute('rel', 'noreferrer noopener');
    });
  });

  describe('UI interactions', () => {
    const setWindow = (prop, value) =>
      Object.defineProperty(window, prop, { value, writable: true, configurable: true });

    afterEach(() => {
      setWindow('scrollY', 0);
      window.scrollTo.mockClear();
    });

    test('back-to-top stays hidden until scrolled, then returns to the top', () => {
      setWindow('innerHeight', 800);
      setWindow('scrollY', 0);
      render(<App />);

      expect(screen.queryByRole('button', { name: 'Back to top' })).not.toBeInTheDocument();

      setWindow('scrollY', 1000); // past the 0.8 * innerHeight threshold
      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });

      const button = screen.getByRole('button', { name: 'Back to top' });
      fireEvent.click(button);
      expect(window.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ top: 0 })
      );
    });

    test('spotlight tracks the cursor and clears on leave', () => {
      const { container } = render(<App />);
      const card = container.querySelector('.spotlight');
      expect(card).toBeInTheDocument();

      // jsdom reports a zero-origin rect, so the offsets equal the client coords.
      fireEvent.mouseMove(card, { clientX: 120, clientY: 45 });
      expect(card.style.getPropertyValue('--spot-x')).toBe('120px');
      expect(card.style.getPropertyValue('--spot-y')).toBe('45px');

      fireEvent.mouseLeave(card);
      expect(card.style.getPropertyValue('--spot-x')).toBe('');
    });
  });

  test('every resume button points at the resume PDF', () => {
    render(<App />);
    const resumeLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href') === profile.resumeUrl);
    // Navbar + hero + experience section.
    expect(resumeLinks.length).toBe(3);
    resumeLinks.forEach((link) => expect(link).toHaveAttribute('download'));
  });
});
