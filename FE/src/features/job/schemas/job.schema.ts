import * as z from 'zod';

export const jobSchema = z.object({
  title: z.string().min(2, 'Job title must be at least 2 characters'),
  departments: z.string().min(1, 'Please select a department'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  employmentType: z.string().min(1, 'Please select an employment type'),
  level: z.string().min(1, 'Please select a level'),
  status: z.string().min(1, 'Please select a status'),
  salaryMin: z.coerce.number().optional(),
  salaryMax: z.coerce.number().optional(),
  salaryCurrency: z.string().default('VND'),
  currency: z.string().optional().default('VND'),
  workLocationType: z.string().min(1, 'Please select a work location type'),
  officeAddress: z.string().min(2, 'Office address must be at least 2 characters'),
  skills: z.array(
    z.object({
      id: z.string(),
      text: z.string()
    })
  ).min(1, 'Please add at least one skill'),
  isNegotiable: z.boolean().default(false),
  opensAt: z.date().optional(),
  expiresAt: z.date().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  requirements: z.string().min(10, 'Requirements must be at least 10 characters'),
  benefits: z.string().optional(),
  published: z.boolean().default(false),
  pinned: z.boolean().default(false),
});

export type JobFormValues = z.infer<typeof jobSchema>;
