# Maintaining this site

Working notes for editing and deploying the site. For what it is and how it is
built, see the [README](README.md).

The layout is designed so that **routine updates never touch JSX** — almost
everything below is an edit to `src/content.js`.

---

## Running it

```bash
npm install     # first time only
npm start       # dev server at http://localhost:3000, hot reload
npm test        # smoke tests
npm run build   # static production build into build/
```

---

## Before editing

The name appears in three places — `src/content.js`, `public/index.html`, and
`public/manifest.json` — because the two files under `public/` are static and
cannot read `content.js`.

---

## How this is organised

```
public/
├── index.html          page <title>, meta description, Open Graph tags
├── favicon.svg
├── manifest.json
├── og-image.png        1200x630 link-preview card
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
customHttp.yml          response headers applied at the CloudFront edge
tailwind.config.js      the colour palette
```

---

## Common edits

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

**A link preview card** — add an entry to a job's `links` array in `content.js`:

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

**Regenerate the link-preview card** — `public/og-image.png` is a 1200×630 PNG.
Its text duplicates `profile` in `content.js`, so it needs redrawing when the
name, tagline, or pitch changes.

---

## Implementation notes

- `lucide-react` v1 removed brand marks, so GitHub and LinkedIn are hand-inlined
  SVGs in `BrandIcons.jsx`. Don't go looking for `<Github />` in lucide.
- `create-react-app` is deprecated upstream. `react-scripts` still builds fine,
  but if it ever breaks, migrating to Vite is mostly: swap the dev dependency,
  move `index.html` to the project root, and rename `index.js` → `main.jsx`. No
  component code changes.
- Animations are opt-out: `Reveal.jsx` and `Hero.jsx` both check
  `prefers-reduced-motion` and render statically when the OS asks them to.

---

## Deployment

Hosted on **AWS Amplify Hosting**, which builds from `main` and serves through
CloudFront. Every push to `main` triggers a rebuild — there is no manual deploy
step and no build output in the repo.

Build settings, if the app is ever recreated:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `build` |
| Branch | `main` |

Amplify runs the build with `CI=true`, which makes CRA treat lint warnings as
errors. A build that succeeds locally can still fail there; reproduce it with
`CI=true npm run build` before pushing.

### Response headers

`customHttp.yml` at the repo root is read by Amplify on each build and applied
at the edge. It sets HSTS, `nosniff`, frame and referrer policy site-wide,
caches the content-hashed files under `static/` as immutable, and forces
revalidation of `index.html` so deploys reach returning visitors.

There is deliberately no `Content-Security-Policy`: `index.html` loads Inter
from `fonts.googleapis.com` and framer-motion writes inline styles, so a working
policy needs `style-src 'unsafe-inline'` plus both Google origins. Worth adding
deliberately, not by guesswork.

### Moving to a custom domain

Amplify console → Hosting → Custom domains handles the certificate and DNS. The
deployed origin is also hardcoded in `public/index.html` (`rel="canonical"`,
`og:url`, `og:image`, `twitter:image`) because Open Graph requires absolute
URLs — update those in the same change.

---

## Parked ideas

Dark/light toggle, a Projects section, analytics, and a real Content Security
Policy.
