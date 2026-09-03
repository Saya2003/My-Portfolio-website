import { ExternalLink } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '../hooks/useParallax';

const portfolioSites = [
  { title: 'Lindah Mulisa', type: 'Portfolio Website', url: 'https://lindahmulisa.netlify.app' },
  { title: 'Hope Mewess', type: 'Portfolio Website', url: 'https://hopemewess.netlify.app/' },
  { title: 'Watanavi S Kaposambo', type: 'Portfolio Website', url: 'https://watanavikaposambo.netlify.app/' },
];

const businessSites = [
  { title: 'Findelis Accountants', type: 'Professional Business Website', url: 'https://findelisaccountants.netlify.app/' },
  { title: 'CRG Research', type: 'Professional Business Website', url: 'https://www.crg-research.com/' },
];

export default function PortfolioPreview() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const shift = useTransform(scrollYProgress, [0, 1], [isMobile ? -12 : -35, isMobile ? 12 : 35]);

  const allSites = [...portfolioSites, ...businessSites].reverse().slice(0, 4);

  return (
    <section ref={ref} id="portfolio-preview" className="py-12 md:py-16 dotted-grid">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-slate-900">My Work</h2>
        </motion.div>

        <motion.div style={{ y: shift }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allSites.map((site, i) => (
            <motion.a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden rounded-xl">
                <iframe
                  src={site.url}
                  title={site.title}
                  className="w-[200%] h-[200%] scale-50 origin-top-left pointer-events-none absolute top-0 left-0"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm">{site.title}</h3>
                <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/15">{site.type}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/portfolio">
            <Button variant="outline" className="rounded-xl bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 font-semibold px-6 py-2.5 shadow-sm hover:border-primary/40 transition-all">
              View Full Portfolio
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
