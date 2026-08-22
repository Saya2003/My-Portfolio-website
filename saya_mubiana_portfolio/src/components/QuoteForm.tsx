import { useState, useRef, useEffect } from 'react';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Label } from '@project/components/ui/label';
import { Textarea } from '@project/components/ui/textarea';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { Send, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

/* ─── Custom dropdown (bypasses Radix Portal stacking-context issues) ─── */
interface SelectOption { value: string; label: string; }

function CustomSelect({
  value,
  onValueChange,
  placeholder,
  options,
}: {
  value: string;
  onValueChange: (v: string) => void;
  placeholder: string;
  options: SelectOption[];
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative', zIndex: open ? 9999 : 'auto' }}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '44px',
          padding: '0 12px',
          fontSize: '14px',
          color: selected ? '#0f172a' : '#9ca3af',
          backgroundColor: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: '10px',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
          outline: 'none',
          transition: 'border-color 0.15s, background-color 0.15s',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)';
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.6)';
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown
          style={{
            width: '16px',
            height: '16px',
            opacity: 0.5,
            flexShrink: 0,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            width: '100%',
            zIndex: 9999,
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15), 0 4px 10px -5px rgba(0,0,0,0.08)',
            overflow: 'hidden',
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onValueChange(option.value);
                setOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 16px',
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#1e293b',
                textAlign: 'left',
                cursor: 'pointer',
                backgroundColor: value === option.value ? '#fdf2f5' : 'transparent',
                transition: 'background-color 0.1s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fdf2f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  value === option.value ? '#fdf2f5' : 'transparent';
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Quote Form ─── */
export default function QuoteForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', business: '', projectType: '',
    projectDescription: '', featuresNeeded: '', hasDomain: '', hasBranding: '',
    desiredCompletionDate: '', budgetRange: '',
  });

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.projectType || !form.projectDescription) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      // Build a structured message from all form fields
      const messageParts = [
        `📋 NEW QUOTE REQUEST`,
        ``,
        `👤 Contact Details:`,
        `  Name: ${form.name}`,
        `  Email: ${form.email}`,
        form.phone ? `  Phone: ${form.phone}` : '',
        form.business ? `  Business: ${form.business}` : '',
        ``,
        `💼 Project Details:`,
        `  Type: ${form.projectType}`,
        `  Description: ${form.projectDescription}`,
        form.featuresNeeded ? `  Features Needed: ${form.featuresNeeded}` : '',
        ``,
        `📌 Additional Info:`,
        form.hasDomain ? `  Has Domain: ${form.hasDomain}` : '',
        form.hasBranding ? `  Has Branding/Logo: ${form.hasBranding}` : '',
        form.desiredCompletionDate ? `  Desired Completion: ${form.desiredCompletionDate}` : '',
        form.budgetRange ? `  Budget Range: ${form.budgetRange}` : '',
      ].filter(Boolean).join('\n');

      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        message: messageParts,
        to_email: 'mubianasaya@gmail.com',
      };

      await emailjs.send('service_1y1o923', 'template_3jvir6m', templateParams, 'Cj6fBkkArtLP6vpM2');
      toast.success('Quote request submitted! I will get back to you soon.');
      setForm({ name: '', email: '', phone: '', business: '', projectType: '', projectDescription: '', featuresNeeded: '', hasDomain: '', hasBranding: '', desiredCompletionDate: '', budgetRange: '' });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Removed overflow-hidden — it was trapping absolute-positioned dropdowns */
    <section id="quote" className="py-12 md:py-16 relative dotted-grid">
      <div className="absolute -top-40 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-slate-900">{"Let's Build Something"}</h2>
          <p className="text-slate-900 font-semibold max-w-xl mx-auto">
            Have a website idea, business or digital system that you want to bring to life? Tell me what you need, and let me turn your idea into a professional digital solution.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-[900px] mx-auto space-y-6 px-2 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="quote-name">Name *</Label>
              <Input id="quote-name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your full name" className="form-field" autoComplete="name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quote-email">Email *</Label>
              <Input id="quote-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="email@example.com" className="form-field" autoComplete="email" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="quote-phone">Phone</Label>
              <Input id="quote-phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+264 ..." className="form-field" autoComplete="tel" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quote-business">Business / Organisation</Label>
              <Input id="quote-business" value={form.business} onChange={(e) => set('business', e.target.value)} placeholder="Company name (if applicable)" className="form-field" autoComplete="organization" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label id="quote-project-type">Type of Project *</Label>
            <CustomSelect
              value={form.projectType}
              onValueChange={(v) => set('projectType', v)}
              placeholder="Select project type"
              options={[
                { value: 'portfolio', label: 'Portfolio Website' },
                { value: 'business', label: 'Professional Business Website' },
                { value: 'custom', label: 'Custom Web Solution' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="quote-description">Describe Your Project *</Label>
            <Textarea id="quote-description" rows={4} value={form.projectDescription} onChange={(e) => set('projectDescription', e.target.value)} placeholder="Tell me about your project..." className="form-textarea" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="quote-features">Features You Need</Label>
            <Textarea id="quote-features" rows={3} value={form.featuresNeeded} onChange={(e) => set('featuresNeeded', e.target.value)} placeholder="List any specific features..." className="form-textarea" />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label id="quote-has-domain">Do you already have a domain?</Label>
              <CustomSelect
                value={form.hasDomain}
                onValueChange={(v) => set('hasDomain', v)}
                placeholder="Select"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
              />
            </div>
            <div className="space-y-1.5">
              <Label id="quote-has-branding">Do you already have branding / logo?</Label>
              <CustomSelect
                value={form.hasBranding}
                onValueChange={(v) => set('hasBranding', v)}
                placeholder="Select"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="quote-date">Desired Completion Date</Label>
              <Input id="quote-date" value={form.desiredCompletionDate} onChange={(e) => set('desiredCompletionDate', e.target.value)} placeholder="e.g. End of September 2026" className="form-field" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quote-budget">Budget Range</Label>
              <Input id="quote-budget" value={form.budgetRange} onChange={(e) => set('budgetRange', e.target.value)} placeholder="e.g. $100 - $300" className="form-field" />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full gap-2 py-6 text-base bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg shadow-primary/25">
            {loading ? 'Submitting...' : <><Send className="w-5 h-5" /> Request a Quote</>}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            I will review your requirements and provide an appropriate project scope and quotation.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
