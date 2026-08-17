import { Mail, Globe, Phone, ArrowUpRight, Heart, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@project/components/ui/popover';

const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'FAQ', href: '/#faq' },
];

const contactItems = [
  {
    icon: Mail,
    label: 'mubianasaya@gmail.com',
    href: 'mailto:mubianasaya@gmail.com',
  },
  {
    icon: Phone,
    label: '+264 81 558 0036',
    href: 'https://wa.me/264815580036',
  },
  {
    icon: Globe,
    label: 'Namibia',
    href: undefined,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      {/* Decorative blobs */}
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <motion.div
          className="py-16 grid md:grid-cols-3 gap-12 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand column */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <Link to="/" className="inline-block group">
              <p className="text-2xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Saya</span>{' '}
                Mubiana
              </p>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto md:mx-0">
              Building professional websites and digital solutions for individuals, businesses and organisations.
            </p>
            <motion.a
              href="#quote"
              className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-primary hover:text-accent transition-colors group"
              whileHover={{ x: 4 }}
            >
              Start a project <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </motion.a>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-300" />
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-300" />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              {contactItems.map((item) => {
                const inner = (
                  <span className="inline-flex items-center gap-2.5 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="w-4 h-4 text-primary" />
                    </span>
                    {item.label}
                  </span>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <motion.a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group inline-flex"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {inner}
                      </motion.a>
                    ) : (
                      <span className="group inline-flex">{inner}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom bar */}
        <motion.div
          className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-1.5 flex-wrap justify-center md:justify-start">
            <span>This application was developed by</span>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="font-bold text-primary hover:text-accent underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-all cursor-pointer inline-flex items-center gap-1 bg-pink-100/70 hover:bg-pink-100 px-2.5 py-1 rounded-full text-xs"
                >
                  Saya Mubiana
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-2xl z-50 text-slate-900">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2 border-slate-100">
                    <p className="font-extrabold text-sm text-slate-900">Developer Contact</p>
                    <span className="text-[10px] bg-pink-100 text-primary px-2 py-0.5 rounded-full font-bold">Saya Mubiana</span>
                  </div>
                  <p className="text-xs text-slate-500">Contact options for Saya Mubiana:</p>
                  <div className="space-y-2 pt-1">
                    <a
                      href="mailto:mubianasaya@gmail.com"
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/80 hover:bg-pink-50 hover:border-pink-200 transition-all text-xs group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-pink-100 text-primary flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-semibold text-slate-900 group-hover:text-primary">Email</p>
                        <p className="text-slate-600 font-mono truncate">mubianasaya@gmail.com</p>
                      </div>
                    </a>

                    <a
                      href="tel:+264815580036"
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/80 hover:bg-pink-50 hover:border-pink-200 transition-all text-xs group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-pink-100 text-primary flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-semibold text-slate-900 group-hover:text-primary">Cell Phone Number</p>
                        <p className="text-slate-600 font-mono truncate">+264 81 558 0036</p>
                      </div>
                    </a>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-slate-500 text-center md:text-right">&copy; {new Date().getFullYear()} All rights reserved · Website maintenance packages available</p>
        </motion.div>
      </div>
    </footer>
  );
}
