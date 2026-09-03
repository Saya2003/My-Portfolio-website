import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useIsMobile } from '../hooks/useParallax';

export default function CtaBanner() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bannerY = useTransform(scrollYProgress, [0, 1], [isMobile ? 20 : 60, isMobile ? -20 : -60]);
  const blobA = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -15 : -50]);
  const blobB = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 15 : 50]);

  return (
    <section ref={ref} id="faq" className="py-14 md:py-20 relative overflow-hidden dotted-grid">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ y: bannerY }}
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-primary to-accent p-8 md:p-14 text-center text-white shadow-2xl shadow-primary/20 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div style={{ y: blobA }} className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <motion.div style={{ y: blobB }} className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Ready to Bring Your Idea to Life?
            </h2>
            <p className="text-white/90 font-medium max-w-2xl mx-auto mb-8">
              Have a question or want to discuss your project? Let's talk — I'll help you figure out the best approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white text-primary px-7 py-3.5 h-12 text-base font-semibold shadow-lg transition-all hover:scale-105 cursor-pointer">
                  Get a Quote <ArrowRight className="w-4.5 h-4.5" />
                </span>
              </Link>
              <Link to="/faq">
                <span className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 text-white px-7 py-3.5 h-12 text-base font-semibold transition-all hover:bg-white/10 cursor-pointer">
                  Read the FAQ
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
