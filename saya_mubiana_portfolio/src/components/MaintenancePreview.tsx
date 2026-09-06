import { ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@project/components/ui/button';
import { useRef } from 'react';
import { useIsMobile } from '../hooks/useParallax';

const plans = [
  { title: 'Standard Maintenance', price: 'N$1,500/mo', desc: 'For portfolio and business websites' },
  { title: 'Advanced Maintenance', price: 'From N$2,500/mo', desc: 'For web apps with databases and auth' },
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
    <section ref={ref} id="maintenance" className="py-14 md:py-20 relative overflow-hidden dotted-grid">
      <div className="relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/70 text-primary text-xs font-semibold mb-4 border border-pink-200/40">
            <ShieldCheck className="w-3.5 h-3.5" />
            MAINTENANCE
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Website Maintenance</h2>
          <p className="text-slate-800 font-medium max-w-2xl mx-auto mt-3">
            Keep your website secure, updated and running smoothly after launch.
          </p>
        </motion.div>

        <motion.div style={{ y: shift }} className="flex flex-wrap justify-center gap-4">
          {plans.map((p, i) => (
            <motion.div
              key={p.title}
              className="relative rounded-2xl border-2 border-purple-700 bg-white/90 backdrop-blur-md p-6 w-64 transition-all duration-300 hover:border-primary/25 hover:shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <h3 className="font-bold text-slate-900 text-center">{p.title}</h3>
              <p className="mt-2 text-2xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center">
                {p.price}
              </p>
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
