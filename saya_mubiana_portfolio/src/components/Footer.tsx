import { useState } from 'react';
import { Mail, Globe, Copy, Check, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@project/components/ui/popover';
import { toast } from 'sonner';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const contactItems = [
  {
    icon: Mail,
    label: 'mubianasaya@gmail.com',
    href: 'mailto:mubianasaya@gmail.com',
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
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mubianasaya@gmail.com');
    setCopied(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

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
            <Link
              to="/"
              onClick={() => {
                if (window.location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="inline-block group"
            >
              <p className="text-2xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Saya</span>{' '}
                Mubiana
              </p>
            </Link>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() => {
                      if (window.location.pathname === link.href) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-300" />
                    {link.label}
                  </Link>
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
            <span>Developed by</span>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="font-bold text-primary hover:text-accent underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-all cursor-pointer inline-flex items-center gap-1 bg-pink-100/70 hover:bg-pink-100 px-2.5 py-1 rounded-full text-xs"
                >
                  Saya Mubiana
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-2xl z-50 text-slate-900"
                side="top"
                align="start"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2 border-slate-100">
                    <p className="font-extrabold text-sm text-slate-900">Developer Contact</p>
                    <span className="text-[10px] bg-pink-100 text-primary px-2 py-0.5 rounded-full font-bold">Saya Mubiana</span>
                  </div>
                  <p className="text-xs text-slate-500">Contact options for mubianasaya@gmail.com:</p>

                  <div className="space-y-2 pt-1">
                    {/* Option 1: Send Email */}
                    <a
                      href="mailto:mubianasaya@gmail.com"
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/80 hover:bg-pink-50 hover:border-pink-200 transition-all text-xs group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-pink-100 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-900 group-hover:text-primary">Send Email</p>
                          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-primary" />
                        </div>
                        <p className="text-slate-600 font-mono truncate text-[11px]">mubianasaya@gmail.com</p>
                      </div>
                    </a>

                    {/* Option 2: Copy Email */}
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/80 hover:bg-pink-50 hover:border-pink-200 transition-all text-xs group text-left cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-pink-100 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </div>
                      <div className="overflow-hidden flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-900 group-hover:text-primary">Copy Email Address</p>
                          <span className="text-[10px] text-slate-400 font-medium">{copied ? 'Copied!' : 'Click to copy'}</span>
                        </div>
                        <p className="text-slate-600 font-mono truncate text-[11px]">mubianasaya@gmail.com</p>
                      </div>
                    </button>
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
