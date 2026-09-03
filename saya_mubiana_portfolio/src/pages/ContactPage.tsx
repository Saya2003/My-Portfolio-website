import { Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import QuoteForm from '../components/QuoteForm';

const contactCards = [
  {
    icon: Mail,
    title: 'Email',
    value: 'mubianasaya@gmail.com',
    href: 'mailto:mubianasaya@gmail.com',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Namibia (available worldwide)',
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Usually within 24 hours',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Contact & Get a Quote | Saya Mubiana"
        description="Request a quote for your portfolio website, professional business website or custom web solution. Tell me about your project and I'll get back to you."
        canonical="https://sayamubianaa.netlify.app/contact"
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        {/* Contact info cards */}
        <div className="container mx-auto px-4 mb-8">
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {contactCards.map((c, i) => (
              <motion.a
                key={c.title}
                href={c.href}
                target={c.href?.startsWith('http') ? '_blank' : undefined}
                rel={c.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group block rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-5 text-center hover:border-primary/40 transition-all duration-300 hover:shadow-lg ${c.href ? '' : 'cursor-default pointer-events-none'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-11 h-11 mx-auto rounded-xl bg-pink-100/70 text-primary flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <c.icon className="w-5 h-5" />
                </div>
                <p className="font-bold text-slate-900 text-sm">{c.title}</p>
                <p className="text-sm text-slate-600 font-medium mt-1">{c.value}</p>
              </motion.a>
            ))}
          </div>
        </div>

        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
