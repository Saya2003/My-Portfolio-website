import { motion } from 'framer-motion';

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-28 pb-10 md:pt-32 md:pb-14 overflow-hidden dotted-grid">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="site-container relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="section-badge mb-5"
            >
              {badge}
            </motion.span>
          )}
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.55, ease: easeOut }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.5 }}
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            className="section-header-line mx-auto mt-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: easeOut }}
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
