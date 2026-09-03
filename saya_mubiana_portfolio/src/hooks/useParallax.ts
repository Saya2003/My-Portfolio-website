import { useEffect, useState } from 'react';
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
  const { scrollYProgress } = useScroll();
  const applied = isMobile ? intensity * mobileScale : intensity;
  return useTransform(scrollYProgress, range, [applied, -applied]);
}

export function useParallaxFrom(
  from: number,
  to: number,
  range: [number, number] = [0, 1],
  mobileScale = 0.35,
) {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const f = isMobile ? from + (to - from) * mobileScale : from;
  const t = to;
  return useTransform(scrollYProgress, range, [f, t]);
}
