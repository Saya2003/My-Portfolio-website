import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';

export default createEndpoint({
  description: 'Submits a quote request from the portfolio website',
  inputSchema: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    business: z.string().optional(),
    projectType: z.string().min(1),
    projectDescription: z.string().min(1),
    featuresNeeded: z.string().optional(),
    hasDomain: z.string().optional(),
    hasBranding: z.string().optional(),
    desiredCompletionDate: z.string().optional(),
    budgetRange: z.string().optional(),
  }),
  outputSchema: z.object({ success: z.boolean() }),
  execute: async ({ input }) => {
    await zite.quoteRequests.create({
      record: {
        name: input.name,
        email: input.email,
        phone: input.phone || '',
        business: input.business || '',
        projectType: input.projectType as 'portfolio' | 'business' | 'custom' | 'other',
        projectDescription: input.projectDescription,
        featuresNeeded: input.featuresNeeded || '',
        hasDomain: (input.hasDomain as 'yes' | 'no') || undefined,
        hasBranding: (input.hasBranding as 'yes' | 'no') || undefined,
        desiredCompletionDate: input.desiredCompletionDate || '',
        budgetRange: input.budgetRange || '',
      },
    });
    return { success: true };
  },
});
