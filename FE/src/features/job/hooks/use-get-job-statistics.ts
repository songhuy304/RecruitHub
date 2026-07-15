import { EJobStatus } from '@/features/job/enums';
import { useGetJobs } from './use-get-jobs';

const STATS_QUERY_PARAMS = {
  page: 1,
  limit: 1
} as const;

export function useGetJobStatistics() {
  const totalQuery = useGetJobs(STATS_QUERY_PARAMS);
  const openQuery = useGetJobs({
    ...STATS_QUERY_PARAMS,
    status: EJobStatus.OPEN
  });
  const onHoldQuery = useGetJobs({
    ...STATS_QUERY_PARAMS,
    status: EJobStatus.DRAFT
  });
  const closedQuery = useGetJobs({
    ...STATS_QUERY_PARAMS,
    status: EJobStatus.CLOSED
  });

  const isPending =
    totalQuery.isPending ||
    openQuery.isPending ||
    onHoldQuery.isPending ||
    closedQuery.isPending;

  return {
    total: totalQuery.data?.meta?.totalItems ?? 0,
    open: openQuery.data?.meta?.totalItems ?? 0,
    onHold: onHoldQuery.data?.meta?.totalItems ?? 0,
    closed: closedQuery.data?.meta?.totalItems ?? 0,
    isPending
  };
}
