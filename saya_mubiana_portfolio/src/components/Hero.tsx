import { Button } from '@project/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useParallax';
import { SCROLL_REVEAL_SVH } from '../constants/heroScroll';

const PHOTO_URL = '/image-1.png';

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 1;
    const end = 0.58;
    return Math.max(0, 1 - progress / end);
  });

  const textY = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 0;
    const end = 0.62;
    const t = Math.min(progress / end, 1);
    const maxShift = isMobile ? 420 : 640;
    return -maxShift * t;
  });

  const overlayOpacity = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 1;
    if (progress <= 0.08) return 1;
    if (progress >= 0.65) return 0;
    return 1 - (progress - 0.08) / (0.65 - 0.08);
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const sectionHeight = reduced ? '100svh' : `calc(100svh + ${SCROLL_REVEAL_SVH}svh)`;

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: sectionHeight }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Portrait — fixed within the pinned viewport (no scroll parallax on the image) */}
        <div className="absolute inset-0 z-0" aria-hidden>
          <img
            src={PHOTO_URL}
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
            className="hero-photo absolute inset-0 h-full w-full min-h-full min-w-full"
          />
          <motion.div className="absolute inset-0" style={{ opacity: overlayOpacity }}>
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10 lg:via-black/25 lg:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Copy — fades and lifts away on scroll */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex h-[100svh] w-full items-center"
        >
          <div className="site-container w-full pb-16 pt-24 md:pt-28 lg:pb-20">
            <motion.div
              className="mx-auto flex max-w-3xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: easeOut }}
            >
              <h1 className="mb-6 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
                Building professional websites &{' '}
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  digital solutions
                </span>
              </h1>

              <motion.p
                className="mb-8 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                My name is <strong className="font-bold text-white">Saya Mubiana</strong>. I&#39;m a passionate Software Developer who
                creates modern, responsive, and user-focused websites that bring ideas to life.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.55, ease: easeOut }}
                className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4 lg:justify-start"
              >
                <motion.a href="#portfolio-preview" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 w-full gap-2.5 rounded-xl border-white/40 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-md hover:border-white/60 hover:bg-white/20 sm:w-auto"
                  >
                    View My Work <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.a>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Link to="/contact" className="block w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="h-12 w-full gap-2.5 rounded-xl bg-gradient-to-r from-primary to-accent px-7 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:opacity-95 sm:w-auto"
                    >
                      Get a Quote <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {!reduced && (
          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-white/70"
            aria-hidden
          >
            <span className="text-xs font-medium tracking-wide">Scroll</span>
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown className="h-5 w-5" />
            </motion.span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
