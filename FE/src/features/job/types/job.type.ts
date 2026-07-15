import { IPagination } from '@/types/api.type';
import { EEmploymentType, EJobLevel, EJobStatus } from '../enums';

export interface IJobHiringTeamMember {
  id: string;
  name: string;
  avatarUrl?: string | null;
}

export interface IJob {
  id: number;
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  employmentType: EEmploymentType;
  level: EJobLevel;
  status: EJobStatus;
  salaryMin: number;
  salaryMax: number;
  expiresAt: string | null;
  openedAt: string;
  isPublished: boolean;
  isPinned: boolean;
  location: string;
  departments: string[];
  createdAt: string;
  updatedAt: string;
  viewCount?: number;
  applicantCount?: number;
  hiringTeam?: IJobHiringTeamMember[];
}

export interface IDateRangeFilter {
  from?: string;
  to?: string;
}

export interface IJobSortFilter {
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface IGetJobs extends IPagination {
  status?: EJobStatus;
  q?: string;
  jobType?: EEmploymentType;
  level?: EJobLevel;
  isPinned?: boolean;
  createdAt?: IDateRangeFilter;
  sort?: IJobSortFilter;
  location?: string;
}
