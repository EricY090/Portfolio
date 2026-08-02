import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/**
 * Hairline accent bar indicating scroll position within the document.
 *
 * Layered above the sticky navbar (z-[60] against the nav's z-50). Hidden from
 * assistive technology: it duplicates position information a screen reader
 * already exposes.
 */
export default function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // The spring smooths out trackpad jitter. Under reduced motion, track scroll
  // position exactly instead of easing toward it.
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    />
  );
}
