import { useEffect, useState, type RefObject } from 'react';
import { useScroll, useTransform } from 'framer-motion';

/**
 * Detects coarse (touch / mobile) pointer devices so that heavy parallax
 * transforms can be reduced or disabled on small screens where scroll-jacking
 * and GPU memory are more costly.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return isMobile;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return reduced;
}

/**
 * A reusable scroll-driven parallax hook.
 *
 * Returns a MotionValue that shifts an element vertically as the page scrolls,
 * giving a parallax depth effect. When the user is on a coarse-pointer device
 * (most phones/tablets) the effect is automatically reduced so it stays smooth
 * and never jars the layout.
 *
 * @param intensity   Pixels the element should travel over the scroll range.
 * @param range       Scroll progress range (0-1) over which the effect applies.
 * @param mobileScale Fraction of intensity to apply on touch devices (0 disables).
 */
export function useParallax(
  intensity: number,
  range: [number, number] = [0, 1],
  mobileScale = 0.35,
) {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const applied = reduced ? 0 : isMobile ? intensity * mobileScale : intensity;
  return useTransform(scrollYProgress, range, [applied, -applied]);
}

export function useParallaxFrom(
  from: number,
  to: number,
  range: [number, number] = [0, 1],
  mobileScale = 0.35,
) {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  if (reduced) {
    return useTransform(scrollYProgress, range, [0, 0]);
  }
  const f = isMobile ? from + (to - from) * mobileScale : from;
  const t = to;
  return useTransform(scrollYProgress, range, [f, t]);
}

/** Scroll-linked scale + vertical shift for hero imagery. */
export function useHeroDepth(ref: RefObject<HTMLElement | null>, isMobile: boolean) {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [0, isMobile ? 36 : 88],
  );
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, isMobile ? 0.94 : 0.88]);
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [0, isMobile ? 22 : 56],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], reduced ? [1, 1, 1] : [1, 0.92, 0.75]);

  return { y, scale, textY, opacity, scrollYProgress };
}
