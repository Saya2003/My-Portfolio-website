import { motion } from 'framer-motion';

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-28 pb-10 md:pt-36 md:pb-14 overflow-hidden dotted-grid">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {badge && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/70 text-primary text-xs font-semibold mb-5 border border-pink-200/40"
            >
              {badge}
            </motion.span>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-slate-800 font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
