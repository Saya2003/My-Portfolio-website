import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@project/components/ui/button';

const steps = [
  { num: '01', title: 'Discover', desc: 'We discuss your idea and goals.' },
  { num: '02', title: 'Develop', desc: 'I design and build your website.' },
  { num: '03', title: 'Review & Finalise', desc: 'You review and we refine it together.' },
  { num: '04', title: 'Handover', desc: 'You receive your completed website.' },
];

export default function ProcessPreview() {
  return (
    <section id="process" className="py-14 md:py-20 relative overflow-hidden dotted-grid bg-white/40">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/70 text-primary text-xs font-semibold mb-4 border border-pink-200/40">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">A Simple Process</h2>
          <p className="text-slate-800 font-medium max-w-2xl mx-auto mt-3">
            From your first idea to a live website — clear and collaborative.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className="relative rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-6 text-center hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <div className="w-11 h-11 mx-auto rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-sm font-bold shadow-md shadow-primary/20 mb-4">
                {s.num}
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">{s.title}</h3>
              <p className="text-slate-600 text-sm font-medium mt-1 leading-relaxed">{s.desc}</p>
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
          <Link to="/process">
            <Button variant="outline" className="gap-2 rounded-xl bg-white border border-slate-200 text-slate-900 hover:border-primary/40 hover:text-primary font-semibold">
              Learn About My Process <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
