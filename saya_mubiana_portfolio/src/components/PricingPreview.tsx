import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@project/components/ui/button';

const plans = [
  { title: 'Portfolio Website', price: 'From $93', featured: false },
  { title: 'Professional Website', price: 'From $280', featured: true },
  { title: 'Custom Modules', price: 'From $155', featured: false },
];

export default function PricingPreview() {
  return (
    <section id="pricing" className="py-14 md:py-20 relative overflow-hidden dotted-grid">
      <div className="relative">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/70 text-primary text-xs font-semibold mb-4 border border-pink-200/40">
            PRICING
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Transparent Pricing</h2>
          <p className="text-slate-800 font-medium max-w-2xl mx-auto mt-3">
            Clear starting prices, agreed scope and no hidden costs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {plans.map((p, i) => (
            <motion.div
              key={p.title}
              className={`relative rounded-2xl border p-6 w-64 transition-all duration-300 ${
                p.featured
                  ? 'border-primary bg-white/95 shadow-xl ring-1 ring-primary/30'
                  : 'border-slate-200/80 bg-white/90 backdrop-blur-md hover:border-primary/25 hover:shadow-lg'
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-md shadow-primary/30">
                  Popular
                </div>
              )}
              <h3 className="font-bold text-slate-900 text-center">{p.title}</h3>
              <p className="mt-2 text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center">
                {p.price}
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                <Check className="w-4 h-4 text-primary" /> Agreed project scope
              </p>
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
          <Link to="/pricing">
            <Button variant="outline" className="gap-2 rounded-xl bg-white border border-slate-200 text-slate-900 hover:border-primary/40 hover:text-primary font-semibold">
              View Full Pricing <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
