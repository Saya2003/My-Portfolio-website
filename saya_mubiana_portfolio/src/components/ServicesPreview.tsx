import { Globe, Briefcase, Settings2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@project/components/ui/button';
import SectionHeader from './SectionHeader';
import { ParallaxHeader, ParallaxItem, ParallaxLayer, ParallaxSection } from './ParallaxSection';

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
  return (
    <ParallaxSection id="services" className="section-shell dotted-grid">
      <ParallaxLayer speed={0.55} className="absolute top-0 right-0 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
      <ParallaxLayer speed={0.35} className="absolute bottom-0 left-0 w-72 h-72 bg-accent/8 rounded-full blur-3xl" />

      <div className="site-container relative z-10">
        <ParallaxHeader>
          <SectionHeader
            badge="WHAT I OFFER"
            title="Services"
            subtitle="Modern, responsive websites and custom digital solutions tailored to your goals."
          />
        </ParallaxHeader>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <ParallaxItem key={s.title} index={i} intensity={56} driftX={i === 1}>
              <motion.div
                className="group surface-card relative overflow-hidden rounded-3xl p-8 h-full"
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
          <Link to="/services">
            <Button variant="outline" className="gap-2 rounded-xl bg-white border border-slate-200 text-slate-900 hover:border-primary/40 hover:text-primary font-semibold">
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </ParallaxSection>
  );
}
