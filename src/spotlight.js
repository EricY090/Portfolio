/**
 * Cursor-following accent wash for cards.
 *
 * Spread onto any element that also carries the `spotlight` class:
 *
 *   <article className="spotlight card-lift ..." {...spotlight}>
 *
 * The handlers only write two CSS custom properties; the gradient itself is
 * defined by `.spotlight` in index.css. They are plain module-level functions
 * rather than a hook because no React state is involved, so pointer movement
 * triggers no re-render.
 */
export const spotlight = {
  onMouseMove: (event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  },

  // Park the gradient back off-card so it doesn't linger after the cursor goes.
  onMouseLeave: (event) => {
    const el = event.currentTarget;
    el.style.removeProperty('--spot-x');
    el.style.removeProperty('--spot-y');
  },
};
