# Eric Yang — Portfolio

A single-page personal site: a digital extension of a business card.

**→ [main.d6py91yy4ntgg.amplifyapp.com](https://main.d6py91yy4ntgg.amplifyapp.com/)**

![Eric Yang — Software Engineer. MEng CS @ Cornell '27, BS CS @ Stevens.](public/og-image.png)

---

## Overview

A static React site — hero, about, experience timeline, a "now" section, skills,
and contact — built to load fast, read well on a phone, and stay cheap to run.
No backend, no database, no tracking. Contact is a `mailto:` with a
copy-to-clipboard fallback, because a contact form would mean a server, a spam
problem, and a dependency, in exchange for nothing a recruiter needs.

| | |
| --- | --- |
| **Frontend** | React 19, Tailwind CSS 3 |
| **Motion / icons** | Framer Motion, lucide-react |
| **Build** | react-scripts 5 (Create React App) |
| **Hosting** | AWS Amplify Hosting → S3 + CloudFront, ACM certificate |
| **CI/CD** | Push to `main` → automatic build and deploy |

---

## Engineering notes

The parts of this repo I'd actually point at in a review.

**Content is data, not markup.** Every string on the site lives in
[`src/content.js`](src/content.js). Components hold no copy — sections render by
mapping over arrays, so adding a job or a skill group is a data edit, not a JSX
edit. The structure of the page and the content of the page change
independently.

**One source of truth for theme.** No component hardcodes a hex value. Colour
resolves through semantic Tailwind tokens — `canvas`, `surface`, `hairline`,
`heading`, `body`, `muted`, `accent` — defined once in
[`tailwind.config.js`](tailwind.config.js). Re-theming the site, including
inverting it to light mode, is one file.

**Motion is opt-out, and hover is capability-gated.** `Reveal.jsx` and
`Hero.jsx` check `prefers-reduced-motion` and render statically when the OS asks
them to. Every hover effect sits behind `@media (hover: hover)`, so touch
devices never get stuck in a hover state they can't leave — a bug that's easy to
ship and hard to notice on a desktop.

**Failure states are designed, not discovered.** A missing headshot doesn't
render a broken image: the hero detects the load failure and falls back to a
text-only layout. Setting `profile.photo = null` is the same path, taken
deliberately.

**A tradeoff taken on purpose.** The LinkedIn-style link cards are *authored*,
not fetched. A real unfurl needs a server to read the target's Open Graph tags,
because a static page can't fetch a third-party origin from the browser (CORS).
Hardcoding the metadata means the card paints instantly, makes no request, and
has no failure state — at the cost of updating it by hand. For a handful of
stable links, that's the better trade.

**The edge is configured, not defaulted.**
[`customHttp.yml`](customHttp.yml) sets HSTS, `nosniff`, and frame and referrer
policy site-wide, then splits caching by what the filename guarantees:
content-hashed bundles under `static/` are `immutable` for a year, while
`index.html` must revalidate — otherwise returning visitors keep the old app
shell and deploys go unseen.

---

## Running it locally

```bash
npm install
npm start        # http://localhost:3000
```

```bash
npm test         # smoke tests
npm run build    # static build into build/
```

CI builds with `CI=true`, which promotes lint warnings to errors — run
`CI=true npm run build` to reproduce a deploy build exactly.

---

## Repo layout

```
public/          static assets: index.html, og-image.png, resume.pdf, favicon
src/
├── content.js   all copy and data — the file most edits touch
├── App.jsx      section order
├── index.css    Tailwind layers + shared utilities
└── components/  one file per section, plus shared shells and effects
customHttp.yml   response headers applied at the CloudFront edge
tailwind.config.js
```

Editing guide, deployment specifics, and implementation gotchas:
**[MAINTENANCE.md](MAINTENANCE.md)**.
