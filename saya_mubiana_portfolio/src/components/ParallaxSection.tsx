import {
  createContext,
  useContext,
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';
import { motion, motionValue, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useParallax';

const ParallaxSectionContext = createContext<MotionValue<number> | null>(null);

const idleProgress = motionValue(0);

function useSectionProgress() {
  return useContext(ParallaxSectionContext);
}

function scaledIntensity(base: number, isMobile: boolean, reduced: boolean, mobileScale = 0.32) {
  if (reduced) return 0;
  return isMobile ? base * mobileScale : base;
}

interface ParallaxSectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  sectionRef?: RefObject<HTMLElement>;
}

/** Section-scoped scroll progress for layered parallax (foreground vs background). */
export function ParallaxSection({ id, className = '', children, sectionRef }: ParallaxSectionProps) {
  const internalRef = useRef<HTMLElement>(null);
  const ref = (sectionRef ?? internalRef) as RefObject<HTMLElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
      <ParallaxSectionContext.Provider value={scrollYProgress}>{children}</ParallaxSectionContext.Provider>
    </section>
  );
}

interface ParallaxLayerProps {
  className?: string;
  /** 0–1: lower = slower background drift */
  speed?: number;
  style?: CSSProperties;
}

/** Slow-moving decorative layer (blobs, gradients). */
export function ParallaxLayer({ className = '', speed = 0.45, style }: ParallaxLayerProps) {
  const progress = useSectionProgress();
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const amount = scaledIntensity(120 * speed, isMobile, reduced, 0.35);
  const y = useTransform(progress ?? idleProgress, [0, 1], [amount, -amount]);

  if (!progress || reduced) {
    return <div className={className} style={style} />;
  }

  return <motion.div className={`pointer-events-none ${className}`} style={{ ...style, y }} />;
}

interface ParallaxItemProps {
  children: ReactNode;
  className?: string;
  /** Stagger index — even/odd columns move in opposite directions */
  index?: number;
  /** Base travel in px */
  intensity?: number;
  /** Subtle horizontal drift */
  driftX?: boolean;
}

/** Foreground element with index-based stagger (portfolio-style scroll depth). */
export function ParallaxItem({
  children,
  className = '',
  index = 0,
  intensity = 52,
  driftX = false,
}: ParallaxItemProps) {
  const progress = useSectionProgress();
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  const direction = index % 2 === 0 ? 1 : -1;
  const stagger = 0.65 + (index % 3) * 0.18;
  const yAmount = scaledIntensity(intensity * stagger * direction, isMobile, reduced);
  const xAmount = driftX ? scaledIntensity(18 * direction, isMobile, reduced, 0.4) : 0;

  const y = useTransform(progress ?? idleProgress, [0, 1], [yAmount, -yAmount]);
  const x = useTransform(progress ?? idleProgress, [0, 1], [-xAmount, xAmount]);

  if (!progress || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={driftX ? { y, x } : { y }}>
      {children}
    </motion.div>
  );
}

interface ParallaxHeaderProps {
  children: ReactNode;
  className?: string;
}

/** Lighter parallax for section titles — moves slower than cards. */
export function ParallaxHeader({ children, className = '' }: ParallaxHeaderProps) {
  const progress = useSectionProgress();
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const amount = scaledIntensity(28, isMobile, reduced, 0.35);
  const y = useTransform(progress ?? idleProgress, [0, 1], [amount, -amount]);

  if (!progress || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
