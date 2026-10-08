import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@project/components/ui/button';
import { useRef } from 'react';
import { useIsMobile } from '../hooks/useParallax';
import SectionHeader from './SectionHeader';

const plans = [
  { title: 'Standard Maintenance', desc: 'For portfolio and business websites' },
  { title: 'Advanced Maintenance', desc: 'For web apps with databases and auth' },
];

export default function MaintenancePreview() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const shift = useTransform(scrollYProgress, [0, 1], [isMobile ? 12 : 40, isMobile ? -12 : -40]);

  return (
    <section ref={ref} id="maintenance" className="section-shell dotted-grid">
      <div className="site-container relative">
        <SectionHeader
          badge="MAINTENANCE"
          title="Website Maintenance"
          subtitle="Keep your website secure, updated and running smoothly after launch."
        />

        <motion.div style={{ y: shift }} className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {plans.map((p, i) => (
            <motion.div
              key={p.title}
              className="surface-card relative p-6 w-full max-w-xs sm:w-64"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <h3 className="font-bold text-slate-900 text-center">{p.title}</h3>
              <p className="mt-3 text-sm text-slate-600 font-medium text-center">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/maintenance">
            <Button variant="outline" className="gap-2 rounded-xl bg-white border border-slate-200 text-slate-900 hover:border-primary/40 hover:text-primary font-semibold">
              View Maintenance Plans <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
