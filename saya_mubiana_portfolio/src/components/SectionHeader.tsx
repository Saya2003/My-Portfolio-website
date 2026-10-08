import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ badge, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <motion.div
      className={`text-center mb-10 md:mb-12 max-w-3xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {badge && <span className="section-badge mb-4">{badge}</span>}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground font-medium text-base md:text-lg leading-relaxed mt-3">{subtitle}</p>
      )}
      <div className="section-header-line mx-auto mt-6" aria-hidden />
    </motion.div>
  );
}
