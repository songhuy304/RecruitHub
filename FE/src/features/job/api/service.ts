// ============================================================
// Job Service — Data Access Layer
// ============================================================
// This is the ONLY file you modify when connecting to your backend.
// ============================================================

import type { CreateJobResponse, Job, JobMutationPayload } from './types';

const jobs: Job[] = [];

function toIsoDate(value?: Date): string | undefined {
  return value ? value.toISOString() : undefined;
}

export async function createJob(data: JobMutationPayload): Promise<CreateJobResponse> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const now = new Date().toISOString();
  const job: Job = {
    id: crypto.randomUUID(),
    title: data.title,
    departments: data.departments,
    location: data.location,
    employmentType: data.employmentType,
    level: data.level,
    status: data.status,
    salaryMin: data.salaryMin,
    salaryMax: data.salaryMax,
    salaryCurrency: data.salaryCurrency ?? data.currency ?? 'VND',
    currency: data.currency ?? 'VND',
    workLocationType: data.workLocationType,
    officeAddress: data.officeAddress,
    skills: data.skills,
    isNegotiable: data.isNegotiable,
    opensAt: toIsoDate(data.opensAt),
    expiresAt: toIsoDate(data.expiresAt),
    description: data.description,
    requirements: data.requirements,
    benefits: data.benefits,
    published: data.published,
    pinned: data.pinned,
    createdAt: now,
    updatedAt: now
  };

  jobs.unshift(job);

  return {
    success: true,
    message: 'Job created successfully',
    job
  };
}

export async function getJobs(): Promise<Job[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return [...jobs];
}
