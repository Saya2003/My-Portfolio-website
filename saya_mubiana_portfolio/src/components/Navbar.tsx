import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Services', href: '/services', internal: true },
    { label: 'Process', href: '/process', internal: true },
    { label: 'Portfolio', href: '/portfolio', internal: true },
    { label: 'Pricing', href: '/pricing', internal: true },
    { label: 'FAQ', href: '/faq', internal: true },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl shadow-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link
          to="/"
          onClick={() => {
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="group flex items-center gap-2"
        >
          <span className="text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Saya</span>{' '}
            Mubiana
          </span>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 absolute left-1/2 -translate-x-1/2">
          {links.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              {l.href === '/portfolio' || l.internal ? (
                <Link
                  to={l.href}
                  onClick={() => {
                    if (pathname === l.href) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="relative px-3 py-2 text-sm font-semibold text-slate-700 hover:text-primary transition-colors group"
                >
                  {l.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </Link>
              ) : (
                <a
                  href={l.href}
                  className="relative px-3 py-2 text-sm font-semibold text-slate-700 hover:text-primary transition-colors group"
                >
                  {l.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/contact">
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-md rounded-xl px-4 py-2.5 h-9 font-semibold">
                Get a Quote
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden relative"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            id="mobile-menu"
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 space-y-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {l.internal ? (
                    <Link
                      to={l.href}
                      className="block py-2.5 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-colors"
                      onClick={() => {
                        setOpen(false);
                        if (pathname === l.href) {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      className="block py-2.5 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </a>
                  )}
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="pt-2">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  <Button size="sm" className="w-full bg-gradient-to-r from-primary to-accent">Get a Quote</Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
