import { motion } from 'framer-motion';
import { Button } from '@project/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'We discuss your idea, goals, target users and requirements.' },
  { num: '02', title: 'PLAN', desc: 'Your project scope, features and pricing are defined before development begins.' },
  { num: '03', title: 'DEVELOP', desc: 'I design and develop your website or web application according to the agreed requirements.' },
  { num: '04', title: 'REVIEW', desc: 'You receive an opportunity to review the completed project and provide your included revisions.' },
  { num: '05', title: 'FINALISE', desc: 'The agreed changes are implemented and the website is prepared for final handover.' },
  { num: '06', title: 'PAYMENT', desc: 'Once the project is completed and ready for handover, the outstanding project fee is paid.' },
  { num: '07', title: 'HANDOVER', desc: 'You receive the agreed website, source code and project access.' },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="My Development Process | Saya Mubiana"
        description="A transparent, structured seven-step development process from idea to delivery, including ownership terms for your completed website."
        canonical="https://sayamubianaa.netlify.app/process"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Saya Mubiana Website Development Process',
            title: 'My Development Process',
            description: 'A structured seven-step approach from idea to delivery.',
            totalTime: 'Varies by project scope',
            step: steps.map((s) => ({
              '@type': 'HowToStep',
              position: parseInt(s.num, 10),
              name: s.title,
              text: s.desc,
            })),
          },
        ]}
      />
      <Navbar />
      <main className="flex-1 pb-20">
        <PageHero
          badge="PROCESS"
          title="My Development Process"
          subtitle="A structured, transparent approach that takes your project from the first idea to a completed, working website."
        />

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                className="flex gap-5 group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-md shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                    {s.num}
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-primary/30 to-border/60" />}
                </div>
                <div className="pb-5 pt-1">
                  <h3 className="font-extrabold text-slate-900 text-base tracking-wide">{s.title}</h3>
                  <p className="text-slate-900 text-sm font-semibold mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">Ownership</h3>
            <p className="text-slate-900 text-sm font-semibold leading-relaxed mb-3">Your website belongs to you. Upon full payment, clients receive ownership of their completed website and project-specific source code.</p>
            <p className="text-slate-900 text-sm font-semibold leading-relaxed mb-3">Where possible, project repositories and deployment accounts are created under the client&#39;s ownership. Clients maintain control of their own project resources while the developer may be added as a collaborator for development and maintenance.</p>
            <p className="text-slate-900 text-sm font-semibold leading-relaxed">Pre-existing reusable development tools, frameworks, libraries, components and general development resources remain the property of the developer.</p>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/contact">
              <Button size="lg" className="gap-2.5 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg shadow-primary/25 rounded-xl px-7 py-3.5 h-12 text-base font-semibold transition-all">
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
