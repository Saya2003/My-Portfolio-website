import { Button } from '@project/components/ui/button';
import { ArrowRight, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PHOTO_URL = 'https://images.fillout.com/orgid-813188/flowpublicid-default/widgetid-default/f2UtjP4mnZTK8CxyFtuy7M/pasted-image-1786948607703-j34ww7c9.jpg';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden dotted-grid">
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/70 text-primary text-xs font-semibold mb-6 border border-pink-200/40"
            >
              <Code2 className="w-3.5 h-3.5" />
              PROFESSIONAL WEB DEVELOPMENT
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-slate-900">
              Building professional websites &{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                digital solutions
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-800 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              My name is <strong className="text-slate-900 font-bold">Saya Mubiana</strong>. I&#39;m a passionate Software Developer who creates modern, responsive, and user-focused websites and digital solutions that bring ideas to life.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="#portfolio-preview">
                <Button size="lg" className="gap-2.5 bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm rounded-xl px-7 py-3.5 h-12 text-base font-semibold transition-all hover:border-slate-300">
                  View My Work <ArrowRight className="w-4.5 h-4.5 text-slate-700" />
                </Button>
              </a>
              <a href="#quote">
                <Button size="lg" className="gap-2.5 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg shadow-primary/25 rounded-xl px-7 py-3.5 h-12 text-base font-semibold transition-all">
                  Get a Quote <ArrowRight className="w-4.5 h-4.5 text-white" />
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-5 bg-gradient-to-br from-primary/35 via-purple-300/25 to-accent/35 rounded-[36px] blur-3xl pointer-events-none" />
              <div className="relative rounded-[28px] overflow-hidden shadow-[0_25px_60px_rgba(168,85,247,0.4)] ring-1 ring-purple-200/50">
                <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[460px] lg:h-[460px] overflow-hidden">
                  <img
                    src={PHOTO_URL}
                    alt="Saya Mubiana, freelance software developer and web developer"
                    width={460}
                    height={460}
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
