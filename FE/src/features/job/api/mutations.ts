import { mutationOptions } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { createJob } from './service';
import { jobKeys } from './queries';
import type { JobMutationPayload } from './types';

export const createJobMutation = mutationOptions({
  mutationFn: (data: JobMutationPayload) => createJob(data),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: jobKeys.all });
  }
});
