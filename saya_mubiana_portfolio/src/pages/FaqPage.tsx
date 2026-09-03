import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@project/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';

const faqs = [
  { q: 'Do I own my website?', a: 'Yes. Upon full payment, the client receives ownership of the completed website and project-specific source code.' },
  { q: 'Do I need to know how to code?', a: 'No. I handle the technical development process.' },
  { q: 'Do you build websites for international clients?', a: 'Yes. Projects can be completed remotely for both local and international clients.' },
  { q: 'Do your prices include hosting?', a: 'Basic deployment is included where applicable. Domain registration, premium services and third-party costs are separate unless stated otherwise.' },
  { q: 'Can I request additional features?', a: 'Yes. Additional functionality can be added for an additional fee after the requirements are reviewed.' },
  { q: 'Can I request changes?', a: 'Yes. Your package includes a defined number of revision rounds.' },
  { q: 'How long does a website take?', a: "The timeline depends on the project's scope, complexity and how quickly the client provides content and feedback." },
  { q: 'Can you maintain my website after launch?', a: 'Yes. Maintenance packages can be arranged separately.' },
  { q: 'Can you build systems like booking platforms or management systems?', a: 'Yes. Advanced systems are custom-built and individually quoted.' },
];

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="FAQ | Saya Mubiana Web Development"
        description="Frequently asked questions about website ownership, pricing, hosting, timelines and more — answered for clients of Saya Mubiana web development."
        canonical="https://sayamubianaa.netlify.app/faq"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]}
      />
      <Navbar />
      <main className="flex-1 pb-20">
        <PageHero
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Answers to the questions clients ask most about building a website with me."
        />

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-purple-700 shadow-sm divide-y divide-slate-200/60">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <button
                  className="w-full flex items-center justify-between py-3.5 text-left group"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                >
                  <span className="font-extrabold text-sm text-slate-900 pr-4 group-hover:text-primary transition-colors">{f.q}</span>
                  <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 shrink-0 text-slate-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIdx === i && (
                    <motion.p
                      className="text-sm text-slate-900 font-semibold pb-4 -mt-1 leading-relaxed"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="max-w-3xl mx-auto mt-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 border-2 border-purple-700 shadow-sm space-y-4 text-sm text-slate-900 font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <h4 className="font-extrabold text-slate-900 mb-1">Cancellation Policy</h4>
              <p className="leading-relaxed">If the client cancels a project after development has commenced, the client may be responsible for payment for work completed up to the cancellation date.</p>
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 mb-1">Acceptance Policy</h4>
              <p className="leading-relaxed">Once the developer notifies the client that the website is ready for final review, the client must review the website and communicate any final issues within 5 business days. After that, if there are no legitimate outstanding issues, the project is considered ready for handover.</p>
            </div>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-800 font-medium mb-4">Still have a question?</p>
            <Link to="/contact">
              <Button size="lg" className="gap-2.5 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg shadow-primary/25 rounded-xl px-7 py-3.5 h-12 text-base font-semibold transition-all">
                <MessageCircleQuestion className="w-5 h-5" /> Contact Me
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
