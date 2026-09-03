import { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '../hooks/useParallax';

interface ParallaxProps {
  children: ReactNode;
  /** Pixels the content moves vertically over the scroll range. */
  intensity?: number;
  /** Optional horizontal shift in pixels. */
  xIntensity?: number;
  /** Which CSS transform directions to apply. */
  axis?: 'y' | 'x' | 'both';
  /** Class applied to the motion wrapper. */
  className?: string;
}

/**
 * Wraps children in a scroll-driven parallax layer.
 *
 * The effect is tied to the wrapper's own position on screen via a ref, so it
 * only animates while the element is in view. On coarse-pointer (mobile/touch)
 * devices the intensity is reduced so the page stays smooth and responsive.
 */
export default function Parallax({
  children,
  intensity = 40,
  xIntensity = 0,
  axis = 'y',
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const applied = isMobile ? intensity * 0.3 : intensity;
  const xApplied = isMobile ? xIntensity * 0.3 : xIntensity;

  const y = useTransform(scrollYProgress, [0, 1], [applied, -applied]);
  const x = useTransform(scrollYProgress, [0, 1], [-xApplied, xApplied]);

  const style =
    axis === 'y'
      ? { y }
      : axis === 'x'
        ? { x }
        : { x, y };

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
}
