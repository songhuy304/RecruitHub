import { QUERY_KEY } from "@/config/query-keys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { teamService } from "../services";

export interface UseGetTeamRequestParams {
  teamId: number;
  page: number;
  limit: number;
  search?: string;
  enabled?: boolean;
}

const useGetTeamRequest = ({
  teamId,
  page,
  limit,
  search,
  enabled = true,
}: UseGetTeamRequestParams) => {
  const query = useQuery({
    queryKey: [...QUERY_KEY.TEAM.JOIN_REQUESTS(teamId), { page, limit, search }],
    queryFn: () => teamService.getJoinRequests({ teamId, page, limit, search }),
    enabled: enabled && !!teamId,
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    data: query.data,
  };
};

export { useGetTeamRequest };
