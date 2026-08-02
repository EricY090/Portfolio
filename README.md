# Portfolio

Single-page personal site for Eric Yang — a digital extension of a business card.
Built with Create React App + Tailwind CSS, deployed as a static site.

**Stack:** React 19 · Tailwind CSS 3 · lucide-react · Framer Motion · react-scripts 5

---

## Before deploying

Note that the name appears in three places —
`src/content.js`, `public/index.html`, and `public/manifest.json` — because the
two files under `public/` are static and cannot read `content.js`.

---

## Running it

```bash
npm install     # first time only
npm start       # dev server at http://localhost:3000, hot reload
npm test        # smoke tests
npm run build   # static production build into build/
```

---

## How this is organised

The point of the layout is that **routine updates never touch JSX**.

```
public/
├── index.html          page <title>, meta description, Open Graph tags
├── favicon.svg
├── manifest.json
└── resume.pdf
src/
├── content.js          all copy and data; the only file most edits touch
├── App.jsx             stacks the sections in order
├── spotlight.js        cursor-follow handlers for card hover
├── index.js            React entry point
├── index.css           Tailwind directives + .container-page / .chip
└── components/
    ├── Navbar.jsx      sticky nav, scroll-spy highlight, mobile menu
    ├── Hero.jsx        name, tagline, pitch, CTAs
    ├── About.jsx
    ├── Experience.jsx  timeline of roles
    ├── Now.jsx         current / upcoming work (has a shelf life — see below)
    ├── Skills.jsx      grouped chips
    ├── Contact.jsx     mailto + copy-to-clipboard + social links
    ├── Footer.jsx
    ├── Section.jsx     shared section shell (heading, spacing, anchor offset)
    ├── Reveal.jsx      scroll fade-in wrapper
    ├── LinkPreview.jsx unfurl-style card for external links
    ├── ScrollProgress.jsx  hairline read-progress bar
    ├── BackToTop.jsx   floating scroll-to-top button
    └── BrandIcons.jsx  GitHub + LinkedIn SVGs
tailwind.config.js      the colour palette
```

### Common edits

**New job, new bullet, new skill** — edit the `experience` or `skills` array in
`src/content.js`. Sections render straight from those arrays, so adding an entry
is enough; nothing else needs touching.

**Another email address** — append to `profile.emails` in `content.js`. The
first entry is the primary one: it gets the call-to-action button and the copy
control. Every entry after it renders on a secondary "Also at …" line.

**The "Now" section** — `now` in `content.js`. This is the only part of the site
that goes stale on its own: it says "this fall", so revisit it each semester. To
retire it, set `now = null` **and** delete `{ id: 'now' }` from `navLinks` —
otherwise the nav keeps a link to a section that no longer renders. Items support
the same `links` array as experience entries, so a merged PR or shipped project
gets an unfurl card.

**The headshot** — put a square image (~600×600, face centred) in `public/` and
point `profile.photo.src` at it. If the file is missing the hero falls back to
the text-only layout automatically, so a broken image can't ship. Set
`profile.photo` to `null` to remove it deliberately.

**A link preview card** — add an entry to a job's `links` array in
`content.js`:

```js
links: [
  {
    source: 'doi.org',                  // small label above the title
    title: 'Paper or project title',
    description: 'Authors — venue, pages.',
    url: 'https://doi.org/...',
  },
],
```

These render as LinkedIn-style unfurl cards. Note the metadata is **authored,
not fetched**: a real unfurl needs a server to read the target's Open Graph
tags, and a static page can't fetch a third-party origin from the browser
(CORS). Baking it in means the card paints instantly with no request and no
failure state — but you update it by hand if the target changes.

**Page spacing** — the gap between sections is the `py-*` on the `<section>` in
`Section.jsx` (doubled, since it's the bottom of one plus the top of the next).
Change it there and every section moves together.

**New skill group** — add an object to `skills` in `content.js`, then import its
[lucide icon](https://lucide.dev/icons/) and add it to the `ICONS` map at the top
of `src/components/Skills.jsx`.

**New nav section** — add to `navLinks` in `content.js`, build a component
wrapped in `<Section id="...">` using the same `id`, and render it in `App.jsx`.
The nav highlight and smooth-scroll then work automatically.

**Change the colour scheme** — edit the colours in `tailwind.config.js`. Nothing
hardcodes a hex value, so swapping the accent (or going light) is one edit there.
The file lists the indigo values as an alternative. Three places outside Tailwind
also carry the background colour and need updating alongside `canvas`:
`public/index.html` (`theme-color`), `public/manifest.json`, and
`public/favicon.svg`.

**Tune the hover interactions** — `.spotlight`, `.card-lift` and `.chip` in
`src/index.css`. To put the cursor-follow wash on a new card, add the
`spotlight` class and spread the handlers: `{...spotlight}` from
`src/spotlight.js`. Every effect is gated behind `@media (hover: hover)` so
touch devices don't get stuck hover states, and `.card-lift` drops its transform
under `prefers-reduced-motion`.

**Tune the background glows / dot grid** — `.hero-glow`, `.section-glow` and
`.dot-grid` in `src/index.css`. They render on `aria-hidden` layers behind the
content; pass `glow` to a `<Section>` to give it the softer wash (Contact uses
it to bookend the page).

**Change the page title / link-preview text** — `public/index.html`. This is
static HTML and cannot read `content.js`, so it has to be updated by hand.

### Implementation notes

- `lucide-react` v1 removed brand marks, so GitHub and LinkedIn are hand-inlined
  SVGs in `BrandIcons.jsx`. Don't go looking for `<Github />` in lucide.
- `create-react-app` is deprecated upstream. `react-scripts` still builds fine,
  but if it ever breaks, migrating to Vite is mostly: swap the dev dependency,
  move `index.html` to the project root, and rename `index.js` → `main.jsx`. No
  component code changes.
- Animations are opt-out: `Reveal.jsx` and `Hero.jsx` both check
  `prefers-reduced-motion` and render statically when the OS asks them to.

---

## Deploying

`npm run build` emits a static site into `build/`. Anything that serves a folder
will do.

### Azure Static Web Apps

1. Push this repo to GitHub.
2. Azure Portal → Create resource → **Static Web App**, sign in with GitHub,
   pick this repo and the `main` branch.
3. Build config — **App location:** `/`, **Output location:** `build`,
   build preset **React**.

Azure commits a GitHub Actions workflow to the repo; every push to `main` then
rebuilds and redeploys, with HTTPS on a free `*.azurestaticapps.net` URL.

### AWS S3 + CloudFront

Create an S3 bucket with static website hosting, upload the contents of `build/`,
put a CloudFront distribution in front of it, and request a certificate through
AWS Certificate Manager. Re-upload `build/` on each change until it's automated.

---

## Not done yet

Ideas parked for later: dark/light toggle, a Projects section, an `og:image` for
richer link previews, and analytics.
