import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'We discuss your idea, goals, target users and requirements.' },
  { num: '02', title: 'PLAN', desc: 'Your project scope, features and pricing are defined before development begins.' },
  { num: '03', title: 'DEVELOP', desc: 'I design and develop your website or web application according to the agreed requirements.' },
  { num: '04', title: 'REVIEW', desc: 'You receive an opportunity to review the completed project and provide your included revisions.' },
  { num: '05', title: 'FINALISE', desc: 'The agreed changes are implemented and the website is prepared for final handover.' },
  { num: '06', title: 'PAYMENT', desc: 'Once the project is completed and ready for handover, the outstanding project fee is paid.' },
  { num: '07', title: 'HANDOVER', desc: 'You receive the agreed website, source code and project access.' },
];

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">My Development Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A structured approach from idea to delivery.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className="flex gap-6 group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-md shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                  {s.num}
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-primary/30 to-border" />}
              </div>
              <div className="pb-10">
                <h3 className="font-bold text-lg tracking-wide">{s.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4">Ownership</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">Your website belongs to you. Upon full payment, clients receive ownership of their completed website and project-specific source code.</p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">Where possible, project repositories and deployment accounts are created under the client&#39;s ownership. Clients maintain control of their own project resources while the developer may be added as a collaborator for development and maintenance.</p>
          <p className="text-muted-foreground text-sm leading-relaxed">Pre-existing reusable development tools, frameworks, libraries, components and general development resources remain the property of the developer.</p>
        </motion.div>
      </div>
    </section>
  );
}
