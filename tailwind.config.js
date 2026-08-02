/** @type {import('tailwindcss').Config} */

// ---------------------------------------------------------------------------
// THEME
//
// All colour resolves through the semantic names below. No component hardcodes
// a hex value, so re-theming the site is a single edit in this file.
//
//   canvas    page background          bg-canvas
//   surface   cards / raised panels    bg-surface
//   hairline  borders and dividers     border-hairline
//   heading   headings, high contrast  text-heading
//   body      paragraph text           text-body
//   muted     secondary / meta text    text-muted
//   accent    the ONE accent colour    text-accent / bg-accent
//
// To switch to indigo: accent.DEFAULT #6366f1, soft #818cf8, deep #4f46e5.
// ---------------------------------------------------------------------------

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deeper than slate-900 so the slate-800 cards separate from the page
        // instead of blending into it.
        canvas: '#0b1120',
        surface: '#1e293b', // slate-800
        hairline: '#334155', // slate-700
        heading: '#f1f5f9', // slate-100
        body: '#cbd5e1', // slate-300
        muted: '#94a3b8', // slate-400
        accent: {
          DEFAULT: '#14b8a6', // teal-500
          soft: '#2dd4bf', // teal-400
          deep: '#0d9488', // teal-600
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        // The centred content column, used by .container-page in index.css.
        // Widened past the original ~1100px spec to give the experience cards
        // and skills grid more room. Prose blocks (About, Contact) keep their
        // own narrower max-w-3xl cap so line length stays readable.
        page: '74rem', // 1184px
      },
    },
  },
  plugins: [],
};
