import { queryOptions } from '@tanstack/react-query';
import { getJobs } from './service';

export const jobKeys = {
  all: ['jobs'] as const,
  list: () => [...jobKeys.all, 'list'] as const
};

export const jobsQueryOptions = () =>
  queryOptions({
    queryKey: jobKeys.list(),
    queryFn: () => getJobs()
  });
