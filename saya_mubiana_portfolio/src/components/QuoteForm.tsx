import { useState } from 'react';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Label } from '@project/components/ui/label';
import { Textarea } from '@project/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@project/components/ui/select';
import { submitQuote } from 'zitejs/api';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

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
      await submitQuote(form);
      toast.success("Quote request submitted! I will get back to you soon.");
      setForm({ name: '', email: '', phone: '', business: '', projectType: '', projectDescription: '', featuresNeeded: '', hasDomain: '', hasBranding: '', desiredCompletionDate: '', budgetRange: '' });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote" className="py-20 md:py-28 relative overflow-hidden dotted-grid">
      <div className="absolute -top-40 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">{"Let's Build Something"}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
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
              <Label>Name *</Label>
              <Input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your full name" className="form-field" />
            </div>
            <div className="space-y-1.5">
              <Label>Email *</Label>
              <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="email@example.com" className="form-field" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+264 ..." className="form-field" />
            </div>
            <div className="space-y-1.5">
              <Label>Business / Organisation</Label>
              <Input value={form.business} onChange={(e) => set('business', e.target.value)} placeholder="Company name (if applicable)" className="form-field" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Type of Project *</Label>
            <Select value={form.projectType} onValueChange={(v) => set('projectType', v)}>
              <SelectTrigger className="form-field"><SelectValue placeholder="Select project type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="portfolio">Portfolio Website</SelectItem>
                <SelectItem value="business">Professional Business Website</SelectItem>
                <SelectItem value="custom">Custom Web Solution</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Describe Your Project *</Label>
            <Textarea rows={4} value={form.projectDescription} onChange={(e) => set('projectDescription', e.target.value)} placeholder="Tell me about your project..." className="form-textarea" />
          </div>

          <div className="space-y-1.5">
            <Label>Features You Need</Label>
            <Textarea rows={3} value={form.featuresNeeded} onChange={(e) => set('featuresNeeded', e.target.value)} placeholder="List any specific features..." className="form-textarea" />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label>Do you already have a domain?</Label>
              <Select value={form.hasDomain} onValueChange={(v) => set('hasDomain', v)}>
                <SelectTrigger className="form-field"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Do you already have branding / logo?</Label>
              <Select value={form.hasBranding} onValueChange={(v) => set('hasBranding', v)}>
                <SelectTrigger className="form-field"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label>Desired Completion Date</Label>
              <Input value={form.desiredCompletionDate} onChange={(e) => set('desiredCompletionDate', e.target.value)} placeholder="e.g. End of September 2026" className="form-field" />
            </div>
            <div className="space-y-1.5">
              <Label>Budget Range</Label>
              <Input value={form.budgetRange} onChange={(e) => set('budgetRange', e.target.value)} placeholder="e.g. $100 - $300" className="form-field" />
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
