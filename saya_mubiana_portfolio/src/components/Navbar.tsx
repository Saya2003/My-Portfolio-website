import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { SCROLL_REVEAL_SVH } from '../constants/heroScroll';

const links = [
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Maintenance', href: '/maintenance' },
  { label: 'FAQ', href: '/faq' },
];

function NavItem({
  href,
  label,
  pathname,
  onNavigate,
  overHero,
}: {
  href: string;
  label: string;
  pathname: string;
  onNavigate?: () => void;
  overHero?: boolean;
}) {
  const active = pathname === href;

  return (
    <Link
      to={href}
      onClick={() => {
        onNavigate?.();
        if (pathname === href) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      className={`nav-link group ${active ? 'nav-link-active' : ''} ${
        overHero ? 'text-white/85 hover:text-white' : ''
      } ${overHero && active ? '!text-white' : ''}`}
    >
      {label}
      <span
        className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full transition-all duration-300 origin-center ${
          overHero ? 'bg-white' : 'bg-gradient-to-r from-primary to-accent'
        } ${
          active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70'
        }`}
      />
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setScrolled(y > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const heroRevealEnd = typeof window !== 'undefined' ? window.innerHeight * (1 + SCROLL_REVEAL_SVH / 100) : 0;
  const overHero = pathname === '/' && scrollY < heroRevealEnd && !open;

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 22, delay: 0.05 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow,border-color,backdrop-filter] duration-500 ${
        open ? 'nav-glass' : overHero ? 'nav-over-hero' : scrolled ? 'nav-glass' : 'nav-over-hero'
      }`}
    >
      <nav
        className={`site-container h-16 lg:h-[4.25rem] grid grid-cols-[1fr_auto] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 ${
          overHero && !open ? 'nav-over-hero-text' : ''
        }`}
      >
        <Link
          to="/"
          onClick={() => {
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="group flex items-center gap-2 justify-self-start"
        >
          <motion.span
            className={`text-xl font-bold tracking-tight ${overHero ? 'text-white' : 'text-foreground'}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <span className={overHero ? 'text-white' : 'gradient-text'}>Saya</span> Mubiana
          </motion.span>
        </Link>

        <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
          {links.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.05, duration: 0.35 }}
            >
              <NavItem href={l.href} label={l.label} pathname={pathname} overHero={overHero} />
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.35 }}
          >
            <Link to="/contact">
              <Button
                size="sm"
                className="relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:opacity-95 shadow-md shadow-primary/20 rounded-xl px-5 h-9 font-semibold transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10">Get a Quote</span>
              </Button>
            </Link>
          </motion.div>

          <motion.button
            type="button"
            className={`lg:hidden relative p-2 rounded-xl transition-colors ${
              overHero && !open ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-primary/10'
            }`}
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.92 }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
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
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden border-t border-border/80 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="site-container py-4 space-y-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={l.href}
                    className={`block py-3 px-4 text-sm font-semibold rounded-xl transition-colors ${
                      pathname === l.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="pt-3 md:hidden">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  <Button size="sm" className="w-full bg-gradient-to-r from-primary to-accent rounded-xl h-11 font-semibold">
                    Get a Quote
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
