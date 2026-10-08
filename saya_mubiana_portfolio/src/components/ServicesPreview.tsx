import { Globe, Briefcase, Settings2, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@project/components/ui/button';
import { useRef } from 'react';
import { useIsMobile } from '../hooks/useParallax';
import SectionHeader from './SectionHeader';

const services = [
  {
    icon: Globe,
    title: 'Portfolio Websites',
    tag: 'Personal online presence',
  },
  {
    icon: Briefcase,
    title: 'Business Websites',
    tag: 'Professional brand presence',
  },
  {
    icon: Settings2,
    title: 'Custom Web Solutions',
    tag: 'Built to your requirements',
  },
];

export default function ServicesPreview() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const blobA = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -20 : -70]);
  const blobB = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 20 : 70]);

  return (
    <section ref={ref} id="services" className="section-shell dotted-grid">
      <motion.div style={{ y: blobA }} className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: blobB }} className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <SectionHeader
          badge="WHAT I OFFER"
          title="Services"
          subtitle="Modern, responsive websites and custom digital solutions tailored to your goals."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="group surface-card relative overflow-hidden rounded-3xl p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center mb-5 shadow-md shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground font-medium mt-1">{s.tag}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/services">
            <Button variant="outline" className="gap-2 rounded-xl bg-white border border-slate-200 text-slate-900 hover:border-primary/40 hover:text-primary font-semibold">
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
