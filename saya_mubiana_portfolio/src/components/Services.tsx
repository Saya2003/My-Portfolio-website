import { Globe, Briefcase, Settings2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@project/components/ui/card';
import { motion } from 'framer-motion';

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden dotted-grid">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Services</h2>
          <p className="text-slate-800 font-medium max-w-2xl mx-auto">
            I design and develop responsive, modern and user-focused websites that help individuals and businesses establish a strong professional presence online.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="h-full rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group">
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
      </div>
    </section>
  );
}
