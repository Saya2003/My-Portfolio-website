import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@project/components/ui/card';
import { Button } from '@project/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';
import { Globe, Briefcase, Settings2 } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Portfolio Websites',
    price: 'From $93 / N$1,502.75',
    desc: 'Turn your CV and professional experience into a modern online presence.',
    idealFor: ['Students', 'Graduates', 'Software developers', 'Professionals', 'Creatives', 'Freelancers', 'Job seekers', 'Personal brands'],
    includes: [
      'Professional homepage', 'About Me', 'Education', 'Work experience', 'Skills',
      'Projects', 'Certifications', 'Achievements', 'Testimonials', 'Contact information',
      'Social media links', 'CV download', 'Responsive design', 'Basic SEO', 'Website deployment',
    ],
  },
  {
    icon: Briefcase,
    title: 'Professional Business Websites',
    price: 'From $280 / N$4,524.41',
    desc: 'Give your business a professional online presence with a modern website designed around your brand and services.',
    idealFor: ['Small businesses', 'Startups', 'Entrepreneurs', 'Service providers', 'Organisations', 'Local businesses', 'Personal brands', 'Professional practices'],
    includes: [
      'Homepage', 'About Us', 'Services', 'Products', 'Gallery', 'Testimonials',
      'Contact page', 'Contact form', 'Social media links',
      'Business information', 'Responsive design', 'Basic SEO', 'Website deployment',
    ],
  },
  {
    icon: Settings2,
    title: 'Custom Web Solutions',
    price: 'From $155 / N$2,504.58 per module',
    desc: "When a standard website isn't enough, I can develop custom functionality designed around your specific requirements.",
    idealFor: ['HR Management', 'Appointment Management', 'Customer & Invoice Management', 'Dashboards & Analytics', 'School Management', 'Restaurant Management', 'Other Custom Solutions'],
    includes: [
      'Employee records & leave management', 'Appointment scheduling & booking', 'Invoicing & payment tracking',
      'Business dashboards & KPIs', 'Student & class management', 'Menu & order management',
      'Custom database design', 'User roles & authentication', 'Third-party integrations',
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Services | Saya Mubiana Web Development"
        description="Portfolio websites, professional business websites and custom web solutions designed and developed by Saya Mubiana, a freelance software and web developer."
        canonical="https://sayamubianaa.netlify.app/services"
      />
      <Navbar />
      <main className="flex-1 pb-20">
        <PageHero
          badge="SERVICES"
          title="What I Can Build For You"
          subtitle="From personal portfolios to custom business systems, I design and develop websites that are modern, responsive and tailored to your goals."
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className="h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <Card className="h-full rounded-2xl border-2 border-purple-700 bg-white/90 backdrop-blur-md hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group">
                  <CardHeader>
                    <div className="w-11 h-11 rounded-xl bg-pink-100/70 text-primary flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{s.title}</CardTitle>
                    <p className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-1">{s.price}</p>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Ideal for</p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.idealFor.map((t) => (
                          <span key={t} className="text-xs px-3 py-1 rounded-full bg-pink-50/80 text-slate-700 border border-pink-100/80 font-medium">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Can include</p>
                      <ul className="space-y-1.5">
                        {s.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                            <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-sm text-slate-500 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            The exact pages and functionality will be agreed upon before development begins.
          </motion.p>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/contact">
              <Button size="lg" className="gap-2.5 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg shadow-primary/25 rounded-xl px-7 py-3.5 h-12 text-base font-semibold transition-all">
                Get a Quote
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
