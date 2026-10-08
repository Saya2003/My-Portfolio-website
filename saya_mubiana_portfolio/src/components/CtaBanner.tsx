import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useParallax';
import { ParallaxLayer, ParallaxSection } from './ParallaxSection';

export default function CtaBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  });
  const bannerY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [isMobile ? 20 : 56, isMobile ? -20 : -56],
  );
  const bannerScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.97, 1.02]);

  return (
    <ParallaxSection id="faq" className="section-shell dotted-grid">
      <ParallaxLayer speed={0.38} className="absolute top-1/2 left-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />

      <div className="site-container relative z-10">
        <motion.div
          ref={bannerRef}
          style={{ y: bannerY, scale: bannerScale }}
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-8 md:p-12 lg:p-14 text-center text-primary-foreground shadow-2xl shadow-primary/25 relative overflow-hidden origin-center"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <ParallaxLayer speed={0.65} className="absolute -top-20 -right-20 w-64 h-64 bg-white/15 rounded-full blur-3xl" />
          <ParallaxLayer speed={0.28} className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.12)_50%,transparent_75%)] animate-shimmer pointer-events-none opacity-40" />

          <div className="relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Ready to Bring Your Idea to Life?
            </motion.h2>
            <motion.p
              className="text-primary-foreground/90 font-medium max-w-2xl mx-auto mb-8 text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Have a question or want to discuss your project? Let&apos;s talk — I&apos;ll help you figure out the best approach.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contact">
                  <span className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-card text-primary px-7 py-3.5 min-h-12 text-base font-semibold shadow-lg transition-colors hover:bg-card/95 cursor-pointer">
                    Get a Quote <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/faq">
                  <span className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border-2 border-primary-foreground/35 text-primary-foreground px-7 py-3.5 min-h-12 text-base font-semibold transition-colors hover:bg-white/10 cursor-pointer">
                    Read the FAQ
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </ParallaxSection>
  );
}
