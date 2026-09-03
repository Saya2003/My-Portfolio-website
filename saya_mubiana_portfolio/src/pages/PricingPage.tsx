import { Check } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@project/components/ui/card';
import { Button } from '@project/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';

const plans = [
  { title: 'Portfolio Website', price: 'From $93', sub: 'N$1,502.75', desc: 'For individuals and professionals who want a modern online portfolio.', featured: false },
  { title: 'Professional Website', price: 'From $280', sub: 'N$4,524.41', desc: 'For businesses and organisations that need a professional online presence.', featured: true },
  { title: 'Custom Modules', price: 'From $155', sub: 'N$2,504.58', desc: 'For additional functionality such as booking systems, dashboards, invoicing and more.', featured: false },
  { title: 'Custom Web Applications', price: 'Custom Quote', sub: '', desc: 'Complex platforms and management systems are individually quoted according to their requirements.', featured: false },
];

const included = [
  { q: "What's included?", a: 'Each project includes only the features and services specified in the agreed project scope.' },
  { q: 'Need something extra?', a: 'Additional functionality can be added for an additional fee.' },
  { q: 'Who provides the content?', a: 'The client provides the required business information, images, logos, written content and other materials unless content creation has been separately agreed upon.' },
  { q: 'What about domains?', a: 'Domain registration and renewal fees are separate unless specifically included in your quotation.' },
  { q: 'What about hosting?', a: 'Basic deployment is included where applicable. Third-party hosting, premium services, APIs and other external costs may be charged separately.' },
  { q: 'Do you provide maintenance?', a: 'Yes. Ongoing maintenance and support can be arranged separately after project completion.' },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Pricing | Saya Mubiana Web Development"
        description="Transparent pricing for portfolio websites, professional business websites and custom web solutions — starting from $93 USD."
        canonical="https://sayamubianaa.netlify.app/pricing"
      />
      <Navbar />
      <main className="flex-1 pb-20">
        <PageHero
          badge="PRICING"
          title="Simple, Transparent Pricing"
          subtitle="Clear starting prices with no hidden costs. The exact scope and final quote are agreed before any development begins."
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {plans.map((p, i) => (
              <motion.div
                key={p.title}
                className="h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`relative h-full min-h-[340px] md:min-h-[360px] flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 ${p.featured ? 'border-primary bg-white/95 shadow-xl ring-1 ring-primary/30' : 'border-slate-200/80 bg-white/90 backdrop-blur-md hover:border-primary/25 hover:shadow-lg'}`}>
                  {p.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-md shadow-primary/30">
                      Popular
                    </div>
                  )}
                  <div>
                    <CardHeader className="text-center p-0 mb-4">
                      <CardTitle className="text-xl font-bold text-slate-900">{p.title}</CardTitle>
                      <p className="text-3xl font-extrabold mt-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{p.price}</p>
                      {p.sub && <p className="text-xs text-slate-600 font-semibold mt-1">{p.sub}</p>}
                    </CardHeader>
                    <p className="text-sm text-slate-900 font-semibold text-center leading-relaxed mt-4">{p.desc}</p>
                  </div>
                  <div className="mt-8 pt-4">
                    <Link to="/contact" className="block">
                      <Button variant={p.featured ? 'default' : 'outline'} className={`w-full rounded-xl py-3 font-semibold ${p.featured ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/25' : 'border-slate-200 hover:border-primary text-slate-900 bg-white'}`} size="lg">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="max-w-4xl mx-auto mt-12 bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-extrabold mb-6 text-center text-slate-900">Important Information</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {included.map((item) => (
                <div key={item.q} className="flex gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-sm text-slate-900">{item.q}</p>
                    <p className="text-sm text-slate-900 font-semibold leading-relaxed mt-1">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
