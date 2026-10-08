import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@project/components/ui/button';
import SectionHeader from './SectionHeader';
import { ParallaxHeader, ParallaxItem, ParallaxLayer, ParallaxSection } from './ParallaxSection';

const plans = [
  { title: 'Standard Maintenance', desc: 'For portfolio and business websites' },
  { title: 'Advanced Maintenance', desc: 'For web apps with databases and auth' },
];

export default function MaintenancePreview() {
  return (
    <ParallaxSection id="maintenance" className="section-shell dotted-grid">
      <ParallaxLayer speed={0.42} className="absolute top-1/2 -right-16 w-64 h-64 bg-primary/8 rounded-full blur-3xl" />

      <div className="site-container relative">
        <ParallaxHeader>
          <SectionHeader
            badge="MAINTENANCE"
            title="Website Maintenance"
            subtitle="Keep your website secure, updated and running smoothly after launch."
          />
        </ParallaxHeader>

        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {plans.map((p, i) => (
            <ParallaxItem key={p.title} index={i} intensity={44}>
              <motion.div
                className="surface-card relative p-6 w-full max-w-xs sm:w-64"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <h3 className="font-bold text-foreground text-center">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground font-medium text-center">{p.desc}</p>
              </motion.div>
            </ParallaxItem>
          ))}
        </div>

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
    </ParallaxSection>
  );
}
