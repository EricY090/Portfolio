import { motion, useReducedMotion } from 'framer-motion';

/**
 * Fades + slides its children up as they scroll into view, once.
 *
 * Wrap any block that should animate in. Stagger siblings by passing an
 * increasing `delay` (0, 0.08, 0.16 …). Animation is skipped entirely when the
 * OS requests reduced motion.
 */
export default function Reveal({ children, delay = 0, className }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
