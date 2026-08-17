import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const portfolioSites = [
  { title: 'Lindah Mulisa', type: 'Portfolio Website', url: 'https://lindahmulisa.netlify.app', desc: 'A modern portfolio website showcasing professional experience and skills.' },
  { title: 'Watanavi Kaposambo', type: 'Portfolio Website', url: 'https://watanavikaposambo.netlify.app/', desc: 'A professional online portfolio highlighting career and achievements.' },
  { title: 'Hope Mewess', type: 'Portfolio Website', url: 'https://hopemewess.netlify.app/', desc: 'A clean, responsive portfolio website for professional online presence.' },
];

const businessSites = [
  { title: 'Findelis Accountants', type: 'Professional Business Website', url: 'https://findelisaccountants.netlify.app/', desc: 'A professional business website for an accounting firm, designed around their brand and services.' },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Portfolio</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of websites I have designed and developed for my clients.
            </p>
          </motion.div>

          <Section title="Portfolio Websites" sites={portfolioSites} />
          <Section title="Professional Business Websites" sites={businessSites} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, sites }: { title: string; sites: typeof portfolioSites }) {
  return (
    <div className="mb-16">
      <motion.h2
        className="text-2xl font-bold mb-8"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {sites.map((site, i) => (
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
            <div className="aspect-video bg-muted relative overflow-hidden">
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
            <div className="p-5">
              <h3 className="font-bold text-lg">{site.title}</h3>
              <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/15">{site.type}</span>
              <p className="text-sm text-muted-foreground mt-2">{site.desc}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
