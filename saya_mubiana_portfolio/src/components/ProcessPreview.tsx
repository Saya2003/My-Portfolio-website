import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@project/components/ui/button';
import SectionHeader from './SectionHeader';
import { ParallaxHeader, ParallaxItem, ParallaxLayer, ParallaxSection } from './ParallaxSection';

const steps = [
  { num: '01', title: 'Discover', desc: 'We discuss your idea and goals.' },
  { num: '02', title: 'Develop', desc: 'I design and build your website.' },
  { num: '03', title: 'Review & Finalise', desc: 'You review and we refine it together.' },
  { num: '04', title: 'Handover', desc: 'You receive your completed website.' },
];

export default function ProcessPreview() {
  return (
    <ParallaxSection id="process" className="section-shell dotted-grid bg-card/30">
      <ParallaxLayer speed={0.4} className="absolute top-1/4 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="site-container relative z-10">
        <ParallaxHeader>
          <SectionHeader
            badge="HOW IT WORKS"
            title="A Simple Process"
            subtitle="From your first idea to a live website — clear and collaborative."
          />
        </ParallaxHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {steps.map((s, i) => (
            <ParallaxItem key={s.num} index={i} intensity={48}>
              <motion.div
                className="surface-card relative p-6 text-center h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="w-11 h-11 mx-auto rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-sm font-bold shadow-md shadow-primary/20 mb-4">
                  {s.num}
                </div>
                <h3 className="font-extrabold text-foreground text-sm">{s.title}</h3>
                <p className="text-muted-foreground text-sm font-medium mt-1 leading-relaxed">{s.desc}</p>
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
          <Link to="/process">
            <Button variant="outline" className="gap-2 rounded-xl bg-white border border-slate-200 text-slate-900 hover:border-primary/40 hover:text-primary font-semibold">
              Learn About My Process <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </ParallaxSection>
  );
}
