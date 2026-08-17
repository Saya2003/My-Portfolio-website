import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Frequently Asked Questions</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto divide-y divide-border">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                className="w-full flex items-center justify-between py-5 text-left group"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-semibold text-sm pr-4 group-hover:text-primary transition-colors">{f.q}</span>
                <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.p
                    className="text-sm text-muted-foreground pb-5 -mt-1"
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
          className="max-w-2xl mx-auto mt-12 space-y-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <h4 className="font-semibold text-foreground mb-1">Cancellation Policy</h4>
            <p>If the client cancels a project after development has commenced, the client may be responsible for payment for work completed up to the cancellation date.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Acceptance Policy</h4>
            <p>Once the developer notifies the client that the website is ready for final review, the client must review the website and communicate any final issues within 5 business days. After that, if there are no legitimate outstanding issues, the project is considered ready for handover.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
