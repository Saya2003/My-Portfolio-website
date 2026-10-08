import { Button } from '@project/components/ui/button';
import { ArrowRight, Code2 } from 'lucide-react';
import { motion, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useHeroDepth, useIsMobile } from '../hooks/useParallax';
const PHOTO_URL = '/image-1.png';

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { y: photoY, scale: photoScale, textY, opacity: heroOpacity, scrollYProgress } = useHeroDepth(ref, isMobile);

  const blobA = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -24 : -96]);
  const blobB = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 24 : 96]);

  return (
    <section ref={ref} className="relative section-shell pt-28 md:pt-32 pb-14 md:pb-20 dotted-grid overflow-hidden">
      <motion.div style={{ y: blobA }} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] bg-primary/12 rounded-full blur-3xl animate-pulse" />
      </motion.div>
      <motion.div style={{ y: blobB }} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] bg-accent/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,90vw)] h-[min(600px,90vw)] bg-gradient-to-br from-primary/8 via-accent/6 to-transparent rounded-full blur-3xl" />
      </motion.div>

      <motion.div style={{ opacity: heroOpacity }} className="site-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          <motion.div
            style={{ y: textY }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeOut }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="section-badge mb-6"
            >
              <Code2 className="w-3.5 h-3.5" />
              PROFESSIONAL WEB DEVELOPMENT
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-foreground max-w-xl">
              Building professional websites &{' '}
              <span className="gradient-text">digital solutions</span>
            </h1>

            <motion.p
              className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed max-w-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              My name is <strong className="text-foreground font-bold">Saya Mubiana</strong>. I&#39;m a passionate Software Developer who
              creates modern, responsive, and user-focused websites that bring ideas to life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.55, ease: easeOut }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center lg:justify-start"
            >
              <motion.a href="#portfolio-preview" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2.5 bg-card/90 border-border hover:border-primary/30 hover:bg-card shadow-sm rounded-xl px-7 h-12 text-base font-semibold"
                >
                  View My Work <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.a>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link to="/contact" className="block w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-95 shadow-lg shadow-primary/25 rounded-xl px-7 h-12 text-base font-semibold"
                  >
                    Get a Quote <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: photoY, scale: photoScale }}
            className="flex justify-center lg:justify-end order-1 lg:order-2 origin-center lg:origin-right"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-primary/30 via-purple-300/20 to-accent/30 rounded-[2rem] blur-2xl pointer-events-none opacity-80" />
              <div className="relative rounded-[1.75rem] overflow-hidden shadow-2xl shadow-primary/25 ring-1 ring-primary/20">
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] xl:w-[440px] xl:h-[440px] overflow-hidden bg-muted">
                  <img
                    src={PHOTO_URL}
                    alt="Saya Mubiana, freelance software developer and web developer"
                    width={440}
                    height={440}
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/20" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
