import { QUERY_KEY } from "@/config/query-keys";
import { IJobQueryParams } from "@/features/job/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { jobService } from "../services";

export interface UseGetJobsParams extends IJobQueryParams {
  enabled?: boolean;
}

const useGetJobs = ({ enabled = true, ...params }: UseGetJobsParams) => {
  const query = useQuery({
    queryKey: [...QUERY_KEY.JOB.LIST, params],
    queryFn: () => jobService.getJobs(params),
    enabled,
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    data: query.data,
  };
};

export { useGetJobs };
