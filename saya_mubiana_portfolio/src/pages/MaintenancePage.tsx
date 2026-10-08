import { useState } from 'react';
import { Check, ChevronDown, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@project/components/ui/card';
import { Button } from '@project/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';

/* ─── Standard plan features ─── */
const standardCategories = [
  {
    title: 'Website Health Checks',
    items: [
      'Regular checks to make sure the website is working correctly',
      'Check important pages, buttons, navigation and forms',
      'Identify obvious technical problems',
    ],
  },
  {
    title: 'Security Checks',
    items: [
      'Basic security checks',
      'Check that the website is using HTTPS/SSL correctly',
      'Monitor for common website issues that could affect the website',
    ],
  },
  {
    title: 'Website Backups',
    items: [
      'Regular backups where technically applicable',
      'Keep important website information backed up',
      'Basic recovery assistance if a supported website issue occurs',
    ],
  },
  {
    title: 'Uptime Monitoring',
    items: [
      'Check whether the website is online and accessible',
      'Identify major downtime or availability issues',
    ],
  },
  {
    title: 'Minor Content Updates',
    items: [
      'Changing existing text',
      'Updating a phone number, email address or physical address',
      'Replacing an existing image',
      'Updating existing business or service information',
    ],
  },
  {
    title: 'Minor Bug Fixes',
    items: [
      'Fix small errors affecting existing website functionality',
      'Fix broken buttons or links where possible',
      'Fix minor layout or display problems',
    ],
  },
  {
    title: 'Basic SEO Maintenance',
    items: [
      'Check important SEO settings',
      'Update basic page titles and descriptions when requested',
      'Check for basic SEO problems caused by website changes',
      "Help maintain the website's existing search-engine setup",
    ],
  },
  {
    title: 'Basic Performance Checks',
    items: [
      'Check for obvious website loading problems',
      'Identify basic performance issues',
      'Apply minor improvements where appropriate',
    ],
  },
  {
    title: 'Technical Support',
    items: [
      'Contact me when you experience a website-related technical problem',
      'Investigation and technical assistance',
      'Basic guidance relating to your website, domain, hosting and deployment',
    ],
  },
  {
    title: 'Monthly Maintenance Check',
    items: [
      'Perform a general technical check of the website each month',
      'Identify issues that should be addressed',
    ],
  },
];

/* ─── Advanced plan features (Standard + extras) ─── */
const advancedExtraCategories = [
  {
    title: 'Database Monitoring',
    items: [
      "Check that the website's database is functioning correctly",
      'Identify basic database-related problems',
      'Monitor important database functionality where applicable',
    ],
  },
  {
    title: 'Authentication Support',
    items: [
      'Troubleshoot existing login and authentication functionality',
      'Check for problems affecting existing user authentication',
      'Assist with existing account/login issues',
    ],
  },
  {
    title: 'Admin Dashboard Maintenance',
    items: [
      'Check that the existing admin dashboard is functioning correctly',
      'Fix minor issues affecting existing admin functionality',
      'Assist with existing admin features',
    ],
  },
  {
    title: 'Backend Maintenance',
    items: [
      'Check existing backend functionality',
      'Troubleshoot existing backend errors',
      'Maintain existing API/backend connections where applicable',
    ],
  },
  {
    title: 'Supabase / Cloud Backend Support',
    items: [
      'Perform basic checks of the existing Supabase setup where applicable',
      'Troubleshoot existing database, authentication or backend problems',
      'Maintain existing connections between the website and Supabase',
    ],
  },
  {
    title: 'Advanced Bug Fixing',
    items: [
      'Investigate more complex bugs affecting existing functionality',
      'Fix issues within the existing system where reasonably possible',
      'Major redevelopment will be quoted separately',
    ],
  },
  {
    title: 'More Frequent Technical Checks',
    items: [
      'Perform additional checks on important functionality',
      'Pay closer attention to backend, database, authentication and admin functionality',
    ],
  },
  {
    title: 'Priority Technical Support',
    items: [
      'Priority handling when dealing with website-related technical problems',
      'Response time depends on the nature and urgency of the issue',
      'This does not mean 24/7 emergency support',
    ],
  },
  {
    title: 'Minor Functionality Improvements',
    items: [
      'Small improvements to existing functionality may be included where they do not require substantial development',
      'Larger improvements or new functionality will be quoted separately',
    ],
  },
];

/* ─── What's Not Included ─── */
const notIncluded = [
  'Building a completely new website',
  'Major website redesigns',
  'Creating new pages that require significant development',
  'New databases',
  'New authentication systems',
  'New admin dashboards',
  'New e-commerce functionality',
  'New payment systems',
  'New booking systems',
  'New customer management systems',
  'New HR management systems',
  'New invoice management systems',
  'New third-party integrations',
  'Major API development',
  'Major backend development',
  'Large-scale SEO campaigns',
  'Website migration',
  'Domain registration fees',
  'Hosting fees',
  'Email service fees',
  'Third-party software/service subscriptions',
  'Any other major feature or system that requires substantial development',
];

/* ─── Business Rules ─── */
const rules = [
  'Maintenance is for an existing website.',
  'The maintenance service begins after the website has been completed/launched and the client has subscribed to a maintenance plan.',
  'The Standard plan is intended for simple portfolio and standard business websites.',
  'The Advanced plan is for more complex applications; the scope and quote depend on the complexity of the system.',
  'New features are NOT automatically included in maintenance.',
  'Major development work requires a separate quotation.',
  'Domain, hosting, email and third-party service costs are NOT included unless specifically stated in a separate agreement.',
  'Maintenance does not guarantee that every possible technical problem can be fixed for the monthly fee.',
  'If a problem requires substantial redevelopment, the client will be informed before additional work is performed.',
  'Unlimited development or unlimited changes are not included.',
];

/* ─── Accordion Item ─── */
function FeatureCategory({ title, items, isOpen, onToggle }: { title: string; items: string[]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-slate-200/60 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 text-left group"
      >
        <span className="font-bold text-sm text-slate-900 pr-3 group-hover:text-primary transition-colors">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 shrink-0 text-slate-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="pb-3 -mt-1 space-y-1.5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Package Card ─── */
function PackageCard({
  title,
  description,
  categories,
  note,
  featured,
  standardNote,
}: {
  title: string;
  description: string;
  categories: typeof standardCategories;
  note: string;
  featured?: boolean;
  standardNote?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleAll = () => {
    if (allExpanded) {
      setOpenIdx(null);
      setAllExpanded(false);
    } else {
      setOpenIdx(-1); // -1 means all open
      setAllExpanded(true);
    }
  };

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`relative h-full flex flex-col p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 ${featured ? 'border-purple-700 bg-white/95 shadow-xl ring-1 ring-purple-700/30' : 'border-purple-700 bg-white/90 backdrop-blur-md hover:border-primary/25 hover:shadow-lg'}`}>
        {featured && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-md shadow-primary/30">
            Recommended for Advanced Sites
          </div>
        )}

        <CardHeader className="text-center p-0 mb-4">
          <CardTitle className="text-xl font-bold text-slate-900">{title}</CardTitle>
          <p className="text-xs text-slate-500 font-semibold mt-2">Monthly recurring service — contact for a quote</p>
        </CardHeader>

        <p className="text-sm text-slate-900 font-semibold text-center leading-relaxed mt-2">{description}</p>

        {standardNote && (
          <p className="text-xs text-slate-600 font-medium text-center mt-2 leading-relaxed">{standardNote}</p>
        )}

        <div className="mt-6 flex-1">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">What's Included</h4>
            <button
              type="button"
              onClick={toggleAll}
              className="text-xs font-semibold text-primary hover:text-accent transition-colors"
            >
              {allExpanded ? 'Collapse All' : 'Expand All'}
            </button>
          </div>
          <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-100">
            {categories.map((cat, i) => (
              <FeatureCategory
                key={cat.title}
                title={cat.title}
                items={cat.items}
                isOpen={allExpanded || openIdx === i}
                onToggle={() => {
                  if (allExpanded) {
                    setAllExpanded(false);
                    setOpenIdx(i);
                  } else if (openIdx === -1) {
                    setOpenIdx(null);
                  } else {
                    setOpenIdx(openIdx === i ? null : i);
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 p-4 bg-pink-50/60 rounded-xl border border-pink-100/80">
          <p className="text-xs text-slate-700 font-semibold leading-relaxed">
            <AlertTriangle className="w-3.5 h-3.5 text-primary inline-block mr-1 -mt-0.5" />
            {note}
          </p>
        </div>

        <div className="mt-6">
          <Link to="/contact" className="block">
            <Button
              variant={featured ? 'default' : 'outline'}
              className={`w-full rounded-xl py-3 font-semibold ${featured ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/25' : 'border-slate-200 hover:border-primary text-slate-900 bg-white'}`}
              size="lg"
            >
              Request Maintenance
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Website Maintenance | Saya Mubiana Web Development"
        description="Ongoing website maintenance and technical support services by Saya Mubiana — keep your website secure, updated and running smoothly after launch."
        canonical="https://sayamubianaa.netlify.app/maintenance"
      />
      <Navbar />
      <main className="flex-1 pb-20">
        <PageHero
          badge="MAINTENANCE"
          title="Website Maintenance"
          subtitle="Keep your website secure, updated and running smoothly without having to worry about the technical side."
        />

        <div className="container mx-auto px-4 relative z-10 space-y-12">

          {/* Intro paragraph */}
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-slate-800 font-medium leading-relaxed">
              After a website is launched, it still needs regular maintenance to keep it working properly, secure, updated and reliable. I offer ongoing maintenance and technical support for websites that I have developed.
            </p>
          </motion.div>

          {/* What does website maintenance mean? */}
          <motion.div
            className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-purple-700 shadow-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-extrabold text-slate-900 mb-3">What does website maintenance mean?</h3>
            <p className="text-sm text-slate-900 font-semibold leading-relaxed">
              Website maintenance means regularly checking and looking after your website after it has been launched. Just like a physical business needs regular maintenance, a website also needs to be checked to make sure it remains secure, functional, updated and accessible to visitors.
            </p>
            <p className="text-sm text-slate-900 font-semibold leading-relaxed mt-3">
              Maintenance can include fixing minor problems, updating existing information, checking website security, checking forms and links, monitoring availability, checking performance and helping with technical problems.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            <PackageCard
              title="Standard Website Maintenance"
              description="Best for portfolio websites and standard business websites that mainly provide information about the person, company, services, products or contact details."
              standardNote="Standard Website Maintenance is designed for simple portfolio websites and standard business websites. It helps keep your website working properly, secure, updated and available to your visitors. I take care of routine technical checks and minor website updates so you can focus on your work while I take care of the technical side."
              categories={standardCategories}
              note="New features, major changes and new systems are not included in the Standard Maintenance package. These services will be quoted separately."
            />
            <PackageCard
              title="Advanced Website Maintenance"
              description="Best for websites and web applications that use databases, authentication, admin dashboards, backend systems or other advanced functionality."
              standardNote="Advanced Website Maintenance is designed for websites and web applications that have more technical functionality. This may include databases, user accounts, authentication, admin dashboards, backend services, forms, APIs and other systems. In addition to the standard maintenance services, I provide additional technical checks and support for these more advanced systems."
              categories={[...standardCategories, ...advancedExtraCategories]}
              note="Major new features, new systems, major redesigns and substantial development work are not included in the Advanced Maintenance package. These services will be quoted separately."
              featured
            />
          </div>

          {/* What's Not Included */}
          <motion.div
            className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-purple-700 shadow-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-extrabold mb-4 text-center text-slate-900">What's Not Included?</h3>
            <p className="text-sm text-slate-900 font-semibold text-center leading-relaxed mb-6">
              Website maintenance covers the ongoing care of your existing website. It does not include building completely new systems or major changes to the website.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {notIncluded.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                  <span className="text-primary mt-0.5 shrink-0">•</span>
                  {item}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-900 font-semibold leading-relaxed mt-6 text-center">
              Any new feature or major development work will be discussed with the client and quoted separately before development begins.
            </p>
          </motion.div>

          {/* Plan Details */}
          <motion.div
            className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-purple-700 shadow-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-extrabold mb-5 text-center text-slate-900">Plan Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-50/60 rounded-xl p-5 border border-slate-100">
                <p className="font-bold text-sm text-slate-900">Standard Maintenance</p>
                <p className="text-sm text-slate-700 font-semibold mt-2 leading-relaxed">
                  Ongoing care for portfolio and standard business websites.
                </p>
              </div>
              <div className="bg-slate-50/60 rounded-xl p-5 border border-slate-100">
                <p className="font-bold text-sm text-slate-900">Advanced Maintenance</p>
                <p className="text-sm text-slate-700 font-semibold mt-2 leading-relaxed">
                  Additional technical support for apps with databases, auth and backend systems.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-900 font-semibold leading-relaxed mt-5 text-center">
              Maintenance is provided on a monthly basis. The client pays for the selected maintenance plan for each month that they want the maintenance service.
            </p>
          </motion.div>

          {/* Important Business Rules */}
          <motion.div
            className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-purple-700 shadow-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-extrabold mb-5 text-center text-slate-900">Important Information</h3>
            <ol className="space-y-3">
              {rules.map((rule, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-900 font-semibold leading-relaxed">
                  <span className="font-bold text-primary shrink-0">{i + 1}.</span>
                  {rule}
                </li>
              ))}
            </ol>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-800 font-medium mb-4">Ready to request maintenance for your website?</p>
            <Link to="/contact">
              <Button size="lg" className="gap-2.5 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg shadow-primary/25 rounded-xl px-7 py-3.5 h-12 text-base font-semibold transition-all">
                Request Maintenance
              </Button>
            </Link>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
