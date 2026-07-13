import type { JobFormValues } from '../schemas/job.schema';

export type JobStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED';

export interface Job {
  id: string;
  title: string;
  departments: string;
  location: string;
  employmentType: string;
  level: string;
  status: JobStatus;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency: string;
  currency: string;
  workLocationType: string;
  officeAddress: string;
  skills: { id: string; text: string }[];
  isNegotiable: boolean;
  opensAt?: string;
  expiresAt?: string;
  description: string;
  requirements: string;
  benefits?: string;
  published: boolean;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export type JobMutationPayload = JobFormValues & {
  status: JobStatus;
};

export type CreateJobResponse = {
  success: boolean;
  message: string;
  job: Job;
};
