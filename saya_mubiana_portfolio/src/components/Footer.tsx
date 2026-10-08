import { useState } from 'react';
import { Mail, Globe, Copy, Check, ExternalLink, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useParallax';
import { Link, useLocation } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@project/components/ui/popover';
import { toast } from 'sonner';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Maintenance', href: '/maintenance' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const contactItems = [
  { icon: Mail, label: 'mubianasaya@gmail.com', href: 'mailto:mubianasaya@gmail.com' },
  { icon: Globe, label: 'Namibia · Remote worldwide', href: undefined },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const { pathname } = useLocation();
  const footerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  });
  const blobRightY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [isMobile ? 20 : 70, isMobile ? -20 : -70],
  );
  const blobLeftY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [isMobile ? -16 : -55, isMobile ? 16 : 55],
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mubianasaya@gmail.com');
    setCopied(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-border bg-gradient-to-b from-card to-background">
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div style={{ y: blobRightY }} className="absolute -bottom-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: blobLeftY }} className="absolute -top-24 -left-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <motion.div
          className="py-14 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <Link
              to="/"
              onClick={() => {
                if (pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="inline-block group"
            >
              <p className="text-2xl font-extrabold tracking-tight text-foreground">
                <span className="gradient-text">Saya</span> Mubiana
              </p>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
              Freelance software developer building modern websites and custom digital solutions for people and businesses.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() => {
                      if (pathname === link.href) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-60 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              {contactItems.map((item) => {
                const inner = (
                  <span className="inline-flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-300">
                      <item.icon className="w-4 h-4 text-primary" />
                    </span>
                    <span className="text-left">{item.label}</span>
                  </span>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <motion.a href={item.href} className="group inline-flex" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
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

        <motion.div
          className="h-px bg-border/80"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <div className="flex items-center gap-1.5 flex-wrap justify-center md:justify-start">
            <span>Developed by</span>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="font-bold text-primary hover:text-accent underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-all cursor-pointer inline-flex items-center gap-1 bg-primary/10 hover:bg-primary/15 px-2.5 py-1 rounded-full text-xs"
                >
                  Saya Mubiana
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 rounded-2xl bg-popover/95 backdrop-blur-xl border border-border shadow-2xl z-50" side="top" align="start">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2 border-border">
                    <p className="font-extrabold text-sm text-foreground">Developer Contact</p>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Saya Mubiana</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Contact options for mubianasaya@gmail.com:</p>
                  <div className="space-y-2 pt-1">
                    <a
                      href="mailto:mubianasaya@gmail.com"
                      className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/40 hover:bg-primary/5 hover:border-primary/20 transition-all text-xs group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-foreground group-hover:text-primary">Send Email</p>
                          <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <p className="text-muted-foreground font-mono truncate text-[11px]">mubianasaya@gmail.com</p>
                      </div>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/40 hover:bg-primary/5 hover:border-primary/20 transition-all text-xs group text-left cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </div>
                      <div className="overflow-hidden flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-foreground group-hover:text-primary">Copy Email Address</p>
                          <span className="text-[10px] text-muted-foreground font-medium">{copied ? 'Copied!' : 'Click to copy'}</span>
                        </div>
                        <p className="text-muted-foreground font-mono truncate text-[11px]">mubianasaya@gmail.com</p>
                      </div>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-center md:text-right">&copy; {new Date().getFullYear()} All rights reserved · Website maintenance available</p>
        </motion.div>
      </div>
    </footer>
  );
}
