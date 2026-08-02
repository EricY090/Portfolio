// ===========================================================================
//  Site content: single source of truth.
//
//  All page copy and data live in this module. Components read from these
//  exports and hold no hardcoded text, so content changes never require
//  editing JSX.
// ===========================================================================

export const profile = {
  firstName: 'Eric',
  lastName: 'Yang',
  tagline: 'Software Engineer | MEng CS @ Cornell \'27 | BS CS @ Stevens',
  pitch: 'Building fault-tolerant, high-performance backend systems and real-time data infrastructure at scale.',

  /**
   * Hero headshot, served from public/ at the site root.
   *
   * Hero.jsx falls back to a text-only layout if the image fails to load, so a
   * missing file degrades gracefully rather than rendering a broken image.
   * Expects a roughly square source; 600x600 is sufficient for the largest
   * render size at 2x pixel density. Set to null to disable.
   */
  photo: {
    src: '/headshot.jpg',
    alt: 'Eric Yang',
  },

  /**
   * Contact addresses, primary first.
   *
   * Contact.jsx gives the first entry the primary action button and the
   * copy-to-clipboard control, and renders any remaining entries as a
   * secondary line. The list is variable length and the component adapts.
   *
   * `label` is an optional short qualifier shown beside the address.
   */
  emails: [
    { address: 'ey294@cornell.edu', label: 'School' },
    { address: 'yhx9027@gmail.com', label: 'Work' },
  ],

  github: 'https://github.com/EricY090',
  linkedin: 'https://www.linkedin.com/in/eric-yang-4354a6250',

  // Served from public/resume.pdf at the site root.
  resumeUrl: '/resume.pdf',
};

export const fullName = `${profile.firstName} ${profile.lastName}`;

/** The address used for the main "email me" button. */
export const primaryEmail = profile.emails[0].address;

/** Anchors rendered in the sticky nav, in order. `id` must match a <Section id>. */
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'now', label: 'Now' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

/** About-section body copy. Rendered as one paragraph per entry. */
export const about = [
  'Software engineer with a B.S. in Computer Science from Stevens Institute of Technology and an incoming M.Eng student in CS at Cornell University. At Yuanta Securities, I build trading infrastructures, including real-time monitoring systems, market data pipelines spanning thousands of equities, and automation that traders and researchers depend on daily.',
  'I care about writing software that\'s reliable, fast, and solves real problems, whether that\'s processing a decade of tick-level market data, building robust backend systems, or automating workflows that save hours of manual effort every day. I\'m drawn to backend, distributed systems, and data engineering, where performance and correctness actually matter.'
];

/**
 * Experience entries, newest first.
 *   highlights: bullet list, rendered in order
 *   stack:      optional technology chips shown beneath the bullets
 *   links:      optional rich link cards, see LinkPreview.jsx
 */
export const experience = [
  {
    role: 'System Development Engineer',
    org: 'Yuanta Securities',
    period: 'July 2025 — July 2026',
    highlights: [
      'Engineered a Python market-data pipeline and alpha research system over 10+ years of tick-level exchange data across thousands of Taiwan-listed equities, powering feature generation, P&L analysis, and strategy backtesting.',
      'Cut repeated data loading by 90%+ with a config-driven data registry and metadata-based caching for the alpha research system, enabling faster research and more efficient use of compute resources.',
      'Built a .NET real-time trading-monitoring platform (NATS + Protobuf, async state handling) and reduced high-frequency redraw overhead by ~60–80% under peak market load.',
      'Shipped a 24/7 multi-process news pipeline collecting 10,000+ articles/day into MongoDB and Qdrant for semantic search',
      'Automated daily workflows that save several hours weekly.',
    ],
    stack: ['Python', 'C#/.NET', 'REST APIs', 'SQL', 'NATS', 'Protobuf', 'MongoDB', 'Qdrant'],
  },
  {
    role: 'Undergraduate Researcher',
    org: 'Stevens Institute of Technology',
    period: 'June 2023 — December 2024',
    highlights: [
      'Conducted deep learning research on clinical health records across a 27M-row multimodal dataset.',
      'Developed a novel pretraining approach to improve downstream model usability, and built the data pipelines end-to-end in Python.',
      'First-author publication at IEEE BigData 2024: "MPLite: Multi-Aspect Pretraining for Mining Clinical Health Records" (DOI: 10.1109/BigData62323.2024.10825511).',
    ],
    stack: ['Python', 'Deep Learning', 'Data Analysis', 'NLP', 'TensorFlow'],
    /**
     * Rich link cards rendered beneath the bullets.
     *
     * Metadata is authored here rather than fetched at runtime: the site is
     * static, so there is no server to resolve Open Graph tags, and the
     * browser cannot request a third-party origin directly under CORS. Values
     * below come from the Crossref record for the DOI.
     */
    links: [
      {
        source: 'IEEE',
        title: 'MPLite: Multi-Aspect Pretraining for Mining Clinical Health Records',
        description:
          'Eric Yang, Pengfei Hu, Xiaoxue Han, Yue Ning — 2024 IEEE International Conference on Big Data (BigData), pp. 5096–5102.',
        url: 'https://doi.org/10.1109/BigData62323.2024.10825511',
      },
    ],
  },
  {
    role: 'Course Assistant',
    org: 'Stevens Institute of Technology',
    period: 'September 2022 — December 2022',
    highlights: [
      'Supported an introductory C programming course covering systems-level fundamentals.',
      'Ran weekly labs and office hours, helping students debug and bridging professor–student communication.',
    ],
    stack: ['C', 'Computer Architecture', 'Linux'],
  },
];

/**
 * Current and upcoming work.
 *
 * Maintenance note: this is the only section whose copy references a specific
 * academic term, so it needs review each semester. Setting `now` to null hides
 * the section, in which case the matching `{ id: 'now' }` entry must also be
 * removed from navLinks, or the nav will anchor to an element that no longer
 * exists.
 *
 *   items[].status: short label rendered as a pill
 *   items[].links:  same shape as the experience links above
 *   courses:        optional, rendered as a labelled chip row
 *   involvement:    optional, rendered as a list
 *   offTheClock:    optional, rendered as a list
 *
 * The three optional blocks are independently nullable.
 */
export const now = {
  eyebrow: 'Now',
  title: "What I'm up to this fall",
  intro:
    "Starting my M.Eng. in CS at Cornell this fall. Between coursework, side projects, and getting involved on campus, here's where my time is going.",

  // Active projects, rendered as cards.
  items: [
    {
      title: 'AI on Azure',
      status: 'In progress',
      description:
        'Deploying an open-source Llama model on Azure behind a containerized FastAPI service and a small chat UI. Should be interesting to dive into cloud provisioning, cost-aware infrastructure, and AI model deployment at scale.',
      stack: ['Azure', 'Docker', 'FastAPI', 'Python'],
    },
    {
      title: 'Contributing to nats.py',
      status: 'Planned',
      description:
        "I relied on the NATS Python client daily building trading infrastructure, and reading its internals taught me more about async Python than any tutorial did. I want to give something back to it. Working inside a library that real systems depend on is the clearest way I know to learn how distributed-messaging software is actually maintained.",
      stack: ['Python', 'NATS'],
      // Populate `links` with the pull request once one is open:
      // links: [{ source: 'GitHub', title: '...', description: '...', url: '...' }],
    },
  ],

  /** Current-term coursework. Set to null to hide this block. */
  courses: {
    term: 'Fall 2026',
    items: [
      { code: 'CS 5414', name: 'Distributed Computing Principles' },
      { code: 'CS 5470', name: 'Systems for Large-Scale Machine Learning' },
      { code: 'CS 5154', name: 'Software Testing' },
      { code: 'CS 7090', name: 'Computer Science Colloquium' },
      { code: 'NBA 5070', name: 'Entrepreneurship for Scientists & Engineers' },
    ],
  },

  /** Campus organizations. Set to null or an empty array to hide this block. */
  involvement: [
    { name: 'CS Graduate Organization (CGSO)'},
    { name: 'Cornell Data Science' },
  ],

  /** Personal interests. Set to null or an empty array to hide this block. */
  offTheClock: [
    'Chasing a better pour-over and scouting every bubble-tea shop within walking distance of campus.',
    "Getting out onto Ithaca's gorges and Finger Lakes trails whenever the weather cooperates.",
    'Rock climbing sometimes in NYC, and losing the occasional game of Chess with as much grace as I can manage.',
    'Still reading about markets and quant finance — some habits from the trading desk die hard.',
  ],
};

/**
 * Skill groups. `icon` is a lucide-react export name; Skills.jsx resolves it
 * through a lookup table, so a new icon must also be imported there.
 *
 * TODO: add 'Azure' once the Azure deployment project ships.
 */
export const skills = [
  {
    group: 'Languages',
    icon: 'Code2',
    items: ['Python', 'C#', 'Java', 'JavaScript', 'SQL'],
  },
  {
    group: 'Frameworks & Tools',
    icon: 'Wrench',
    items: ['.NET', 'Node.js', 'React', 'FastAPI', 'Docker', 'Git', 'Selenium', 'Jira'],
  },
  {
    group: 'Databases',
    icon: 'Database',
    items: ['MongoDB', 'SQL Server', 'PostgreSQL', 'Qdrant'],
  },
];

/** Closing note rendered beneath the skills grid. Set to null to remove it. */
export const skillsNote = {
  lead: 'Always learning.',
  body: "This list keeps growing as I pick up new tools quickly and enjoy it!",
};

export const footer = {
  year: new Date().getFullYear(),
  builtWith: 'Built with React & Tailwind · Deployed on Azure',
};

// The page <title>, meta description, and Open Graph tags are static markup in
// public/index.html. CRA cannot read this module at build time, so those values
// must be kept in sync manually when the name or pitch changes.